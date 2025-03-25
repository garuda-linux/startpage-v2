import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import type { ContactLinks, ServiceLinks } from '../types';
import { contactLinks, serviceLinks } from '../../../config';
import { ConfigService } from '../config/config.service';
import { Panel } from 'primeng/panel';

@Component({
  selector: 'app-links',
  imports: [CommonModule, NgOptimizedImage, Panel],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent {
  contactLinks = signal<ContactLinks>(contactLinks);
  links = signal<ServiceLinks>(serviceLinks);

  protected readonly configService = inject(ConfigService);
}
