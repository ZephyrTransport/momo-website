# MoMo Website build instructions

The MoMo website is built using Hugo and relies on the Hextra Starter Template.

- You can clone the repo or use the built-in web editor on GitHub itself if your changes are minor.
- If you want to develop locally, [install hugo](https://gohugo.io/installation/) and run `hugo serve` to see a local hot-reloading copy of the site. See the bottom of this readme for more setup instructions.

## Auto-build

Commiting any changes to the main branch on Github will trigger an auto-build of the site that will go live in about 2-3 minutes. (The action sets up and then runs the `/convert-xlsx-to-json.py` script.)

Easy things you might want to change:

- Front page news items entries are stored as markdown files in `/content/news/date-title.md`
- Big callouts on the front page are stored in `/data/callouts.yaml`

Adding an entire new conference is a bigger task, generally you would want to copy the `/content/2025` folder, modify the `/data/conferences.yaml`, and then modify as needed.

## Session details: speakers, presentation files etc

Session details are NOT in Github: they are all included in the Google Sheet export that came from the Whova site. The 2025 sheet is here - world readable on purpose:

- https://docs.google.com/spreadsheets/d/1h9T9-gtwsDiBqeEq0kxhfSD4gvLAU4tO/edit?gid=12805781

Anyone with write access to that google sheet can modify session and speaker details. Editing requires a google account.

**Presentation attachments:** The last column in that spreadsheet is "Presentations" and has the full path to all presentations for a session. Each session is a row; the cell value is a comma-separated list of presentations if you have more than one. The presentations themselves are stored in the repo itself in folder `./static/presentations/2025/[Day]/...`

After editing the session sheet, the site DOES NOT auto-rebuild. You must trigger the rebuild yourself. To rebuild the site with any changes, click on the Run workflow button here:

- https://github.com/ZephyrTransport/momo-website/actions/workflows/pages.yaml

Notes below are from the original Hextra template README.

---

## Hextra Starter Template

[![Deploy Hugo site to Pages](https://github.com/imfing/hextra-starter-template/actions/workflows/pages.yaml/badge.svg)](https://github.com/imfing/hextra-starter-template/actions/workflows/pages.yaml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6e83fd88-5ffe-4808-9689-c0f3b100bfe3/deploy-status)](https://app.netlify.com/sites/hextra-starter-template/deploys)
![Vercel Deployment Status](https://img.shields.io/github/deployments/imfing/hextra-starter-template/production?logo=vercel&logoColor=white&label=vercel&labelColor=black&link=https%3A%2F%2Fhextra-starter-template.vercel.app%2F)

🐣 Minimal template for getting started with [Hextra](https://github.com/imfing/hextra)

![hextra-template](https://github.com/imfing/hextra-starter-template/assets/5097752/c403b9a9-a76c-47a6-8466-513d772ef0b7)

[🌐 Demo ↗](https://imfing.github.io/hextra-starter-template/)

## Quick Start

Use this template to create your own repository:

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width=400 />

You can also quickly start developing using the following online development environment:

- [GitHub Codespaces](https://github.com/codespaces)

  [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/imfing/hextra-starter-template)

  Create a new codespace and follow the [Local Development](#local-development) to launch the preview

- [Gitpod](https://gitpod.io)

  [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/imfing/hextra-starter-template)

## Deployment

### GitHub Pages

A GitHub Actions workflow is provided in [`.github/workflows/pages.yaml`](./.github/workflows/pages.yaml) to [publish to GitHub Pages](https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/) for free.

For details, see [Publishing with a custom GitHub Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow).

Note: in the settings, make sure to set the Pages deployment source to **GitHub Actions**:

<img src="https://github.com/imfing/hextra-starter-template/assets/5097752/99676430-884e-42ab-b901-f6534a0d6eee" width=600 />

[Run the workflow manually](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow) if it's not triggered automatically.

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/imfing/hextra-starter-template)

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fimfing%2Fhextra-starter-template&env=HUGO_VERSION)

Override the configuration:

<img src="https://github.com/imfing/hextra-starter-template/assets/5097752/e2e3cecd-c884-47ec-b064-14f896fee08d" width=600 />

## Local Development

Pre-requisites: [Hugo](https://gohugo.io/getting-started/installing/), [Go](https://golang.org/doc/install) and [Git](https://git-scm.com)

```shell
# Clone the repo
git clone https://github.com/imfing/hextra-starter-template.git

# Change directory
cd hextra-starter-template

# Start the server
hugo mod tidy
hugo server --logLevel debug --disableFastRender -p 1313
```

### Update theme

```shell
hugo mod get -u
hugo mod tidy
```

See [Update modules](https://gohugo.io/hugo-modules/use-modules/#update-modules) for more details.
