import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { contactLinks } from '../../../config';
import { ConfigService } from '../config/config.service';
import type { ContactLinks } from '../types';

@Component({
  selector: 'app-contact-links',
  imports: [TranslocoDirective],
  templateUrl: './contact-links.component.html',
  styleUrl: './contact-links.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactLinksComponent {
  protected readonly configService = inject(ConfigService);
  protected readonly contacts: ContactLinks = contactLinks;
}
