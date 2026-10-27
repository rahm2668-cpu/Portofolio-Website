import {createElement} from 'react';
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
