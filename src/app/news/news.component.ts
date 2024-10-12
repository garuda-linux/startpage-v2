import { CommonModule } from "@angular/common"
import { HttpClient } from "@angular/common/http"
import { Component } from "@angular/core"
import { ButtonModule } from "primeng/button"
import { CardModule } from "primeng/card"
import { Ripple } from "primeng/ripple"
import { SkeletonModule } from "primeng/skeleton"
import { TimelineModule } from "primeng/timeline"
import { GARUDA_FORUM_URL } from "../constants"
import { DatePipe } from "../date-pipe/date.pipe"
import { EmojiPipe } from "../emoji-pipe/emoji.pipe"
import { DiscourseFeed, Topic } from "../types"

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
        SkeletonModule,
    ],
    templateUrl: "./news.component.html",
    styleUrl: "./news.component.css",
    providers: [DatePipe, EmojiPipe],
})
export class NewsComponent {
    rssUrl = `${GARUDA_FORUM_URL}/c/announcements/16.json`
    avatarSize = "100"
    topicsList: Topic[] = []
    loading = true

    constructor(private http: HttpClient) {
        void this.getFeed()
    }

    async getFeed() {
        this.http.get<DiscourseFeed>(this.rssUrl).subscribe(async (data) => {
            this.topicsList = data.topic_list.topics.slice(0, 5)
            for (const topic of this.topicsList) {
                topic.avatar_template = this.getPosterAvatar(
                    data,
                    topic.posters[0].user_id,
                )
                // Get rid of the emojis showing up in the titles
                topic.title = topic.title.replace(/:.*?:/g, "")
                this.loading = false
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

    navigateTo(event: Topic) {
        setTimeout(
            () =>
                window.open(
                    `https://forum.garudalinux.org/t/${event.slug}`,
                    "_blank",
                ),
            500,
        )
    }
}
