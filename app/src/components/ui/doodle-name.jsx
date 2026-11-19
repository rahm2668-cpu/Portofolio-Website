import React from 'react';

// Original Doodle Crew Footer artwork and seating; only wordmark scale and palette adapt.
const artwork = {
  yeti: {
    k: 1,
    box: {
      l: -72,
      r: 60,
      t: -140,
      b: 6
    },
    seat: "front",
    eyes: [{
      x: -15,
      y: -86,
      r: 8,
      pupil: 3.6,
      max: 3.6
    }, {
      x: 13,
      y: -88,
      r: 8,
      pupil: 3.6,
      max: 3.6
    }],
    body: m => <>{<ellipse className="dcf-shadow" cx="0" cy="2" rx="54" ry="5" />}{<path d="M-40 -92 C-62 -92 -70 -76 -68 -56 L-66 -30 C-64 -18 -54 -16 -44 -20 Z" />}{<path d="M-40 -92 C-62 -92 -70 -76 -68 -56 L-66 -30 C-64 -18 -54 -16 -44 -20 Z" fill={m} stroke="none" />}{<path className="n" d="M-67 -64 C-58 -59 -50 -59 -43 -64" />}{<path d="M-30 -104 C-40 -112 -44 -124 -40 -138 C-32 -129 -22 -122 -13 -114 Z" />}{<path d="M18 -114 C26 -124 36 -130 47 -133 C45 -120 41 -110 32 -101 Z" />}{<path className="n" d="M-38 -124 L-28 -119 M39 -125 L33 -116" />}{<path d="M-44 -2 C-54 -28 -54 -66 -42 -90 C-32 -110 -14 -118 2 -118 C22 -118 40 -108 48 -88 C58 -64 58 -28 48 -2 C30 4 -26 4 -44 -2 Z" />}{<path d="M40 -96 C54 -66 54 -30 46 -4 C40 -2 34 -1 30 0 C40 -30 42 -64 33 -101 Z" fill={m} stroke="none" />}{<path className="n" d="M-7 -117 C-5 -126 1 -128 3 -120 C5 -127 11 -126 11 -116" />}{<path className="n thin" d="M-14 -24 l-3 4 M8 -40 l3 4 M14 -46 l3 3 M20 -30 l3 3" />}{<path className="n" d="M-48 -62 C-22 -50 10 -32 49 -26 M-50 -52 C-24 -40 8 -22 49 -16" />}{<rect x="-12" y="-46" width="15" height="13" rx="2.5" transform="rotate(26 -4.5 -39.5)" />}{<path d="M-46 -60 C-62 -50 -63 -29 -51 -19 C-45 -15 -38 -19 -40 -28 C-43 -36 -40 -46 -36 -52" />}{<path d="M46 -58 C61 -46 61 -26 51 -18 C45 -14 38 -18 40 -26 C43 -34 41 -44 37 -50" />}{<path d="M-37 -2 C-41 -14 -23 -19 -16 -7 C-14 0 -26 4 -37 -2 Z" />}{<path d="M37 -2 C41 -14 23 -19 16 -7 C14 0 26 4 37 -2 Z" />}{<path className="n thin" d="M-30 -4 l1 -4 M-24 -3 l1 -4 M30 -4 l-1 -4 M24 -3 l-1 -4" />}{<path className="n" d="M-23 -98 L-9 -96 M6 -98 L20 -100" />}{<path className="n" d="M-12 -70 C-6 -64 6 -64 12 -71" />}{<path d="M3 -66.5 L5.5 -60 L8 -67.5 Z" />}</>
  },
  kid: {
    k: 1.28,
    box: {
      l: -30,
      r: 30,
      t: -88,
      b: 42
    },
    seat: "top",
    eyes: [{
      x: -6,
      y: -58,
      r: 0,
      pupil: 2.5,
      max: 1.8
    }, {
      x: 6.5,
      y: -58,
      r: 0,
      pupil: 2.5,
      max: 1.8
    }],
    body: m => <>{<path d="M-15 -6 L-3 -6 C-3 8 -5 20 -6 30 L-15 30 C-15 18 -16 6 -15 -6 Z" />}{<path d="M3 -6 L15 -6 C17 6 19 16 22 27 L12 30 C10 18 6 6 3 -6 Z" />}{<path d="M3 -6 L15 -6 C17 6 19 16 22 27 L12 30 C10 18 6 6 3 -6 Z" fill={m} stroke="none" />}{<path className="k" d="M-17 30 C-20 34 -20 40 -14 41 L-2 41 C2 40 0 34 -5 30 Z" />}{<path className="k" d="M11 29 C8 34 10 40 16 40 L26 38 C29 36 27 30 22 27 Z" />}{<path d="M-20 -4 C-22 -20 -18 -38 -10 -44 L10 -44 C18 -38 22 -20 20 -4 Z" />}{<path className="n thick" d="M-19.5 -14 L19.5 -14 M-18.5 -26 L18.5 -26 M-14 -36 L14 -36" />}{<path className="n" d="M-18 -36 C-28 -28 -30 -14 -26 -5" />}{<circle cx="-26" cy="-3" r="4" />}{<path className="n" d="M18 -36 C27 -30 30 -18 28 -7" />}{<circle cx="28" cy="-4" r="4" />}{<circle cx="-17" cy="-58" r="4" />}{<circle cx="17" cy="-58" r="4" />}{<circle cx="0" cy="-60" r="17" />}{<path className="n thin" d="M-11 -52 l2 -2 M-8 -52 l2 -2 M8 -52 l2 -2 M11 -52 l2 -2" />}{<path className="n" d="M-5 -50 C-2 -47 2 -47 5 -50" />}{<path d="M-15 -70 C-14 -87 14 -87 15 -70 Z" />}{<path d="M-27 -68 C-16 -75 16 -75 27 -68 C18 -63 -18 -63 -27 -68 Z" />}{<path className="n thick" d="M-14.5 -74 C-6 -77 6 -77 14.5 -74" />}</>
  },
  bird: {
    k: 1.22,
    box: {
      l: -34,
      r: 30,
      t: -62,
      b: 2
    },
    seat: "top",
    eyes: [{
      x: 3,
      y: -30,
      r: 4.6,
      pupil: 2.3,
      max: 2
    }, {
      x: 12,
      y: -31,
      r: 4.6,
      pupil: 2.3,
      max: 2
    }],
    idle: "dcf-peck",
    body: m => <>{<path className="n" d="M-5 0 L-5 -7 M-9 0 L-1 0 M5 0 L5 -7 M1 0 L9 0" />}{<path d="M-17 -16 C-26 -18 -31 -14 -33 -9 C-26 -10 -20 -8 -15 -10 Z" />}{<path d="M-18 -14 C-20 -30 -10 -40 2 -40 C16 -40 22 -28 20 -16 C18 -6 8 -4 0 -4 C-10 -4 -17 -8 -18 -14 Z" />}{<path d="M-11 -25 C-3 -26 1 -18 -3 -13 C-9 -12 -15 -17 -11 -25 Z" fill={m} />}{<path className="o" d="M19 -30 L29 -27 L19 -23 Z" />}{<path className="a" d="M-3 -38 L4 -59 L12 -37 Z" />}{<path className="n thin" d="M-1 -44 L10 -46 M1 -51 L8 -52" />}{<circle cx="4" cy="-60" r="2.8" />}</>
  },
  cat: {
    k: 1.06,
    box: {
      l: -30,
      r: 52,
      t: -110,
      b: 4
    },
    seat: "front",
    eyes: [{
      x: 10,
      y: -76,
      r: 6,
      pupil: 2.8,
      max: 2.6
    }],
    body: m => <>{<ellipse className="dcf-shadow" cx="4" cy="2" rx="32" ry="4" />}{<g className="dcf-tail">{<path d="M18 -4 C42 -4 52 -24 46 -44 C44 -51 36 -53 34 -46 C40 -30 34 -16 16 -14 Z" />}{<path className="n thin" d="M40 -16 l5 4 M45 -30 l6 1 M43 -42 l6 -3" />}</g>}{<path d="M-22 0 C-28 -18 -24 -42 -14 -52 L14 -52 C24 -42 28 -18 22 0 C10 3 -10 3 -22 0 Z" />}{<path d="M14 -46 C24 -36 26 -16 22 0 C18 1 14 2 12 2 C16 -14 16 -32 10 -46 Z" fill={m} stroke="none" />}{<path className="n" d="M-8 -30 L-9 -1 M8 -30 L9 -1" />}{<path d="M-16 1 C-16 -5 -3 -5 -3 1 Z M3 1 C3 -5 16 -5 16 1 Z" />}{<path className="a" d="M-18 -55 C-6 -49 6 -49 18 -55 L17 -46 C6 -40 -6 -40 -17 -46 Z" />}{<path className="a" d="M9 -45 L18 -32 L6 -37 Z" />}{<path d="M-22 -86 L-25 -107 L-7 -96 Z" />}{<path d="M8 -96 L23 -108 L22 -86 Z" />}{<path className="n thin" d="M-20 -92 L-21 -101 M18 -101 L18 -92" />}{<path d="M-26 -70 C-28 -88 -16 -98 0 -98 C16 -98 28 -88 26 -70 C24 -56 12 -50 0 -50 C-12 -50 -24 -56 -26 -70 Z" />}{<path className="n thin" d="M-4 -97 L-3 -90 M3 -97 L3 -91" />}{<path className="n" d="M-26 -80 C-14 -83 4 -87 25 -93" />}{<ellipse className="k" cx="-10" cy="-76" rx="7.5" ry="6.5" />}{<path className="k" d="M-2.5 -68 L2.5 -68 L0 -64.5 Z" />}{<path className="n" d="M0 -64.5 C-1 -60.5 -5 -60.5 -6 -62.5 M0 -64.5 C1 -60.5 5 -60.5 6 -62.5" />}{<path className="n thin" d="M-15 -66 L-29 -68 M-15 -63 L-28 -59 M15 -66 L29 -68 M15 -63 L28 -59" />}</>
  },
  ghost: {
    k: 1.3,
    box: {
      l: -26,
      r: 26,
      t: -70,
      b: 0
    },
    seat: "behind",
    eyes: [{
      x: -8,
      y: -44,
      r: 6.5,
      pupil: 3.2,
      max: 3
    }, {
      x: 9,
      y: -44,
      r: 6.5,
      pupil: 3.2,
      max: 3
    }],
    idle: "dcf-bob",
    body: m => <>{<path d="M-23 -14 L-23 -40 C-23 -59 -12 -67 0 -67 C12 -67 23 -59 23 -40 L23 -14 C12 -10 -12 -10 -23 -14 Z" />}{<path d="M13 -61 C21 -54 23 -46 23 -36 L23 -15 L15 -13 L15 -36 C15 -46 15 -54 13 -61 Z" fill={m} stroke="none" />}{<path className="n thin" d="M-16 -56 C-12 -61 -6 -63 -2 -63" />}{<path className="k" d="M-5 -33 C-3 -27 4 -27 6 -33 Z" />}{<path className="n thin" d="M-17 -35 l3 -2 M-14 -34 l3 -2 M14 -35 l3 -2 M17 -34 l3 -2" />}</>,
    front: () => <>{<path d="M-25 -32 C-27 -38 -21 -42 -17 -38 C-15 -42 -10 -41 -10 -36 L-11 -30 C-15 -28 -22 -28 -25 -32 Z" />}{<path d="M25 -32 C27 -38 21 -42 17 -38 C15 -42 10 -41 10 -36 L11 -30 C15 -28 22 -28 25 -32 Z" />}</>
  },
  mushroom: {
    k: 1.12,
    box: {
      l: -27,
      r: 27,
      t: -56,
      b: 4
    },
    seat: "front",
    eyes: [{
      x: -4.5,
      y: -16,
      r: 0,
      pupil: 1.9,
      max: 1.3
    }, {
      x: 4.5,
      y: -16,
      r: 0,
      pupil: 1.9,
      max: 1.3
    }],
    idle: "dcf-sway",
    body: m => <>{<ellipse className="dcf-shadow" cx="0" cy="2" rx="18" ry="3" />}{<path className="n" d="M-10 -15 L-17 -9 M10 -15 L17 -11" />}{<path d="M-10 0 C-12 -10 -10 -22 -8 -28 L8 -28 C10 -22 12 -10 10 0 C4 2 -4 2 -10 0 Z" />}{<path d="M5 -27 C9 -20 11 -10 10 0 C8 1 6 1.5 4 1.5 C6 -8 6 -18 2 -27 Z" fill={m} stroke="none" />}{<path className="r" d="M-25 -28 C-27 -45 -12 -55 0 -55 C12 -55 27 -45 25 -28 C14 -23 -14 -23 -25 -28 Z" />}{<circle cx="-12" cy="-40" r="4.2" />}{<circle cx="6" cy="-46" r="3.4" />}{<circle cx="15" cy="-34" r="3" />}{<circle cx="-2" cy="-33" r="2.4" />}{<path className="n" d="M-2 -10 C-1 -8 1 -8 2 -10" />}</>
  }
};
const crew = [{ kind: "yeti", letter: 0, seat: "front", offset: -0.32, name: "Bruno", says: "Hungry. Got snacks?" }, { kind: "bird", letter: 1, seat: "top", offset: 0.02, name: "Pip", says: "Tweet us! Seriously." }, { kind: "mushroom", letter: 2, seat: "front", offset: 0.12, scale: 0.95, name: "Morel", says: "I'm a fun guy." }, { kind: "kid", letter: 4, seat: "top", offset: -0.05, name: "Juno", says: "Up here! Best seat in the house." }, { kind: "ghost", letter: 6, seat: "behind", offset: 0, name: "Boo", says: "Boo! \u2026sorry. Hi." }, { kind: "cat", letter: 7, seat: "front", offset: 0.42, flip: true, name: "Patch", says: "Arr. Nice cursor." }];
const word = 'Rahmawan';
const fontSize = 200;
const fontFamily = "'__Plus_Jakarta_Sans_e12b3c', sans-serif";

