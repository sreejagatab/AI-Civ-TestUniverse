# TestUniverse Website

Showcase website for the AI-Civ TestUniverse project - a Constitutional AI Multi-Agent Testing Framework.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (static export)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, problems/solutions, differentiators |
| How It Works | `/how-it-works` | Multi-pass testing, 10 agents, safety |
| Architecture | `/architecture` | System diagrams, pipeline, constitution |
| Coverage | `/coverage` | Test families, plugins, evidence types |
| Results | `/results` | Real findings, CI gate examples |
| Docs | `/docs` | Documentation hub |
| Open Source | `/open-source` | Contributing guide, license |
| Roadmap | `/roadmap` | Vision, completed/planned features |
| Pricing | `/pricing` | Plans and features comparison |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## Static Export

The site is configured for static export to deploy on GitHub Pages:

```bash
npm run build
```

This generates a static site in the `out/` directory.

## Project Structure

```
website/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home
│   ├── how-it-works/
│   ├── architecture/
│   ├── coverage/
│   ├── results/
│   ├── docs/
│   ├── open-source/
│   ├── roadmap/
│   └── pricing/
├── components/
│   ├── layout/            # Header, Footer
│   └── ui/                # Button, Card, Badge, Terminal, Section
├── lib/                   # Utilities
├── styles/                # Global CSS
└── public/                # Static assets
```

## Deployment to GitHub Pages

1. Build the static site:
   ```bash
   npm run build
   ```

2. The `out/` directory contains the static site ready for deployment

3. Configure GitHub Pages to serve from the `gh-pages` branch or `out/` directory

## Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Accent**: Emerald (#10B981)
- **Background**: Slate (#0F172A)

### Components
- `Button` - Primary, secondary, outline, ghost variants
- `Card` - Content containers with optional hover effects
- `Badge` - Status indicators
- `Terminal` - Animated code/CLI display
- `Section` - Page sections with optional dark background

## License

MIT License - See [LICENSE](../LICENSE) for details.
