# Digital Supremacy

The existing Digital Supremacy website is now runnable as a **Next.js + Tailwind CSS npm project** without redesigning the UI.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production commands

```bash
npm run build
npm run start
```

## What changed

- Added Next.js App Router and TypeScript.
- Added Tailwind CSS v4 with the official PostCSS plugin.
- Preserved the existing HTML markup and CSS so the design remains unchanged.
- Preserved the smooth-scroll audit buttons, Calendly button behavior, and review carousel.
- Added a compatibility route for existing first-level HTML pages. For example:
  - `services.html` is available at `/services`
  - `case-studies.html` is available at `/case-studies`
  - `why-us.html` is available at `/why-us`
- Added a pre-dev and pre-build asset sync that copies existing `image/`, `images/`, `assets/`, and `fonts/` folders into `public/` when those folders exist.

## Migration structure

```text
app/
  [slug]/page.tsx        # Existing first-level .html pages
  globals.css            # Tailwind entry point
  layout.tsx             # Root HTML and document metadata
  page.tsx               # Existing index.html rendered through Next.js
components/
  legacy-page-client.tsx # Browser interactions preserved in React
lib/
  legacy-page.ts         # Reads and normalizes legacy HTML files
scripts/
  sync-static-assets.mjs # Copies legacy public assets before dev/build
```

`index.html` remains the visual source of truth during this migration. The Next.js renderer reads its existing markup and styles so the UI stays identical while the project becomes npm, Next.js, and Tailwind ready.
