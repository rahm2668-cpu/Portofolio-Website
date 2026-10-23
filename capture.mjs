import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve('app/public');fs.mkdirSync(root,{recursive:true});
const done=new Set();
function get(url,file){fs.mkdirSync(path.dirname(file),{recursive:true});execFileSync('curl.exe',['-fLsS','--retry','3','--max-time','45','https://enji.dev'+url,'-o',file]);}
function asset(url){url=url.replaceAll('&amp;','&');if(!url.startsWith('/')||done.has(url))return;done.add(url);try{get(url,path.join(root,url));}catch(e){console.log('Unavailable',url);}}
const routes=['/','/projects','/blog','/today-i-learned','/work/contact','/work/experience','/work/skills-and-tools','/work/studio','/docs','/credits'];
for(const route of routes){const dest=path.join(root,'pages',route==='/'?'index.html':route+'.html');if(route==='/'){fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync('source.html',dest);}else get(route,dest);let html=fs.readFileSync(dest,'utf8');
 for(const m of html.matchAll(/\/_next\/image\?url=([^&"\s]+)/g))asset(decodeURIComponent(m[1]));
 html=html.replace(/2025(?=<!-- -->, Enji)/g,'2026');
 for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(/\.(js|css|woff2?|png|jpg|jpeg|webp|svg|ico)(?:\?|$)/.test(m[1]))asset(m[1]);}
 for(const m of html.matchAll(/(\/assets\/[^"\s<>]+?\.(?:png|jpg|webp|svg|pdf))/g))asset(m[1]);
 const data=html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);if(data){const json=JSON.parse(data[1]);const f=path.join(root,'_next/data',json.buildId,route==='/'?'index.json':route+'.json');fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,JSON.stringify(json));}
 fs.writeFileSync(dest,html);console.log('Captured',route);
}
for(const file of [...done].filter(x=>x.endsWith('.css'))){const css=fs.readFileSync(path.join(root,file),'utf8');for(const m of css.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)){const url=new URL(m[1],'https://enji.dev'+file).pathname;asset(url);}}
console.log('Assets',done.size);
