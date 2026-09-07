import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { type AvailableJokeSources, jokes as defaultJokes, type UselessFact } from './jokes';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { JokesModel, JokesComponent as LibJokesComponent } from '@garudalinux/core';

@Component({
  selector: 'app-jokes',
  imports: [LibJokesComponent],
  templateUrl: './jokes.component.html',
  styleUrl: './jokes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {
  joke = signal<string>('');
  jokesConfig = signal<JokesModel>({
    jokes: [],
  });

  private readonly configService = inject(ConfigService);
  private readonly httpService = inject(HttpClient);

  constructor() {
    effect(() => {
      void this.setJoke(this.configService.settings().activeJoke);
    });
  }

  /**
   * Sets a new random joke and updates the library config model.
   */
  async setJoke(activeJoke?: AvailableJokeSources): Promise<void> {
    if (!activeJoke) activeJoke = this.configService.settings().activeJoke;

    let selectedJoke = '';
    switch (activeJoke) {
      case 'dev-excuses':
        selectedJoke = this.getDevExcuses();
        break;
      case 'useless-facts':
        selectedJoke = await this.getUselessFact();
        break;
      default:
        selectedJoke = this.getDevExcuses();
    }

    this.joke.set(selectedJoke);
    this.jokesConfig.set({
      jokes: [selectedJoke],
    });
  }

  /**
   * Get a random developer excuse from your dynamic array list.
   */
  getDevExcuses(): string {
    return defaultJokes[Math.floor(Math.random() * defaultJokes.length)];
  }

  /**
   * Retrieve a useless but funny fact and return it.
   * @returns A random useless fact
   */
  async getUselessFact(): Promise<string> {
    try {
      const url = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
      const fact: UselessFact = await firstValueFrom(this.httpService.get<UselessFact>(url));
      return fact.text;
    } catch (err: any) {
      console.error('Failed retrieving useless fact, proceeding to show excuse');
      return this.getDevExcuses();
    }
  }
}