import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, type Observable, retry, throwError } from 'rxjs';
import type { DiscourseFeed, StrippedTopic } from './interfaces';
import { APP_CONFIG } from '../../environments/app-config.token';
import type { NewsSource } from '../config/interfaces';

interface FeedRequest {
  source: NewsSource;
  rssUrl: string;
  corsProxy: string;
}

interface FeedResult {
  items: StrippedTopic[];
  siteUrl: string | null;
}

const AMOUNT = 20;

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  blogData = signal<StrippedTopic[]>([]);
  blogDataReady = signal<boolean>(false);
  blogDataError = signal<boolean>(false);
  /**
   * Website belonging to the active feed, for the "open" link
   */
  siteUrl = signal<string | null>(null);

  private readonly appConfig = inject(APP_CONFIG);
  private readonly http = inject(HttpClient);
  private lastRequest: FeedRequest | null = null;
  private requestId = 0;

  /**
   * Cached items show immediately while fresh ones load
   */
  load(request: FeedRequest = this.lastRequest ?? { source: 'garuda', rssUrl: '', corsProxy: '' }): void {
    this.lastRequest = request;
    const id = ++this.requestId;
    const cacheKey = this.cacheKey(request);

    this.blogDataError.set(false);
    this.blogDataReady.set(false);
    this.blogData.set(this.readCache(cacheKey));
    this.siteUrl.set(request.source === 'garuda' ? `${this.appConfig.forumUrl}/c/announcements/16` : null);

    if (request.source === 'rss' && !request.rssUrl) {
      this.blogDataReady.set(true);
      return;
    }

    const feed$ = request.source === 'rss' ? this.rss(request) : this.discourse();
    feed$.subscribe({
      next: ({ items, siteUrl }) => {
        if (id !== this.requestId) return;
        this.blogData.set(items);
        if (siteUrl) this.siteUrl.set(siteUrl);
        this.blogDataReady.set(true);
        localStorage.setItem(cacheKey, JSON.stringify(items));
      },
      error: () => {
        if (id !== this.requestId) return;
        // Cached items are still worth showing, only flag the error when there is nothing
        this.blogDataError.set(this.blogData().length === 0);
        this.blogDataReady.set(this.blogData().length > 0);
      },
    });
  }

  private discourse(): Observable<FeedResult> {
    return this.http.get<DiscourseFeed>(`${this.appConfig.forumUrl}/c/announcements/16.json`).pipe(
      retry({ count: 2, delay: 1000 }),
      map((data) => ({
        siteUrl: null,
        items: [...data.topic_list.topics]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, AMOUNT)
          .map((topic) => ({
            link: `${this.appConfig.forumUrl}/t/${topic.slug}`,
            created_at: topic.created_at,
            fancy_title: topic.fancy_title,
            tag: tagName(topic.tags?.[0]),
          })),
      })),
    );
  }

  /**
   * Fetch an RSS or Atom feed, falling back to the CORS proxy when the feed blocks cross-origin requests.
   */
  private rss({ rssUrl, corsProxy }: FeedRequest): Observable<FeedResult> {
    const fetch = (url: string) => this.http.get(url, { responseType: 'text' }).pipe(map(parseFeed));
    return fetch(rssUrl).pipe(
      catchError((err) => (corsProxy ? fetch(`${corsProxy}${encodeURIComponent(rssUrl)}`) : throwError(() => err))),
    );
  }

  private cacheKey({ source, rssUrl }: FeedRequest): string {
    return source === 'rss' ? `feed:${rssUrl}` : 'blogData';
  }

  private readCache(key: string): StrippedTopic[] {
    try {
      const cached = JSON.parse(localStorage.getItem(key) ?? '[]');
      return Array.isArray(cached) ? cached : [];
    } catch {
      return [];
    }
  }
}

/**
 * Parse RSS 2.0 / Atom XML into topics. Titles are escaped because the list renders HTML
 * (Discourse titles contain entities and emoji codes).
 */
function parseFeed(xml: string): FeedResult {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  if (doc.querySelector('parsererror')) throw new Error('Invalid feed');

  const text = (el: Element, ...tags: string[]) => {
    for (const tag of tags) {
      const value = el.getElementsByTagName(tag)[0]?.textContent?.trim();
      if (value) return value;
    }
    return '';
  };
  const linkOf = (el: Element | null) => {
    if (!el) return '';
    const atom = [...el.children].filter((child) => child.localName === 'link');
    const alternate = atom.find((l) => !l.getAttribute('rel') || l.getAttribute('rel') === 'alternate');
    return (alternate?.getAttribute('href') || alternate?.textContent || '').trim();
  };
  const safeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : '');

  const entries = [...doc.querySelectorAll('item, entry')];
  if (!entries.length && !doc.querySelector('rss, feed, rdf\\:RDF, RDF')) throw new Error('Not a feed');

  const items = entries
    .map((entry) => ({
      fancy_title: escapeHtml(text(entry, 'title')),
      link: safeUrl(linkOf(entry)),
      created_at: toIso(text(entry, 'pubDate', 'published', 'updated', 'dc:date')),
      tag: text(entry, 'category') || entry.querySelector('category')?.getAttribute('term') || '',
    }))
    .filter((item) => item.fancy_title && item.link)
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
    .slice(0, AMOUNT);

  const channel = doc.querySelector('channel') ?? doc.querySelector('feed');
  return { items, siteUrl: safeUrl(linkOf(channel)) || null };
}

function toIso(date: string): string {
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? '' : parsed.toISOString();
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

/**
 * Discourse returns tags as strings in older versions and as objects in newer ones
 */
function tagName(tag: unknown): string | undefined {
  if (typeof tag === 'string') return tag;
  if (tag && typeof tag === 'object' && 'name' in tag) return String((tag as { name: unknown }).name);
  return undefined;
}
