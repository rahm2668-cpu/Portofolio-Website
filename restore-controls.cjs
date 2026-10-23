const fs=require('fs');
const s=fs.readFileSync('source.html','utf8');const a=s.match(/<svg[^>]*>[\s\S]*?<\/svg>/g)||[];
fs.writeFileSync('app/public/assets/github.svg',a.find(x=>x.includes('<title>GitHub Icon</title>')));
const i=s.indexOf('aria-label="Open Quick Access"');fs.writeFileSync('app/public/assets/quick-access.svg',s.slice(i).match(/<svg[^>]*>[\s\S]*?<\/svg>/)[0]);
let code=fs.readFileSync('app/src/Replica.jsx','utf8');
code=code.replace("import {profile,", "import {Preferences,QuickAccess,usePreferences} from './QuickAccess';\nimport {profile,");
code=code.replace(/function Social\(\)\{[^\n]+/,`function Social(){return <><a className="social-link" href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="Rahmawan on LinkedIn"><img src="/assets/linkedin.svg" width="20" height="20" alt="LinkedIn"/></a><a className="social-link" href="https://github.com/rahm2668-cpu" target="_blank" rel="noreferrer" aria-label="Rahmawan on GitHub"><img src="/assets/github.svg" width="20" height="20" alt="GitHub"/></a></>}`);
code=code.replace('function Header(){const [open','function Header(){const {setQuick}=usePreferences();const [open');
code=code.replace("if(e.key==='Escape'){setOpen(false);trigger.current?.focus()}","if(e.key==='Escape'&&menu.current?.querySelector('.work-panel')){setOpen(false);trigger.current?.focus()}");
code=code.replace('<div className="header-social"><Social/></div>','<div className="header-social"><Social/><button className="quick-trigger" aria-label="Open Quick Access" title="Quick Access (Q)" onClick={()=>setQuick(true)}><img src="/assets/quick-access.svg" alt="" width="20" height="20"/><span>Quick Access <kbd>Q</kbd></span></button></div>');
const appStart=code.indexOf('export function App()');
code=code.slice(0,appStart)+`export function App(){
 const [quick,setQuick]=useState(false),[dark,setDark]=useState(()=>localStorage.getItem('rahmawan-theme')!=='light'),[focus,setFocus]=useState(()=>localStorage.getItem('rahmawan-focus')==='true');
 const pages={'/':Home,'/projects':Projects,'/work/experience':Experience,'/work/skills-and-tools':Skills,'/work/contact':Contact};const Page=pages[path];
 useEffect(()=>{const names={'/':'Portfolio','/projects':'Projects','/work/experience':'Experience','/work/skills-and-tools':'Skills & Tools','/work/contact':'Contact'};document.title=(names[path]||'Page not found')+' — Rahmawan'},[]);
 useEffect(()=>{document.documentElement.classList.toggle('dark',dark);document.documentElement.dataset.theme=dark?'dark':'light';localStorage.setItem('rahmawan-theme',dark?'dark':'light')},[dark]);
 useEffect(()=>{localStorage.setItem('rahmawan-focus',String(focus))},[focus]);
 useEffect(()=>{const key=e=>{if(e.key.toLowerCase()==='q'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!/input|textarea|select/i.test(e.target.tagName)&&!e.target.isContentEditable){e.preventDefault();setQuick(x=>!x)}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key)},[]);
 return <Preferences.Provider value={{dark,setDark,focus,setFocus,quick,setQuick}}><div className={'portfolio-app'+(focus?' focus-mode':'')} inert={quick?true:undefined}><a className="skip-link" href="#main-content">Skip to content</a><Header/>{Page?<Page/>:<main id="main-content" className="page-main"><PageTitle title="Page not found"/><a href="/">Back to home</a></main>}<Footer/></div>{quick&&<QuickAccess/>}</Preferences.Provider>
}
`;
fs.writeFileSync('app/src/Replica.jsx',code);
