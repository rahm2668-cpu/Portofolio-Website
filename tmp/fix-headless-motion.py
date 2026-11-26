from pathlib import Path
p=Path('app/src/ui-styles.js');p.write_text('''import {createElement} from 'react';
import {setup,styled} from 'goober';
import {Switch} from '@headlessui/react';
setup(createElement);
// Goober owns the visual states; Headless UI owns switch behavior.
export const PreferenceToggle=styled(Switch)({
  position:'relative',minHeight:'138px',padding:'22px 16px',textAlign:'left',
  border:'1px solid var(--line)',borderRadius:'14px',background:'var(--surface-hover)',color:'var(--text)',
  transition:'border-color .2s,box-shadow .2s',
  '&:hover':{borderColor:'var(--accent)'},
  '&:focus-visible':{outline:'2px solid var(--accent)',outlineOffset:'4px'},
  '&[aria-checked="true"]':{borderColor:'var(--accent)'},
  '&[aria-checked="true"] .preference-switch':{background:'var(--button)'},
  '&[aria-checked="true"] .preference-switch:before':{transform:'translateX(16px)'},
  '@media(prefers-reduced-motion:reduce)':{transition:'none'},
});
''',encoding='utf-8')
p=Path('app/src/ProjectGallery.jsx');s=p.read_text(encoding='utf-8').replace('AnimatePresence,motion,useReducedMotion','AnimatePresence,MotionConfig,motion,useReducedMotion').replace('<DialogPanel as={motion.div} className="image-viewer" data-open','<MotionConfig transition={{duration:reduced?0:.18}}><DialogPanel as={motion.div} className="image-viewer" data-open').replace(' exit={{opacity:0}} transition={{duration:reduced?0:.18}}\n    >',' exit={{opacity:0}}\n    >').replace('    </DialogPanel>\n  </Dialog>','    </DialogPanel></MotionConfig>\n  </Dialog>');p.write_text(s,encoding='utf-8')
