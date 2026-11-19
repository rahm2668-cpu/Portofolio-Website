import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import test from 'node:test';

const require=createRequire(new URL('../package.json',import.meta.url));
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {transformSync}=require('esbuild');
const source=readFileSync(new URL('../src/components/ui/flame-button.tsx',import.meta.url),'utf8');
const module={exports:{}};
new Function('require','module','exports',transformSync(source,{loader:'tsx',format:'cjs'}).code)(require,module,module.exports);
const {FlameButton}=module.exports;

test('resume flame keeps native local PDF navigation and accessible label',()=>{
 const href='/assets/profile/Rahmawan-CV.pdf';
 const html=renderToStaticMarkup(React.createElement(FlameButton,{href}));
 assert.ok(html.includes('href="'+href+'"'));
 assert.ok(html.includes('target="_blank" rel="noopener noreferrer"'));
 assert.ok(html.includes('Resume'));
 assert.ok(existsSync(new URL('../public'+href,import.meta.url)));
 assert.ok(!html.includes('<button'));
 const replica=readFileSync(new URL('../src/Replica.jsx',import.meta.url),'utf8');
 assert.ok(replica.includes('<FlameButton href="'+href+'"/>'));
});

test('flame follows pointer edges, clamps coordinates and ignores touch',()=>{
 const link=FlameButton({href:'/resume.pdf'});
 const values=new Map();
 const currentTarget={getBoundingClientRect:()=>({left:10,width:200}),style:{setProperty:(key,value)=>values.set(key,value)},removeAttribute:()=>values.clear()};
 const move=(clientX,pointerType='mouse')=>link.props.onPointerMove({currentTarget,clientX,pointerType});
 move(10);
 assert.equal(values.get('--flame-x'),'0px');
 assert.equal(values.get('--flame-edge'),'12%');
 assert.equal(values.get('--flame-strength'),'1');
 move(110);
 assert.equal(values.get('--flame-strength'),'0');
 move(999);
 assert.equal(values.get('--flame-x'),'200px');
 assert.equal(values.get('--flame-edge'),'88%');
 link.props.onPointerLeave({currentTarget});
 move(40,'touch');
 assert.equal(values.size,0);
 const css=readFileSync(new URL('../src/components/ui/flame-button.css',import.meta.url),'utf8');
 assert.ok(css.includes('prefers-reduced-motion: reduce'));
 assert.ok(css.includes(':focus-visible'));
 assert.ok(!source.includes('requestAnimationFrame'));
});
