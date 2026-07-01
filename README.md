# Digital Supremacy

Digital Supremacy is a **Next.js + Tailwind CSS** npm project. Its legacy static pages are converted into real, editable TSX routes while retaining the existing UI.

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

- Added Next.js App Router, TypeScript, Tailwind CSS v4, PostCSS, and ESLint.
- Converted the top-level static HTML pages into direct App Router TSX routes:
  - `index.html` → `app/page.tsx`
  - `services.html` → `app/services/page.tsx`
  - `case-studies.html` → `app/case-studies/page.tsx`
  - `why-us.html` → `app/why-us/page.tsx`
  - `privacy-policy.html` → `app/privacy-policy/page.tsx`
  - `terms-of-service.html` → `app/terms-of-service/page.tsx`
- Preserved the original DOM structure, class names, page CSS, image paths, spacing, and animations so the UI stays unchanged.
- Replaced inline browser scripts with `components/site-interactions.tsx`, which preserves smooth scrolling, Calendly opens, and the review slider.
- Removed the HTML injection compatibility renderer from the generated project output.
- Preserved the original `.html` files as source and rollback references.
- Added a GitHub Actions workflow that regenerates TSX files and verifies the Next.js build on the migration branch.

## Regenerating pages after editing legacy HTML

```bash
npm run migrate:tsx
```

`npm install`, `npm run dev`, and `npm run build` already run this conversion automatically. The generated TSX files are deliberately committed so they remain editable and reviewable in Git.

## Project structure

```text
app/
  page.tsx                         # Converted homepage
  services/page.tsx                # Converted services page
  case-studies/page.tsx            # Converted case studies page
  why-us/page.tsx                  # Converted why-us page
  privacy-policy/page.tsx          # Converted privacy page
  terms-of-service/page.tsx        # Converted terms page
  globals.css                      # Tailwind entry point
components/
  site-interactions.tsx            # React client behavior for the original UI
scripts/
  convert-html-to-tsx.mjs          # HTML to TSX converter
  sync-static-assets.mjs           # Copies legacy assets into public/ before dev/build
```
