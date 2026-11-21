import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NewsComponent } from '../news/news.component';
import { SearchComponent } from '../search/search.component';
import { LinksComponent } from '../links/links.component';
import { ConfigService } from '../config/config.service';
import { ContactLinksComponent } from '../contact-links/contact-links.component';
import { JokesComponent } from '../jokes/jokes.component';
import { HeroComponent } from '../hero/hero.component';
import { CustomizeComponent } from '../customize/customize.component';

@Component({
  selector: 'app-home',
  imports: [
    TranslocoDirective,
    HeroComponent,
    NewsComponent,
    SearchComponent,
    LinksComponent,
    ContactLinksComponent,
    CustomizeComponent,
    JokesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onKeydown($event)',
    '(document:pointerdown)': 'onPointerDown($event)',
  },
})
export class HomeComponent {
  protected readonly configService = inject(ConfigService);
  protected readonly customizeOpen = signal(false);

  private readonly search = viewChild.required(SearchComponent);
  private readonly links = viewChild(LinksComponent);

  /**
   * The drawer is non-modal so the page stays visible for live preview. A click
   * anywhere outside it still closes it.
   */
  protected onPointerDown(event: PointerEvent): void {
    if (!this.customizeOpen()) return;
    const target = event.target as Element | null;
    if (target?.closest('.p-drawer, .customize-trigger')) return;
    this.customizeOpen.set(false);
  }

  /**
   * Global keyboard shortcuts. They never fire while the user is typing somewhere.
   */
  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    const typing = !!target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.search().focus();
      return;
    }
    if (this.customizeOpen() || event.ctrlKey || event.metaKey || event.altKey) return;

    // The search box is autofocused, so allow "," there as long as nothing was typed yet
    const emptySearch = target instanceof HTMLInputElement && target.type === 'search' && !target.value;
    if (event.key === ',' && (!typing || emptySearch)) {
      event.preventDefault();
      this.customizeOpen.set(true);
      return;
    }
    if (typing) return;

    if (event.key === '/') {
      event.preventDefault();
      this.search().focus();
    } else if (/^[1-9]$/.test(event.key)) {
      if (this.links()?.openByShortcut(Number(event.key))) event.preventDefault();
    }
  }
}
