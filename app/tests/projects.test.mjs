import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {projects} from '../src/portfolio-data.js';
import {renderPageHtml} from '../scripts/page-head.mjs';

test('MAJU+ keeps development status, planned scope, live link, and original logo',()=>{
  const project=projects[0];
  assert.equal(project.id,'majuplus');
  assert.equal(project.url,'https://hris-majuplus.vercel.app/login');
  assert.equal(project.status,'In development');
  assert.match(project.description,/still in development/);
  assert.equal(project.featuresHeading,'Planned feature scope');
  assert.match(project.accessNote,/Authenticated workflows have not been verified/);
  assert.ok(project.features.length>=6);
  assert.ok(project.slides.some(([file])=>file==='majuplus-logo.png'));
  assert.match(renderPageHtml('<!-- portfolio:head:start --><!-- portfolio:head:end -->',{pathname:'/projects'}),new RegExp(project.slides[0][0].replace('.', '\\.')));
  for(const item of projects) for(const [file,label] of item.slides){
    assert.ok(existsSync(new URL('../public/assets/projects/'+file,import.meta.url)),file);
    assert.ok(label.length>0);
  }
  const source=readFileSync(new URL('../src/Replica.jsx',import.meta.url),'utf8');
  assert.ok(source.includes('{project.status}'));
  assert.ok(source.includes('{project.featuresHeading}'));
  assert.equal(new Set(projects.map(item=>item.id)).size,projects.length);
});

test('project features use native markers so wrapped lines align with text',()=>{
  const css=readFileSync(new URL('../src/replica.css',import.meta.url),'utf8');
  assert.match(css,/\.project-features\{[^}]*list-style:disc;[^}]*padding:0 0 0 18px/);
  assert.match(css,/\.project-features li::marker\{/);
  assert.doesNotMatch(css,/\.project-features li::?before\{/);
});
