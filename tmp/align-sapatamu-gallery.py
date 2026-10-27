from pathlib import Path
p=Path('app/src/portfolio-data.js')
s=p.read_text(encoding='utf-8').replace("{id:'sapatamu',title:","{id:'sapatamu',imageAspectRatio:'1526 / 635',title:")
p.write_text(s,encoding='utf-8')
p=Path('app/src/Replica.jsx')
s=p.read_text(encoding='utf-8').replace('<div className="gallery-frame">','<div className="gallery-frame" style={project.imageAspectRatio?{aspectRatio:project.imageAspectRatio}:undefined}>')
p.write_text(s,encoding='utf-8')
