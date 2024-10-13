import { SearchEngine } from "../../config"

export interface DiscourseFeed {
    users: User[]
    primary_groups: PrimaryGroup[]
    flair_groups: FlairGroup[]
    topic_list: TopicList
}

export interface User {
    id: number
    username: string
    name?: string
    avatar_template: string
    primary_group_name?: string
    flair_name?: string
    flair_url?: string
    flair_group_id?: number
    admin?: boolean
    moderator?: boolean
    trust_level: number
}

export interface PrimaryGroup {
    id: number
    name: string
}

export interface FlairGroup {
    id: number
    name: string
    flair_url: string
    flair_bg_color: string
    flair_color: string
}

export interface TopicList {
    can_create_topic: boolean
    more_topics_url: string
    per_page: number
    top_tags: string[]
    topics: Topic[]
}

export interface Topic {
    link?: string
    id: number
    title: string
    fancy_title: string
    slug: string
    avatar_template: string
    posts_count: number
    reply_count: number
    highest_post_number: number
    image_url?: string
    created_at: string
    last_posted_at: string
    bumped: boolean
    bumped_at: string
    archetype: string
    unseen: boolean
    last_read_post_number: number
    unread: number
    new_posts: number
    unread_posts: number
    pinned: boolean
    unpinned: any
    excerpt: string
    visible: boolean
    closed: boolean
    archived: boolean
    notification_level: number
    bookmarked: boolean
    liked: boolean
    tags: string[]
    views: number
    like_count: number
    has_summary: boolean
    last_poster_username: string
    category_id: number
    pinned_globally: boolean
    featured_link: any
    has_accepted_answer: boolean
    posters: Poster[]
    visibility_reason_id?: number
    unicode_title?: string
}

export interface Poster {
    extras?: string
    description: string
    user_id: number
    primary_group_id?: number
    flair_group_id?: number
}

export interface EmojiMap {
    [key: string]: string
}

export interface MenuBarLink {
    label: string
    routerLink?: string
    title: string
    url?: string
}
export type MenuarBarItems = MenuBarLink[]

export interface ContactLink {
    link: string
    logo: string
    routerLink?: string
    subtitle: string
    title: string
}
export type ContactLinks = ContactLink[]

export interface ServiceLink {
    icon: string
    link: string
    routerLink?: string
    subtitle: string
    title: string
}
export type ServiceLinks = ServiceLink[]

export interface SearchEngineEntry {
    name: SearchEngine
    prettyName: string
    url: string
}
export type SearchEngineList = SearchEngineEntry[]

export interface StartpageSettings {
    searchEngine: SearchEngine
    searchEngineName: string
    searchEngineUrl: string
    theme: StartpageTheme
    welcomeText: string
}

export type StartpageTheme = "mocha" | "latte" | "frappe" | "macchiato"
