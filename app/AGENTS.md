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
