import React from 'react';

// ponytail: CSS easing replaces spring physics; add a bounded RAF only if spring timing is needed.
function trackFlame(event: React.PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType === 'touch') return;
  const link = event.currentTarget;
  const {left, width} = link.getBoundingClientRect();
  if (!width) return;
  const x = Math.max(0, Math.min(width, event.clientX - left));
  link.style.setProperty('--flame-x', x + 'px');
  link.style.setProperty('--flame-edge', x >= width / 2 ? '88%' : '12%');
  link.style.setProperty('--flame-strength', String(Math.pow(Math.abs(x / width - 0.5) * 2, 1.6)));
}

export function FlameButton({href}: {href: string}) {
  return <a className="flame-button" href={href} target="_blank" rel="noopener noreferrer"
    onPointerEnter={trackFlame} onPointerMove={trackFlame}
    onPointerLeave={event => event.currentTarget.removeAttribute('style')}
    onBlur={event => event.currentTarget.removeAttribute('style')}>
    <span className="flame-button-glow" aria-hidden="true"/>
    <span className="flame-button-face">
      <span>Resume</span>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
    </span>
  </a>;
}
