import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import test from 'node:test';
import {handleVisitorsRequest} from '../api/visitors.js';
import worker from '../cloudflare-visitors/index.js';
import {DatabaseSync} from 'node:sqlite';

const origin = 'https://portfolio.example';
const request = (method = 'GET', headers = {}, body) => new Request(`${origin}/api/visitors`, {
  method, headers: {origin, 'user-agent': 'Mozilla/5.0', ...headers}, body,
});
const at = '2026-11-19T22:34:00.000Z';
const visit = {visit: 1, country: 'ID', at};

function mockWorker(t, handler) {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url.href, 'https://test.workers.dev/visitors');
    assert.equal(options.headers.Authorization, 'Bearer test-only');
    return Response.json(handler({method: options.method, ...(options.body ? JSON.parse(options.body) : {})}));
  });
  const env = process.env;
  const vars = {VISITOR_API_URL: 'https://test.workers.dev/visitors', VISITOR_API_TOKEN: 'test-only', VERCEL: '1'};
  const saved = Object.fromEntries(Object.keys(vars).map(key => [key, env[key]]));
  Object.assign(env, vars);
  t.after(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete env[key];
      else env[key] = value;
    }
  });
}

test('requests reject unsupported methods, cross-origin writes and request bodies', async () => {
  assert.equal((await handleVisitorsRequest(request('DELETE'))).status, 405);
  assert.equal((await handleVisitorsRequest(request('POST', {origin: 'https://other.example'}))).status, 403);
  assert.equal((await handleVisitorsRequest(request('POST', {}, 'untrusted'))).status, 400);
});

test('records country and server time, reusing the 30-minute session cookie after reload', async t => {
  const calls = [];
  mockWorker(t, command => {
    calls.push(command);
    return {total: 1, recent: [{...visit, privateField: 'not published'}]};
  });
  const response = await handleVisitorsRequest(request('POST', {'x-vercel-ip-country': 'ID', 'x-forwarded-for': '192.0.2.1'}));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), {total: 1, recent: [visit]});
  const cookie = response.headers.get('set-cookie');
  assert.match(cookie, /^portfolio_visit=[a-f0-9]{32}; HttpOnly; Secure; SameSite=Lax; Path=\/api\/visitors; Max-Age=1800$/);
  assert.equal((await handleVisitorsRequest(request('POST', {cookie: cookie.split(';')[0]}))).headers.get('set-cookie'), null);
  assert.equal(calls[0].method, 'POST');
  assert.match(calls[0].session, /^[a-f0-9]{64}$/);
  assert.equal(calls[0].session, calls[1].session);
  assert.equal(calls[0].country, 'ID');
  assert.equal(calls[1].country, null);
  assert.doesNotMatch(JSON.stringify(calls), /192\.0\.2\.1/);
});

test('read-only and opted-out requests skip recording; storage errors never show fake zero', async t => {
  const calls = [];
  let result = {total: 0, recent: []};
  mockWorker(t, command => { calls.push(command); return result; });
  for (const req of [request(), request('POST', {dnt: '1'}), request('POST', {'sec-gpc': '1'}), request('POST', {'user-agent': 'Googlebot'})]) {
    const response = await handleVisitorsRequest(req);
    assert.deepEqual(await response.json(), {total: 0, recent: []});
    assert.equal(response.headers.get('set-cookie'), null);
  }
  assert.deepEqual(calls.map(command => command.method), ['GET', 'GET', 'GET', 'GET']);
  result = {error: 'backend failure'};
  assert.equal((await handleVisitorsRequest(request())).status, 503);
  delete process.env.VISITOR_API_TOKEN;
  assert.equal((await handleVisitorsRequest(request())).status, 503);
  assert.equal(calls.length, 5);
});

