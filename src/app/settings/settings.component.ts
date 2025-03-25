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
import { CommonModule } from '@angular/common';
import { LogoList, SearchEngineList, ServiceLink, ServiceLinks, WallpaperList } from '../types';
import { logos, SearchEngine, searchEngineMappings, wallpapers } from '../../../config';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { AppSettings } from '../config/interfaces';
import { ConfigService } from '../config/config.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { TitleComponent } from '../title/title.component';
import { Button } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule, TableRowReorderEvent } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Panel } from 'primeng/panel';

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
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  providers: [MessageService, ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  @ViewChild('linkTable') linkTable!: Table;

  customTitle = signal<string>('');
  defaultLinks = signal<boolean>(true);
  jokesEnabled = signal<boolean>(true);
  customLinks = signal<ServiceLinks>([]);
  activeSearchEngine = signal<SearchEngine>('searxng-privau');
  linkDialog = signal<boolean>(false);
  logo = signal<string>('default');
  logoUrl = signal<string>('');
  username = signal<string>('');
  wallpaper = signal<string>('');
  wallpaperUrl = signal<string>('');
  fitWallpaper = signal<string>('cover');
  blurBackground = signal<number>(0);
  welcomeText = signal<string>('');
  searchEngineUrl = signal<string>('');
  searchEngineName = signal<string>('');

  link = signal<ServiceLink>({} as ServiceLink);
  linkSubmitted = signal<boolean>(false);
  selectedLinks = signal<ServiceLinks | null>(null);

  protected readonly configService = inject(ConfigService);
  protected readonly logos: LogoList = logos.sort((a, b) => a.name.localeCompare(b.name));
  protected readonly searchEngineMappings: SearchEngineList = searchEngineMappings.sort((a, b) =>
    a.prettyName.localeCompare(b.prettyName),
  );
  protected readonly wallpapers: WallpaperList = wallpapers.sort((a, b) => a.name.localeCompare(b.name));
  private readonly confirmationService = inject(ConfirmationService);
  private readonly el = inject(ElementRef);
  private readonly messageService = inject(MessageService);
  private readonly renderer = inject(Renderer2);
  private readonly translocoService = inject(TranslocoService);

  constructor() {
    effect(() => {
      const settings: AppSettings = this.configService.settings();
      const settingsKeys = this as unknown as { [key: string]: WritableSignal<any> };
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
        this.customLinks.set(this.customLinks().filter((val) => !this.selectedLinks()?.includes(val)));
        this.selectedLinks.set(null);
        this.messageService.add({
          severity: 'success',
          summary: this.translocoService.translate('settings.success'),
          detail: this.translocoService.translate('settings.linksDeleted'),
          life: 3000,
        });
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
      header: this.translocoService.translate('settings.confirmDeleteLinkHeader'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customLinks.set(this.customLinks().filter((val) => val.link !== link.link));
        this.link.set({} as ServiceLink);
        this.messageService.add({
          severity: 'success',
          summary: this.translocoService.translate('settings.success'),
          detail: this.translocoService.translate('settings.linkDeleted'),
          life: 3000,
        });
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
      if (this.customLinks()[i].link === link) {
        index = i;
        break;
      }
    }
    return index;
  }

  /**
   * Generate a random ID for a new link.
   * @returns A random string of 5 characters
   */
  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
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
      this.customLinks()[this.findIndexById(this.link().title)] = this.link();
      this.messageService.add({
        severity: 'success',
        summary: this.translocoService.translate('settings.success'),
        detail: this.translocoService.translate('settings.linkUpdated'),
        life: 3000,
      });
    } else {
      this.link().id = this.createId();
      this.link().icon = '/assets/garuda-purple.svg';
      this.customLinks.update((links) => [...links, this.link()]);
      this.messageService.add({
        severity: 'success',
        summary: this.translocoService.translate('settings.success'),
        detail: this.translocoService.translate('settings.linkCreated'),
        life: 3000,
      });
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
}
