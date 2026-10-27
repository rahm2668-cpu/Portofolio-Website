import {site,pages} from '../site.config.mjs';

const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const validGtmId=value=>/^GTM-[A-Z0-9]+$/.test(value||'');

export function renderPageHtml(html,{pathname='/',production=false,gtmId=site.gtmId}={}){
  const clean=new URL(pathname,'http://local').pathname.replace(/\/$/,'')||'/';
  const route=Object.hasOwn(pages,clean)?clean:'/';
  const page=pages[route],canonical=site.origin+(route==='/'?'/':route),image=site.origin+site.image;
  const preload=route==='/'?'<link rel="preload" as="image" href="/assets/profile/rahmawan-original.png" fetchpriority="high" />':route==='/projects'?'<link rel="preload" as="image" href="/assets/projects/sapatamu-dashboard.png" fetchpriority="high" />':'';
  const metadata=`<title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Rahmawan — front-end developer and personal portfolio" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(page.title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${image}" />
    ${preload}`;
  const enabled=production&&validGtmId(gtmId);
  const tracking=enabled?`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.fetchPriority='low';j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>`:'';
  const fallback=enabled?`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>`:'';
  return html
    .replace(/<!-- portfolio:head:start -->[\s\S]*?<!-- portfolio:head:end -->/,`<!-- portfolio:head:start -->\n${tracking}\n${metadata}\n<!-- portfolio:head:end -->`)
    .replace(/<!-- portfolio:body:start -->[\s\S]*?<!-- portfolio:body:end -->/,`<!-- portfolio:body:start -->${fallback}<!-- portfolio:body:end -->`);
}
