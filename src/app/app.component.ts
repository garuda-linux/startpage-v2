import { ViewportScroller } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  type OnInit,
  signal,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import { MessageToastService } from '@garudalinux/core/message-toast';
import { ShellComponent } from '@garudalinux/core/shell';
import { ConfigService } from './config/config.service';
import { menubarItems } from '../../config';
import type { MenuBarLink } from './types';
import { Avatar } from '@openng/optimus-ui/avatar';
import { WallpaperComponent } from './wallpaper/wallpaper.component';
import type { ToastMessageOptions } from '@openng/optimus-ui/api';

@Component({
  imports: [RouterModule, ShellComponent, TranslocoDirective, Avatar, WallpaperComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageToastService],
})
export class AppComponent implements OnInit {
  items = signal<MenuBarLink[]>(menubarItems);

  protected readonly configService = inject(ConfigService);

  private readonly el = inject(ElementRef);
  private readonly messageToastService = inject(MessageToastService);
  private readonly router = inject(Router);
  private readonly translocoService = inject(TranslocoService);

  constructor() {
    // Router anchor scrolling (e.g. /settings#links) must land below the fixed shell bar
    inject(ViewportScroller).setOffset(() => {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return [0, rootFontSize * 5.5];
    });

    // The shell's mobile menu button ships without an accessible name. Label it whenever it renders
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const host: HTMLElement = this.el.nativeElement;
      const label = () => {
        const button = host.querySelector<HTMLElement>('.garuda-shell__dropdown-toggle button, .p-menubar-button');
        if (button && !button.getAttribute('aria-label')) {
          button.setAttribute('aria-label', this.translocoService.translate('common.menu'));
          button.setAttribute('aria-haspopup', 'menu');
        }
      };
      label();
      const observer = new MutationObserver(label);
      observer.observe(host, { childList: true, subtree: true });
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  /**
   * Base href would turn "#main" into a navigation to "/", so move focus by hand
   */
  protected skipToMain(event: Event): void {
    event.preventDefault();
    const main = document.getElementById('main');
    main?.focus();
    main?.scrollIntoView();
  }

  ngOnInit(): void {
    void this.setupLabels(this.translocoService.getActiveLang());

    this.translocoService.langChanges$.subscribe((lang) => {
      void this.setupLabels(lang);
    });

    let firstNavigationComplete = false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (firstNavigationComplete) {
          document.body.classList.add('is-transitioning');
        }
      } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
        document.body.classList.remove('is-transitioning');
      } else if (event instanceof NavigationEnd) {
        firstNavigationComplete = true;
      }
    });

    this.configService.initConfig();
  }

  async setupLabels(lang: string): Promise<void> {
    const results: string[] = await Promise.all(
      this.items().map((item) =>
        firstValueFrom(this.translocoService.selectTranslate(item.translocoKey || item.label, {}, lang)),
      ),
    );

    this.items.set(this.items().map((item, index) => ({ ...item, label: results[index] })));
  }

  displayEasterEgg() {
    const oneToSix: number = Math.floor(Math.random() * 5) + 1;
    const oneToTwenty: number = Math.floor(Math.random() * 20) + 1;

    const title: string = this.translocoService.translate(`easterEggs.easterEgg${oneToTwenty}.title`);
    const content: string = this.translocoService.translate(`easterEggs.easterEgg${oneToTwenty}.content`);

    const options: ToastMessageOptions = {
      sticky: true,
      life: 10000,
      icon: 'pi pi-spinner pi-spin',
    };
    switch (oneToSix) {
      case 1:
        this.messageToastService.info(title, content, 'top-center', options);
        break;
      case 2:
        this.messageToastService.error(title, content, 'top-center', options);
        break;
      case 3:
        this.messageToastService.success(title, content, 'top-center', options);
        break;
      case 4:
        this.messageToastService.warn(title, content, 'top-center', options);
        break;
      case 5:
        this.messageToastService.secondary(title, content, 'top-center', options);
        break;
    }
  }
}
