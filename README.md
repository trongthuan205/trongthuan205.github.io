# Trong-Thuan Nguyen — personal academic website

A simple English-language academic website for **https://trongthuan205.github.io/**.
Plain HTML, CSS, and JavaScript. No package installation, build command, framework, or database is required.

## Publish on GitHub Pages

1. Sign in to GitHub as **trongthuan205** and create a repository named exactly **trongthuan205.github.io**. Choose **Public** for the standard GitHub Free Pages setup. If this repository already exists, use it and keep a copy of its current files before replacing them.
2. Extract this ZIP. Upload its **contents** to the repository root, so that `index.html`, `README.md`, `.nojekyll`, and the `assets` folder are at the top level. Do not upload the ZIP itself or place everything inside an extra folder. Enable hidden-file display to include `.nojekyll`.
3. Commit the files to the `main` branch.
4. Open **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, then **main** and **/(root)**. Click **Save**.
5. Wait for the Pages deployment to finish, then visit **https://trongthuan205.github.io/**. Deployment can take several minutes; GitHub documents up to 10 minutes for changes to appear. Check the repository's **Actions** tab if a deployment fails.

If you use another GitHub username, change the repository name to `<username>.github.io` and update the canonical URL and `og:url` in `index.html`.

Official documentation:

- [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
- [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Update News

Open **assets/news.js** in GitHub, click the pencil icon, edit the list, and commit your changes.
The site automatically displays valid updates newest first and keeps the News panel scrollable.

Add an item inside `window.SITE_NEWS = [ ... ];`, for example:

```javascript
{
  "date": "2026-11",
  "title": "A new research update",
  "body": "A short description of the update.",
  "url": "https://example.com/your-project"
},
```

- Use `YYYY-MM` for dates, such as `2026-11`.
- `type` selects an icon: `paper` (document), `achievement` (trophy), `education` (graduation cap), `conference` (calendar), or `career` (briefcase). If omitted, a document icon is used.
- `title` is required. Use `""` for an empty `body` or `url`.
- Separate items with commas. Keep the surrounding `window.SITE_NEWS = [` and `];`.
- Use a full `https://` URL for a linked title.
- Use plain text. HTML is displayed as text rather than executed.
- For a quotation mark inside a string, write `\"`; for a new line, write `\n`.
- To remove an update, delete its object and adjust the adjacent comma if necessary.
- To show no updates, use `window.SITE_NEWS = [];`.

This GitHub Pages version uses file edits for News. The previous server-based News editor is not part of this static export.

## Edit the rest of the website

| File | What to change |
| --- | --- |
| `index.html` | Biography, research, projects, advisors, collaborators, recognition, contact, and undergraduate research opportunities |
| `assets/news.js` | News updates |
| `assets/styles.css` | Typography, spacing, monochrome palette, responsive layout, and News panel height |
| `assets/site.js` | News rendering logic; normally no edits are needed |
| `.nojekyll` | Tells GitHub Pages to serve the files without Jekyll processing |

The undergraduate opportunities section is nested inside Contact. Future interests are clearly separated from current research. Publications link directly to Google Scholar.

All content is already included in `index.html` for an immediate first render. JavaScript replaces the News list with `assets/news.js`. Visitors with JavaScript disabled see the News snapshot included in `index.html`; update that section as well if you want the no-JavaScript snapshot to match later News edits.

## Preview locally

Open `index.html` in a browser. The page and News work directly from the extracted folder.
You can also serve it with Python, if installed:

```bash
python3 -m http.server 8000
```

Then open **http://localhost:8000/**. No internet connection is needed for the layout or News; external profile and advisor links require internet access.

## Files included

```text
index.html
assets/
  styles.css
  news.js
  site.js
.nojekyll
README.md
```

The package contains only public website content. It has no server endpoints, authentication setup, database configuration, analytics, or external font dependencies.
