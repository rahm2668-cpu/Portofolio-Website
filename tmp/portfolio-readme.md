# Rahmawan · Personal Portfolio

[Live website](https://portofolio-website-sigma-liart.vercel.app/) · [Source code](https://github.com/rahm2668-cpu/Portofolio-Website) · [LinkedIn](https://www.linkedin.com/in/rahmawan-9a3395215/)

![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black) ![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Vercel](https://img.shields.io/badge/Hosted_on-Vercel-000000?logo=vercel&logoColor=white)

My personal portfolio for front-end projects, professional experience, skills, and contact information. Personalized by **Rahmawan**, with a black/navy palette, my own biography and original portrait, and real project screenshots.

## Preview

### Homepage animation

The greeting, name, profile, and actions enter in sequence. A line traces my portrait silhouette before the original photograph appears. This GIF is recorded from the running website.

![Staggered text and silhouette-to-photo reveal](docs/media/home-motion.gif)

### Desktop

![Rahmawan portfolio homepage](docs/media/home-desktop.png)

### Projects

![Projects page featuring Wedding Digital Invitation Web Ver.2](docs/media/projects.png)

### Skills and contact

| Skills and Tools | Contact |
| --- | --- |
| ![Skills and Tools](docs/media/skills.png) | ![Contact](docs/media/contact.png) |

### Mobile

![Mobile homepage](docs/media/home-mobile.png)

## Original creator and credits

The original **enji.dev** website, visual design, and reference implementation were created by **[Enji Kusnadi](https://github.com/enjidev)**. This portfolio adapts that visual reference for my own identity and content. I do not claim authorship of the original design.

- Original website: [enji.dev](https://enji.dev/)
- Original source: [enjidev/enji.dev](https://github.com/enjidev/enji.dev)
- Original documentation: [Enji's README](https://github.com/enjidev/enji.dev/blob/main/README.md)
- Motion references: [HeaderTitle](https://github.com/enjidev/enji.dev/blob/main/apps/enji.dev/src/contents/index/Header/HeaderTitle.tsx), [HeaderImage](https://github.com/enjidev/enji.dev/blob/main/apps/enji.dev/src/contents/index/Header/HeaderImage.tsx), and [PageHeader](https://github.com/enjidev/enji.dev/blob/main/apps/enji.dev/src/components/PageHeader.tsx).

The local React implementation, Rahmawan-specific content, project galleries, responsive fixes, and motion adaptation are maintained in this repository. Enji's original application uses Next.js, TypeScript, Framer Motion, Tailwind CSS, and MDX. **This separate adaptation uses React, Vite, JavaScript, and CSS**, rather than the original Next.js monorepo.

## What I changed

| Area | Personalization and changes |
| --- | --- |
| Identity | Replaced the visible name, page titles, biography, portrait, favicon, and contact details with Rahmawan's information. |
| Theme | Changed the black/purple reference palette to black/navy; retained persistent dark and light modes. |
| Homepage | Kept the personal introduction and actions; removed the original technology and promotional sections below the hero. |
| About Me | Replaced the lengthy footer profile with a short biography emphasizing **front-end developer**. |
| Navigation | Removed Blog, T.I.L, Studio, Services Soon, Learn, and This Site items. Fixed the mobile Work dropdown positioning. |
| Social links | Replaced X/Twitter with my LinkedIn, restored my GitHub link, and removed the Figma social link. |
| Resume and experience | Added my CV, education, work experience, organizational involvement, and certifications. |
| Skills and tools | Added HTML, CSS, React, Next.js, Tailwind CSS, Visual Studio Code, Microsoft Excel, and Microsoft Word with local icons. |
| Projects | Added four personal projects with descriptions, technology labels, live links, and three real screenshots per gallery. |
| Motion | Added staggered entrances on every page, on-scroll section reveals, a greeting spring, and an outline-to-photo reveal following Enji's sequence. |
| Accessibility | Preserved keyboard navigation, visible focus, swipe/button gallery controls, reduced-motion handling, and Quick Access. |

The homepage profile remains based on my CV; the short developer biography appears in the footer. The portrait is an original-photo cutout. The reveal does not generate, reshape, or retouch my face; its SVG follows the photo's alpha silhouette.

## Featured projects

1. **[Wedding Digital Invitation Web Ver.2](https://felix-rahmawati-wedding.vercel.app/)** — personalized Felix and Rahma invitation with a curtain opening, couple introduction, sliding gallery, and RSVP form. HTML, CSS, JavaScript.
2. **[Wedding Digital Invitation Web](https://digital-invitation-wedding-pink-mar.vercel.app/)** — interactive invitation, story timeline, countdown, gallery, and browser-local RSVP demo. Next.js and React.
3. **[Kayarra Resort Hotel Website](https://kayarra-official-website.vercel.app/)** — resort accommodation, facilities, photo galleries, and reservation inquiries. Next.js and React.
4. **[OTA Management System Hotel](https://kayarra-ota-management-system.vercel.app/)** — hotel operations portfolio demo with reservations, rates, inventory, and revenue overviews using fictional sample data. Next.js and React.

Project technology labels describe the linked projects, separately from this portfolio's own stack.

## Tech stack

- React 19, JavaScript, and Vite 6.
- CSS variables, responsive layouts, local Plus Jakarta Sans fonts, and SVG icons.
- Native Web Animations API for content entrances; IntersectionObserver for viewport reveals.
- CSS and SVG for the hand spring, silhouette draw, and photo fade.
- Vercel hosting with an SPA fallback for direct page URLs.

No extra animation framework is required. With `prefers-reduced-motion: reduce`, entrance effects are skipped and the portrait appears immediately. Page content is visible by default, so readability does not depend on a scroll observer firing.

## Run locally

Install Node.js 20.19+ or 22.12+. npm is included with Node.js.

```sh
git clone https://github.com/rahm2668-cpu/Portofolio-Website.git
cd Portofolio-Website/app
npm install
npm run dev -- --port 4173
```

Open [localhost:4173](http://localhost:4173/). Choose another port if it is already in use.

### Production build and checks

Run these inside `app`:

```sh
npm run build
npm run test:sites
npm run preview -- --port 4173
```

The production files are written to `app/dist/client`. The build also prepares the existing Sites-compatible server and hosting metadata.

## Project structure

```text
app/src/
  Replica.jsx          Pages, header, footer, and screenshot galleries
  Motion.jsx           Shared content reveals and original portrait
  motion.css           Hand, silhouette, photo, and reduced-motion effects
  QuickAccess.jsx      Theme and Focus dialog
  portfolio-data.js    CV content and project information
  replica.css          Theme tokens, layout, and responsive styling
app/public/assets/
  profile/             Resume PDF and portrait assets
  projects/            Actual screenshots of the four linked projects
docs/media/            README screenshots and animation recording
```

Historical captured files under `app/public/pages` and `app/public/_next` are reference archives. Their original application scripts and analytics are not executed. Do not rerun `capture.mjs` for routine content edits.

## Quick Access

Use the header button or press **Q**. **Escape** closes the dialog. Theme and Focus preferences are saved locally. Focus hides the decorative portrait and footer while keeping navigation and Quick Access available.

## Contact

[LinkedIn](https://www.linkedin.com/in/rahmawan-9a3395215/) · [GitHub](https://github.com/rahm2668-cpu) · [Portfolio](https://portofolio-website-sigma-liart.vercel.app/)

Thank you to **Enji Kusnadi** for the original design and publicly available reference implementation.
