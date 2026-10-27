from pathlib import Path
p=Path('app/src/Replica.jsx')
s=p.read_text(encoding='utf8')
s=s.replace("import {Portrait,usePageMotion} from './Motion';", "import {Portrait,usePageMotion} from './Motion';\nimport {WithContents} from './TableOfContents';")
key="const path=location.pathname.replace"
pos=s.index(key)
s=s[:pos]+"const slug=value=>value.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');\nconst experienceContents=[{id:'work-title',title:'Work Experience'},...experience.map(item=>({id:'work-'+slug(item.company),title:item.company,depth:2})),{id:'organization-title',title:'Organization'},...organizations.map(item=>({id:'organization-'+slug(item.company),title:item.company,depth:2})),{id:'education-title',title:'Education'}];\n"+s[pos:]
s=s.replace('<h1 data-entrance="1">{title}</h1>','<h1 data-entrance="1" tabIndex="-1">{title}</h1>')
s=s.replace('function Timeline({items})','function Timeline({items,prefix})')
s=s.replace('<article className="timeline-item" key={item.company}>','<article className="timeline-item" id={prefix+\'-\'+slug(item.company)} data-toc-target tabIndex="-1" key={item.company}>')
start=s.index('function Experience()')
end=s.index('\nfunction Skills()',start)
section=s[start:end]
section=section.replace('className="page-main"','className="page-main has-contents"',1)
section=section.replace('</PageTitle><section','</PageTitle><WithContents items={experienceContents}><section',1)
section=section.replace('<Timeline items={experience}/>','<Timeline items={experience} prefix="work"/>')
section=section.replace('<Timeline items={organizations}/>','<Timeline items={organizations} prefix="organization"/>')
section=section.replace('<h2 className="section-title">Organization</h2>','<h2 id="organization-title" className="section-title" data-toc-target tabIndex="-1">Organization</h2>')
section=section.replace('<h2 className="section-title">Education</h2>','<h2 id="education-title" className="section-title" data-toc-target tabIndex="-1">Education</h2>')
section=section.replace('<h2 id="work-title" className="section-title">','<h2 id="work-title" className="section-title" data-toc-target tabIndex="-1">')
section=section.replace('</section></main>}','</section></WithContents></main>}')
s=s[:start]+section+s[end:]
start=s.index('function Projects()')
end=s.index('\nexport function App()',start)
section=s[start:end]
section=section.replace('className="page-main projects-page"','className="page-main projects-page has-contents"')
section=section.replace('Web projects for hospitality, hotel operations, and wedding invitations.','Web projects for guest management, hospitality, and wedding invitations.')
section=section.replace('</PageTitle><div className="projects-list">','</PageTitle><WithContents items={projects.map(project=>({id:\'project-\'+project.id,title:project.title}))}><div className="projects-list">')
section=section.replace('<article className="project" key={project.id}>','<article className="project" id={\'project-\'+project.id} data-toc-target tabIndex="-1" key={project.id}>')
section=section.replace('</ul></article>','</ul>{project.accessNote&&<p className="project-access-note">{project.accessNote}</p>}</article>')
section=section.replace('</div></main>}','</div></WithContents></main>}')
s=s[:start]+section+s[end:]
p.write_text(s,encoding='utf8')
