import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from '../news/news.component';
import { SearchComponent } from '../search/search.component';
import { JokesComponent } from '../jokes/jokes.component';
import { LinksComponent } from '../links/links.component';
import { ConfigService } from '../config/config.service';
import { ContactLinksComponent } from '../contact-links/contact-links.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NewsComponent, SearchComponent, JokesComponent, LinksComponent, ContactLinksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly configService = inject(ConfigService);
}
