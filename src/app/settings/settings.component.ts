import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  DOCUMENT,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import type { LogoList, WallpaperList } from '../types';
import { autocompleteProviders, logos, type SearchEngineList, searchEngineMappings, wallpapers } from '../../../config';
import { ToggleSwitch } from '@openng/optimus-ui/toggleswitch';
import { SegmentedComponent } from '../segmented/segmented.component';
import { Slider } from '@openng/optimus-ui/slider';
import { FormsModule } from '@angular/forms';
import { Select } from '@openng/optimus-ui/select';
import { InputText } from '@openng/optimus-ui/inputtext';
import type { AppSettings } from '../config/interfaces';
import { ConfigService } from '../config/config.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Button } from '@openng/optimus-ui/button';
import { ConfirmDialog } from '@openng/optimus-ui/confirmdialog';
import { ConfirmationService, MessageService } from '@openng/optimus-ui/api';
import { type FileSelectEvent, FileUpload } from '@openng/optimus-ui/fileupload';
import { MessageToastService } from '@garudalinux/core/message-toast';
import { MenuEditorComponent } from '../menu-editor/menu-editor.component';
import { jokeSources } from '../jokes/jokes';
import { themes } from '../theme';
import { imageFileToDataUrl, wallpaperBlurPx } from '../functions';
import { LinksEditorComponent } from '../links-editor/links-editor.component';
import { LangPipe } from '../lang/lang.pipe';
import { clockSegments, densitySegments, logoStyleSegments, motionSegments, sourceSegments } from './segment-options';

