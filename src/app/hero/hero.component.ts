import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConfigService } from '../config/config.service';

const DEFAULT_LOGO = 'assets/logos/violet-orange.png';

@Component({
  selector: 'app-hero',
  imports: [TranslocoDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly configService = inject(ConfigService);

  protected readonly now = signal(new Date());

  protected readonly logoSource = computed<string | null>(() => {
    const { logo, logoUrl } = this.configService.settings();
    if (logo === 'none') return null;
    if (logo === 'custom' && logoUrl) return logoUrl;
    // Unknown or empty values (e.g. older "default", or "custom" without an image) fall back
    return logo && logo !== 'custom' && logo !== 'default' ? logo : DEFAULT_LOGO;
  });

  /**
   * The logo when shown in its large style, beside the greeting
   */
  protected readonly largeLogo = computed(() => {
    const { showLogo, logoStyle } = this.configService.settings();
    return showLogo && (logoStyle ?? 'large') === 'large' ? this.logoSource() : null;
  });

  /**
   * Formatted with the browser's Intl locale (undefined), not the app's UI language
   */
  protected readonly dateLabel = computed(() =>
    new Intl.DateTimeFormat(undefined, { weekday: 'long', day: 'numeric', month: 'long' }).format(this.now()),
  );

  /**
   * Clock split into parts so each one can animate independently when it changes
   */
  protected readonly clock = computed(() => {
    const date = this.now();
    const h24 = this.configService.settings().clock24h;
    // Browser locale decides digits and the AM/PM wording. The setting only picks 12 or 24 hours
    const parts = new Intl.DateTimeFormat(undefined, {
      hour: h24 ? '2-digit' : 'numeric',
      minute: '2-digit',
      hourCycle: h24 ? 'h23' : 'h12',
    }).formatToParts(date);
    const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? '';
    return {
      hours: part('hour'),
      minutes: part('minute'),
      period: h24 ? '' : part('dayPeriod'),
      iso: date.toISOString(),
    };
  });

  protected readonly greetingKey = computed(() => {
    const hour = this.now().getHours();
    if (hour < 5) return 'home.greeting.night';
    if (hour < 12) return 'home.greeting.morning';
    if (hour < 18) return 'home.greeting.afternoon';
    return 'home.greeting.evening';
  });

  constructor() {
    // Tick on the minute boundary instead of polling every second
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const msToNextMinute = 60_000 - (Date.now() % 60_000);
      timeout = setTimeout(() => {
        this.now.set(new Date());
        schedule();
      }, msToNextMinute + 20);
    };
    schedule();
    inject(DestroyRef).onDestroy(() => clearTimeout(timeout));
  }
}
