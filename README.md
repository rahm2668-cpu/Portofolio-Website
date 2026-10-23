# Rahmawan portfolio

Preview: http://localhost:4173/

Run from app: `npm run dev -- --port 4173`.
Build: `npm run build`. Output: app/dist/client.

The portfolio is authored in app/src/Replica.jsx. Personal content is maintained in app/src/portfolio-data.js, with profile, work/organization experience, skills, education, certifications, email and telephone transcribed from the supplied CV. The previous explicit LinkedIn URL is retained. Styling is in app/src/replica.css, using black/navy colors and the original locally stored Plus Jakarta Sans font.

Pages: home, projects, experience, skills/tools, contact. Footer content follows normal document flow. No Blog, T.I.L, Studio, Services Soon, Learn or This Site items.

Resume opens app/public/assets/profile/Rahmawan-CV.pdf, an exact copy of the supplied CV. Portrait uses a transparent background cutout generated from the supplied photo, with restrained animation and reduced-motion support.

Project galleries contain three actual browser screenshots per project. Both projects were verified to use Next.js and React. OTA screenshots are taken from its public fictional-data demo. Gallery controls support buttons, dots, keyboard arrows, and horizontal touch swipes.

mobile-preview.html is a development-only 390 x 844 iframe harness for checking responsive layout; it is not a production page or navigation item. Historical captured HTML and runtime files under public are archival; the app does not execute them. capture.mjs should not be rerun for normal portfolio edits.

No public deployment has been performed.

Quick Access is available through the header button or Q. Theme and Focus preferences persist in local storage. GitHub: https://github.com/rahm2668-cpu. Preference dialog implementation: app/src/QuickAccess.jsx.
