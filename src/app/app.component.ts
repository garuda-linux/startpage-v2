import { NgClass, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  type OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { RouterModule, type RouterOutlet } from '@angular/router';
import { ScrollTop } from 'primeng/scrolltop';
import { routeAnimations } from './app.routes';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { lastValueFrom } from 'rxjs';
import { MessageToastService, ShellComponent } from '@garudalinux/core';
import { ConfigService } from './config/config.service';
import { menubarItems } from '../../config';
import type { MenuBarLink } from './types';
import { TranslocoPersistTranslations } from '@jsverse/transloco-persist-translations';
import { Avatar } from 'primeng/avatar';

@Component({
  imports: [RouterModule, NgOptimizedImage, ScrollTop, ShellComponent, TranslocoDirective, Avatar, NgClass],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TranslocoPersistTranslations, MessageToastService],
})
export class AppComponent implements OnInit {
  items = signal<MenuBarLink[]>(menubarItems);

  protected readonly configService = inject(ConfigService);

  logoLink = computed<string>(() =>
    this.configService.settings().logo ? this.configService.settings().logo : '/assets/garuda-purple.svg',
  );

  private readonly translationsCache = inject(TranslocoPersistTranslations);
  private readonly el = inject(ElementRef);
  private readonly messageToastService = inject(MessageToastService);
  private readonly renderer = inject(Renderer2);
  private readonly translocoService = inject(TranslocoService);

  welcomeText = computed<string>(() => {
    const user = this.configService.settings().username !== '' ? this.configService.settings().username : 'friend';
    if (this.configService.settings().welcomeText !== '') {
      return `${this.configService.settings().welcomeText} ${user}!`;
    }
    return `${this.translocoService.translate('menu.welcome')} ${user}!`;
  });

  async ngOnInit(): Promise<void> {
    this.manageTranslocoCache();
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
      if (item.translocoKey) {
        newItemPromises.push(lastValueFrom(this.translocoService.selectTranslate(item['translocoKey'], {}, lang)));
      } else {
        newItemPromises.push(lastValueFrom(this.translocoService.selectTranslate(item['label'], {}, lang)));
      }
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

  /**
   * Clear transloco localstorage cached files if we have new translations.
   */
  manageTranslocoCache(): void {
    if (this.configService.settings().translationVersion < this.configService.defaultSettings.translationVersion) {
      this.translationsCache.clearCache();
    }
  }

  /**
   * Display an easter egg message ;)
   */
  displayEasterEgg() {
    const oneToSix: number = Math.floor(Math.random() * 6) + 1;
    const oneToTwenty: number = Math.floor(Math.random() * 20) + 1;

    const title: string = this.translocoService.translate(`easterEggs.easterEgg${oneToTwenty}.title`);
    const content: string = this.translocoService.translate(`easterEggs.easterEgg${oneToTwenty}.content`);

    const shakeEffects: string[] = [
      'shake-hard',
      'shake-slow',
      'shake-little',
      'shake-horizontal',
      'shake-vertical',
      'shake-rotate',
      'shake-opacity',
      'shake-crazy',
    ];
    const shakeEffect: string = shakeEffects[Math.floor(Math.random() * shakeEffects.length)];

    this.renderer.addClass(this.el.nativeElement, 'shake');
    this.renderer.addClass(this.el.nativeElement, shakeEffect);
    setTimeout(() => {
      this.renderer.removeClass(this.el.nativeElement, 'shake');
      this.renderer.removeClass(this.el.nativeElement, shakeEffect);
    }, 5000);

    switch (oneToSix) {
      case 1:
        this.messageToastService.info(title, content);
        break;
      case 2:
        this.messageToastService.error(title, content);
        break;
      case 3:
        this.messageToastService.success(title, content);
        break;
      case 4:
        this.messageToastService.warn(title, content);
        break;
      case 5:
        this.messageToastService.contrast(title, content);
        break;
      case 6:
        this.messageToastService.secondary(title, content);
        break;
    }
  }
}
