import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, output } from '@angular/core';

export interface SegmentedOption<T> {
  label: string;
  value: T;
}

/**
 * Segmented control styled on the startpage tokens. Equal-width segments let the
 * thumb slide with a single transform instead of measuring the DOM.
 */
@Component({
  selector: 'app-segmented',
  template: `
    <div
      [attr.aria-labelledby]="labelledBy() || null"
      [style.--count]="options().length"
      [style.--index]="selectedIndex()"
      class="seg"
      role="radiogroup"
    >
      @if (selectedIndex() >= 0) {
        <span class="seg__thumb" aria-hidden="true"></span>
      }
      @for (option of options(); track option.value; let i = $index) {
        <button
          (click)="select(option.value)"
          (keydown)="onKeydown($event, i)"
          [attr.aria-checked]="i === selectedIndex()"
          [tabindex]="i === focusIndex() ? 0 : -1"
          class="seg__option"
          role="radio"
          type="button"
        >
          {{ option.label }}
        </button>
      }
    </div>
  `,
  styleUrl: './segmented.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedComponent<T> {
  options = input.required<SegmentedOption<T>[]>();
  value = input<T>();
  labelledBy = input<string>();
  valueChange = output<T>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly selectedIndex = computed(() => this.options().findIndex((o) => o.value === this.value()));
  /**
   * Roving tabindex: the selected option, or the first one when nothing is selected
   */
  protected readonly focusIndex = computed(() => Math.max(0, this.selectedIndex()));

  protected select(value: T): void {
    if (value !== this.value()) this.valueChange.emit(value);
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const count = this.options().length;
    const next = (index + step + count) % count;
    this.select(this.options()[next].value);
    this.host.nativeElement.querySelectorAll<HTMLButtonElement>('.seg__option')[next]?.focus();
  }
}
