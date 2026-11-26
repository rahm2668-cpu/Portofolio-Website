import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
const targets = await (await fetch('http://127.0.0.1:9231/json/list')).json();
const socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise((resolve, reject) => {socket.addEventListener('open', resolve, {once:true});socket.addEventListener('error',reject,{once:true});});
let next = 0;
const pending = new Map(), errors = [];
socket.addEventListener('message', ({data}) => {
  const event = JSON.parse(data);
  if (event.method === 'Runtime.exceptionThrown') errors.push(event.params.exceptionDetails);
  const callback = pending.get(event.id);
  if (callback) {pending.delete(event.id);event.error ? callback.reject(new Error(JSON.stringify(event.error))) : callback.resolve(event.result);}
});
function send(method, params = {}) {return new Promise((resolve,reject) => {const id=++next;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});
  if(result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));
try {
  await send('Runtime.enable');await send('Page.enable');
  await send('Page.addScriptToEvaluateOnNewDocument',{source:"sessionStorage.setItem('rahmawan-intro-seen','true'); Object.defineProperty(navigator,'doNotTrack',{get:()=> '1'});"});
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:process.argv[2] || 'http://127.0.0.1:4175/'});
  for(let i=0;i<100;i++){if(await evaluate("!!document.querySelector('.doodle-svg')"))break;await sleep(100);}
  await evaluate('document.fonts.ready.then(() => true)');await sleep(3000);
  const results=[];
  for(const width of [1440,768,390]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<500});await sleep(300);
    const layout=await evaluate(`(() => {const svg=document.querySelector('.doodle-svg');const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};return {viewport:innerWidth,scroll:document.documentElement.scrollWidth,svg:rect(svg),heading:rect(svg.closest('h1')),hello:rect(document.querySelector('.hello')),controls:[...svg.querySelectorAll('[role=button]')].map(e=>({name:e.getAttribute('aria-label'),...rect(e)}))};})()`);
    assert.equal(layout.controls.length,6);assert.ok(layout.scroll<=layout.viewport,JSON.stringify(layout));
    for(const control of layout.controls)assert.ok(control.x>=0 && control.right<=layout.viewport,JSON.stringify(control));
    const screenshot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
    writeFileSync('C:/Users/Pongo/.codex/visualizations/2026/11/19/01a1f2f9-5ce4-73d1-b8c8-c0d5e0ed6e4c/doodle-'+width+'.png',Buffer.from(screenshot.data,'base64'));
    results.push(layout);
  }
  await evaluate("document.querySelectorAll('.dcf-hit')[3].focus()");
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  assert.match(await evaluate("document.querySelector('.dcf-bubble')?.textContent || ''"),/Best seat/);
  const bubble=await evaluate("(() => {const r=document.querySelector('.dcf-bubble').getBoundingClientRect();return {left:r.left,right:r.right,top:r.top};})()");
  assert.ok(bubble.left>=0 && bubble.right<=390 && bubble.top>=72,JSON.stringify(bubble));
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  assert.equal(await evaluate("!!document.querySelector('.dcf-bubble')"),false);
  await evaluate("document.querySelector('.doodle-svg').dispatchEvent(new PointerEvent('pointermove',{clientX:200,clientY:190,pointerType:'mouse'}))");await sleep(50);
  assert.ok(await evaluate("!!document.querySelector('[data-gaze]').getAttribute('transform')"));
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await sleep(100);
  assert.equal(await evaluate("document.querySelector('[data-gaze]').getAttribute('transform')"),null);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.dcf-letter')).animationName"),'none');
  await send('Emulation.setEmulatedMedia',{features:[]});
  await evaluate("document.documentElement.dataset.focus='true'");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.dcf-hit')).display"),'none');
  await evaluate("document.documentElement.dataset.focus='false';scrollTo(0,document.body.scrollHeight)");await sleep(250);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.dcf-bob')).animationPlayState"),'paused');
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({ok:true,results,bubble,exceptions:errors},null,2));
} finally {socket.close();}
