import { CommonModule } from "@angular/common"
import { HttpClient } from "@angular/common/http"
import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core"
import { RouterLink } from "@angular/router"
import { GARUDA_FORUM_URL } from "../../../config"
import { AppService } from "../app.service"
import { DatePipe } from "../date-pipe/date.pipe"
import { EmojiPipe } from "../emoji-pipe/emoji.pipe"
import { DiscourseFeed, Topic } from "../types"

@Component({
    selector: "app-news",
    standalone: true,
    imports: [CommonModule, DatePipe, EmojiPipe, RouterLink],
    templateUrl: "./news.component.html",
    styleUrl: "./news.component.css",
    providers: [DatePipe, EmojiPipe],
})
export class NewsComponent implements OnInit {
    avatarSize = "100"
    loading = true
    rssUrl = `${GARUDA_FORUM_URL}/c/announcements/16.json`
    topicsList: Topic[] = []

    @Input() showAvatars = true
    @Input() amount = 10

    constructor(
        private appService: AppService,
        private cdr: ChangeDetectorRef,
        private http: HttpClient,
    ) {}

    ngOnInit(): void {
        void this.getFeed()
    }

    async getFeed() {
        // If we have a cached version of the news, use that instead.
        if (this.appService.data.news && this.appService.data.news.length > 0) {
            const nonRef: Topic[] = JSON.parse(JSON.stringify(this.appService.data.news))
            this.topicsList = nonRef.slice(0, this.amount - 1)
            this.loading = false
            this.cdr.detectChanges()
            return
        }

        this.http.get<DiscourseFeed>(this.rssUrl).subscribe(async (data) => {
            this.loading = true

            // Ensure the topics are sorted by date, then slice the first
            data.topic_list.topics.sort((a, b) => {
                // @ts-ignore
                return new Date(b.created_at) - new Date(a.created_at)
            })
            this.topicsList = data.topic_list.topics.slice(0, this.amount - 1)

            for (const topic of this.topicsList) {
                topic.avatar_template = this.getPosterAvatar(data, topic.posters[0].user_id)
                // Get rid of the emojis showing up in the titles
                topic.title = topic.title.replace(/:.*?:/g, "")
                topic.link = `${GARUDA_FORUM_URL}/t/${topic.slug}`
            }

            // Cache the news for later use
            this.appService.data.news = this.topicsList

            this.loading = false
            this.cdr.detectChanges()
        })
    }

    private getPosterAvatar(data: DiscourseFeed, user_id: number): string {
        const user = data.users.find((user) => {
            if (user.id === user_id) {
                return user.avatar_template.replace("{size}", this.avatarSize)
            }
            return false
        })
        return user ? user.avatar_template.replace("{size}", this.avatarSize) : ""
    }
}
