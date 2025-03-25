import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import jokes from './jokes';

@Component({
  selector: 'app-jokes',
  imports: [CommonModule],
  templateUrl: './jokes.component.html',
  styleUrl: './jokes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {
  joke = signal<string>(this.getRandomJoke());

  /**
   * Sets a new random joke.
   */
  setJoke(): void {
    this.joke.set(this.getRandomJoke());
  }

  /**
   * Returns a random joke from the jokes array.
   */
  getRandomJoke(): string {
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
}
