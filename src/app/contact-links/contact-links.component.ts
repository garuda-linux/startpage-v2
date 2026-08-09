import { ChangeDetectionStrategy, Component, computed, inject, Injector, runInInjectionContext } from '@angular/core';
import type { ContactLinks } from '../types';
import { contactLinks } from '../../../config';
import { ConfigService } from '../config/config.service';
import { SmallCardModel, CardComponent, PopupService } from '@garudalinux/core';
import { DialogService } from '@openng/optimus-ui/dynamicdialog';

@Component({
  selector: 'app-contact-links',
  imports: [CardComponent],
  providers: [DialogService, PopupService],
  templateUrl: './contact-links.component.html',
  styleUrl: './contact-links.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactLinksComponent {
  private readonly injector = inject(Injector);
  protected readonly configService = inject(ConfigService);

  gridCols = computed(() => `col-span-${this.configService.settings().gridCols} cursor-pointer p-2 text-center`);

  contactsConfig = computed<SmallCardModel[]>(() => {
    return runInInjectionContext(this.injector, () => {
      const currentLinks: ContactLinks = contactLinks || [];
      
      return currentLinks.map((contact) => ({
        cardRole: 'product-showcase-small',
        cardTitle: contact.title || '',
        cardImageUrl: contact.logo || '',
        link: contact.link || contact.routerLink || '',
      }));
    });
  });
}