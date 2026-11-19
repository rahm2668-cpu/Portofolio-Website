import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import test from 'node:test';

const require=createRequire(new URL('../package.json',import.meta.url));
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {transformSync}=require('esbuild');
const source=readFileSync(new URL('../src/components/ui/liquid-glass-navbar.tsx',import.meta.url),'utf8');
const module={exports:{}};
new Function('require','module','exports',transformSync(source,{loader:'tsx',format:'cjs'}).code)(require,module,module.exports);
const {LiquidNavbar,NimbusIcons}=module.exports;
const items=[
 {label:'Home',href:'/',icon:NimbusIcons.home,fx:'glow'},
 {label:'Projects',href:'/projects',current:true,icon:NimbusIcons.globe,fx:'spin'},
 {label:'Work',icon:NimbusIcons.user,fx:'wave',expanded:true,controls:'work-navigation'}
];

test('liquid navbar preserves native links, current route and disclosure semantics',()=>{
 const html=renderToStaticMarkup(React.createElement(LiquidNavbar,{items,active:2,tone:'dark'}));
 assert.match(html,/aria-label="Main navigation"/);
 assert.match(html,/<a[^>]*href="\/projects"[^>]*aria-current="page"/);
 assert.match(html,/<button[^>]*type="button"[^>]*aria-expanded="true"[^>]*aria-controls="work-navigation"/);
 assert.doesNotMatch(html,/<button[^>]*aria-current/);
 assert.match(html,/data-tone="dark"/);
 assert.match(html,/data-gl="off"/);
 assert.match(html,/>Home<\/span>/);
 assert.match(html,/>Work<\/span>/);
});

test('water rendering cleans up and keyboard arrows only move focus',()=>{
 const keyboard=source.slice(source.indexOf('  const onKeyDown'),source.indexOf('  const onMove'));
 assert.match(keyboard,/itemRefs\.current\[n\]\?\.focus\(\)/);
 assert.doesNotMatch(keyboard,/onClick|select\(|setFx|onChange/);
 for(const cleanup of ['cancelAnimationFrame(s.raf)','io.disconnect()','ro.disconnect()','s.glc?.dispose()','motion.removeEventListener("change", motionChanged)']) assert.ok(source.includes(cleanup),cleanup);
 assert.match(source,/if \(s\.reduce\)/);
 assert.match(source,/!s\.reduce && busy/);
 assert.match(source,/it\.onClick\?\.\(\)/);
 assert.match(source,/onKeyDown: it\.onKeyDown/);
 const header=readFileSync(new URL('../src/Replica.jsx',import.meta.url),'utf8');
 assert.match(header,/hidden=\{!open\}/);
 assert.match(header,/tone=\{dark\?'dark':'light'\}/);
});
