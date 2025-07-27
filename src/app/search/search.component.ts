import { ChangeDetectionStrategy, Component, computed, inject, type Signal, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConfigService } from '../config/config.service';
import { autocompleteProviders, searchEngineMappings } from '../../../config';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AutoComplete, type AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { HttpClient } from '@angular/common/http';
import type { ArrayBasedSuggestions } from './interfaces';
import type { SearchEngineEntry } from '../types';

@Component({
  selector: 'app-search',
  imports: [FormsModule, NgOptimizedImage, TranslocoDirective, Button, InputText, AutoComplete],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchTerm = signal<string>('');
  suggestions = signal<any[]>([]);

  protected readonly configService = inject(ConfigService);
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
  logoSource = computed(() => {
    if (this.configService.settings().logo === 'custom') {
      return this.configService.settings().logoUrl;
    } else if (this.configService.settings().logo === 'none') {
      return this.configService.settings().logo;
    } else {
      return 'assets/garuda-purple.svg';
    }
  });

  private readonly http = inject(HttpClient);

  /**
   * Open the search engine URL in a new tab with the search term.
   */
  search() {
    const url: string = encodeURI(this.searchEngine().url!.replace('%s', this.searchTerm()));
    window.open(url, '_blank');

    this.searchTerm.set('');
    this.suggestions.set([]);
  }

  /**
   * Handle the autocomplete event and update the suggestions.
   * @param $event The autocomplete event.
   */
  autocomplete($event: AutoCompleteCompleteEvent) {
    const corsProxy: string = this.configService.settings().corsProxy;
    const provider: string = this.configService.settings().autocompleteProvider;
    if (!provider || provider === 'none' || !corsProxy) return;
    if (!$event.query.trim()) {
      this.suggestions.set([]);
      return;
    }

    const allProviders: SearchEngineEntry[] = [...autocompleteProviders[0].items, ...autocompleteProviders[1].items];
    const entry: SearchEngineEntry = allProviders.find((entry) => entry.label === provider)!;
    const url: string = encodeURI(`${corsProxy}${entry.url?.replace('%s', $event.query)}`);
    switch (entry.value) {
      case 'startpage':
      case 'brave':
        this.arrayBasedAutocomplete(url);
        break;
      default:
        this.suggestions.set([]);
    }
  }

  /**
   * Fetch suggestions from the server using an array-based approach.
   * @param url The URL to fetch suggestions from.
   * @private
   */
  private arrayBasedAutocomplete(url: string): void {
    this.http.get<ArrayBasedSuggestions>(url, { responseType: 'json' }).subscribe({
      next: (data: ArrayBasedSuggestions) => {
        if (!Array.isArray(data) || data.length > 1 || Array.isArray(data[1])) {
          this.suggestions.set(data[1]);
        }
      },
      error: () => {
        this.suggestions.set([]);
      },
    });
  }
}
