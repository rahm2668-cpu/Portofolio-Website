import {createHash, randomBytes} from 'node:crypto';

function json(body, status = 200, headers = {}) {
  return Response.json(body, {status, headers: {'Cache-Control': 'no-store', ...headers}});
}

export async function handleVisitorsRequest(request) {
  if (!['GET', 'POST'].includes(request.method)) {
    return json({error: 'Method not allowed'}, 405, {Allow: 'GET, POST'});
  }
  if (request.method === 'POST' && request.headers.get('origin') !== new URL(request.url).origin) {
    return json({error: 'Cross-origin recording is not allowed'}, 403);
  }
  if (request.body) return json({error: 'Request body is not supported'}, 400);

  const url = process.env.VISITOR_API_URL;
  const token = process.env.VISITOR_API_TOKEN;
  if (!url || !token) return json({error: 'Visitor statistics are not connected yet'}, 503);
  let endpoint;
  try {
    endpoint = new URL(url);
    if (endpoint.protocol !== 'https:' || !endpoint.hostname.endsWith('.workers.dev') || endpoint.username || endpoint.password) throw new Error();
  } catch {
    return json({error: 'Visitor storage configuration is invalid'}, 503);
  }

  const optOut = request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1';
  const bot = /bot|crawler|spider|headless|preview|curl|wget/i.test(request.headers.get('user-agent') || '');
  const record = request.method === 'POST' && !optOut && !bot;
  const saved = /(?:^|;\s*)portfolio_visit=([a-f0-9]{32})(?:;|$)/.exec(request.headers.get('cookie') || '')?.[1];
  const session = saved || randomBytes(16).toString('hex');
  const code = process.env.VERCEL === '1' ? request.headers.get('x-vercel-ip-country') : null;
  const country = /^[A-Z]{2}$/.test(code || '') ? code : null;
  try {
    const response = await fetch(endpoint, {
      method: record ? 'POST' : 'GET',
      headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      signal: AbortSignal.timeout(5000),
      redirect: 'error',
      ...(record ? {body: JSON.stringify({session: createHash('sha256').update(session).digest('hex'), country})} : {}),
    });
    if (!response.ok) throw new Error();
    const data = await response.json();
    const {total} = data;
    if (!Number.isSafeInteger(total) || total < 0 || !Array.isArray(data.recent) || data.recent.length > 20) throw new Error();
    const recent = data.recent.map(({visit, country, at}) => ({visit, country, at}));
    if (recent.some(item => !Number.isSafeInteger(item.visit) || item.visit < 1 || item.visit > total
      || !(item.country === null || /^[A-Z]{2}$/.test(item.country))
      || typeof item.at !== 'string' || !Number.isFinite(Date.parse(item.at)))) throw new Error();
    const headers = record && !saved ? {'Set-Cookie': `portfolio_visit=${session}; HttpOnly; Secure; SameSite=Lax; Path=/api/visitors; Max-Age=1800`} : {};
    return json({total, recent}, 200, headers);
  } catch {
    return json({error: 'Visitor statistics are temporarily unavailable'}, 503);
  }
}

export default {fetch: handleVisitorsRequest};