test('untrusted countries and malformed backend data stay unavailable without leaking secrets', async t => {
  let result = {total: 1, recent: [{...visit, country: null}]};
  const calls = [];
  mockWorker(t, command => {calls.push(command); return result;});
  delete process.env.VERCEL;
  assert.equal((await handleVisitorsRequest(request('POST', {'x-vercel-ip-country': 'ID'}))).status, 200);
  assert.equal(calls[0].country, null);
  for (const invalid of [null, {total: null, recent: []}, {total: -1, recent: []}, {total: 0, recent: [visit]}, {total: 1, recent: [null]}, {total: 1, recent: [{...visit, at: null}]}, {total: 21, recent: Array(21).fill(visit)}]) {
    result = invalid;
    const response = await handleVisitorsRequest(request());
    assert.equal(response.status, 503);
    assert.doesNotMatch(await response.text(), /test-only|bad json|workers\.dev/);
  }
  process.env.VISITOR_API_URL = 'https://untrusted.example';
  assert.equal((await handleVisitorsRequest(request())).status, 503);
});

const require = createRequire(import.meta.url);
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const {transformSync} = require('esbuild');
const compiled = transformSync(readFileSync(new URL('../src/VisitorActivity.jsx', import.meta.url), 'utf8'), {loader: 'jsx', format: 'cjs'}).code;
function panelModule(activity) {
  const module = {exports: {}};
  const imports = id => id === 'react' ? {...React, useEffect() {}, useState: () => [activity, () => {}]} : require(id);
  new Function('require', 'module', 'exports', compiled)(imports, module, module.exports);
  return module.exports;
}

test('panel renders anonymous visit, country and date rollover in WIB, inside footer only', () => {
  const panel = panelModule({total: 1, recent: [visit]});
  assert.equal(panel.visitTime(at), '20 Nov 2026, 05:34 WIB');
  assert.equal(panel.visitCountry('ID'), 'Indonesia');
  assert.equal(panel.visitCountry(null), 'Unknown');
  const html = renderToStaticMarkup(React.createElement(panel.VisitorActivity));
  assert.match(html, /<details class="visitor-panel">/);
  assert.match(html, /Anonymous #1/);
  assert.match(html, /<th scope="col">Date &amp; time \(WIB\)<\/th>/);
  assert.match(html, /<time dateTime="2026-11-19T22:34:00.000Z">20 Nov 2026, 05:34 WIB<\/time>/);
  assert.doesNotMatch(html, /<nav/);
  const unavailable = panelModule(null);
  const fallback = renderToStaticMarkup(React.createElement(unavailable.VisitorActivity));
  assert.match(fallback, /Statistics unavailable/);
  assert.doesNotMatch(fallback, /<strong>0<\/strong>/);
  const app = readFileSync(new URL('../src/Replica.jsx', import.meta.url), 'utf8');
  const footer = app.match(/function Footer\(\)\{return (<footer.*?<\/footer>)/)?.[1];
  assert.ok(footer);
  assert.match(footer, /<\/nav><\/div><VisitorActivity\/><div className="copyright">/);
  assert.equal((app.match(/<VisitorActivity\/>/g) || []).length, 1);
  assert.doesNotMatch(app, /<Header\/><VisitorActivity\/>/);
  const css = readFileSync(new URL('../src/visitors.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /\.visitor-panel \+ \.(home-main|page-main)/);
  const rewrites = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url))).rewrites;
  const fallbackRoute = new RegExp('^' + rewrites.at(-1).source + '$');
  assert.equal(fallbackRoute.test('/api/visitors'), false);
  assert.equal(fallbackRoute.test('/work/experience'), true);
});

test('client shares initial request across Strict Mode, retries safely and honors privacy signals', async t => {
  let calls = 0;
  let method;
  let result = {total: 1, recent: [visit]};
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  Object.defineProperty(globalThis, 'navigator', {configurable: true, value: {}});
  t.after(() => Object.defineProperty(globalThis, 'navigator', navigatorDescriptor));
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls++; method = options.method;
    assert.equal(url, '/api/visitors');
    return Response.json(result);
  });
  const panel = panelModule();
  const first = panel.loadVisitorActivity();
  assert.equal(panel.loadVisitorActivity(), first);
  assert.deepEqual(await first, result);
  assert.equal(calls, 1);
  assert.equal(method, 'POST');
  for (const signal of ['doNotTrack', 'globalPrivacyControl']) {
    navigator[signal] = signal === 'doNotTrack' ? '1' : true;
    await panel.loadVisitorActivity(true);
    assert.equal(method, 'GET');
    delete navigator[signal];
  }
  result = {total: 0, recent: [visit]};
  assert.equal(await panel.loadVisitorActivity(true), null);
  result = {total: 1, recent: [null]};
  assert.equal(await panel.loadVisitorActivity(true), null);
  t.mock.method(globalThis, 'fetch', async () => {throw new Error('network unavailable');});
  assert.equal(await panel.loadVisitorActivity(true), null);
});

