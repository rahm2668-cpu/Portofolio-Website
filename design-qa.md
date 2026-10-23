# CV portfolio verification — 23 October 2026

Source of truth: user request, supplied Rahmawan CV and photo, prior confirmed LinkedIn URL, and the two supplied live projects.
Implementation: http://localhost:4173/

## Evidence
- rahmawan-home.png: desktop home with CV profile and transparent portrait.
- mobile-work-menu.png: 390 x 844 iframe viewport with anchored Work disclosure open, entirely within the phone width.
- mobile-projects.png: same mobile viewport with project gallery moved to slide 2.
- rahmawan-projects.png: desktop gallery, explanation, and Next.js/React logos.
- Project source screenshots: app/public/assets/projects, three distinct views of each supplied site. OTA views are from its public fictional-data demo.

## Findings and fixes
- Replaced the fragile captured-markup transformation with shared authored React Header, Footer and page components. This prevents original identity and layout behavior from returning.
- Removed footer reverse-column order and absolute layout dependencies. Footer now follows the complete hero; desktop DOM geometry confirms footer top is below portrait bottom.
- Work is a relative-positioned disclosure with a bounded absolute panel, correct expanded state, Escape/outside-click dismissal, and keyboard entry. Browser verified open state at 390px width.
- Hero and About Me share the same CV profile constant; browser verified exact equality.
- Experience contains all four CV work/internship entries and both organization entries. Education and achievement retained. Skills contains the ten listed skills, Excel/Word tools and six certifications.
- Contact contains the supplied email and phone and previously confirmed LinkedIn URL. No original reference identity, fake contact, or Services Soon item is rendered.
- Resume links point to the local PDF. SHA256 matches the original supplied PDF exactly.
- Portrait has actual alpha transparency, preserved identity and formal clothing, floating/glow/entrance effects, and reduced-motion override.
- Both project carousels changed from first to second screenshot in browser. Mobile next button also changed the caption and image. Three slides, dots, arrow-key controls and touch handling are implemented.

## Visual surfaces
Typography: local Plus Jakarta Sans retained, stable desktop/mobile wrapping and clear heading hierarchy.
Layout: normal flow footer, responsive hero and content grids, anchored disclosure, no desktop horizontal overflow.
Colors: black #05070b, navy #0d1522/#213e65, cool accent #b3c7e4.
Assets: original user portrait cutout, exact PDF, six real project captures, verified local framework and Office logos. All displayed project images loaded in browser.
Copy: profile and CV facts transcribed without invented role claims; projects described from observed guest-facing and demo operational screens. Next.js/React verified from both public runtimes; other unverified frameworks are not claimed.

## Checks
Production build passed. Four existing packaging checks passed. Browser error log on the fresh desktop session was empty. Work-to-Experience navigation, Skills page, Contact destinations, gallery next controls, mobile disclosure, footer ordering and profile equality were checked.
Touch swipe handling and reduced-motion styling are implemented; physical-device touch and OS-level reduced-motion toggling were not separately exercised. Mobile was verified in a 390 x 844 browser iframe, rather than a physical handset.

final result: passed

## Restored controls verification
Quick Access, Dark Mode and Focus restored with persisted preferences. Browser verified light background switching, Focus hiding footer and portrait, persistence after reload, Q opening the dialog, Escape closing it and focus returning to the trigger. Header and footer GitHub links both point to https://github.com/rahm2668-cpu. Mobile 390px iframe screenshot confirms LinkedIn, GitHub and Quick Access fit alongside navigation. Evidence: quick-access-restored.png. Existing CV content and galleries retained. Production build passed.
