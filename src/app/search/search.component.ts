import { ChangeDetectionStrategy, Component, computed, inject, type Signal, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConfigService } from '../config/config.service';
import { searchEngineMappings } from '../../../config';
import type { SearchEngineEntry, SearchEngineList } from '../types';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, NgOptimizedImage, TranslocoDirective, Button, InputText],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchEngine: Signal<SearchEngineEntry> = computed(() => {
    const activeSearchEngine: string = this.configService.settings().activeSearchEngine;
    let searchEngine: SearchEngineEntry;
    if (activeSearchEngine !== 'custom') {
      const allAvailableSearchEngines: SearchEngineList = [
        ...searchEngineMappings,
        ...this.configService.settings().searchEngines,
      ];
      searchEngine = allAvailableSearchEngines.find((engine) => engine.name === activeSearchEngine)!;
    } else {
      searchEngine = {
        name: 'custom',
        url: this.configService.settings().searchEngineUrl,
        prettyName: this.configService.settings().searchEngineName,
      };
    }
    return searchEngine;
  });
  searchTerm = signal<string>('');

  protected readonly configService = inject(ConfigService);

  /**
   * Open the search engine URL in a new tab with the search term.
   */
  search() {
    window.open(this.searchEngine().url.replace('%s', this.searchTerm()), '_blank');
    this.searchTerm.set('');
  }
}
