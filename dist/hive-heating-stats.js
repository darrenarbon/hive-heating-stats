!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).HiveHeatingStatsCard={})}(this,(function(t){"use strict";function e(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function s(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const i=globalThis,n=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const d=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,r))(e)})(t):t
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:v}=Object,g=globalThis,y=g.trustedTypes,f=y?y.emptyScript:"",$=g.reactiveElementPolyfillSupport,_=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!l(t,e),m={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;class A extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return i?.call(this)},set(e){const r=i?.call(this);n.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??m}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=v(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(d(t))}else void 0!==t&&e.push(d(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$ES(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$E_??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$E_?.delete(t)}_$ES(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(n)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const s of e){const e=document.createElement("style"),n=i.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$E_?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$E_?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const n=(void 0!==s.converter?.toAttribute?s.converter:w).toAttribute(e,s.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=i,this[i]=n.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(void 0!==t){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??b)(i?n:this[t],e))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t)!0!==s.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],s)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$E_?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$E_?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[_("elementProperties")]=new Map,A[_("finalized")]=new Map,$?.({ReactiveElement:A}),(g.reactiveElementVersions??=[]).push("2.0.2");
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const S=globalThis,x=S.trustedTypes,E=x?x.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${(Math.random()+"").slice(9)}$`,P="?"+C,H=`<${P}>`,T=document,U=()=>T.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,j=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),J=new WeakMap,F=T.createTreeWalker(T,129);function K(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const s=t.length-1,i=[];let n,r=2===e?"<svg>":"",o=R;for(let e=0;e<s;e++){const s=t[e];let a,d,l=-1,h=0;for(;h<s.length&&(o.lastIndex=h,d=o.exec(s),null!==d);)h=o.lastIndex,o===R?"!--"===d[1]?o=D:void 0!==d[1]?o=j:void 0!==d[2]?(B.test(d[2])&&(n=RegExp("</"+d[2],"g")),o=z):void 0!==d[3]&&(o=z):o===z?">"===d[0]?(o=n??R,l=-1):void 0===d[1]?l=-2:(l=o.lastIndex-d[2].length,a=d[1],o=void 0===d[3]?z:'"'===d[3]?L:I):o===L||o===I?o=z:o===D||o===j?o=R:(o=z,n=void 0);const c=o===z&&t[e+1].startsWith("/>")?" ":"";r+=o===R?s+H:l>=0?(i.push(a),s.slice(0,l)+k+s.slice(l)+C+c):s+C+(-2===l?e:c)}return[K(t,r+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[d,l]=Y(t,e);if(this.el=Z.createElement(d,s),F.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=F.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(k)){const e=l[r++],s=i.getAttribute(t).split(C),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:s,ctor:"."===o[1]?et:"?"===o[1]?st:"@"===o[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=x?x.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],U()),F.nextNode(),a.push({type:2,index:++n});i.append(t[e],U())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const s=T.createElement("template");return s.innerHTML=t,s}}function X(t,e,s=t,i){if(e===V)return e;let n=void 0!==i?s._$Co?.[i]:s._$Cl;const r=O(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=n:s._$Cl=n),void 0!==n&&(e=X(t,n._$AS(t,e.values),n,i)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);F.currentNode=i;let n=F.nextNode(),r=0,o=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=s[++o]}r!==a?.index&&(n=F.nextNode(),r++)}return F.currentNode=T,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.$(T.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new G(i,this),s=t.u(this.options);t.p(e),this.$(s),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new Z(t)),e}T(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new Q(this.k(U()),this.k(U()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=X(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const i=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=X(this,i[s+o],e,o),a===V&&(a=this._$AH[o]),r||=!O(a)||a!==this._$AH[o],a===q?t=q:t!==q&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!i&&this.O(t)}O(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===q?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends tt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??q)===V)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=S.litHtmlPolyfillSupport;rt?.(Z,Q),(S.litHtmlVersions??=[]).push("3.1.0");
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
class ot extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=s?.renderBefore??null;i._$litPart$=n=new Q(e.insertBefore(U(),t),t,void 0,s??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ot._$litElement$=!0,ot.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ot});const at=globalThis.litElementPolyfillSupport;at?.({LitElement:ot}),(globalThis.litElementVersions??=[]).push("4.0.2");
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const dt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b},lt=(t=dt,e,s)=>{const{kind:i,metadata:n}=s;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const n=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,n,t)},init(e){return void 0!==e&&this.C(i,void 0,t),e}}}if("setter"===i){const{name:i}=s;return function(s){const n=this[i];e.call(this,s),this.requestUpdate(i,n,t)}}throw Error("Unsupported decorator location: "+i)};
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */function ht(t){return(e,s)=>"object"==typeof s?lt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}var ct;const pt=((t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new a(s,t,r)})(ct||(ct=e(["\n\t.container {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\theight: 100%;\n\t\twidth: 100%;\n\t\tpadding: 5px;\n\t}\n\n\t.card {\n\t\tborder-radius: var(--ha-card-border-radius, 10px);\n\t\tbox-shadow: var(\n\t\t\t--ha-card-box-shadow,\n\t\t\t0px 0px 0px 1px rgba(0, 0, 0, 0.12),\n\t\t\t0px 0px 0px 0px rgba(0, 0, 0, 0.12),\n\t\t\t0px 0px 0px 0px rgba(0, 0, 0, 0.12)\n\t\t);\n\t\tbackground: var(--ha-card-background, var(--card-background-color, white));\n\t\tborder-width: var(--ha-card-border-width);\n\t\tpadding: 0px;\n\t}\n\n\ttext {\n\t\ttext-anchor: middle;\n\t\talignment-baseline: middle;\n\t}\n\n\th1 {\n\t\ttext-align: center;\n\t}\n\n\t.grey-box {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\theight: 100%;\n\t\twidth: 80%;\n\t\tpadding: 20px;\n\t\tbackground-color: rgb(228, 228, 228);\n\t\tborder-radius: 10px;\n\t}\n\n\t.grey-box-half {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\theight: 100%;\n\t\twidth: 50%;\n\t\tpadding: 5px;\n\t\tbackground-color: rgb(228, 228, 228);\n\t}\n\n\t.grey-box-half:first-of-type {\n\t\tborder-right: 1px solid black;\n\t}\n\n\t.grey-box-half:last-of-type {\n\t\tborder-left: 1px solid black;\n\t}\n\n\t.grey-box-units span {\n\t\tfont-size: 2.8em;\n\t}\n\n\t.week-view {\n\t\twidth: 80%;\n\t}\n\n\ttable {\n\t\tborder-collapse: inherit;\n\t\tborder-spacing: 0 10px;\n\t}\n\n\t.week-view-day-title {\n\t\twidth: 15%;\n\t}\n\n\t.week-view.day-value {\n\t\twidth: 70%;\n\t}\n\n\t.week-view-day-temperatures {\n\t\twidth: 15%;\n\t}\n\n\t.week-view-day-temperatures div {\n\t\ttext-align: center;\n\t\tbackground-color: rgb(228, 228, 228);\n\t\tborder-radius: 10px;\n\t}\n\n\t.week-view-day-value-block {\n\t\theight: 100%;\n\t\tbackground-color: rgb(71, 71, 252);\n\t\tborder-radius: 10px;\n\t\tfloat: left;\n\t}\n"])));var ut;t.HiveHeatingStatsCard=class extends ot{static get styles(){return pt}static getStubConfig(){return{}}setConfig(t){this._config=t}getState(t,e){const s=this.hass.states[t];return console.log(s),void 0!==s?s:e}async getData(){const t=new Date,e=new Date(Date.now()-6048e5),s=new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0,0),i=new Date(t.getFullYear(),t.getMonth(),t.getDate(),23,59,59,999),n=s.getTime()/1e3,r=[{label:"-7d",date:n,value:0},{label:"-6d",date:n+86400,value:0},{label:"-5d",date:n+172800,value:0},{label:"-4d",date:n+259200,value:0},{label:"-3d",date:n+345600,value:0},{label:"-2d",date:n+432e3,value:0},{label:"-1d",date:n+518400,value:0},{label:"Today",date:n+604800,value:0}],o={type:"history/history_during_period",start_time:s.toISOString(),end_time:i.toISOString(),minimal_response:!0,no_attributes:!0,entity_ids:["sensor.heating_on_today"]},a=await this.hass.callWS(o);console.log(a);for(let t=0;t<r.length;t++){const e=r[t],s=a.filter((t=>t.lu>e.date&&t.lu<e.date+86400)),i=s[s.length-1].s;s.length>0&&null!==i&&(e.value=Number(i))}console.log(r)}render(){const t=this.getState("sensor.heating_on_today");return this.getData(),W(ut||(ut=e(['\n            <div class="ha-card">\n                <div class="container card">\n                    <h1>Heating History</h1>\n\n                    <div class="grey-box">\n                        <div class="grey-box-half">\n                            Total\n                            <div class="grey-box-units"><span>30</span>h <span>29</span>m</div>\n                        </div>\n                        <div class="grey-box-half">\n                            Avg per day\n                            <div class="grey-box-units"><span>5</span>h <span>12</span>m</div>\n                        </div>\n                    </div>\n                    <br />\n                    <table class="week-view">\n                        <head>\n                            <tr>\n                                <th class="week-view-day-title">Day</th>\n                                <th class="week-view-day-value">Time</th>\n                                <th class="week-view-day-temperatures">Min Max</th>\n                            </tr>\n                        </head>\n                        <tr>\n                            <td class="week-view-day-title">Today</td>\n                            <td class="week-view-day-value">\n                                <div class="week-view-day-value-block MAX-WIDTH-IS-80" style="width: 80%">&nbsp;</div>\n                                <div>&nbsp; 3h 04m</div>\n                            </td>\n                            <td class="week-view-day-temperatures"><div>-2&deg; &nbsp; 2&deg;</div></td>\n                        </tr>\n                        <tr>\n                            <td class="week-view-day-title">Thu 22</td>\n                            <td class="week-view-day-value">\n                                <div class="week-view-day-value-block" style="width: 40%">&nbsp;</div>\n                                <div>&nbsp; 1h 34m</div>\n                            </td>\n                            <td class="week-view-day-temperatures"><div>1&deg; &nbsp; 12&deg;</div></td></td>\n                        </tr>\n                        <tr>\n                            <td class="week-view-day-title">Wed 21</td>\n                            <td class="week-view-day-value">\n                                <div class="week-view-day-value-block" style="width: 20%">&nbsp;</div>\n                                <div>&nbsp; 0h 46m</div>\n                            </td>\n                            <td class="week-view-day-temperatures"><div>8&deg; &nbsp; 13&deg;</div></td></td>\n                        </tr>\n                        <tr>\n                            <td class="week-view-day-title">Tue 20</td>\n                            <td class="week-view-day-value">\n                                <div class="week-view-day-value-block" style="width: 25%">&nbsp;</div>\n                                <div>&nbsp; 0h 56m</div>\n                            </td>\n                            <td class="week-view-day-temperatures"><div>8&deg; &nbsp; 13&deg;</div></td></td>\n                        </tr>\n                        <tr>\n                            <td class="week-view-day-title">Mon 19</td>\n                            <td class="week-view-day-value">\n                                <div class="week-view-day-value-block" style="width: 74%">&nbsp;</div>\n                                <div>&nbsp; 2h 48m</div>\n                            </td>\n                            <td class="week-view-day-temperatures"><div>-2&deg; &nbsp; 3&deg;</div></td></td>\n                        </tr>\n                        <tr>\n                            <td class="week-view-day-title">Sun 18</td>\n                            <td class="week-view-day-value">\n                                <div class="week-view-day-value-block" style="width: 66%">&nbsp;</div>\n                                <div>&nbsp; 2h 34m</div>\n                            </td>\n                            <td class="week-view-day-temperatures"><div>-2&deg; &nbsp; 8&deg;</div></td></td>\n                        </tr>\n                        <tr>\n                            <td class="week-view-day-title">Sat 17</td>\n                            <td class="week-view-day-value">\n                                <div class="week-view-day-value-block" style="width: 64%">&nbsp;</div>\n                                <div>&nbsp; 2h 24m</div>\n                            </td>\n                            <td class="week-view-day-temperatures"><div>-2&deg; &nbsp; 9&deg;</div></td></td>\n                        </tr>\n                    </table>\n                    <textarea>\n                        ',"\n                    </textarea>\n                </div>\n            </div>\n        "])),JSON.stringify(t))}},s([ht()],t.HiveHeatingStatsCard.prototype,"hass",void 0),s([ht()],t.HiveHeatingStatsCard.prototype,"_config",void 0),t.HiveHeatingStatsCard=s([(t=>(e,s)=>{void 0!==s?s.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)})("hive-heating-stats-card")],t.HiveHeatingStatsCard),window.customCards=window.customCards||[],window.customCards.push({type:"hive-heating-stats-card",name:"Hive Heating Stats Card",preview:!1,description:"Hive Heating"})}));
