import { ChangeDetectionStrategy, Component, computed, effect, inject, untracked } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NewsService } from './news.service';
import { EmojiPipe } from '../emoji-pipe/emoji.pipe';
import { ConfigService } from '../config/config.service';
import { hostnameOf } from '../functions';
import { ContactLinksComponent } from '../contact-links/contact-links.component';

const VISIBLE_ITEMS = 4;
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
];

@Component({
  selector: 'app-news',
  imports: [EmojiPipe, TranslocoDirective, ContactLinksComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {
  protected readonly newsService = inject(NewsService);
  protected readonly configService = inject(ConfigService);
  protected readonly skeletonRows = Array.from({ length: VISIBLE_ITEMS }, (_, i) => i);

  protected readonly items = computed(() => this.newsService.blogData().slice(0, VISIBLE_ITEMS));

  /**
   * Loading only matters when there is no cached content to show meanwhile
   */
  protected readonly state = computed<'ready' | 'loading' | 'error' | 'empty'>(() => {
    if (this.items().length) return 'ready';
    if (this.newsService.blogDataError()) return 'error';
    if (!this.newsService.blogDataReady()) return 'loading';
    return 'empty';
  });

  /**
   * Only the feed-related settings, so unrelated changes don't trigger a reload
   */
  private readonly request = computed(
    () => {
      const { newsSource, rssUrl, corsProxy } = this.configService.settings();
      return { source: newsSource ?? 'garuda', rssUrl: (rssUrl ?? '').trim(), corsProxy: corsProxy ?? '' };
    },
    { equal: (a, b) => a.source === b.source && a.rssUrl === b.rssUrl && a.corsProxy === b.corsProxy },
  );

  protected readonly isRss = computed(() => this.request().source === 'rss');
  protected readonly needsUrl = computed(() => this.isRss() && !this.request().rssUrl);

  protected readonly customTitle = computed(() => {
    if (!this.isRss()) return '';
    const { rssTitle } = this.configService.settings();
    return rssTitle?.trim() || hostnameOf(this.request().rssUrl);
  });

  constructor() {
    effect(() => {
      const request = this.request();
      untracked(() => this.newsService.load(request));
    });
  }

  protected refresh(): void {
    this.newsService.load();
  }

  protected relativeTime(date: string): string {
    const seconds = (new Date(date).getTime() - Date.now()) / 1000;
    // Browser's Intl locale, matching the date on the homepage
    const format = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
    for (const [unit, size] of UNITS) {
      if (Math.abs(seconds) >= size) return format.format(Math.round(seconds / size), unit);
    }
    return format.format(0, 'minute');
  }
}
