import { inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export class ThemeHandler {
  darkMode = signal<boolean>(true);
  document = inject(DOCUMENT);

  constructor() {
    this.checkDarkMode();
  }

  /**
   * Toggle dark mode, updating the local storage and the document accordingly.
   */
  public toggleDarkMode(): void {
    this.darkMode.set(!this.darkMode());

    this.document.documentElement.classList.toggle('p-dark', this.darkMode());
    this.document.documentElement.style.scrollbarColor = this.darkMode()
      ? '#313244 rgba(24, 24, 37, 0.5)'
      : '#ccd0da rgba(230, 233, 239, 0.5)';
    this.document.documentElement.style.backgroundColor = this.darkMode() ? '#1e1e2e' : '#eff1f5';

    localStorage.setItem('darkMode', this.darkMode().toString());
  }

  /**
   * Check if dark mode is enabled and set it accordingly.
   * @private
   */
  private checkDarkMode(): void {
    if (localStorage.getItem('darkMode') === 'false' && this.darkMode()) {
      this.toggleDarkMode();
    } else {
      if (!this.darkMode()) {
        this.toggleDarkMode();
      }
    }
  }
}