@Component({
  selector: 'app-settings',
  imports: [
    RouterLink,
    ToggleSwitch,
    SegmentedComponent,
    Slider,
    FormsModule,
    Select,
    InputText,
    TranslocoDirective,
    Button,
    ConfirmDialog,
    FileUpload,
    MenuEditorComponent,
    LinksEditorComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  providers: [MessageService, ConfirmationService, LangPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  protected readonly sections = [
    { id: 'appearance', label: 'settings.appearanceSection', icon: 'pi pi-palette' },
    { id: 'homepage', label: 'settings.homepageSection', icon: 'pi pi-home' },
    { id: 'search', label: 'settings.searchSection', icon: 'pi pi-search' },
    { id: 'personal', label: 'settings.personalSection', icon: 'pi pi-user' },
    { id: 'links', label: 'settings.customLinks', icon: 'pi pi-link' },
    { id: 'menu', label: 'settings.customMenu', icon: 'pi pi-bars' },
    { id: 'backup', label: 'settings.backupSection', icon: 'pi pi-download' },
  ];
  protected readonly activeSection = signal('appearance');

  protected readonly homepageToggles: { key: keyof AppSettings & string; label: string; dependsOn?: string }[] = [
    { key: 'showGreeting', label: 'customize.showGreeting' },
    { key: 'showLogo', label: 'customize.showLogo' },
    { key: 'showClock', label: 'customize.showClock' },
    { key: 'clock24h', label: 'customize.clock24h', dependsOn: 'showClock' },
    { key: 'showNews', label: 'settings.showNews' },
    { key: 'defaultLinks', label: 'customize.community' },
    { key: 'jokesEnabled', label: 'settings.jokesEnabledLabel' },
  ];

  protected readonly availableLanguages: {
    name: string;
    prettyName: string;
  }[] = [];
  protected readonly availableThemes: string[] = Object.keys(themes).sort();
  protected readonly autocompleteProviders: SearchEngineList = autocompleteProviders;
  protected readonly configService = inject(ConfigService);
  protected readonly wallpaperBlurPx = wallpaperBlurPx;
  protected readonly uploadError = signal(false);
  protected readonly jokeSources = jokeSources.sort((a, b) => a.name.localeCompare(b.name));
  protected readonly logos: LogoList = logos;
  protected readonly searchEngineMappings: SearchEngineList = searchEngineMappings;
  protected readonly wallpapers: WallpaperList = wallpapers;

  private readonly confirmationService = inject(ConfirmationService);
  private readonly document = inject(DOCUMENT);
  private readonly langPipe = inject(LangPipe);
  private readonly messageToastService = inject(MessageToastService);
  private readonly translocoService = inject(TranslocoService);
  private readonly translation = toSignal(this.translocoService.selectTranslation(), { initialValue: {} });

  protected readonly language = toSignal(this.translocoService.langChanges$, {
    initialValue: this.translocoService.getActiveLang(),
  });

  protected readonly motionOptions = computed(() => motionSegments(this.label));
  protected readonly logoStyleOptions = computed(() => logoStyleSegments(this.label));
  protected readonly clockOptions = computed(() => clockSegments(this.label));
  protected readonly sourceOptions = computed(() => sourceSegments(this.label));
  protected readonly densityOptions = computed(() => densitySegments(this.label));

  constructor() {
    for (const lang of this.translocoService.getAvailableLangs() as string[]) {
      this.availableLanguages.push({
        name: lang,
        prettyName: this.langPipe.transform(lang),
      });
    }

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible[0]) this.activeSection.set(visible[0].target.id);
        },
        { rootMargin: '-20% 0px -60% 0px' },
      );
      for (const section of this.sections) {
        const el = this.document.getElementById(section.id);
        if (el) observer.observe(el);
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected async uploadLogo(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    try {
      this.updateConfig('logoUrl', await imageFileToDataUrl(file));
      this.uploadError.set(false);
    } catch {
      this.uploadError.set(true);
    }
  }

  /**
   * Same-route fragment links do not navigate, so the scroll is done by hand.
   */
  protected scrollTo(id: string, event: Event): void {
    event.preventDefault();
    const section = this.document.getElementById(id);
    if (!section) return;
    const reduce = this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    section.focus({ preventScroll: true });
    this.activeSection.set(id);
    // Absolute path: with <base href="/"> a bare "#id" would resolve to the homepage
    history.replaceState(null, '', `${location.pathname}${location.search}#${id}`);
  }

  private readonly label = (key: string): string => (this.translation() as Record<string, string>)[key] ?? key;

  updateConfig(key: string, value: any) {
    this.configService.updateConfig(key, value);
  }

  downloadSettings() {
    const settings: AppSettings = this.configService.settings();
    const dataStr: string = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(settings));
    const downloadAnchorNode: HTMLAnchorElement = this.document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `settings-${new Date().toISOString().split('T')[0]}.json`);
    this.document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  restoreSettings($event: FileSelectEvent) {
    this.confirmationService.confirm({
      message: this.translocoService.translate('settings.confirmRestore'),
      header: this.translocoService.translate('settings.confirmHeader'),
      icon: 'pi pi-exclamation-triangle',
      ...this.confirmButtons('pi pi-check'),
      accept: async () => {
        await this.configService.restoreSettings($event.currentFiles[0]);
        this.messageToastService.success(
          this.translocoService.translate('settings.success'),
          this.translocoService.translate('settings.settingsRestored'),
        );
      },
    });
  }

  resetSettings() {
    this.confirmationService.confirm({
      message: this.translocoService.translate('settings.confirmReset'),
      header: this.translocoService.translate('settings.confirmHeader'),
      icon: 'pi pi-exclamation-triangle',
      ...this.confirmButtons('pi pi-refresh', 'danger'),
      accept: () => {
        this.configService.resetSettings();
        this.messageToastService.success(
          this.translocoService.translate('settings.success'),
          this.translocoService.translate('settings.settingsReset'),
        );
      },
    });
  }

  private confirmButtons(icon: string, severity?: 'danger') {
    return {
      acceptButtonProps: { label: this.label('settings.confirm'), icon, severity },
      rejectButtonProps: { label: this.label('settings.cancel'), text: true, severity: 'secondary' },
    };
  }
}
