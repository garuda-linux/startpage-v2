export interface DiscourseFeed {
  users: User[];
  primary_groups: PrimaryGroup[];
  flair_groups: FlairGroup[];
  topic_list: TopicList;
}

export interface User {
  id: number;
  username: string;
  name?: string;
  avatar_template: string;
  primary_group_name?: string;
  flair_name?: string;
  flair_url?: string;
  flair_group_id?: number;
  admin?: boolean;
  moderator?: boolean;
  trust_level: number;
}

export interface PrimaryGroup {
  id: number;
  name: string;
}

export interface BlogData {
  topicData: Topic;
  threadData: DiscourseThread;
}

export interface FlairGroup {
  id: number;
  name: string;
  flair_url: string;
  flair_bg_color: string;
  flair_color: string;
}

export interface TopicList {
  can_create_topic: boolean;
  more_topics_url: string;
  per_page: number;
  top_tags: string[];
  topics: Topic[];
}

export interface StrippedTopic {
  fancy_title: string;
  link: string;
  created_at: string;
}

export interface Topic {
  link: string;
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  avatar_template: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  image_url?: string;
  created_at: string;
  last_posted_at: string;
  bumped: boolean;
  bumped_at: string;
  archetype: string;
  unseen: boolean;
  last_read_post_number: number;
  unread: number;
  new_posts: number;
  unread_posts: number;
  pinned: boolean;
  username: string;
  excerpt: string;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  notification_level: number;
  bookmarked: boolean;
  liked: boolean;
  tags: string[];
  views: number;
  like_count: number;
  has_summary: boolean;
  last_poster_username: string;
  category_id: number;
  pinned_globally: boolean;
  has_accepted_answer: boolean;
  posters: Poster[];
  visibility_reason_id?: number;
  unicode_title?: string;
}

export interface Poster {
  extras?: string;
  description: string;
  user_id: number;
  primary_group_id?: number;
  flair_group_id?: number;
}

export interface DiscourseThread {
  post_stream: PostStream;
  timeline_lookup: number[][];
  suggested_topics: SuggestedTopic[];
  tags: string[];
  id: number;
  title: string;
  fancy_title: string;
  posts_count: number;
  created_at: string;
  views: number;
  reply_count: number;
  like_count: number;
  last_posted_at: string;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  has_summary: boolean;
  archetype: string;
  slug: string;
  category_id: number;
  word_count: number;
  user_id: number;
  pinned_globally: boolean;
  slow_mode_seconds: number;
  draft_key: string;
  draft_sequence: number;
  posted: boolean;
  pinned: boolean;
  current_post_number: number;
  highest_post_number: number;
  last_read_post_number: number;
  last_read_post_id: number;
  has_deleted: boolean;
  actions_summary: ActionsSummary2[];
  chunk_size: number;
  bookmarked: boolean;
  message_bus_last_id: number;
  participant_count: number;
  show_read_indicator: boolean;
  is_template: boolean;
  details: Details;
}

export interface PostStream {
  posts: Post[];
  stream: number[];
}

export interface Post {
  id: number;
  name: string;
  username: string;
  avatar_template: string;
  created_at: string;
  cooked: string;
  post_number: number;
  post_type: number;
  updated_at: string;
  reply_count: number;
  reply_to_post_number?: number;
  quote_count: number;
  incoming_link_count: number;
  reads: number;
  readers_count: number;
  score: number;
  yours: boolean;
  topic_id: number;
  topic_slug: string;
  display_username: string;
  primary_group_name?: string;
  flair_name?: string;
  flair_url?: string;
  flair_bg_color?: string;
  flair_color?: string;
  flair_group_id?: number;
  version: number;
  can_edit: boolean;
  can_delete: boolean;
  can_recover: boolean;
  can_see_hidden_post: boolean;
  can_wiki: boolean;
  link_counts?: LinkCount[];
  read: boolean;
  user_title?: string;
  title_is_group?: boolean;
  bookmarked: boolean;
  actions_summary: ActionsSummary[];
  moderator: boolean;
  admin: boolean;
  staff: boolean;
  user_id: number;
  hidden: boolean;
  trust_level: number;
  user_deleted: boolean;
  can_view_edit_history: boolean;
  wiki: boolean;
  user_custom_fields: UserCustomFields;
  reviewable_id: number;
  reviewable_score_count: number;
  reviewable_score_pending_count: number;
  user_status?: UserStatus;
  user_cakedate: string;
  user_signature: string;
  can_accept_answer: boolean;
  can_unaccept_answer: boolean;
  accepted_answer: boolean;
  topic_accepted_answer: boolean;
  can_translate: boolean;
  retorts: Retort[];
  can_retort: boolean;
  can_remove_retort: boolean;
  user_birthdate?: string;
  reply_to_user?: ReplyToUser;
}

export interface LinkCount {
  url: string;
  internal: boolean;
  reflection: boolean;
  title: string;
  clicks: number;
}

export interface ActionsSummary {
  id: number;
  count?: number;
  can_act?: boolean;
}

export interface UserCustomFields {
  nationalflag_iso: string;
  user_notes_count?: string;
}

export interface UserStatus {
  description: string;
  emoji: string;
  message_bus_last_id: number;
}

export interface Retort {
  post_id: number;
  usernames: string[];
  emoji: string;
}

export interface ReplyToUser {
  username: string;
  name: string;
  avatar_template: string;
}

export interface SuggestedTopic {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  image_url?: string;
  created_at: string;
  last_posted_at: string;
  bumped: boolean;
  bumped_at: string;
  archetype: string;
  unseen: boolean;
  last_read_post_number?: number;
  unread?: number;
  new_posts?: number;
  unread_posts?: number;
  pinned: boolean;
  excerpt: string;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  notification_level?: number;
  bookmarked?: boolean;
  liked?: boolean;
  tags: string[];
  like_count: number;
  views: number;
  category_id: number;
  has_accepted_answer: boolean;
  posters: Poster[];
}

export interface Poster {
  extras?: string;
  description: string;
  user: User;
}

export interface ActionsSummary2 {
  id: number;
  count: number;
  hidden: boolean;
  can_act: boolean;
}

export interface Details {
  can_edit: boolean;
  notification_level: number;
  notifications_reason_id: number;
  can_move_posts: boolean;
  can_delete: boolean;
  can_remove_allowed_users: boolean;
  can_invite_to: boolean;
  can_invite_via_email: boolean;
  can_create_post: boolean;
  can_reply_as_new_topic: boolean;
  can_flag_topic: boolean;
  can_convert_topic: boolean;
  can_review_topic: boolean;
  can_publish_page: boolean;
  can_close_topic: boolean;
  can_archive_topic: boolean;
  can_split_merge_topic: boolean;
  can_edit_staff_notes: boolean;
  can_toggle_topic_visibility: boolean;
  can_pin_unpin_topic: boolean;
  can_moderate_category: boolean;
  can_remove_self_id: number;
  participants: Participant[];
  created_by: CreatedBy;
  last_poster: LastPoster;
  links: Link[];
}

export interface Participant {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  post_count: number;
  primary_group_name?: string;
  flair_name?: string;
  flair_url?: string;
  flair_color?: string;
  flair_bg_color?: string;
  flair_group_id?: number;
  admin?: boolean;
  moderator?: boolean;
  trust_level: number;
}

export interface CreatedBy {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
}

export interface LastPoster {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
}

export interface Link {
  url: string;
  title: string;
  internal: boolean;
  attachment: boolean;
  reflection: boolean;
  clicks: number;
  user_id: number;
  domain: string;
  root_domain: string;
}
