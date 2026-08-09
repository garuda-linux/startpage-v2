import { ChangeDetectionStrategy, Component, computed, inject, signal, type Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { ConfigService } from '../config/config.service';
import { searchEngineMappings } from '../../../config';
import { SearchModel, SearchComponent as LibSearchComponent } from '@garudalinux/core';
import type { SearchEngineEntry } from '../types';

@Component({
  selector: 'app-search',
  imports: [NgOptimizedImage, TranslocoDirective, LibSearchComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  protected readonly configService = inject(ConfigService);
  private readonly translocoService = inject(TranslocoService);
  searchTerm = signal<string>('');

  searchEngine: Signal<SearchEngineEntry> = computed(() => {
    const activeSearchEngine: string = this.configService.settings().activeSearchEngine;
    let searchEngine: SearchEngineEntry;
    if (activeSearchEngine !== 'custom') {
      const allAvailableSearchEngines: SearchEngineEntry[] = [
        ...searchEngineMappings[0].items,
        ...searchEngineMappings[1].items,
        ...this.configService.settings().searchEngines,
      ];
      searchEngine = allAvailableSearchEngines.find((engine) => engine.value === activeSearchEngine)!;
    } else {
      searchEngine = {
        value: 'custom',
        url: this.configService.settings().searchEngineUrl,
        label: this.configService.settings().searchEngineName,
      };
    }
    return searchEngine;
  });

  searchConfig = computed<SearchModel>(() => {
    const engine = this.searchEngine();
    const placeholderText = this.translocoService.translate('search.placeholder');
    const searchButtonText = this.translocoService.translate('search.search');

    const rawUrl = engine.url || 'https://priv.au/search?q=%s';
    const query = this.searchTerm().trim();

    let searchEngineUrl: string;
    if (rawUrl.includes('%s')) {
      searchEngineUrl = rawUrl.replace('%s', encodeURIComponent(query));
    } else {
      searchEngineUrl = rawUrl.includes('?') ? `${rawUrl}&q=${encodeURIComponent(query)}` : `${rawUrl}?q=${encodeURIComponent(query)}`;
    }
    
    return {
      searchTitle: searchButtonText,
      searchEngineUrl: searchEngineUrl,
      placeholder: `${placeholderText} ${engine.label || 'SearxNG'}`,
    };
  });

  logoSource = computed(() => {
    const logoSetting = this.configService.settings().logo;
    if (logoSetting === 'custom') {
      return this.configService.settings().logoUrl;
    } else if (logoSetting === 'none') {
      return logoSetting;
    } else {
      return 'assets/garuda-purple.svg';
    }
  });
}