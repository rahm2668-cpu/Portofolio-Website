import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const {transformSync} = require('esbuild');
const source = readFileSync(new URL('../src/components/ui/welcome-intro.jsx', import.meta.url), 'utf8');
const compiled = transformSync(source, {loader: 'jsx', format: 'cjs'}).code;

function harness({seen = false, focus = false, reduced = false, blocked = false} = {}) {
  let state, effect, cleanup, timer, delay, callback;
  const handlers = new Map();
  const storage = new Map([['rahmawan-intro-seen', String(seen)], ['rahmawan-focus', String(focus)]]);
  const store = {
    getItem(key) { if (blocked) throw Error('Storage disabled'); return storage.get(key); },
    setItem(key, value) { if (blocked) throw Error('Storage disabled'); storage.set(key, value); },
  };
  const motion = {matches: reduced, addEventListener: (_, fn) => handlers.set('motion', fn), removeEventListener: () => handlers.delete('motion')};
  const window = {matchMedia: () => motion, setTimeout(fn, ms) { callback = fn; delay = ms; timer = 1; return timer; }, clearTimeout() { timer = null; }};
  const document = {body: {style: {overflow: 'auto'}}, addEventListener: (type, fn) => handlers.set(type, fn), removeEventListener: type => handlers.delete(type)};
  const mockReact = {...React, useState(initial) { if (state === undefined) state = initial(); return [state, value => { state = value; }]; }, useEffect(fn) { effect = fn; }};
  const module = {exports: {}};
  new Function('require', 'module', 'exports', 'window', 'document', 'localStorage', 'sessionStorage', compiled)(
    name => name === 'react' ? mockReact : require(name), module, module.exports, window, document, store, store,
  );
  return {
    render: () => module.exports.WelcomeIntro({children: React.createElement('p', null, 'Portfolio content')}),
    mount() { cleanup = effect(); },
    unmount() { cleanup?.(); },
    runTimer() { assert.equal(delay, 6000); callback(); },
    handlers, document, storage,
    timer: () => timer,
  };
}

test('welcome lasts six seconds, keeps page unmounted, cleans up under Strict Mode', () => {
  const h = harness();
  const markup = renderToStaticMarkup(h.render());
  assert.match(markup, /Welcome to/);
  assert.match(markup, /My Portfolio/);
  assert.match(markup, /Skip intro/);
  assert.doesNotMatch(markup, /RAHMAWAN|Portfolio content/);
  h.mount();
  assert.equal(h.document.body.style.overflow, 'hidden');
  h.unmount();
  assert.equal(h.timer(), null);
  assert.equal(h.handlers.size, 0);
  assert.equal(h.document.body.style.overflow, 'auto');
  h.mount();
  h.runTimer();
  assert.equal(renderToStaticMarkup(h.render()), '<p>Portfolio content</p>');
  assert.equal(h.storage.get('rahmawan-intro-seen'), 'true');
  h.unmount();
});

test('session, Focus and reduced motion bypass intro', () => {
  for (const options of [{seen: true}, {focus: true}, {reduced: true}]) {
    const h = harness(options);
    assert.equal(renderToStaticMarkup(h.render()), '<p>Portfolio content</p>');
    h.mount();
    assert.equal(h.handlers.size, 0);
    assert.equal(h.timer(), undefined);
  }
});

test('Skip, Escape and motion changes enter portfolio even when storage is blocked', () => {
  for (const action of ['skip', 'escape', 'motion']) {
    const h = harness({blocked: true});
    const intro = h.render();
    h.mount();
    if (action === 'skip') intro.props.children[2].props.onClick();
    if (action === 'escape') h.handlers.get('keydown')({key: 'Escape'});
    if (action === 'motion') h.handlers.get('motion')({matches: true});
    assert.equal(renderToStaticMarkup(h.render()), '<p>Portfolio content</p>');
    h.unmount();
    assert.equal(h.handlers.size, 0);
    assert.equal(h.document.body.style.overflow, 'auto');
  }
});
