# SPARK — Mobile App Landing Page

A React + Vite landing page for SPARK, the hospital-based aphasia care system
(Pathologist Portal + view-only Patient Web Portal).

## Design

- **Color (brand palette):** deep red `#B70000` · red `#EF3529` · rose `#E7A2A0` ·
  pale tint `#F3D4D2` · white `#FFFFFF`, plus a gold `#F5A623` accent reserved for
  reward/gamification moments (matches the trophy in the app's session-result screen).
- **Type:** Plus Jakarta Sans (display) · Inter (body) · IBM Plex Mono (labels/data)
- **Signature moment:** the hero headline scrambles into place letter by letter —
  a nod to word-finding difficulty in aphasia and how SPARK helps resolve it.
- **Logo:** `src/assets/Spark_Logo.png` is a stand-in ribbon-and-head mark built to match
  the brand reference. **Drop your real `Spark_Logo.png` (or `.svg`, updating the import)
  into `src/assets/` to replace it** — `Nav.jsx` and `Footer.jsx` both import it from
  that path, so no other code changes are needed.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

Output goes to `dist/`, ready to deploy to any static host (Netlify, Vercel,
S3 + CloudFront, GitHub Pages, etc).

## Structure

```
index.html
src/
  main.jsx            entry point
  App.jsx             assembles all sections
  index.css           design tokens + all styles
  useReveal.js         scroll-reveal hook
  components/
    Nav.jsx
    Hero.jsx           hero + phone mockup + scramble headline
    WordScramble.jsx    signature letter-scramble animation
    HowItWorks.jsx      9-step SPARK workflow timeline
    Features.jsx        6 feature cards
    Portals.jsx          Pathologist vs Patient portal comparison
    Story.jsx            "in the clinic" scenario + quote
    CTA.jsx
    Footer.jsx
```

## Content source

Copy and structure are based on the SPARK System Workflow and Functional
Requirements document (system overview, user roles, workflow, and module
breakdown).
