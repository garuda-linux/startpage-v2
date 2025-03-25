import { inject, Injectable, signal } from '@angular/core';
import type { BlogData, DiscourseFeed, DiscourseThread, Topic } from './news/interfaces';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'src/environments/app-config.token';
import { lastValueFrom, retry } from 'rxjs';
import { ThemeHandler } from './theme-handler/theme-handler';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  activeLanguage = signal<string>('en');
  blogData = signal<BlogData[]>([]);
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
      .subscribe(async (data) => {
        // Ensure the topics are sorted by date, then slice the first ones
        data.topic_list.topics.sort((a, b) => {
          // @ts-expect-error works fine, so fuck off
          return new Date(b.created_at) - new Date(a.created_at);
        });
        topicList.push(...data.topic_list.topics.slice(0, this.AMOUNT));

        for (const topic of topicList) {
          topic.link = `${this.appConfig.forumUrl}/t/${topic.slug}`;
        }

        void this.getBlogData(topicList);
      });
  }

  /**
   * Retrieve the full data of each Discourse thread, including cooked HTML.
   * Fills the blogData property with the results.
   * @param topicList - Topic list to retrieve data for.
   * @private
   */
  private async getBlogData(topicList: Topic[]): Promise<void> {
    const blogDataPromises = [];
    for (const topic of topicList) {
      blogDataPromises.push(
        lastValueFrom(
          this.http
            .get<DiscourseThread>(`${this.appConfig.forumUrl}/t/${topic.id}.json`)
            .pipe(retry({ count: 2, delay: 1000 })),
        ),
      );
    }

    const results = await Promise.allSettled(blogDataPromises);
    for (const result of results) {
      if (result.status === 'fulfilled') {
        const data: DiscourseThread = result.value;
        this.blogData.set([
          ...this.blogData(),
          {
            threadData: data,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            topicData: topicList.find((topic: Topic) => topic.id === data.id)!,
          },
        ]);
      }
    }

    this.blogDataReady.set(true);
  }
}
