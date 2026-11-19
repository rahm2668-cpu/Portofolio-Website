import React from 'react';

function trackSpotlight(event) {
  if (event.pointerType === 'touch') return;
  const card = event.currentTarget;
  const {left, top, width, height} = card.getBoundingClientRect();
  if (!width || !height) return;
  card.style.setProperty('--spotlight-x', Math.max(0, Math.min(width, event.clientX - left)) + 'px');
  card.style.setProperty('--spotlight-y', Math.max(0, Math.min(height, event.clientY - top)) + 'px');
}

function resetSpotlight(event) {
  event.currentTarget.style.removeProperty('--spotlight-x');
  event.currentTarget.style.removeProperty('--spotlight-y');
}

export function SpotlightCard({as: Tag = 'article', className = '', children, ...props}) {
  return <Tag {...props} className={'spotlight-card ' + className}
    onPointerEnter={trackSpotlight} onPointerMove={trackSpotlight}
    onPointerLeave={resetSpotlight} onPointerCancel={resetSpotlight}>
    {children}
  </Tag>;
}
