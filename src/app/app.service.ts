import { inject, Injectable, signal } from '@angular/core';
import { DiscourseFeed, StrippedTopic, Topic } from './news/interfaces';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'src/environments/app-config.token';
import { retry } from 'rxjs';
import { ThemeHandler } from './theme-handler/theme-handler';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  activeLanguage = signal<string>('en');
  blogData = signal<StrippedTopic[]>([]);
  blogDataReady = signal<boolean>(false);

  readonly themeHandler = new ThemeHandler();

  private readonly AMOUNT = 20;
  private readonly appConfig = inject(APP_CONFIG);
  private readonly http = inject(HttpClient);

  /**
   * Retrieve the latest news from the Discourse forum.
   */
  getDiscourseNews(): void {
    const topicList: Topic[] = [];

    this.http
      .get<DiscourseFeed>(`${this.appConfig.forumUrl}/c/announcements/16.json`)
      .pipe(
        retry({
          count: 2,
          delay: 1000,
        }),
      )
      .subscribe((data) => {
        // Ensure the topics are sorted by date, then slice the first ones
        data.topic_list.topics.sort((a, b) => {
          // @ts-expect-error works fine, so fuck off
          return new Date(b.created_at) - new Date(a.created_at);
        });
        topicList.push(...data.topic_list.topics.slice(0, this.AMOUNT));

        const onlyNeededProps: StrippedTopic[] = topicList.map((topic) => {
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
