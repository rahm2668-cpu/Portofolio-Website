from pathlib import Path

def replace(path, old, new):
    target = Path(path)
    text = target.read_text(encoding='utf-8')
    assert text.count(old) == 1, (path, old[:80], text.count(old))
    target.write_text(text.replace(old, new), encoding='utf-8')

replace('app/src/Replica.jsx',
    'import {profile,contact,experience,organizations,skills,certificates,projects}',
    'import {profile,professionalTitle,contact,experience,organizations,skills,tools,webSkills,certificates,projects}')
replace('app/src/Replica.jsx',
    "I'm Rahmawan, a <strong>front-end developer</strong> who loves imagining and creating beautiful designs and applications.",
    "I'm Rahmawan, an <strong>AI-native full stack developer</strong> with a background in administration who loves creating beautiful designs and applications.")
replace('app/src/Replica.jsx',
    '</h1><p className="profile-copy',
    '</h1><p className="hero-role mb-5 max-w-[48ch] text-pretty text-base font-semibold leading-relaxed text-accent" data-entrance="3">{professionalTitle}</p><p className="profile-copy')
replace('app/src/Replica.jsx',
    'sm:text-base" data-entrance="3">{profile}',
    'sm:text-base" data-entrance="4">{profile}')
replace('app/src/Replica.jsx',
    '<div className="hero-actions" data-entrance="4">',
    '<div className="hero-actions" data-entrance="5">')
replace('app/src/Replica.jsx',
    "[['Microsoft Excel','Data input, updates, and processing','excel'],['Microsoft Word','Administrative documents and reports','word'],['Visual Studio Code','Code editing and web development','vscode']].map",
    'tools.map')
replace('app/src/Replica.jsx',
    "[['HTML','html5'],['CSS','css3'],['React','react'],['Next.js','nextjs'],['Tailwind CSS','tailwindcss']].map",
    'webSkills.map')
replace('app/og-preview.html',
    '<p class="role">Front-end developer</p><p class="description">Imagining and creating beautiful<br>designs and applications.</p>',
    '<p class="role">AI-Native Full Stack Developer</p><p class="description">Administration, thoughtful design,<br>and modern web applications.</p>')
replace('README.md',
    'My personal portfolio for front-end projects, professional experience, skills, and contact information.',
    'My personal portfolio as an **Administration | AI-Native Full Stack Developer**, featuring web projects, professional experience, skills, and contact information.')
replace('README.md',
    'Replaced the lengthy footer profile with a short biography emphasizing **front-end developer**.',
    'Replaced the lengthy footer profile with a short biography emphasizing **AI-native full stack developer** and an administrative background.')

with Path('app/AGENTS.md').open('a', encoding='utf-8') as target:
    target.write('\nContent refresh from the corrected Rahmawan CV supplied on 6 November 2026: professional title is Administration | AI-Native Full Stack Developer. This supersedes the earlier front-end-only footer identity; keep About Me short. Skills include WordPress and Visual Studio Code, plus HTML, CSS, JavaScript, Git, React, Next.js, Tailwind CSS, Vue.js, Framer Motion, and TypeScript with local SVG logos. The profile, work/organization history, education, certificates, email and phone match the corrected CV. Preserve the previously confirmed complete LinkedIn URL rather than the abbreviated /in/rahmawan link in the document. Resume must serve the corrected original PDF, with the original photo intact.\n')
