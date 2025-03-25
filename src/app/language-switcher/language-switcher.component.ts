import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  type OnDestroy,
  type OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule, type DynamicDialogRef } from 'primeng/dynamicdialog';
import { LanguageSelectionComponent } from '../language-selection/language-selection.component';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule, Button, TranslocoDirective, DynamicDialogModule, DialogModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent implements OnInit, OnDestroy {
  languages = signal<string[]>([]);
  ref: DynamicDialogRef | undefined;

  private readonly appService = inject(AppService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly dialogService = inject(DialogService);
  private readonly route = inject(Router).routerState.root;
  private readonly translocoService = inject(TranslocoService);

  /**
   * Initialize the component and subscribe to the router events to detect language changes
   * via query parameters.
   */
  ngOnInit() {
    if (
      this.route.snapshot.queryParams['lang'] &&
      this.translocoService.getAvailableLangs().includes(this.route.snapshot.queryParams['lang']) &&
      this.route.snapshot.queryParams['lang'] !== this.translocoService.getActiveLang()
    ) {
      this.selectLanguage(this.route.snapshot.queryParams['lang']);
    }

    this.appService.activeLanguage.set(this.translocoService.getActiveLang());
    this.languages.set(this.translocoService.getAvailableLangs() as string[]);
    this.cdr.markForCheck();
  }

  /**
   * Select a new language, setting it as the active language.
   * Additionally, update the query parameter if the current URL contains one and the language is not the default.
   * @param language The selected language
   */
  selectLanguage(language: string): void {
    this.translocoService.setActiveLang(language);
    this.appService.activeLanguage.set(language);
    this.cdr.markForCheck();
  }

  /**
   * Open the language selection dialog, allowing the user to choose a new language.
   * When the dialog is closed, the selected language is set as the active language.
   */
  show(): void {
    this.ref = this.dialogService.open(LanguageSelectionComponent, {
      modal: true,
      dismissableMask: true,
    });
    this.ref.onClose.subscribe((language: string) => {
      console.error('Language selected:', language);
      if (language) {
        this.selectLanguage(language);
      }
      this.cdr.markForCheck();
    });

    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
