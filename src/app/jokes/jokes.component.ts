import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { type AvailableJokeSources, jokes as defaultJokes, type UselessFact } from './jokes';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-jokes',
  imports: [TranslocoDirective],
  templateUrl: './jokes.component.html',
  styleUrl: './jokes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {
  joke = signal<string>('');
  protected readonly spin = signal(false);

  private readonly configService = inject(ConfigService);
  private readonly httpService = inject(HttpClient);

  // Only re-roll when the joke source changes, not on every settings update
  private readonly source = computed(() => this.configService.settings().activeJoke);

  constructor() {
    effect(() => {
      void this.setJoke(this.source());
    });
  }

  async setJoke(activeJoke?: AvailableJokeSources): Promise<void> {
    if (!activeJoke) {
      activeJoke = this.configService.settings().activeJoke;
      // Restart the icon spin on every manual refresh
      this.spin.set(false);
      requestAnimationFrame(() => this.spin.set(true));
    }

    let selectedJoke: string;
    switch (activeJoke) {
      case 'useless-facts':
        selectedJoke = await this.getUselessFact();
        break;
      default:
        selectedJoke = this.getDevExcuses();
    }

    this.joke.set(selectedJoke);
  }

  getDevExcuses(): string {
    return defaultJokes[Math.floor(Math.random() * defaultJokes.length)];
  }

  async getUselessFact(): Promise<string> {
    try {
      const url = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
      const fact: UselessFact = await firstValueFrom(this.httpService.get<UselessFact>(url));
      return fact.text;
    } catch {
      console.error('Failed retrieving useless fact, proceeding to show excuse');
      return this.getDevExcuses();
    }
  }
}
