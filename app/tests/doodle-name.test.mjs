import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import test from 'node:test';
import {runInNewContext} from 'node:vm';
const require = createRequire(new URL('../package.json', import.meta.url));
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const {transformSync} = require('esbuild');
const source = readFileSync(new URL('../src/components/ui/doodle-name.jsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/components/ui/doodle-name.css', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/Replica.jsx', import.meta.url), 'utf8');
const module = {exports: {}};
new Function('require', 'module', 'exports', transformSync(source, {loader: 'jsx', format: 'cjs'}).code)(require, module, module.exports);

test('original six crew, eight title-case glyphs, separate accessible controls and unique SVG IDs', () => {
  const html = renderToStaticMarkup(React.createElement(module.exports.DoodleName));
  assert.equal([...html.matchAll(/class="dcf-letter"/g)].length, 8);
  assert.equal([...html.matchAll(/<text[^>]*>(.*?)<\/text>/g)].map(match => match[1]).join(''), 'Rahmawan');
  const controls = [...html.matchAll(/<rect[^>]*role="button"[^>]*>/g)].map(match => match[0]);
  assert.equal(controls.length, 6);
  ['Bruno', 'Pip', 'Morel', 'Juno', 'Boo', 'Patch'].forEach((name, index) => {
    assert.match(controls[index], new RegExp('aria-label="' + name + ':'));
    assert.match(controls[index], /tabindex="0"/);
    assert.doesNotMatch(controls[index], /aria-hidden/);
  });
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /dcf-arrive-behind/);
  assert.match(html, /dcf-tail/);
  assert.match(html, /feDisplacementMap/);
  assert.equal([...html.matchAll(/data-gaze=/g)].length, 11);
  assert.match(html, /data-gaze="[^"]+ -1"/);
  assert.match(source, /event.key === 'Enter' \|\| event.key === ' '/);
  assert.match(source, /event.key === 'Escape'/);
  const pair = renderToStaticMarkup(React.createElement(React.Fragment, null, React.createElement(module.exports.DoodleName), React.createElement(module.exports.DoodleName)));
  const ids = [...pair.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
});

test('home-only heading keeps finite entrances, reference crew idle, reduced motion and Focus', () => {
  assert.match(page, /<h1[^>]+aria-label="I'm Rahmawan,"[^>]*>I'm <DoodleName\/>/);
  assert.equal([...page.matchAll(/<DoodleName\//g)].length, 1);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /data-focus=true/);
  assert.match(css, /doodle-crew-control[^}]*display:none/);
  const loops = css.split('\n').filter(line => line.includes('infinite'));
  assert.equal(loops.length, 4);
  loops.forEach(line => assert.match(line, /dcf-art|dcf-tail/));
  assert.doesNotMatch(css, /\.dcf-letter\{[^}]*infinite/);
  assert.match(css, /stroke-dashoffset:0/);
  assert.match(css, /data-offscreen[^}]*animation-play-state:paused/);
});

test('gaze coalesces pointer events, skips touch/Focus/reduced motion and cleans up', () => {
  const events = new Map(), frames = new Map();
  const motion = {matches: false, addEventListener: (name, fn) => events.set('motion:' + name, fn), removeEventListener: name => events.delete('motion:' + name)};
  const root = {dataset: {}};
  const pupils = [1, -1].map(direction => ({dataset: {gaze: '50 -50 3 ' + direction},
    setAttribute(name, value) { this[name] = value; }, removeAttribute(name) { delete this[name]; }}));
  let reads = 0, nextFrame = 0, zeroBounds = false;
  const svg = {querySelectorAll: () => pupils, viewBox: {baseVal: {width: 100, height: 100, y: -100}},
    getBoundingClientRect: () => {reads++; return {left: 0, top: 0, width: zeroBounds ? 0 : 100, height: 100};},
    addEventListener: (name, fn) => events.set(name, fn), removeEventListener: name => events.delete(name)};
  const track = runInNewContext(source.slice(source.indexOf('function trackGaze('), source.indexOf('export function DoodleName')) + '; trackGaze;', {
    matchMedia: () => motion, document: {documentElement: root},
    requestAnimationFrame: fn => {frames.set(++nextFrame, fn); return nextFrame;}, cancelAnimationFrame: id => frames.delete(id),
  });
  const cleanup = track(svg);
  const move = (clientX, pointerType = 'mouse') => events.get('pointermove')({clientX, clientY: 50, pointerType});
  const flush = () => {for (const [id, fn] of frames) {frames.delete(id); fn();}};
  for (let i = 0; i < 100; i++) move(i);
  assert.equal(frames.size, 1);
  assert.equal(reads, 0);
  flush();
  assert.equal(reads, 1);
  assert.equal(pupils[0].transform, 'translate(1.225 0)');
  assert.equal(pupils[1].transform, 'translate(-1.225 0)');
  move(90, 'touch');
  assert.equal(frames.size, 0);
  root.dataset.focus = 'true';
  move(90);
  assert.equal(frames.size, 0);
  root.dataset.focus = 'false';
  motion.matches = true;
  events.get('motion:change')();
  assert.equal(pupils[0].transform, undefined);
  move(90);
  assert.equal(frames.size, 0);
  motion.matches = false;
  move(90);
  events.get('pointerleave')();
  assert.equal(frames.size, 0);
  zeroBounds = true;
  move(90);
  flush();
  assert.equal(pupils[0].transform, undefined);
  move(90);
  cleanup();
  assert.equal(frames.size, 0);
  assert.equal(events.size, 0);
});
