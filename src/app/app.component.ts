import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import localeEnGb from '@angular/common/locales/en-GB';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ScrollTop } from 'primeng/scrolltop';
import { routeAnimations } from './app.routes';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { lastValueFrom } from 'rxjs';
import { Button } from 'primeng/button';
import { AppService } from './app.service';
import { ShellComponent } from '@garudalinux/core';
import { ConfigService } from './config/config.service';
import { menubarItems } from '../../config';
import { MenuBarLink } from './types';

@Component({
  imports: [
    RouterModule,
    NgOptimizedImage,
    ScrollTop,
    LanguageSwitcherComponent,
    Button,
    ShellComponent,
    TranslocoDirective,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  items = signal<MenuBarLink[]>(menubarItems);

  protected readonly appService = inject(AppService);
  protected readonly configService = inject(ConfigService);
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly translocoService = inject(TranslocoService);

  logoLink = computed(() =>
    this.configService.settings().logo ? '/' + this.configService.settings().logo : '/assets/garuda-purple.svg',
  );

  async ngOnInit(): Promise<void> {
    registerLocaleData(localeEnGb);
    void this.setupLabels(this.translocoService.getActiveLang());

    this.translocoService.langChanges$.subscribe((lang) => {
      void this.setupLabels(lang);
    });

    while (!this.configService.initialized()) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    this.configService.initConfig(this.renderer, this.el);
  }

  /**
   * Set up the labels for the menu bar items
   * @param lang The language to set the labels for
   */
  async setupLabels(lang: string): Promise<void> {
    const newItemPromises = [];
    for (const item of this.items()) {
      newItemPromises.push(lastValueFrom(this.translocoService.selectTranslate(item['translocoKey'], {}, lang)));
    }

    const results: string[] = await Promise.all(newItemPromises);
    const newItems = [];

    for (const [index, item] of this.items().entries()) {
      newItems.push({ ...item, label: results[index] });
    }

    this.items.set(newItems);
  }

  /**
   * Returns the animation state of the next page for page transitions
   * @param outlet Router outlet element
   * @returns The animation state of the target route
   */
  prepareRoute(outlet: RouterOutlet): string {
    return outlet.activatedRouteData['animationState'];
  }
}
