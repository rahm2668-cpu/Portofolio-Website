import React, {useEffect, useState} from 'react';

function shouldShowIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return localStorage.getItem('rahmawan-focus') !== 'true'
      && sessionStorage.getItem('rahmawan-intro-seen') !== 'true';
  } catch {
    return true;
  }
}

export function WelcomeIntro({children}) {
  const [show, setShow] = useState(shouldShowIntro);
  function finish() {
    try { sessionStorage.setItem('rahmawan-intro-seen', 'true'); } catch { /* Storage can be disabled. */ }
    setShow(false);
  }

  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(finish, 6000);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = event => { if (event.matches) finish(); };
    const onKeyDown = event => { if (event.key === 'Escape') finish(); };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    motion.addEventListener('change', onMotionChange);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
      motion.removeEventListener('change', onMotionChange);
    };
  }, [show]);

  if (!show) return children;
  return <main className="welcome-intro" aria-labelledby="welcome-title">
    <svg className="welcome-paths" viewBox="0 0 1440 900" fill="none" aria-hidden="true" focusable="false">
      {Array.from({length: 22}, (_, index) => <path key={index}
        d="M720 450C540 210 120 80 120 450S540 690 720 450S1320 80 1320 450S900 690 720 450"
        pathLength="100" style={{'--path-index': index}}
        transform={`translate(720 450) scale(${1 + index * .033} ${1 + index * .055}) translate(-720 -450)`}/>)}
    </svg>
    <div className="welcome-panel">
      <h1 id="welcome-title"><span>Welcome to</span>{' '}<strong>My Portfolio</strong></h1>
      <div className="welcome-line" aria-hidden="true"/>
    </div>
    <button className="welcome-skip" onClick={finish}>Skip intro <span aria-hidden="true">&rarr;</span></button>
  </main>;
}
