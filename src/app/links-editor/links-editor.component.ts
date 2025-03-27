import { ChangeDetectionStrategy, Component, effect, inject, signal, untracked, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { type Table, TableModule, type TableRowReorderEvent } from 'primeng/table';
import type { ServiceLink, ServiceLinks } from '../types';
import { ConfigService } from '../config/config.service';
import { ConfirmationService } from 'primeng/api';
import { MessageToastService } from '@garudalinux/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-links-editor',
  imports: [
    CommonModule,
    Toolbar,
    Button,
    TableModule,
    TranslocoDirective,
    IconField,
    InputIcon,
    InputText,
    Dialog,
    FormsModule,
  ],
  templateUrl: './links-editor.component.html',
  styleUrl: './links-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksEditorComponent {
  @ViewChild('linkTable') linkTable!: Table;

  customLinks = signal<ServiceLinks>([]);
  link = signal<ServiceLink>({} as ServiceLink);
  linkDialog = signal<boolean>(false);
  linkSubmitted = signal<boolean>(false);
  selectedLinks = signal<ServiceLinks | null>(null);

  protected readonly configService = inject(ConfigService);

  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageToastService = inject(MessageToastService);
  private readonly translocoService = inject(TranslocoService);

  constructor() {
    effect(() => {
      this.customLinks.set(this.configService.settings().customLinks);
    });
    effect(() => {
      const currentSettings: ServiceLinks = untracked(this.configService.settings).customLinks;
      const newSettings: ServiceLinks = this.customLinks();

      if (newSettings.length !== newSettings.length) {
        this.configService.updateConfig('customLinks', newSettings);
        return;
      }

      for (const i in newSettings) {
        if (currentSettings[i].id !== newSettings[i].id) {
          this.configService.updateConfig('customLinks', newSettings);
          break;
        }
      }
    });
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
}
