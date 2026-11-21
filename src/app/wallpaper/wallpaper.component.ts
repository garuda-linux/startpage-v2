import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { optimizedWallpaper, wallpaperBlurPx } from '../functions';

/**
 * Fixed wallpaper layer behind the app. The blur is applied to the image itself, so it
 * works regardless of what the shell paints on top, and wallpaper changes crossfade.
 */
@Component({
  selector: 'app-wallpaper',
  template: `
    @for (url of [url()]; track url) {
      @if (url) {
        <div
          [class.layer--contain]="!settings().fitWallpaper"
          [style.--blur.px]="blur()"
          [style.background-image]="url"
          animate.enter="layer--in"
          animate.leave="layer--out"
          class="layer"
        ></div>
      }
    }
  `,
  styleUrl: './wallpaper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class WallpaperComponent {
  protected readonly settings = inject(ConfigService).settings;

  protected readonly url = computed<string | null>(() => {
    const { wallpaper, wallpaperUrl } = this.settings();
    const src = wallpaper === 'custom' ? wallpaperUrl : wallpaper;
    if (!src || src === 'none') return null;
    return `url("${optimizedWallpaper(src).replace(/"/g, '%22')}")`;
  });

  protected readonly blur = computed(() => {
    const { blurBackground, blurStrength } = this.settings();
    return blurBackground ? wallpaperBlurPx(blurStrength) : 0;
  });
}
