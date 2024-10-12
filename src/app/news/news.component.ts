import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiscourseFeed, Topic } from '../types';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '../date-pipe/date.pipe';
import { Ripple } from 'primeng/ripple';
import { GARUDA_FORUM_URL } from '../constants';
import { EmojiPipe } from '../emoji-pipe/emoji.pipe';

@Component({
    selector: "app-news",
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        TimelineModule,
        ButtonModule,
        DatePipe,
        Ripple,
        EmojiPipe,
    ],
    templateUrl: "./news.component.html",
    styleUrl: "./news.component.css",
    providers: [DatePipe, EmojiPipe],
})
export class NewsComponent {
    rssUrl = "http://localhost:8010/proxy/c/announcements/16.json"
    rssData: DiscourseFeed | undefined
    avatarSize = "100"
    topicsList: Topic[] = []

    constructor(
        private emojiPipe: EmojiPipe,
        private http: HttpClient,
    ) {
        this.getFeed()
    }

    async getFeed() {
        this.http.get<DiscourseFeed>(this.rssUrl).subscribe(async (data) => {
            this.topicsList = data.topic_list.topics.slice(0, 9)
            for (const topic of this.topicsList) {
                topic.avatar_template = this.getPosterAvatar(
                    data,
                    topic.posters[0].user_id,
                )
                // Get rid of the emojis showing up in the titles
                topic.title = topic.title.replace(/:.*?:/g, "")
            }
        })
    }

    private getPosterAvatar(data: DiscourseFeed, user_id: number): string {
        const user = data.users.find((user) => {
            if (user.id === user_id) {
                return user.avatar_template.replace("{size}", this.avatarSize)
            }
            return false
        })
        return user
            ? user.avatar_template.replace("{size}", this.avatarSize)
            : ""
    }

    protected readonly GARUDA_FORUM_URL = GARUDA_FORUM_URL

    navigateTo(event: any) {}
}
