import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import {animate} from 'motion/mini';

// Based on enji.dev's TableOfContents: sticky card, scroll-spy highlight,
// and a scroll-to-top control entering from x:16 after 200px of scrolling.
export function TableOfContents({items}) {
  const [active,setActive] = useState(items[0]?.id);
  const [scrolled,setScrolled] = useState(false);
  const [open,setOpen] = useState(false);
  const [marker,setMarker] = useState({top:0,height:0});
  const list = useRef(null);
  const flash = useRef({frame:0,timer:0,animation:null,label:null});

  const clearFlash = () => {
    cancelAnimationFrame(flash.current.frame);
    clearTimeout(flash.current.timer);
    flash.current.animation?.cancel();
    flash.current.label?.classList.remove('toc-arrival');
    if(flash.current.label) delete flash.current.label.dataset.tocArriving;
    flash.current={frame:0,timer:0,animation:null,label:null};
  };
  useEffect(()=>()=>clearFlash(),[]);

  const highlightArrival = target => {
    const label=target.matches('h2,h3')?target:target.querySelector('h2,h3');
    if(!label || !target.isConnected) return;
    flash.current.label=label;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    let previous=Infinity,stable=0;
    const deadline=performance.now()+1800;
    const arrive=()=>{
      const top=target.getBoundingClientRect().top;
      stable=Math.abs(top-previous)<.5?stable+1:0;
      previous=top;
      if(!reduced&&stable<6&&performance.now()<deadline){flash.current.frame=requestAnimationFrame(arrive);return;}
      if(reduced){
        label.classList.add('toc-arrival');
        label.dataset.tocArriving='true';
        flash.current.timer=setTimeout(()=>{label.classList.remove('toc-arrival');delete label.dataset.tocArriving;},1600);
        return;
      }
      const style=getComputedStyle(label),root=getComputedStyle(document.documentElement);
      const surface=root.getPropertyValue('--surface-hover').trim();
      const accent=root.getPropertyValue('--accent').trim();
      label.dataset.tocArriving='true';
      const animation=animate(label,{
        transform:['translateX(-24px) scale(.97)','translateX(4px) scale(1.018)','translateX(0px) scale(1)','translateX(0px) scale(1)'],
        opacity:[.5,1,1,1],
        color:[accent,accent,accent,style.color],
        textShadow:['0 0 0px transparent',`0 0 20px ${accent}`,`0 0 8px ${accent}`,'0 0 0px transparent'],
        backgroundColor:[surface,surface,surface,style.backgroundColor],
        boxShadow:[`0 0 0 7px ${surface}`,`0 0 0 7px ${surface}`,`0 0 0 4px ${surface}`,'0 0 0 0px transparent'],
      },{duration:1.8,times:[0,.32,.52,1],ease:[.16,1,.3,1]});
      flash.current.animation=animation;
      Promise.resolve(animation).then(()=>{if(flash.current.animation===animation){animation.cancel();delete label.dataset.tocArriving;flash.current.animation=null;}});
    };
    flash.current.frame=requestAnimationFrame(arrive);
  };

  const goToSection = (event,id) => {
    if(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target=document.getElementById(id);
    if(!target) return;
    clearFlash();
    event.preventDefault();
    setActive(id);
    if(matchMedia('(max-width: 1023px)').matches) setOpen(false);
    if(location.hash!=='#'+id) history.pushState(null,'','#'+id);
    // Move focus without the browser's implicit centering, then scroll after
    // the mobile menu collapses so keyboard and pointer navigation agree.
    flash.current.frame=requestAnimationFrame(()=>{
      target.focus({preventScroll:true});
      target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
      highlightArrival(target);
    });
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const targets = items.map(item => ({...item,node:document.getElementById(item.id)})).filter(item=>item.node);
      let current = targets[0]?.id;
      targets.forEach(item => {if(item.node.getBoundingClientRect().top <= 136) current=item.id;});
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 8) current=targets.at(-1)?.id;
      setActive(current);
      setScrolled(scrollY > 200);
    };
    const schedule = () => {if(!frame) frame=requestAnimationFrame(update);};
    update();
    addEventListener('scroll',schedule,{passive:true});
    addEventListener('resize',schedule);
    addEventListener('hashchange',schedule);
    const observer = typeof ResizeObserver==='function' ? new ResizeObserver(schedule) : null;
    observer?.observe(document.querySelector('main'));
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll',schedule);
      removeEventListener('resize',schedule);
      removeEventListener('hashchange',schedule);
      observer?.disconnect();
    };
  },[items]);

  useLayoutEffect(() => {
    const measure = () => {
      const link=list.current?.querySelector('[aria-current="location"]');
      if(link) setMarker({top:link.parentElement.offsetTop,height:link.offsetHeight});
    };
    measure();
    const observer = typeof ResizeObserver==='function' ? new ResizeObserver(measure) : null;
    if(list.current) observer?.observe(list.current);
    return () => observer?.disconnect();
  },[active,open]);

  return <nav className="toc-card" aria-label="Page table of contents" data-entrance="3">
    <div className="toc-header">
      <h2>Table of Contents</h2>
      <a className={'toc-top'+(scrolled?' is-visible':'')} href="#main-content" tabIndex={scrolled?0:-1} aria-hidden={!scrolled} onClick={()=>{window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});requestAnimationFrame(()=>document.querySelector('main h1')?.focus({preventScroll:true}));}}>scroll to top</a>
      <button className="toc-toggle" aria-expanded={open} aria-controls="page-contents-list" aria-label={open?'Collapse table of contents':'Expand table of contents'} onClick={()=>setOpen(value=>!value)}><span aria-hidden="true">{open?'−':'+'}</span></button>
    </div>
    <div id="page-contents-list" className={'toc-body'+(open?' is-open':'')}>
      <ol className="toc-list" ref={list}>
        <li className="toc-marker" role="presentation" aria-hidden="true" style={{transform:`translateY(${marker.top}px)`,height:marker.height,opacity:marker.height?1:0}}/>
        {items.map(item=><li key={item.id}>
          <a className={'toc-link'+(item.depth===2?' toc-link-sub':'')} href={'#'+item.id} aria-current={active===item.id?'location':undefined} onClick={event=>goToSection(event,item.id)}>{item.title}</a>
        </li>)}
      </ol>
    </div>
  </nav>;
}

export function WithContents({items,children}) {
  return <div className="contents-layout"><div className="contents-main">{children}</div><aside className="contents-aside"><TableOfContents items={items}/></aside></div>;
}