function trackGaze(svg) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pupils = [...svg.querySelectorAll('[data-gaze]')].map(pupil => [pupil, ...pupil.dataset.gaze.split(' ').map(Number)]);
  let frame = 0;
  let clientX, clientY;
  const enabled = () => !motion.matches && document.documentElement.dataset.focus !== 'true';
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    for (const [pupil] of pupils) pupil.removeAttribute('transform');
  };
  const move = event => {
    if (event.pointerType === 'touch' || !enabled()) return;
    clientX = event.clientX;
    clientY = event.clientY;
    // Update pupils once per frame without re-rendering the full artwork.
    if (!frame) frame = requestAnimationFrame(() => {
      frame = 0;
      if (!enabled()) return;
      const bounds = svg.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const view = svg.viewBox.baseVal;
      const x = (clientX - bounds.left) / bounds.width * view.width;
      const y = (clientY - bounds.top) / bounds.height * view.height + view.y;
      for (const [pupil, eyeX, eyeY, max, direction] of pupils) {
        const dx = x - eyeX, dy = y - eyeY;
        const gaze = max / Math.max(120, Math.hypot(dx, dy));
        pupil.setAttribute('transform', 'translate(' + dx * gaze * direction + ' ' + dy * gaze + ')');
      }
    });
  };
  svg.addEventListener('pointermove', move, {passive: true});
  svg.addEventListener('pointerleave', reset);
  svg.addEventListener('pointercancel', reset);
  motion.addEventListener('change', reset);
  return () => {
    reset();
    svg.removeEventListener('pointermove', move);
    svg.removeEventListener('pointerleave', reset);
    svg.removeEventListener('pointercancel', reset);
    motion.removeEventListener('change', reset);
  };
}

