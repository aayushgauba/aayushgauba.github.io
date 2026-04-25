# aayushgauba.github.io

Starter for a GitHub Pages personal website.

## Publish on GitHub Pages

1. Create a repository named `aayushgauba.github.io` on GitHub.
2. Upload these files to the repository root.
3. In repository settings, open **Pages** and ensure source is set to **Deploy from a branch** with `main` and `/ (root)`.
4. Your site will be live at:

   `https://aayushgauba.github.io`

## Customize

- Update text in `index.html`
- Replace the placeholder email in the header nav
- Update content data in these JSON files:
   - `experience.json`
   - `opensource.json`
   - `talks.json`
   - `papers.json`

## JSON-driven content

The site now reads experience, open source projects, talks, and papers from JSON files.

- `script.js` fetches each JSON file and renders the lists in `index.html`
- Add, remove, or reorder entries by editing the `items` array in each file

Note: because the site uses `fetch`, open it through a local/static server (or GitHub Pages) rather than directly with `file://`.
