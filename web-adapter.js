(()=>{'use strict';
const config=window.__PINRENPIN_WEB__={apiBase:'https://pinrenpin-connect-20261106.adalynr460.chatgpt.site',routes:{home:'首页',emotions:'拼情绪',custom:'名字与贺卡',gallery:'120款模板图集',template:'精细模板改名',imagine:'照原款AI改名',free:'自由画面生图',remix:'上传照片二创',convert:'图片转拼豆',compare:'转换引擎对比',calendar:'拼吗哪',history:'吗哪记录',music:'纯音乐',pattern:'图纸与材料清单',edit:'手动编辑图纸',poster:'推广海报与文案',library:'我的图纸',fonts:'19套字体',handwriting:'手写DIY',borders:'边框组合',engines:'引擎与厂家色卡',business:'副业工具',profile:'个人中心',agent:'主理人名片',words:'词库管理',backup:'完整资料备份',settings:'Agnes设置',tutorial:'Agnes教程',diagnostics:'本机检查',about:'关于与说明'}};
let session;try{session=sessionStorage.getItem('pinrenpin-web-session');}catch{}
if(!/^[a-f0-9]{64}$/.test(session||'')){session=Array.from(crypto.getRandomValues(new Uint8Array(32)),n=>n.toString(16).padStart(2,'0')).join('');try{sessionStorage.setItem('pinrenpin-web-session',session);}catch{}}
const original=window.fetch.bind(window);
window.fetch=function(input,options){const request=input instanceof Request?input:null,u=new URL(request?request.url:String(input),location.href);let path='';
if(u.origin===location.origin&&u.pathname.startsWith('/api/agnes/'))path=u.pathname+u.search;
if(u.protocol==='https:'&&['platform-outputs.agnes-ai.space'].includes(u.hostname))path='/api/agnes/image?url='+encodeURIComponent(u.href);
if(!path)return original(input,options);
const init={...(request?{method:request.method,body:['GET','HEAD'].includes(request.method)?undefined:request.body,signal:request.signal}:{}),...options},headers=new Headers(options?.headers||request?.headers);
headers.set('X-Douyu-Bridge','v2');headers.set('X-Pinrenpin-Session',session);
return original(config.apiBase+path,{...init,headers,mode:'cors',credentials:'omit'});
};
addEventListener('DOMContentLoaded',()=>{
const style=document.createElement('style');style.textContent='.preview-directory{position:fixed;right:12px;top:74px;z-index:150;border:1px solid #b95745;border-radius:22px;background:#f5f5f0ed;color:#9d493a;padding:8px 12px;font:13px system-ui;box-shadow:0 2px 10px #36363012}.preview-routes{position:fixed;inset:0;z-index:10000;overflow:auto;background:#f5f5f0;padding:22px;box-sizing:border-box}.preview-routes[hidden]{display:none}.preview-routes h2{font:24px serif;color:#363630}.preview-routes p{font:14px/1.6 system-ui;color:#77776d}.preview-routes nav{display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:9px}.preview-routes button{padding:14px 10px;border:1px solid #cccbbf;background:transparent;color:#363630;font:15px system-ui;text-align:left}.preview-routes .preview-close{float:right;border:0;color:#b95745}.preview-routes a{color:#b95745}';document.head.append(style);
style.textContent+='body[data-pinrenpin-route="edit"] .preview-directory{position:absolute;top:74px}';
const trigger=document.createElement('button');trigger.className='preview-directory';trigger.textContent='全部界面';trigger.setAttribute('aria-label','浏览全部30个界面');document.body.append(trigger);
const panel=document.createElement('section');panel.className='preview-routes';panel.hidden=true;panel.setAttribute('aria-label','全部界面目录');
const close=document.createElement('button');close.className='preview-close';close.textContent='返回应用 ×';close.onclick=()=>{panel.hidden=true;trigger.focus();};panel.append(close);
const title=document.createElement('h2');title.textContent='每一页，都可以看。';panel.append(title);
const note=document.createElement('p');note.textContent='这是完整网页版。选择下方页面，直接进入对应功能。作品和设置保存在当前浏览器；Agnes云端接入暂缓，所有页面、图集、字体和本地工具完整保留。';panel.append(note);
const nav=document.createElement('nav');for(const [route,label]of Object.entries(config.routes)){const b=document.createElement('button');b.textContent=label;b.onclick=async()=>{if(!window.PinrenpinWebUI){note.textContent='正在载入完整资源，请稍候再点。';return;}try{await window.PinrenpinWebUI.open(route);panel.hidden=true;}catch(e){note.textContent=e.message;}};nav.append(b);}panel.append(nav);document.body.append(panel);
trigger.onclick=()=>{panel.hidden=false;close.focus();};
const ready=setInterval(()=>{if(!window.PinrenpinWebUI)return;clearInterval(ready);const route=new URLSearchParams(location.search).get('page');if(route&&config.routes[route])window.PinrenpinWebUI.open(route).catch(()=>{});},300);
});
})();
