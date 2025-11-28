# Minimalist Portfolio Website

A clean, modern portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and dark/light theme support.

## ✨ Features

- **Minimalist Design** - Clean typography with Geist font and strategic use of whitespace
- **Responsive Layout** - Mobile-first design that works on all devices
- **Animated Theme Toggle** - Seamless dark/light mode switching with smooth animations
- **Smooth Animations** - Scroll-triggered animations and hover effects using Intersection Observer
- **Modern Stack** - Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4
- **Component-Based Architecture** - Modular sections for easy customization

## 🚀 Built With

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - Latest React with improved performance
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Geist Font](https://vercel.com/font) - Modern typography

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/xiaopeng-ye/minimalist-portfolio.git

# Install dependencies (using pnpm)
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Other Commands

```bash
# Build for production (generates static export)
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## 🚀 Deployment

This portfolio is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

Every push to the `main` branch automatically triggers a build and deployment workflow.

### Setup Steps

1. **Enable GitHub Pages**:
   - Go to your repository **Settings** > **Pages**
   - Under "Build and deployment", select **Source: GitHub Actions**

2. **Configure Custom Domain** (Optional):
   - In the same Pages settings, add your custom domain
   - Add a CNAME record in your DNS settings pointing to `<username>.github.io`

3. **Push Your Changes**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **Monitor Deployment**:
   - Check the **Actions** tab in your repository
   - Once the workflow completes, your site will be live

### Build Configuration

The project uses Next.js static export (`output: 'export'`) which:
- Generates static HTML/CSS/JS files in the `out` directory
- Supports custom domains without basePath configuration
- Requires `unoptimized: true` for images
- Is fully compatible with GitHub Pages hosting

## 🎨 Customization

The portfolio is designed to be easily customizable:

### Content
- Update personal information in the following component files:
  - `components/sections/intro.tsx` - Hero section
  - `components/sections/work.tsx` - Work experience
  - `components/sections/thoughts.tsx` - Blog posts or articles
  - `components/sections/connect.tsx` - Contact information

### Styling
- Modify theme colors in `app/globals.css`
- Customize Tailwind configuration in `tailwind.config.ts`
- Adjust component styles in individual section files

### Structure
- Main page layout: `app/page.tsx`
- Navigation: `components/sections/navigation.tsx`
- Footer: `components/sections/footer.tsx`

## 📁 Project Structure

```
minimalist-portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── sections/          # Page sections
│   │   ├── navigation.tsx
│   │   ├── intro.tsx
│   │   ├── work.tsx
│   │   ├── thoughts.tsx
│   │   ├── connect.tsx
│   │   └── footer.tsx
│   └── ui/                # Reusable UI components
└── public/                # Static assets
```

## 🛠️ Tech Stack Details

- **Package Manager**: pnpm 10.19.0
- **Node Version**: 22+ recommended
- **Styling**: Tailwind CSS 4 with PostCSS
- **Animations**: CSS animations with tw-animate-css
- **Icons**: Lucide React & Simple Icons

## 📄 License

Open source and available under the [MIT License](LICENSE).
