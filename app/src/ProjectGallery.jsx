import {useEffect,useId,useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';

function ImageViewer({project,index,move,onClose,opener}) {
  const dialog=useRef(null);
  const titleId=useId();
  const reduced=useReducedMotion();
  const [file,label]=project.slides[index];
  useEffect(()=>{
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const node=dialog.current;
    node.showModal();
    return ()=>{node.close();document.body.style.overflow=previousOverflow;opener?.focus({preventScroll:true});};
  },[opener]);
  return <motion.dialog ref={dialog} className="image-viewer" aria-labelledby={titleId}
    initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.18}}
    onCancel={event=>{event.preventDefault();onClose();}}
    onClick={event=>{if(event.target===event.currentTarget)onClose();}}
    onKeyDown={event=>{event.stopPropagation();if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}}}>
    <div className="viewer-header"><h2 id={titleId}>{project.title}</h2><button autoFocus onClick={onClose} aria-label="Close image viewer">×</button></div>
    <div className="viewer-image" onClick={event=>{if(event.target===event.currentTarget)onClose();}}>
      <AnimatePresence initial={false} mode="wait"><motion.img key={file} src={'/assets/projects/'+file} alt={label+' — '+project.title}
        initial={{opacity:0,scale:reduced?1:.985}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:reduced?0:.18}}/></AnimatePresence>
    </div>
    <div className="viewer-footer"><p aria-live="polite">{label}</p><div className="gallery-controls"><motion.button whileTap={{scale:reduced?1:.94}} onClick={()=>move(-1)} aria-label="Previous enlarged image">←</motion.button><span>{index+1} / {project.slides.length}</span><motion.button whileTap={{scale:reduced?1:.94}} onClick={()=>move(1)} aria-label="Next enlarged image">→</motion.button></div></div>
  </motion.dialog>;
}

export function Gallery({project}) {
  const [index,setIndex]=useState(0),[expanded,setExpanded]=useState(false);
  const start=useRef(null),swiped=useRef(false);
  const opener=useRef(null);
  const reduced=useReducedMotion();
  const total=project.slides.length;
  const move=delta=>setIndex(i=>(i+delta+total)%total);
  const [file,label]=project.slides[index];
  return <>
    <div className="project-gallery" role="region" aria-roledescription="carousel" aria-label={project.title+' screenshots'} tabIndex="0"
      onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}}}
      onTouchStart={event=>{start.current=event.touches[0].clientX;swiped.current=false;}}
      onTouchEnd={event=>{if(start.current===null)return;const delta=event.changedTouches[0].clientX-start.current;swiped.current=Math.abs(delta)>40;if(swiped.current)move(delta<0?1:-1);start.current=null;}}>
      <div className="gallery-frame" style={project.imageAspectRatio?{aspectRatio:project.imageAspectRatio}:undefined}>
        <button className="gallery-expand" aria-label={'Enlarge screenshot — '+project.title} onClick={event=>{if(!swiped.current){opener.current=event.currentTarget;setExpanded(true);}}}>
          <AnimatePresence initial={false} mode="wait"><motion.img key={file} src={'/assets/projects/'+file} alt={label+' — '+project.title} width="1280" height="720" loading="lazy"
            initial={{opacity:0,x:reduced?0:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:reduced?0:-10}} transition={{duration:reduced?0:.18}}/></AnimatePresence>
          <span className="gallery-zoom" aria-hidden="true">Expand image ↗</span>
        </button>
      </div>
      <div className="gallery-toolbar"><p aria-live="polite">{label}</p><div className="gallery-controls"><motion.button whileTap={{scale:reduced?1:.94}} onClick={()=>move(-1)} aria-label={'Previous screenshot — '+project.title}>←</motion.button><span>{index+1} / {total}</span><motion.button whileTap={{scale:reduced?1:.94}} onClick={()=>move(1)} aria-label={'Next screenshot — '+project.title}>→</motion.button></div></div>
      <div className="gallery-dots" aria-label="Choose screenshot">{project.slides.map(([slide,caption],i)=><button key={slide} aria-label={caption} aria-current={i===index?'true':undefined} onClick={()=>setIndex(i)}/>)}</div>
    </div>
    <AnimatePresence>{expanded&&<ImageViewer project={project} index={index} move={move} opener={opener.current} onClose={()=>setExpanded(false)}/>}</AnimatePresence>
  </>;
}
