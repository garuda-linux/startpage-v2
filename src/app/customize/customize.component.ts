import { ChangeDetectionStrategy, Component, computed, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';
import { Drawer } from '@openng/optimus-ui/drawer';
import { ToggleSwitch } from '@openng/optimus-ui/toggleswitch';
import { SegmentedComponent } from '../segmented/segmented.component';
import { Slider } from '@openng/optimus-ui/slider';
import { InputText } from '@openng/optimus-ui/inputtext';
import { ConfigService } from '../config/config.service';
import { splitTheme, themeFamilies, themeStyles } from '../theme';
import { imageFileToDataUrl, wallpaperBlurPx } from '../functions';
import { logos, wallpapers } from '../../../config';
import type { AppSettings } from '../config/interfaces';
import {
  clockSegments,
  densitySegments,
  logoStyleSegments,
  motionSegments,
  sourceSegments,
} from '../settings/segment-options';

interface ToggleRow {
  key: keyof AppSettings & string;
  label: string;
  dependsOn?: keyof AppSettings & string;
}

@Component({
  selector: 'app-customize',
  imports: [Drawer, ToggleSwitch, SegmentedComponent, Slider, InputText, FormsModule, RouterLink, TranslocoDirective],
  templateUrl: './customize.component.html',
  styleUrl: './customize.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeComponent {
  visible = model(false);

  protected readonly configService = inject(ConfigService);
  protected readonly wallpaperBlurPx = wallpaperBlurPx;
  protected readonly logos = logos[1].items;
  protected readonly uploadError = signal(false);
  protected readonly themeFamilies = themeFamilies;
  protected readonly themeStyles = themeStyles.map((style) => ({ label: style, value: style }));

  protected readonly toggles: ToggleRow[] = [
    { key: 'showGreeting', label: 'customize.showGreeting' },
    { key: 'showLogo', label: 'customize.showLogo' },
    { key: 'jokesEnabled', label: 'customize.jokes', dependsOn: 'showGreeting' },
    { key: 'showClock', label: 'customize.showClock' },
    { key: 'clock24h', label: 'customize.clock24h', dependsOn: 'showClock' },
    { key: 'showNews', label: 'customize.news' },
    { key: 'defaultLinks', label: 'customize.community' },
  ];

  /**
   * Predefined wallpapers, deduplicated, with a lightweight thumbnail next to each
   */
  protected readonly wallpapers = [
    ...new Map(
      wallpapers[1].items
        .filter((item) => item.value)
        .map((item) => [
          item.value,
          {
            ...item,
            thumb: item.value!.replace('wallpapers/', 'wallpapers/thumbs/').replace(/\.(png|jpe?g)$/, '.webp'),
          },
        ]),
    ).values(),
  ];

  protected readonly theme = computed(() => splitTheme(this.configService.settings().activeTheme));

  private readonly translation = toSignal(inject(TranslocoService).selectTranslation(), { initialValue: {} });

  private readonly label = (key: string): string => (this.translation() as Record<string, string>)[key] ?? key;

  protected readonly motionOptions = computed(() => motionSegments(this.label));
  protected readonly densityOptions = computed(() => densitySegments(this.label));
  protected readonly logoStyleOptions = computed(() => logoStyleSegments(this.label));
  protected readonly clockOptions = computed(() => clockSegments(this.label));
  protected readonly sourceOptions = computed(() => sourceSegments(this.label));

  protected readonly modeOptions = computed(() => [
    { label: this.label('customize.dark'), value: true },
    { label: this.label('customize.light'), value: false },
  ]);

  private returnFocus: HTMLElement | null = null;

  /**
   * Non-modal drawers get no focus handling from the library: move focus in, and back out on close
   */
  protected focusDrawer(): void {
    this.returnFocus = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('.p-drawer.customize button, .p-drawer.customize [href]')?.focus();
    });
  }

  protected restoreFocus(): void {
    this.returnFocus?.focus();
    this.returnFocus = null;
  }

  protected async uploadLogo(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    try {
      this.update('logoUrl', await imageFileToDataUrl(file));
      this.update('logo', 'custom');
      this.uploadError.set(false);
    } catch {
      this.uploadError.set(true);
    }
  }

  update(key: string, value: unknown): void {
    this.configService.updateConfig(key, value);
  }

  protected setTheme(family: string, style: string): void {
    this.update('activeTheme', `${family} ${style}`);
  }

  protected useFullImage(event: Event, src: string): void {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith(src)) return;
    img.src = src;
  }
}
