import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(new URL('../app/package.json',import.meta.url));
const {parseExpression}=require('@babel/parser');
const generate=require('@babel/generator').default;
const t=require('@babel/types');
const source=fs.readFileSync(new URL('./doodle-excerpt.js',import.meta.url),'utf8');
const art=parseExpression(source.slice(source.indexOf('Sh = {')+5,source.indexOf(', Rd = c(')));
function convert(node){
 if(Array.isArray(node))return node.map(convert);
 if(!node||typeof node!=='object')return node;
 if(t.isCallExpression(node)&&t.isIdentifier(node.callee,{name:'c'}))return convert(node.arguments[0]);
 if(t.isCallExpression(node)&&t.isMemberExpression(node.callee)&&t.isIdentifier(node.callee.object,{name:'o'})){
  const [tag,props]=node.arguments;
  const fragment=t.isMemberExpression(tag);
  const name=fragment?null:t.jsxIdentifier(tag.value);
  const attrs=[],children=[];
  for(const prop of props.properties){
   const key=prop.key.name||prop.key.value;
   if(key==='children'){
    const values=t.isArrayExpression(prop.value)?prop.value.elements:[prop.value];
    for(const value of values)children.push(t.jsxExpressionContainer(convert(value)));
   }else attrs.push(t.jsxAttribute(t.jsxIdentifier(key),t.isStringLiteral(prop.value)?prop.value:t.jsxExpressionContainer(convert(prop.value))));
  }
  if(fragment)return t.jsxFragment(t.jsxOpeningFragment(),t.jsxClosingFragment(),children);
  return t.jsxElement(t.jsxOpeningElement(name,attrs,children.length===0),children.length?t.jsxClosingElement(name):null,children);
 }
 for(const key of Object.keys(node))if(key!=='loc'&&key!=='extra')node[key]=convert(node[key]);
 return node;
}
const artCode=generate(convert(art),{jsescOption:{minimal:false}}).code;
const crewStart=source.indexOf('gh = [')+5;
const crewCode=source.slice(crewStart,source.indexOf('], bh =',crewStart)+1);
const header=`import React from 'react';

// Original Doodle Crew Footer artwork and seating; only wordmark scale and palette adapt.
const artwork = ${artCode};
const crew = ${crewCode};
const word = 'Rahmawan';
const fontSize = 200;
const fontFamily = "'__Plus_Jakarta_Sans_e12b3c', sans-serif";

`;
const component=String.raw`export function DoodleName() {
  const id = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [metrics, setMetrics] = React.useState({widths: [150, 128, 140, 202, 128, 184, 128, 140], cap: 146});
  const [active, setActive] = React.useState(-1);
  const [pointer, setPointer] = React.useState(null);
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
            {art.eyes.map((eye, eyeIndex) => {
              const dx = pointer ? pointer.x - x - eye.x * scale : 0;
              const dy = pointer ? pointer.y - y - eye.y * scale : 0;
              const distance = Math.hypot(dx, dy);
              const gaze = distance ? eye.max * Math.min(1, distance / 120) / distance : 0;
              return <g key={eyeIndex}>
                {eye.r > 0 && <circle cx={eye.x} cy={eye.y} r={eye.r}/>}
                <circle className="k" cx={eye.x + dx * gaze * (flip ? -1 : 1)} cy={eye.y + dy * gaze} r={eye.pupil}/>
              </g>;
            })}
          </>}
        </g>
      </g>
    </g>;
  }
  const selected = members[active];
  return <strong className="doodle-name" style={{width: width / fontSize + 'em'}} onKeyDown={event => {
    if (event.key === 'Escape') setActive(-1);
  }} onBlur={event => {if (!event.currentTarget.contains(event.relatedTarget)) setActive(-1);}}>
    <svg className="doodle-svg" viewBox={'0 ' + -metrics.cap + ' ' + width + ' ' + metrics.cap}
      style={{height: metrics.cap / fontSize + 'em'}} role="group" aria-label="Rahmawan doodle crew"
      onPointerMove={event => {
        if (event.pointerType === 'touch' || document.documentElement.dataset.focus === 'true' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer({x: (event.clientX - bounds.left) / bounds.width * width, y: (event.clientY - bounds.top) / bounds.height * metrics.cap - metrics.cap});
      }} onPointerLeave={() => setPointer(null)}>
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
`;
fs.writeFileSync(new URL('../app/src/components/ui/doodle-name.jsx',import.meta.url),header+component);
