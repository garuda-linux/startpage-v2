import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConfigService } from '../config/config.service';
import { type EditorItem, ListEditorComponent } from '../list-editor/list-editor.component';
import type { ServiceLinks } from '../types';

@Component({
  selector: 'app-links-editor',
  imports: [ListEditorComponent, TranslocoDirective],
  template: `
    <app-list-editor
      *transloco="let t"
      (itemsChange)="save($event)"
      [addLabel]="t('settings.addLink')"
      [items]="items()"
      iconMode="image"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksEditorComponent {
  private readonly configService = inject(ConfigService);

  protected readonly items = computed<EditorItem[]>(() =>
    this.configService.settings().customLinks.map((link) => ({
      id: link.id,
      title: link.title,
      url: link.link,
      icon: link.icon,
    })),
  );

  protected save(items: EditorItem[]): void {
    const existing = new Map(this.configService.settings().customLinks.map((link) => [link.id, link]));
    const links: ServiceLinks = items.map((item) => ({
      ...existing.get(item.id),
      subtitle: existing.get(item.id)?.subtitle ?? '',
      id: item.id,
      title: item.title,
      link: item.url,
      icon: item.icon,
    }));
    this.configService.updateConfig('customLinks', links);
  }
}
