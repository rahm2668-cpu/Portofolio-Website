from pathlib import Path
p=Path('app/src/Replica.jsx')
s=p.read_text(encoding='utf8')
s=s.replace("import {Preferences,QuickAccess,usePreferences} from './QuickAccess';", "import {Preferences,QuickAccess,usePreferences} from './QuickAccess';\nimport {Portrait,usePageMotion} from './Motion';")
old='<div className="footer-about"><h2>About Me</h2><p>{profile}</p><Social/></div>'
new='<div className="footer-about"><h2>About Me</h2><p>I\'m Rahmawan, a <strong>front-end developer</strong> who loves imagining and creating beautiful designs and applications.</p><Social/></div>'
assert old in s
s=s.replace(old,new)
s=s.replace('<p className="hello">','<p className="hello" data-entrance="1">')
s=s.replace('<h1>I\'m <strong>Rahmawan,</strong></h1>','<h1 data-entrance="2">I\'m <strong>Rahmawan,</strong></h1>')
s=s.replace('<p className="profile-copy">','<p className="profile-copy" data-entrance="3">')
s=s.replace('<div className="hero-actions">','<div className="hero-actions" data-entrance="4">')
start=s.index('<div className="portrait-stage">')
end=s.index('</section></main>}',start)
s=s[:start]+'<Portrait/>'+s[end:]
s=s.replace('<p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children&&<p>{children}</p>}', '<p className="eyebrow" data-entrance="0">{eyebrow}</p><h1 data-entrance="1">{title}</h1>{children&&<p data-entrance="2">{children}</p>}')
s=s.replace(" const pages={'/':Home", " usePageMotion(focus);\n const pages={'/':Home")
p.write_text(s,encoding='utf8')
