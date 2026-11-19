import React, {useEffect, useState} from 'react';

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Jakarta', day: '2-digit', month: 'short', year: 'numeric',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});
const regions = new Intl.DisplayNames(['en'], {type: 'region'});
export function visitTime(at) { return dateFormat.format(new Date(at)) + ' WIB'; }
export function visitCountry(code) { return code ? regions.of(code) || 'Unknown' : 'Unknown'; }

// Share the first request across Strict Mode effect replays; the server also deduplicates reloads.
let activityRequest;
export function loadVisitorActivity(retry = false) {
  if (retry) activityRequest = undefined;
  if (!activityRequest) {
    const optOut = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
    activityRequest = fetch('/api/visitors', {
      method: optOut ? 'GET' : 'POST', credentials: 'same-origin', cache: 'no-store',
      headers: {Accept: 'application/json'}, signal: AbortSignal.timeout(8000),
    }).then(async response => {
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error();
      const data = await response.json();
      if (!Number.isSafeInteger(data.total) || data.total < 0 || !Array.isArray(data.recent)
        || data.recent.length > 20 || data.recent.some(item => !Number.isSafeInteger(item.visit)
          || item.visit < 1 || item.visit > data.total
          || !(item.country === null || /^[A-Z]{2}$/.test(item.country))
          || typeof item.at !== 'string' || !Number.isFinite(Date.parse(item.at)))) throw new Error();
      return data;
    }).catch(() => null);
  }
  return activityRequest;
}

export function VisitorActivity() {
  const [activity, setActivity] = useState(undefined);
  useEffect(() => {
    let active = true;
    loadVisitorActivity().then(data => { if (active) setActivity(data); });
    return () => { active = false; };
  }, []);
  async function retry() {
    setActivity(undefined);
    setActivity(await loadVisitorActivity(true));
  }
  const latest = activity?.recent[0];
  const status = activity === undefined ? 'Loading statistics...' : activity === null ? 'Statistics unavailable' : 'No visits recorded yet';
  return <details className="visitor-panel">
    <summary>
      <span className="visitor-heading"><span>Visitor activity</span><span className="visitor-subtitle">Anonymous visits around the world</span></span>
      <span className="visitor-total"><strong>{activity ? activity.total.toLocaleString('en-GB') : '\u2014'}</strong><span>Recorded visits</span></span>
      <span className="visitor-latest">{latest ? <><span>Latest visit from {visitCountry(latest.country)}</span><time dateTime={latest.at}>{visitTime(latest.at)}</time></> : <span role="status">{status}</span>}</span>
      <span className="visitor-chevron" aria-hidden="true"/>
    </summary>
    <div className="visitor-content">
      {activity?.excluded === true && <p className="visitor-note">This browser is excluded from visit counting.</p>}
      <p className="visitor-note">Anonymous sessions, not unique people. Reloads within 30 minutes count once when cookies are allowed. Country is approximate; times use WIB (UTC+7).</p>
      {activity === null ? <div className="visitor-empty"><p>Visit statistics are not connected or temporarily unavailable. No estimated numbers are shown.</p><button type="button" onClick={retry}>Try again</button></div>
        : activity === undefined ? <p className="visitor-empty" role="status">Loading visit statistics...</p>
        : activity.recent.length === 0 ? <p className="visitor-empty">Visits will appear here after recording starts.</p>
        : <div className="visitor-table-scroll" role="region" aria-label="Recent visitor activity" tabIndex="0"><table>
          <caption>Latest {activity.recent.length} recorded visits</caption>
          <thead><tr><th scope="col">Visitor</th><th scope="col">From</th><th scope="col">Date &amp; time (WIB)</th></tr></thead>
          <tbody>{activity.recent.map(visit => <tr key={visit.visit}><th scope="row">Anonymous #{visit.visit}</th><td>{visitCountry(visit.country)}</td><td><time dateTime={visit.at}>{visitTime(visit.at)}</time></td></tr>)}</tbody>
        </table></div>}
      <p className="visitor-privacy">Public log: latest 20 visits, country and minute only. No names, IP addresses or precise location stored. Do Not Track and Global Privacy Control are respected.</p>
    </div>
  </details>;
}
