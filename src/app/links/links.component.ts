import { ChangeDetectionStrategy, Component, computed, inject, Injector, runInInjectionContext } from '@angular/core';
import type { ServiceLinks } from '../types';
import { serviceLinks } from '../../../config';
import { ConfigService } from '../config/config.service';
import { SmallCardModel, CardComponent, PopupService } from '@garudalinux/core';
import { DialogService } from '@openng/optimus-ui/dynamicdialog';

@Component({
  selector: 'app-links',
  imports: [CardComponent],
  providers: [DialogService, PopupService],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent {
  private readonly injector = inject(Injector);
  protected readonly configService = inject(ConfigService);

  gridCols = computed(() => `col-span-${this.configService.settings().gridCols} cursor-pointer p-2 text-center`);

  productsConfig = computed<SmallCardModel[]>(() => {
    return runInInjectionContext(this.injector, () => {
      const currentLinks: ServiceLinks = serviceLinks || [];

      return currentLinks.map((link) => ({
        cardRole: 'product-showcase-small',
        cardTitle: link.title || link.id || '',
        cardImageUrl: link.icon || '',
        link: link.link || link.routerLink || '',
      }));
    });
  });

  protected openLink(url?: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}