import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {pages,site} from '../site.config.mjs';
import {renderPageHtml} from './page-head.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'dist/client');
const template=readFileSync(path.join(output,'index.html'),'utf8');
if(!existsSync(path.join(output,site.image)))throw new Error('Missing Open Graph image: '+site.image);
for(const route of Object.keys(pages)){
  const directory=path.join(output,route==='/'?'':route.slice(1));
  mkdirSync(directory,{recursive:true});
  writeFileSync(path.join(directory,'index.html'),renderPageHtml(template,{pathname:route,production:true}));
}
console.log('Generated static social metadata for '+Object.keys(pages).length+' pages.');
