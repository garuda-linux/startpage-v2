import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  type ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConfigService } from '../config/config.service';
import { autocompleteProviders, searchEngineMappings } from '../../../config';
import type { ArrayBasedSuggestions } from './interfaces';
import type { SearchEngineEntry, ServiceLink } from '../types';
import { hostnameOf, openUrl } from '../functions';

type SearchOption =
  | { kind: 'web'; query: string }
  | { kind: 'link'; link: ServiceLink }
  | { kind: 'suggestion'; text: string }
  | { kind: 'engine'; engine: SearchEngineEntry };

const MAX_LINK_MATCHES = 4;
const MAX_SUGGESTIONS = 5;

@Component({
  selector: 'app-search',
  imports: [TranslocoDirective],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(focusout)': 'onFocusOut($event)',
  },
})
export class SearchComponent {
  protected readonly configService = inject(ConfigService);
  protected readonly hostnameOf = hostnameOf;

  protected readonly query = signal('');
  protected readonly suggestions = signal<string[]>([]);
  protected readonly focused = signal(false);
  protected readonly engineMenu = signal(false);
  protected readonly activeIndex = signal(0);

  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private readonly http = inject(HttpClient);
  private suggestTimer?: ReturnType<typeof setTimeout>;

  protected readonly engines = computed<SearchEngineEntry[]>(() => {
    const settings = this.configService.settings();
    const predefined = searchEngineMappings[1].items.filter((engine) => engine.value !== 'custom');
    const custom: SearchEngineEntry[] =
      settings.searchEngineUrl && settings.searchEngineName
        ? [{ value: 'custom', label: settings.searchEngineName, url: settings.searchEngineUrl }]
        : [];
    return [...predefined, ...settings.searchEngines, ...custom];
  });

  protected readonly engine = computed<SearchEngineEntry>(() => {
    const active = this.configService.settings().activeSearchEngine;
    return this.engines().find((engine) => engine.value === active) ?? this.engines()[0];
  });

  protected readonly linkMatches = computed<ServiceLink[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return [];
    return this.configService
      .settings()
      .customLinks.filter(
        (link) => link.title?.toLowerCase().includes(q) || hostnameOf(link.link).toLowerCase().includes(q),
      )
      .slice(0, MAX_LINK_MATCHES);
  });

  protected readonly options = computed<SearchOption[]>(() => {
    if (this.engineMenu()) {
      return this.engines().map((engine) => ({ kind: 'engine', engine }) as const);
    }
    const q = this.query().trim();
    if (!q) return [];
    return [
      { kind: 'web', query: q },
      ...this.linkMatches().map((link) => ({ kind: 'link', link }) as const),
      ...this.suggestions()
        .filter((text) => text.toLowerCase() !== q.toLowerCase())
        .slice(0, MAX_SUGGESTIONS)
        .map((text) => ({ kind: 'suggestion', text }) as const),
    ];
  });

  protected readonly open = computed(() => this.focused() && this.options().length > 0);
  protected readonly firstLinkIndex = computed(() => this.options().findIndex((o) => o.kind === 'link'));
  protected readonly firstSuggestionIndex = computed(() => this.options().findIndex((o) => o.kind === 'suggestion'));

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.suggestTimer));
    // A startpage exists to be typed into, so the search takes focus once rendered
    afterNextRender(() => this.input().nativeElement.focus({ preventScroll: true }));
  }

  focus(): void {
    this.input().nativeElement.focus();
    this.input().nativeElement.select();
  }

  protected onInput(value: string): void {
    this.query.set(value);
    this.engineMenu.set(false);
    this.activeIndex.set(0);
    clearTimeout(this.suggestTimer);
    this.suggestTimer = setTimeout(() => this.fetchSuggestions(value), 160);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const count = this.options().length;
    switch (event.key) {
      case 'ArrowDown':
        if (!count) return;
        event.preventDefault();
        this.activeIndex.update((i) => (i + 1) % count);
        break;
      case 'ArrowUp':
        if (!count) return;
        event.preventDefault();
        this.activeIndex.update((i) => (i - 1 + count) % count);
        break;
      case 'Enter': {
        event.preventDefault();
        const option = this.options()[this.activeIndex()];
        if (option) this.choose(option, event.ctrlKey || event.metaKey);
        else if (this.query().trim()) this.search(this.query());
        break;
      }
      case 'Escape':
        if (this.engineMenu()) {
          this.engineMenu.set(false);
        } else if (this.query()) {
          this.reset();
        } else {
          this.input().nativeElement.blur();
        }
        break;
    }
  }

  protected toggleEngineMenu(): void {
    const opening = !this.engineMenu();
    this.engineMenu.set(opening);
    this.activeIndex.set(
      opening
        ? Math.max(
            0,
            this.engines().findIndex((e) => e.value === this.engine().value),
          )
        : 0,
    );
    this.input().nativeElement.focus();
  }

  /**
   * Holding Ctrl / Cmd always opens a new tab
   */
  protected choose(option: SearchOption, forceNewTab = false): void {
    const newTab = forceNewTab || this.configService.settings().openInNewTab;
    switch (option.kind) {
      case 'web':
        this.search(option.query, newTab);
        break;
      case 'suggestion':
        this.search(option.text, newTab);
        break;
      case 'link':
        openUrl(option.link.link, newTab);
        this.reset();
        break;
      case 'engine':
        this.configService.updateConfig('activeSearchEngine', option.engine.value);
        this.engineMenu.set(false);
        this.activeIndex.set(0);
        this.input().nativeElement.focus();
        break;
    }
  }

  protected optionId(index: number): string {
    return `search-option-${index}`;
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && (event.currentTarget as HTMLElement).contains(next)) return;
    this.focused.set(false);
    this.engineMenu.set(false);
  }

  private search(term: string, newTab = this.configService.settings().openInNewTab): void {
    const url = this.engine().url;
    if (!url || !term.trim()) return;
    openUrl(url.replace('%s', encodeURIComponent(term.trim())), newTab);
    this.reset();
  }

  private reset(): void {
    this.query.set('');
    this.suggestions.set([]);
    this.activeIndex.set(0);
    this.input().nativeElement.value = '';
  }

  private fetchSuggestions(term: string): void {
    const { autocompleteProvider, corsProxy } = this.configService.settings();
    if (!autocompleteProvider || autocompleteProvider === 'none' || !corsProxy || !term.trim()) {
      this.suggestions.set([]);
      return;
    }

    const allProviders: SearchEngineEntry[] = [...autocompleteProviders[0].items, ...autocompleteProviders[1].items];
    const entry = allProviders.find((p) => p.value === autocompleteProvider || p.label === autocompleteProvider);
    if (!entry?.url) return;

    const url = `${corsProxy}${entry.url.replace('%s', encodeURIComponent(term))}`;
    this.http.get<ArrayBasedSuggestions>(url, { responseType: 'json' }).subscribe({
      next: (data) => {
        // Ignore late answers for a query the user already changed
        if (term !== this.query()) return;
        this.suggestions.set(Array.isArray(data?.[1]) ? data[1] : []);
      },
      error: () => this.suggestions.set([]),
    });
  }
}
