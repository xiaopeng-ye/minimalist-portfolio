# Minimalist Portfolio

A refined portfolio starter built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.
It is designed for developers who want a fast, personal site with polished motion, strong typography, and a setup that is easy to customize.

## Overview

- Clean single-page portfolio structure
- Responsive layout for desktop and mobile
- Animated light/dark theme toggle
- Section-aware navigation and scroll progress feedback
- Particle background and subtle motion details
- Static-friendly setup for GitHub Pages deployment

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- `next-themes` for theme management
- `motion` for UI animation
- `web-haptics` for tactile feedback on supported devices
- Lucide React and Simple Icons

## Local Development

```bash
git clone https://github.com/xiaopeng-ye/minimalist-portfolio.git
cd minimalist-portfolio
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm typecheck
```

## Project Structure

```text
minimalist-portfolio/
├── app/                     # App Router entry, metadata, global styles
├── components/
│   ├── sections/           # Intro, work, thoughts, connect, footer
│   └── ui/                 # Reusable UI pieces and visual effects
├── lib/                    # Portfolio content and helpers
├── public/                 # Static assets
└── types/                  # Shared TypeScript types
```

## Customize Your Portfolio

Most personal content lives in `lib/portfolio-config.ts`.

Update these areas to make the site your own:

- `personal`: name, role, bio, location, availability
- `skills`: tech stack and icon mappings
- `experience`: timeline entries and descriptions
- `contact`: email address
- `social`: external links
- `siteMetadata`: SEO title, description, and site URL

You can also adjust layout and presentation here:

- `app/page.tsx` for page composition
- `app/globals.css` for theme tokens and global styling
- `components/sections/*.tsx` for section-specific content and layout

## Features Worth Noting

- Theme switching uses `next-themes` with an animated transition
- Scroll tracking updates navigation state as sections enter view
- Metadata, manifest, and Open Graph assets are configured in `app/layout.tsx` and `app/opengraph-image.tsx`
- The portfolio content is statically embedded at build time from `lib/portfolio-config.ts`

## Deployment

This project is set up well for static hosting and can be deployed to GitHub Pages.

Typical flow:

1. Enable GitHub Pages with **GitHub Actions** as the source.
2. Push changes to your default branch.
3. Monitor the workflow in the repository's **Actions** tab.

If you use a custom domain, update your DNS records and set the domain in GitHub Pages settings.

## Live Site

- Portfolio: `https://xiaopengye.kkcloud.org`

## License

Released under the [MIT License](LICENSE).
