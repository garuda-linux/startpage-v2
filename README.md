# Garuda Startpage

This is Garuda's new startpage.
It is a simple page with a search bar and a few links to other pages.
The page is built with Angular.

## Changing links

To change the links, edit the `constants.ts` file in the `src/assets` folder.

- `contactLinks` is a list of links to contact pages.
- `serviceLinks` is a list of links to our web services.

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