export function DoodleName() {
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [metrics, setMetrics] = React.useState({widths: [150, 128, 140, 202, 128, 184, 128, 140], cap: 146});
  const [active, setActive] = React.useState(-1);
  const svg = React.useRef(null);
  React.useEffect(() => {
    let mounted = true;
    const measure = () => {
      if (!mounted) return;
      const context = document.createElement('canvas').getContext('2d');
      if (!context) return;
      context.font = '900 ' + fontSize + 'px ' + fontFamily;
      const widths = [...word].map(letter => context.measureText(letter).width);
      setMetrics({widths, cap: context.measureText(word).actualBoundingBoxAscent || 146});
    };
    measure();
    document.fonts?.ready.then(measure);
    return () => { mounted = false; };
  }, []);
  React.useEffect(() => trackGaze(svg.current), [metrics]);
  React.useEffect(() => {
    const element = svg.current;
    const observer = new IntersectionObserver(([entry]) => element.toggleAttribute('data-offscreen', !entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  React.useEffect(() => {
    if (active < 0) return;
    const timer = setTimeout(() => setActive(-1), 3200);
    return () => clearTimeout(timer);
  }, [active]);
  const positions = [];
  let width = 0;
  metrics.widths.forEach((advance, index) => {
    positions.push(width);
    width += advance - (index < word.length - 1 ? 10 : 0);
  });
  const members = crew.map((member, index) => {
    const art = artwork[member.kind];
    const scale = metrics.cap / 144 * art.k * (member.scale ?? 1);
    return {...member, art, index, scale,
      x: positions[member.letter] + metrics.widths[member.letter] * (.5 + member.offset),
      y: member.seat === 'top' ? -metrics.cap : member.seat === 'behind' ? -metrics.cap + 30 * scale : 0};
  });
  function renderMember(member, part = 'body') {
    const {art, index, x, y, scale, seat, flip} = member;
    return <g key={index + part} className="doodle-crew" transform={'translate(' + x + ' ' + y + ') scale(' + (flip ? -scale : scale) + ' ' + scale + ')'} aria-hidden="true">
      <g className={'dcf-arrive dcf-arrive-' + seat} style={{'--d': 1140 + index * 130 + 'ms'}}>
        <g className={'dcf-art ' + (art.idle || '')}>
          {part === 'front' ? art.front() : <>
            {art.body('url(#' + id + '-hatch)')}
            {art.eyes.map((eye, eyeIndex) => <g key={eyeIndex}>
              {eye.r > 0 && <circle cx={eye.x} cy={eye.y} r={eye.r}/>}
              <circle className="k" cx={eye.x} cy={eye.y} r={eye.pupil}
                data-gaze={[x + eye.x * scale * (flip ? -1 : 1), y + eye.y * scale, eye.max, flip ? -1 : 1].join(' ')}/>
            </g>)}
          </>}
        </g>
      </g>
    </g>;
  }
  const selected = members[active];
  return <strong className="doodle-name" style={{width: width / fontSize + 'em'}} onKeyDown={event => {
    if (event.key === 'Escape') setActive(-1);
  }} onBlur={event => {if (!event.currentTarget.contains(event.relatedTarget)) setActive(-1);}}>
    <svg ref={svg} className="doodle-svg" viewBox={'0 ' + -metrics.cap + ' ' + width + ' ' + metrics.cap}
      style={{height: metrics.cap / fontSize + 'em'}} role="group" aria-label="Rahmawan doodle crew">
      <defs>
        <pattern id={id + '-hatch'} width="4.6" height="4.6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <line x1="0" y1="0" x2="0" y2="4.6" stroke="var(--dcf-ink)" strokeWidth="1.25"/>
        </pattern>
        <filter id={id + '-ink'} x="-4%" y="-6%" width="108%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="11" result="edge"/>
          <feDisplacementMap in="SourceGraphic" in2="edge" scale="5" xChannelSelector="R" yChannelSelector="G" result="rough"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.32" numOctaves="2" seed="4" result="streak"/>
          <feColorMatrix in="streak" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -16 5.6" result="streakA"/>
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="1" seed="9" result="speck"/>
          <feColorMatrix in="speck" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -24 7.0" result="speckA"/>
          <feComposite in="streakA" in2="speckA" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="holes"/>
          <feComposite in="rough" in2="holes" operator="out"/>
        </filter>
      </defs>
      {members.filter(member => member.seat === 'behind').map(member => renderMember(member))}
      <g className="doodle-letters" aria-hidden="true">
        {[...word].map((letter, index) => <g key={index} className="dcf-letter" style={{'--d': 160 + index * 80 + 'ms', '--r': (index % 2 ? 4 : -4) + 'deg'}}>
          <g className="dcf-glyph"><text x={positions[index]} y="0" fontSize={fontSize} fontWeight="900" fontFamily={fontFamily} filter={'url(#' + id + '-ink)'}>{letter}</text></g>
          <path className="dcf-dust" d={'M' + (positions[index] - 6) + ' -6 l-16 -6 M' + (positions[index] - 4) + ' -16 l-12 -12 M' + (positions[index] + metrics.widths[index] + 6) + ' -6 l16 -6'}/>
        </g>)}
      </g>
      {members.filter(member => member.seat === 'behind').map(member => renderMember(member, 'front'))}
      {members.filter(member => member.seat !== 'behind').map(member => renderMember(member))}
      {members.map(member => {
        const {art, x, y, scale, flip, index} = member;
        const left = flip ? -art.box.r : art.box.l;
        return <rect key={index} className="dcf-hit doodle-crew-control" x={x + left * scale} y={y + art.box.t * scale}
          width={(art.box.r - art.box.l) * scale} height={((member.seat === 'behind' ? -30 : art.box.b) - art.box.t) * scale}
          rx="12" role="button" tabIndex={0} aria-label={member.name + ': ' + member.says} aria-pressed={active === index}
          onClick={() => setActive(active === index ? -1 : index)} onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {event.preventDefault(); setActive(active === index ? -1 : index);}
          }}/>;
      })}
    </svg>
    <span className="dcf-bubbles" aria-live="polite" aria-atomic="true">
      {selected && <span className={'dcf-bubble' + (selected.x > width * .72 ? ' is-left' : '')}
        style={{'--bubble-x': selected.x / width * 100 + '%', top: (selected.y + selected.art.box.t * selected.scale - 6 + metrics.cap) / metrics.cap * 100 + '%'}}>{selected.says}</span>}
    </span>
  </strong>;
}
