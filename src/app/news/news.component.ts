import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AppService } from '../app.service';
import { EmojiPipe } from '../emoji-pipe/emoji.pipe';
import { BlogData } from './interfaces';
import { Timeline } from 'primeng/timeline';
import { ScrollPanel } from 'primeng/scrollpanel';
import { provideMarkdown } from 'ngx-markdown';
import { TranslocoDirective } from '@jsverse/transloco';
import { openLinkInNewTab } from '../functions';
import { Skeleton } from 'primeng/skeleton';
import {Panel} from "primeng/panel";

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
  activeTopic = signal<BlogData>({} as BlogData);

  protected readonly appService = inject(AppService);
  protected readonly openLinkInNewTab = openLinkInNewTab;

  ngOnInit(): void {
    void this.getFeed();
  }

  async getFeed() {
    if (!this.appService.blogDataReady()) {
      this.appService.getDiscourseNews();
    }
  }

  typedTopic(topic: unknown): BlogData {
    return <BlogData>topic;
  }
}
