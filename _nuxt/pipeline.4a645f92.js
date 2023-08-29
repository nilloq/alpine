import{ah as K,af as C,m as L,az as U,aA as $,aB as E,aC as Y,aD as N,aE as D,aF as _,aG as j,aH as W}from"./entry.468f75ec.js";const B="memory",se=()=>{const r=new Map;return{name:B,options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function T(r){return!r||typeof r.then!="function"?Promise.resolve(r):r}function g(r,...t){try{return T(r(...t))}catch(n){return Promise.reject(n)}}function J(r){const t=typeof r;return r===null||t!=="object"&&t!=="function"}function H(r){const t=Object.getPrototypeOf(r);return!t||t.isPrototypeOf(Object)}function S(r){if(J(r))return String(r);if(H(r)||Array.isArray(r))return JSON.stringify(r);if(typeof r.toJSON=="function")return S(r.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function x(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const R="base64:";function G(r){if(typeof r=="string")return r;x();const t=Buffer.from(r).toString("base64");return R+t}function q(r){return typeof r!="string"||!r.startsWith(R)?r:(x(),Buffer.from(r.slice(R.length),"base64"))}const Z=["hasItem","getItem","getItemRaw","setItem","setItemRaw","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function oe(r,t){if(t=A(t),!t)return r;const n={...r};for(const s of Z)n[s]=(f="",...l)=>r[s](t+f,...l);return n.getKeys=(s="",...f)=>r.getKeys(t+s,...f).then(l=>l.map(c=>c.slice(t.length))),n}function d(r){return r?r.split("?")[0].replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function F(...r){return d(r.join(":"))}function A(r){return r=d(r),r?r+":":""}const k="memory",b=()=>{const r=new Map;return{name:k,options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function ue(r={}){const t={mounts:{"":r.driver||b()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},n=e=>{for(const i of t.mountpoints)if(e.startsWith(i))return{base:i,relativeKey:e.slice(i.length),driver:t.mounts[i]};return{base:"",relativeKey:e,driver:t.mounts[""]}},s=(e,i)=>t.mountpoints.filter(a=>a.startsWith(e)||i&&e.startsWith(a)).map(a=>({relativeBase:e.length>a.length?e.slice(a.length):void 0,mountpoint:a,driver:t.mounts[a]})),f=(e,i)=>{if(t.watching){i=d(i);for(const a of t.watchListeners)a(e,i)}},l=async()=>{if(!t.watching){t.watching=!0;for(const e in t.mounts)t.unwatch[e]=await P(t.mounts[e],f,e)}},c=async()=>{if(t.watching){for(const e in t.unwatch)await t.unwatch[e]();t.unwatch={},t.watching=!1}},h=(e,i,a)=>{const o=new Map,u=m=>{let y=o.get(m.base);return y||(y={driver:m.driver,base:m.base,items:[]},o.set(m.base,y)),y};for(const m of e){const y=typeof m=="string",v=d(y?m:m.key),w=y?void 0:m.value,I=y||!m.options?i:{...i,...m.options},O=n(v);u(O).items.push({key:v,value:w,relativeKey:O.relativeKey,options:I})}return Promise.all([...o.values()].map(m=>a(m))).then(m=>m.flat())},p={hasItem(e,i={}){e=d(e);const{relativeKey:a,driver:o}=n(e);return g(o.hasItem,a,i)},getItem(e,i={}){e=d(e);const{relativeKey:a,driver:o}=n(e);return g(o.getItem,a,i).then(u=>K(u))},getItems(e,i){return h(e,i,a=>a.driver.getItems?g(a.driver.getItems,a.items.map(o=>({key:o.relativeKey,options:o.options})),i).then(o=>o.map(u=>({key:F(a.base,u.key),value:K(u.value)}))):Promise.all(a.items.map(o=>g(a.driver.getItem,o.relativeKey,o.options).then(u=>({key:o.key,value:K(u)})))))},getItemRaw(e,i={}){e=d(e);const{relativeKey:a,driver:o}=n(e);return o.getItemRaw?g(o.getItemRaw,a,i):g(o.getItem,a,i).then(u=>q(u))},async setItem(e,i,a={}){if(i===void 0)return p.removeItem(e);e=d(e);const{relativeKey:o,driver:u}=n(e);u.setItem&&(await g(u.setItem,o,S(i),a),u.watch||f("update",e))},async setItems(e,i){await h(e,i,async a=>{a.driver.setItems&&await g(a.driver.setItems,a.items.map(o=>({key:o.relativeKey,value:S(o.value),options:o.options})),i),a.driver.setItem&&await Promise.all(a.items.map(o=>g(a.driver.setItem,o.relativeKey,S(o.value),o.options)))})},async setItemRaw(e,i,a={}){if(i===void 0)return p.removeItem(e,a);e=d(e);const{relativeKey:o,driver:u}=n(e);if(u.setItemRaw)await g(u.setItemRaw,o,i,a);else if(u.setItem)await g(u.setItem,o,G(i),a);else return;u.watch||f("update",e)},async removeItem(e,i={}){typeof i=="boolean"&&(i={removeMeta:i}),e=d(e);const{relativeKey:a,driver:o}=n(e);o.removeItem&&(await g(o.removeItem,a,i),(i.removeMeta||i.removeMata)&&await g(o.removeItem,a+"$",i),o.watch||f("remove",e))},async getMeta(e,i={}){typeof i=="boolean"&&(i={nativeOnly:i}),e=d(e);const{relativeKey:a,driver:o}=n(e),u=Object.create(null);if(o.getMeta&&Object.assign(u,await g(o.getMeta,a,i)),!i.nativeOnly){const m=await g(o.getItem,a+"$",i).then(y=>K(y));m&&typeof m=="object"&&(typeof m.atime=="string"&&(m.atime=new Date(m.atime)),typeof m.mtime=="string"&&(m.mtime=new Date(m.mtime)),Object.assign(u,m))}return u},setMeta(e,i,a={}){return this.setItem(e+"$",i,a)},removeMeta(e,i={}){return this.removeItem(e+"$",i)},async getKeys(e,i={}){e=A(e);const a=s(e,!0);let o=[];const u=[];for(const m of a){const v=(await g(m.driver.getKeys,m.relativeBase,i)).map(w=>m.mountpoint+d(w)).filter(w=>!o.some(I=>w.startsWith(I)));u.push(...v),o=[m.mountpoint,...o.filter(w=>!w.startsWith(m.mountpoint))]}return e?u.filter(m=>m.startsWith(e)&&!m.endsWith("$")):u.filter(m=>!m.endsWith("$"))},async clear(e,i={}){e=A(e),await Promise.all(s(e,!1).map(async a=>{if(a.driver.clear)return g(a.driver.clear,a.relativeBase,i);if(a.driver.removeItem){const o=await a.driver.getKeys(a.relativeBase||"",i);return Promise.all(o.map(u=>a.driver.removeItem(u,i)))}}))},async dispose(){await Promise.all(Object.values(t.mounts).map(e=>M(e)))},async watch(e){return await l(),t.watchListeners.push(e),async()=>{t.watchListeners=t.watchListeners.filter(i=>i!==e),t.watchListeners.length===0&&await c()}},async unwatch(){t.watchListeners=[],await c()},mount(e,i){if(e=A(e),e&&t.mounts[e])throw new Error(`already mounted at ${e}`);return e&&(t.mountpoints.push(e),t.mountpoints.sort((a,o)=>o.length-a.length)),t.mounts[e]=i,t.watching&&Promise.resolve(P(i,f,e)).then(a=>{t.unwatch[e]=a}).catch(console.error),p},async unmount(e,i=!0){e=A(e),!(!e||!t.mounts[e])&&(t.watching&&e in t.unwatch&&(t.unwatch[e](),delete t.unwatch[e]),i&&await M(t.mounts[e]),t.mountpoints=t.mountpoints.filter(a=>a!==e),delete t.mounts[e])},getMount(e=""){e=d(e)+":";const i=n(e);return{driver:i.driver,base:i.base}},getMounts(e="",i={}){return e=d(e),s(e,i.parents).map(o=>({driver:o.driver,base:o.mountpoint}))}};return p}function P(r,t,n){return r.watch?r.watch((s,f)=>t(s,n+f)):()=>{}}async function M(r){typeof r.dispose=="function"&&await g(r.dispose)}var V=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},X={exports:{}};(function(r,t){(function(n,s,f){r.exports=f(),r.exports.default=f()})("slugify",V,function(){var n=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`),s=JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');function f(l,c){if(typeof l!="string")throw new Error("slugify: string argument expected");c=typeof c=="string"?{replacement:c}:c||{};var h=s[c.locale]||{},p=c.replacement===void 0?"-":c.replacement,e=c.trim===void 0?!0:c.trim,i=l.normalize().split("").reduce(function(a,o){var u=h[o];return u===void 0&&(u=n[o]),u===void 0&&(u=o),u===p&&(u=" "),a+u.replace(c.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")},"");return c.strict&&(i=i.replace(/[^A-Za-z0-9\s]/g,"")),e&&(i=i.trim()),i=i.replace(/\s+/g,p),c.lower&&(i=i.toLowerCase()),i}return f.extend=function(l){Object.assign(n,l)},f})})(X);const Q=r=>r.split(/[\s-]/g).map(C).join(" ");function ce(r,t){const{navigation:n}=L().public.content,s=l=>({...te(["title",...n.fields])(l),...re(l==null?void 0:l.navigation)?l.navigation:{}}),f=r.sort((l,c)=>l._path.localeCompare(c._path)).reduce((l,c)=>{const h=c._path.substring(1).split("/"),p=c._id.split(":").slice(1),e=!!p[p.length-1].match(/([1-9][0-9]*\.)?index.md/g),i=u=>({title:u.title,_path:u._path,_file:u._file,children:[],...s(u),...u._draft?{_draft:!0}:{}}),a=i(c);if(e){const u=t[a._path];if(typeof(u==null?void 0:u.navigation)<"u"&&!(u!=null&&u.navigation))return l;if(c._path!=="/"){const m=i(c);a.children.push(m)}Object.assign(a,s(u))}return h.length===1?(l.push(a),l):(h.slice(0,-1).reduce((u,m,y)=>{const v="/"+h.slice(0,y+1).join("/"),w=t[v];if(typeof(w==null?void 0:w.navigation)<"u"&&!w.navigation)return[];let I=u.find(O=>O._path===v);return I||(I={title:Q(m),_path:v,_file:c._file,children:[],...s(w)},u.push(I)),I.children},l).push(a),l)},[]);return z(f)}const ee=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function z(r){var n;const t=r.sort((s,f)=>ee.compare(s._file,f._file));for(const s of t)(n=s.children)!=null&&n.length?z(s.children):delete s.children,delete s._file;return r}function te(r){return t=>(t=t||{},r&&r.length?r.filter(n=>typeof t[n]<"u").reduce((n,s)=>Object.assign(n,{[s]:t[s]}),{}):t)}function re(r){return Object.prototype.toString.call(r)==="[object Object]"}function ne(r={}){const t=ie(n,r.operators);function n(s,f){return typeof f!="object"||f instanceof RegExp?t.$eq(s,f):Object.keys(f||{}).every(l=>{const c=f[l];if(l.startsWith("$")&&t[l]){const h=t[l];return typeof h=="function"?h(s,c):!1}return n(U(s,l),c)})}return n}function ie(r,t={}){return{$match:(n,s)=>r(n,s),$eq:(n,s)=>s instanceof RegExp?s.test(n):n===s,$ne:(n,s)=>s instanceof RegExp?!s.test(n):n!==s,$not:(n,s)=>!r(n,s),$and:(n,s)=>($(s,"$and requires an array as condition"),s.every(f=>r(n,f))),$or:(n,s)=>($(s,"$or requires an array as condition"),s.some(f=>r(n,f))),$in:(n,s)=>E(s).some(f=>Array.isArray(n)?r(n,{$contains:f}):r(n,f)),$contains:(n,s)=>(n=Array.isArray(n)?n:String(n),E(s).every(f=>n.includes(f))),$icontains:(n,s)=>{if(typeof s!="string")throw new TypeError("$icontains requires a string, use $contains instead");return n=String(n).toLocaleLowerCase(),E(s).every(f=>n.includes(f.toLocaleLowerCase()))},$containsAny:(n,s)=>($(s,"$containsAny requires an array as condition"),n=Array.isArray(n)?n:String(n),s.some(f=>n.includes(f))),$exists:(n,s)=>s?typeof n<"u":typeof n>"u",$type:(n,s)=>typeof n===String(s),$regex:(n,s)=>{if(!(s instanceof RegExp)){const f=String(s).match(/\/(.*)\/([dgimsuy]*)$/);s=f?new RegExp(f[1],f[2]||""):new RegExp(s)}return s.test(String(n||""))},$lt:(n,s)=>n<s,$lte:(n,s)=>n<=s,$gt:(n,s)=>n>s,$gte:(n,s)=>n>=s,...t||{}}}function le(r){const t=ne(),n=(l,{query:c,before:h,after:p})=>{const e=typeof c=="string"?{_path:c}:c,i=l.findIndex(o=>t(o,e));h=h??1,p=p??1;const a=new Array(h+p).fill(null,0);return i===-1?a:a.map((o,u)=>l[i-h+u+ +(u>=h)]||null)},s=[(l,c)=>{const h=l.result.filter(p=>E(c.where).every(e=>t(p,e)));return{...l,result:h,total:h.length}},(l,c)=>E(c.sort).forEach(h=>N(l.result,h)),function(c,h,p){return h.surround&&(c.surround=n(p,h.surround)),c}],f=[(l,c)=>{if(c.skip)return{...l,result:l.result.slice(c.skip),skip:c.skip}},(l,c)=>{if(c.limit)return{...l,result:l.result.slice(0,c.limit),limit:c.limit}},function(c,h,p){var e,i,a;if(h.dirConfig){const o=((e=c.result[0])==null?void 0:e._path)||((a=(i=h.where)==null?void 0:i.find(m=>m._path))==null?void 0:a._path),u=p.find(m=>m._path===D(o,"_dir"));u&&(c.dirConfig={_path:u._path,..._(["_"])(u)})}return c},(l,c)=>({...l,result:j(_(c.without))(l.result)}),(l,c)=>({...l,result:j(W(c.only))(l.result)})];return async l=>{const c=await r(),h=l.params(),p={result:c,limit:0,skip:0,total:c.length},e=s.reduce((a,o)=>o(a,h,c)||a,p);if(h.count)return{result:e.result.length};const i=f.reduce((a,o)=>o(a,h,c)||a,e);return h.first?{...Y(["skip","limit","total"])(i),result:i.result[0]}:i}}export{le as a,ce as b,ue as c,se as m,oe as p};
