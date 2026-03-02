# CV Creator

A privacy-first, browser-based resume builder that lets you create, edit, and export professional PDFs — no account, no server, no data leaving your device.

Built to showcase a modern full-stack architecture: **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS v4**, and **WebAssembly** PDF rendering via the Typst compiler.

---

## Features

- **Full resume editor** — personal info, work experience, education, courses, and projects, organized across a tabbed interface
- **Live PDF preview** — renders your resume in real time using the Typst WASM compiler loaded directly in the browser (~11 MB, fetched once)
- **PDF export** — one-click download of a print-ready PDF, generated entirely client-side
- **Template system** — extensible template registry; each template is a pure TypeScript function that outputs a Typst source string
- **Offline-ready** — all data persisted in IndexedDB; works without a network connection after first load
- **Dark mode** — system-aware theme toggle with `localStorage` persistence
- **Import / Export** — backup and restore all resumes as JSON

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with custom design tokens |
| Storage | IndexedDB (browser-native, no backend) |
| PDF engine | Typst via `@myriaddreamin/typst.ts` (WASM) |
| Forms | react-hook-form |
| Icons | lucide-react |
| Package manager | pnpm |

---

## Architecture Highlights

- **No backend database.** Every resume lives in the user's browser via IndexedDB. Server components exist only for routing and pass IDs down to client components as props.
- **Two PDF paths.** A client-side WASM path (used in the UI) and a server-side CLI path (`app/api/pdf/route.ts`) that shells out to the `typst` binary — demonstrating both approaches.
- **Template registry pattern.** Adding a new CV template requires only creating a TypeScript file and registering it in `lib/templates/index.ts` — no changes to rendering infrastructure.

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

> **PDF generation** requires a network connection on first load to fetch the Typst WASM binary and font assets from CDN.

---

## Project Structure

```
app/                    # Next.js App Router pages
  resumes/[id]/edit/    # Resume editor (5-tab form)
  resumes/[id]/preview/ # Live preview + PDF download
  templates/            # Template selector + PDF generator
  api/pdf/              # Server-side Typst CLI route
components/
  forms/                # Section editors (experience, education, …)
  layout/               # Sidebar, mobile nav
  ui/                   # Reusable primitives
lib/
  db.ts                 # IndexedDB helpers
  templates/            # Typst template functions + registry
  typst-client.ts       # WASM compiler wrapper
types/
  resume.ts             # Core data model
```

---

## License

MIT
