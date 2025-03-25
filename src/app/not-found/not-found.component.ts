import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../title/title.component';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, TitleComponent, TranslocoDirective],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
