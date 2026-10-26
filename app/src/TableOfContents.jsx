import {useEffect,useLayoutEffect,useRef,useState} from 'react';

// Based on enji.dev's TableOfContents: sticky card, scroll-spy highlight,
// and a scroll-to-top control entering from x:16 after 200px of scrolling.
export function TableOfContents({items}) {
  const [active,setActive] = useState(items[0]?.id);
  const [scrolled,setScrolled] = useState(false);
  const [open,setOpen] = useState(false);
  const [marker,setMarker] = useState({top:0,height:0});
  const list = useRef(null);

  const goToSection = (event,id) => {
    if(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target=document.getElementById(id);
    if(!target) return;
    event.preventDefault();
    setActive(id);
    if(matchMedia('(max-width: 1023px)').matches) setOpen(false);
    if(location.hash!=='#'+id) history.pushState(null,'','#'+id);
    // Move focus without the browser's implicit centering, then scroll after
    // the mobile menu collapses so keyboard and pointer navigation agree.
    requestAnimationFrame(()=>{
      target.focus({preventScroll:true});
      target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
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
