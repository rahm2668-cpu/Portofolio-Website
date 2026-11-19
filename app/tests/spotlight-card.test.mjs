import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const {renderToStaticMarkup} = require('react-dom/server');
const {transformSync} = require('esbuild');
const source = readFileSync(new URL('../src/components/ui/spotlight-card.jsx', import.meta.url), 'utf8');
const module = {exports: {}};
new Function('require', 'module', 'exports', transformSync(source, {loader: 'jsx', format: 'cjs'}).code)(require, module, module.exports);
const {SpotlightCard} = module.exports;

test('spotlight preserves card markup and pointer lifecycle', () => {
  const article = SpotlightCard({id: 'work-example', tabIndex: -1, children: 'Experience'});
  assert.match(renderToStaticMarkup(article), /^<article id="work-example" tabindex="-1"[^>]*>Experience<\/article>$/);
  assert.match(renderToStaticMarkup(SpotlightCard({as: 'li', children: 'Skill'})), /^<li[^>]*>Skill<\/li>$/);
  const link = SpotlightCard({as: 'a', href: '/resume.pdf', children: 'Resume'});
  assert.match(renderToStaticMarkup(link), /^<a href="\/resume\.pdf"[^>]*>Resume<\/a>$/);

  const values = new Map([['opacity', '1']]);
  const rect = {left: 10, top: 20, width: 200, height: 100};
  const currentTarget = {
    getBoundingClientRect: () => rect,
    style: {setProperty: values.set.bind(values), removeProperty: values.delete.bind(values)},
  };
  const event = {currentTarget, clientX: 60, clientY: 90, pointerType: 'mouse'};
  link.props.onPointerEnter(event);
  assert.equal(values.get('--spotlight-x'), '50px');
  assert.equal(values.get('--spotlight-y'), '70px');
  link.props.onPointerMove({...event, clientX: 999, clientY: 1});
  assert.equal(values.get('--spotlight-x'), '200px');
  assert.equal(values.get('--spotlight-y'), '0px');
  link.props.onPointerLeave(event);
  link.props.onPointerMove({...event, pointerType: 'touch'});
  assert.deepEqual([...values], [['opacity', '1']]);
  link.props.onPointerMove(event);
  link.props.onPointerCancel(event);
  rect.width = 0;
  link.props.onPointerMove(event);
  assert.deepEqual([...values], [['opacity', '1']]);
});
