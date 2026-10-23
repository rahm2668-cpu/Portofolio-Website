const fs=require('fs');
const s=fs.readFileSync('source.html','utf8');const icons=s.match(/<svg[^>]*>[\s\S]*?<\/svg>/g)||[];
for(const [name,file] of [['Tailwind CSS','tailwindcss'],['Visual Studio Code','vscode']])fs.writeFileSync('app/public/assets/'+file+'.svg',icons.find(x=>x.includes('<title>'+name+' Icon</title>')));
let app=fs.readFileSync('app/src/Replica.jsx','utf8');
app=app.replace('Practical skills in administration, data, communication, and coordination.','Tools and skills I use across web development, administration, data, and coordination.');
app=app.replace("['Microsoft Word','Administrative documents and reports','word']", "['Microsoft Word','Administrative documents and reports','word'],['Visual Studio Code','Code editing and web development','vscode']");
app=app.replace('<section><h2 className="section-title">Skills</h2>',`<section><h2 className="section-title">Web Development</h2><ul className="development-skills">{[['HTML','html5'],['CSS','css3'],['React','react'],['Next.js','nextjs'],['Tailwind CSS','tailwindcss']].map(([name,icon])=><li key={name}><img src={'/assets/'+icon+'.svg'} width="28" height="28" alt=""/><span>{name}</span></li>)}</ul></section><section><h2 className="section-title">Skills</h2>`);
fs.writeFileSync('app/src/Replica.jsx',app);
