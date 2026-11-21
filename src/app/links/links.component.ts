import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConfigService } from '../config/config.service';
import type { ServiceLink } from '../types';
import { hostnameOf, openUrl } from '../functions';

/**
 * Number of links reachable through the 1–9 keyboard shortcuts
 */
const SHORTCUT_COUNT = 9;

/**
 * The link dock: one row of launcher items, labelled unless compact density or the label toggle hides them.
 */
@Component({
  selector: 'app-links',
  imports: [TranslocoDirective, RouterLink],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent {
  protected readonly configService = inject(ConfigService);
  protected readonly hostnameOf = hostnameOf;
  protected readonly shortcutCount = SHORTCUT_COUNT;

  protected readonly links = computed<ServiceLink[]>(() => this.configService.settings().customLinks ?? []);
  protected readonly compact = computed(() => this.configService.settings().tileDensity === 'compact');
  /**
   * Compact density is icons only. Otherwise labels follow the user's toggle
   */
  protected readonly showLabels = computed(() => !this.compact() && this.configService.settings().showLinkLabels);
  protected readonly brokenIcons = signal<ReadonlySet<string>>(new Set());

  /**
   * Open the n-th link (1-based), used by the global number shortcuts.
   * @returns Whether a link existed at that position.
   */
  openByShortcut(position: number): boolean {
    const link = this.links()[position - 1];
    if (!link || position > SHORTCUT_COUNT) return false;
    openUrl(link.link, this.configService.settings().openInNewTab);
    return true;
  }

  protected markBroken(id: string): void {
    this.brokenIcons.update((set) => new Set(set).add(id));
  }
}
