# Garuda Startpage

This is Garuda's new startpage.
It is a simple page with a search bar and a few links to other pages.
The page is built with Angular.

<img src="/assets/startpage.png" alt="Startpage picture">

## Changing links

To change the links, edit the `constants.ts` file in the `src/assets` folder.

- `contactLinks` is a list of links to contact pages.
- `serviceLinks` is a list of links to our web services.
- `SearchEngine` and `searchEngineMappings` to add or remove search engines from the list.
- `defaultSettings` is the default settings for the page.
- `amountForumPostsHome` is the number of forum posts to show on the startpage.
- `amountForumPostsSettings` is the number of forum posts to show on the settings page.
- `wallpapers` is a list of wallpapers to show on the settings page. `name` will be shown in the settings, `url` maybe a
  local file relative to the `public` folder or a link to an image.
- `jokesApiUrl` is the Url used to query the jokes API [v2.jokeapi.dev](https://v2.jokeapi.dev/). You can customize the
  jokes shown when visiting the site.

## Get the tools

To get started with this workspace, you need to install the following tools:

- [NodeJs](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)

Install the deps with:

```sh
pnpm install
```

## Run tasks

To run the dev server for your app, use:

```sh
pnpm serve
```

To create a production bundle:

```sh
pnpm build
```

To see all available targets to run for a project, run:

```sh
nx show project startpage-v2
```
