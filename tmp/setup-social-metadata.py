from pathlib import Path
import json
p=Path('app/package.json');d=json.loads(p.read_text());d['scripts']['build']='vite build && node scripts/generate-pages.mjs && node scripts/prepare-sites-build.mjs';d['scripts']['test:metadata']='node --test tests/page-head.test.mjs';p.write_text(json.dumps(d,indent=2)+'\n')
p=Path('app/vercel.json');d=json.loads(p.read_text());d['rewrites']=[{'source':route,'destination':route+'/index.html'} for route in ['/projects','/work/experience','/work/skills-and-tools','/work/contact']]+d['rewrites'];p.write_text(json.dumps(d,indent=2)+'\n')
Path('app/public/assets/social').mkdir(parents=True,exist_ok=True)
