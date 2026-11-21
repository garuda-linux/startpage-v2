import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, output, signal } from '@angular/core';
import {
  CdkDrag,
  type CdkDragDrop,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { InputText } from '@openng/optimus-ui/inputtext';
import { hostnameOf } from '../functions';

/**
 * Normalised row the editor works on. Each parent maps its own model in and out
 */
export interface EditorItem {
  id: string;
  title: string;
  url: string;
  icon: string;
}

interface Draft extends EditorItem {
  isNew: boolean;
}

/**
 * Icons offered by the picker when icons are PrimeIcons classes instead of image URLs
 */
const ICON_CHOICES = [
  'home',
  'users',
  'server',
  'info-circle',
  'book',
  'heart',
  'cog',
  'globe',
  'github',
  'code',
  'comments',
  'envelope',
  'calendar',
  'download',
  'cloud',
  'shield',
  'star',
  'bolt',
  'chart-line',
  'desktop',
  'search',
  'link',
  'bookmark',
  'question-circle',
].map((name) => `pi pi-${name}`);

const UNDO_MS = 6000;

@Component({
  selector: 'app-list-editor',
  imports: [
    NgTemplateOutlet,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    CdkDragPlaceholder,
    FormsModule,
    InputText,
    TranslocoDirective,
  ],
  templateUrl: './list-editor.component.html',
  styleUrl: './list-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListEditorComponent {
  items = input.required<EditorItem[]>();
  /**
   * 'image' = icon is a URL, 'class' = icon is a PrimeIcons class
   */
  iconMode = input<'image' | 'class'>('image');
  addLabel = input.required<string>();
  itemsChange = output<EditorItem[]>();

  protected readonly hostnameOf = hostnameOf;
  protected readonly iconChoices = ICON_CHOICES;
  protected readonly draft = signal<Draft | null>(null);
  protected readonly submitted = signal(false);
  protected readonly removed = signal<{ item: EditorItem; index: number } | null>(null);
  protected readonly brokenIcons = signal<ReadonlySet<string>>(new Set());

  protected readonly errors = computed(() => {
    const draft = this.draft();
    if (!draft) return { title: false, url: false };
    return { title: !draft.title.trim(), url: !isValidUrl(draft.url) };
  });

  private undoTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.undoTimer));
  }

  protected startAdd(): void {
    this.submitted.set(false);
    this.draft.set({ id: '', title: '', url: '', icon: '', isNew: true });
  }

  protected startEdit(item: EditorItem): void {
    this.submitted.set(false);
    this.draft.set({ ...item, isNew: false });
  }

  protected cancel(): void {
    this.draft.set(null);
  }

  protected patch(changes: Partial<Draft>): void {
    this.draft.update((d) => (d ? { ...d, ...changes } : d));
  }

  /**
   * Fill the icon field with the site's own favicon, no third-party lookup involved
   */
  protected useSiteIcon(): void {
    const draft = this.draft();
    if (!draft || !isValidUrl(draft.url)) return;
    this.patch({ icon: `${new URL(draft.url).origin}/favicon.ico` });
  }

  protected save(): void {
    this.submitted.set(true);
    const draft = this.draft();
    const errors = this.errors();
    if (!draft || errors.title || errors.url) return;

    const { isNew, ...item } = draft;
    item.title = item.title.trim();
    item.url = item.url.trim();
    if (isNew) {
      this.itemsChange.emit([...this.items(), { ...item, id: createId() }]);
    } else {
      this.itemsChange.emit(this.items().map((existing) => (existing.id === item.id ? item : existing)));
    }
    this.draft.set(null);
  }

  protected remove(item: EditorItem, index: number): void {
    if (this.draft()?.id === item.id) this.draft.set(null);
    this.itemsChange.emit(this.items().filter((existing) => existing.id !== item.id));
    this.removed.set({ item, index });
    clearTimeout(this.undoTimer);
    this.undoTimer = setTimeout(() => this.removed.set(null), UNDO_MS);
  }

  protected undo(): void {
    const removed = this.removed();
    if (!removed) return;
    const items = [...this.items()];
    items.splice(Math.min(removed.index, items.length), 0, removed.item);
    this.itemsChange.emit(items);
    this.removed.set(null);
  }

  protected drop(event: CdkDragDrop<EditorItem[]>): void {
    if (event.previousIndex === event.currentIndex) return;
    const items = [...this.items()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.itemsChange.emit(items);
  }

  /**
   * Keyboard reordering for people who can't drag
   */
  protected move(index: number, delta: number): void {
    const target = index + delta;
    if (target < 0 || target >= this.items().length) return;
    const items = [...this.items()];
    moveItemInArray(items, index, target);
    this.itemsChange.emit(items);
  }

  protected markBroken(id: string): void {
    this.brokenIcons.update((set) => new Set(set).add(id));
  }
}

function isValidUrl(value: string): boolean {
  const trimmed = value.trim();
  // Router paths such as "/settings" are valid menu targets
  if (trimmed.startsWith('/')) return trimmed.length > 1;
  try {
    return ['http:', 'https:'].includes(new URL(trimmed).protocol);
  } catch {
    return false;
  }
}

function createId(): string {
  return Math.random().toString(36).slice(2, 9);
}
