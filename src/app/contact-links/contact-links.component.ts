import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ContactLinks } from '../types';
import { Panel } from 'primeng/panel';
import { contactLinks } from '../../../config';

@Component({
  selector: 'app-contact-links',
  imports: [CommonModule, Panel],
  templateUrl: './contact-links.component.html',
  styleUrl: './contact-links.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactLinksComponent {
  contactLinks = signal<ContactLinks>(contactLinks);
}
