import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConfigService } from '../config/config.service';
import { type EditorItem, ListEditorComponent } from '../list-editor/list-editor.component';
import type { MenuBarItems } from '../types';

@Component({
  selector: 'app-menu-editor',
  imports: [ListEditorComponent, TranslocoDirective],
  template: `
    <app-list-editor
      *transloco="let t"
      (itemsChange)="save($event)"
      [addLabel]="t('settings.addMenuItem')"
      [items]="items()"
      iconMode="class"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuEditorComponent {
  private readonly configService = inject(ConfigService);

  protected readonly items = computed<EditorItem[]>(() =>
    this.configService.settings().customMenuLinks.map((item) => ({
      id: item.id,
      title: item.label,
      url: item.url ?? item.routerLink ?? '',
      icon: item.icon,
    })),
  );

  protected save(items: EditorItem[]): void {
    const existing = new Map(this.configService.settings().customMenuLinks.map((item) => [item.id, item]));
    const menu: MenuBarItems = items.map((item) => {
      const previous = existing.get(item.id);
      const internal = item.url.startsWith('/');
      return {
        id: item.id,
        icon: item.icon || 'pi pi-link',
        label: item.title,
        // A renamed item must not be overwritten by its translation again
        translocoKey: previous && previous.label === item.title ? previous.translocoKey : '',
        url: internal ? undefined : item.url,
        routerLink: internal ? item.url : undefined,
      };
    });
    this.configService.updateConfig('customMenuLinks', menu);
  }
}
