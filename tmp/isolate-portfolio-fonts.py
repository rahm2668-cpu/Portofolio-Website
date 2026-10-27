from pathlib import Path
import re
source=Path('app/public/_next/static/css/286627b4916968c8.css').read_text(encoding='utf-8')
fonts=[rule for rule in re.findall(r'@font-face\{[^}]+\}',source) if 'Plus_Jakarta_Sans' in rule]
Path('app/src/fonts.css').write_text('/* Existing local Plus Jakarta Sans; archival layout CSS is not loaded. */\n'+'\n'.join(fonts)+'\n',encoding='utf-8')
p=Path('app/index.html')
s=p.read_text(encoding='utf-8').replace('    <link rel="stylesheet" href="/_next/static/css/286627b4916968c8.css" />','    <link rel="preload" href="/_next/static/media/636a5ac981f94f8b-s.p.woff2" as="font" type="font/woff2" crossorigin />')
p.write_text(s,encoding='utf-8')
p=Path('app/src/main.jsx')
s=p.read_text(encoding='utf-8').replace('import "./tailwind.css";','import "./fonts.css";\nimport "./tailwind.css";')
p.write_text(s,encoding='utf-8')
