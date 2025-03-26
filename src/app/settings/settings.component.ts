import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  Renderer2,
  signal,
  ViewChild,
  type WritableSignal,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import type { LogoList, SearchEngineList, ServiceLink, ServiceLinks, WallpaperList } from '../types';
import { logos, type SearchEngine, searchEngineMappings, wallpapers } from '../../../config';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import type { AppSettings } from '../config/interfaces';
import { ConfigService } from '../config/config.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { TitleComponent } from '../title/title.component';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { type Table, TableModule, type TableRowReorderEvent } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Panel } from 'primeng/panel';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { MessageToastService } from '@garudalinux/core';
import { MenuEditorComponent } from '../menu-editor/menu-editor.component';
import { AvailableJokeSources, jokeSources } from '../jokes/jokes';

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    Checkbox,
    FormsModule,
    Select,
    InputText,
    TranslocoDirective,
    TitleComponent,
    Button,
    ConfirmDialog,
    Dialog,
    Toolbar,
    TableModule,
    IconField,
    InputIcon,
    Panel,
    FileUpload,
    MenuEditorComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  @ViewChild('linkTable') linkTable!: Table;

  activeJoke = signal<AvailableJokeSources>('dev-excuses');
  activeSearchEngine = signal<SearchEngine>('searxng-privau');
  blurBackground = signal<number>(0);
  customLinks = signal<ServiceLinks>([]);
  customTitle = signal<string>('');
  defaultLinks = signal<boolean>(true);
  fitWallpaper = signal<string>('cover');
  jokesEnabled = signal<boolean>(true);
  logo = signal<string>('default');
  logoUrl = signal<string>('');
  searchEngineName = signal<string>('');
  searchEngineUrl = signal<string>('');
  showNews = signal<boolean>(true);
  username = signal<string>('');
  wallpaper = signal<string>('');
  wallpaperUrl = signal<string>('');
  welcomeText = signal<string>('');

  link = signal<ServiceLink>({} as ServiceLink);
  linkDialog = signal<boolean>(false);
  linkSubmitted = signal<boolean>(false);
  selectedLinks = signal<ServiceLinks | null>(null);

  protected readonly configService = inject(ConfigService);
  protected readonly logos: LogoList = logos.sort((a, b) => a.name.localeCompare(b.name));
  protected readonly searchEngineMappings: SearchEngineList = searchEngineMappings.sort((a, b) =>
    a.prettyName.localeCompare(b.prettyName),
  );
  protected readonly wallpapers: WallpaperList = wallpapers.sort((a, b) => a.name.localeCompare(b.name));
  protected readonly jokeSources = jokeSources;
  private readonly confirmationService = inject(ConfirmationService);
  private readonly document = inject(DOCUMENT);
  private readonly el = inject(ElementRef);
  private readonly messageToastService = inject(MessageToastService);
  private readonly renderer = inject(Renderer2);
  private readonly translocoService = inject(TranslocoService);

  constructor() {
    effect(() => {
      const settings: AppSettings = this.configService.settings();
      const settingsKeys = this as unknown as {
        [key: string]: WritableSignal<any>;
      };
      for (const key of Object.keys(settingsKeys)) {
        if (Object.prototype.hasOwnProperty.call(settings, key)) {
          settingsKeys[key].set(settings[key]);
        }
      }
    });
    effect(() => {
      const links: ServiceLinks = this.customLinks();
      this.configService.updateConfig('customLinks', links);
    });
  }

  /**
   * Update the configuration value in both the service and the store.
   * @param key Key of the configuration to update
   * @param value New value for the configuration
   */
  updateConfig(key: string, value: any) {
    this.configService.updateConfig(key, value, this.renderer, this.el);
  }

  /**
   * Open the link dialog for creating a new link.
   */
  openNew() {
    this.link.set({} as ServiceLink);
    this.linkSubmitted.set(false);
    this.linkDialog.set(true);
  }

  /**
   * Open the link dialog for editing an existing link.
   * @param link The link to edit
   */
  editLink(link: ServiceLink) {
    this.link.set({ ...link });
    this.linkDialog.set(true);
  }

  /**
   * Delete selected links after confirmation.
   */
  deleteSelectedLinks() {
    this.confirmationService.confirm({
      message: this.translocoService.translate('settings.confirmDelete'),
      header: this.translocoService.translate('settings.confirm'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customLinks.update((links) => links.filter((val) => !this.selectedLinks()?.includes(val)));
        this.selectedLinks.set(null);
        this.messageToastService.success(
          this.translocoService.translate('settings.success'),
          this.translocoService.translate('settings.linksDeleted'),
        );
      },
    });
  }

  /**
   * Hide the link dialog.
   */
  hideDialog() {
    this.linkDialog.set(false);
    this.linkSubmitted.set(false);
  }

  /**
   * Delete a link after confirmation.
   * @param link The link to delete
   */
  deleteLink(link: ServiceLink) {
    this.confirmationService.confirm({
      message: `${this.translocoService.translate('settings.confirmDeleteLink')} ${link.title} ?`,
      header: this.translocoService.translate('settings.confirmHeader'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customLinks.update((links) => links.filter((val) => val.id !== link.id));
        this.link.set({} as ServiceLink);
        this.messageToastService.success(
          this.translocoService.translate('settings.success'),
          this.translocoService.translate('settings.linkDeleted'),
        );
      },
    });
  }

  /**
   * Find the index of a link by its link as a string.
   * @param link The link ID to search for
   * @return The index of the link in the customLinks array, or -1 if not found
   */
  findIndexById(link: string): number {
    let index = -1;
    for (let i = 0; i < this.customLinks().length; i++) {
      if (this.customLinks()[i].id === link) {
        index = i;
        break;
      }
    }
    return index;
  }

  /**
   * Generate a random ID for a new link.
   * @returns A random string of 3 characters
   */
  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 3; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  /**
   * Save the link after validation.
   */
  saveLink() {
    this.linkSubmitted.set(true);

    if (this.link().id) {
      this.customLinks()[this.findIndexById(this.link().id)] = this.link();
      this.messageToastService.success(
        this.translocoService.translate('settings.success'),
        this.translocoService.translate('settings.linkUpdated'),
      );
    } else {
      this.link().id = this.createId();
      this.link().icon = '/assets/garuda-purple.svg';
      this.customLinks.update((links) => [...links, this.link()]);
      this.messageToastService.success(
        this.translocoService.translate('settings.success'),
        this.translocoService.translate('settings.linkCreated'),
      );
    }
    this.linkDialog.set(false);
    this.link.set({} as ServiceLink);
  }

  /**
   * Reorder the links in the table.
   * @param $event The event containing the link data
   */
  onRowReorder($event: TableRowReorderEvent) {
    if (!$event.dragIndex || !$event.dropIndex) return;

    const reorderedLinks: ServiceLinks = [...this.customLinks()];
    const movedLink: ServiceLink = reorderedLinks[$event.dragIndex];
    reorderedLinks.splice($event.dragIndex, 1);
    reorderedLinks.splice($event.dropIndex, 0, movedLink);
    this.customLinks.set(reorderedLinks);
  }

  /**
   * Download the current settings as a JSON file.
   */
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

  /**
   * Restore settings from a JSON file, after confirmation.
   * @param $event The event containing the file data
   */
  restoreSettings($event: FileSelectEvent) {
    this.confirmationService.confirm({
      message: this.translocoService.translate('settings.confirmRestore'),
      header: this.translocoService.translate('settings.confirmHeader'),
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.configService.restoreSettings($event.currentFiles[0], this.renderer, this.el);
        this.messageToastService.success(
          this.translocoService.translate('settings.success'),
          this.translocoService.translate('settings.settingsRestored'),
        );
      },
    });
  }

  /**
   * Reset settings to default values, after confirmation.
   */
  resetSettings() {
    this.confirmationService.confirm({
      message: this.translocoService.translate('settings.confirmReset'),
      header: this.translocoService.translate('settings.confirmHeader'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.configService.resetSettings(this.renderer, this.el);
        this.messageToastService.success(
          this.translocoService.translate('settings.success'),
          this.translocoService.translate('settings.settingsReset'),
        );
      },
    });
  }
}