// SQLite executes the same prepared SQL as D1, with one transaction per batch.
function sqliteBinding(db) {
  return {
    prepare(sql) { return {sql, params: [], bind(...params) { this.params = params; return this; }}; },
    async batch(statements) {
      db.exec('BEGIN');
      try {
        const result = statements.map(({sql, params}) => {
          const stmt = db.prepare(sql);
          return {results: /^SELECT/.test(sql) ? stmt.all(...params) : (stmt.run(...params), [])};
        });
        db.exec('COMMIT'); return result;
      } catch (error) { db.exec('ROLLBACK'); throw error; }
    },
  };
}

test('D1 records atomically, deduplicates sessions, expires after 30 minutes and retains total beyond latest 20', async t => {
  const db = new DatabaseSync(':memory:');
  t.after(() => db.close());
  db.exec(readFileSync(new URL('../cloudflare-visitors/schema.sql', import.meta.url), 'utf8'));
  const env = {API_KEY: 'test-only', DB: sqliteBinding(db)};
  const req = (id, country = 'ID') => new Request('https://test.workers.dev/visitors', {
    method: id ? 'POST' : 'GET', headers: {authorization: 'Bearer test-only'},
    ...(id ? {body: JSON.stringify({session: id.toString(16).padStart(64, '0'), country})} : {}),
  });
  assert.deepEqual(await (await worker.fetch(req(), env)).json(), {total: 0, recent: []});
  await Promise.all(Array.from({length: 10}, () => worker.fetch(req(1), env)));
  assert.equal((await (await worker.fetch(req(), env)).json()).total, 1);
  for (let id = 2; id <= 25; id++) assert.equal((await worker.fetch(req(id), env)).status, 200);
  let data = await (await worker.fetch(req(), env)).json();
  assert.equal(data.total, 25); assert.equal(data.recent.length, 20);
  assert.equal(data.recent[0].visit, 25); assert.equal(data.recent.at(-1).visit, 6);
  assert.match(data.recent[0].at, /T\d{2}:\d{2}:00\.000Z$/);
  assert.deepEqual(Object.keys(data.recent[0]), ['visit', 'country', 'at']);
  db.exec('UPDATE sessions SET expires = 0');
  await worker.fetch(req(1, null), env);
  data = await (await worker.fetch(req(), env)).json();
  assert.equal(data.total, 26); assert.equal(data.recent[0].country, null);
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 1);
  const broken = sqliteBinding(db);
  await assert.rejects(broken.batch([broken.prepare("INSERT INTO visits(country, at) VALUES ('ID', 'test')"), broken.prepare('SELECT * FROM missing_table')]));
  assert.equal((await (await worker.fetch(req(), env)).json()).total, 26);
  assert.equal((await worker.fetch(new Request('https://test.workers.dev/visitors'), env)).status, 401);
  for (const body of ['bad json', JSON.stringify({session: 'x', country: 'ID'}), JSON.stringify({session: 'a'.repeat(64), country: 'ID', ip: '192.0.2.1'})]) {
    assert.equal((await worker.fetch(new Request('https://test.workers.dev/visitors', {method: 'POST', headers: {authorization: 'Bearer test-only'}, body}), env)).status, 400);
  }
  assert.equal((await worker.fetch(req(), {...env, DB: {batch() {throw new Error('database secret');}, prepare(sql) {return sql;}}})).status, 503);
});
