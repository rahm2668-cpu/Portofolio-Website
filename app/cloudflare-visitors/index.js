function json(body, status = 200) {
  return Response.json(body, {status, headers: {'Cache-Control': 'no-store'}});
}

export default {
  async fetch(request, env) {
    if (!env.API_KEY || request.headers.get('authorization') !== `Bearer ${env.API_KEY}`) return json({error: 'Unauthorized'}, 401);
    if (new URL(request.url).pathname !== '/visitors') return json({error: 'Not found'}, 404);
    if (!['GET', 'POST'].includes(request.method)) return json({error: 'Method not allowed'}, 405);
    try {
      const statements = [];
      if (request.method === 'POST') {
        if (Number(request.headers.get('content-length') || 0) > 256) return json({error: 'Invalid visit'}, 400);
        const text = await request.text();
        if (text.length > 256) return json({error: 'Invalid visit'}, 400);
        let data;
        try { data = JSON.parse(text); } catch { return json({error: 'Invalid visit'}, 400); }
        if (!data || !/^[a-f0-9]{64}$/.test(data.session || '')
          || !(data.country === null || /^[A-Z]{2}$/.test(data.country || ''))
          || Object.keys(data).some(key => !['session', 'country'].includes(key))) return json({error: 'Invalid visit'}, 400);
        const now = Date.now();
        const at = new Date(Math.floor(now / 60000) * 60000).toISOString();
        // One D1 transaction: deduplicate before recording; retain the native sequence after pruning.
        statements.push(
          env.DB.prepare('DELETE FROM sessions WHERE expires <= ?').bind(Math.floor(now / 1000)),
          env.DB.prepare('INSERT INTO visits(country, at) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM sessions WHERE session = ?)').bind(data.country, at, data.session),
          env.DB.prepare('INSERT OR IGNORE INTO sessions(session, expires) VALUES (?, ?)').bind(data.session, Math.floor(now / 1000) + 1800),
          env.DB.prepare('DELETE FROM visits WHERE visit NOT IN (SELECT visit FROM visits ORDER BY visit DESC LIMIT 20)'),
        );
      }
      statements.push(
        env.DB.prepare("SELECT COALESCE((SELECT seq FROM sqlite_sequence WHERE name = 'visits'), 0) AS total"),
        env.DB.prepare('SELECT visit, country, at FROM visits ORDER BY visit DESC LIMIT 20'),
      );
      const results = await env.DB.batch(statements);
      return json({total: results.at(-2).results[0].total, recent: results.at(-1).results});
    } catch {
      return json({error: 'Visitor statistics are temporarily unavailable'}, 503);
    }
  },
};
