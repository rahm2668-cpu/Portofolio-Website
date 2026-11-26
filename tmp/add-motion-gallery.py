from pathlib import Path
p=Path('app/src/Replica.jsx'); s=p.read_text(encoding='utf-8'); s=s.replace("import {Prose} from './Prose';", "import {Prose} from './Prose';\nimport {Gallery} from './ProjectGallery';"); a=s.index('function Gallery('); b=s.index('function Projects()',a); s=s[:a]+s[b:]; p.write_text(s,encoding='utf-8')
