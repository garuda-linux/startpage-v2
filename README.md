# Garuda Startpage

This is Garuda's new startpage.
It is a simple page with a search bar and a few links to other pages.
The page is built with Angular.

<img src="/assets/startpage.png" alt="Startpage picture">

## Changing static settings

To change the links, edit [config.ts](./config.ts) in the root directory.

- `amountForumPostsHome` is the number of forum posts to show on the startpage.
- `amountForumPostsSettings` is the number of forum posts to show on the settings page.
- `contactLinks` is a list of links to contact pages.
- `defaultSettings` is the default settings for the page.
- `logos` and `logoList` control the logos shown above the search input.
- `serviceLinks` is a list of links to our web services.
- `SearchEngine` and `searchEngineMappings` to add or remove search engines from the list.
- `wallpapers` is a list of wallpapers to show on the settings page. `name` will be shown in the settings, `url` maybe a
  local file relative to the `public` folder or a link to an image.

Additionally,
[jokes.ts](./src/app/jokes/jokes.ts) contains the list of excuses/jokes that will be shown on the main page.

## Get the tools

## Changing runtime (user facing) settings

The settings are stored in the local storage of the browser.
To change the settings, click on the settings icon in the top right corner of the page.
The following can be adjusted:

- Welcome message
- The search engine (with custom search engines)
    - Paste the search url in the search engine input field, e.g. `https://search.garudalinux.org/search?q=`
        - Omit any appended `%s`
- The wallpaper
- Whether to fit or fill the wallpaper
- Blur the wallpaper
- Enable or disables developer excuses
- Show or hide default links
- Theming (all Catppuccin flavours)
- Add custom links above the wallpaper
    - This can be any link, the only requirement is providing a valid JSON in the custom service links section
    - Valid is something following the format:
      ```json
      [
        { "link": "https://discouse.nixos.org",    
         "title": "NixOS Forum",
         "icon": "https://discourse.nixos.org/uploads/default/original/2X/c/cb4fe584627b37e7c1d5424e9cec0bb30fdb6c4d.png",     
         "subtitle": "NixOS Forum"   
        }
      ]
      ```

## Development

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

Visit [http://localhost:4200](http://localhost:4200) to see the app with live reload.
Make sure to set `isProd` to false in the `config.ts` file to make the forum posts load.
Don't commit this change! :) 

To create a production bundle:

```sh
pnpm build
```

To see all available targets to run for a project, run:

```sh
nx show project startpage-v2
```
