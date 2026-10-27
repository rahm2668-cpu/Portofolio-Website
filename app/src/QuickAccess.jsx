import {createContext,useContext} from 'react';
import {Dialog,DialogPanel,DialogTitle} from '@headlessui/react';
import {PreferenceToggle} from './ui-styles';
export const Preferences=createContext(null);
export const usePreferences=()=>useContext(Preferences);
export function QuickAccess(){
 const {dark,setDark,focus,setFocus,setQuick}=usePreferences();
 return <Dialog open onClose={()=>setQuick(false)} className="quick-root"><div className="quick-backdrop"><DialogPanel as="section" className="quick-panel"><button data-autofocus className="quick-close" aria-label="Close Quick Access" onClick={()=>setQuick(false)}>×</button><p className="eyebrow">Quick Access</p><DialogTitle as="h2" id="quick-title">Action Center</DialogTitle><div className="quick-toggles"><PreferenceToggle checked={dark} onChange={setDark} aria-label="Dark Mode"><span className="toggle-name">Dark Mode</span><span className="toggle-status">{dark?'On':'Off'}</span><span className="preference-switch" aria-hidden="true"/></PreferenceToggle><PreferenceToggle checked={focus} onChange={setFocus} aria-label="Focus"><span className="toggle-name">Focus</span><span className="toggle-status">{focus?'On':'Off'}</span><span className="preference-switch" aria-hidden="true"/></PreferenceToggle></div><p className="focus-explanation">Focus keeps the page content in view and hides decorative imagery and the footer.</p><nav aria-label="Quick navigation"><h3>Explore</h3>{[['Projects','/projects'],['Skills & Tools','/work/skills-and-tools'],['Experience','/work/experience'],['Contact','/work/contact']].map(([label,url])=><a href={url} key={url}>{label}<span aria-hidden="true">↗</span></a>)}</nav><p className="quick-shortcuts"><kbd>Q</kbd> Quick Access <span>·</span> <kbd>Esc</kbd> Close</p></DialogPanel></div></Dialog>;
}
