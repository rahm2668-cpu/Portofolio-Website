import {useLayoutEffect,useState} from 'react';

// Enji's header uses x:-32 / opacity:0 with 0.1s staggered entrances.
// Native animations keep content readable when JavaScript or motion is disabled.
export function usePageMotion(focus) {
  useLayoutEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const running = new Set();
    let observer;
    const reveal = (node, delay = 0) => {
      if (preference.matches || !node.isConnected) return;
      const animation = node.animate([
        {opacity: 0, transform: 'translateX(-32px)'},
        {opacity: 1, transform: 'translateX(0)'},
      ], {duration: 650, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards'});
      running.add(animation);
      animation.finished.then(() => running.delete(animation), () => running.delete(animation));
    };
    const stop = () => {
      observer?.disconnect();
      running.forEach(animation => animation.cancel());
      running.clear();
    };
    const start = () => {
      stop();
      if (preference.matches || typeof Element.prototype.animate !== 'function') return;
      document.querySelectorAll('[data-entrance]').forEach(node => {
        reveal(node, Number(node.dataset.entrance) * 100);
      });
      const items = document.querySelectorAll('.page-main section, .project, .timeline-item, .tool, .certificates article, .contact-grid > a, .development-skills li, .footer-grid > *');
      if (!('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        let sequence = 0;
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          reveal(entry.target, sequence++ * 70);
          observer.unobserve(entry.target);
        });
      }, {threshold: .08});
      items.forEach(node => observer.observe(node));
    };
    start();
    preference.addEventListener('change', start);
    return () => {stop(); preference.removeEventListener('change', start);};
  }, []);

  // Focus mode must also disable ambient CSS effects, regardless of OS settings.
  useLayoutEffect(() => {
    document.documentElement.dataset.focus = String(focus);
    return () => {delete document.documentElement.dataset.focus;};
  }, [focus]);
}

export function Portrait() {
  const [ready,setReady] = useState(false);
  return <div className="portrait-stage">
    <div className="portrait-halo"/>
    <div className={'portrait-reveal'+(ready?' is-ready':'')}>
      <svg className="portrait-outline" viewBox="0 0 1165 1350" fill="none" aria-hidden="true">
        <use href="/assets/profile/rahmawan-outline.svg#silhouette"/>
      </svg>
      <img className="portrait" src="/assets/profile/rahmawan-original.png" alt="Portrait of Rahmawan" width="1165" height="1350" fetchPriority="high" onLoad={()=>setReady(true)} onError={()=>setReady(true)}/>
    </div>
    <span className="portrait-caption">RAHMAWAN<span>Management · Administration · Hospitality</span></span>
  </div>;
}
