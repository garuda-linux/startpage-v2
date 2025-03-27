import { inject, Injectable, signal } from '@angular/core';
import { DiscourseFeed, StrippedTopic, Topic } from './news/interfaces';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'src/environments/app-config.token';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  blogData = signal<StrippedTopic[]>([]);
  blogDataReady = signal<boolean>(false);

  private readonly AMOUNT = 20;
  private readonly appConfig = inject(APP_CONFIG);
  private readonly http = inject(HttpClient);

  /**
   * Retrieve the latest news from the Discourse forum.
   */
  getDiscourseNews(): void {
    this.http
      .get<DiscourseFeed>(`${this.appConfig.forumUrl}/c/announcements/16.json`)
      .pipe(
        retry({
          count: 2,
          delay: 1000,
        }),
      )
      .subscribe((data) => {
        data.topic_list.topics.sort((a, b) => {
          // @ts-expect-error works fine, so fuck off
          return new Date(b.created_at) - new Date(a.created_at);
        });

        // Nothing to do here, we are up to date
        if (this.blogData().length > 0 && this.blogData()[0].created_at === data.topic_list.topics[0].created_at) {
          this.blogDataReady.set(true);
          return;
        }

        const topics: Topic[] = data.topic_list.topics.slice(0, this.AMOUNT);
        const onlyNeededProps: StrippedTopic[] = topics.map((topic: Topic) => {
          return {
            link: `${this.appConfig.forumUrl}/t/${topic.slug}`,
            created_at: topic.created_at,
            fancy_title: topic.fancy_title,
          };
        });
        this.blogData.set(onlyNeededProps);
        this.blogDataReady.set(true);

        localStorage.setItem('blogData', JSON.stringify(onlyNeededProps));
      });
  }
}
