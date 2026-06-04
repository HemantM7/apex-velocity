# APEX VELOCITY — Hypercar Showcase Platform

A premium, cinematic automotive showcase web application built for the world's most extraordinary hypercars. Engineered for performance enthusiasts and luxury automotive connoisseurs.

---

## Overview

Apex Velocity is a production-ready, fully responsive hypercar showcase platform inspired by brands like Lamborghini, Bugatti, Koenigsegg, and Tesla. The UI is dark, immersive, and cinematic — combining glassmorphism, high-contrast typography, and smooth motion design to deliver a digital showroom experience.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Smooth Scroll | Lenis |
| State Management | Zustand |
| Data Fetching | TanStack Query v5 |
| Icons | Lucide React |
| UI Primitives | Radix UI |
| Performance | Turbopack, Static Generation |

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| Primary Background | `#02040A` | Global canvas |
| Secondary Background | `#0B0F18` | Section backgrounds |
| Card Background | `#1A1A24` | Cards, panels |
| Accent Orange | `#FF5A1F` | CTAs, highlights, active states |
| Text White | `#F5F5F5` | Primary text |
| Muted Gray | `#7B7F87` | Secondary text, labels |
| Metallic Silver | `#C0C0D0` | Borders, icons |

### Typography

| Role | Font | Usage |
|---|---|---|
| Headlines | Bebas Neue | Hero titles, section headers, vehicle names |
| Body | Inter | Descriptions, paragraphs, UI text |
| Technical | Space Mono | Specs, stats, labels, badges |

### UI Style

- **Glassmorphism** overlays with `backdrop-filter: blur(20px)`
- **Thin accent borders** — `1px solid rgba(255, 90, 31, 0.4)` for active, `rgba(192, 192, 208, 0.15)` for passive
- **Skewed buttons** using `clip-path` for a precision-engineering aesthetic
- **Neon glow** on interactive elements — `box-shadow: 0 0 20px rgba(255, 90, 31, 0.4)`
- **Parallax scroll** on hero images and brand sections

---

## Project Structure

```
apex-velocity/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # Landing page
│   │   ├── layout.tsx              # Root layout with nav + footer
│   │   ├── globals.css             # Global styles + design tokens
│   │   ├── not-found.tsx           # Custom 404 page
│   │   ├── about/                  # Brand story + timeline
│   │   ├── collection/             # Vehicle catalog with filters
│   │   ├── compare/                # Side-by-side comparison
│   │   ├── configure/              # Real-time vehicle configurator
│   │   ├── contact/                # Contact form
│   │   ├── dealers/                # Dealer locator
│   │   ├── gallery/                # Masonry photo gallery
│   │   ├── news/                   # News listing + article pages
│   │   ├── technology/             # Tech showcase + timeline
│   │   ├── test-drive/             # Multi-step booking form
│   │   └── vehicles/[id]/          # Dynamic vehicle detail pages
│   ├── components/
│   │   ├── home/                   # Landing page sections
│   │   │   ├── HeroSection.tsx     # Full-viewport hero with parallax
│   │   │   ├── SpecsStrip.tsx      # Performance metrics bar
│   │   │   ├── FeaturedVehicles.tsx
│   │   │   ├── BrandStory.tsx
│   │   │   ├── TechnologyShowcase.tsx
│   │   │   ├── NewsSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── layout/
│   │   │   ├── Navigation.tsx      # Glassmorphism sticky nav + mobile menu
│   │   │   └── Footer.tsx          # Multi-column footer + newsletter
│   │   ├── providers/
│   │   │   ├── QueryProvider.tsx   # TanStack Query wrapper
│   │   │   └── SmoothScrollProvider.tsx  # Lenis smooth scroll
│   │   └── ui/
│   │       └── CustomCursor.tsx    # Magnetic cursor (desktop)
│   └── lib/
│       ├── data.ts                 # Vehicle data, tech features, news, dealers
│       └── utils.ts                # cn(), formatPrice(), formatNumber()
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Pages

### Landing Page `/`
Full-viewport cinematic hero with parallax scroll, animated performance stats, featured vehicle grid, brand story, interactive technology showcase, news section, and CTA.

### Vehicle Collection `/collection`
Filterable, sortable vehicle catalog. Filter by category (Hypercar, Supercar, Electric, GT) and fuel type. Sort by price, horsepower, top speed, or acceleration. Wishlist support.

### Vehicle Detail `/vehicles/[id]`
Immersive vehicle page with tabbed content: Overview, Specifications, Gallery, Technology. Animated performance bars, color swatch selector, and configuration CTA.

### Configurator `/configure`
Real-time vehicle configurator with live pricing. Options for exterior color, wheels, interior trim, and performance packs. Shareable configuration summary.

### Compare `/compare`
Side-by-side comparison of up to 3 vehicles. Highlights best-in-class values per metric. Dynamic vehicle picker modal.

### Technology `/technology`
Innovation showcase with feature cards and an animated engineering milestone timeline from 2008 to 2025.

### Gallery `/gallery`
Masonry photo gallery with category filters (Exterior, Interior, Track, Studio, Concept). Fullscreen lightbox viewer.

### Test Drive Booking `/test-drive`
4-step guided booking form: vehicle selection → dealer location → date/time → personal details. Confirmation screen with booking summary.

### Dealer Locator `/dealers`
Interactive dealer map with clickable location pins. Dealer cards with address, phone, email, and hours. Direct booking and call CTAs.

### News & Blog `/news` `/news/[id]`
Featured article hero, filterable article grid by category, full article detail pages with related content.

### About `/about`
Company history, founding philosophy, brand values, and a scrollable milestone timeline.

### Contact `/contact`
Contact form with validation and success state. Contact details and social links.

---

## Vehicles

| Model | Category | Powertrain | HP | 0–60 | Price |
|---|---|---|---|---|---|
| APEX X1 | Hypercar | Quad-Turbo V16 Hybrid | 1,800 | 2.1s | $3,200,000 |
| PHANTOM GT | Grand Tourer | Twin-Turbo V12 | 1,050 | 2.8s | $890,000 |
| VOLT R | Electric | Quad Electric Motor | 1,600 | 1.8s | $1,450,000 |
| STORM S | Track Edition | NA Flat-6 | 720 | 2.5s | $620,000 |
| NOVA HYBRID | Supercar | Twin-Turbo V8 Hybrid | 900 | 2.6s | $480,000 |
| APEX RS | Limited | Twin-Turbo V10 | 1,350 | 2.3s | $1,100,000 |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/apex-velocity.git
cd apex-velocity

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Create optimised production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Performance

All 24 routes are statically generated at build time where possible. Dynamic vehicle and news pages use `generateStaticParams` for full SSG output.

- Static pages: 18
- SSG pages: 6 (vehicles + news articles)
- Image optimisation via Next.js `<Image>` with Unsplash CDN
- Package import optimisation for Framer Motion and Lucide React
- Telemetry disabled in development

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1
```

---

## Development Notes

**Slow filesystem warning on Windows**
If you see a slow filesystem warning, run the following in an Administrator PowerShell to exclude the project from Windows Defender real-time scanning:

```powershell
Add-MpPreference -ExclusionPath "D:\car site\apex-velocity\.next"
Add-MpPreference -ExclusionPath "D:\car site\apex-velocity\node_modules"
```

---

## License

Private — All rights reserved. © 2025 Apex Velocity.
