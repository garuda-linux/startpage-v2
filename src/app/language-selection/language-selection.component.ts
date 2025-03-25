import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangPipePipe } from '../lang-pipe/lang-pipe.pipe';
import { ScrollPanel } from 'primeng/scrollpanel';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Tooltip } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-language-selection',
  imports: [CommonModule, LangPipePipe, ScrollPanel, TranslocoDirective, Tooltip],
  templateUrl: './language-selection.component.html',
  styleUrl: './language-selection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectionComponent implements OnInit, OnDestroy {
  allLanguages = signal<string[]>([]);
  currentLanguage = signal<string>('en');

  ref = inject(DynamicDialogRef);
  cdr = inject(ChangeDetectorRef);
  instance = inject(DialogService).getInstance(this.ref);
  translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.currentLanguage.set(this.translocoService.getActiveLang());
    this.allLanguages.set(this.translocoService.getAvailableLangs() as string[]);
  }

  close(language: string): void {
    this.ref.close(language);
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.instance.close();
  }
}
