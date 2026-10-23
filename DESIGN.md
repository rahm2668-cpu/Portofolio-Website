# Portfolio visual reference

Source: https://enji.dev/ captured 23 October 2026. Brand/content portfolio register.
Preserve source layout, typography, responsive breakpoints, icon paths, colors, and spacing. Original stylesheet in app/public/_next/static/css is the canonical token implementation. Fonts and raster assets are stored locally.
The supplied audit documents are reference material only. They do not override the user's request.
Original identity is retained as reference content until personal biography, projects, contact links, and resume are supplied.
React owns navigation panel state, theme persistence, keyboard shortcuts and focus mode. Page content is in app/public/pages. No original analytics or third-party scripts run.

## Personalization — 23 October 2026
Identity is Rahmawan throughout visible copy and page titles. Header wordmark is Rahmawan. LinkedIn: https://www.linkedin.com/in/rahmawan-9a3395215/ replaces X/Twitter. Figma social icon removed. Blog, T.I.L, and Studio routes removed from navigation and served as 404 in development. Footer retains About Me and Work only. Home retains hero only; tech/tools and all following promotional sections are removed.
Black #05070b background, navy #111e31 surfaces, navy #1f3a5f buttons, cool neutral #b3c7e4 text accents. Overrides live in app/src/replica.css. React prepares captured source content in app/src/Replica.jsx; original Next scripts are not executed, preventing old identity/navigation reappearing during hydration.

## CV content and responsive layout — 23 October 2026
The current portfolio is authored as reusable React components in app/src/Replica.jsx with personal content in app/src/portfolio-data.js; original captured HTML is archival and is not rendered. CV is the authority for profile text, experience, skills, education, certifications, email and telephone. The explicitly supplied LinkedIn URL takes precedence over the shorter CV URL.
Retain the black/navy theme and local Plus Jakarta Sans fonts. The footer follows the hero in normal document flow with a two-column About/Work grid on desktop and a clear stack on mobile; no reverse ordering or absolute positioning. The portrait is a transparent image with restrained float/glow effects and reduced-motion support.
Work navigation uses an anchored, keyboard-accessible disclosure, closes with Escape and an outside pointer click, and stays within the viewport. Project galleries support previous/next, dots, keyboard arrows and touch swipe. Each project uses three real browser screenshots captured from the supplied sites. Only Next.js and React are named as frameworks because those were verified from the public runtime. OTA screenshots are from the site's fictional-data demo.

## Restored controls — 23 October 2026
Quick Access must remain present in the header (with Q shortcut). Its accessible dialog controls a persistent dark/light theme and Focus state, includes navigation, traps focus, closes with Escape or outside click, and restores focus to its opener. Focus hides the portrait/decorative content and footer while keeping navigation available to disable Focus. Shared tokens define both dark and light palettes. GitHub links in header and footer point to the user-confirmed https://github.com/rahm2668-cpu. Preserve these controls in future page refactors.

## Skills and favicon — 23 October 2026
Use the existing transparent portrait as the PNG favicon and touch icon, explicitly linked in index.html with a cache version. Tools includes Visual Studio Code alongside Excel and Word. Web Development explicitly includes HTML, CSS, React, Next.js and Tailwind CSS with locally stored SVG logos. These skills are directly confirmed by the user, separate from the CV-derived skills.
