import fs from 'node:fs';
import path from 'node:path';
fs.mkdirSync('dist/client',{recursive:true});
fs.cpSync('public','dist/client',{recursive:true});
for(const route of ['','projects','blog','today-i-learned','docs','credits','work/contact','work/experience','work/skills-and-tools','work/studio']){
const target=path.join('dist/client',route,'index.html');fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join('public/pages',route?route+'.html':'index.html'),target);
}
console.log('Built local portfolio pages and assets.');
