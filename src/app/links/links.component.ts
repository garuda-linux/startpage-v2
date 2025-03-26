import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import type { ServiceLinks } from '../types';
import { serviceLinks } from '../../../config';
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
  links = signal<ServiceLinks>(serviceLinks);

  protected readonly configService = inject(ConfigService);
}
