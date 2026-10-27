import test from 'node:test';
import assert from 'node:assert/strict';
import {renderPageHtml,validGtmId} from '../scripts/page-head.mjs';
import {pages} from '../site.config.mjs';
import {readFileSync} from 'node:fs';

const template='<head><!-- portfolio:head:start --><!-- portfolio:head:end --></head><body><!-- portfolio:body:start --><!-- portfolio:body:end --></body>';
test('social metadata is present in raw HTML for every public route',()=>{
  for(const [route,page] of Object.entries(pages)){
    const html=renderPageHtml(template,{pathname:route});
    assert.ok(html.includes(page.title.replaceAll('&','&amp;')));
    assert.ok(html.includes('property="og:url" content="https://portofolio-website-sigma-liart.vercel.app'+(route==='/'?'/':route)+'"'));
    assert.match(html,/og:image" content="https:\/\/.+\.jpg/);
    assert.match(html,/twitter:card" content="summary_large_image/);
    assert.doesNotMatch(html,/googletagmanager\.com/);
  }
});
test('GTM is production-only, validates IDs, and is inserted once',()=>{
  assert.equal(validGtmId("GTM-X';alert(1)//"),false);
  assert.doesNotMatch(renderPageHtml(template,{production:true,gtmId:'invalid'}),/googletagmanager/);
  const html=renderPageHtml(template,{production:true});
  assert.match(html,/GTM-PJB889NW/);
  assert.match(html,/j\.async=true/);
  assert.match(html,/<noscript><iframe/);
  const again=renderPageHtml(html,{pathname:'/projects',production:true});
  assert.equal((again.match(/gtm\.start/g)||[]).length,1);
  assert.equal((again.match(/property="og:title"/g)||[]).length,1);
});
test('critical image priority is route-specific',()=>{
  assert.match(renderPageHtml(template),/rel="preload" as="image" href="\/assets\/profile\/rahmawan-original\.png" fetchpriority="high"/);
  const projects=renderPageHtml(template,{pathname:'/projects/'});
  assert.match(projects,/sapatamu-dashboard\.png/);
  assert.doesNotMatch(projects,/as="image" href="\/assets\/profile/);
  assert.doesNotMatch(renderPageHtml(template,{pathname:'/work/contact'}),/as="image"/);
});
test('production pages and the social image are ready for crawlers',()=>{
  const root=new URL('../dist/client/',import.meta.url);
  for(const route of Object.keys(pages)){
    const html=readFileSync(new URL((route==='/'?'':route.slice(1)+'/')+'index.html',root),'utf8');
    assert.match(html,/gtm\.js\?id=/);
    assert.match(html,/GTM-PJB889NW/);
    assert.equal((html.match(/property="og:title"/g)||[]).length,1);
    assert.ok(html.includes(pages[route].title.replaceAll('&','&amp;')));
    assert.match(html,/<script[^>]+type="module"[^>]+src="\/assets\//);
  }
  const image=readFileSync(new URL('assets/social/rahmawan-og.jpg',root));
  assert.equal(image.subarray(0,3).toString('hex'),'ffd8ff');
  assert.ok(image.length>10000);
});
