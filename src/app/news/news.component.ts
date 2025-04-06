import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { EmojiPipe } from '../emoji-pipe/emoji.pipe';
import { Timeline } from 'primeng/timeline';
import { ScrollPanel } from 'primeng/scrollpanel';
import { provideMarkdown } from 'ngx-markdown';
import { TranslocoDirective } from '@jsverse/transloco';
import { openLinkInNewTab } from '../functions';
import { Skeleton } from 'primeng/skeleton';
import { Panel } from 'primeng/panel';
import type { StrippedTopic } from './interfaces';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, Timeline, EmojiPipe, ScrollPanel, TranslocoDirective, Skeleton, Panel],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  providers: [EmojiPipe, provideMarkdown()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent implements OnInit {
  protected readonly newsService = inject(NewsService);
  protected readonly openLinkInNewTab = openLinkInNewTab;

  ngOnInit(): void {
    try {
      const cache: string | null = localStorage.getItem('blogData');
      if (cache) {
        const parsedCache = JSON.parse(cache) as StrippedTopic[];
        this.newsService.blogData.set(parsedCache);
      }
    } catch (err: any) {
      console.error('Error parsing blogData from localStorage:', err);
    } finally {
      void this.getFeed();
    }
  }

  async getFeed(): Promise<void> {
    if (!this.newsService.blogDataReady()) {
      this.newsService.getDiscourseNews();
    }
  }
}
