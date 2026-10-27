# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

User preferences: use Rahmawan as the identity; black/navy palette; no Blog, T.I.L, Studio, Learn or This Site groups; no Figma social icon; replace X with LinkedIn at https://www.linkedin.com/in/rahmawan-9a3395215/; home only keeps hero before footer.

Current content source is the supplied Rahmawan CV. Home profile and About Me must use its profile paragraph; resume must open the local PDF. Use only owner contact data. No Services Soon item. Projects are Kayarra Resort Hotel Website and OTA Management System Hotel with real screenshot galleries, explanations and verified framework logos. Preserve normal-flow footer layout and an anchored mobile Work disclosure. Respect reduced-motion preferences for portrait effects.

Preserve Quick Access, dark/light theme, Focus toggle and the GitHub social link in future edits. GitHub profile: https://github.com/rahm2668-cpu. Keep header controls usable within a 390px mobile viewport.

Projects also includes Wedding Digital Invitation Web at https://digital-invitation-wedding-pink-mar.vercel.app/ with three real screenshots. Describe its RSVP as a browser-local demo.

Wedding Digital Invitation Web Ver.2 links to https://felix-rahmawati-wedding.vercel.app/ with real cover, homepage, and gallery screenshots. Its technology labels are HTML, CSS, and JavaScript.

Footer About Me now uses the user's short front-end developer bio, with that role emphasized. Home retains the CV profile. Motion follows enji.dev's staggered x:-32 entrances and silhouette-to-photo reveal; trace Rahmawan's own alpha silhouette and preserve his original face. Every page has viewport reveals, reduced-motion support, and working Quick Access/Focus.

Projects includes SapaTamu - Digital Guestbook (https://sapatamu-eight.vercel.app/) with public portal/recovery screenshots, verified Next.js and React logos, and an honest authorized-dashboard access note. Projects and Experience have a shared Enji-inspired sticky table of contents: scroll-spy highlight, animated scroll-to-top after 200px, native anchor links, 112px scroll offsets, and a collapsible mobile version. Preserve reduced-motion and keyboard access.

Tailwind CSS 4 is integrated with @tailwindcss/vite and @tailwindcss/typography. Use shared Prose.jsx for narrative copy and CV bullets; use theme-adapted utilities from tailwind.css. Keep custom styles in the components layer so utilities have a predictable cascade. fonts.css loads local Plus Jakarta Sans; do not restore the archived layout stylesheet in index.html. SapaTamu gallery now uses four current public-demo screenshots (summary, guests, check-in, seating); all shown data is fictional. Preserve screenshot aspect ratio and the existing theme/Focus/TOC behaviors.

Motion now drives page entrances and gallery crossfades. Project images open in an accessible modal viewer with next/previous, Escape, scroll lock, and opener focus restoration. TOC clicks must visibly highlight the destination heading after scrolling finishes; respect reduced motion with a static temporary highlight. Preserve the original portrait and SVG reveal.

TOC arrival feedback now replays a left-to-right heading pop with one traveling cyan/white light streak and electric line, then restores normal styling. Reduced motion retains the static highlight.

Headless UI Dialog owns Quick Access and the gallery viewer (focus trap, Escape, outside dismissal and scroll lock). Headless UI Switch with Goober styling in ui-styles.js owns theme/Focus toggle states. Do not reintroduce manual modal focus traps or duplicate preference-card CSS. site.config.mjs is the public origin/page metadata/GTM configuration; GTM-PJB889NW is injected only into production HTML. Every known route must ship static Open Graph metadata and the 1200×630 original-photo JPEG. Prioritize the homepage portrait and first project screenshot; keep other galleries lazy/low until interaction.
