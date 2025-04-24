(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode("@keyframes popup{0%{opacity:0;transform:translateY(1000px)}30%{opacity:.6;transform:translateY(100px)}to{opacity:1;transform:translateY(0)}}@keyframes fade-in-A{0%{opacity:0;transition:opacity .2s ease}to{opacity:1}}.fade-in-A{animation:fade-in-A .3s ease .5s}.anim-typing{line-height:130%!important;opacity:1;width:100%;animation:typing .25s steps(30),blink-border .2s step-end infinite alternate;overflow:hidden;white-space:inherit}.text-reveal-container *:not(code,div,pre,ol,ul){opacity:1;animation:anim-textReveal .35s cubic-bezier(.43,.02,.06,.62) 0s forwards 1}@keyframes anim-textReveal{0%{opacity:0}to{opacity:1}}@keyframes typing{0%{opacity:0;width:0;white-space:nowrap}to{opacity:1;white-space:nowrap}}.anim-blink-self{animation:blink 1s infinite}.anim-blink{animation:border-blink .5s infinite}@keyframes border-blink{0%{opacity:0}to{opacity:1}}@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}:export{primary:hsl(169,55%,82%);secondary:hsl(12,100%,97%);border-color:#eee;gooeyDanger:#dc3545}button{background:none transparent;display:block;padding-inline:0px;margin:0;padding-block:0px;border:1px solid transparent;cursor:pointer;display:flex;align-items:center;border-radius:8px;padding:8px;color:#090909;width:fit-content}button:disabled{color:#6c757d!important;fill:#f0f0f0;cursor:unset}button .btn-icon{position:absolute;top:50%;transform:translateY(-50%);right:0;z-index:2}button .icon-hover{opacity:0}button .btn-hide-overflow p{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}button:hover .icon-hover{opacity:1}.button-filled{background-color:#eee}.button-filled:hover{border:1px solid #0d0d0d}.button-outlined{border-radius:12px;background-color:#f5f5f5}.button-outlined:hover{background-color:#f0f0f0;scale:.98}.button-text:disabled:hover{border:1px solid transparent}.button-text:hover{border:1px solid #eee}.button-text:active:not(:disabled){background-color:#eee;color:#0d0d0d!important}.button-text:active:disabled{background-color:unset}#expand-collapse-button svg{transform:rotate(180deg)}.collapsible-button-expanded #expand-collapse-button>svg{transform:rotate(0);transition:transform .3s ease}.chevron-down>svg{transform:rotate(0);transition:transform .3s ease}.chevron-up>svg{transform:rotate(180deg);transition:transform .3s ease}.button-text-alt:hover{background-color:#f0f0f0}.collapsed-area{height:0px;transition:all .3s ease;opacity:0}.collapsed-area-expanded{transition:all .3s ease;height:100%;opacity:1}#expand-collapse-button{display:inline-flex;padding:1px!important;max-height:16px}")),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
var Vr = Object.defineProperty;
var Cn = (t) => {
  throw TypeError(t);
};
var Gr = (t, e, n) => e in t ? Vr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var F = (t, e, n) => Gr(t, typeof e != "symbol" ? e + "" : e, n), qr = (t, e, n) => e.has(t) || Cn("Cannot " + n);
var zn = (t, e, n) => e.has(t) ? Cn("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n);
var Kt = (t, e, n) => (qr(t, e, "access private method"), n);
import { jsx as s, Fragment as Bt, jsxs as E } from "react/jsx-runtime";
import he, { useState as j, useRef as ht, useEffect as Q, useMemo as tn, createElement as Zr, useCallback as mt, createContext as ki, useContext as Wr, memo as _i } from "react";
import Xr, { createPortal as Yr } from "react-dom";
const Kr = '.gooey-embed-container * :not(code *){box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,Arial,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}blockquote,dd,dl,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,p,pre,ul,ol,li{margin:0;padding:0}menu,ol,ul{list-style:none}.gooey-embed-container{height:100%}.gooey-embed-container p{color:unset}.gooey-embed-container a{color:inherit;text-decoration:underline;text-decoration-color:#00000073;text-decoration-thickness:.6px;text-underline-offset:.15em}.gooey-embed-container a:hover{color:inherit;text-decoration-color:#000;text-decoration-thickness:2px}div:focus-visible{outline:none}::-webkit-scrollbar{background:transparent;color:#fff;width:8px;height:8px}::-webkit-scrollbar-thumb{background:#0003;border-radius:0}code,code[class*=language-]{font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace!important;font-size:.9rem;color:inherit;white-space:pre-wrap;word-wrap:break-word;max-width:100%}pre,pre[class*=language-]{font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace!important;overflow:auto;word-wrap:break-word;padding:.8rem;margin:0 0 .9rem;border-radius:0 0 8px 8px}svg{fill:currentColor}.gp-0{padding:0!important}.gp-2{padding:2px!important}.gp-4{padding:4px!important}.gp-5{padding:5px!important}.gp-6{padding:6px!important}.gp-8{padding:8px!important}.gp-10{padding:10px!important}.gp-12{padding:12px!important}.gp-15{padding:15px!important}.gp-16{padding:16px!important}.gp-18{padding:18px!important}.gp-20{padding:20px!important}.gp-22{padding:22px!important}.gp-24{padding:24px!important}.gp-25{padding:25px!important}.gp-26{padding:26px!important}.gp-28{padding:28px!important}.gp-30{padding:30px!important}.gp-32{padding:32px!important}.gp-34{padding:34px!important}.gp-36{padding:36px!important}.gp-40{padding:40px!important}.gp-44{padding:44px!important}.gp-46{padding:46px!important}.gp-48{padding:48px!important}.gp-50{padding:50px!important}.gp-52{padding:52px!important}.gp-60{padding:60px!important}.gp-64{padding:64px!important}.gp-70{padding:70px!important}.gp-76{padding:76px!important}.gp-80{padding:80px!important}.gp-96{padding:96px!important}.gp-100{padding:100px!important}.gpt-0{padding-top:0!important}.gpt-2{padding-top:2px!important}.gpt-4{padding-top:4px!important}.gpt-5{padding-top:5px!important}.gpt-6{padding-top:6px!important}.gpt-8{padding-top:8px!important}.gpt-10{padding-top:10px!important}.gpt-12{padding-top:12px!important}.gpt-15{padding-top:15px!important}.gpt-16{padding-top:16px!important}.gpt-18{padding-top:18px!important}.gpt-20{padding-top:20px!important}.gpt-22{padding-top:22px!important}.gpt-24{padding-top:24px!important}.gpt-25{padding-top:25px!important}.gpt-26{padding-top:26px!important}.gpt-28{padding-top:28px!important}.gpt-30{padding-top:30px!important}.gpt-32{padding-top:32px!important}.gpt-34{padding-top:34px!important}.gpt-36{padding-top:36px!important}.gpt-40{padding-top:40px!important}.gpt-44{padding-top:44px!important}.gpt-46{padding-top:46px!important}.gpt-48{padding-top:48px!important}.gpt-50{padding-top:50px!important}.gpt-52{padding-top:52px!important}.gpt-60{padding-top:60px!important}.gpt-64{padding-top:64px!important}.gpt-70{padding-top:70px!important}.gpt-76{padding-top:76px!important}.gpt-80{padding-top:80px!important}.gpt-96{padding-top:96px!important}.gpt-100{padding-top:100px!important}.gpr-0{padding-right:0!important}.gpr-2{padding-right:2px!important}.gpr-4{padding-right:4px!important}.gpr-5{padding-right:5px!important}.gpr-6{padding-right:6px!important}.gpr-8{padding-right:8px!important}.gpr-10{padding-right:10px!important}.gpr-12{padding-right:12px!important}.gpr-15{padding-right:15px!important}.gpr-16{padding-right:16px!important}.gpr-18{padding-right:18px!important}.gpr-20{padding-right:20px!important}.gpr-22{padding-right:22px!important}.gpr-24{padding-right:24px!important}.gpr-25{padding-right:25px!important}.gpr-26{padding-right:26px!important}.gpr-28{padding-right:28px!important}.gpr-30{padding-right:30px!important}.gpr-32{padding-right:32px!important}.gpr-34{padding-right:34px!important}.gpr-36{padding-right:36px!important}.gpr-40{padding-right:40px!important}.gpr-44{padding-right:44px!important}.gpr-46{padding-right:46px!important}.gpr-48{padding-right:48px!important}.gpr-50{padding-right:50px!important}.gpr-52{padding-right:52px!important}.gpr-60{padding-right:60px!important}.gpr-64{padding-right:64px!important}.gpr-70{padding-right:70px!important}.gpr-76{padding-right:76px!important}.gpr-80{padding-right:80px!important}.gpr-96{padding-right:96px!important}.gpr-100{padding-right:100px!important}.gpb-0{padding-bottom:0!important}.gpb-2{padding-bottom:2px!important}.gpb-4{padding-bottom:4px!important}.gpb-5{padding-bottom:5px!important}.gpb-6{padding-bottom:6px!important}.gpb-8{padding-bottom:8px!important}.gpb-10{padding-bottom:10px!important}.gpb-12{padding-bottom:12px!important}.gpb-15{padding-bottom:15px!important}.gpb-16{padding-bottom:16px!important}.gpb-18{padding-bottom:18px!important}.gpb-20{padding-bottom:20px!important}.gpb-22{padding-bottom:22px!important}.gpb-24{padding-bottom:24px!important}.gpb-25{padding-bottom:25px!important}.gpb-26{padding-bottom:26px!important}.gpb-28{padding-bottom:28px!important}.gpb-30{padding-bottom:30px!important}.gpb-32{padding-bottom:32px!important}.gpb-34{padding-bottom:34px!important}.gpb-36{padding-bottom:36px!important}.gpb-40{padding-bottom:40px!important}.gpb-44{padding-bottom:44px!important}.gpb-46{padding-bottom:46px!important}.gpb-48{padding-bottom:48px!important}.gpb-50{padding-bottom:50px!important}.gpb-52{padding-bottom:52px!important}.gpb-60{padding-bottom:60px!important}.gpb-64{padding-bottom:64px!important}.gpb-70{padding-bottom:70px!important}.gpb-76{padding-bottom:76px!important}.gpb-80{padding-bottom:80px!important}.gpb-96{padding-bottom:96px!important}.gpb-100{padding-bottom:100px!important}.gpl-0{padding-left:0!important}.gpl-2{padding-left:2px!important}.gpl-4{padding-left:4px!important}.gpl-5{padding-left:5px!important}.gpl-6{padding-left:6px!important}.gpl-8{padding-left:8px!important}.gpl-10{padding-left:10px!important}.gpl-12{padding-left:12px!important}.gpl-15{padding-left:15px!important}.gpl-16{padding-left:16px!important}.gpl-18{padding-left:18px!important}.gpl-20{padding-left:20px!important}.gpl-22{padding-left:22px!important}.gpl-24{padding-left:24px!important}.gpl-25{padding-left:25px!important}.gpl-26{padding-left:26px!important}.gpl-28{padding-left:28px!important}.gpl-30{padding-left:30px!important}.gpl-32{padding-left:32px!important}.gpl-34{padding-left:34px!important}.gpl-36{padding-left:36px!important}.gpl-40{padding-left:40px!important}.gpl-44{padding-left:44px!important}.gpl-46{padding-left:46px!important}.gpl-48{padding-left:48px!important}.gpl-50{padding-left:50px!important}.gpl-52{padding-left:52px!important}.gpl-60{padding-left:60px!important}.gpl-64{padding-left:64px!important}.gpl-70{padding-left:70px!important}.gpl-76{padding-left:76px!important}.gpl-80{padding-left:80px!important}.gpl-96{padding-left:96px!important}.gpl-100{padding-left:100px!important}.gm-0{margin:0!important}.gm-2{margin:2px!important}.gm-4{margin:4px!important}.gm-5{margin:5px!important}.gm-6{margin:6px!important}.gm-8{margin:8px!important}.gm-10{margin:10px!important}.gm-12{margin:12px!important}.gm-15{margin:15px!important}.gm-16{margin:16px!important}.gm-18{margin:18px!important}.gm-20{margin:20px!important}.gm-22{margin:22px!important}.gm-24{margin:24px!important}.gm-25{margin:25px!important}.gm-26{margin:26px!important}.gm-28{margin:28px!important}.gm-30{margin:30px!important}.gm-32{margin:32px!important}.gm-34{margin:34px!important}.gm-36{margin:36px!important}.gm-40{margin:40px!important}.gm-44{margin:44px!important}.gm-46{margin:46px!important}.gm-48{margin:48px!important}.gm-50{margin:50px!important}.gm-52{margin:52px!important}.gm-60{margin:60px!important}.gm-64{margin:64px!important}.gm-70{margin:70px!important}.gm-76{margin:76px!important}.gm-80{margin:80px!important}.gm-96{margin:96px!important}.gm-100{margin:100px!important}.gmt-0{margin-top:0!important}.gmt-2{margin-top:2px!important}.gmt-4{margin-top:4px!important}.gmt-5{margin-top:5px!important}.gmt-6{margin-top:6px!important}.gmt-8{margin-top:8px!important}.gmt-10{margin-top:10px!important}.gmt-12{margin-top:12px!important}.gmt-15{margin-top:15px!important}.gmt-16{margin-top:16px!important}.gmt-18{margin-top:18px!important}.gmt-20{margin-top:20px!important}.gmt-22{margin-top:22px!important}.gmt-24{margin-top:24px!important}.gmt-25{margin-top:25px!important}.gmt-26{margin-top:26px!important}.gmt-28{margin-top:28px!important}.gmt-30{margin-top:30px!important}.gmt-32{margin-top:32px!important}.gmt-34{margin-top:34px!important}.gmt-36{margin-top:36px!important}.gmt-40{margin-top:40px!important}.gmt-44{margin-top:44px!important}.gmt-46{margin-top:46px!important}.gmt-48{margin-top:48px!important}.gmt-50{margin-top:50px!important}.gmt-52{margin-top:52px!important}.gmt-60{margin-top:60px!important}.gmt-64{margin-top:64px!important}.gmt-70{margin-top:70px!important}.gmt-76{margin-top:76px!important}.gmt-80{margin-top:80px!important}.gmt-96{margin-top:96px!important}.gmt-100{margin-top:100px!important}.gmr-0{margin-right:0!important}.gmr-2{margin-right:2px!important}.gmr-4{margin-right:4px!important}.gmr-5{margin-right:5px!important}.gmr-6{margin-right:6px!important}.gmr-8{margin-right:8px!important}.gmr-10{margin-right:10px!important}.gmr-12{margin-right:12px!important}.gmr-15{margin-right:15px!important}.gmr-16{margin-right:16px!important}.gmr-18{margin-right:18px!important}.gmr-20{margin-right:20px!important}.gmr-22{margin-right:22px!important}.gmr-24{margin-right:24px!important}.gmr-25{margin-right:25px!important}.gmr-26{margin-right:26px!important}.gmr-28{margin-right:28px!important}.gmr-30{margin-right:30px!important}.gmr-32{margin-right:32px!important}.gmr-34{margin-right:34px!important}.gmr-36{margin-right:36px!important}.gmr-40{margin-right:40px!important}.gmr-44{margin-right:44px!important}.gmr-46{margin-right:46px!important}.gmr-48{margin-right:48px!important}.gmr-50{margin-right:50px!important}.gmr-52{margin-right:52px!important}.gmr-60{margin-right:60px!important}.gmr-64{margin-right:64px!important}.gmr-70{margin-right:70px!important}.gmr-76{margin-right:76px!important}.gmr-80{margin-right:80px!important}.gmr-96{margin-right:96px!important}.gmr-100{margin-right:100px!important}.gmb-0{margin-bottom:0!important}.gmb-2{margin-bottom:2px!important}.gmb-4{margin-bottom:4px!important}.gmb-5{margin-bottom:5px!important}.gmb-6{margin-bottom:6px!important}.gmb-8{margin-bottom:8px!important}.gmb-10{margin-bottom:10px!important}.gmb-12{margin-bottom:12px!important}.gmb-15{margin-bottom:15px!important}.gmb-16{margin-bottom:16px!important}.gmb-18{margin-bottom:18px!important}.gmb-20{margin-bottom:20px!important}.gmb-22{margin-bottom:22px!important}.gmb-24{margin-bottom:24px!important}.gmb-25{margin-bottom:25px!important}.gmb-26{margin-bottom:26px!important}.gmb-28{margin-bottom:28px!important}.gmb-30{margin-bottom:30px!important}.gmb-32{margin-bottom:32px!important}.gmb-34{margin-bottom:34px!important}.gmb-36{margin-bottom:36px!important}.gmb-40{margin-bottom:40px!important}.gmb-44{margin-bottom:44px!important}.gmb-46{margin-bottom:46px!important}.gmb-48{margin-bottom:48px!important}.gmb-50{margin-bottom:50px!important}.gmb-52{margin-bottom:52px!important}.gmb-60{margin-bottom:60px!important}.gmb-64{margin-bottom:64px!important}.gmb-70{margin-bottom:70px!important}.gmb-76{margin-bottom:76px!important}.gmb-80{margin-bottom:80px!important}.gmb-96{margin-bottom:96px!important}.gmb-100{margin-bottom:100px!important}.gml-0{margin-left:0!important}.gml-2{margin-left:2px!important}.gml-4{margin-left:4px!important}.gml-5{margin-left:5px!important}.gml-6{margin-left:6px!important}.gml-8{margin-left:8px!important}.gml-10{margin-left:10px!important}.gml-12{margin-left:12px!important}.gml-15{margin-left:15px!important}.gml-16{margin-left:16px!important}.gml-18{margin-left:18px!important}.gml-20{margin-left:20px!important}.gml-22{margin-left:22px!important}.gml-24{margin-left:24px!important}.gml-25{margin-left:25px!important}.gml-26{margin-left:26px!important}.gml-28{margin-left:28px!important}.gml-30{margin-left:30px!important}.gml-32{margin-left:32px!important}.gml-34{margin-left:34px!important}.gml-36{margin-left:36px!important}.gml-40{margin-left:40px!important}.gml-44{margin-left:44px!important}.gml-46{margin-left:46px!important}.gml-48{margin-left:48px!important}.gml-50{margin-left:50px!important}.gml-52{margin-left:52px!important}.gml-60{margin-left:60px!important}.gml-64{margin-left:64px!important}.gml-70{margin-left:70px!important}.gml-76{margin-left:76px!important}.gml-80{margin-left:80px!important}.gml-96{margin-left:96px!important}.gml-100{margin-left:100px!important}@media screen and (min-width: 0px){.xs-p-0{padding:0!important}.xs-p-2{padding:2px!important}.xs-p-4{padding:4px!important}.xs-p-5{padding:5px!important}.xs-p-6{padding:6px!important}.xs-p-8{padding:8px!important}.xs-p-10{padding:10px!important}.xs-p-12{padding:12px!important}.xs-p-15{padding:15px!important}.xs-p-16{padding:16px!important}.xs-p-18{padding:18px!important}.xs-p-20{padding:20px!important}.xs-p-22{padding:22px!important}.xs-p-24{padding:24px!important}.xs-p-25{padding:25px!important}.xs-p-26{padding:26px!important}.xs-p-28{padding:28px!important}.xs-p-30{padding:30px!important}.xs-p-32{padding:32px!important}.xs-p-34{padding:34px!important}.xs-p-36{padding:36px!important}.xs-p-40{padding:40px!important}.xs-p-44{padding:44px!important}.xs-p-46{padding:46px!important}.xs-p-48{padding:48px!important}.xs-p-50{padding:50px!important}.xs-p-52{padding:52px!important}.xs-p-60{padding:60px!important}.xs-p-64{padding:64px!important}.xs-p-70{padding:70px!important}.xs-p-76{padding:76px!important}.xs-p-80{padding:80px!important}.xs-p-96{padding:96px!important}.xs-p-100{padding:100px!important}.xs-pt-0{padding-top:0!important}.xs-pt-2{padding-top:2px!important}.xs-pt-4{padding-top:4px!important}.xs-pt-5{padding-top:5px!important}.xs-pt-6{padding-top:6px!important}.xs-pt-8{padding-top:8px!important}.xs-pt-10{padding-top:10px!important}.xs-pt-12{padding-top:12px!important}.xs-pt-15{padding-top:15px!important}.xs-pt-16{padding-top:16px!important}.xs-pt-18{padding-top:18px!important}.xs-pt-20{padding-top:20px!important}.xs-pt-22{padding-top:22px!important}.xs-pt-24{padding-top:24px!important}.xs-pt-25{padding-top:25px!important}.xs-pt-26{padding-top:26px!important}.xs-pt-28{padding-top:28px!important}.xs-pt-30{padding-top:30px!important}.xs-pt-32{padding-top:32px!important}.xs-pt-34{padding-top:34px!important}.xs-pt-36{padding-top:36px!important}.xs-pt-40{padding-top:40px!important}.xs-pt-44{padding-top:44px!important}.xs-pt-46{padding-top:46px!important}.xs-pt-48{padding-top:48px!important}.xs-pt-50{padding-top:50px!important}.xs-pt-52{padding-top:52px!important}.xs-pt-60{padding-top:60px!important}.xs-pt-64{padding-top:64px!important}.xs-pt-70{padding-top:70px!important}.xs-pt-76{padding-top:76px!important}.xs-pt-80{padding-top:80px!important}.xs-pt-96{padding-top:96px!important}.xs-pt-100{padding-top:100px!important}.xs-pr-0{padding-right:0!important}.xs-pr-2{padding-right:2px!important}.xs-pr-4{padding-right:4px!important}.xs-pr-5{padding-right:5px!important}.xs-pr-6{padding-right:6px!important}.xs-pr-8{padding-right:8px!important}.xs-pr-10{padding-right:10px!important}.xs-pr-12{padding-right:12px!important}.xs-pr-15{padding-right:15px!important}.xs-pr-16{padding-right:16px!important}.xs-pr-18{padding-right:18px!important}.xs-pr-20{padding-right:20px!important}.xs-pr-22{padding-right:22px!important}.xs-pr-24{padding-right:24px!important}.xs-pr-25{padding-right:25px!important}.xs-pr-26{padding-right:26px!important}.xs-pr-28{padding-right:28px!important}.xs-pr-30{padding-right:30px!important}.xs-pr-32{padding-right:32px!important}.xs-pr-34{padding-right:34px!important}.xs-pr-36{padding-right:36px!important}.xs-pr-40{padding-right:40px!important}.xs-pr-44{padding-right:44px!important}.xs-pr-46{padding-right:46px!important}.xs-pr-48{padding-right:48px!important}.xs-pr-50{padding-right:50px!important}.xs-pr-52{padding-right:52px!important}.xs-pr-60{padding-right:60px!important}.xs-pr-64{padding-right:64px!important}.xs-pr-70{padding-right:70px!important}.xs-pr-76{padding-right:76px!important}.xs-pr-80{padding-right:80px!important}.xs-pr-96{padding-right:96px!important}.xs-pr-100{padding-right:100px!important}.xs-pb-0{padding-bottom:0!important}.xs-pb-2{padding-bottom:2px!important}.xs-pb-4{padding-bottom:4px!important}.xs-pb-5{padding-bottom:5px!important}.xs-pb-6{padding-bottom:6px!important}.xs-pb-8{padding-bottom:8px!important}.xs-pb-10{padding-bottom:10px!important}.xs-pb-12{padding-bottom:12px!important}.xs-pb-15{padding-bottom:15px!important}.xs-pb-16{padding-bottom:16px!important}.xs-pb-18{padding-bottom:18px!important}.xs-pb-20{padding-bottom:20px!important}.xs-pb-22{padding-bottom:22px!important}.xs-pb-24{padding-bottom:24px!important}.xs-pb-25{padding-bottom:25px!important}.xs-pb-26{padding-bottom:26px!important}.xs-pb-28{padding-bottom:28px!important}.xs-pb-30{padding-bottom:30px!important}.xs-pb-32{padding-bottom:32px!important}.xs-pb-34{padding-bottom:34px!important}.xs-pb-36{padding-bottom:36px!important}.xs-pb-40{padding-bottom:40px!important}.xs-pb-44{padding-bottom:44px!important}.xs-pb-46{padding-bottom:46px!important}.xs-pb-48{padding-bottom:48px!important}.xs-pb-50{padding-bottom:50px!important}.xs-pb-52{padding-bottom:52px!important}.xs-pb-60{padding-bottom:60px!important}.xs-pb-64{padding-bottom:64px!important}.xs-pb-70{padding-bottom:70px!important}.xs-pb-76{padding-bottom:76px!important}.xs-pb-80{padding-bottom:80px!important}.xs-pb-96{padding-bottom:96px!important}.xs-pb-100{padding-bottom:100px!important}.xs-pl-0{padding-left:0!important}.xs-pl-2{padding-left:2px!important}.xs-pl-4{padding-left:4px!important}.xs-pl-5{padding-left:5px!important}.xs-pl-6{padding-left:6px!important}.xs-pl-8{padding-left:8px!important}.xs-pl-10{padding-left:10px!important}.xs-pl-12{padding-left:12px!important}.xs-pl-15{padding-left:15px!important}.xs-pl-16{padding-left:16px!important}.xs-pl-18{padding-left:18px!important}.xs-pl-20{padding-left:20px!important}.xs-pl-22{padding-left:22px!important}.xs-pl-24{padding-left:24px!important}.xs-pl-25{padding-left:25px!important}.xs-pl-26{padding-left:26px!important}.xs-pl-28{padding-left:28px!important}.xs-pl-30{padding-left:30px!important}.xs-pl-32{padding-left:32px!important}.xs-pl-34{padding-left:34px!important}.xs-pl-36{padding-left:36px!important}.xs-pl-40{padding-left:40px!important}.xs-pl-44{padding-left:44px!important}.xs-pl-46{padding-left:46px!important}.xs-pl-48{padding-left:48px!important}.xs-pl-50{padding-left:50px!important}.xs-pl-52{padding-left:52px!important}.xs-pl-60{padding-left:60px!important}.xs-pl-64{padding-left:64px!important}.xs-pl-70{padding-left:70px!important}.xs-pl-76{padding-left:76px!important}.xs-pl-80{padding-left:80px!important}.xs-pl-96{padding-left:96px!important}.xs-pl-100{padding-left:100px!important}.xs-m-0{margin:0!important}.xs-m-2{margin:2px!important}.xs-m-4{margin:4px!important}.xs-m-5{margin:5px!important}.xs-m-6{margin:6px!important}.xs-m-8{margin:8px!important}.xs-m-10{margin:10px!important}.xs-m-12{margin:12px!important}.xs-m-15{margin:15px!important}.xs-m-16{margin:16px!important}.xs-m-18{margin:18px!important}.xs-m-20{margin:20px!important}.xs-m-22{margin:22px!important}.xs-m-24{margin:24px!important}.xs-m-25{margin:25px!important}.xs-m-26{margin:26px!important}.xs-m-28{margin:28px!important}.xs-m-30{margin:30px!important}.xs-m-32{margin:32px!important}.xs-m-34{margin:34px!important}.xs-m-36{margin:36px!important}.xs-m-40{margin:40px!important}.xs-m-44{margin:44px!important}.xs-m-46{margin:46px!important}.xs-m-48{margin:48px!important}.xs-m-50{margin:50px!important}.xs-m-52{margin:52px!important}.xs-m-60{margin:60px!important}.xs-m-64{margin:64px!important}.xs-m-70{margin:70px!important}.xs-m-76{margin:76px!important}.xs-m-80{margin:80px!important}.xs-m-96{margin:96px!important}.xs-m-100{margin:100px!important}.xs-mt-0{margin-top:0!important}.xs-mt-2{margin-top:2px!important}.xs-mt-4{margin-top:4px!important}.xs-mt-5{margin-top:5px!important}.xs-mt-6{margin-top:6px!important}.xs-mt-8{margin-top:8px!important}.xs-mt-10{margin-top:10px!important}.xs-mt-12{margin-top:12px!important}.xs-mt-15{margin-top:15px!important}.xs-mt-16{margin-top:16px!important}.xs-mt-18{margin-top:18px!important}.xs-mt-20{margin-top:20px!important}.xs-mt-22{margin-top:22px!important}.xs-mt-24{margin-top:24px!important}.xs-mt-25{margin-top:25px!important}.xs-mt-26{margin-top:26px!important}.xs-mt-28{margin-top:28px!important}.xs-mt-30{margin-top:30px!important}.xs-mt-32{margin-top:32px!important}.xs-mt-34{margin-top:34px!important}.xs-mt-36{margin-top:36px!important}.xs-mt-40{margin-top:40px!important}.xs-mt-44{margin-top:44px!important}.xs-mt-46{margin-top:46px!important}.xs-mt-48{margin-top:48px!important}.xs-mt-50{margin-top:50px!important}.xs-mt-52{margin-top:52px!important}.xs-mt-60{margin-top:60px!important}.xs-mt-64{margin-top:64px!important}.xs-mt-70{margin-top:70px!important}.xs-mt-76{margin-top:76px!important}.xs-mt-80{margin-top:80px!important}.xs-mt-96{margin-top:96px!important}.xs-mt-100{margin-top:100px!important}.xs-mr-0{margin-right:0!important}.xs-mr-2{margin-right:2px!important}.xs-mr-4{margin-right:4px!important}.xs-mr-5{margin-right:5px!important}.xs-mr-6{margin-right:6px!important}.xs-mr-8{margin-right:8px!important}.xs-mr-10{margin-right:10px!important}.xs-mr-12{margin-right:12px!important}.xs-mr-15{margin-right:15px!important}.xs-mr-16{margin-right:16px!important}.xs-mr-18{margin-right:18px!important}.xs-mr-20{margin-right:20px!important}.xs-mr-22{margin-right:22px!important}.xs-mr-24{margin-right:24px!important}.xs-mr-25{margin-right:25px!important}.xs-mr-26{margin-right:26px!important}.xs-mr-28{margin-right:28px!important}.xs-mr-30{margin-right:30px!important}.xs-mr-32{margin-right:32px!important}.xs-mr-34{margin-right:34px!important}.xs-mr-36{margin-right:36px!important}.xs-mr-40{margin-right:40px!important}.xs-mr-44{margin-right:44px!important}.xs-mr-46{margin-right:46px!important}.xs-mr-48{margin-right:48px!important}.xs-mr-50{margin-right:50px!important}.xs-mr-52{margin-right:52px!important}.xs-mr-60{margin-right:60px!important}.xs-mr-64{margin-right:64px!important}.xs-mr-70{margin-right:70px!important}.xs-mr-76{margin-right:76px!important}.xs-mr-80{margin-right:80px!important}.xs-mr-96{margin-right:96px!important}.xs-mr-100{margin-right:100px!important}.xs-mb-0{margin-bottom:0!important}.xs-mb-2{margin-bottom:2px!important}.xs-mb-4{margin-bottom:4px!important}.xs-mb-5{margin-bottom:5px!important}.xs-mb-6{margin-bottom:6px!important}.xs-mb-8{margin-bottom:8px!important}.xs-mb-10{margin-bottom:10px!important}.xs-mb-12{margin-bottom:12px!important}.xs-mb-15{margin-bottom:15px!important}.xs-mb-16{margin-bottom:16px!important}.xs-mb-18{margin-bottom:18px!important}.xs-mb-20{margin-bottom:20px!important}.xs-mb-22{margin-bottom:22px!important}.xs-mb-24{margin-bottom:24px!important}.xs-mb-25{margin-bottom:25px!important}.xs-mb-26{margin-bottom:26px!important}.xs-mb-28{margin-bottom:28px!important}.xs-mb-30{margin-bottom:30px!important}.xs-mb-32{margin-bottom:32px!important}.xs-mb-34{margin-bottom:34px!important}.xs-mb-36{margin-bottom:36px!important}.xs-mb-40{margin-bottom:40px!important}.xs-mb-44{margin-bottom:44px!important}.xs-mb-46{margin-bottom:46px!important}.xs-mb-48{margin-bottom:48px!important}.xs-mb-50{margin-bottom:50px!important}.xs-mb-52{margin-bottom:52px!important}.xs-mb-60{margin-bottom:60px!important}.xs-mb-64{margin-bottom:64px!important}.xs-mb-70{margin-bottom:70px!important}.xs-mb-76{margin-bottom:76px!important}.xs-mb-80{margin-bottom:80px!important}.xs-mb-96{margin-bottom:96px!important}.xs-mb-100{margin-bottom:100px!important}.xs-ml-0{margin-left:0!important}.xs-ml-2{margin-left:2px!important}.xs-ml-4{margin-left:4px!important}.xs-ml-5{margin-left:5px!important}.xs-ml-6{margin-left:6px!important}.xs-ml-8{margin-left:8px!important}.xs-ml-10{margin-left:10px!important}.xs-ml-12{margin-left:12px!important}.xs-ml-15{margin-left:15px!important}.xs-ml-16{margin-left:16px!important}.xs-ml-18{margin-left:18px!important}.xs-ml-20{margin-left:20px!important}.xs-ml-22{margin-left:22px!important}.xs-ml-24{margin-left:24px!important}.xs-ml-25{margin-left:25px!important}.xs-ml-26{margin-left:26px!important}.xs-ml-28{margin-left:28px!important}.xs-ml-30{margin-left:30px!important}.xs-ml-32{margin-left:32px!important}.xs-ml-34{margin-left:34px!important}.xs-ml-36{margin-left:36px!important}.xs-ml-40{margin-left:40px!important}.xs-ml-44{margin-left:44px!important}.xs-ml-46{margin-left:46px!important}.xs-ml-48{margin-left:48px!important}.xs-ml-50{margin-left:50px!important}.xs-ml-52{margin-left:52px!important}.xs-ml-60{margin-left:60px!important}.xs-ml-64{margin-left:64px!important}.xs-ml-70{margin-left:70px!important}.xs-ml-76{margin-left:76px!important}.xs-ml-80{margin-left:80px!important}.xs-ml-96{margin-left:96px!important}.xs-ml-100{margin-left:100px!important}}@media screen and (min-width: 640px){.sm-p-0{padding:0!important}.sm-p-2{padding:2px!important}.sm-p-4{padding:4px!important}.sm-p-5{padding:5px!important}.sm-p-6{padding:6px!important}.sm-p-8{padding:8px!important}.sm-p-10{padding:10px!important}.sm-p-12{padding:12px!important}.sm-p-15{padding:15px!important}.sm-p-16{padding:16px!important}.sm-p-18{padding:18px!important}.sm-p-20{padding:20px!important}.sm-p-22{padding:22px!important}.sm-p-24{padding:24px!important}.sm-p-25{padding:25px!important}.sm-p-26{padding:26px!important}.sm-p-28{padding:28px!important}.sm-p-30{padding:30px!important}.sm-p-32{padding:32px!important}.sm-p-34{padding:34px!important}.sm-p-36{padding:36px!important}.sm-p-40{padding:40px!important}.sm-p-44{padding:44px!important}.sm-p-46{padding:46px!important}.sm-p-48{padding:48px!important}.sm-p-50{padding:50px!important}.sm-p-52{padding:52px!important}.sm-p-60{padding:60px!important}.sm-p-64{padding:64px!important}.sm-p-70{padding:70px!important}.sm-p-76{padding:76px!important}.sm-p-80{padding:80px!important}.sm-p-96{padding:96px!important}.sm-p-100{padding:100px!important}.sm-pt-0{padding-top:0!important}.sm-pt-2{padding-top:2px!important}.sm-pt-4{padding-top:4px!important}.sm-pt-5{padding-top:5px!important}.sm-pt-6{padding-top:6px!important}.sm-pt-8{padding-top:8px!important}.sm-pt-10{padding-top:10px!important}.sm-pt-12{padding-top:12px!important}.sm-pt-15{padding-top:15px!important}.sm-pt-16{padding-top:16px!important}.sm-pt-18{padding-top:18px!important}.sm-pt-20{padding-top:20px!important}.sm-pt-22{padding-top:22px!important}.sm-pt-24{padding-top:24px!important}.sm-pt-25{padding-top:25px!important}.sm-pt-26{padding-top:26px!important}.sm-pt-28{padding-top:28px!important}.sm-pt-30{padding-top:30px!important}.sm-pt-32{padding-top:32px!important}.sm-pt-34{padding-top:34px!important}.sm-pt-36{padding-top:36px!important}.sm-pt-40{padding-top:40px!important}.sm-pt-44{padding-top:44px!important}.sm-pt-46{padding-top:46px!important}.sm-pt-48{padding-top:48px!important}.sm-pt-50{padding-top:50px!important}.sm-pt-52{padding-top:52px!important}.sm-pt-60{padding-top:60px!important}.sm-pt-64{padding-top:64px!important}.sm-pt-70{padding-top:70px!important}.sm-pt-76{padding-top:76px!important}.sm-pt-80{padding-top:80px!important}.sm-pt-96{padding-top:96px!important}.sm-pt-100{padding-top:100px!important}.sm-pr-0{padding-right:0!important}.sm-pr-2{padding-right:2px!important}.sm-pr-4{padding-right:4px!important}.sm-pr-5{padding-right:5px!important}.sm-pr-6{padding-right:6px!important}.sm-pr-8{padding-right:8px!important}.sm-pr-10{padding-right:10px!important}.sm-pr-12{padding-right:12px!important}.sm-pr-15{padding-right:15px!important}.sm-pr-16{padding-right:16px!important}.sm-pr-18{padding-right:18px!important}.sm-pr-20{padding-right:20px!important}.sm-pr-22{padding-right:22px!important}.sm-pr-24{padding-right:24px!important}.sm-pr-25{padding-right:25px!important}.sm-pr-26{padding-right:26px!important}.sm-pr-28{padding-right:28px!important}.sm-pr-30{padding-right:30px!important}.sm-pr-32{padding-right:32px!important}.sm-pr-34{padding-right:34px!important}.sm-pr-36{padding-right:36px!important}.sm-pr-40{padding-right:40px!important}.sm-pr-44{padding-right:44px!important}.sm-pr-46{padding-right:46px!important}.sm-pr-48{padding-right:48px!important}.sm-pr-50{padding-right:50px!important}.sm-pr-52{padding-right:52px!important}.sm-pr-60{padding-right:60px!important}.sm-pr-64{padding-right:64px!important}.sm-pr-70{padding-right:70px!important}.sm-pr-76{padding-right:76px!important}.sm-pr-80{padding-right:80px!important}.sm-pr-96{padding-right:96px!important}.sm-pr-100{padding-right:100px!important}.sm-pb-0{padding-bottom:0!important}.sm-pb-2{padding-bottom:2px!important}.sm-pb-4{padding-bottom:4px!important}.sm-pb-5{padding-bottom:5px!important}.sm-pb-6{padding-bottom:6px!important}.sm-pb-8{padding-bottom:8px!important}.sm-pb-10{padding-bottom:10px!important}.sm-pb-12{padding-bottom:12px!important}.sm-pb-15{padding-bottom:15px!important}.sm-pb-16{padding-bottom:16px!important}.sm-pb-18{padding-bottom:18px!important}.sm-pb-20{padding-bottom:20px!important}.sm-pb-22{padding-bottom:22px!important}.sm-pb-24{padding-bottom:24px!important}.sm-pb-25{padding-bottom:25px!important}.sm-pb-26{padding-bottom:26px!important}.sm-pb-28{padding-bottom:28px!important}.sm-pb-30{padding-bottom:30px!important}.sm-pb-32{padding-bottom:32px!important}.sm-pb-34{padding-bottom:34px!important}.sm-pb-36{padding-bottom:36px!important}.sm-pb-40{padding-bottom:40px!important}.sm-pb-44{padding-bottom:44px!important}.sm-pb-46{padding-bottom:46px!important}.sm-pb-48{padding-bottom:48px!important}.sm-pb-50{padding-bottom:50px!important}.sm-pb-52{padding-bottom:52px!important}.sm-pb-60{padding-bottom:60px!important}.sm-pb-64{padding-bottom:64px!important}.sm-pb-70{padding-bottom:70px!important}.sm-pb-76{padding-bottom:76px!important}.sm-pb-80{padding-bottom:80px!important}.sm-pb-96{padding-bottom:96px!important}.sm-pb-100{padding-bottom:100px!important}.sm-pl-0{padding-left:0!important}.sm-pl-2{padding-left:2px!important}.sm-pl-4{padding-left:4px!important}.sm-pl-5{padding-left:5px!important}.sm-pl-6{padding-left:6px!important}.sm-pl-8{padding-left:8px!important}.sm-pl-10{padding-left:10px!important}.sm-pl-12{padding-left:12px!important}.sm-pl-15{padding-left:15px!important}.sm-pl-16{padding-left:16px!important}.sm-pl-18{padding-left:18px!important}.sm-pl-20{padding-left:20px!important}.sm-pl-22{padding-left:22px!important}.sm-pl-24{padding-left:24px!important}.sm-pl-25{padding-left:25px!important}.sm-pl-26{padding-left:26px!important}.sm-pl-28{padding-left:28px!important}.sm-pl-30{padding-left:30px!important}.sm-pl-32{padding-left:32px!important}.sm-pl-34{padding-left:34px!important}.sm-pl-36{padding-left:36px!important}.sm-pl-40{padding-left:40px!important}.sm-pl-44{padding-left:44px!important}.sm-pl-46{padding-left:46px!important}.sm-pl-48{padding-left:48px!important}.sm-pl-50{padding-left:50px!important}.sm-pl-52{padding-left:52px!important}.sm-pl-60{padding-left:60px!important}.sm-pl-64{padding-left:64px!important}.sm-pl-70{padding-left:70px!important}.sm-pl-76{padding-left:76px!important}.sm-pl-80{padding-left:80px!important}.sm-pl-96{padding-left:96px!important}.sm-pl-100{padding-left:100px!important}.sm-m-0{margin:0!important}.sm-m-2{margin:2px!important}.sm-m-4{margin:4px!important}.sm-m-5{margin:5px!important}.sm-m-6{margin:6px!important}.sm-m-8{margin:8px!important}.sm-m-10{margin:10px!important}.sm-m-12{margin:12px!important}.sm-m-15{margin:15px!important}.sm-m-16{margin:16px!important}.sm-m-18{margin:18px!important}.sm-m-20{margin:20px!important}.sm-m-22{margin:22px!important}.sm-m-24{margin:24px!important}.sm-m-25{margin:25px!important}.sm-m-26{margin:26px!important}.sm-m-28{margin:28px!important}.sm-m-30{margin:30px!important}.sm-m-32{margin:32px!important}.sm-m-34{margin:34px!important}.sm-m-36{margin:36px!important}.sm-m-40{margin:40px!important}.sm-m-44{margin:44px!important}.sm-m-46{margin:46px!important}.sm-m-48{margin:48px!important}.sm-m-50{margin:50px!important}.sm-m-52{margin:52px!important}.sm-m-60{margin:60px!important}.sm-m-64{margin:64px!important}.sm-m-70{margin:70px!important}.sm-m-76{margin:76px!important}.sm-m-80{margin:80px!important}.sm-m-96{margin:96px!important}.sm-m-100{margin:100px!important}.sm-mt-0{margin-top:0!important}.sm-mt-2{margin-top:2px!important}.sm-mt-4{margin-top:4px!important}.sm-mt-5{margin-top:5px!important}.sm-mt-6{margin-top:6px!important}.sm-mt-8{margin-top:8px!important}.sm-mt-10{margin-top:10px!important}.sm-mt-12{margin-top:12px!important}.sm-mt-15{margin-top:15px!important}.sm-mt-16{margin-top:16px!important}.sm-mt-18{margin-top:18px!important}.sm-mt-20{margin-top:20px!important}.sm-mt-22{margin-top:22px!important}.sm-mt-24{margin-top:24px!important}.sm-mt-25{margin-top:25px!important}.sm-mt-26{margin-top:26px!important}.sm-mt-28{margin-top:28px!important}.sm-mt-30{margin-top:30px!important}.sm-mt-32{margin-top:32px!important}.sm-mt-34{margin-top:34px!important}.sm-mt-36{margin-top:36px!important}.sm-mt-40{margin-top:40px!important}.sm-mt-44{margin-top:44px!important}.sm-mt-46{margin-top:46px!important}.sm-mt-48{margin-top:48px!important}.sm-mt-50{margin-top:50px!important}.sm-mt-52{margin-top:52px!important}.sm-mt-60{margin-top:60px!important}.sm-mt-64{margin-top:64px!important}.sm-mt-70{margin-top:70px!important}.sm-mt-76{margin-top:76px!important}.sm-mt-80{margin-top:80px!important}.sm-mt-96{margin-top:96px!important}.sm-mt-100{margin-top:100px!important}.sm-mr-0{margin-right:0!important}.sm-mr-2{margin-right:2px!important}.sm-mr-4{margin-right:4px!important}.sm-mr-5{margin-right:5px!important}.sm-mr-6{margin-right:6px!important}.sm-mr-8{margin-right:8px!important}.sm-mr-10{margin-right:10px!important}.sm-mr-12{margin-right:12px!important}.sm-mr-15{margin-right:15px!important}.sm-mr-16{margin-right:16px!important}.sm-mr-18{margin-right:18px!important}.sm-mr-20{margin-right:20px!important}.sm-mr-22{margin-right:22px!important}.sm-mr-24{margin-right:24px!important}.sm-mr-25{margin-right:25px!important}.sm-mr-26{margin-right:26px!important}.sm-mr-28{margin-right:28px!important}.sm-mr-30{margin-right:30px!important}.sm-mr-32{margin-right:32px!important}.sm-mr-34{margin-right:34px!important}.sm-mr-36{margin-right:36px!important}.sm-mr-40{margin-right:40px!important}.sm-mr-44{margin-right:44px!important}.sm-mr-46{margin-right:46px!important}.sm-mr-48{margin-right:48px!important}.sm-mr-50{margin-right:50px!important}.sm-mr-52{margin-right:52px!important}.sm-mr-60{margin-right:60px!important}.sm-mr-64{margin-right:64px!important}.sm-mr-70{margin-right:70px!important}.sm-mr-76{margin-right:76px!important}.sm-mr-80{margin-right:80px!important}.sm-mr-96{margin-right:96px!important}.sm-mr-100{margin-right:100px!important}.sm-mb-0{margin-bottom:0!important}.sm-mb-2{margin-bottom:2px!important}.sm-mb-4{margin-bottom:4px!important}.sm-mb-5{margin-bottom:5px!important}.sm-mb-6{margin-bottom:6px!important}.sm-mb-8{margin-bottom:8px!important}.sm-mb-10{margin-bottom:10px!important}.sm-mb-12{margin-bottom:12px!important}.sm-mb-15{margin-bottom:15px!important}.sm-mb-16{margin-bottom:16px!important}.sm-mb-18{margin-bottom:18px!important}.sm-mb-20{margin-bottom:20px!important}.sm-mb-22{margin-bottom:22px!important}.sm-mb-24{margin-bottom:24px!important}.sm-mb-25{margin-bottom:25px!important}.sm-mb-26{margin-bottom:26px!important}.sm-mb-28{margin-bottom:28px!important}.sm-mb-30{margin-bottom:30px!important}.sm-mb-32{margin-bottom:32px!important}.sm-mb-34{margin-bottom:34px!important}.sm-mb-36{margin-bottom:36px!important}.sm-mb-40{margin-bottom:40px!important}.sm-mb-44{margin-bottom:44px!important}.sm-mb-46{margin-bottom:46px!important}.sm-mb-48{margin-bottom:48px!important}.sm-mb-50{margin-bottom:50px!important}.sm-mb-52{margin-bottom:52px!important}.sm-mb-60{margin-bottom:60px!important}.sm-mb-64{margin-bottom:64px!important}.sm-mb-70{margin-bottom:70px!important}.sm-mb-76{margin-bottom:76px!important}.sm-mb-80{margin-bottom:80px!important}.sm-mb-96{margin-bottom:96px!important}.sm-mb-100{margin-bottom:100px!important}.sm-ml-0{margin-left:0!important}.sm-ml-2{margin-left:2px!important}.sm-ml-4{margin-left:4px!important}.sm-ml-5{margin-left:5px!important}.sm-ml-6{margin-left:6px!important}.sm-ml-8{margin-left:8px!important}.sm-ml-10{margin-left:10px!important}.sm-ml-12{margin-left:12px!important}.sm-ml-15{margin-left:15px!important}.sm-ml-16{margin-left:16px!important}.sm-ml-18{margin-left:18px!important}.sm-ml-20{margin-left:20px!important}.sm-ml-22{margin-left:22px!important}.sm-ml-24{margin-left:24px!important}.sm-ml-25{margin-left:25px!important}.sm-ml-26{margin-left:26px!important}.sm-ml-28{margin-left:28px!important}.sm-ml-30{margin-left:30px!important}.sm-ml-32{margin-left:32px!important}.sm-ml-34{margin-left:34px!important}.sm-ml-36{margin-left:36px!important}.sm-ml-40{margin-left:40px!important}.sm-ml-44{margin-left:44px!important}.sm-ml-46{margin-left:46px!important}.sm-ml-48{margin-left:48px!important}.sm-ml-50{margin-left:50px!important}.sm-ml-52{margin-left:52px!important}.sm-ml-60{margin-left:60px!important}.sm-ml-64{margin-left:64px!important}.sm-ml-70{margin-left:70px!important}.sm-ml-76{margin-left:76px!important}.sm-ml-80{margin-left:80px!important}.sm-ml-96{margin-left:96px!important}.sm-ml-100{margin-left:100px!important}}@media screen and (min-width: 1100px){.md-p-0{padding:0!important}.md-p-2{padding:2px!important}.md-p-4{padding:4px!important}.md-p-5{padding:5px!important}.md-p-6{padding:6px!important}.md-p-8{padding:8px!important}.md-p-10{padding:10px!important}.md-p-12{padding:12px!important}.md-p-15{padding:15px!important}.md-p-16{padding:16px!important}.md-p-18{padding:18px!important}.md-p-20{padding:20px!important}.md-p-22{padding:22px!important}.md-p-24{padding:24px!important}.md-p-25{padding:25px!important}.md-p-26{padding:26px!important}.md-p-28{padding:28px!important}.md-p-30{padding:30px!important}.md-p-32{padding:32px!important}.md-p-34{padding:34px!important}.md-p-36{padding:36px!important}.md-p-40{padding:40px!important}.md-p-44{padding:44px!important}.md-p-46{padding:46px!important}.md-p-48{padding:48px!important}.md-p-50{padding:50px!important}.md-p-52{padding:52px!important}.md-p-60{padding:60px!important}.md-p-64{padding:64px!important}.md-p-70{padding:70px!important}.md-p-76{padding:76px!important}.md-p-80{padding:80px!important}.md-p-96{padding:96px!important}.md-p-100{padding:100px!important}.md-pt-0{padding-top:0!important}.md-pt-2{padding-top:2px!important}.md-pt-4{padding-top:4px!important}.md-pt-5{padding-top:5px!important}.md-pt-6{padding-top:6px!important}.md-pt-8{padding-top:8px!important}.md-pt-10{padding-top:10px!important}.md-pt-12{padding-top:12px!important}.md-pt-15{padding-top:15px!important}.md-pt-16{padding-top:16px!important}.md-pt-18{padding-top:18px!important}.md-pt-20{padding-top:20px!important}.md-pt-22{padding-top:22px!important}.md-pt-24{padding-top:24px!important}.md-pt-25{padding-top:25px!important}.md-pt-26{padding-top:26px!important}.md-pt-28{padding-top:28px!important}.md-pt-30{padding-top:30px!important}.md-pt-32{padding-top:32px!important}.md-pt-34{padding-top:34px!important}.md-pt-36{padding-top:36px!important}.md-pt-40{padding-top:40px!important}.md-pt-44{padding-top:44px!important}.md-pt-46{padding-top:46px!important}.md-pt-48{padding-top:48px!important}.md-pt-50{padding-top:50px!important}.md-pt-52{padding-top:52px!important}.md-pt-60{padding-top:60px!important}.md-pt-64{padding-top:64px!important}.md-pt-70{padding-top:70px!important}.md-pt-76{padding-top:76px!important}.md-pt-80{padding-top:80px!important}.md-pt-96{padding-top:96px!important}.md-pt-100{padding-top:100px!important}.md-pr-0{padding-right:0!important}.md-pr-2{padding-right:2px!important}.md-pr-4{padding-right:4px!important}.md-pr-5{padding-right:5px!important}.md-pr-6{padding-right:6px!important}.md-pr-8{padding-right:8px!important}.md-pr-10{padding-right:10px!important}.md-pr-12{padding-right:12px!important}.md-pr-15{padding-right:15px!important}.md-pr-16{padding-right:16px!important}.md-pr-18{padding-right:18px!important}.md-pr-20{padding-right:20px!important}.md-pr-22{padding-right:22px!important}.md-pr-24{padding-right:24px!important}.md-pr-25{padding-right:25px!important}.md-pr-26{padding-right:26px!important}.md-pr-28{padding-right:28px!important}.md-pr-30{padding-right:30px!important}.md-pr-32{padding-right:32px!important}.md-pr-34{padding-right:34px!important}.md-pr-36{padding-right:36px!important}.md-pr-40{padding-right:40px!important}.md-pr-44{padding-right:44px!important}.md-pr-46{padding-right:46px!important}.md-pr-48{padding-right:48px!important}.md-pr-50{padding-right:50px!important}.md-pr-52{padding-right:52px!important}.md-pr-60{padding-right:60px!important}.md-pr-64{padding-right:64px!important}.md-pr-70{padding-right:70px!important}.md-pr-76{padding-right:76px!important}.md-pr-80{padding-right:80px!important}.md-pr-96{padding-right:96px!important}.md-pr-100{padding-right:100px!important}.md-pb-0{padding-bottom:0!important}.md-pb-2{padding-bottom:2px!important}.md-pb-4{padding-bottom:4px!important}.md-pb-5{padding-bottom:5px!important}.md-pb-6{padding-bottom:6px!important}.md-pb-8{padding-bottom:8px!important}.md-pb-10{padding-bottom:10px!important}.md-pb-12{padding-bottom:12px!important}.md-pb-15{padding-bottom:15px!important}.md-pb-16{padding-bottom:16px!important}.md-pb-18{padding-bottom:18px!important}.md-pb-20{padding-bottom:20px!important}.md-pb-22{padding-bottom:22px!important}.md-pb-24{padding-bottom:24px!important}.md-pb-25{padding-bottom:25px!important}.md-pb-26{padding-bottom:26px!important}.md-pb-28{padding-bottom:28px!important}.md-pb-30{padding-bottom:30px!important}.md-pb-32{padding-bottom:32px!important}.md-pb-34{padding-bottom:34px!important}.md-pb-36{padding-bottom:36px!important}.md-pb-40{padding-bottom:40px!important}.md-pb-44{padding-bottom:44px!important}.md-pb-46{padding-bottom:46px!important}.md-pb-48{padding-bottom:48px!important}.md-pb-50{padding-bottom:50px!important}.md-pb-52{padding-bottom:52px!important}.md-pb-60{padding-bottom:60px!important}.md-pb-64{padding-bottom:64px!important}.md-pb-70{padding-bottom:70px!important}.md-pb-76{padding-bottom:76px!important}.md-pb-80{padding-bottom:80px!important}.md-pb-96{padding-bottom:96px!important}.md-pb-100{padding-bottom:100px!important}.md-pl-0{padding-left:0!important}.md-pl-2{padding-left:2px!important}.md-pl-4{padding-left:4px!important}.md-pl-5{padding-left:5px!important}.md-pl-6{padding-left:6px!important}.md-pl-8{padding-left:8px!important}.md-pl-10{padding-left:10px!important}.md-pl-12{padding-left:12px!important}.md-pl-15{padding-left:15px!important}.md-pl-16{padding-left:16px!important}.md-pl-18{padding-left:18px!important}.md-pl-20{padding-left:20px!important}.md-pl-22{padding-left:22px!important}.md-pl-24{padding-left:24px!important}.md-pl-25{padding-left:25px!important}.md-pl-26{padding-left:26px!important}.md-pl-28{padding-left:28px!important}.md-pl-30{padding-left:30px!important}.md-pl-32{padding-left:32px!important}.md-pl-34{padding-left:34px!important}.md-pl-36{padding-left:36px!important}.md-pl-40{padding-left:40px!important}.md-pl-44{padding-left:44px!important}.md-pl-46{padding-left:46px!important}.md-pl-48{padding-left:48px!important}.md-pl-50{padding-left:50px!important}.md-pl-52{padding-left:52px!important}.md-pl-60{padding-left:60px!important}.md-pl-64{padding-left:64px!important}.md-pl-70{padding-left:70px!important}.md-pl-76{padding-left:76px!important}.md-pl-80{padding-left:80px!important}.md-pl-96{padding-left:96px!important}.md-pl-100{padding-left:100px!important}.md-m-0{margin:0!important}.md-m-2{margin:2px!important}.md-m-4{margin:4px!important}.md-m-5{margin:5px!important}.md-m-6{margin:6px!important}.md-m-8{margin:8px!important}.md-m-10{margin:10px!important}.md-m-12{margin:12px!important}.md-m-15{margin:15px!important}.md-m-16{margin:16px!important}.md-m-18{margin:18px!important}.md-m-20{margin:20px!important}.md-m-22{margin:22px!important}.md-m-24{margin:24px!important}.md-m-25{margin:25px!important}.md-m-26{margin:26px!important}.md-m-28{margin:28px!important}.md-m-30{margin:30px!important}.md-m-32{margin:32px!important}.md-m-34{margin:34px!important}.md-m-36{margin:36px!important}.md-m-40{margin:40px!important}.md-m-44{margin:44px!important}.md-m-46{margin:46px!important}.md-m-48{margin:48px!important}.md-m-50{margin:50px!important}.md-m-52{margin:52px!important}.md-m-60{margin:60px!important}.md-m-64{margin:64px!important}.md-m-70{margin:70px!important}.md-m-76{margin:76px!important}.md-m-80{margin:80px!important}.md-m-96{margin:96px!important}.md-m-100{margin:100px!important}.md-mt-0{margin-top:0!important}.md-mt-2{margin-top:2px!important}.md-mt-4{margin-top:4px!important}.md-mt-5{margin-top:5px!important}.md-mt-6{margin-top:6px!important}.md-mt-8{margin-top:8px!important}.md-mt-10{margin-top:10px!important}.md-mt-12{margin-top:12px!important}.md-mt-15{margin-top:15px!important}.md-mt-16{margin-top:16px!important}.md-mt-18{margin-top:18px!important}.md-mt-20{margin-top:20px!important}.md-mt-22{margin-top:22px!important}.md-mt-24{margin-top:24px!important}.md-mt-25{margin-top:25px!important}.md-mt-26{margin-top:26px!important}.md-mt-28{margin-top:28px!important}.md-mt-30{margin-top:30px!important}.md-mt-32{margin-top:32px!important}.md-mt-34{margin-top:34px!important}.md-mt-36{margin-top:36px!important}.md-mt-40{margin-top:40px!important}.md-mt-44{margin-top:44px!important}.md-mt-46{margin-top:46px!important}.md-mt-48{margin-top:48px!important}.md-mt-50{margin-top:50px!important}.md-mt-52{margin-top:52px!important}.md-mt-60{margin-top:60px!important}.md-mt-64{margin-top:64px!important}.md-mt-70{margin-top:70px!important}.md-mt-76{margin-top:76px!important}.md-mt-80{margin-top:80px!important}.md-mt-96{margin-top:96px!important}.md-mt-100{margin-top:100px!important}.md-mr-0{margin-right:0!important}.md-mr-2{margin-right:2px!important}.md-mr-4{margin-right:4px!important}.md-mr-5{margin-right:5px!important}.md-mr-6{margin-right:6px!important}.md-mr-8{margin-right:8px!important}.md-mr-10{margin-right:10px!important}.md-mr-12{margin-right:12px!important}.md-mr-15{margin-right:15px!important}.md-mr-16{margin-right:16px!important}.md-mr-18{margin-right:18px!important}.md-mr-20{margin-right:20px!important}.md-mr-22{margin-right:22px!important}.md-mr-24{margin-right:24px!important}.md-mr-25{margin-right:25px!important}.md-mr-26{margin-right:26px!important}.md-mr-28{margin-right:28px!important}.md-mr-30{margin-right:30px!important}.md-mr-32{margin-right:32px!important}.md-mr-34{margin-right:34px!important}.md-mr-36{margin-right:36px!important}.md-mr-40{margin-right:40px!important}.md-mr-44{margin-right:44px!important}.md-mr-46{margin-right:46px!important}.md-mr-48{margin-right:48px!important}.md-mr-50{margin-right:50px!important}.md-mr-52{margin-right:52px!important}.md-mr-60{margin-right:60px!important}.md-mr-64{margin-right:64px!important}.md-mr-70{margin-right:70px!important}.md-mr-76{margin-right:76px!important}.md-mr-80{margin-right:80px!important}.md-mr-96{margin-right:96px!important}.md-mr-100{margin-right:100px!important}.md-mb-0{margin-bottom:0!important}.md-mb-2{margin-bottom:2px!important}.md-mb-4{margin-bottom:4px!important}.md-mb-5{margin-bottom:5px!important}.md-mb-6{margin-bottom:6px!important}.md-mb-8{margin-bottom:8px!important}.md-mb-10{margin-bottom:10px!important}.md-mb-12{margin-bottom:12px!important}.md-mb-15{margin-bottom:15px!important}.md-mb-16{margin-bottom:16px!important}.md-mb-18{margin-bottom:18px!important}.md-mb-20{margin-bottom:20px!important}.md-mb-22{margin-bottom:22px!important}.md-mb-24{margin-bottom:24px!important}.md-mb-25{margin-bottom:25px!important}.md-mb-26{margin-bottom:26px!important}.md-mb-28{margin-bottom:28px!important}.md-mb-30{margin-bottom:30px!important}.md-mb-32{margin-bottom:32px!important}.md-mb-34{margin-bottom:34px!important}.md-mb-36{margin-bottom:36px!important}.md-mb-40{margin-bottom:40px!important}.md-mb-44{margin-bottom:44px!important}.md-mb-46{margin-bottom:46px!important}.md-mb-48{margin-bottom:48px!important}.md-mb-50{margin-bottom:50px!important}.md-mb-52{margin-bottom:52px!important}.md-mb-60{margin-bottom:60px!important}.md-mb-64{margin-bottom:64px!important}.md-mb-70{margin-bottom:70px!important}.md-mb-76{margin-bottom:76px!important}.md-mb-80{margin-bottom:80px!important}.md-mb-96{margin-bottom:96px!important}.md-mb-100{margin-bottom:100px!important}.md-ml-0{margin-left:0!important}.md-ml-2{margin-left:2px!important}.md-ml-4{margin-left:4px!important}.md-ml-5{margin-left:5px!important}.md-ml-6{margin-left:6px!important}.md-ml-8{margin-left:8px!important}.md-ml-10{margin-left:10px!important}.md-ml-12{margin-left:12px!important}.md-ml-15{margin-left:15px!important}.md-ml-16{margin-left:16px!important}.md-ml-18{margin-left:18px!important}.md-ml-20{margin-left:20px!important}.md-ml-22{margin-left:22px!important}.md-ml-24{margin-left:24px!important}.md-ml-25{margin-left:25px!important}.md-ml-26{margin-left:26px!important}.md-ml-28{margin-left:28px!important}.md-ml-30{margin-left:30px!important}.md-ml-32{margin-left:32px!important}.md-ml-34{margin-left:34px!important}.md-ml-36{margin-left:36px!important}.md-ml-40{margin-left:40px!important}.md-ml-44{margin-left:44px!important}.md-ml-46{margin-left:46px!important}.md-ml-48{margin-left:48px!important}.md-ml-50{margin-left:50px!important}.md-ml-52{margin-left:52px!important}.md-ml-60{margin-left:60px!important}.md-ml-64{margin-left:64px!important}.md-ml-70{margin-left:70px!important}.md-ml-76{margin-left:76px!important}.md-ml-80{margin-left:80px!important}.md-ml-96{margin-left:96px!important}.md-ml-100{margin-left:100px!important}}@media screen and (min-width: 1440px){.lg-p-0{padding:0!important}.lg-p-2{padding:2px!important}.lg-p-4{padding:4px!important}.lg-p-5{padding:5px!important}.lg-p-6{padding:6px!important}.lg-p-8{padding:8px!important}.lg-p-10{padding:10px!important}.lg-p-12{padding:12px!important}.lg-p-15{padding:15px!important}.lg-p-16{padding:16px!important}.lg-p-18{padding:18px!important}.lg-p-20{padding:20px!important}.lg-p-22{padding:22px!important}.lg-p-24{padding:24px!important}.lg-p-25{padding:25px!important}.lg-p-26{padding:26px!important}.lg-p-28{padding:28px!important}.lg-p-30{padding:30px!important}.lg-p-32{padding:32px!important}.lg-p-34{padding:34px!important}.lg-p-36{padding:36px!important}.lg-p-40{padding:40px!important}.lg-p-44{padding:44px!important}.lg-p-46{padding:46px!important}.lg-p-48{padding:48px!important}.lg-p-50{padding:50px!important}.lg-p-52{padding:52px!important}.lg-p-60{padding:60px!important}.lg-p-64{padding:64px!important}.lg-p-70{padding:70px!important}.lg-p-76{padding:76px!important}.lg-p-80{padding:80px!important}.lg-p-96{padding:96px!important}.lg-p-100{padding:100px!important}.lg-pt-0{padding-top:0!important}.lg-pt-2{padding-top:2px!important}.lg-pt-4{padding-top:4px!important}.lg-pt-5{padding-top:5px!important}.lg-pt-6{padding-top:6px!important}.lg-pt-8{padding-top:8px!important}.lg-pt-10{padding-top:10px!important}.lg-pt-12{padding-top:12px!important}.lg-pt-15{padding-top:15px!important}.lg-pt-16{padding-top:16px!important}.lg-pt-18{padding-top:18px!important}.lg-pt-20{padding-top:20px!important}.lg-pt-22{padding-top:22px!important}.lg-pt-24{padding-top:24px!important}.lg-pt-25{padding-top:25px!important}.lg-pt-26{padding-top:26px!important}.lg-pt-28{padding-top:28px!important}.lg-pt-30{padding-top:30px!important}.lg-pt-32{padding-top:32px!important}.lg-pt-34{padding-top:34px!important}.lg-pt-36{padding-top:36px!important}.lg-pt-40{padding-top:40px!important}.lg-pt-44{padding-top:44px!important}.lg-pt-46{padding-top:46px!important}.lg-pt-48{padding-top:48px!important}.lg-pt-50{padding-top:50px!important}.lg-pt-52{padding-top:52px!important}.lg-pt-60{padding-top:60px!important}.lg-pt-64{padding-top:64px!important}.lg-pt-70{padding-top:70px!important}.lg-pt-76{padding-top:76px!important}.lg-pt-80{padding-top:80px!important}.lg-pt-96{padding-top:96px!important}.lg-pt-100{padding-top:100px!important}.lg-pr-0{padding-right:0!important}.lg-pr-2{padding-right:2px!important}.lg-pr-4{padding-right:4px!important}.lg-pr-5{padding-right:5px!important}.lg-pr-6{padding-right:6px!important}.lg-pr-8{padding-right:8px!important}.lg-pr-10{padding-right:10px!important}.lg-pr-12{padding-right:12px!important}.lg-pr-15{padding-right:15px!important}.lg-pr-16{padding-right:16px!important}.lg-pr-18{padding-right:18px!important}.lg-pr-20{padding-right:20px!important}.lg-pr-22{padding-right:22px!important}.lg-pr-24{padding-right:24px!important}.lg-pr-25{padding-right:25px!important}.lg-pr-26{padding-right:26px!important}.lg-pr-28{padding-right:28px!important}.lg-pr-30{padding-right:30px!important}.lg-pr-32{padding-right:32px!important}.lg-pr-34{padding-right:34px!important}.lg-pr-36{padding-right:36px!important}.lg-pr-40{padding-right:40px!important}.lg-pr-44{padding-right:44px!important}.lg-pr-46{padding-right:46px!important}.lg-pr-48{padding-right:48px!important}.lg-pr-50{padding-right:50px!important}.lg-pr-52{padding-right:52px!important}.lg-pr-60{padding-right:60px!important}.lg-pr-64{padding-right:64px!important}.lg-pr-70{padding-right:70px!important}.lg-pr-76{padding-right:76px!important}.lg-pr-80{padding-right:80px!important}.lg-pr-96{padding-right:96px!important}.lg-pr-100{padding-right:100px!important}.lg-pb-0{padding-bottom:0!important}.lg-pb-2{padding-bottom:2px!important}.lg-pb-4{padding-bottom:4px!important}.lg-pb-5{padding-bottom:5px!important}.lg-pb-6{padding-bottom:6px!important}.lg-pb-8{padding-bottom:8px!important}.lg-pb-10{padding-bottom:10px!important}.lg-pb-12{padding-bottom:12px!important}.lg-pb-15{padding-bottom:15px!important}.lg-pb-16{padding-bottom:16px!important}.lg-pb-18{padding-bottom:18px!important}.lg-pb-20{padding-bottom:20px!important}.lg-pb-22{padding-bottom:22px!important}.lg-pb-24{padding-bottom:24px!important}.lg-pb-25{padding-bottom:25px!important}.lg-pb-26{padding-bottom:26px!important}.lg-pb-28{padding-bottom:28px!important}.lg-pb-30{padding-bottom:30px!important}.lg-pb-32{padding-bottom:32px!important}.lg-pb-34{padding-bottom:34px!important}.lg-pb-36{padding-bottom:36px!important}.lg-pb-40{padding-bottom:40px!important}.lg-pb-44{padding-bottom:44px!important}.lg-pb-46{padding-bottom:46px!important}.lg-pb-48{padding-bottom:48px!important}.lg-pb-50{padding-bottom:50px!important}.lg-pb-52{padding-bottom:52px!important}.lg-pb-60{padding-bottom:60px!important}.lg-pb-64{padding-bottom:64px!important}.lg-pb-70{padding-bottom:70px!important}.lg-pb-76{padding-bottom:76px!important}.lg-pb-80{padding-bottom:80px!important}.lg-pb-96{padding-bottom:96px!important}.lg-pb-100{padding-bottom:100px!important}.lg-pl-0{padding-left:0!important}.lg-pl-2{padding-left:2px!important}.lg-pl-4{padding-left:4px!important}.lg-pl-5{padding-left:5px!important}.lg-pl-6{padding-left:6px!important}.lg-pl-8{padding-left:8px!important}.lg-pl-10{padding-left:10px!important}.lg-pl-12{padding-left:12px!important}.lg-pl-15{padding-left:15px!important}.lg-pl-16{padding-left:16px!important}.lg-pl-18{padding-left:18px!important}.lg-pl-20{padding-left:20px!important}.lg-pl-22{padding-left:22px!important}.lg-pl-24{padding-left:24px!important}.lg-pl-25{padding-left:25px!important}.lg-pl-26{padding-left:26px!important}.lg-pl-28{padding-left:28px!important}.lg-pl-30{padding-left:30px!important}.lg-pl-32{padding-left:32px!important}.lg-pl-34{padding-left:34px!important}.lg-pl-36{padding-left:36px!important}.lg-pl-40{padding-left:40px!important}.lg-pl-44{padding-left:44px!important}.lg-pl-46{padding-left:46px!important}.lg-pl-48{padding-left:48px!important}.lg-pl-50{padding-left:50px!important}.lg-pl-52{padding-left:52px!important}.lg-pl-60{padding-left:60px!important}.lg-pl-64{padding-left:64px!important}.lg-pl-70{padding-left:70px!important}.lg-pl-76{padding-left:76px!important}.lg-pl-80{padding-left:80px!important}.lg-pl-96{padding-left:96px!important}.lg-pl-100{padding-left:100px!important}.lg-m-0{margin:0!important}.lg-m-2{margin:2px!important}.lg-m-4{margin:4px!important}.lg-m-5{margin:5px!important}.lg-m-6{margin:6px!important}.lg-m-8{margin:8px!important}.lg-m-10{margin:10px!important}.lg-m-12{margin:12px!important}.lg-m-15{margin:15px!important}.lg-m-16{margin:16px!important}.lg-m-18{margin:18px!important}.lg-m-20{margin:20px!important}.lg-m-22{margin:22px!important}.lg-m-24{margin:24px!important}.lg-m-25{margin:25px!important}.lg-m-26{margin:26px!important}.lg-m-28{margin:28px!important}.lg-m-30{margin:30px!important}.lg-m-32{margin:32px!important}.lg-m-34{margin:34px!important}.lg-m-36{margin:36px!important}.lg-m-40{margin:40px!important}.lg-m-44{margin:44px!important}.lg-m-46{margin:46px!important}.lg-m-48{margin:48px!important}.lg-m-50{margin:50px!important}.lg-m-52{margin:52px!important}.lg-m-60{margin:60px!important}.lg-m-64{margin:64px!important}.lg-m-70{margin:70px!important}.lg-m-76{margin:76px!important}.lg-m-80{margin:80px!important}.lg-m-96{margin:96px!important}.lg-m-100{margin:100px!important}.lg-mt-0{margin-top:0!important}.lg-mt-2{margin-top:2px!important}.lg-mt-4{margin-top:4px!important}.lg-mt-5{margin-top:5px!important}.lg-mt-6{margin-top:6px!important}.lg-mt-8{margin-top:8px!important}.lg-mt-10{margin-top:10px!important}.lg-mt-12{margin-top:12px!important}.lg-mt-15{margin-top:15px!important}.lg-mt-16{margin-top:16px!important}.lg-mt-18{margin-top:18px!important}.lg-mt-20{margin-top:20px!important}.lg-mt-22{margin-top:22px!important}.lg-mt-24{margin-top:24px!important}.lg-mt-25{margin-top:25px!important}.lg-mt-26{margin-top:26px!important}.lg-mt-28{margin-top:28px!important}.lg-mt-30{margin-top:30px!important}.lg-mt-32{margin-top:32px!important}.lg-mt-34{margin-top:34px!important}.lg-mt-36{margin-top:36px!important}.lg-mt-40{margin-top:40px!important}.lg-mt-44{margin-top:44px!important}.lg-mt-46{margin-top:46px!important}.lg-mt-48{margin-top:48px!important}.lg-mt-50{margin-top:50px!important}.lg-mt-52{margin-top:52px!important}.lg-mt-60{margin-top:60px!important}.lg-mt-64{margin-top:64px!important}.lg-mt-70{margin-top:70px!important}.lg-mt-76{margin-top:76px!important}.lg-mt-80{margin-top:80px!important}.lg-mt-96{margin-top:96px!important}.lg-mt-100{margin-top:100px!important}.lg-mr-0{margin-right:0!important}.lg-mr-2{margin-right:2px!important}.lg-mr-4{margin-right:4px!important}.lg-mr-5{margin-right:5px!important}.lg-mr-6{margin-right:6px!important}.lg-mr-8{margin-right:8px!important}.lg-mr-10{margin-right:10px!important}.lg-mr-12{margin-right:12px!important}.lg-mr-15{margin-right:15px!important}.lg-mr-16{margin-right:16px!important}.lg-mr-18{margin-right:18px!important}.lg-mr-20{margin-right:20px!important}.lg-mr-22{margin-right:22px!important}.lg-mr-24{margin-right:24px!important}.lg-mr-25{margin-right:25px!important}.lg-mr-26{margin-right:26px!important}.lg-mr-28{margin-right:28px!important}.lg-mr-30{margin-right:30px!important}.lg-mr-32{margin-right:32px!important}.lg-mr-34{margin-right:34px!important}.lg-mr-36{margin-right:36px!important}.lg-mr-40{margin-right:40px!important}.lg-mr-44{margin-right:44px!important}.lg-mr-46{margin-right:46px!important}.lg-mr-48{margin-right:48px!important}.lg-mr-50{margin-right:50px!important}.lg-mr-52{margin-right:52px!important}.lg-mr-60{margin-right:60px!important}.lg-mr-64{margin-right:64px!important}.lg-mr-70{margin-right:70px!important}.lg-mr-76{margin-right:76px!important}.lg-mr-80{margin-right:80px!important}.lg-mr-96{margin-right:96px!important}.lg-mr-100{margin-right:100px!important}.lg-mb-0{margin-bottom:0!important}.lg-mb-2{margin-bottom:2px!important}.lg-mb-4{margin-bottom:4px!important}.lg-mb-5{margin-bottom:5px!important}.lg-mb-6{margin-bottom:6px!important}.lg-mb-8{margin-bottom:8px!important}.lg-mb-10{margin-bottom:10px!important}.lg-mb-12{margin-bottom:12px!important}.lg-mb-15{margin-bottom:15px!important}.lg-mb-16{margin-bottom:16px!important}.lg-mb-18{margin-bottom:18px!important}.lg-mb-20{margin-bottom:20px!important}.lg-mb-22{margin-bottom:22px!important}.lg-mb-24{margin-bottom:24px!important}.lg-mb-25{margin-bottom:25px!important}.lg-mb-26{margin-bottom:26px!important}.lg-mb-28{margin-bottom:28px!important}.lg-mb-30{margin-bottom:30px!important}.lg-mb-32{margin-bottom:32px!important}.lg-mb-34{margin-bottom:34px!important}.lg-mb-36{margin-bottom:36px!important}.lg-mb-40{margin-bottom:40px!important}.lg-mb-44{margin-bottom:44px!important}.lg-mb-46{margin-bottom:46px!important}.lg-mb-48{margin-bottom:48px!important}.lg-mb-50{margin-bottom:50px!important}.lg-mb-52{margin-bottom:52px!important}.lg-mb-60{margin-bottom:60px!important}.lg-mb-64{margin-bottom:64px!important}.lg-mb-70{margin-bottom:70px!important}.lg-mb-76{margin-bottom:76px!important}.lg-mb-80{margin-bottom:80px!important}.lg-mb-96{margin-bottom:96px!important}.lg-mb-100{margin-bottom:100px!important}.lg-ml-0{margin-left:0!important}.lg-ml-2{margin-left:2px!important}.lg-ml-4{margin-left:4px!important}.lg-ml-5{margin-left:5px!important}.lg-ml-6{margin-left:6px!important}.lg-ml-8{margin-left:8px!important}.lg-ml-10{margin-left:10px!important}.lg-ml-12{margin-left:12px!important}.lg-ml-15{margin-left:15px!important}.lg-ml-16{margin-left:16px!important}.lg-ml-18{margin-left:18px!important}.lg-ml-20{margin-left:20px!important}.lg-ml-22{margin-left:22px!important}.lg-ml-24{margin-left:24px!important}.lg-ml-25{margin-left:25px!important}.lg-ml-26{margin-left:26px!important}.lg-ml-28{margin-left:28px!important}.lg-ml-30{margin-left:30px!important}.lg-ml-32{margin-left:32px!important}.lg-ml-34{margin-left:34px!important}.lg-ml-36{margin-left:36px!important}.lg-ml-40{margin-left:40px!important}.lg-ml-44{margin-left:44px!important}.lg-ml-46{margin-left:46px!important}.lg-ml-48{margin-left:48px!important}.lg-ml-50{margin-left:50px!important}.lg-ml-52{margin-left:52px!important}.lg-ml-60{margin-left:60px!important}.lg-ml-64{margin-left:64px!important}.lg-ml-70{margin-left:70px!important}.lg-ml-76{margin-left:76px!important}.lg-ml-80{margin-left:80px!important}.lg-ml-96{margin-left:96px!important}.lg-ml-100{margin-left:100px!important}}.my-auto{margin-top:auto;margin-bottom:auto}.h-20{height:20%!important}.h-50{height:50%!important}.h-60{height:60%!important}.h-80{height:80%!important}.h-100{height:100%!important}.h-auto{height:auto%!important}.w-20{width:20%!important}.w-50{width:50%!important}.w-60{width:60%!important}.w-80{width:80%!important}.w-100{width:100%!important}.w-auto{width:auto%!important}@media screen and (min-width: 0px){.xs-h-20{height:20%!important}.xs-h-50{height:50%!important}.xs-h-60{height:60%!important}.xs-h-80{height:80%!important}.xs-h-100{height:100%!important}.xs-h-auto{height:auto%!important}.xs-w-20{width:20%!important}.xs-w-50{width:50%!important}.xs-w-60{width:60%!important}.xs-w-80{width:80%!important}.xs-w-100{width:100%!important}.xs-w-auto{width:auto%!important}}@media screen and (min-width: 640px){.sm-h-20{height:20%!important}.sm-h-50{height:50%!important}.sm-h-60{height:60%!important}.sm-h-80{height:80%!important}.sm-h-100{height:100%!important}.sm-h-auto{height:auto%!important}.sm-w-20{width:20%!important}.sm-w-50{width:50%!important}.sm-w-60{width:60%!important}.sm-w-80{width:80%!important}.sm-w-100{width:100%!important}.sm-w-auto{width:auto%!important}}@media screen and (min-width: 1100px){.md-h-20{height:20%!important}.md-h-50{height:50%!important}.md-h-60{height:60%!important}.md-h-80{height:80%!important}.md-h-100{height:100%!important}.md-h-auto{height:auto%!important}.md-w-20{width:20%!important}.md-w-50{width:50%!important}.md-w-60{width:60%!important}.md-w-80{width:80%!important}.md-w-100{width:100%!important}.md-w-auto{width:auto%!important}}@media screen and (min-width: 1440px){.lg-h-20{height:20%!important}.lg-h-50{height:50%!important}.lg-h-60{height:60%!important}.lg-h-80{height:80%!important}.lg-h-100{height:100%!important}.lg-h-auto{height:auto%!important}.lg-w-20{width:20%!important}.lg-w-50{width:50%!important}.lg-w-60{width:60%!important}.lg-w-80{width:80%!important}.lg-w-100{width:100%!important}.lg-w-auto{width:auto%!important}}.flex{display:flex}.flex-row{flex-direction:row!important}.flex-row-reverse{flex-direction:row-reverse!important}.flex-col{flex-direction:column!important}.flex-col-reverse{flex-direction:column-reverse!important}.flex-wrap{flex-wrap:wrap!important}.flex-nowrap{flex-wrap:nowrap!important}.flex-wrap-reverse{flex-wrap:wrap-reverse!important}.flex-fill{flex:1 1 auto!important}.flex-grow-0{flex-grow:0!important}.flex-grow-1{flex-grow:1!important}.flex-shrink-0{flex-shrink:0!important}.flex-shrink-1{flex-shrink:1!important}.flex-1{flex:1 1 0%!important}.justify-start{justify-content:flex-start!important}.justify-end{justify-content:flex-end!important}.justify-center{justify-content:center!important}.justify-between{justify-content:space-between!important}.justify-around{justify-content:space-around!important}.justify-self-start{justify-self:flex-start!important}.justify-self-end{justify-self:flex-end!important}.justify-self-center{justify-self:center!important}.justify-self-between{justify-self:space-between!important}.justify-self-around{justify-self:space-around!important}.align-self-start{align-self:flex-start!important}.align-self-end{align-self:flex-end!important}.align-self-center{align-self:center!important}.align-self-between{align-self:space-between!important}.align-self-around{align-self:space-around!important}.align-start{align-items:flex-start!important}.align-end{align-items:flex-end!important}.align-center{align-items:center!important}.align-baseline{align-items:baseline!important}.align-stretch{align-items:stretch!important}@media (min-width: 0px){.xs-flex-row{flex-direction:row!important}.xs-flex-col{flex-direction:column!important}.xs-flex-row-reverse{flex-direction:row-reverse!important}.xs-flex-col-reverse{flex-direction:column-reverse!important}.xs-flex-wrap{flex-wrap:wrap!important}.xs-flex-nowrap{flex-wrap:nowrap!important}.xs-flex-wrap-reverse{flex-wrap:wrap-reverse!important}.xs-flex-fill{flex:1 1 auto!important}.xs-flex-grow-0{flex-grow:0!important}.xs-flex-grow-1{flex-grow:1!important}.xs-flex-shrink-0{flex-shrink:0!important}.xs-flex-shrink-1{flex-shrink:1!important}.xs-justify-start{justify-content:flex-start!important}.xs-justify-end{justify-content:flex-end!important}.xs-justify-center{justify-content:center!important}.xs-justify-between{justify-content:space-between!important}.xs-justify-around{justify-content:space-around!important}.xs-justify-unset{justify-content:unset!important}.xs-align-start{align-items:flex-start!important}.xs-align-end{align-items:flex-end!important}.xs-align-center{align-items:center!important}.xs-align-baseline{align-items:baseline!important}.xs-align-stretch{align-items:stretch!important}.xs-align-unset{align-items:unset!important}.xs-justify-start{justify-self:flex-start!important}.xs-justify-self-end{justify-self:flex-end!important}.xs-justify-self-center{justify-self:center!important}.xs-justify-self-between{justify-self:space-between!important}.xs-justify-self-around{justify-self:space-around!important}.xs-align-content-start{align-content:flex-start!important}.xs-align-content-end{align-content:flex-end!important}.xs-align-content-center{align-content:center!important}.xs-align-content-between{align-content:space-between!important}.xs-align-content-around{align-content:space-around!important}.xs-align-content-stretch{align-content:stretch!important}.xs-align-self-auto{align-self:auto!important}.xs-align-self-start{align-self:flex-start!important}.xs-align-self-end{align-self:flex-end!important}.xs-align-self-center{align-self:center!important}.xs-align-self-baseline{align-self:baseline!important}.xs-align-self-stretch{align-self:stretch!important}}@media (min-width: 640px){.sm-flex-row{flex-direction:row!important}.sm-flex-col{flex-direction:column!important}.sm-flex-row-reverse{flex-direction:row-reverse!important}.sm-flex-col-reverse{flex-direction:column-reverse!important}.sm-flex-wrap{flex-wrap:wrap!important}.sm-flex-nowrap{flex-wrap:nowrap!important}.sm-flex-wrap-reverse{flex-wrap:wrap-reverse!important}.sm-flex-fill{flex:1 1 auto!important}.sm-flex-grow-0{flex-grow:0!important}.sm-flex-grow-1{flex-grow:1!important}.sm-flex-shrink-0{flex-shrink:0!important}.sm-flex-shrink-1{flex-shrink:1!important}.sm-justify-start{justify-content:flex-start!important}.sm-justify-end{justify-content:flex-end!important}.sm-justify-center{justify-content:center!important}.sm-justify-between{justify-content:space-between!important}.sm-justify-around{justify-content:space-around!important}.sm-justify-unset{justify-content:unset!important}.sm-align-start{align-items:flex-start!important}.sm-align-end{align-items:flex-end!important}.sm-align-center{align-items:center!important}.sm-align-baseline{align-items:baseline!important}.sm-align-stretch{align-items:stretch!important}.sm-align-unset{align-items:unset!important}.sm-justify-start{justify-self:flex-start!important}.sm-justify-self-end{justify-self:flex-end!important}.sm-justify-self-center{justify-self:center!important}.sm-justify-self-between{justify-self:space-between!important}.sm-justify-self-around{justify-self:space-around!important}.sm-align-content-start{align-content:flex-start!important}.sm-align-content-end{align-content:flex-end!important}.sm-align-content-center{align-content:center!important}.sm-align-content-between{align-content:space-between!important}.sm-align-content-around{align-content:space-around!important}.sm-align-content-stretch{align-content:stretch!important}.sm-align-self-auto{align-self:auto!important}.sm-align-self-start{align-self:flex-start!important}.sm-align-self-end{align-self:flex-end!important}.sm-align-self-center{align-self:center!important}.sm-align-self-baseline{align-self:baseline!important}.sm-align-self-stretch{align-self:stretch!important}}@media (min-width: 1100px){.md-flex-row{flex-direction:row!important}.md-flex-col{flex-direction:column!important}.md-flex-row-reverse{flex-direction:row-reverse!important}.md-flex-col-reverse{flex-direction:column-reverse!important}.md-flex-wrap{flex-wrap:wrap!important}.md-flex-nowrap{flex-wrap:nowrap!important}.md-flex-wrap-reverse{flex-wrap:wrap-reverse!important}.md-flex-fill{flex:1 1 auto!important}.md-flex-grow-0{flex-grow:0!important}.md-flex-grow-1{flex-grow:1!important}.md-flex-shrink-0{flex-shrink:0!important}.md-flex-shrink-1{flex-shrink:1!important}.md-justify-start{justify-content:flex-start!important}.md-justify-end{justify-content:flex-end!important}.md-justify-center{justify-content:center!important}.md-justify-between{justify-content:space-between!important}.md-justify-around{justify-content:space-around!important}.md-justify-unset{justify-content:unset!important}.md-align-start{align-items:flex-start!important}.md-align-end{align-items:flex-end!important}.md-align-center{align-items:center!important}.md-align-baseline{align-items:baseline!important}.md-align-stretch{align-items:stretch!important}.md-align-unset{align-items:unset!important}.md-justify-start{justify-self:flex-start!important}.md-justify-self-end{justify-self:flex-end!important}.md-justify-self-center{justify-self:center!important}.md-justify-self-between{justify-self:space-between!important}.md-justify-self-around{justify-self:space-around!important}.md-align-content-start{align-content:flex-start!important}.md-align-content-end{align-content:flex-end!important}.md-align-content-center{align-content:center!important}.md-align-content-between{align-content:space-between!important}.md-align-content-around{align-content:space-around!important}.md-align-content-stretch{align-content:stretch!important}.md-align-self-auto{align-self:auto!important}.md-align-self-start{align-self:flex-start!important}.md-align-self-end{align-self:flex-end!important}.md-align-self-center{align-self:center!important}.md-align-self-baseline{align-self:baseline!important}.md-align-self-stretch{align-self:stretch!important}}@media (min-width: 1440px){.lg-flex-row{flex-direction:row!important}.lg-flex-col{flex-direction:column!important}.lg-flex-row-reverse{flex-direction:row-reverse!important}.lg-flex-col-reverse{flex-direction:column-reverse!important}.lg-flex-wrap{flex-wrap:wrap!important}.lg-flex-nowrap{flex-wrap:nowrap!important}.lg-flex-wrap-reverse{flex-wrap:wrap-reverse!important}.lg-flex-fill{flex:1 1 auto!important}.lg-flex-grow-0{flex-grow:0!important}.lg-flex-grow-1{flex-grow:1!important}.lg-flex-shrink-0{flex-shrink:0!important}.lg-flex-shrink-1{flex-shrink:1!important}.lg-justify-start{justify-content:flex-start!important}.lg-justify-end{justify-content:flex-end!important}.lg-justify-center{justify-content:center!important}.lg-justify-between{justify-content:space-between!important}.lg-justify-around{justify-content:space-around!important}.lg-justify-unset{justify-content:unset!important}.lg-align-start{align-items:flex-start!important}.lg-align-end{align-items:flex-end!important}.lg-align-center{align-items:center!important}.lg-align-baseline{align-items:baseline!important}.lg-align-stretch{align-items:stretch!important}.lg-align-unset{align-items:unset!important}.lg-justify-start{justify-self:flex-start!important}.lg-justify-self-end{justify-self:flex-end!important}.lg-justify-self-center{justify-self:center!important}.lg-justify-self-between{justify-self:space-between!important}.lg-justify-self-around{justify-self:space-around!important}.lg-align-content-start{align-content:flex-start!important}.lg-align-content-end{align-content:flex-end!important}.lg-align-content-center{align-content:center!important}.lg-align-content-between{align-content:space-between!important}.lg-align-content-around{align-content:space-around!important}.lg-align-content-stretch{align-content:stretch!important}.lg-align-self-auto{align-self:auto!important}.lg-align-self-start{align-self:flex-start!important}.lg-align-self-end{align-self:flex-end!important}.lg-align-self-center{align-self:center!important}.lg-align-self-baseline{align-self:baseline!important}.lg-align-self-stretch{align-self:stretch!important}}.font_10_500{font-size:10px!important;font-weight:500!important}@media (min-width: 0px){.xs-font_10_500{font-size:10px!important;font-weight:500!important}}@media (min-width: 640px){.sm-font_10_500{font-size:10px!important;font-weight:500!important}}@media (min-width: 1100px){.md-font_10_500{font-size:10px!important;font-weight:500!important}}@media (min-width: 1440px){.lg-font_10_500{font-size:10px!important;font-weight:500!important}}.font_10_600{font-size:10px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_10_600{font-size:10px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_10_600{font-size:10px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_10_600{font-size:10px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_10_600{font-size:10px!important;font-weight:600!important}}.font_11_500{font-size:11px!important;font-weight:500!important}@media (min-width: 0px){.xs-font_11_500{font-size:11px!important;font-weight:500!important}}@media (min-width: 640px){.sm-font_11_500{font-size:11px!important;font-weight:500!important}}@media (min-width: 1100px){.md-font_11_500{font-size:11px!important;font-weight:500!important}}@media (min-width: 1440px){.lg-font_11_500{font-size:11px!important;font-weight:500!important}}.font_11_600{font-size:11px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_11_600{font-size:11px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_11_600{font-size:11px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_11_600{font-size:11px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_11_600{font-size:11px!important;font-weight:600!important}}.font_11_700{font-size:11px!important;font-weight:700!important}@media (min-width: 0px){.xs-font_11_700{font-size:11px!important;font-weight:700!important}}@media (min-width: 640px){.sm-font_11_700{font-size:11px!important;font-weight:700!important}}@media (min-width: 1100px){.md-font_11_700{font-size:11px!important;font-weight:700!important}}@media (min-width: 1440px){.lg-font_11_700{font-size:11px!important;font-weight:700!important}}.font_12_400{font-size:12px!important;font-weight:400!important}@media (min-width: 0px){.xs-font_12_400{font-size:12px!important;font-weight:400!important}}@media (min-width: 640px){.sm-font_12_400{font-size:12px!important;font-weight:400!important}}@media (min-width: 1100px){.md-font_12_400{font-size:12px!important;font-weight:400!important}}@media (min-width: 1440px){.lg-font_12_400{font-size:12px!important;font-weight:400!important}}.font_12_500{font-size:12px!important;font-weight:500!important}@media (min-width: 0px){.xs-font_12_500{font-size:12px!important;font-weight:500!important}}@media (min-width: 640px){.sm-font_12_500{font-size:12px!important;font-weight:500!important}}@media (min-width: 1100px){.md-font_12_500{font-size:12px!important;font-weight:500!important}}@media (min-width: 1440px){.lg-font_12_500{font-size:12px!important;font-weight:500!important}}.font_12_600{font-size:12px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_12_600{font-size:12px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_12_600{font-size:12px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_12_600{font-size:12px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_12_600{font-size:12px!important;font-weight:600!important}}.font_13_400{font-size:13px!important;font-weight:400!important}@media (min-width: 0px){.xs-font_13_400{font-size:13px!important;font-weight:400!important}}@media (min-width: 640px){.sm-font_13_400{font-size:13px!important;font-weight:400!important}}@media (min-width: 1100px){.md-font_13_400{font-size:13px!important;font-weight:400!important}}@media (min-width: 1440px){.lg-font_13_400{font-size:13px!important;font-weight:400!important}}.font_13_500{font-size:13px!important;font-weight:500!important}@media (min-width: 0px){.xs-font_13_500{font-size:13px!important;font-weight:500!important}}@media (min-width: 640px){.sm-font_13_500{font-size:13px!important;font-weight:500!important}}@media (min-width: 1100px){.md-font_13_500{font-size:13px!important;font-weight:500!important}}@media (min-width: 1440px){.lg-font_13_500{font-size:13px!important;font-weight:500!important}}.font_13_600{font-size:13px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_13_600{font-size:13px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_13_600{font-size:13px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_13_600{font-size:13px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_13_600{font-size:13px!important;font-weight:600!important}}.font_13_700{font-size:13px!important;font-weight:700!important}@media (min-width: 0px){.xs-font_13_700{font-size:13px!important;font-weight:700!important}}@media (min-width: 640px){.sm-font_13_700{font-size:13px!important;font-weight:700!important}}@media (min-width: 1100px){.md-font_13_700{font-size:13px!important;font-weight:700!important}}@media (min-width: 1440px){.lg-font_13_700{font-size:13px!important;font-weight:700!important}}.font_14_400{font-size:14px!important;font-weight:400!important}@media (min-width: 0px){.xs-font_14_400{font-size:14px!important;font-weight:400!important}}@media (min-width: 640px){.sm-font_14_400{font-size:14px!important;font-weight:400!important}}@media (min-width: 1100px){.md-font_14_400{font-size:14px!important;font-weight:400!important}}@media (min-width: 1440px){.lg-font_14_400{font-size:14px!important;font-weight:400!important}}.font_14_500{font-size:14px!important;font-weight:500!important}@media (min-width: 0px){.xs-font_14_500{font-size:14px!important;font-weight:500!important}}@media (min-width: 640px){.sm-font_14_500{font-size:14px!important;font-weight:500!important}}@media (min-width: 1100px){.md-font_14_500{font-size:14px!important;font-weight:500!important}}@media (min-width: 1440px){.lg-font_14_500{font-size:14px!important;font-weight:500!important}}.font_14_600{font-size:14px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_14_600{font-size:14px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_14_600{font-size:14px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_14_600{font-size:14px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_14_600{font-size:14px!important;font-weight:600!important}}.font_15_400{font-size:15px!important;font-weight:400!important}@media (min-width: 0px){.xs-font_15_400{font-size:15px!important;font-weight:400!important}}@media (min-width: 640px){.sm-font_15_400{font-size:15px!important;font-weight:400!important}}@media (min-width: 1100px){.md-font_15_400{font-size:15px!important;font-weight:400!important}}@media (min-width: 1440px){.lg-font_15_400{font-size:15px!important;font-weight:400!important}}.font_15_500{font-size:15px!important;font-weight:500!important}@media (min-width: 0px){.xs-font_15_500{font-size:15px!important;font-weight:500!important}}@media (min-width: 640px){.sm-font_15_500{font-size:15px!important;font-weight:500!important}}@media (min-width: 1100px){.md-font_15_500{font-size:15px!important;font-weight:500!important}}@media (min-width: 1440px){.lg-font_15_500{font-size:15px!important;font-weight:500!important}}.font_15_600{font-size:15px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_15_600{font-size:15px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_15_600{font-size:15px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_15_600{font-size:15px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_15_600{font-size:15px!important;font-weight:600!important}}.font_15_700{font-size:15px!important;font-weight:700!important}@media (min-width: 0px){.xs-font_15_700{font-size:15px!important;font-weight:700!important}}@media (min-width: 640px){.sm-font_15_700{font-size:15px!important;font-weight:700!important}}@media (min-width: 1100px){.md-font_15_700{font-size:15px!important;font-weight:700!important}}@media (min-width: 1440px){.lg-font_15_700{font-size:15px!important;font-weight:700!important}}.font_16_400{font-size:16px!important;font-weight:400!important}@media (min-width: 0px){.xs-font_16_400{font-size:16px!important;font-weight:400!important}}@media (min-width: 640px){.sm-font_16_400{font-size:16px!important;font-weight:400!important}}@media (min-width: 1100px){.md-font_16_400{font-size:16px!important;font-weight:400!important}}@media (min-width: 1440px){.lg-font_16_400{font-size:16px!important;font-weight:400!important}}.font_16_500{font-size:16px!important;font-weight:500!important}@media (min-width: 0px){.xs-font_16_500{font-size:16px!important;font-weight:500!important}}@media (min-width: 640px){.sm-font_16_500{font-size:16px!important;font-weight:500!important}}@media (min-width: 1100px){.md-font_16_500{font-size:16px!important;font-weight:500!important}}@media (min-width: 1440px){.lg-font_16_500{font-size:16px!important;font-weight:500!important}}.font_16_600{font-size:16px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_16_600{font-size:16px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_16_600{font-size:16px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_16_600{font-size:16px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_16_600{font-size:16px!important;font-weight:600!important}}.font_16_700{font-size:16px!important;font-weight:700!important}@media (min-width: 0px){.xs-font_16_700{font-size:16px!important;font-weight:700!important}}@media (min-width: 640px){.sm-font_16_700{font-size:16px!important;font-weight:700!important}}@media (min-width: 1100px){.md-font_16_700{font-size:16px!important;font-weight:700!important}}@media (min-width: 1440px){.lg-font_16_700{font-size:16px!important;font-weight:700!important}}.font_17_600{font-size:17px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_17_600{font-size:17px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_17_600{font-size:17px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_17_600{font-size:17px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_17_600{font-size:17px!important;font-weight:600!important}}.font_18_400{font-size:18px!important;font-weight:400!important}@media (min-width: 0px){.xs-font_18_400{font-size:18px!important;font-weight:400!important}}@media (min-width: 640px){.sm-font_18_400{font-size:18px!important;font-weight:400!important}}@media (min-width: 1100px){.md-font_18_400{font-size:18px!important;font-weight:400!important}}@media (min-width: 1440px){.lg-font_18_400{font-size:18px!important;font-weight:400!important}}.font_18_500{font-size:18px!important;font-weight:500!important}@media (min-width: 0px){.xs-font_18_500{font-size:18px!important;font-weight:500!important}}@media (min-width: 640px){.sm-font_18_500{font-size:18px!important;font-weight:500!important}}@media (min-width: 1100px){.md-font_18_500{font-size:18px!important;font-weight:500!important}}@media (min-width: 1440px){.lg-font_18_500{font-size:18px!important;font-weight:500!important}}.font_18_600{font-size:18px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_18_600{font-size:18px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_18_600{font-size:18px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_18_600{font-size:18px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_18_600{font-size:18px!important;font-weight:600!important}}.font_18_700{font-size:18px!important;font-weight:700!important}@media (min-width: 0px){.xs-font_18_700{font-size:18px!important;font-weight:700!important}}@media (min-width: 640px){.sm-font_18_700{font-size:18px!important;font-weight:700!important}}@media (min-width: 1100px){.md-font_18_700{font-size:18px!important;font-weight:700!important}}@media (min-width: 1440px){.lg-font_18_700{font-size:18px!important;font-weight:700!important}}.font_20_400{font-size:20px!important;font-weight:400!important}@media (min-width: 0px){.xs-font_20_400{font-size:20px!important;font-weight:400!important}}@media (min-width: 640px){.sm-font_20_400{font-size:20px!important;font-weight:400!important}}@media (min-width: 1100px){.md-font_20_400{font-size:20px!important;font-weight:400!important}}@media (min-width: 1440px){.lg-font_20_400{font-size:20px!important;font-weight:400!important}}.font_22_400{font-size:22px!important;font-weight:400!important}@media (min-width: 0px){.xs-font_22_400{font-size:22px!important;font-weight:400!important}}@media (min-width: 640px){.sm-font_22_400{font-size:22px!important;font-weight:400!important}}@media (min-width: 1100px){.md-font_22_400{font-size:22px!important;font-weight:400!important}}@media (min-width: 1440px){.lg-font_22_400{font-size:22px!important;font-weight:400!important}}.font_20_600{font-size:20px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_20_600{font-size:20px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_20_600{font-size:20px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_20_600{font-size:20px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_20_600{font-size:20px!important;font-weight:600!important}}.font_20_700{font-size:20px!important;font-weight:700!important}@media (min-width: 0px){.xs-font_20_700{font-size:20px!important;font-weight:700!important}}@media (min-width: 640px){.sm-font_20_700{font-size:20px!important;font-weight:700!important}}@media (min-width: 1100px){.md-font_20_700{font-size:20px!important;font-weight:700!important}}@media (min-width: 1440px){.lg-font_20_700{font-size:20px!important;font-weight:700!important}}.font_24_400{font-size:24px!important;font-weight:400!important}@media (min-width: 0px){.xs-font_24_400{font-size:24px!important;font-weight:400!important}}@media (min-width: 640px){.sm-font_24_400{font-size:24px!important;font-weight:400!important}}@media (min-width: 1100px){.md-font_24_400{font-size:24px!important;font-weight:400!important}}@media (min-width: 1440px){.lg-font_24_400{font-size:24px!important;font-weight:400!important}}.font_24_500{font-size:24px!important;font-weight:500!important}@media (min-width: 0px){.xs-font_24_500{font-size:24px!important;font-weight:500!important}}@media (min-width: 640px){.sm-font_24_500{font-size:24px!important;font-weight:500!important}}@media (min-width: 1100px){.md-font_24_500{font-size:24px!important;font-weight:500!important}}@media (min-width: 1440px){.lg-font_24_500{font-size:24px!important;font-weight:500!important}}.font_24_600{font-size:24px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_24_600{font-size:24px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_24_600{font-size:24px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_24_600{font-size:24px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_24_600{font-size:24px!important;font-weight:600!important}}.font_24_700{font-size:24px!important;font-weight:700!important}@media (min-width: 0px){.xs-font_24_700{font-size:24px!important;font-weight:700!important}}@media (min-width: 640px){.sm-font_24_700{font-size:24px!important;font-weight:700!important}}@media (min-width: 1100px){.md-font_24_700{font-size:24px!important;font-weight:700!important}}@media (min-width: 1440px){.lg-font_24_700{font-size:24px!important;font-weight:700!important}}.font_25_600{font-size:25px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_25_600{font-size:25px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_25_600{font-size:25px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_25_600{font-size:25px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_25_600{font-size:25px!important;font-weight:600!important}}.font_25_700{font-size:25px!important;font-weight:700!important}@media (min-width: 0px){.xs-font_25_700{font-size:25px!important;font-weight:700!important}}@media (min-width: 640px){.sm-font_25_700{font-size:25px!important;font-weight:700!important}}@media (min-width: 1100px){.md-font_25_700{font-size:25px!important;font-weight:700!important}}@media (min-width: 1440px){.lg-font_25_700{font-size:25px!important;font-weight:700!important}}.font_28_600{font-size:28px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_28_600{font-size:28px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_28_600{font-size:28px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_28_600{font-size:28px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_28_600{font-size:28px!important;font-weight:600!important}}.font_30_700{font-size:30px!important;font-weight:700!important}@media (min-width: 0px){.xs-font_30_700{font-size:30px!important;font-weight:700!important}}@media (min-width: 640px){.sm-font_30_700{font-size:30px!important;font-weight:700!important}}@media (min-width: 1100px){.md-font_30_700{font-size:30px!important;font-weight:700!important}}@media (min-width: 1440px){.lg-font_30_700{font-size:30px!important;font-weight:700!important}}.font_32_600{font-size:32px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_32_600{font-size:32px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_32_600{font-size:32px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_32_600{font-size:32px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_32_600{font-size:32px!important;font-weight:600!important}}.font_36_600{font-size:36px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_36_600{font-size:36px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_36_600{font-size:36px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_36_600{font-size:36px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_36_600{font-size:36px!important;font-weight:600!important}}.font_44_500{font-size:44px!important;font-weight:500!important}@media (min-width: 0px){.xs-font_44_500{font-size:44px!important;font-weight:500!important}}@media (min-width: 640px){.sm-font_44_500{font-size:44px!important;font-weight:500!important}}@media (min-width: 1100px){.md-font_44_500{font-size:44px!important;font-weight:500!important}}@media (min-width: 1440px){.lg-font_44_500{font-size:44px!important;font-weight:500!important}}.font_44_600{font-size:44px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_44_600{font-size:44px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_44_600{font-size:44px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_44_600{font-size:44px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_44_600{font-size:44px!important;font-weight:600!important}}.font_52_600{font-size:52px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_52_600{font-size:52px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_52_600{font-size:52px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_52_600{font-size:52px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_52_600{font-size:52px!important;font-weight:600!important}}.font_60_600{font-size:60px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_60_600{font-size:60px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_60_600{font-size:60px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_60_600{font-size:60px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_60_600{font-size:60px!important;font-weight:600!important}}.font_64_600{font-size:64px!important;font-weight:600!important}@media (min-width: 0px){.xs-font_64_600{font-size:64px!important;font-weight:600!important}}@media (min-width: 640px){.sm-font_64_600{font-size:64px!important;font-weight:600!important}}@media (min-width: 1100px){.md-font_64_600{font-size:64px!important;font-weight:600!important}}@media (min-width: 1440px){.lg-font_64_600{font-size:64px!important;font-weight:600!important}}.bg-primary{background-color:#b8eae1!important}.text-primary{color:#b8eae1!important}.b-primary{border-color:#b8eae1!important}@media (min-width: 0px){.xs-bg-primary{background-color:#b8eae1!important}.xs-text-primary{color:#b8eae1!important}}@media (min-width: 640px){.sm-bg-primary{background-color:#b8eae1!important}.sm-text-primary{color:#b8eae1!important}}@media (min-width: 1100px){.md-bg-primary{background-color:#b8eae1!important}.md-text-primary{color:#b8eae1!important}}@media (min-width: 1440px){.lg-bg-primary{background-color:#b8eae1!important}.lg-text-primary{color:#b8eae1!important}}.bg-secondary{background-color:#fff3f0!important}.text-secondary{color:#fff3f0!important}.b-secondary{border-color:#fff3f0!important}@media (min-width: 0px){.xs-bg-secondary{background-color:#fff3f0!important}.xs-text-secondary{color:#fff3f0!important}}@media (min-width: 640px){.sm-bg-secondary{background-color:#fff3f0!important}.sm-text-secondary{color:#fff3f0!important}}@media (min-width: 1100px){.md-bg-secondary{background-color:#fff3f0!important}.md-text-secondary{color:#fff3f0!important}}@media (min-width: 1440px){.lg-bg-secondary{background-color:#fff3f0!important}.lg-text-secondary{color:#fff3f0!important}}.bg-darkGrey{background-color:#282626!important}.text-darkGrey{color:#282626!important}.b-darkGrey{border-color:#282626!important}@media (min-width: 0px){.xs-bg-darkGrey{background-color:#282626!important}.xs-text-darkGrey{color:#282626!important}}@media (min-width: 640px){.sm-bg-darkGrey{background-color:#282626!important}.sm-text-darkGrey{color:#282626!important}}@media (min-width: 1100px){.md-bg-darkGrey{background-color:#282626!important}.md-text-darkGrey{color:#282626!important}}@media (min-width: 1440px){.lg-bg-darkGrey{background-color:#282626!important}.lg-text-darkGrey{color:#282626!important}}.bg-white{background-color:#fff!important}.text-white{color:#fff!important}.b-white{border-color:#fff!important}@media (min-width: 0px){.xs-bg-white{background-color:#fff!important}.xs-text-white{color:#fff!important}}@media (min-width: 640px){.sm-bg-white{background-color:#fff!important}.sm-text-white{color:#fff!important}}@media (min-width: 1100px){.md-bg-white{background-color:#fff!important}.md-text-white{color:#fff!important}}@media (min-width: 1440px){.lg-bg-white{background-color:#fff!important}.lg-text-white{color:#fff!important}}.bg-grey{background-color:#f9f9f9!important}.text-grey{color:#f9f9f9!important}.b-grey{border-color:#f9f9f9!important}@media (min-width: 0px){.xs-bg-grey{background-color:#f9f9f9!important}.xs-text-grey{color:#f9f9f9!important}}@media (min-width: 640px){.sm-bg-grey{background-color:#f9f9f9!important}.sm-text-grey{color:#f9f9f9!important}}@media (min-width: 1100px){.md-bg-grey{background-color:#f9f9f9!important}.md-text-grey{color:#f9f9f9!important}}@media (min-width: 1440px){.lg-bg-grey{background-color:#f9f9f9!important}.lg-text-grey{color:#f9f9f9!important}}.bg-light{background-color:#f0f0f0!important}.text-light{color:#f0f0f0!important}.b-light{border-color:#f0f0f0!important}@media (min-width: 0px){.xs-bg-light{background-color:#f0f0f0!important}.xs-text-light{color:#f0f0f0!important}}@media (min-width: 640px){.sm-bg-light{background-color:#f0f0f0!important}.sm-text-light{color:#f0f0f0!important}}@media (min-width: 1100px){.md-bg-light{background-color:#f0f0f0!important}.md-text-light{color:#f0f0f0!important}}@media (min-width: 1440px){.lg-bg-light{background-color:#f0f0f0!important}.lg-text-light{color:#f0f0f0!important}}.bg-muted{background-color:#6c757d!important}.text-muted{color:#6c757d!important}.b-muted{border-color:#6c757d!important}@media (min-width: 0px){.xs-bg-muted{background-color:#6c757d!important}.xs-text-muted{color:#6c757d!important}}@media (min-width: 640px){.sm-bg-muted{background-color:#6c757d!important}.sm-text-muted{color:#6c757d!important}}@media (min-width: 1100px){.md-bg-muted{background-color:#6c757d!important}.md-text-muted{color:#6c757d!important}}@media (min-width: 1440px){.lg-bg-muted{background-color:#6c757d!important}.lg-text-muted{color:#6c757d!important}}.bg-almostBlack{background-color:#090909!important}.text-almostBlack{color:#090909!important}.b-almostBlack{border-color:#090909!important}@media (min-width: 0px){.xs-bg-almostBlack{background-color:#090909!important}.xs-text-almostBlack{color:#090909!important}}@media (min-width: 640px){.sm-bg-almostBlack{background-color:#090909!important}.sm-text-almostBlack{color:#090909!important}}@media (min-width: 1100px){.md-bg-almostBlack{background-color:#090909!important}.md-text-almostBlack{color:#090909!important}}@media (min-width: 1440px){.lg-bg-almostBlack{background-color:#090909!important}.lg-text-almostBlack{color:#090909!important}}.bg-gooeyDanger{background-color:#dc3545!important}.text-gooeyDanger{color:#dc3545!important}.b-gooeyDanger{border-color:#dc3545!important}@media (min-width: 0px){.xs-bg-gooeyDanger{background-color:#dc3545!important}.xs-text-gooeyDanger{color:#dc3545!important}}@media (min-width: 640px){.sm-bg-gooeyDanger{background-color:#dc3545!important}.sm-text-gooeyDanger{color:#dc3545!important}}@media (min-width: 1100px){.md-bg-gooeyDanger{background-color:#dc3545!important}.md-text-gooeyDanger{color:#dc3545!important}}@media (min-width: 1440px){.lg-bg-gooeyDanger{background-color:#dc3545!important}.lg-text-gooeyDanger{color:#dc3545!important}}.text-capitalize{text-transform:capitalize}.hover-underline:hover{text-decoration:underline}.hover-grow:hover{transition:transform .1s ease-in;transform:scale(1.1);z-index:99}.hover-grow:active{transition:transform .1s ease-in;transform:scale(1)}.hover-bg-primary:hover{background-color:#b8eae1;color:#282626}[data-tooltip]{position:relative;z-index:2;cursor:pointer}[data-tooltip]:before,[data-tooltip]:after{visibility:hidden;opacity:0;pointer-events:none}[data-tooltip]:before{position:absolute;bottom:15%;left:calc(-100% - 8px);margin-bottom:5px;padding:7px;width:fit-content;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;background-color:#000;background-color:#333333e6;color:#fff;content:attr(data-tooltip);text-align:center;font-size:14px;line-height:1.2}[data-tooltip]:hover:before,[data-tooltip]:hover:after{visibility:visible;opacity:1}.br-large-right{border-radius:0 16px 16px 0}.br-large-left{border-radius:16px 0 0 16px}.text-underline{text-decoration:underline}.text-lowercase{text-transform:lowercase}.text-decoration-none{text-decoration:none}.translucent-text{opacity:.67}.br-default{border-radius:8px!important}.br-small{border-radius:4px!important}.br-large{border-radius:16px!important}.b-1{border:1px solid #eee}.b-btm-1{border-bottom:1px solid #eee}.b-top-1{border-top:1px solid #eee}.b-rt-1{border-right:1px solid #eee}.b-lt-1{border-left:1px solid #eee}.b-none{border:none!important}.overflow-hidden,.overflow-x-hidden{overflow:hidden}.overflow-scroll{overflow:scroll}.overflow-y-auto{overflow-y:auto}.overflow-x-clip{overflow-x:clip}.text-center{text-align:center}.text-left{text-align:left}.text-right{text-align:right}.br-circle{border-radius:50%}.cr-pointer{cursor:pointer}.stroke-white{stroke:#fff!important}.top-0{top:0}.left-0{left:0}.right-0{right:0}.h-header{height:56px}.mw-100{max-width:100%}@media (max-width: 1100px){.xs-text-center{text-align:center}.xs-b-none{border:none}}.gooey-scroll-wrapper{position:relative;overflow:hidden}.gooey-scroll-container{overflow:auto;scrollbar-width:none;-ms-overflow-style:none;padding-right:20px;white-space:nowrap}@media (max-width: 640px){.gooey-scroll-container{white-space:normal}}.gooey-scroll-container::-webkit-scrollbar{display:none}.gooey-scroll-fade{position:absolute;top:0;right:0;width:20px;height:100%;pointer-events:none;background:linear-gradient(to left,rgba(255,255,255,.8),transparent)}.d-flex{display:flex!important}.d-block{display:block!important}.d-none{display:none!important}.d-inline-block{display:inline-block!important}@media (min-width: 0px){.xs-d-flex{display:flex!important}.xs-d-block{display:block!important}.xs-d-none{display:none!important}.xs-d-inline-block{display:inline-block!important}}@media (min-width: 640px){.sm-d-flex{display:flex!important}.sm-d-block{display:block!important}.sm-d-none{display:none!important}.sm-d-inline-block{display:inline-block!important}}@media (min-width: 1100px){.md-d-flex{display:flex!important}.md-d-block{display:block!important}.md-d-none{display:none!important}.md-d-inline-block{display:inline-block!important}}@media (min-width: 1440px){.lg-d-flex{display:flex!important}.lg-d-block{display:block!important}.lg-d-none{display:none!important}.lg-d-inline-block{display:inline-block!important}}.pos-relative{position:relative!important}.pos-absolute{position:absolute!important}.pos-sticky{position:sticky!important}.pos-fixed{position:fixed!important}.pos-static{position:static!important}.pos-initial{position:initial!important}.pos-unset{position:unset!important}:export{primary:hsl(169,55%,82%);secondary:hsl(12,100%,97%);border-color:#eee;gooeyDanger:#dc3545}@keyframes popup{0%{opacity:0;transform:translateY(1000px)}30%{opacity:.6;transform:translateY(100px)}to{opacity:1;transform:translateY(0)}}@keyframes fade-in-A{0%{opacity:0;transition:opacity .2s ease}to{opacity:1}}.fade-in-A{animation:fade-in-A .3s ease .5s}.anim-typing{line-height:130%!important;opacity:1;width:100%;animation:typing .25s steps(30),blink-border .2s step-end infinite alternate;overflow:hidden;white-space:inherit}.text-reveal-container *:not(code,div,pre,ol,ul){opacity:1;animation:anim-textReveal .35s cubic-bezier(.43,.02,.06,.62) 0s forwards 1}@keyframes anim-textReveal{0%{opacity:0}to{opacity:1}}@keyframes typing{0%{opacity:0;width:0;white-space:nowrap}to{opacity:1;white-space:nowrap}}.anim-blink-self{animation:blink 1s infinite}.anim-blink{animation:border-blink .5s infinite}@keyframes border-blink{0%{opacity:0}to{opacity:1}}@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.bx-shadowA{box-shadow:#0000001a 0 1px 4px,#0003 0 2px 12px}.bx-shadowB{box-shadow:#00000026 0 15px 25px,#0000000d 0 5px 10px}.blur-edges{-webkit-filter:blur(5px);-moz-filter:blur(5px);-o-filter:blur(5px);-ms-filter:blur(5px);filter:blur(5px)}', Jr = '.gooey-embed-container * :not(code *){box-sizing:border-box;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica Neue,Arial,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}blockquote,dd,dl,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,p,pre,ul,ol,li{margin:0;padding:0}menu,ol,ul{list-style:none}.gooey-embed-container{height:100%}.gooey-embed-container p{color:unset}.gooey-embed-container a{color:inherit;text-decoration:underline;text-decoration-color:#00000073;text-decoration-thickness:.6px;text-underline-offset:.15em}.gooey-embed-container a:hover{color:inherit;text-decoration-color:#000;text-decoration-thickness:2px}div:focus-visible{outline:none}::-webkit-scrollbar{background:transparent;color:#fff;width:8px;height:8px}::-webkit-scrollbar-thumb{background:#0003;border-radius:0}code,code[class*=language-]{font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace!important;font-size:.9rem;color:inherit;white-space:pre-wrap;word-wrap:break-word;max-width:100%}pre,pre[class*=language-]{font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace!important;overflow:auto;word-wrap:break-word;padding:.8rem;margin:0 0 .9rem;border-radius:0 0 8px 8px}svg{fill:currentColor}';
function vi(t) {
  var e, n, i = "";
  if (typeof t == "string" || typeof t == "number") i += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var r = t.length;
    for (e = 0; e < r; e++) t[e] && (n = vi(t[e])) && (i && (i += " "), i += n);
  } else for (n in t) t[n] && (i && (i += " "), i += n);
  return i;
}
function L() {
  for (var t, e, n = 0, i = "", r = arguments.length; n < r; n++) (t = arguments[n]) && (e = vi(t)) && (i && (i += " "), i += e);
  return i;
}
const Y = ({
  className: t,
  variant: e = "text",
  onClick: n,
  ...i
}) => {
  const r = L(`button-${e == null ? void 0 : e.toLowerCase()}`, t);
  return /* @__PURE__ */ s("button", { ...i, className: r, onClick: n, children: i.children });
}, M = ({ children: t }) => /* @__PURE__ */ s(Bt, { children: t }), Ei = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ s(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      height: e,
      width: e,
      children: /* @__PURE__ */ s("path", { d: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z" })
    }
  ) });
}, Qr = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      height: e,
      width: e,
      children: [
        "// --!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.",
        /* @__PURE__ */ s("path", { d: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM192 160H320c17.7 0 32 14.3 32 32V320c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z" })
      ]
    }
  ) });
}, Si = (t) => {
  const e = t.size || 24;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ s(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 384 512",
      width: e,
      height: e,
      fill: "currentColor",
      ...t,
      children: /* @__PURE__ */ s("path", { d: "M240 96V256c0 26.5-21.5 48-48 48s-48-21.5-48-48V96c0-26.5 21.5-48 48-48s48 21.5 48 48zM96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96S96 43 96 96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" })
    }
  ) });
}, en = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: e,
      height: e,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ s("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ s("path", { d: "M18 6l-12 12" }),
        /* @__PURE__ */ s("path", { d: "M6 6l12 12" })
      ]
    }
  ) });
}, Ri = ({ size: t = 50 }) => {
  const e = {
    width: t + "px",
    height: t + "px",
    border: "2px solid #ccc",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "rotate 1s linear infinite"
  };
  return /* @__PURE__ */ s("div", { style: e });
}, to = { audio: !0 }, eo = (t) => {
  const { onCancel: e, onSend: n } = t, [i, r] = j(0), [a, o] = j(!1), [p, l] = j(!1), [m, d] = j([]), u = ht(null), [h, k] = j(!0);
  Q(() => {
    let v;
    return a && (v = setInterval(() => r(i + 1), 10)), () => clearInterval(v);
  }, [a, i]);
  const c = (v) => {
    const C = new MediaRecorder(v);
    u.current = C, C.start(), C.onstop = function() {
      v == null || v.getTracks().forEach((S) => S == null ? void 0 : S.stop());
    }, C.ondataavailable = function(S) {
      d((T) => [...T, S.data]);
    }, k(!1), o(!0);
  }, g = function(v) {
    console.log("The following error occured: " + v);
  }, f = () => {
    u.current && (u.current.stop(), o(!1));
  };
  Q(() => {
    var v, C, S, T, O, B;
    if (k(!0), navigator.mediaDevices.getUserMedia = ((v = navigator == null ? void 0 : navigator.mediaDevices) == null ? void 0 : v.getUserMedia) || // @ts-expect-error
    ((C = navigator == null ? void 0 : navigator.mediaDevices) == null ? void 0 : C.webkitGetUserMedia) || // @ts-expect-error
    ((S = navigator == null ? void 0 : navigator.mediaDevices) == null ? void 0 : S.mozGetUserMedia) || // @ts-expect-error
    ((T = navigator == null ? void 0 : navigator.mediaDevices) == null ? void 0 : T.msGetUserMedia), !((O = navigator == null ? void 0 : navigator.mediaDevices) != null && O.getUserMedia)) {
      console.error("The mediaDevices.getUserMedia() method is not supported.");
      return;
    }
    (B = navigator == null ? void 0 : navigator.mediaDevices) == null || B.getUserMedia(to).then(c, g);
  }, []), Q(() => {
    if (!p || !m.length) return;
    const v = new Blob(m, {
      type: "audio/mp3;codecs=mpeg"
    });
    d([]), n(v), l(!1);
  }, [m, n, p]);
  const b = () => {
    f(), e();
  }, y = () => {
    f(), l(!0);
  }, _ = Math.floor(i % 36e4 / 6e3), R = Math.floor(i % 6e3 / 100);
  return h ? /* @__PURE__ */ s("div", { className: "gpl-8 gpr-8 d-flex align-center justify-center gpb-25 w-100", children: /* @__PURE__ */ s(Ri, { size: 44 }) }) : /* @__PURE__ */ E("div", { className: "gpl-8 gpr-8 d-flex align-center gpb-25", children: [
    /* @__PURE__ */ s(
      Y,
      {
        variant: "text",
        className: "bg-light gp-8",
        style: { borderRadius: "100px", height: "44px" },
        onClick: b,
        children: /* @__PURE__ */ s(en, { size: "24" })
      }
    ),
    /* @__PURE__ */ E(
      "div",
      {
        className: "gml-24 d-flex b-1 gp-2 w-100 pos-relative justify-between align-center",
        style: {
          borderRadius: "40px",
          backgroundColor: "#fae1e1",
          height: "44px"
        },
        children: [
          /* @__PURE__ */ s("div", {}),
          /* @__PURE__ */ E("div", { className: "d-flex align-center", children: [
            /* @__PURE__ */ s(
              Si,
              {
                size: "16",
                className: "anim-blink-self text-gooeyDanger",
                style: {}
              }
            ),
            /* @__PURE__ */ E("p", { className: "gpl-4 text-gooeyDanger font_14_400", children: [
              _.toString().padStart(2, "0"),
              ":",
              R.toString().padStart(2, "0")
            ] })
          ] }),
          /* @__PURE__ */ s(
            Y,
            {
              onClick: y,
              variant: "text-alt",
              style: { height: "44px" },
              children: /* @__PURE__ */ s(Ei, { size: 24 })
            }
          )
        ]
      }
    )
  ] });
};
function no() {
  return /* @__PURE__ */ s("style", { children: Array.from(globalThis.addedStyles).join(`
`) });
}
function st(t) {
  globalThis.addedStyles = globalThis.addedStyles || /* @__PURE__ */ new Set(), globalThis.addedStyles.add(t);
}
const io = ":export{primary:hsl(169,55%,82%);secondary:hsl(12,100%,97%);border-color:#eee;gooeyDanger:#dc3545}.gooeyChat-chat-input{bottom:0;background:transparent}.gooeyChat-chat-input textarea{width:100%;outline:none;max-height:200px;height:44px;resize:none;position:relative}.gooeyChat-chat-input textarea:focus{outline:1px solid #f0f0f0}.input-left-buttons{position:absolute;left:4px;top:7px}.input-right-buttons{position:absolute;right:4px;top:3px}.file-preview-box img{height:80px;max-width:100px;object-fit:cover}.uploading-box{filter:brightness(.2)}", ro = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ s(
    "svg",
    {
      height: e,
      width: e,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 384 512",
      children: /* @__PURE__ */ s("path", { d: "M32 128C32 57.3 89.3 0 160 0s128 57.3 128 128V320c0 44.2-35.8 80-80 80s-80-35.8-80-80V160c0-17.7 14.3-32 32-32s32 14.3 32 32V320c0 8.8 7.2 16 16 16s16-7.2 16-16V128c0-35.3-28.7-64-64-64s-64 28.7-64 64V336c0 61.9 50.1 112 112 112s112-50.1 112-112V160c0-17.7 14.3-32 32-32s32 14.3 32 32V336c0 97.2-78.8 176-176 176s-176-78.8-176-176V128z" })
    }
  ) });
}, oo = ":export{primary:hsl(169,55%,82%);secondary:hsl(12,100%,97%);border-color:#eee;gooeyDanger:#dc3545}button{background:none transparent;display:block;padding-inline:0px;margin:0;padding-block:0px;border:1px solid transparent;cursor:pointer;display:flex;align-items:center;border-radius:8px;padding:8px;color:#090909;width:fit-content}button:disabled{color:#6c757d!important;fill:#f0f0f0;cursor:unset}button .btn-icon{position:absolute;top:50%;transform:translateY(-50%);right:0;z-index:2}button .icon-hover{opacity:0}button .btn-hide-overflow p{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}button:hover .icon-hover{opacity:1}.button-filled{background-color:#eee}.button-filled:hover{border:1px solid #0d0d0d}.button-outlined{border-radius:12px;background-color:#f5f5f5}.button-outlined:hover{background-color:#f0f0f0;scale:.98}.button-text:disabled:hover{border:1px solid transparent}.button-text:hover{border:1px solid #eee}.button-text:active:not(:disabled){background-color:#eee;color:#0d0d0d!important}.button-text:active:disabled{background-color:unset}#expand-collapse-button svg{transform:rotate(180deg)}.collapsible-button-expanded #expand-collapse-button>svg{transform:rotate(0);transition:transform .3s ease}.chevron-down>svg{transform:rotate(0);transition:transform .3s ease}.chevron-up>svg{transform:rotate(180deg);transition:transform .3s ease}.button-text-alt:hover{background-color:#f0f0f0}.collapsed-area{height:0px;transition:all .3s ease;opacity:0}.collapsed-area-expanded{transition:all .3s ease;height:100%;opacity:1}#expand-collapse-button{display:inline-flex;padding:1px!important;max-height:16px}";
st(oo);
const vt = ({
  // size = "medium",
  variant: t = "text",
  className: e = "",
  onClick: n,
  RightIconComponent: i,
  showIconOnHover: r,
  hideOverflow: a,
  ...o
}) => {
  const p = `button-${t == null ? void 0 : t.toLowerCase()}`;
  return /* @__PURE__ */ s(
    "button",
    {
      ...o,
      onMouseDown: n,
      className: p + " " + e,
      children: /* @__PURE__ */ E(
        "div",
        {
          className: L(
            "pos-relative w-100 h-100",
            a && "btn-hide-overflow"
          ),
          children: [
            o.children,
            i && /* @__PURE__ */ s(
              "div",
              {
                className: L(
                  "btn-icon right-icon",
                  "flex items-center justify-center",
                  r && "icon-hover"
                ),
                children: /* @__PURE__ */ s(i, {})
              }
            ),
            a && /* @__PURE__ */ s("div", { className: "button-right-blur" })
          ]
        }
      )
    }
  );
}, ao = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s("div", { className: "circular-loader", children: /* @__PURE__ */ s(
    "svg",
    {
      className: "circular",
      viewBox: "25 25 50 50",
      height: e,
      width: e,
      children: /* @__PURE__ */ s(
        "circle",
        {
          className: "path",
          cx: "50",
          cy: "50",
          r: "20",
          fill: "none",
          "stroke-width": "2",
          "stroke-miterlimit": "10"
        }
      )
    }
  ) });
}, po = ({ files: t }) => t ? /* @__PURE__ */ s("div", { className: "d-flex", style: { gap: "12px", flexWrap: "wrap" }, children: t.map((e, n) => {
  const { isUploading: i, name: r, data: a, removeFile: o } = e, p = URL.createObjectURL(a), l = e.type.split("/")[0];
  return /* @__PURE__ */ s("div", { className: "d-flex", children: l === "image" ? /* @__PURE__ */ E("div", { className: L("file-preview-box br-large pos-relative"), children: [
    i && /* @__PURE__ */ s(
      "div",
      {
        style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1
        },
        children: /* @__PURE__ */ s(ao, { size: 32 })
      }
    ),
    /* @__PURE__ */ s(
      "div",
      {
        style: {
          position: "absolute",
          top: "6px",
          right: "-16px",
          transform: "translate(-50%, -50%)",
          zIndex: 1
        },
        children: /* @__PURE__ */ s(vt, { className: "bg-white gp-4 b-1", onClick: o, children: /* @__PURE__ */ s(en, { size: 12 }) })
      }
    ),
    /* @__PURE__ */ s(
      "div",
      {
        className: L(
          i && "uploading-box",
          "overflow-hidden file-preview-box"
        ),
        children: /* @__PURE__ */ s("a", { href: p, target: "_blank", children: /* @__PURE__ */ s(
          "img",
          {
            src: p,
            alt: `preview-${r}`,
            className: "br-large b-1"
          }
        ) })
      }
    )
  ] }) : /* @__PURE__ */ s("div", { children: /* @__PURE__ */ s("p", { children: e.name }) }) }, n);
}) }) : null;
function Ti(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: so } = Object.prototype, { getPrototypeOf: nn } = Object, xe = /* @__PURE__ */ ((t) => (e) => {
  const n = so.call(e);
  return t[n] || (t[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), et = (t) => (t = t.toLowerCase(), (e) => xe(e) === t), be = (t) => (e) => typeof e === t, { isArray: Et } = Array, Dt = be("undefined");
function lo(t) {
  return t !== null && !Dt(t) && t.constructor !== null && !Dt(t.constructor) && K(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Ai = et("ArrayBuffer");
function mo(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Ai(t.buffer), e;
}
const co = be("string"), K = be("function"), Ci = be("number"), ye = (t) => t !== null && typeof t == "object", go = (t) => t === !0 || t === !1, ae = (t) => {
  if (xe(t) !== "object")
    return !1;
  const e = nn(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, uo = et("Date"), fo = et("File"), ho = et("Blob"), xo = et("FileList"), bo = (t) => ye(t) && K(t.pipe), yo = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || K(t.append) && ((e = xe(t)) === "formdata" || // detect form-data instance
  e === "object" && K(t.toString) && t.toString() === "[object FormData]"));
}, wo = et("URLSearchParams"), [ko, _o, vo, Eo] = ["ReadableStream", "Request", "Response", "Headers"].map(et), So = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ut(t, e, { allOwnKeys: n = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let i, r;
  if (typeof t != "object" && (t = [t]), Et(t))
    for (i = 0, r = t.length; i < r; i++)
      e.call(null, t[i], i, t);
  else {
    const a = n ? Object.getOwnPropertyNames(t) : Object.keys(t), o = a.length;
    let p;
    for (i = 0; i < o; i++)
      p = a[i], e.call(null, t[p], p, t);
  }
}
function zi(t, e) {
  e = e.toLowerCase();
  const n = Object.keys(t);
  let i = n.length, r;
  for (; i-- > 0; )
    if (r = n[i], e === r.toLowerCase())
      return r;
  return null;
}
const ut = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Oi = (t) => !Dt(t) && t !== ut;
function $e() {
  const { caseless: t } = Oi(this) && this || {}, e = {}, n = (i, r) => {
    const a = t && zi(e, r) || r;
    ae(e[a]) && ae(i) ? e[a] = $e(e[a], i) : ae(i) ? e[a] = $e({}, i) : Et(i) ? e[a] = i.slice() : e[a] = i;
  };
  for (let i = 0, r = arguments.length; i < r; i++)
    arguments[i] && Ut(arguments[i], n);
  return e;
}
const Ro = (t, e, n, { allOwnKeys: i } = {}) => (Ut(e, (r, a) => {
  n && K(r) ? t[a] = Ti(r, n) : t[a] = r;
}, { allOwnKeys: i }), t), To = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), Ao = (t, e, n, i) => {
  t.prototype = Object.create(e.prototype, i), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), n && Object.assign(t.prototype, n);
}, Co = (t, e, n, i) => {
  let r, a, o;
  const p = {};
  if (e = e || {}, t == null) return e;
  do {
    for (r = Object.getOwnPropertyNames(t), a = r.length; a-- > 0; )
      o = r[a], (!i || i(o, t, e)) && !p[o] && (e[o] = t[o], p[o] = !0);
    t = n !== !1 && nn(t);
  } while (t && (!n || n(t, e)) && t !== Object.prototype);
  return e;
}, zo = (t, e, n) => {
  t = String(t), (n === void 0 || n > t.length) && (n = t.length), n -= e.length;
  const i = t.indexOf(e, n);
  return i !== -1 && i === n;
}, Oo = (t) => {
  if (!t) return null;
  if (Et(t)) return t;
  let e = t.length;
  if (!Ci(e)) return null;
  const n = new Array(e);
  for (; e-- > 0; )
    n[e] = t[e];
  return n;
}, No = /* @__PURE__ */ ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && nn(Uint8Array)), Lo = (t, e) => {
  const i = (t && t[Symbol.iterator]).call(t);
  let r;
  for (; (r = i.next()) && !r.done; ) {
    const a = r.value;
    e.call(t, a[0], a[1]);
  }
}, Io = (t, e) => {
  let n;
  const i = [];
  for (; (n = t.exec(e)) !== null; )
    i.push(n);
  return i;
}, Fo = et("HTMLFormElement"), Mo = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, i, r) {
    return i.toUpperCase() + r;
  }
), On = (({ hasOwnProperty: t }) => (e, n) => t.call(e, n))(Object.prototype), Po = et("RegExp"), Ni = (t, e) => {
  const n = Object.getOwnPropertyDescriptors(t), i = {};
  Ut(n, (r, a) => {
    let o;
    (o = e(r, a, t)) !== !1 && (i[a] = o || r);
  }), Object.defineProperties(t, i);
}, Do = (t) => {
  Ni(t, (e, n) => {
    if (K(t) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const i = t[n];
    if (K(i)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, jo = (t, e) => {
  const n = {}, i = (r) => {
    r.forEach((a) => {
      n[a] = !0;
    });
  };
  return Et(t) ? i(t) : i(String(t).split(e)), n;
}, Bo = () => {
}, Uo = (t, e) => t != null && Number.isFinite(t = +t) ? t : e;
function $o(t) {
  return !!(t && K(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator]);
}
const Ho = (t) => {
  const e = new Array(10), n = (i, r) => {
    if (ye(i)) {
      if (e.indexOf(i) >= 0)
        return;
      if (!("toJSON" in i)) {
        e[r] = i;
        const a = Et(i) ? [] : {};
        return Ut(i, (o, p) => {
          const l = n(o, r + 1);
          !Dt(l) && (a[p] = l);
        }), e[r] = void 0, a;
      }
    }
    return i;
  };
  return n(t, 0);
}, Vo = et("AsyncFunction"), Go = (t) => t && (ye(t) || K(t)) && K(t.then) && K(t.catch), Li = ((t, e) => t ? setImmediate : e ? ((n, i) => (ut.addEventListener("message", ({ source: r, data: a }) => {
  r === ut && a === n && i.length && i.shift()();
}, !1), (r) => {
  i.push(r), ut.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  K(ut.postMessage)
), qo = typeof queueMicrotask < "u" ? queueMicrotask.bind(ut) : typeof process < "u" && process.nextTick || Li, x = {
  isArray: Et,
  isArrayBuffer: Ai,
  isBuffer: lo,
  isFormData: yo,
  isArrayBufferView: mo,
  isString: co,
  isNumber: Ci,
  isBoolean: go,
  isObject: ye,
  isPlainObject: ae,
  isReadableStream: ko,
  isRequest: _o,
  isResponse: vo,
  isHeaders: Eo,
  isUndefined: Dt,
  isDate: uo,
  isFile: fo,
  isBlob: ho,
  isRegExp: Po,
  isFunction: K,
  isStream: bo,
  isURLSearchParams: wo,
  isTypedArray: No,
  isFileList: xo,
  forEach: Ut,
  merge: $e,
  extend: Ro,
  trim: So,
  stripBOM: To,
  inherits: Ao,
  toFlatObject: Co,
  kindOf: xe,
  kindOfTest: et,
  endsWith: zo,
  toArray: Oo,
  forEachEntry: Lo,
  matchAll: Io,
  isHTMLForm: Fo,
  hasOwnProperty: On,
  hasOwnProp: On,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ni,
  freezeMethods: Do,
  toObjectSet: jo,
  toCamelCase: Mo,
  noop: Bo,
  toFiniteNumber: Uo,
  findKey: zi,
  global: ut,
  isContextDefined: Oi,
  isSpecCompliantForm: $o,
  toJSONObject: Ho,
  isAsyncFn: Vo,
  isThenable: Go,
  setImmediate: Li,
  asap: qo
};
function A(t, e, n, i, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), n && (this.config = n), i && (this.request = i), r && (this.response = r, this.status = r.status ? r.status : null);
}
x.inherits(A, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: x.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Ii = A.prototype, Fi = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((t) => {
  Fi[t] = { value: t };
});
Object.defineProperties(A, Fi);
Object.defineProperty(Ii, "isAxiosError", { value: !0 });
A.from = (t, e, n, i, r, a) => {
  const o = Object.create(Ii);
  return x.toFlatObject(t, o, function(l) {
    return l !== Error.prototype;
  }, (p) => p !== "isAxiosError"), A.call(o, t.message, e, n, i, r), o.cause = t, o.name = t.name, a && Object.assign(o, a), o;
};
const Zo = null;
function He(t) {
  return x.isPlainObject(t) || x.isArray(t);
}
function Mi(t) {
  return x.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Nn(t, e, n) {
  return t ? t.concat(e).map(function(r, a) {
    return r = Mi(r), !n && a ? "[" + r + "]" : r;
  }).join(n ? "." : "") : e;
}
function Wo(t) {
  return x.isArray(t) && !t.some(He);
}
const Xo = x.toFlatObject(x, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function we(t, e, n) {
  if (!x.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), n = x.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(g, f) {
    return !x.isUndefined(f[g]);
  });
  const i = n.metaTokens, r = n.visitor || d, a = n.dots, o = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && x.isSpecCompliantForm(e);
  if (!x.isFunction(r))
    throw new TypeError("visitor must be a function");
  function m(c) {
    if (c === null) return "";
    if (x.isDate(c))
      return c.toISOString();
    if (!l && x.isBlob(c))
      throw new A("Blob is not supported. Use a Buffer instead.");
    return x.isArrayBuffer(c) || x.isTypedArray(c) ? l && typeof Blob == "function" ? new Blob([c]) : Buffer.from(c) : c;
  }
  function d(c, g, f) {
    let b = c;
    if (c && !f && typeof c == "object") {
      if (x.endsWith(g, "{}"))
        g = i ? g : g.slice(0, -2), c = JSON.stringify(c);
      else if (x.isArray(c) && Wo(c) || (x.isFileList(c) || x.endsWith(g, "[]")) && (b = x.toArray(c)))
        return g = Mi(g), b.forEach(function(_, R) {
          !(x.isUndefined(_) || _ === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Nn([g], R, a) : o === null ? g : g + "[]",
            m(_)
          );
        }), !1;
    }
    return He(c) ? !0 : (e.append(Nn(f, g, a), m(c)), !1);
  }
  const u = [], h = Object.assign(Xo, {
    defaultVisitor: d,
    convertValue: m,
    isVisitable: He
  });
  function k(c, g) {
    if (!x.isUndefined(c)) {
      if (u.indexOf(c) !== -1)
        throw Error("Circular reference detected in " + g.join("."));
      u.push(c), x.forEach(c, function(b, y) {
        (!(x.isUndefined(b) || b === null) && r.call(
          e,
          b,
          x.isString(y) ? y.trim() : y,
          g,
          h
        )) === !0 && k(b, g ? g.concat(y) : [y]);
      }), u.pop();
    }
  }
  if (!x.isObject(t))
    throw new TypeError("data must be an object");
  return k(t), e;
}
function Ln(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(i) {
    return e[i];
  });
}
function rn(t, e) {
  this._pairs = [], t && we(t, this, e);
}
const Pi = rn.prototype;
Pi.append = function(e, n) {
  this._pairs.push([e, n]);
};
Pi.toString = function(e) {
  const n = e ? function(i) {
    return e.call(this, i, Ln);
  } : Ln;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function Yo(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Di(t, e, n) {
  if (!e)
    return t;
  const i = n && n.encode || Yo;
  x.isFunction(n) && (n = {
    serialize: n
  });
  const r = n && n.serialize;
  let a;
  if (r ? a = r(e, n) : a = x.isURLSearchParams(e) ? e.toString() : new rn(e, n).toString(i), a) {
    const o = t.indexOf("#");
    o !== -1 && (t = t.slice(0, o)), t += (t.indexOf("?") === -1 ? "?" : "&") + a;
  }
  return t;
}
class In {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, n, i) {
    return this.handlers.push({
      fulfilled: e,
      rejected: n,
      synchronous: i ? i.synchronous : !1,
      runWhen: i ? i.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    x.forEach(this.handlers, function(i) {
      i !== null && e(i);
    });
  }
}
const ji = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ko = typeof URLSearchParams < "u" ? URLSearchParams : rn, Jo = typeof FormData < "u" ? FormData : null, Qo = typeof Blob < "u" ? Blob : null, ta = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ko,
    FormData: Jo,
    Blob: Qo
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, on = typeof window < "u" && typeof document < "u", Ve = typeof navigator == "object" && navigator || void 0, ea = on && (!Ve || ["ReactNative", "NativeScript", "NS"].indexOf(Ve.product) < 0), na = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", ia = on && window.location.href || "http://localhost", ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: on,
  hasStandardBrowserEnv: ea,
  hasStandardBrowserWebWorkerEnv: na,
  navigator: Ve,
  origin: ia
}, Symbol.toStringTag, { value: "Module" })), H = {
  ...ra,
  ...ta
};
function oa(t, e) {
  return we(t, new H.classes.URLSearchParams(), Object.assign({
    visitor: function(n, i, r, a) {
      return H.isNode && x.isBuffer(n) ? (this.append(i, n.toString("base64")), !1) : a.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function aa(t) {
  return x.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function pa(t) {
  const e = {}, n = Object.keys(t);
  let i;
  const r = n.length;
  let a;
  for (i = 0; i < r; i++)
    a = n[i], e[a] = t[a];
  return e;
}
function Bi(t) {
  function e(n, i, r, a) {
    let o = n[a++];
    if (o === "__proto__") return !0;
    const p = Number.isFinite(+o), l = a >= n.length;
    return o = !o && x.isArray(r) ? r.length : o, l ? (x.hasOwnProp(r, o) ? r[o] = [r[o], i] : r[o] = i, !p) : ((!r[o] || !x.isObject(r[o])) && (r[o] = []), e(n, i, r[o], a) && x.isArray(r[o]) && (r[o] = pa(r[o])), !p);
  }
  if (x.isFormData(t) && x.isFunction(t.entries)) {
    const n = {};
    return x.forEachEntry(t, (i, r) => {
      e(aa(i), r, n, 0);
    }), n;
  }
  return null;
}
function sa(t, e, n) {
  if (x.isString(t))
    try {
      return (e || JSON.parse)(t), x.trim(t);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (n || JSON.stringify)(t);
}
const $t = {
  transitional: ji,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(e, n) {
    const i = n.getContentType() || "", r = i.indexOf("application/json") > -1, a = x.isObject(e);
    if (a && x.isHTMLForm(e) && (e = new FormData(e)), x.isFormData(e))
      return r ? JSON.stringify(Bi(e)) : e;
    if (x.isArrayBuffer(e) || x.isBuffer(e) || x.isStream(e) || x.isFile(e) || x.isBlob(e) || x.isReadableStream(e))
      return e;
    if (x.isArrayBufferView(e))
      return e.buffer;
    if (x.isURLSearchParams(e))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let p;
    if (a) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return oa(e, this.formSerializer).toString();
      if ((p = x.isFileList(e)) || i.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return we(
          p ? { "files[]": e } : e,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return a || r ? (n.setContentType("application/json", !1), sa(e)) : e;
  }],
  transformResponse: [function(e) {
    const n = this.transitional || $t.transitional, i = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (x.isResponse(e) || x.isReadableStream(e))
      return e;
    if (e && x.isString(e) && (i && !this.responseType || r)) {
      const o = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(e);
      } catch (p) {
        if (o)
          throw p.name === "SyntaxError" ? A.from(p, A.ERR_BAD_RESPONSE, this, null, this.response) : p;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: H.classes.FormData,
    Blob: H.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
x.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  $t.headers[t] = {};
});
const la = x.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), ma = (t) => {
  const e = {};
  let n, i, r;
  return t && t.split(`
`).forEach(function(o) {
    r = o.indexOf(":"), n = o.substring(0, r).trim().toLowerCase(), i = o.substring(r + 1).trim(), !(!n || e[n] && la[n]) && (n === "set-cookie" ? e[n] ? e[n].push(i) : e[n] = [i] : e[n] = e[n] ? e[n] + ", " + i : i);
  }), e;
}, Fn = Symbol("internals");
function Tt(t) {
  return t && String(t).trim().toLowerCase();
}
function pe(t) {
  return t === !1 || t == null ? t : x.isArray(t) ? t.map(pe) : String(t);
}
function da(t) {
  const e = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = n.exec(t); )
    e[i[1]] = i[2];
  return e;
}
const ca = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Pe(t, e, n, i, r) {
  if (x.isFunction(i))
    return i.call(this, e, n);
  if (r && (e = n), !!x.isString(e)) {
    if (x.isString(i))
      return e.indexOf(i) !== -1;
    if (x.isRegExp(i))
      return i.test(e);
  }
}
function ga(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, n, i) => n.toUpperCase() + i);
}
function ua(t, e) {
  const n = x.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(t, i + n, {
      value: function(r, a, o) {
        return this[i].call(this, e, r, a, o);
      },
      configurable: !0
    });
  });
}
let q = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, n, i) {
    const r = this;
    function a(p, l, m) {
      const d = Tt(l);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const u = x.findKey(r, d);
      (!u || r[u] === void 0 || m === !0 || m === void 0 && r[u] !== !1) && (r[u || l] = pe(p));
    }
    const o = (p, l) => x.forEach(p, (m, d) => a(m, d, l));
    if (x.isPlainObject(e) || e instanceof this.constructor)
      o(e, n);
    else if (x.isString(e) && (e = e.trim()) && !ca(e))
      o(ma(e), n);
    else if (x.isHeaders(e))
      for (const [p, l] of e.entries())
        a(l, p, i);
    else
      e != null && a(n, e, i);
    return this;
  }
  get(e, n) {
    if (e = Tt(e), e) {
      const i = x.findKey(this, e);
      if (i) {
        const r = this[i];
        if (!n)
          return r;
        if (n === !0)
          return da(r);
        if (x.isFunction(n))
          return n.call(this, r, i);
        if (x.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, n) {
    if (e = Tt(e), e) {
      const i = x.findKey(this, e);
      return !!(i && this[i] !== void 0 && (!n || Pe(this, this[i], i, n)));
    }
    return !1;
  }
  delete(e, n) {
    const i = this;
    let r = !1;
    function a(o) {
      if (o = Tt(o), o) {
        const p = x.findKey(i, o);
        p && (!n || Pe(i, i[p], p, n)) && (delete i[p], r = !0);
      }
    }
    return x.isArray(e) ? e.forEach(a) : a(e), r;
  }
  clear(e) {
    const n = Object.keys(this);
    let i = n.length, r = !1;
    for (; i--; ) {
      const a = n[i];
      (!e || Pe(this, this[a], a, e, !0)) && (delete this[a], r = !0);
    }
    return r;
  }
  normalize(e) {
    const n = this, i = {};
    return x.forEach(this, (r, a) => {
      const o = x.findKey(i, a);
      if (o) {
        n[o] = pe(r), delete n[a];
        return;
      }
      const p = e ? ga(a) : String(a).trim();
      p !== a && delete n[a], n[p] = pe(r), i[p] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const n = /* @__PURE__ */ Object.create(null);
    return x.forEach(this, (i, r) => {
      i != null && i !== !1 && (n[r] = e && x.isArray(i) ? i.join(", ") : i);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, n]) => e + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...n) {
    const i = new this(e);
    return n.forEach((r) => i.set(r)), i;
  }
  static accessor(e) {
    const i = (this[Fn] = this[Fn] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function a(o) {
      const p = Tt(o);
      i[p] || (ua(r, o), i[p] = !0);
    }
    return x.isArray(e) ? e.forEach(a) : a(e), this;
  }
};
q.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
x.reduceDescriptors(q.prototype, ({ value: t }, e) => {
  let n = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(i) {
      this[n] = i;
    }
  };
});
x.freezeMethods(q);
function De(t, e) {
  const n = this || $t, i = e || n, r = q.from(i.headers);
  let a = i.data;
  return x.forEach(t, function(p) {
    a = p.call(n, a, r.normalize(), e ? e.status : void 0);
  }), r.normalize(), a;
}
function Ui(t) {
  return !!(t && t.__CANCEL__);
}
function St(t, e, n) {
  A.call(this, t ?? "canceled", A.ERR_CANCELED, e, n), this.name = "CanceledError";
}
x.inherits(St, A, {
  __CANCEL__: !0
});
function $i(t, e, n) {
  const i = n.config.validateStatus;
  !n.status || !i || i(n.status) ? t(n) : e(new A(
    "Request failed with status code " + n.status,
    [A.ERR_BAD_REQUEST, A.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function fa(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function ha(t, e) {
  t = t || 10;
  const n = new Array(t), i = new Array(t);
  let r = 0, a = 0, o;
  return e = e !== void 0 ? e : 1e3, function(l) {
    const m = Date.now(), d = i[a];
    o || (o = m), n[r] = l, i[r] = m;
    let u = a, h = 0;
    for (; u !== r; )
      h += n[u++], u = u % t;
    if (r = (r + 1) % t, r === a && (a = (a + 1) % t), m - o < e)
      return;
    const k = d && m - d;
    return k ? Math.round(h * 1e3 / k) : void 0;
  };
}
function xa(t, e) {
  let n = 0, i = 1e3 / e, r, a;
  const o = (m, d = Date.now()) => {
    n = d, r = null, a && (clearTimeout(a), a = null), t.apply(null, m);
  };
  return [(...m) => {
    const d = Date.now(), u = d - n;
    u >= i ? o(m, d) : (r = m, a || (a = setTimeout(() => {
      a = null, o(r);
    }, i - u)));
  }, () => r && o(r)];
}
const le = (t, e, n = 3) => {
  let i = 0;
  const r = ha(50, 250);
  return xa((a) => {
    const o = a.loaded, p = a.lengthComputable ? a.total : void 0, l = o - i, m = r(l), d = o <= p;
    i = o;
    const u = {
      loaded: o,
      total: p,
      progress: p ? o / p : void 0,
      bytes: l,
      rate: m || void 0,
      estimated: m && p && d ? (p - o) / m : void 0,
      event: a,
      lengthComputable: p != null,
      [e ? "download" : "upload"]: !0
    };
    t(u);
  }, n);
}, Mn = (t, e) => {
  const n = t != null;
  return [(i) => e[0]({
    lengthComputable: n,
    total: t,
    loaded: i
  }), e[1]];
}, Pn = (t) => (...e) => x.asap(() => t(...e)), ba = H.hasStandardBrowserEnv ? /* @__PURE__ */ ((t, e) => (n) => (n = new URL(n, H.origin), t.protocol === n.protocol && t.host === n.host && (e || t.port === n.port)))(
  new URL(H.origin),
  H.navigator && /(msie|trident)/i.test(H.navigator.userAgent)
) : () => !0, ya = H.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(t, e, n, i, r, a) {
      const o = [t + "=" + encodeURIComponent(e)];
      x.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), x.isString(i) && o.push("path=" + i), x.isString(r) && o.push("domain=" + r), a === !0 && o.push("secure"), document.cookie = o.join("; ");
    },
    read(t) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(t) {
      this.write(t, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function wa(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function ka(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function Hi(t, e, n) {
  let i = !wa(e);
  return t && (i || n == !1) ? ka(t, e) : e;
}
const Dn = (t) => t instanceof q ? { ...t } : t;
function xt(t, e) {
  e = e || {};
  const n = {};
  function i(m, d, u, h) {
    return x.isPlainObject(m) && x.isPlainObject(d) ? x.merge.call({ caseless: h }, m, d) : x.isPlainObject(d) ? x.merge({}, d) : x.isArray(d) ? d.slice() : d;
  }
  function r(m, d, u, h) {
    if (x.isUndefined(d)) {
      if (!x.isUndefined(m))
        return i(void 0, m, u, h);
    } else return i(m, d, u, h);
  }
  function a(m, d) {
    if (!x.isUndefined(d))
      return i(void 0, d);
  }
  function o(m, d) {
    if (x.isUndefined(d)) {
      if (!x.isUndefined(m))
        return i(void 0, m);
    } else return i(void 0, d);
  }
  function p(m, d, u) {
    if (u in e)
      return i(m, d);
    if (u in t)
      return i(void 0, m);
  }
  const l = {
    url: a,
    method: a,
    data: a,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: p,
    headers: (m, d, u) => r(Dn(m), Dn(d), u, !0)
  };
  return x.forEach(Object.keys(Object.assign({}, t, e)), function(d) {
    const u = l[d] || r, h = u(t[d], e[d], d);
    x.isUndefined(h) && u !== p || (n[d] = h);
  }), n;
}
const Vi = (t) => {
  const e = xt({}, t);
  let { data: n, withXSRFToken: i, xsrfHeaderName: r, xsrfCookieName: a, headers: o, auth: p } = e;
  e.headers = o = q.from(o), e.url = Di(Hi(e.baseURL, e.url, e.allowAbsoluteUrls), t.params, t.paramsSerializer), p && o.set(
    "Authorization",
    "Basic " + btoa((p.username || "") + ":" + (p.password ? unescape(encodeURIComponent(p.password)) : ""))
  );
  let l;
  if (x.isFormData(n)) {
    if (H.hasStandardBrowserEnv || H.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if ((l = o.getContentType()) !== !1) {
      const [m, ...d] = l ? l.split(";").map((u) => u.trim()).filter(Boolean) : [];
      o.setContentType([m || "multipart/form-data", ...d].join("; "));
    }
  }
  if (H.hasStandardBrowserEnv && (i && x.isFunction(i) && (i = i(e)), i || i !== !1 && ba(e.url))) {
    const m = r && a && ya.read(a);
    m && o.set(r, m);
  }
  return e;
}, _a = typeof XMLHttpRequest < "u", va = _a && function(t) {
  return new Promise(function(n, i) {
    const r = Vi(t);
    let a = r.data;
    const o = q.from(r.headers).normalize();
    let { responseType: p, onUploadProgress: l, onDownloadProgress: m } = r, d, u, h, k, c;
    function g() {
      k && k(), c && c(), r.cancelToken && r.cancelToken.unsubscribe(d), r.signal && r.signal.removeEventListener("abort", d);
    }
    let f = new XMLHttpRequest();
    f.open(r.method.toUpperCase(), r.url, !0), f.timeout = r.timeout;
    function b() {
      if (!f)
        return;
      const _ = q.from(
        "getAllResponseHeaders" in f && f.getAllResponseHeaders()
      ), v = {
        data: !p || p === "text" || p === "json" ? f.responseText : f.response,
        status: f.status,
        statusText: f.statusText,
        headers: _,
        config: t,
        request: f
      };
      $i(function(S) {
        n(S), g();
      }, function(S) {
        i(S), g();
      }, v), f = null;
    }
    "onloadend" in f ? f.onloadend = b : f.onreadystatechange = function() {
      !f || f.readyState !== 4 || f.status === 0 && !(f.responseURL && f.responseURL.indexOf("file:") === 0) || setTimeout(b);
    }, f.onabort = function() {
      f && (i(new A("Request aborted", A.ECONNABORTED, t, f)), f = null);
    }, f.onerror = function() {
      i(new A("Network Error", A.ERR_NETWORK, t, f)), f = null;
    }, f.ontimeout = function() {
      let R = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const v = r.transitional || ji;
      r.timeoutErrorMessage && (R = r.timeoutErrorMessage), i(new A(
        R,
        v.clarifyTimeoutError ? A.ETIMEDOUT : A.ECONNABORTED,
        t,
        f
      )), f = null;
    }, a === void 0 && o.setContentType(null), "setRequestHeader" in f && x.forEach(o.toJSON(), function(R, v) {
      f.setRequestHeader(v, R);
    }), x.isUndefined(r.withCredentials) || (f.withCredentials = !!r.withCredentials), p && p !== "json" && (f.responseType = r.responseType), m && ([h, c] = le(m, !0), f.addEventListener("progress", h)), l && f.upload && ([u, k] = le(l), f.upload.addEventListener("progress", u), f.upload.addEventListener("loadend", k)), (r.cancelToken || r.signal) && (d = (_) => {
      f && (i(!_ || _.type ? new St(null, t, f) : _), f.abort(), f = null);
    }, r.cancelToken && r.cancelToken.subscribe(d), r.signal && (r.signal.aborted ? d() : r.signal.addEventListener("abort", d)));
    const y = fa(r.url);
    if (y && H.protocols.indexOf(y) === -1) {
      i(new A("Unsupported protocol " + y + ":", A.ERR_BAD_REQUEST, t));
      return;
    }
    f.send(a || null);
  });
}, Ea = (t, e) => {
  const { length: n } = t = t ? t.filter(Boolean) : [];
  if (e || n) {
    let i = new AbortController(), r;
    const a = function(m) {
      if (!r) {
        r = !0, p();
        const d = m instanceof Error ? m : this.reason;
        i.abort(d instanceof A ? d : new St(d instanceof Error ? d.message : d));
      }
    };
    let o = e && setTimeout(() => {
      o = null, a(new A(`timeout ${e} of ms exceeded`, A.ETIMEDOUT));
    }, e);
    const p = () => {
      t && (o && clearTimeout(o), o = null, t.forEach((m) => {
        m.unsubscribe ? m.unsubscribe(a) : m.removeEventListener("abort", a);
      }), t = null);
    };
    t.forEach((m) => m.addEventListener("abort", a));
    const { signal: l } = i;
    return l.unsubscribe = () => x.asap(p), l;
  }
}, Sa = function* (t, e) {
  let n = t.byteLength;
  if (n < e) {
    yield t;
    return;
  }
  let i = 0, r;
  for (; i < n; )
    r = i + e, yield t.slice(i, r), i = r;
}, Ra = async function* (t, e) {
  for await (const n of Ta(t))
    yield* Sa(n, e);
}, Ta = async function* (t) {
  if (t[Symbol.asyncIterator]) {
    yield* t;
    return;
  }
  const e = t.getReader();
  try {
    for (; ; ) {
      const { done: n, value: i } = await e.read();
      if (n)
        break;
      yield i;
    }
  } finally {
    await e.cancel();
  }
}, jn = (t, e, n, i) => {
  const r = Ra(t, e);
  let a = 0, o, p = (l) => {
    o || (o = !0, i && i(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: m, value: d } = await r.next();
        if (m) {
          p(), l.close();
          return;
        }
        let u = d.byteLength;
        if (n) {
          let h = a += u;
          n(h);
        }
        l.enqueue(new Uint8Array(d));
      } catch (m) {
        throw p(m), m;
      }
    },
    cancel(l) {
      return p(l), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, ke = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Gi = ke && typeof ReadableStream == "function", Aa = ke && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((t) => (e) => t.encode(e))(new TextEncoder()) : async (t) => new Uint8Array(await new Response(t).arrayBuffer())), qi = (t, ...e) => {
  try {
    return !!t(...e);
  } catch {
    return !1;
  }
}, Ca = Gi && qi(() => {
  let t = !1;
  const e = new Request(H.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return t = !0, "half";
    }
  }).headers.has("Content-Type");
  return t && !e;
}), Bn = 64 * 1024, Ge = Gi && qi(() => x.isReadableStream(new Response("").body)), me = {
  stream: Ge && ((t) => t.body)
};
ke && ((t) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !me[e] && (me[e] = x.isFunction(t[e]) ? (n) => n[e]() : (n, i) => {
      throw new A(`Response type '${e}' is not supported`, A.ERR_NOT_SUPPORT, i);
    });
  });
})(new Response());
const za = async (t) => {
  if (t == null)
    return 0;
  if (x.isBlob(t))
    return t.size;
  if (x.isSpecCompliantForm(t))
    return (await new Request(H.origin, {
      method: "POST",
      body: t
    }).arrayBuffer()).byteLength;
  if (x.isArrayBufferView(t) || x.isArrayBuffer(t))
    return t.byteLength;
  if (x.isURLSearchParams(t) && (t = t + ""), x.isString(t))
    return (await Aa(t)).byteLength;
}, Oa = async (t, e) => {
  const n = x.toFiniteNumber(t.getContentLength());
  return n ?? za(e);
}, Na = ke && (async (t) => {
  let {
    url: e,
    method: n,
    data: i,
    signal: r,
    cancelToken: a,
    timeout: o,
    onDownloadProgress: p,
    onUploadProgress: l,
    responseType: m,
    headers: d,
    withCredentials: u = "same-origin",
    fetchOptions: h
  } = Vi(t);
  m = m ? (m + "").toLowerCase() : "text";
  let k = Ea([r, a && a.toAbortSignal()], o), c;
  const g = k && k.unsubscribe && (() => {
    k.unsubscribe();
  });
  let f;
  try {
    if (l && Ca && n !== "get" && n !== "head" && (f = await Oa(d, i)) !== 0) {
      let v = new Request(e, {
        method: "POST",
        body: i,
        duplex: "half"
      }), C;
      if (x.isFormData(i) && (C = v.headers.get("content-type")) && d.setContentType(C), v.body) {
        const [S, T] = Mn(
          f,
          le(Pn(l))
        );
        i = jn(v.body, Bn, S, T);
      }
    }
    x.isString(u) || (u = u ? "include" : "omit");
    const b = "credentials" in Request.prototype;
    c = new Request(e, {
      ...h,
      signal: k,
      method: n.toUpperCase(),
      headers: d.normalize().toJSON(),
      body: i,
      duplex: "half",
      credentials: b ? u : void 0
    });
    let y = await fetch(c);
    const _ = Ge && (m === "stream" || m === "response");
    if (Ge && (p || _ && g)) {
      const v = {};
      ["status", "statusText", "headers"].forEach((O) => {
        v[O] = y[O];
      });
      const C = x.toFiniteNumber(y.headers.get("content-length")), [S, T] = p && Mn(
        C,
        le(Pn(p), !0)
      ) || [];
      y = new Response(
        jn(y.body, Bn, S, () => {
          T && T(), g && g();
        }),
        v
      );
    }
    m = m || "text";
    let R = await me[x.findKey(me, m) || "text"](y, t);
    return !_ && g && g(), await new Promise((v, C) => {
      $i(v, C, {
        data: R,
        headers: q.from(y.headers),
        status: y.status,
        statusText: y.statusText,
        config: t,
        request: c
      });
    });
  } catch (b) {
    throw g && g(), b && b.name === "TypeError" && /fetch/i.test(b.message) ? Object.assign(
      new A("Network Error", A.ERR_NETWORK, t, c),
      {
        cause: b.cause || b
      }
    ) : A.from(b, b && b.code, t, c);
  }
}), qe = {
  http: Zo,
  xhr: va,
  fetch: Na
};
x.forEach(qe, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const Un = (t) => `- ${t}`, La = (t) => x.isFunction(t) || t === null || t === !1, Zi = {
  getAdapter: (t) => {
    t = x.isArray(t) ? t : [t];
    const { length: e } = t;
    let n, i;
    const r = {};
    for (let a = 0; a < e; a++) {
      n = t[a];
      let o;
      if (i = n, !La(n) && (i = qe[(o = String(n)).toLowerCase()], i === void 0))
        throw new A(`Unknown adapter '${o}'`);
      if (i)
        break;
      r[o || "#" + a] = i;
    }
    if (!i) {
      const a = Object.entries(r).map(
        ([p, l]) => `adapter ${p} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = e ? a.length > 1 ? `since :
` + a.map(Un).join(`
`) : " " + Un(a[0]) : "as no adapter specified";
      throw new A(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return i;
  },
  adapters: qe
};
function je(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new St(null, t);
}
function $n(t) {
  return je(t), t.headers = q.from(t.headers), t.data = De.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Zi.getAdapter(t.adapter || $t.adapter)(t).then(function(i) {
    return je(t), i.data = De.call(
      t,
      t.transformResponse,
      i
    ), i.headers = q.from(i.headers), i;
  }, function(i) {
    return Ui(i) || (je(t), i && i.response && (i.response.data = De.call(
      t,
      t.transformResponse,
      i.response
    ), i.response.headers = q.from(i.response.headers))), Promise.reject(i);
  });
}
const Wi = "1.8.4", _e = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  _e[t] = function(i) {
    return typeof i === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const Hn = {};
_e.transitional = function(e, n, i) {
  function r(a, o) {
    return "[Axios v" + Wi + "] Transitional option '" + a + "'" + o + (i ? ". " + i : "");
  }
  return (a, o, p) => {
    if (e === !1)
      throw new A(
        r(o, " has been removed" + (n ? " in " + n : "")),
        A.ERR_DEPRECATED
      );
    return n && !Hn[o] && (Hn[o] = !0, console.warn(
      r(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), e ? e(a, o, p) : !0;
  };
};
_e.spelling = function(e) {
  return (n, i) => (console.warn(`${i} is likely a misspelling of ${e}`), !0);
};
function Ia(t, e, n) {
  if (typeof t != "object")
    throw new A("options must be an object", A.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(t);
  let r = i.length;
  for (; r-- > 0; ) {
    const a = i[r], o = e[a];
    if (o) {
      const p = t[a], l = p === void 0 || o(p, a, t);
      if (l !== !0)
        throw new A("option " + a + " must be " + l, A.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new A("Unknown option " + a, A.ERR_BAD_OPTION);
  }
}
const se = {
  assertOptions: Ia,
  validators: _e
}, rt = se.validators;
let ft = class {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new In(),
      response: new In()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(e, n) {
    try {
      return await this._request(e, n);
    } catch (i) {
      if (i instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const a = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          i.stack ? a && !String(i.stack).endsWith(a.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + a) : i.stack = a;
        } catch {
        }
      }
      throw i;
    }
  }
  _request(e, n) {
    typeof e == "string" ? (n = n || {}, n.url = e) : n = e || {}, n = xt(this.defaults, n);
    const { transitional: i, paramsSerializer: r, headers: a } = n;
    i !== void 0 && se.assertOptions(i, {
      silentJSONParsing: rt.transitional(rt.boolean),
      forcedJSONParsing: rt.transitional(rt.boolean),
      clarifyTimeoutError: rt.transitional(rt.boolean)
    }, !1), r != null && (x.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : se.assertOptions(r, {
      encode: rt.function,
      serialize: rt.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), se.assertOptions(n, {
      baseUrl: rt.spelling("baseURL"),
      withXsrfToken: rt.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = a && x.merge(
      a.common,
      a[n.method]
    );
    a && x.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (c) => {
        delete a[c];
      }
    ), n.headers = q.concat(o, a);
    const p = [];
    let l = !0;
    this.interceptors.request.forEach(function(g) {
      typeof g.runWhen == "function" && g.runWhen(n) === !1 || (l = l && g.synchronous, p.unshift(g.fulfilled, g.rejected));
    });
    const m = [];
    this.interceptors.response.forEach(function(g) {
      m.push(g.fulfilled, g.rejected);
    });
    let d, u = 0, h;
    if (!l) {
      const c = [$n.bind(this), void 0];
      for (c.unshift.apply(c, p), c.push.apply(c, m), h = c.length, d = Promise.resolve(n); u < h; )
        d = d.then(c[u++], c[u++]);
      return d;
    }
    h = p.length;
    let k = n;
    for (u = 0; u < h; ) {
      const c = p[u++], g = p[u++];
      try {
        k = c(k);
      } catch (f) {
        g.call(this, f);
        break;
      }
    }
    try {
      d = $n.call(this, k);
    } catch (c) {
      return Promise.reject(c);
    }
    for (u = 0, h = m.length; u < h; )
      d = d.then(m[u++], m[u++]);
    return d;
  }
  getUri(e) {
    e = xt(this.defaults, e);
    const n = Hi(e.baseURL, e.url, e.allowAbsoluteUrls);
    return Di(n, e.params, e.paramsSerializer);
  }
};
x.forEach(["delete", "get", "head", "options"], function(e) {
  ft.prototype[e] = function(n, i) {
    return this.request(xt(i || {}, {
      method: e,
      url: n,
      data: (i || {}).data
    }));
  };
});
x.forEach(["post", "put", "patch"], function(e) {
  function n(i) {
    return function(a, o, p) {
      return this.request(xt(p || {}, {
        method: e,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: o
      }));
    };
  }
  ft.prototype[e] = n(), ft.prototype[e + "Form"] = n(!0);
});
let Fa = class Xi {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(a) {
      n = a;
    });
    const i = this;
    this.promise.then((r) => {
      if (!i._listeners) return;
      let a = i._listeners.length;
      for (; a-- > 0; )
        i._listeners[a](r);
      i._listeners = null;
    }), this.promise.then = (r) => {
      let a;
      const o = new Promise((p) => {
        i.subscribe(p), a = p;
      }).then(r);
      return o.cancel = function() {
        i.unsubscribe(a);
      }, o;
    }, e(function(a, o, p) {
      i.reason || (i.reason = new St(a, o, p), n(i.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(e);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), n = (i) => {
      e.abort(i);
    };
    return this.subscribe(n), e.signal.unsubscribe = () => this.unsubscribe(n), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new Xi(function(r) {
        e = r;
      }),
      cancel: e
    };
  }
};
function Ma(t) {
  return function(n) {
    return t.apply(null, n);
  };
}
function Pa(t) {
  return x.isObject(t) && t.isAxiosError === !0;
}
const Ze = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Ze).forEach(([t, e]) => {
  Ze[e] = t;
});
function Yi(t) {
  const e = new ft(t), n = Ti(ft.prototype.request, e);
  return x.extend(n, ft.prototype, e, { allOwnKeys: !0 }), x.extend(n, e, null, { allOwnKeys: !0 }), n.create = function(r) {
    return Yi(xt(t, r));
  }, n;
}
const D = Yi($t);
D.Axios = ft;
D.CanceledError = St;
D.CancelToken = Fa;
D.isCancel = Ui;
D.VERSION = Wi;
D.toFormData = we;
D.AxiosError = A;
D.Cancel = D.CanceledError;
D.all = function(e) {
  return Promise.all(e);
};
D.spread = Ma;
D.isAxiosError = Pa;
D.mergeConfig = xt;
D.AxiosHeaders = q;
D.formToJSON = (t) => Bi(x.isHTMLForm(t) ? new FormData(t) : t);
D.getAdapter = Zi.getAdapter;
D.HttpStatusCode = Ze;
D.default = D;
const {
  Axios: Dm,
  AxiosError: jm,
  CanceledError: Bm,
  isCancel: Um,
  CancelToken: $m,
  VERSION: Hm,
  all: Vm,
  Cancel: Gm,
  isAxiosError: qm,
  spread: Zm,
  toFormData: Wm,
  AxiosHeaders: Xm,
  HttpStatusCode: Ym,
  formToJSON: Km,
  getAdapter: Jm,
  mergeConfig: Qm
} = D, Da = async (t, e) => {
  var a;
  let n = new URL("/__/file-upload/", t).toString();
  const i = new FormData();
  i.append("file", e);
  const r = await D.post(n, i, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return (a = r == null ? void 0 : r.data) == null ? void 0 : a.url;
};
st(io);
const Vn = 44, ja = "image/*", Ba = (t) => new Promise((e, n) => {
  const i = new FileReader();
  i.onload = (r) => {
    const a = r.target.result, o = new Blob([new Uint8Array(a)], { type: t.type });
    e(o);
  }, i.onerror = n, i.readAsArrayBuffer(t);
}), Ua = ({
  config: t,
  isSending: e,
  isReceiving: n,
  onSend: i,
  onCancelSend: r
}) => {
  const [a, o] = j(""), [p, l] = j(!1), [m, d] = j(null), u = ht(null), h = () => {
    const S = u.current;
    S.style.height = Vn + "px";
  }, k = (S) => {
    const { value: T } = S.target;
    o(T), T || h();
  }, c = (S) => {
    if (S.keyCode === 13 && !S.shiftKey) {
      if (e || n) return;
      S.preventDefault(), f();
    } else S.keyCode === 13 && S.shiftKey && g();
  }, g = () => {
    const S = u.current;
    S.scrollHeight > Vn && (S == null || S.setAttribute("style", "height:" + S.scrollHeight + "px !important"));
  }, f = () => {
    if (!a.trim() && !(m != null && m.length) || v) return null;
    const S = { input_prompt: a.trim() };
    m != null && m.length && (S.input_images = m.map((T) => T.gooeyUrl), d([])), i(S), o(""), h();
  }, b = (S) => {
    i({ input_audio: S }), l(!1);
  }, y = () => {
    const S = document.createElement("input");
    S.type = "file", S.accept = ja, S.onchange = _, S.click();
  }, _ = (S) => {
    const T = Array.from(S.target.files);
    d(
      T.map((O, B) => (Ba(O).then((G) => {
        const J = new File([G], O.name);
        Da(t.apiUrl, J).then((qt) => {
          d((P) => P[B] ? (P[B].isUploading = !1, P[B].gooeyUrl = qt, [...P]) : P);
        });
      }), {
        name: O.name,
        type: O.type.split("/")[0],
        data: O,
        gooeyUrl: "",
        isUploading: !0,
        removeFile: () => d((G) => (G.splice(B, 1), [...G]))
      }))
    );
  }, R = e || n, v = !R && !e && a.trim().length === 0 && !(m != null && m.length) || (m == null ? void 0 : m.some((S) => S.isUploading)), C = tn(() => t == null ? void 0 : t.enablePhotoUpload, [t == null ? void 0 : t.enablePhotoUpload]);
  return /* @__PURE__ */ E(Bt, { children: [
    m && m.length > 0 && /* @__PURE__ */ s("div", { className: "gp-12 b-1 br-large gmb-12 gm-12", children: /* @__PURE__ */ s(po, { files: m }) }),
    /* @__PURE__ */ E(
      "div",
      {
        className: L(
          "gooeyChat-chat-input gpr-8 gpl-8",
          !t.branding.showPoweredByGooey && "gpb-8"
        ),
        children: [
          p ? /* @__PURE__ */ s(
            eo,
            {
              onSend: b,
              onCancel: () => l(!1)
            }
          ) : /* @__PURE__ */ E("div", { className: "pos-relative", children: [
            /* @__PURE__ */ s(
              "textarea",
              {
                value: a,
                ref: u,
                onChange: k,
                onKeyDown: c,
                className: L(
                  "br-large b-1 font_16_500 bg-white gpt-10 gpb-10 gpr-40 flex-1 gm-0",
                  C ? "gpl-32" : "gpl-12"
                ),
                placeholder: `Message ${t.branding.name || ""}`
              }
            ),
            C && /* @__PURE__ */ s("div", { className: "input-left-buttons", children: /* @__PURE__ */ s(Y, { onClick: y, variant: "text-alt", className: "gp-4", children: /* @__PURE__ */ s(ro, { size: 18 }) }) }),
            /* @__PURE__ */ E("div", { className: "input-right-buttons", children: [
              !(m != null && m.length) && !R && (t == null ? void 0 : t.enableAudioMessage) && !a && /* @__PURE__ */ s(Y, { onClick: () => l(!0), variant: "text-alt", children: /* @__PURE__ */ s(Si, { size: 18 }) }),
              (!!a || !(t != null && t.enableAudioMessage) || R || !!(m != null && m.length)) && /* @__PURE__ */ s(
                Y,
                {
                  disabled: v,
                  variant: "text-alt",
                  className: "gp-4",
                  onClick: R ? r : f,
                  children: R ? /* @__PURE__ */ s(Qr, { size: 24 }) : /* @__PURE__ */ s(Ei, { size: 24 })
                }
              )
            ] })
          ] }),
          !!t.branding.showPoweredByGooey && !p && /* @__PURE__ */ E(
            "p",
            {
              className: "font_10_500 gpt-4 gpb-6 text-darkGrey text-center gm-0",
              style: { fontSize: "8px" },
              children: [
                "Powered by",
                " ",
                /* @__PURE__ */ s(
                  "a",
                  {
                    href: "https://gooey.ai/copilot/",
                    target: "_blank",
                    className: "text-darkGrey text-underline",
                    children: "Gooey.AI"
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
};
var U = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $a(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Nt = {}, Ha = {}, At = Xr;
if (Ha.NODE_ENV === "production")
  Nt.createRoot = At.createRoot, Nt.hydrateRoot = At.hydrateRoot;
else {
  var Jt = At.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  Nt.createRoot = function(t, e) {
    Jt.usingClientEntryPoint = !0;
    try {
      return At.createRoot(t, e);
    } finally {
      Jt.usingClientEntryPoint = !1;
    }
  }, Nt.hydrateRoot = function(t, e, n) {
    Jt.usingClientEntryPoint = !0;
    try {
      return At.hydrateRoot(t, e, n);
    } finally {
      Jt.usingClientEntryPoint = !1;
    }
  };
}
const Va = ".gooey-clipping-container{position:relative;overflow:hidden}.gooey-modal{transition:all .3s;position:fixed;width:max-content;background-color:#fff;padding:10px;border-radius:8px;z-index:99999;font-weight:lighter;line-height:normal;box-shadow:#959da533 0 8px 24px;inset:0px auto auto 0px}";
st(Va);
const Ga = (t, e) => {
  const n = t.getBoundingClientRect();
  let i = "0px", r = "0px";
  const a = e.x, o = e.y, p = {
    top: 0,
    left: 0,
    transform: "none"
  };
  switch (a) {
    case "left":
      p.left = n.left - n.width, i = "calc(-50% - 12px)";
      break;
    case "right":
      p.left = n.right, i = "12px";
      break;
    case "center":
      p.left = n.left + n.width / 2, p.transform = "translate(-50%, 12px)", r = "12px", i = "-50%";
      break;
  }
  switch (o) {
    case "top":
      p.top = n.top - 12, a === "center" ? p.transform = "translate(-50%, -100%)" : p.transform = "translate(0, -100%)", r = "0", i === "0" && (i = "-100%");
      break;
    case "bottom":
      p.top = n.bottom;
      break;
    case "center":
      p.top = n.top + n.height / 2, r = "-50%", i === "0" && (i = "12px");
      break;
  }
  return p.transform = `translate(${i}, ${r})`, p;
}, qa = ({
  containerRef: t,
  direction: e,
  style: n,
  className: i = "",
  ModalContent: r,
  ...a
}) => {
  if (!t) return null;
  const o = Ga(t, e);
  return r ? /* @__PURE__ */ s(
    "div",
    {
      className: i += " gooey-modal",
      style: {
        ...n,
        ...o
      },
      ...a,
      children: r()
    }
  ) : null;
}, Za = (t) => {
  const {
    ModalContent: e = () => null,
    children: n,
    direction: i = {
      x: "center",
      y: "bottom"
    },
    showModal: r,
    ModalProps: a,
    ...o
  } = t, [p, l] = j(null);
  return /* @__PURE__ */ E(
    "div",
    {
      className: "gooey-clipping-container",
      ref: l,
      ...o,
      children: [
        n,
        r && Yr(
          /* @__PURE__ */ s(
            qa,
            {
              containerRef: p,
              direction: i,
              ModalContent: e,
              ...a
            }
          ),
          (gooeyShadowRoot == null ? void 0 : gooeyShadowRoot.querySelector(".gooey-embed-container")) || document.body
        )
      ]
    }
  );
}, Ct = "-6px", Wa = (t) => {
  switch (t) {
    case "top":
      return {
        borderTop: "10px solid white",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        left: "50%",
        bottom: Ct,
        transform: "translateX(-50%)"
      };
    case "bottom":
      return {
        borderBottom: "10px solid white",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        left: "50%",
        top: Ct,
        transform: "translateX(-50%)"
      };
    case "left":
      return {
        borderLeft: "10px solid white",
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
        right: Ct,
        transform: "translateY(-50%)",
        top: "50%"
      };
    case "right":
      return {
        borderRight: "10px solid white",
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
        left: Ct,
        transform: "translateY(-50%)",
        top: "50%"
      };
    default:
      return {
        borderTop: "10px solid white",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        left: "50%",
        bottom: Ct,
        transform: "translateX(-50%)"
      };
  }
}, zt = ({
  text: t = "This is a tooltip",
  children: e,
  direction: n = "right",
  disabled: i = !1
}) => {
  const [r, a] = j(!1), o = ht(null), p = Wa(n), m = "ontouchstart" in window || navigator.maxTouchPoints > 0 ? {
    onTouchStart: () => null,
    onTouchEnd: () => null
  } : {
    onMouseEnter: () => {
      i || (o.current = setTimeout(() => {
        a(!0), o.current = null;
      }, 300));
    },
    onMouseLeave: () => {
      o.current && clearTimeout(o.current), a(!1);
    }
  };
  return /* @__PURE__ */ s(
    Za,
    {
      ModalContent: () => /* @__PURE__ */ E(Bt, { children: [
        /* @__PURE__ */ s(
          "div",
          {
            style: {
              position: "absolute",
              width: "2px",
              height: "2px",
              ...p
            }
          }
        ),
        /* @__PURE__ */ s("p", { className: "font_14_500", children: t })
      ] }),
      showModal: r,
      direction: {
        x: n === "left" ? "left" : n === "right" ? "right" : "center",
        y: n === "top" ? "top" : n === "bottom" ? "bottom" : "center"
      },
      onClick: (d) => {
        d.preventDefault(), d.stopPropagation(), d.persist(), o.current && clearTimeout(o.current), a(!1);
      },
      ...m,
      "aria-label": t,
      children: e
    }
  );
}, Xa = (t) => {
  const e = (t == null ? void 0 : t.size) || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ s(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      height: e,
      width: e,
      children: /* @__PURE__ */ s("path", { d: "M352 0H320V64h32 50.7L297.4 169.4 274.7 192 320 237.3l22.6-22.6L448 109.3V160v32h64V160 32 0H480 352zM214.6 342.6L237.3 320 192 274.7l-22.6 22.6L64 402.7V352 320H0v32V480v32H32 160h32V448H160 109.3L214.6 342.6z" })
    }
  ) });
}, Ya = (t) => {
  const e = (t == null ? void 0 : t.size) || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ s(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      height: e,
      width: e,
      children: /* @__PURE__ */ s("path", { d: "M381.3 176L502.6 54.6 457.4 9.4 336 130.7V80 48H272V80 208v32h32H432h32V176H432 381.3zM80 272H48v64H80h50.7L9.4 457.4l45.3 45.3L176 381.3V432v32h64V432 304 272H208 80z" })
    }
  ) });
}, Ka = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      children: [
        "//--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--",
        /* @__PURE__ */ s("path", { d: "M448 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32l-224 0 0-384 224 0zM64 64l128 0 0 384L64 448c-17.7 0-32-14.3-32-32L32 96c0-17.7 14.3-32 32-32zm0-32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM80 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L80 96zM64 176c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zm16 48c-8.8 0-16 7.2-16 16s7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0z" })
      ]
    }
  ) });
}, Ja = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ s(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      width: e,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      height: e,
      children: /* @__PURE__ */ s("path", { d: "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" })
    }
  ) });
}, Qa = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: e,
      height: e,
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: { fill: "none" },
      children: [
        /* @__PURE__ */ s("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        /* @__PURE__ */ s("path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" }),
        /* @__PURE__ */ s("path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" }),
        /* @__PURE__ */ s("path", { d: "M16 5l3 3" })
      ]
    }
  ) });
}, tp = ({
  isEmptyMessages: t = !0,
  onNewConversation: e = () => {
  },
  name: n = "Gooey Bot",
  photoUrl: i = "https://gooey.ai/favicon.ico",
  showSidebarButton: r = !1,
  isFocusMode: a = !1,
  isInline: o = !0,
  showCloseButton: p = !1,
  showFocusModeButton: l = !1,
  showNewConversationButton: m = !1,
  toggleFocusMode: d = () => {
  },
  toggleOpenClose: u = () => {
  },
  toggleSidebar: h = () => {
  },
  className: k = ""
}) => /* @__PURE__ */ E(
  "div",
  {
    className: L(
      "bg-white b-btm-1 d-flex justify-between align-center pos-sticky w-100 h-header",
      k
    ),
    children: [
      /* @__PURE__ */ s("div", { className: "d-flex align-center", children: r && /* @__PURE__ */ s(zt, { text: "Open sidebar", direction: "right", children: /* @__PURE__ */ s(
        Y,
        {
          id: "sidebar-toggle-icon-header",
          variant: "text",
          className: "cr-pointer",
          onClick: h,
          children: /* @__PURE__ */ s(Ka, { size: 20 })
        }
      ) }) }),
      /* @__PURE__ */ s(
        "div",
        {
          style: {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          },
          children: /* @__PURE__ */ s(
            zt,
            {
              text: "New Chat",
              disabled: t,
              direction: "bottom",
              children: /* @__PURE__ */ s(vt, { onClick: e, disabled: t, children: /* @__PURE__ */ E("div", { className: "d-flex align-center", children: [
                /* @__PURE__ */ s(
                  "div",
                  {
                    className: "bot-avatar bg-primary gmr-8",
                    style: {
                      width: "24px",
                      height: "24px",
                      borderRadius: "100%"
                    },
                    children: /* @__PURE__ */ s(
                      "img",
                      {
                        src: i,
                        alt: "bot-avatar",
                        style: {
                          width: "24px",
                          height: "24px",
                          borderRadius: "100%"
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ s("p", { className: "font_16_700 text-almostBlack", children: n })
              ] }) })
            }
          )
        }
      ),
      /* @__PURE__ */ s("div", { children: /* @__PURE__ */ E("div", { className: "d-flex align-center", children: [
        l && /* @__PURE__ */ s(
          zt,
          {
            text: a ? "Disable Focus" : "Enable Focus",
            direction: "bottom",
            children: /* @__PURE__ */ s(
              Y,
              {
                variant: "text",
                className: "cr-pointer",
                onClick: d,
                style: { transform: "rotate(90deg)" },
                children: a ? /* @__PURE__ */ s(Ya, { size: 16 }) : /* @__PURE__ */ s(Xa, { size: 16 })
              }
            )
          }
        ),
        p && /* @__PURE__ */ s(zt, { text: "Close", direction: "left", children: /* @__PURE__ */ s(
          Y,
          {
            variant: "text",
            className: L("gp-8 cr-pointer flex-1"),
            onClick: u,
            children: /* @__PURE__ */ s(Ja, { size: 16 })
          }
        ) }),
        o && m && /* @__PURE__ */ s(
          zt,
          {
            text: "New Chat",
            direction: "left",
            disabled: t,
            children: /* @__PURE__ */ s(
              Y,
              {
                disabled: t,
                variant: "text",
                className: L("gp-8 cr-pointer flex-1"),
                onClick: e,
                children: /* @__PURE__ */ s(Qa, { size: 22 })
              }
            )
          }
        )
      ] }) })
    ]
  }
), Ki = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s(M, { ...t, children: /* @__PURE__ */ s(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      children: /* @__PURE__ */ s("path", { d: "M256 480c16.7 0 40.4-14.4 61.9-57.3c9.9-19.8 18.2-43.7 24.1-70.7H170c5.9 27 14.2 50.9 24.1 70.7C215.6 465.6 239.3 480 256 480zM164.3 320H347.7c2.8-20.2 4.3-41.7 4.3-64s-1.5-43.8-4.3-64H164.3c-2.8 20.2-4.3 41.7-4.3 64s1.5 43.8 4.3 64zM170 160H342c-5.9-27-14.2-50.9-24.1-70.7C296.4 46.4 272.7 32 256 32s-40.4 14.4-61.9 57.3C184.2 109.1 175.9 133 170 160zm210 32c2.6 20.5 4 41.9 4 64s-1.4 43.5-4 64h90.8c6-20.3 9.3-41.8 9.3-64s-3.2-43.7-9.3-64H380zm78.5-32c-25.9-54.5-73.1-96.9-130.9-116.3c21 28.3 37.6 68.8 47.2 116.3h83.8zm-321.1 0c9.6-47.6 26.2-88 47.2-116.3C126.7 63.1 79.4 105.5 53.6 160h83.7zm-96 32c-6 20.3-9.3 41.8-9.3 64s3.2 43.7 9.3 64H132c-2.6-20.5-4-41.9-4-64s1.4-43.5 4-64H41.3zM327.5 468.3c57.8-19.5 105-61.8 130.9-116.3H374.7c-9.6 47.6-26.2 88-47.2 116.3zm-143 0c-21-28.3-37.5-68.8-47.2-116.3H53.6c25.9 54.5 73.1 96.9 130.9 116.3zM256 512A256 256 0 1 1 256 0a256 256 0 1 1 0 512z" })
    }
  ) });
}, an = '@charset "UTF-8";:export{primary:hsl(169,55%,82%);secondary:hsl(12,100%,97%);border-color:#eee;gooeyDanger:#dc3545}.gooey-incomingMsg{width:100%;word-wrap:normal}.gooey-incomingMsg audio{width:100%;height:40px}.gooey-incomingMsg video{width:360px;height:360px;border-radius:12px}.sources-listContainer{display:flex;min-height:72px;max-width:calc(100% + 16px)}.sources-card{background-color:#f0f0f0;border-radius:12px;cursor:pointer;min-width:160px;max-width:160px;height:74px;padding:8px;border:1px solid transparent}.sources-card:hover{border:1px solid #6c757d}.sources-card-disabled:hover{border:1px solid transparent}.sources-card p{display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;word-break:break-all;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}@keyframes wave-lines{0%{background-position:-468px 0}to{background-position:468px 0}}.gooey-placeholderMsg-container{display:grid;width:100%;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));grid-auto-flow:row;gap:12px 12px}.markdown{max-width:none;font-size:16px!important}.markdown h1{font-weight:600}.markdown h1:first-child{margin-top:0}.markdown p{margin-bottom:12px}.markdown h2{font-weight:600;margin-bottom:1rem;margin-top:2rem}.markdown h2:first-child{margin-top:0}.markdown h3{font-weight:600;margin-bottom:.5rem;margin-top:1rem}.markdown h3:first-child{margin-top:0}.markdown h4{font-weight:600;margin-bottom:.5rem;margin-top:1rem}.markdown h4:first-child{margin-top:0}.markdown h5{font-weight:600}.markdown li{margin-bottom:12px}.markdown h5:first-child{margin-top:0}.markdown blockquote{--tw-border-opacity: 1;border-color:#9b9b9b;border-left-width:2px;line-height:1.5rem;margin:0;padding-bottom:.5rem;padding-left:1rem;padding-top:.5rem}.markdown blockquote>p{margin:0}.markdown blockquote>p:after,.markdown blockquote>p:before{display:none}.response-streaming>:not(ol):not(ul):not(pre):last-child:after,.response-streaming>pre:last-child code:after{content:"●";-webkit-font-smoothing:subpixel-antialiased;-webkit-animation:pulseSize .5s ease-in-out infinite;animation:pulseSize .5s ease-in-out infinite;font-family:Circle,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:normal;margin-left:.25rem;vertical-align:baseline}@supports (selector(:has(*))){.response-streaming>ol:last-child>li:last-child>ol:last-child>li:last-child:after,.response-streaming>ol:last-child>li:last-child>ol:last-child>li:last-child>ol:last-child>li:last-child:after,.response-streaming>ol:last-child>li:last-child>ol:last-child>li:last-child>ul:last-child>li:last-child:after,.response-streaming>ol:last-child>li:last-child>ul:last-child>li:last-child:after,.response-streaming>ol:last-child>li:last-child>ul:last-child>li:last-child>ol:last-child>li:last-child:after,.response-streaming>ol:last-child>li:last-child>ul:last-child>li:last-child>ul:last-child>li:last-child:after,.response-streaming>ul:last-child>li:last-child>ol:last-child>li:last-child:after,.response-streaming>ul:last-child>li:last-child>ol:last-child>li:last-child>ol:last-child>li:last-child:after,.response-streaming>ul:last-child>li:last-child>ol:last-child>li:last-child>ul:last-child>li:last-child:after,.response-streaming>ul:last-child>li:last-child>ul:last-child>li:last-child:after,.response-streaming>ul:last-child>li:last-child>ul:last-child>li:last-child>ol:last-child>li:last-child:after,.response-streaming>ul:last-child>li:last-child>ul:last-child>li:last-child>ul:last-child>li:last-child:after,.response-streaming>ul:last-child>li:last-child[*|\\:not-has\\(]:after{content:"●";font-family:Circle,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:normal;margin-left:.25rem;vertical-align:baseline;-webkit-font-smoothing:subpixel-antialiased;-webkit-animation:pulseSize .5s ease-in-out infinite;animation:pulseSize .5s ease-in-out infinite}.response-streaming>ul:last-child>li:last-child:not(:has(*>li)):after{content:"●";font-family:Circle,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:normal;margin-left:.25rem;vertical-align:baseline;-webkit-font-smoothing:subpixel-antialiased;-webkit-animation:pulseSize .5s ease-in-out infinite;animation:pulseSize .5s ease-in-out infinite}.response-streaming>ol:last-child>li:last-child[*|\\:not-has\\(]:after{content:"●";font-family:Circle,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:normal;margin-left:.25rem;vertical-align:baseline;-webkit-font-smoothing:subpixel-antialiased;-webkit-animation:pulseSize .5s ease-in-out infinite;animation:pulseSize .5s ease-in-out infinite}.response-streaming>ol:last-child>li:last-child:not(:has(*>li)):after{content:"●";font-family:Circle,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:normal;margin-left:.25rem;vertical-align:baseline;-webkit-font-smoothing:subpixel-antialiased;-webkit-animation:pulseSize .5s ease-in-out infinite;animation:pulseSize .5s ease-in-out infinite}}@supports not (selector(:has(*))){.response-streaming>ol:last-child>li:last-child:after,.response-streaming>ul:last-child>li:last-child:after{content:"●";font-family:Circle,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:normal;margin-left:.25rem;vertical-align:baseline;-webkit-font-smoothing:subpixel-antialiased;-webkit-animation:pulseSize .5s ease-in-out infinite;animation:pulseSize .5s ease-in-out infinite}}.markdown img{max-height:400px;max-width:90%;border-radius:8px;object-fit:cover}@-webkit-keyframes pulseSize{0%,to{opacity:1}50%{opacity:0}}@keyframes pulseSize{0%,to{opacity:1}50%{opacity:0}}';
st(an);
const ep = ["Hi, what can you do for me?", "What is your name?"], np = ({
  name: t,
  photoUrl: e,
  byLine: n,
  websiteUrl: i,
  description: r
}) => /* @__PURE__ */ E("div", { className: "d-flex flex-col justify-center align-center text-center", children: [
  e && /* @__PURE__ */ E(
    "div",
    {
      className: "bot-avatar gmr-8 gmb-24 bg-primary",
      style: { width: "128px", height: "128px", borderRadius: "100%" },
      children: [
        " ",
        /* @__PURE__ */ s(
          "img",
          {
            src: e,
            alt: "bot-avatar",
            style: {
              width: "128px",
              height: "128px",
              borderRadius: "100%",
              objectFit: "cover"
            }
          }
        )
      ]
    }
  ),
  /* @__PURE__ */ E("div", { children: [
    /* @__PURE__ */ s("p", { className: "font_24_500 gmb-16", children: t }),
    /* @__PURE__ */ E("p", { className: "font_12_500 text-muted gmb-12 d-flex align-center justify-center", children: [
      n,
      i && /* @__PURE__ */ s("span", { className: "gml-4", style: { marginBottom: "-2px" }, children: /* @__PURE__ */ s(
        "a",
        {
          href: i,
          target: "_ablank",
          className: "text-muted font_12_500",
          children: /* @__PURE__ */ s(Ki, {})
        }
      ) })
    ] }),
    /* @__PURE__ */ s("p", { className: "font_12_400 gpl-32 gpr-32", children: r })
  ] })
] }), ip = ({
  initializeQuery: t,
  config: e
}) => {
  const n = (e == null ? void 0 : e.branding.conversationStarters) ?? ep;
  return /* @__PURE__ */ E("div", { className: "no-scroll-bar w-100 gpl-16", children: [
    /* @__PURE__ */ s(np, { ...e == null ? void 0 : e.branding }),
    /* @__PURE__ */ s("div", { className: "gmt-48 gooey-placeholderMsg-container", children: n == null ? void 0 : n.map((i) => /* @__PURE__ */ s(
      vt,
      {
        variant: "outlined",
        onClick: () => t({ input_prompt: i }),
        className: L("text-left font_12_500 w-100"),
        children: i
      },
      i
    )) })
  ] });
}, rp = (t) => {
  const e = t.size || 24;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      ...t,
      children: [
        "// --!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--",
        /* @__PURE__ */ s("path", { d: "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" })
      ]
    }
  ) });
}, Ji = ({ children: t, photoUrl: e }) => /* @__PURE__ */ E("div", { className: "d-flex align-start", children: [
  e && /* @__PURE__ */ s(
    "div",
    {
      className: "bot-avatar bg-primary gmr-12",
      style: { width: "24px", height: "24px", borderRadius: "100%" },
      children: /* @__PURE__ */ s(
        "img",
        {
          src: e,
          alt: "bot-avatar",
          style: {
            width: "24px",
            height: "24px",
            borderRadius: "100%",
            objectFit: "cover"
          }
        }
      )
    }
  ),
  /* @__PURE__ */ s("div", { className: "gmt-2 mw-100 overflow-hidden", children: t })
] }), Qi = ({ show: t, scrollMessageContainer: e, photoUrl: n }) => {
  const i = ht(null);
  return Q(() => {
    var r;
    if (t) {
      const a = ((r = i == null ? void 0 : i.current) == null ? void 0 : r.offsetTop) ?? 0;
      e && e(a);
    }
  }, [t, e]), t ? /* @__PURE__ */ s("div", { ref: i, className: "gpl-16", children: /* @__PURE__ */ s(Ji, { photoUrl: n, children: /* @__PURE__ */ s(rp, { className: "anim-blink gml-4", size: 12 }) }) }) : null;
}, We = {
  FINAL_RESPONSE: "final_response",
  MESSAGE_PART: "message_part"
};
function pn() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let wt = pn();
function tr(t) {
  wt = t;
}
const er = /[&<>"']/, op = new RegExp(er.source, "g"), nr = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, ap = new RegExp(nr.source, "g"), pp = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Gn = (t) => pp[t];
function X(t, e) {
  if (e) {
    if (er.test(t))
      return t.replace(op, Gn);
  } else if (nr.test(t))
    return t.replace(ap, Gn);
  return t;
}
const sp = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function lp(t) {
  return t.replace(sp, (e, n) => (n = n.toLowerCase(), n === "colon" ? ":" : n.charAt(0) === "#" ? n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1)) : ""));
}
const mp = /(^|[^\[])\^/g;
function I(t, e) {
  let n = typeof t == "string" ? t : t.source;
  e = e || "";
  const i = {
    replace: (r, a) => {
      let o = typeof a == "string" ? a : a.source;
      return o = o.replace(mp, "$1"), n = n.replace(r, o), i;
    },
    getRegex: () => new RegExp(n, e)
  };
  return i;
}
function qn(t) {
  try {
    t = encodeURI(t).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return t;
}
const It = { exec: () => null };
function Zn(t, e) {
  const n = t.replace(/\|/g, (a, o, p) => {
    let l = !1, m = o;
    for (; --m >= 0 && p[m] === "\\"; )
      l = !l;
    return l ? "|" : " |";
  }), i = n.split(/ \|/);
  let r = 0;
  if (i[0].trim() || i.shift(), i.length > 0 && !i[i.length - 1].trim() && i.pop(), e)
    if (i.length > e)
      i.splice(e);
    else
      for (; i.length < e; )
        i.push("");
  for (; r < i.length; r++)
    i[r] = i[r].trim().replace(/\\\|/g, "|");
  return i;
}
function Qt(t, e, n) {
  const i = t.length;
  if (i === 0)
    return "";
  let r = 0;
  for (; r < i && t.charAt(i - r - 1) === e; )
    r++;
  return t.slice(0, i - r);
}
function dp(t, e) {
  if (t.indexOf(e[1]) === -1)
    return -1;
  let n = 0;
  for (let i = 0; i < t.length; i++)
    if (t[i] === "\\")
      i++;
    else if (t[i] === e[0])
      n++;
    else if (t[i] === e[1] && (n--, n < 0))
      return i;
  return -1;
}
function Wn(t, e, n, i) {
  const r = e.href, a = e.title ? X(e.title) : null, o = t[1].replace(/\\([\[\]])/g, "$1");
  if (t[0].charAt(0) !== "!") {
    i.state.inLink = !0;
    const p = {
      type: "link",
      raw: n,
      href: r,
      title: a,
      text: o,
      tokens: i.inlineTokens(o)
    };
    return i.state.inLink = !1, p;
  }
  return {
    type: "image",
    raw: n,
    href: r,
    title: a,
    text: X(o)
  };
}
function cp(t, e) {
  const n = t.match(/^(\s+)(?:```)/);
  if (n === null)
    return e;
  const i = n[1];
  return e.split(`
`).map((r) => {
    const a = r.match(/^\s+/);
    if (a === null)
      return r;
    const [o] = a;
    return o.length >= i.length ? r.slice(i.length) : r;
  }).join(`
`);
}
class de {
  // set by the lexer
  constructor(e) {
    F(this, "options");
    F(this, "rules");
    // set by the lexer
    F(this, "lexer");
    this.options = e || wt;
  }
  space(e) {
    const n = this.rules.block.newline.exec(e);
    if (n && n[0].length > 0)
      return {
        type: "space",
        raw: n[0]
      };
  }
  code(e) {
    const n = this.rules.block.code.exec(e);
    if (n) {
      const i = n[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: n[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? i : Qt(i, `
`)
      };
    }
  }
  fences(e) {
    const n = this.rules.block.fences.exec(e);
    if (n) {
      const i = n[0], r = cp(i, n[3] || "");
      return {
        type: "code",
        raw: i,
        lang: n[2] ? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : n[2],
        text: r
      };
    }
  }
  heading(e) {
    const n = this.rules.block.heading.exec(e);
    if (n) {
      let i = n[2].trim();
      if (/#$/.test(i)) {
        const r = Qt(i, "#");
        (this.options.pedantic || !r || / $/.test(r)) && (i = r.trim());
      }
      return {
        type: "heading",
        raw: n[0],
        depth: n[1].length,
        text: i,
        tokens: this.lexer.inline(i)
      };
    }
  }
  hr(e) {
    const n = this.rules.block.hr.exec(e);
    if (n)
      return {
        type: "hr",
        raw: n[0]
      };
  }
  blockquote(e) {
    const n = this.rules.block.blockquote.exec(e);
    if (n) {
      let i = n[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, `
    $1`);
      i = Qt(i.replace(/^ *>[ \t]?/gm, ""), `
`);
      const r = this.lexer.state.top;
      this.lexer.state.top = !0;
      const a = this.lexer.blockTokens(i);
      return this.lexer.state.top = r, {
        type: "blockquote",
        raw: n[0],
        tokens: a,
        text: i
      };
    }
  }
  list(e) {
    let n = this.rules.block.list.exec(e);
    if (n) {
      let i = n[1].trim();
      const r = i.length > 1, a = {
        type: "list",
        raw: "",
        ordered: r,
        start: r ? +i.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      i = r ? `\\d{1,9}\\${i.slice(-1)}` : `\\${i}`, this.options.pedantic && (i = r ? i : "[*+-]");
      const o = new RegExp(`^( {0,3}${i})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let p = "", l = "", m = !1;
      for (; e; ) {
        let d = !1;
        if (!(n = o.exec(e)) || this.rules.block.hr.test(e))
          break;
        p = n[0], e = e.substring(p.length);
        let u = n[2].split(`
`, 1)[0].replace(/^\t+/, (b) => " ".repeat(3 * b.length)), h = e.split(`
`, 1)[0], k = 0;
        this.options.pedantic ? (k = 2, l = u.trimStart()) : (k = n[2].search(/[^ ]/), k = k > 4 ? 1 : k, l = u.slice(k), k += n[1].length);
        let c = !1;
        if (!u && /^ *$/.test(h) && (p += h + `
`, e = e.substring(h.length + 1), d = !0), !d) {
          const b = new RegExp(`^ {0,${Math.min(3, k - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), y = new RegExp(`^ {0,${Math.min(3, k - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), _ = new RegExp(`^ {0,${Math.min(3, k - 1)}}(?:\`\`\`|~~~)`), R = new RegExp(`^ {0,${Math.min(3, k - 1)}}#`);
          for (; e; ) {
            const v = e.split(`
`, 1)[0];
            if (h = v, this.options.pedantic && (h = h.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), _.test(h) || R.test(h) || b.test(h) || y.test(e))
              break;
            if (h.search(/[^ ]/) >= k || !h.trim())
              l += `
` + h.slice(k);
            else {
              if (c || u.search(/[^ ]/) >= 4 || _.test(u) || R.test(u) || y.test(u))
                break;
              l += `
` + h;
            }
            !c && !h.trim() && (c = !0), p += v + `
`, e = e.substring(v.length + 1), u = h.slice(k);
          }
        }
        a.loose || (m ? a.loose = !0 : /\n *\n *$/.test(p) && (m = !0));
        let g = null, f;
        this.options.gfm && (g = /^\[[ xX]\] /.exec(l), g && (f = g[0] !== "[ ] ", l = l.replace(/^\[[ xX]\] +/, ""))), a.items.push({
          type: "list_item",
          raw: p,
          task: !!g,
          checked: f,
          loose: !1,
          text: l,
          tokens: []
        }), a.raw += p;
      }
      a.items[a.items.length - 1].raw = p.trimEnd(), a.items[a.items.length - 1].text = l.trimEnd(), a.raw = a.raw.trimEnd();
      for (let d = 0; d < a.items.length; d++)
        if (this.lexer.state.top = !1, a.items[d].tokens = this.lexer.blockTokens(a.items[d].text, []), !a.loose) {
          const u = a.items[d].tokens.filter((k) => k.type === "space"), h = u.length > 0 && u.some((k) => /\n.*\n/.test(k.raw));
          a.loose = h;
        }
      if (a.loose)
        for (let d = 0; d < a.items.length; d++)
          a.items[d].loose = !0;
      return a;
    }
  }
  html(e) {
    const n = this.rules.block.html.exec(e);
    if (n)
      return {
        type: "html",
        block: !0,
        raw: n[0],
        pre: n[1] === "pre" || n[1] === "script" || n[1] === "style",
        text: n[0]
      };
  }
  def(e) {
    const n = this.rules.block.def.exec(e);
    if (n) {
      const i = n[1].toLowerCase().replace(/\s+/g, " "), r = n[2] ? n[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", a = n[3] ? n[3].substring(1, n[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : n[3];
      return {
        type: "def",
        tag: i,
        raw: n[0],
        href: r,
        title: a
      };
    }
  }
  table(e) {
    const n = this.rules.block.table.exec(e);
    if (!n || !/[:|]/.test(n[2]))
      return;
    const i = Zn(n[1]), r = n[2].replace(/^\||\| *$/g, "").split("|"), a = n[3] && n[3].trim() ? n[3].replace(/\n[ \t]*$/, "").split(`
`) : [], o = {
      type: "table",
      raw: n[0],
      header: [],
      align: [],
      rows: []
    };
    if (i.length === r.length) {
      for (const p of r)
        /^ *-+: *$/.test(p) ? o.align.push("right") : /^ *:-+: *$/.test(p) ? o.align.push("center") : /^ *:-+ *$/.test(p) ? o.align.push("left") : o.align.push(null);
      for (const p of i)
        o.header.push({
          text: p,
          tokens: this.lexer.inline(p)
        });
      for (const p of a)
        o.rows.push(Zn(p, o.header.length).map((l) => ({
          text: l,
          tokens: this.lexer.inline(l)
        })));
      return o;
    }
  }
  lheading(e) {
    const n = this.rules.block.lheading.exec(e);
    if (n)
      return {
        type: "heading",
        raw: n[0],
        depth: n[2].charAt(0) === "=" ? 1 : 2,
        text: n[1],
        tokens: this.lexer.inline(n[1])
      };
  }
  paragraph(e) {
    const n = this.rules.block.paragraph.exec(e);
    if (n) {
      const i = n[1].charAt(n[1].length - 1) === `
` ? n[1].slice(0, -1) : n[1];
      return {
        type: "paragraph",
        raw: n[0],
        text: i,
        tokens: this.lexer.inline(i)
      };
    }
  }
  text(e) {
    const n = this.rules.block.text.exec(e);
    if (n)
      return {
        type: "text",
        raw: n[0],
        text: n[0],
        tokens: this.lexer.inline(n[0])
      };
  }
  escape(e) {
    const n = this.rules.inline.escape.exec(e);
    if (n)
      return {
        type: "escape",
        raw: n[0],
        text: X(n[1])
      };
  }
  tag(e) {
    const n = this.rules.inline.tag.exec(e);
    if (n)
      return !this.lexer.state.inLink && /^<a /i.test(n[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(n[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(n[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: n[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: n[0]
      };
  }
  link(e) {
    const n = this.rules.inline.link.exec(e);
    if (n) {
      const i = n[2].trim();
      if (!this.options.pedantic && /^</.test(i)) {
        if (!/>$/.test(i))
          return;
        const o = Qt(i.slice(0, -1), "\\");
        if ((i.length - o.length) % 2 === 0)
          return;
      } else {
        const o = dp(n[2], "()");
        if (o > -1) {
          const l = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + o;
          n[2] = n[2].substring(0, o), n[0] = n[0].substring(0, l).trim(), n[3] = "";
        }
      }
      let r = n[2], a = "";
      if (this.options.pedantic) {
        const o = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);
        o && (r = o[1], a = o[3]);
      } else
        a = n[3] ? n[3].slice(1, -1) : "";
      return r = r.trim(), /^</.test(r) && (this.options.pedantic && !/>$/.test(i) ? r = r.slice(1) : r = r.slice(1, -1)), Wn(n, {
        href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
        title: a && a.replace(this.rules.inline.anyPunctuation, "$1")
      }, n[0], this.lexer);
    }
  }
  reflink(e, n) {
    let i;
    if ((i = this.rules.inline.reflink.exec(e)) || (i = this.rules.inline.nolink.exec(e))) {
      const r = (i[2] || i[1]).replace(/\s+/g, " "), a = n[r.toLowerCase()];
      if (!a) {
        const o = i[0].charAt(0);
        return {
          type: "text",
          raw: o,
          text: o
        };
      }
      return Wn(i, a, i[0], this.lexer);
    }
  }
  emStrong(e, n, i = "") {
    let r = this.rules.inline.emStrongLDelim.exec(e);
    if (!r || r[3] && i.match(/[\p{L}\p{N}]/u))
      return;
    if (!(r[1] || r[2] || "") || !i || this.rules.inline.punctuation.exec(i)) {
      const o = [...r[0]].length - 1;
      let p, l, m = o, d = 0;
      const u = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (u.lastIndex = 0, n = n.slice(-1 * e.length + o); (r = u.exec(n)) != null; ) {
        if (p = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !p)
          continue;
        if (l = [...p].length, r[3] || r[4]) {
          m += l;
          continue;
        } else if ((r[5] || r[6]) && o % 3 && !((o + l) % 3)) {
          d += l;
          continue;
        }
        if (m -= l, m > 0)
          continue;
        l = Math.min(l, l + m + d);
        const h = [...r[0]][0].length, k = e.slice(0, o + r.index + h + l);
        if (Math.min(o, l) % 2) {
          const g = k.slice(1, -1);
          return {
            type: "em",
            raw: k,
            text: g,
            tokens: this.lexer.inlineTokens(g)
          };
        }
        const c = k.slice(2, -2);
        return {
          type: "strong",
          raw: k,
          text: c,
          tokens: this.lexer.inlineTokens(c)
        };
      }
    }
  }
  codespan(e) {
    const n = this.rules.inline.code.exec(e);
    if (n) {
      let i = n[2].replace(/\n/g, " ");
      const r = /[^ ]/.test(i), a = /^ /.test(i) && / $/.test(i);
      return r && a && (i = i.substring(1, i.length - 1)), i = X(i, !0), {
        type: "codespan",
        raw: n[0],
        text: i
      };
    }
  }
  br(e) {
    const n = this.rules.inline.br.exec(e);
    if (n)
      return {
        type: "br",
        raw: n[0]
      };
  }
  del(e) {
    const n = this.rules.inline.del.exec(e);
    if (n)
      return {
        type: "del",
        raw: n[0],
        text: n[2],
        tokens: this.lexer.inlineTokens(n[2])
      };
  }
  autolink(e) {
    const n = this.rules.inline.autolink.exec(e);
    if (n) {
      let i, r;
      return n[2] === "@" ? (i = X(n[1]), r = "mailto:" + i) : (i = X(n[1]), r = i), {
        type: "link",
        raw: n[0],
        text: i,
        href: r,
        tokens: [
          {
            type: "text",
            raw: i,
            text: i
          }
        ]
      };
    }
  }
  url(e) {
    var i;
    let n;
    if (n = this.rules.inline.url.exec(e)) {
      let r, a;
      if (n[2] === "@")
        r = X(n[0]), a = "mailto:" + r;
      else {
        let o;
        do
          o = n[0], n[0] = ((i = this.rules.inline._backpedal.exec(n[0])) == null ? void 0 : i[0]) ?? "";
        while (o !== n[0]);
        r = X(n[0]), n[1] === "www." ? a = "http://" + n[0] : a = n[0];
      }
      return {
        type: "link",
        raw: n[0],
        text: r,
        href: a,
        tokens: [
          {
            type: "text",
            raw: r,
            text: r
          }
        ]
      };
    }
  }
  inlineText(e) {
    const n = this.rules.inline.text.exec(e);
    if (n) {
      let i;
      return this.lexer.state.inRawBlock ? i = n[0] : i = X(n[0]), {
        type: "text",
        raw: n[0],
        text: i
      };
    }
  }
}
const gp = /^(?: *(?:\n|$))+/, up = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/, fp = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ht = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, hp = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ir = /(?:[*+-]|\d{1,9}[.)])/, rr = I(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, ir).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), sn = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, xp = /^[^\n]+/, ln = /(?!\s*\])(?:\\.|[^\[\]\\])+/, bp = I(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", ln).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), yp = I(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ir).getRegex(), ve = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", mn = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, wp = I("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", mn).replace("tag", ve).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), or = I(sn).replace("hr", Ht).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ve).getRegex(), kp = I(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", or).getRegex(), dn = {
  blockquote: kp,
  code: up,
  def: bp,
  fences: fp,
  heading: hp,
  hr: Ht,
  html: wp,
  lheading: rr,
  list: yp,
  newline: gp,
  paragraph: or,
  table: It,
  text: xp
}, Xn = I("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ht).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ve).getRegex(), _p = {
  ...dn,
  table: Xn,
  paragraph: I(sn).replace("hr", Ht).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Xn).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", ve).getRegex()
}, vp = {
  ...dn,
  html: I(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", mn).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: It,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: I(sn).replace("hr", Ht).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", rr).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, ar = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Ep = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, pr = /^( {2,}|\\)\n(?!\s*$)/, Sp = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Vt = "\\p{P}\\p{S}", Rp = I(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, Vt).getRegex(), Tp = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g, Ap = I(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, Vt).getRegex(), Cp = I("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, Vt).getRegex(), zp = I("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, Vt).getRegex(), Op = I(/\\([punct])/, "gu").replace(/punct/g, Vt).getRegex(), Np = I(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Lp = I(mn).replace("(?:-->|$)", "-->").getRegex(), Ip = I("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Lp).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ce = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, Fp = I(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", ce).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), sr = I(/^!?\[(label)\]\[(ref)\]/).replace("label", ce).replace("ref", ln).getRegex(), lr = I(/^!?\[(ref)\](?:\[\])?/).replace("ref", ln).getRegex(), Mp = I("reflink|nolink(?!\\()", "g").replace("reflink", sr).replace("nolink", lr).getRegex(), cn = {
  _backpedal: It,
  // only used for GFM url
  anyPunctuation: Op,
  autolink: Np,
  blockSkip: Tp,
  br: pr,
  code: Ep,
  del: It,
  emStrongLDelim: Ap,
  emStrongRDelimAst: Cp,
  emStrongRDelimUnd: zp,
  escape: ar,
  link: Fp,
  nolink: lr,
  punctuation: Rp,
  reflink: sr,
  reflinkSearch: Mp,
  tag: Ip,
  text: Sp,
  url: It
}, Pp = {
  ...cn,
  link: I(/^!?\[(label)\]\((.*?)\)/).replace("label", ce).getRegex(),
  reflink: I(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ce).getRegex()
}, Xe = {
  ...cn,
  escape: I(ar).replace("])", "~|])").getRegex(),
  url: I(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Dp = {
  ...Xe,
  br: I(pr).replace("{2,}", "*").getRegex(),
  text: I(Xe.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, te = {
  normal: dn,
  gfm: _p,
  pedantic: vp
}, Ot = {
  normal: cn,
  gfm: Xe,
  breaks: Dp,
  pedantic: Pp
};
class ot {
  constructor(e) {
    F(this, "tokens");
    F(this, "options");
    F(this, "state");
    F(this, "tokenizer");
    F(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || wt, this.options.tokenizer = this.options.tokenizer || new de(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      block: te.normal,
      inline: Ot.normal
    };
    this.options.pedantic ? (n.block = te.pedantic, n.inline = Ot.pedantic) : this.options.gfm && (n.block = te.gfm, this.options.breaks ? n.inline = Ot.breaks : n.inline = Ot.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: te,
      inline: Ot
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, n) {
    return new ot(n).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, n) {
    return new ot(n).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(/\r\n|\r/g, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const i = this.inlineQueue[n];
      this.inlineTokens(i.src, i.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = []) {
    this.options.pedantic ? e = e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e = e.replace(/^( *)(\t+)/gm, (p, l, m) => l + "    ".repeat(m.length));
    let i, r, a, o;
    for (; e; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((p) => (i = p.call({ lexer: this }, e, n)) ? (e = e.substring(i.raw.length), n.push(i), !0) : !1))) {
        if (i = this.tokenizer.space(e)) {
          e = e.substring(i.raw.length), i.raw.length === 1 && n.length > 0 ? n[n.length - 1].raw += `
` : n.push(i);
          continue;
        }
        if (i = this.tokenizer.code(e)) {
          e = e.substring(i.raw.length), r = n[n.length - 1], r && (r.type === "paragraph" || r.type === "text") ? (r.raw += `
` + i.raw, r.text += `
` + i.text, this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : n.push(i);
          continue;
        }
        if (i = this.tokenizer.fences(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.heading(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.hr(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.blockquote(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.list(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.html(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.def(e)) {
          e = e.substring(i.raw.length), r = n[n.length - 1], r && (r.type === "paragraph" || r.type === "text") ? (r.raw += `
` + i.raw, r.text += `
` + i.raw, this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = {
            href: i.href,
            title: i.title
          });
          continue;
        }
        if (i = this.tokenizer.table(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.lheading(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (a = e, this.options.extensions && this.options.extensions.startBlock) {
          let p = 1 / 0;
          const l = e.slice(1);
          let m;
          this.options.extensions.startBlock.forEach((d) => {
            m = d.call({ lexer: this }, l), typeof m == "number" && m >= 0 && (p = Math.min(p, m));
          }), p < 1 / 0 && p >= 0 && (a = e.substring(0, p + 1));
        }
        if (this.state.top && (i = this.tokenizer.paragraph(a))) {
          r = n[n.length - 1], o && r.type === "paragraph" ? (r.raw += `
` + i.raw, r.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : n.push(i), o = a.length !== e.length, e = e.substring(i.raw.length);
          continue;
        }
        if (i = this.tokenizer.text(e)) {
          e = e.substring(i.raw.length), r = n[n.length - 1], r && r.type === "text" ? (r.raw += `
` + i.raw, r.text += `
` + i.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : n.push(i);
          continue;
        }
        if (e) {
          const p = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(p);
            break;
          } else
            throw new Error(p);
        }
      }
    return this.state.top = !0, n;
  }
  inline(e, n = []) {
    return this.inlineQueue.push({ src: e, tokens: n }), n;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, n = []) {
    let i, r, a, o = e, p, l, m;
    if (this.tokens.links) {
      const d = Object.keys(this.tokens.links);
      if (d.length > 0)
        for (; (p = this.tokenizer.rules.inline.reflinkSearch.exec(o)) != null; )
          d.includes(p[0].slice(p[0].lastIndexOf("[") + 1, -1)) && (o = o.slice(0, p.index) + "[" + "a".repeat(p[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (p = this.tokenizer.rules.inline.blockSkip.exec(o)) != null; )
      o = o.slice(0, p.index) + "[" + "a".repeat(p[0].length - 2) + "]" + o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (p = this.tokenizer.rules.inline.anyPunctuation.exec(o)) != null; )
      o = o.slice(0, p.index) + "++" + o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; e; )
      if (l || (m = ""), l = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((d) => (i = d.call({ lexer: this }, e, n)) ? (e = e.substring(i.raw.length), n.push(i), !0) : !1))) {
        if (i = this.tokenizer.escape(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.tag(e)) {
          e = e.substring(i.raw.length), r = n[n.length - 1], r && i.type === "text" && r.type === "text" ? (r.raw += i.raw, r.text += i.text) : n.push(i);
          continue;
        }
        if (i = this.tokenizer.link(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(i.raw.length), r = n[n.length - 1], r && i.type === "text" && r.type === "text" ? (r.raw += i.raw, r.text += i.text) : n.push(i);
          continue;
        }
        if (i = this.tokenizer.emStrong(e, o, m)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.codespan(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.br(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.del(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (i = this.tokenizer.autolink(e)) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (!this.state.inLink && (i = this.tokenizer.url(e))) {
          e = e.substring(i.raw.length), n.push(i);
          continue;
        }
        if (a = e, this.options.extensions && this.options.extensions.startInline) {
          let d = 1 / 0;
          const u = e.slice(1);
          let h;
          this.options.extensions.startInline.forEach((k) => {
            h = k.call({ lexer: this }, u), typeof h == "number" && h >= 0 && (d = Math.min(d, h));
          }), d < 1 / 0 && d >= 0 && (a = e.substring(0, d + 1));
        }
        if (i = this.tokenizer.inlineText(a)) {
          e = e.substring(i.raw.length), i.raw.slice(-1) !== "_" && (m = i.raw.slice(-1)), l = !0, r = n[n.length - 1], r && r.type === "text" ? (r.raw += i.raw, r.text += i.text) : n.push(i);
          continue;
        }
        if (e) {
          const d = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(d);
            break;
          } else
            throw new Error(d);
        }
      }
    return n;
  }
}
class ge {
  constructor(e) {
    F(this, "options");
    this.options = e || wt;
  }
  code(e, n, i) {
    var a;
    const r = (a = (n || "").match(/^\S*/)) == null ? void 0 : a[0];
    return e = e.replace(/\n$/, "") + `
`, r ? '<pre><code class="language-' + X(r) + '">' + (i ? e : X(e, !0)) + `</code></pre>
` : "<pre><code>" + (i ? e : X(e, !0)) + `</code></pre>
`;
  }
  blockquote(e) {
    return `<blockquote>
${e}</blockquote>
`;
  }
  html(e, n) {
    return e;
  }
  heading(e, n, i) {
    return `<h${n}>${e}</h${n}>
`;
  }
  hr() {
    return `<hr>
`;
  }
  list(e, n, i) {
    const r = n ? "ol" : "ul", a = n && i !== 1 ? ' start="' + i + '"' : "";
    return "<" + r + a + `>
` + e + "</" + r + `>
`;
  }
  listitem(e, n, i) {
    return `<li>${e}</li>
`;
  }
  checkbox(e) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(e) {
    return `<p>${e}</p>
`;
  }
  table(e, n) {
    return n && (n = `<tbody>${n}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + n + `</table>
`;
  }
  tablerow(e) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e, n) {
    const i = n.header ? "th" : "td";
    return (n.align ? `<${i} align="${n.align}">` : `<${i}>`) + e + `</${i}>
`;
  }
  /**
   * span level renderer
   */
  strong(e) {
    return `<strong>${e}</strong>`;
  }
  em(e) {
    return `<em>${e}</em>`;
  }
  codespan(e) {
    return `<code>${e}</code>`;
  }
  br() {
    return "<br>";
  }
  del(e) {
    return `<del>${e}</del>`;
  }
  link(e, n, i) {
    const r = qn(e);
    if (r === null)
      return i;
    e = r;
    let a = '<a href="' + e + '"';
    return n && (a += ' title="' + n + '"'), a += ">" + i + "</a>", a;
  }
  image(e, n, i) {
    const r = qn(e);
    if (r === null)
      return i;
    e = r;
    let a = `<img src="${e}" alt="${i}"`;
    return n && (a += ` title="${n}"`), a += ">", a;
  }
  text(e) {
    return e;
  }
}
class gn {
  // no need for block level renderers
  strong(e) {
    return e;
  }
  em(e) {
    return e;
  }
  codespan(e) {
    return e;
  }
  del(e) {
    return e;
  }
  html(e) {
    return e;
  }
  text(e) {
    return e;
  }
  link(e, n, i) {
    return "" + i;
  }
  image(e, n, i) {
    return "" + i;
  }
  br() {
    return "";
  }
}
class at {
  constructor(e) {
    F(this, "options");
    F(this, "renderer");
    F(this, "textRenderer");
    this.options = e || wt, this.options.renderer = this.options.renderer || new ge(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new gn();
  }
  /**
   * Static Parse Method
   */
  static parse(e, n) {
    return new at(n).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, n) {
    return new at(n).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, n = !0) {
    let i = "";
    for (let r = 0; r < e.length; r++) {
      const a = e[r];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[a.type]) {
        const o = a, p = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (p !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(o.type)) {
          i += p || "";
          continue;
        }
      }
      switch (a.type) {
        case "space":
          continue;
        case "hr": {
          i += this.renderer.hr();
          continue;
        }
        case "heading": {
          const o = a;
          i += this.renderer.heading(this.parseInline(o.tokens), o.depth, lp(this.parseInline(o.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const o = a;
          i += this.renderer.code(o.text, o.lang, !!o.escaped);
          continue;
        }
        case "table": {
          const o = a;
          let p = "", l = "";
          for (let d = 0; d < o.header.length; d++)
            l += this.renderer.tablecell(this.parseInline(o.header[d].tokens), { header: !0, align: o.align[d] });
          p += this.renderer.tablerow(l);
          let m = "";
          for (let d = 0; d < o.rows.length; d++) {
            const u = o.rows[d];
            l = "";
            for (let h = 0; h < u.length; h++)
              l += this.renderer.tablecell(this.parseInline(u[h].tokens), { header: !1, align: o.align[h] });
            m += this.renderer.tablerow(l);
          }
          i += this.renderer.table(p, m);
          continue;
        }
        case "blockquote": {
          const o = a, p = this.parse(o.tokens);
          i += this.renderer.blockquote(p);
          continue;
        }
        case "list": {
          const o = a, p = o.ordered, l = o.start, m = o.loose;
          let d = "";
          for (let u = 0; u < o.items.length; u++) {
            const h = o.items[u], k = h.checked, c = h.task;
            let g = "";
            if (h.task) {
              const f = this.renderer.checkbox(!!k);
              m ? h.tokens.length > 0 && h.tokens[0].type === "paragraph" ? (h.tokens[0].text = f + " " + h.tokens[0].text, h.tokens[0].tokens && h.tokens[0].tokens.length > 0 && h.tokens[0].tokens[0].type === "text" && (h.tokens[0].tokens[0].text = f + " " + h.tokens[0].tokens[0].text)) : h.tokens.unshift({
                type: "text",
                text: f + " "
              }) : g += f + " ";
            }
            g += this.parse(h.tokens, m), d += this.renderer.listitem(g, c, !!k);
          }
          i += this.renderer.list(d, p, l);
          continue;
        }
        case "html": {
          const o = a;
          i += this.renderer.html(o.text, o.block);
          continue;
        }
        case "paragraph": {
          const o = a;
          i += this.renderer.paragraph(this.parseInline(o.tokens));
          continue;
        }
        case "text": {
          let o = a, p = o.tokens ? this.parseInline(o.tokens) : o.text;
          for (; r + 1 < e.length && e[r + 1].type === "text"; )
            o = e[++r], p += `
` + (o.tokens ? this.parseInline(o.tokens) : o.text);
          i += n ? this.renderer.paragraph(p) : p;
          continue;
        }
        default: {
          const o = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return i;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, n) {
    n = n || this.renderer;
    let i = "";
    for (let r = 0; r < e.length; r++) {
      const a = e[r];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[a.type]) {
        const o = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          i += o || "";
          continue;
        }
      }
      switch (a.type) {
        case "escape": {
          const o = a;
          i += n.text(o.text);
          break;
        }
        case "html": {
          const o = a;
          i += n.html(o.text);
          break;
        }
        case "link": {
          const o = a;
          i += n.link(o.href, o.title, this.parseInline(o.tokens, n));
          break;
        }
        case "image": {
          const o = a;
          i += n.image(o.href, o.title, o.text);
          break;
        }
        case "strong": {
          const o = a;
          i += n.strong(this.parseInline(o.tokens, n));
          break;
        }
        case "em": {
          const o = a;
          i += n.em(this.parseInline(o.tokens, n));
          break;
        }
        case "codespan": {
          const o = a;
          i += n.codespan(o.text);
          break;
        }
        case "br": {
          i += n.br();
          break;
        }
        case "del": {
          const o = a;
          i += n.del(this.parseInline(o.tokens, n));
          break;
        }
        case "text": {
          const o = a;
          i += n.text(o.text);
          break;
        }
        default: {
          const o = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent)
            return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return i;
  }
}
class Ft {
  constructor(e) {
    F(this, "options");
    this.options = e || wt;
  }
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
}
F(Ft, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
var yt, Ye, mr;
class jp {
  constructor(...e) {
    zn(this, yt);
    F(this, "defaults", pn());
    F(this, "options", this.setOptions);
    F(this, "parse", Kt(this, yt, Ye).call(this, ot.lex, at.parse));
    F(this, "parseInline", Kt(this, yt, Ye).call(this, ot.lexInline, at.parseInline));
    F(this, "Parser", at);
    F(this, "Renderer", ge);
    F(this, "TextRenderer", gn);
    F(this, "Lexer", ot);
    F(this, "Tokenizer", de);
    F(this, "Hooks", Ft);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, n) {
    var r, a;
    let i = [];
    for (const o of e)
      switch (i = i.concat(n.call(this, o)), o.type) {
        case "table": {
          const p = o;
          for (const l of p.header)
            i = i.concat(this.walkTokens(l.tokens, n));
          for (const l of p.rows)
            for (const m of l)
              i = i.concat(this.walkTokens(m.tokens, n));
          break;
        }
        case "list": {
          const p = o;
          i = i.concat(this.walkTokens(p.items, n));
          break;
        }
        default: {
          const p = o;
          (a = (r = this.defaults.extensions) == null ? void 0 : r.childTokens) != null && a[p.type] ? this.defaults.extensions.childTokens[p.type].forEach((l) => {
            const m = p[l].flat(1 / 0);
            i = i.concat(this.walkTokens(m, n));
          }) : p.tokens && (i = i.concat(this.walkTokens(p.tokens, n)));
        }
      }
    return i;
  }
  use(...e) {
    const n = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((i) => {
      const r = { ...i };
      if (r.async = this.defaults.async || r.async || !1, i.extensions && (i.extensions.forEach((a) => {
        if (!a.name)
          throw new Error("extension name required");
        if ("renderer" in a) {
          const o = n.renderers[a.name];
          o ? n.renderers[a.name] = function(...p) {
            let l = a.renderer.apply(this, p);
            return l === !1 && (l = o.apply(this, p)), l;
          } : n.renderers[a.name] = a.renderer;
        }
        if ("tokenizer" in a) {
          if (!a.level || a.level !== "block" && a.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const o = n[a.level];
          o ? o.unshift(a.tokenizer) : n[a.level] = [a.tokenizer], a.start && (a.level === "block" ? n.startBlock ? n.startBlock.push(a.start) : n.startBlock = [a.start] : a.level === "inline" && (n.startInline ? n.startInline.push(a.start) : n.startInline = [a.start]));
        }
        "childTokens" in a && a.childTokens && (n.childTokens[a.name] = a.childTokens);
      }), r.extensions = n), i.renderer) {
        const a = this.defaults.renderer || new ge(this.defaults);
        for (const o in i.renderer) {
          if (!(o in a))
            throw new Error(`renderer '${o}' does not exist`);
          if (o === "options")
            continue;
          const p = o, l = i.renderer[p], m = a[p];
          a[p] = (...d) => {
            let u = l.apply(a, d);
            return u === !1 && (u = m.apply(a, d)), u || "";
          };
        }
        r.renderer = a;
      }
      if (i.tokenizer) {
        const a = this.defaults.tokenizer || new de(this.defaults);
        for (const o in i.tokenizer) {
          if (!(o in a))
            throw new Error(`tokenizer '${o}' does not exist`);
          if (["options", "rules", "lexer"].includes(o))
            continue;
          const p = o, l = i.tokenizer[p], m = a[p];
          a[p] = (...d) => {
            let u = l.apply(a, d);
            return u === !1 && (u = m.apply(a, d)), u;
          };
        }
        r.tokenizer = a;
      }
      if (i.hooks) {
        const a = this.defaults.hooks || new Ft();
        for (const o in i.hooks) {
          if (!(o in a))
            throw new Error(`hook '${o}' does not exist`);
          if (o === "options")
            continue;
          const p = o, l = i.hooks[p], m = a[p];
          Ft.passThroughHooks.has(o) ? a[p] = (d) => {
            if (this.defaults.async)
              return Promise.resolve(l.call(a, d)).then((h) => m.call(a, h));
            const u = l.call(a, d);
            return m.call(a, u);
          } : a[p] = (...d) => {
            let u = l.apply(a, d);
            return u === !1 && (u = m.apply(a, d)), u;
          };
        }
        r.hooks = a;
      }
      if (i.walkTokens) {
        const a = this.defaults.walkTokens, o = i.walkTokens;
        r.walkTokens = function(p) {
          let l = [];
          return l.push(o.call(this, p)), a && (l = l.concat(a.call(this, p))), l;
        };
      }
      this.defaults = { ...this.defaults, ...r };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, n) {
    return ot.lex(e, n ?? this.defaults);
  }
  parser(e, n) {
    return at.parse(e, n ?? this.defaults);
  }
}
yt = new WeakSet(), Ye = function(e, n) {
  return (i, r) => {
    const a = { ...r }, o = { ...this.defaults, ...a };
    this.defaults.async === !0 && a.async === !1 && (o.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), o.async = !0);
    const p = Kt(this, yt, mr).call(this, !!o.silent, !!o.async);
    if (typeof i > "u" || i === null)
      return p(new Error("marked(): input parameter is undefined or null"));
    if (typeof i != "string")
      return p(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(i) + ", string expected"));
    if (o.hooks && (o.hooks.options = o), o.async)
      return Promise.resolve(o.hooks ? o.hooks.preprocess(i) : i).then((l) => e(l, o)).then((l) => o.hooks ? o.hooks.processAllTokens(l) : l).then((l) => o.walkTokens ? Promise.all(this.walkTokens(l, o.walkTokens)).then(() => l) : l).then((l) => n(l, o)).then((l) => o.hooks ? o.hooks.postprocess(l) : l).catch(p);
    try {
      o.hooks && (i = o.hooks.preprocess(i));
      let l = e(i, o);
      o.hooks && (l = o.hooks.processAllTokens(l)), o.walkTokens && this.walkTokens(l, o.walkTokens);
      let m = n(l, o);
      return o.hooks && (m = o.hooks.postprocess(m)), m;
    } catch (l) {
      return p(l);
    }
  };
}, mr = function(e, n) {
  return (i) => {
    if (i.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
      const r = "<p>An error occurred:</p><pre>" + X(i.message + "", !0) + "</pre>";
      return n ? Promise.resolve(r) : r;
    }
    if (n)
      return Promise.reject(i);
    throw i;
  };
};
const bt = new jp();
function N(t, e) {
  return bt.parse(t, e);
}
N.options = N.setOptions = function(t) {
  return bt.setOptions(t), N.defaults = bt.defaults, tr(N.defaults), N;
};
N.getDefaults = pn;
N.defaults = wt;
N.use = function(...t) {
  return bt.use(...t), N.defaults = bt.defaults, tr(N.defaults), N;
};
N.walkTokens = function(t, e) {
  return bt.walkTokens(t, e);
};
N.parseInline = bt.parseInline;
N.Parser = at;
N.parser = at.parse;
N.Renderer = ge;
N.TextRenderer = gn;
N.Lexer = ot;
N.lexer = ot.lex;
N.Tokenizer = de;
N.Hooks = Ft;
N.parse = N;
N.options;
N.setOptions;
N.use;
N.walkTokens;
N.parseInline;
at.parse;
ot.lex;
var Ee = {}, un = {}, fn = {}, kt = {}, hn = {}, xn = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.Doctype = t.CDATA = t.Tag = t.Style = t.Script = t.Comment = t.Directive = t.Text = t.Root = t.isTag = t.ElementType = void 0;
  var e;
  (function(i) {
    i.Root = "root", i.Text = "text", i.Directive = "directive", i.Comment = "comment", i.Script = "script", i.Style = "style", i.Tag = "tag", i.CDATA = "cdata", i.Doctype = "doctype";
  })(e = t.ElementType || (t.ElementType = {}));
  function n(i) {
    return i.type === e.Tag || i.type === e.Script || i.type === e.Style;
  }
  t.isTag = n, t.Root = e.Root, t.Text = e.Text, t.Directive = e.Directive, t.Comment = e.Comment, t.Script = e.Script, t.Style = e.Style, t.Tag = e.Tag, t.CDATA = e.CDATA, t.Doctype = e.Doctype;
})(xn);
var z = {}, dt = U && U.__extends || /* @__PURE__ */ function() {
  var t = function(e, n) {
    return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
      i.__proto__ = r;
    } || function(i, r) {
      for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (i[a] = r[a]);
    }, t(e, n);
  };
  return function(e, n) {
    if (typeof n != "function" && n !== null)
      throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
    t(e, n);
    function i() {
      this.constructor = e;
    }
    e.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
  };
}(), Mt = U && U.__assign || function() {
  return Mt = Object.assign || function(t) {
    for (var e, n = 1, i = arguments.length; n < i; n++) {
      e = arguments[n];
      for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    }
    return t;
  }, Mt.apply(this, arguments);
};
Object.defineProperty(z, "__esModule", { value: !0 });
z.cloneNode = z.hasChildren = z.isDocument = z.isDirective = z.isComment = z.isText = z.isCDATA = z.isTag = z.Element = z.Document = z.CDATA = z.NodeWithChildren = z.ProcessingInstruction = z.Comment = z.Text = z.DataNode = z.Node = void 0;
var Z = xn, bn = (
  /** @class */
  function() {
    function t() {
      this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
    }
    return Object.defineProperty(t.prototype, "parentNode", {
      // Read-write aliases for properties
      /**
       * Same as {@link parent}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.parent;
      },
      set: function(e) {
        this.parent = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "previousSibling", {
      /**
       * Same as {@link prev}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.prev;
      },
      set: function(e) {
        this.prev = e;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "nextSibling", {
      /**
       * Same as {@link next}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.next;
      },
      set: function(e) {
        this.next = e;
      },
      enumerable: !1,
      configurable: !0
    }), t.prototype.cloneNode = function(e) {
      return e === void 0 && (e = !1), yn(this, e);
    }, t;
  }()
);
z.Node = bn;
var Se = (
  /** @class */
  function(t) {
    dt(e, t);
    function e(n) {
      var i = t.call(this) || this;
      return i.data = n, i;
    }
    return Object.defineProperty(e.prototype, "nodeValue", {
      /**
       * Same as {@link data}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.data;
      },
      set: function(n) {
        this.data = n;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(bn)
);
z.DataNode = Se;
var dr = (
  /** @class */
  function(t) {
    dt(e, t);
    function e() {
      var n = t !== null && t.apply(this, arguments) || this;
      return n.type = Z.ElementType.Text, n;
    }
    return Object.defineProperty(e.prototype, "nodeType", {
      get: function() {
        return 3;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Se)
);
z.Text = dr;
var cr = (
  /** @class */
  function(t) {
    dt(e, t);
    function e() {
      var n = t !== null && t.apply(this, arguments) || this;
      return n.type = Z.ElementType.Comment, n;
    }
    return Object.defineProperty(e.prototype, "nodeType", {
      get: function() {
        return 8;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Se)
);
z.Comment = cr;
var gr = (
  /** @class */
  function(t) {
    dt(e, t);
    function e(n, i) {
      var r = t.call(this, i) || this;
      return r.name = n, r.type = Z.ElementType.Directive, r;
    }
    return Object.defineProperty(e.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Se)
);
z.ProcessingInstruction = gr;
var Re = (
  /** @class */
  function(t) {
    dt(e, t);
    function e(n) {
      var i = t.call(this) || this;
      return i.children = n, i;
    }
    return Object.defineProperty(e.prototype, "firstChild", {
      // Aliases
      /** First child of the node. */
      get: function() {
        var n;
        return (n = this.children[0]) !== null && n !== void 0 ? n : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "lastChild", {
      /** Last child of the node. */
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "childNodes", {
      /**
       * Same as {@link children}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.children;
      },
      set: function(n) {
        this.children = n;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(bn)
);
z.NodeWithChildren = Re;
var ur = (
  /** @class */
  function(t) {
    dt(e, t);
    function e() {
      var n = t !== null && t.apply(this, arguments) || this;
      return n.type = Z.ElementType.CDATA, n;
    }
    return Object.defineProperty(e.prototype, "nodeType", {
      get: function() {
        return 4;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Re)
);
z.CDATA = ur;
var fr = (
  /** @class */
  function(t) {
    dt(e, t);
    function e() {
      var n = t !== null && t.apply(this, arguments) || this;
      return n.type = Z.ElementType.Root, n;
    }
    return Object.defineProperty(e.prototype, "nodeType", {
      get: function() {
        return 9;
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Re)
);
z.Document = fr;
var hr = (
  /** @class */
  function(t) {
    dt(e, t);
    function e(n, i, r, a) {
      r === void 0 && (r = []), a === void 0 && (a = n === "script" ? Z.ElementType.Script : n === "style" ? Z.ElementType.Style : Z.ElementType.Tag);
      var o = t.call(this, r) || this;
      return o.name = n, o.attribs = i, o.type = a, o;
    }
    return Object.defineProperty(e.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "tagName", {
      // DOM Level 1 aliases
      /**
       * Same as {@link name}.
       * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
       */
      get: function() {
        return this.name;
      },
      set: function(n) {
        this.name = n;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(e.prototype, "attributes", {
      get: function() {
        var n = this;
        return Object.keys(this.attribs).map(function(i) {
          var r, a;
          return {
            name: i,
            value: n.attribs[i],
            namespace: (r = n["x-attribsNamespace"]) === null || r === void 0 ? void 0 : r[i],
            prefix: (a = n["x-attribsPrefix"]) === null || a === void 0 ? void 0 : a[i]
          };
        });
      },
      enumerable: !1,
      configurable: !0
    }), e;
  }(Re)
);
z.Element = hr;
function xr(t) {
  return (0, Z.isTag)(t);
}
z.isTag = xr;
function br(t) {
  return t.type === Z.ElementType.CDATA;
}
z.isCDATA = br;
function yr(t) {
  return t.type === Z.ElementType.Text;
}
z.isText = yr;
function wr(t) {
  return t.type === Z.ElementType.Comment;
}
z.isComment = wr;
function kr(t) {
  return t.type === Z.ElementType.Directive;
}
z.isDirective = kr;
function _r(t) {
  return t.type === Z.ElementType.Root;
}
z.isDocument = _r;
function Bp(t) {
  return Object.prototype.hasOwnProperty.call(t, "children");
}
z.hasChildren = Bp;
function yn(t, e) {
  e === void 0 && (e = !1);
  var n;
  if (yr(t))
    n = new dr(t.data);
  else if (wr(t))
    n = new cr(t.data);
  else if (xr(t)) {
    var i = e ? Be(t.children) : [], r = new hr(t.name, Mt({}, t.attribs), i);
    i.forEach(function(l) {
      return l.parent = r;
    }), t.namespace != null && (r.namespace = t.namespace), t["x-attribsNamespace"] && (r["x-attribsNamespace"] = Mt({}, t["x-attribsNamespace"])), t["x-attribsPrefix"] && (r["x-attribsPrefix"] = Mt({}, t["x-attribsPrefix"])), n = r;
  } else if (br(t)) {
    var i = e ? Be(t.children) : [], a = new ur(i);
    i.forEach(function(m) {
      return m.parent = a;
    }), n = a;
  } else if (_r(t)) {
    var i = e ? Be(t.children) : [], o = new fr(i);
    i.forEach(function(m) {
      return m.parent = o;
    }), t["x-mode"] && (o["x-mode"] = t["x-mode"]), n = o;
  } else if (kr(t)) {
    var p = new gr(t.name, t.data);
    t["x-name"] != null && (p["x-name"] = t["x-name"], p["x-publicId"] = t["x-publicId"], p["x-systemId"] = t["x-systemId"]), n = p;
  } else
    throw new Error("Not implemented yet: ".concat(t.type));
  return n.startIndex = t.startIndex, n.endIndex = t.endIndex, t.sourceCodeLocation != null && (n.sourceCodeLocation = t.sourceCodeLocation), n;
}
z.cloneNode = yn;
function Be(t) {
  for (var e = t.map(function(i) {
    return yn(i, !0);
  }), n = 1; n < e.length; n++)
    e[n].prev = e[n - 1], e[n - 1].next = e[n];
  return e;
}
(function(t) {
  var e = U && U.__createBinding || (Object.create ? function(p, l, m, d) {
    d === void 0 && (d = m);
    var u = Object.getOwnPropertyDescriptor(l, m);
    (!u || ("get" in u ? !l.__esModule : u.writable || u.configurable)) && (u = { enumerable: !0, get: function() {
      return l[m];
    } }), Object.defineProperty(p, d, u);
  } : function(p, l, m, d) {
    d === void 0 && (d = m), p[d] = l[m];
  }), n = U && U.__exportStar || function(p, l) {
    for (var m in p) m !== "default" && !Object.prototype.hasOwnProperty.call(l, m) && e(l, p, m);
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.DomHandler = void 0;
  var i = xn, r = z;
  n(z, t);
  var a = {
    withStartIndices: !1,
    withEndIndices: !1,
    xmlMode: !1
  }, o = (
    /** @class */
    function() {
      function p(l, m, d) {
        this.dom = [], this.root = new r.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof m == "function" && (d = m, m = a), typeof l == "object" && (m = l, l = void 0), this.callback = l ?? null, this.options = m ?? a, this.elementCB = d ?? null;
      }
      return p.prototype.onparserinit = function(l) {
        this.parser = l;
      }, p.prototype.onreset = function() {
        this.dom = [], this.root = new r.Document(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
      }, p.prototype.onend = function() {
        this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
      }, p.prototype.onerror = function(l) {
        this.handleCallback(l);
      }, p.prototype.onclosetag = function() {
        this.lastNode = null;
        var l = this.tagStack.pop();
        this.options.withEndIndices && (l.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(l);
      }, p.prototype.onopentag = function(l, m) {
        var d = this.options.xmlMode ? i.ElementType.Tag : void 0, u = new r.Element(l, m, void 0, d);
        this.addNode(u), this.tagStack.push(u);
      }, p.prototype.ontext = function(l) {
        var m = this.lastNode;
        if (m && m.type === i.ElementType.Text)
          m.data += l, this.options.withEndIndices && (m.endIndex = this.parser.endIndex);
        else {
          var d = new r.Text(l);
          this.addNode(d), this.lastNode = d;
        }
      }, p.prototype.oncomment = function(l) {
        if (this.lastNode && this.lastNode.type === i.ElementType.Comment) {
          this.lastNode.data += l;
          return;
        }
        var m = new r.Comment(l);
        this.addNode(m), this.lastNode = m;
      }, p.prototype.oncommentend = function() {
        this.lastNode = null;
      }, p.prototype.oncdatastart = function() {
        var l = new r.Text(""), m = new r.CDATA([l]);
        this.addNode(m), l.parent = m, this.lastNode = l;
      }, p.prototype.oncdataend = function() {
        this.lastNode = null;
      }, p.prototype.onprocessinginstruction = function(l, m) {
        var d = new r.ProcessingInstruction(l, m);
        this.addNode(d);
      }, p.prototype.handleCallback = function(l) {
        if (typeof this.callback == "function")
          this.callback(l, this.dom);
        else if (l)
          throw l;
      }, p.prototype.addNode = function(l) {
        var m = this.tagStack[this.tagStack.length - 1], d = m.children[m.children.length - 1];
        this.options.withStartIndices && (l.startIndex = this.parser.startIndex), this.options.withEndIndices && (l.endIndex = this.parser.endIndex), m.children.push(l), d && (l.prev = d, d.next = l), l.parent = m, this.lastNode = null;
      }, p;
    }()
  );
  t.DomHandler = o, t.default = o;
})(hn);
var vr = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.CARRIAGE_RETURN_PLACEHOLDER_REGEX = t.CARRIAGE_RETURN_PLACEHOLDER = t.CARRIAGE_RETURN_REGEX = t.CARRIAGE_RETURN = t.CASE_SENSITIVE_TAG_NAMES_MAP = t.CASE_SENSITIVE_TAG_NAMES = void 0, t.CASE_SENSITIVE_TAG_NAMES = [
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "linearGradient",
    "radialGradient",
    "textPath"
  ], t.CASE_SENSITIVE_TAG_NAMES_MAP = t.CASE_SENSITIVE_TAG_NAMES.reduce(function(e, n) {
    return e[n.toLowerCase()] = n, e;
  }, {}), t.CARRIAGE_RETURN = "\r", t.CARRIAGE_RETURN_REGEX = new RegExp(t.CARRIAGE_RETURN, "g"), t.CARRIAGE_RETURN_PLACEHOLDER = "__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_".concat(Date.now(), "__"), t.CARRIAGE_RETURN_PLACEHOLDER_REGEX = new RegExp(t.CARRIAGE_RETURN_PLACEHOLDER, "g");
})(vr);
Object.defineProperty(kt, "__esModule", { value: !0 });
kt.formatAttributes = Er;
kt.escapeSpecialCharacters = Hp;
kt.revertEscapedCharacters = Sr;
kt.formatDOM = Rr;
var ee = hn, jt = vr;
function Up(t) {
  return jt.CASE_SENSITIVE_TAG_NAMES_MAP[t];
}
function Er(t) {
  for (var e = {}, n = 0, i = t.length; n < i; n++) {
    var r = t[n];
    e[r.name] = r.value;
  }
  return e;
}
function $p(t) {
  t = t.toLowerCase();
  var e = Up(t);
  return e || t;
}
function Hp(t) {
  return t.replace(jt.CARRIAGE_RETURN_REGEX, jt.CARRIAGE_RETURN_PLACEHOLDER);
}
function Sr(t) {
  return t.replace(jt.CARRIAGE_RETURN_PLACEHOLDER_REGEX, jt.CARRIAGE_RETURN);
}
function Rr(t, e, n) {
  e === void 0 && (e = null);
  for (var i = [], r, a = 0, o = t.length; a < o; a++) {
    var p = t[a];
    switch (p.nodeType) {
      case 1: {
        var l = $p(p.nodeName);
        r = new ee.Element(l, Er(p.attributes)), r.children = Rr(
          // template children are on content
          l === "template" ? p.content.childNodes : p.childNodes,
          r
        );
        break;
      }
      case 3:
        r = new ee.Text(Sr(p.nodeValue));
        break;
      case 8:
        r = new ee.Comment(p.nodeValue);
        break;
      default:
        continue;
    }
    var m = i[a - 1] || null;
    m && (m.next = r), r.parent = e, r.prev = m, r.next = null, i.push(r);
  }
  return n && (r = new ee.ProcessingInstruction(n.substring(0, n.indexOf(" ")).toLowerCase(), n), r.next = i[0] || null, r.parent = e, i.unshift(r), i[1] && (i[1].prev = i[0])), i;
}
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.default = Wp;
var Vp = kt, Yn = "html", Kn = "head", ne = "body", Gp = /<([a-zA-Z]+[0-9]?)/, Jn = /<head[^]*>/i, Qn = /<body[^]*>/i, ue = function(t, e) {
  throw new Error("This browser does not support `document.implementation.createHTMLDocument`");
}, Ke = function(t, e) {
  throw new Error("This browser does not support `DOMParser.prototype.parseFromString`");
}, ti = typeof window == "object" && window.DOMParser;
if (typeof ti == "function") {
  var qp = new ti(), Zp = "text/html";
  Ke = function(t, e) {
    return e && (t = "<".concat(e, ">").concat(t, "</").concat(e, ">")), qp.parseFromString(t, Zp);
  }, ue = Ke;
}
if (typeof document == "object" && document.implementation) {
  var ie = document.implementation.createHTMLDocument();
  ue = function(t, e) {
    if (e) {
      var n = ie.documentElement.querySelector(e);
      return n && (n.innerHTML = t), ie;
    }
    return ie.documentElement.innerHTML = t, ie;
  };
}
var re = typeof document == "object" && document.createElement("template"), Je;
re && re.content && (Je = function(t) {
  return re.innerHTML = t, re.content.childNodes;
});
function Wp(t) {
  var e, n;
  t = (0, Vp.escapeSpecialCharacters)(t);
  var i = t.match(Gp), r = i && i[1] ? i[1].toLowerCase() : "";
  switch (r) {
    case Yn: {
      var a = Ke(t);
      if (!Jn.test(t)) {
        var o = a.querySelector(Kn);
        (e = o == null ? void 0 : o.parentNode) === null || e === void 0 || e.removeChild(o);
      }
      if (!Qn.test(t)) {
        var o = a.querySelector(ne);
        (n = o == null ? void 0 : o.parentNode) === null || n === void 0 || n.removeChild(o);
      }
      return a.querySelectorAll(Yn);
    }
    case Kn:
    case ne: {
      var p = ue(t).querySelectorAll(r);
      return Qn.test(t) && Jn.test(t) ? p[0].parentNode.childNodes : p;
    }
    default: {
      if (Je)
        return Je(t);
      var o = ue(t, ne).querySelector(ne);
      return o.childNodes;
    }
  }
}
var Xp = U && U.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(un, "__esModule", { value: !0 });
un.default = Qp;
var Yp = Xp(fn), Kp = kt, Jp = /<(![a-zA-Z\s]+)>/;
function Qp(t) {
  if (typeof t != "string")
    throw new TypeError("First argument must be a string");
  if (!t)
    return [];
  var e = t.match(Jp), n = e ? e[1] : void 0;
  return (0, Kp.formatDOM)((0, Yp.default)(t), null, n);
}
var Te = {}, nt = {}, Ae = {}, ts = 0;
Ae.SAME = ts;
var es = 1;
Ae.CAMELCASE = es;
Ae.possibleStandardNames = {
  accept: 0,
  acceptCharset: 1,
  "accept-charset": "acceptCharset",
  accessKey: 1,
  action: 0,
  allowFullScreen: 1,
  alt: 0,
  as: 0,
  async: 0,
  autoCapitalize: 1,
  autoComplete: 1,
  autoCorrect: 1,
  autoFocus: 1,
  autoPlay: 1,
  autoSave: 1,
  capture: 0,
  cellPadding: 1,
  cellSpacing: 1,
  challenge: 0,
  charSet: 1,
  checked: 0,
  children: 0,
  cite: 0,
  class: "className",
  classID: 1,
  className: 1,
  cols: 0,
  colSpan: 1,
  content: 0,
  contentEditable: 1,
  contextMenu: 1,
  controls: 0,
  controlsList: 1,
  coords: 0,
  crossOrigin: 1,
  dangerouslySetInnerHTML: 1,
  data: 0,
  dateTime: 1,
  default: 0,
  defaultChecked: 1,
  defaultValue: 1,
  defer: 0,
  dir: 0,
  disabled: 0,
  disablePictureInPicture: 1,
  disableRemotePlayback: 1,
  download: 0,
  draggable: 0,
  encType: 1,
  enterKeyHint: 1,
  for: "htmlFor",
  form: 0,
  formMethod: 1,
  formAction: 1,
  formEncType: 1,
  formNoValidate: 1,
  formTarget: 1,
  frameBorder: 1,
  headers: 0,
  height: 0,
  hidden: 0,
  high: 0,
  href: 0,
  hrefLang: 1,
  htmlFor: 1,
  httpEquiv: 1,
  "http-equiv": "httpEquiv",
  icon: 0,
  id: 0,
  innerHTML: 1,
  inputMode: 1,
  integrity: 0,
  is: 0,
  itemID: 1,
  itemProp: 1,
  itemRef: 1,
  itemScope: 1,
  itemType: 1,
  keyParams: 1,
  keyType: 1,
  kind: 0,
  label: 0,
  lang: 0,
  list: 0,
  loop: 0,
  low: 0,
  manifest: 0,
  marginWidth: 1,
  marginHeight: 1,
  max: 0,
  maxLength: 1,
  media: 0,
  mediaGroup: 1,
  method: 0,
  min: 0,
  minLength: 1,
  multiple: 0,
  muted: 0,
  name: 0,
  noModule: 1,
  nonce: 0,
  noValidate: 1,
  open: 0,
  optimum: 0,
  pattern: 0,
  placeholder: 0,
  playsInline: 1,
  poster: 0,
  preload: 0,
  profile: 0,
  radioGroup: 1,
  readOnly: 1,
  referrerPolicy: 1,
  rel: 0,
  required: 0,
  reversed: 0,
  role: 0,
  rows: 0,
  rowSpan: 1,
  sandbox: 0,
  scope: 0,
  scoped: 0,
  scrolling: 0,
  seamless: 0,
  selected: 0,
  shape: 0,
  size: 0,
  sizes: 0,
  span: 0,
  spellCheck: 1,
  src: 0,
  srcDoc: 1,
  srcLang: 1,
  srcSet: 1,
  start: 0,
  step: 0,
  style: 0,
  summary: 0,
  tabIndex: 1,
  target: 0,
  title: 0,
  type: 0,
  useMap: 1,
  value: 0,
  width: 0,
  wmode: 0,
  wrap: 0,
  about: 0,
  accentHeight: 1,
  "accent-height": "accentHeight",
  accumulate: 0,
  additive: 0,
  alignmentBaseline: 1,
  "alignment-baseline": "alignmentBaseline",
  allowReorder: 1,
  alphabetic: 0,
  amplitude: 0,
  arabicForm: 1,
  "arabic-form": "arabicForm",
  ascent: 0,
  attributeName: 1,
  attributeType: 1,
  autoReverse: 1,
  azimuth: 0,
  baseFrequency: 1,
  baselineShift: 1,
  "baseline-shift": "baselineShift",
  baseProfile: 1,
  bbox: 0,
  begin: 0,
  bias: 0,
  by: 0,
  calcMode: 1,
  capHeight: 1,
  "cap-height": "capHeight",
  clip: 0,
  clipPath: 1,
  "clip-path": "clipPath",
  clipPathUnits: 1,
  clipRule: 1,
  "clip-rule": "clipRule",
  color: 0,
  colorInterpolation: 1,
  "color-interpolation": "colorInterpolation",
  colorInterpolationFilters: 1,
  "color-interpolation-filters": "colorInterpolationFilters",
  colorProfile: 1,
  "color-profile": "colorProfile",
  colorRendering: 1,
  "color-rendering": "colorRendering",
  contentScriptType: 1,
  contentStyleType: 1,
  cursor: 0,
  cx: 0,
  cy: 0,
  d: 0,
  datatype: 0,
  decelerate: 0,
  descent: 0,
  diffuseConstant: 1,
  direction: 0,
  display: 0,
  divisor: 0,
  dominantBaseline: 1,
  "dominant-baseline": "dominantBaseline",
  dur: 0,
  dx: 0,
  dy: 0,
  edgeMode: 1,
  elevation: 0,
  enableBackground: 1,
  "enable-background": "enableBackground",
  end: 0,
  exponent: 0,
  externalResourcesRequired: 1,
  fill: 0,
  fillOpacity: 1,
  "fill-opacity": "fillOpacity",
  fillRule: 1,
  "fill-rule": "fillRule",
  filter: 0,
  filterRes: 1,
  filterUnits: 1,
  floodOpacity: 1,
  "flood-opacity": "floodOpacity",
  floodColor: 1,
  "flood-color": "floodColor",
  focusable: 0,
  fontFamily: 1,
  "font-family": "fontFamily",
  fontSize: 1,
  "font-size": "fontSize",
  fontSizeAdjust: 1,
  "font-size-adjust": "fontSizeAdjust",
  fontStretch: 1,
  "font-stretch": "fontStretch",
  fontStyle: 1,
  "font-style": "fontStyle",
  fontVariant: 1,
  "font-variant": "fontVariant",
  fontWeight: 1,
  "font-weight": "fontWeight",
  format: 0,
  from: 0,
  fx: 0,
  fy: 0,
  g1: 0,
  g2: 0,
  glyphName: 1,
  "glyph-name": "glyphName",
  glyphOrientationHorizontal: 1,
  "glyph-orientation-horizontal": "glyphOrientationHorizontal",
  glyphOrientationVertical: 1,
  "glyph-orientation-vertical": "glyphOrientationVertical",
  glyphRef: 1,
  gradientTransform: 1,
  gradientUnits: 1,
  hanging: 0,
  horizAdvX: 1,
  "horiz-adv-x": "horizAdvX",
  horizOriginX: 1,
  "horiz-origin-x": "horizOriginX",
  ideographic: 0,
  imageRendering: 1,
  "image-rendering": "imageRendering",
  in2: 0,
  in: 0,
  inlist: 0,
  intercept: 0,
  k1: 0,
  k2: 0,
  k3: 0,
  k4: 0,
  k: 0,
  kernelMatrix: 1,
  kernelUnitLength: 1,
  kerning: 0,
  keyPoints: 1,
  keySplines: 1,
  keyTimes: 1,
  lengthAdjust: 1,
  letterSpacing: 1,
  "letter-spacing": "letterSpacing",
  lightingColor: 1,
  "lighting-color": "lightingColor",
  limitingConeAngle: 1,
  local: 0,
  markerEnd: 1,
  "marker-end": "markerEnd",
  markerHeight: 1,
  markerMid: 1,
  "marker-mid": "markerMid",
  markerStart: 1,
  "marker-start": "markerStart",
  markerUnits: 1,
  markerWidth: 1,
  mask: 0,
  maskContentUnits: 1,
  maskUnits: 1,
  mathematical: 0,
  mode: 0,
  numOctaves: 1,
  offset: 0,
  opacity: 0,
  operator: 0,
  order: 0,
  orient: 0,
  orientation: 0,
  origin: 0,
  overflow: 0,
  overlinePosition: 1,
  "overline-position": "overlinePosition",
  overlineThickness: 1,
  "overline-thickness": "overlineThickness",
  paintOrder: 1,
  "paint-order": "paintOrder",
  panose1: 0,
  "panose-1": "panose1",
  pathLength: 1,
  patternContentUnits: 1,
  patternTransform: 1,
  patternUnits: 1,
  pointerEvents: 1,
  "pointer-events": "pointerEvents",
  points: 0,
  pointsAtX: 1,
  pointsAtY: 1,
  pointsAtZ: 1,
  prefix: 0,
  preserveAlpha: 1,
  preserveAspectRatio: 1,
  primitiveUnits: 1,
  property: 0,
  r: 0,
  radius: 0,
  refX: 1,
  refY: 1,
  renderingIntent: 1,
  "rendering-intent": "renderingIntent",
  repeatCount: 1,
  repeatDur: 1,
  requiredExtensions: 1,
  requiredFeatures: 1,
  resource: 0,
  restart: 0,
  result: 0,
  results: 0,
  rotate: 0,
  rx: 0,
  ry: 0,
  scale: 0,
  security: 0,
  seed: 0,
  shapeRendering: 1,
  "shape-rendering": "shapeRendering",
  slope: 0,
  spacing: 0,
  specularConstant: 1,
  specularExponent: 1,
  speed: 0,
  spreadMethod: 1,
  startOffset: 1,
  stdDeviation: 1,
  stemh: 0,
  stemv: 0,
  stitchTiles: 1,
  stopColor: 1,
  "stop-color": "stopColor",
  stopOpacity: 1,
  "stop-opacity": "stopOpacity",
  strikethroughPosition: 1,
  "strikethrough-position": "strikethroughPosition",
  strikethroughThickness: 1,
  "strikethrough-thickness": "strikethroughThickness",
  string: 0,
  stroke: 0,
  strokeDasharray: 1,
  "stroke-dasharray": "strokeDasharray",
  strokeDashoffset: 1,
  "stroke-dashoffset": "strokeDashoffset",
  strokeLinecap: 1,
  "stroke-linecap": "strokeLinecap",
  strokeLinejoin: 1,
  "stroke-linejoin": "strokeLinejoin",
  strokeMiterlimit: 1,
  "stroke-miterlimit": "strokeMiterlimit",
  strokeWidth: 1,
  "stroke-width": "strokeWidth",
  strokeOpacity: 1,
  "stroke-opacity": "strokeOpacity",
  suppressContentEditableWarning: 1,
  suppressHydrationWarning: 1,
  surfaceScale: 1,
  systemLanguage: 1,
  tableValues: 1,
  targetX: 1,
  targetY: 1,
  textAnchor: 1,
  "text-anchor": "textAnchor",
  textDecoration: 1,
  "text-decoration": "textDecoration",
  textLength: 1,
  textRendering: 1,
  "text-rendering": "textRendering",
  to: 0,
  transform: 0,
  typeof: 0,
  u1: 0,
  u2: 0,
  underlinePosition: 1,
  "underline-position": "underlinePosition",
  underlineThickness: 1,
  "underline-thickness": "underlineThickness",
  unicode: 0,
  unicodeBidi: 1,
  "unicode-bidi": "unicodeBidi",
  unicodeRange: 1,
  "unicode-range": "unicodeRange",
  unitsPerEm: 1,
  "units-per-em": "unitsPerEm",
  unselectable: 0,
  vAlphabetic: 1,
  "v-alphabetic": "vAlphabetic",
  values: 0,
  vectorEffect: 1,
  "vector-effect": "vectorEffect",
  version: 0,
  vertAdvY: 1,
  "vert-adv-y": "vertAdvY",
  vertOriginX: 1,
  "vert-origin-x": "vertOriginX",
  vertOriginY: 1,
  "vert-origin-y": "vertOriginY",
  vHanging: 1,
  "v-hanging": "vHanging",
  vIdeographic: 1,
  "v-ideographic": "vIdeographic",
  viewBox: 1,
  viewTarget: 1,
  visibility: 0,
  vMathematical: 1,
  "v-mathematical": "vMathematical",
  vocab: 0,
  widths: 0,
  wordSpacing: 1,
  "word-spacing": "wordSpacing",
  writingMode: 1,
  "writing-mode": "writingMode",
  x1: 0,
  x2: 0,
  x: 0,
  xChannelSelector: 1,
  xHeight: 1,
  "x-height": "xHeight",
  xlinkActuate: 1,
  "xlink:actuate": "xlinkActuate",
  xlinkArcrole: 1,
  "xlink:arcrole": "xlinkArcrole",
  xlinkHref: 1,
  "xlink:href": "xlinkHref",
  xlinkRole: 1,
  "xlink:role": "xlinkRole",
  xlinkShow: 1,
  "xlink:show": "xlinkShow",
  xlinkTitle: 1,
  "xlink:title": "xlinkTitle",
  xlinkType: 1,
  "xlink:type": "xlinkType",
  xmlBase: 1,
  "xml:base": "xmlBase",
  xmlLang: 1,
  "xml:lang": "xmlLang",
  xmlns: 0,
  "xml:space": "xmlSpace",
  xmlnsXlink: 1,
  "xmlns:xlink": "xmlnsXlink",
  xmlSpace: 1,
  y1: 0,
  y2: 0,
  y: 0,
  yChannelSelector: 1,
  z: 0,
  zoomAndPan: 1
};
const Tr = 0, ct = 1, Ce = 2, ze = 3, wn = 4, Ar = 5, Cr = 6;
function ns(t) {
  return $.hasOwnProperty(t) ? $[t] : null;
}
function V(t, e, n, i, r, a, o) {
  this.acceptsBooleans = e === Ce || e === ze || e === wn, this.attributeName = i, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = t, this.type = e, this.sanitizeURL = a, this.removeEmptyString = o;
}
const $ = {}, is = [
  "children",
  "dangerouslySetInnerHTML",
  // TODO: This prevents the assignment of defaultValue to regular
  // elements (not just inputs). Now that ReactDOMInput assigns to the
  // defaultValue property -- do we need this?
  "defaultValue",
  "defaultChecked",
  "innerHTML",
  "suppressContentEditableWarning",
  "suppressHydrationWarning",
  "style"
];
is.forEach((t) => {
  $[t] = new V(
    t,
    Tr,
    !1,
    // mustUseProperty
    t,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(([t, e]) => {
  $[t] = new V(
    t,
    ct,
    !1,
    // mustUseProperty
    e,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
["contentEditable", "draggable", "spellCheck", "value"].forEach((t) => {
  $[t] = new V(
    t,
    Ce,
    !1,
    // mustUseProperty
    t.toLowerCase(),
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach((t) => {
  $[t] = new V(
    t,
    Ce,
    !1,
    // mustUseProperty
    t,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "allowFullScreen",
  "async",
  // Note: there is a special case that prevents it from being written to the DOM
  // on the client side because the browsers are inconsistent. Instead we call focus().
  "autoFocus",
  "autoPlay",
  "controls",
  "default",
  "defer",
  "disabled",
  "disablePictureInPicture",
  "disableRemotePlayback",
  "formNoValidate",
  "hidden",
  "loop",
  "noModule",
  "noValidate",
  "open",
  "playsInline",
  "readOnly",
  "required",
  "reversed",
  "scoped",
  "seamless",
  // Microdata
  "itemScope"
].forEach((t) => {
  $[t] = new V(
    t,
    ze,
    !1,
    // mustUseProperty
    t.toLowerCase(),
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "checked",
  // Note: `option.selected` is not updated if `select.multiple` is
  // disabled with `removeAttribute`. We have special logic for handling this.
  "multiple",
  "muted",
  "selected"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((t) => {
  $[t] = new V(
    t,
    ze,
    !0,
    // mustUseProperty
    t,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "capture",
  "download"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((t) => {
  $[t] = new V(
    t,
    wn,
    !1,
    // mustUseProperty
    t,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "cols",
  "rows",
  "size",
  "span"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((t) => {
  $[t] = new V(
    t,
    Cr,
    !1,
    // mustUseProperty
    t,
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
["rowSpan", "start"].forEach((t) => {
  $[t] = new V(
    t,
    Ar,
    !1,
    // mustUseProperty
    t.toLowerCase(),
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
const kn = /[\-\:]([a-z])/g, _n = (t) => t[1].toUpperCase();
[
  "accent-height",
  "alignment-baseline",
  "arabic-form",
  "baseline-shift",
  "cap-height",
  "clip-path",
  "clip-rule",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "dominant-baseline",
  "enable-background",
  "fill-opacity",
  "fill-rule",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "glyph-name",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "horiz-adv-x",
  "horiz-origin-x",
  "image-rendering",
  "letter-spacing",
  "lighting-color",
  "marker-end",
  "marker-mid",
  "marker-start",
  "overline-position",
  "overline-thickness",
  "paint-order",
  "panose-1",
  "pointer-events",
  "rendering-intent",
  "shape-rendering",
  "stop-color",
  "stop-opacity",
  "strikethrough-position",
  "strikethrough-thickness",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "text-anchor",
  "text-decoration",
  "text-rendering",
  "underline-position",
  "underline-thickness",
  "unicode-bidi",
  "unicode-range",
  "units-per-em",
  "v-alphabetic",
  "v-hanging",
  "v-ideographic",
  "v-mathematical",
  "vector-effect",
  "vert-adv-y",
  "vert-origin-x",
  "vert-origin-y",
  "word-spacing",
  "writing-mode",
  "xmlns:xlink",
  "x-height"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((t) => {
  const e = t.replace(kn, _n);
  $[e] = new V(
    e,
    ct,
    !1,
    // mustUseProperty
    t,
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "xlink:actuate",
  "xlink:arcrole",
  "xlink:role",
  "xlink:show",
  "xlink:title",
  "xlink:type"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((t) => {
  const e = t.replace(kn, _n);
  $[e] = new V(
    e,
    ct,
    !1,
    // mustUseProperty
    t,
    "http://www.w3.org/1999/xlink",
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
[
  "xml:base",
  "xml:lang",
  "xml:space"
  // NOTE: if you add a camelCased prop to this list,
  // you'll need to set attributeName to name.toLowerCase()
  // instead in the assignment below.
].forEach((t) => {
  const e = t.replace(kn, _n);
  $[e] = new V(
    e,
    ct,
    !1,
    // mustUseProperty
    t,
    "http://www.w3.org/XML/1998/namespace",
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
["tabIndex", "crossOrigin"].forEach((t) => {
  $[t] = new V(
    t,
    ct,
    !1,
    // mustUseProperty
    t.toLowerCase(),
    // attributeName
    null,
    // attributeNamespace
    !1,
    // sanitizeURL
    !1
    // removeEmptyString
  );
});
const rs = "xlinkHref";
$[rs] = new V(
  "xlinkHref",
  ct,
  !1,
  // mustUseProperty
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  // sanitizeURL
  !1
  // removeEmptyString
);
["src", "href", "action", "formAction"].forEach((t) => {
  $[t] = new V(
    t,
    ct,
    !1,
    // mustUseProperty
    t.toLowerCase(),
    // attributeName
    null,
    // attributeNamespace
    !0,
    // sanitizeURL
    !0
    // removeEmptyString
  );
});
const {
  CAMELCASE: os,
  SAME: as,
  possibleStandardNames: ei
} = Ae, ps = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ss = ps + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", ls = RegExp.prototype.test.bind(
  // eslint-disable-next-line no-misleading-character-class
  new RegExp("^(data|aria)-[" + ss + "]*$")
), ms = Object.keys(
  ei
).reduce((t, e) => {
  const n = ei[e];
  return n === as ? t[e] = e : n === os ? t[e.toLowerCase()] = e : t[e] = n, t;
}, {});
nt.BOOLEAN = ze;
nt.BOOLEANISH_STRING = Ce;
nt.NUMERIC = Ar;
nt.OVERLOADED_BOOLEAN = wn;
nt.POSITIVE_NUMERIC = Cr;
nt.RESERVED = Tr;
nt.STRING = ct;
nt.getPropertyInfo = ns;
nt.isCustomAttribute = ls;
nt.possibleStandardNames = ms;
var vn = {}, En = {}, ni = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, ds = /\n/g, cs = /^\s*/, gs = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, us = /^:\s*/, fs = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, hs = /^[;\s]*/, xs = /^\s+|\s+$/g, bs = `
`, ii = "/", ri = "*", gt = "", ys = "comment", ws = "declaration", ks = function(t, e) {
  if (typeof t != "string")
    throw new TypeError("First argument must be a string");
  if (!t) return [];
  e = e || {};
  var n = 1, i = 1;
  function r(c) {
    var g = c.match(ds);
    g && (n += g.length);
    var f = c.lastIndexOf(bs);
    i = ~f ? c.length - f : i + c.length;
  }
  function a() {
    var c = { line: n, column: i };
    return function(g) {
      return g.position = new o(c), m(), g;
    };
  }
  function o(c) {
    this.start = c, this.end = { line: n, column: i }, this.source = e.source;
  }
  o.prototype.content = t;
  function p(c) {
    var g = new Error(
      e.source + ":" + n + ":" + i + ": " + c
    );
    if (g.reason = c, g.filename = e.source, g.line = n, g.column = i, g.source = t, !e.silent) throw g;
  }
  function l(c) {
    var g = c.exec(t);
    if (g) {
      var f = g[0];
      return r(f), t = t.slice(f.length), g;
    }
  }
  function m() {
    l(cs);
  }
  function d(c) {
    var g;
    for (c = c || []; g = u(); )
      g !== !1 && c.push(g);
    return c;
  }
  function u() {
    var c = a();
    if (!(ii != t.charAt(0) || ri != t.charAt(1))) {
      for (var g = 2; gt != t.charAt(g) && (ri != t.charAt(g) || ii != t.charAt(g + 1)); )
        ++g;
      if (g += 2, gt === t.charAt(g - 1))
        return p("End of comment missing");
      var f = t.slice(2, g - 2);
      return i += 2, r(f), t = t.slice(g), i += 2, c({
        type: ys,
        comment: f
      });
    }
  }
  function h() {
    var c = a(), g = l(gs);
    if (g) {
      if (u(), !l(us)) return p("property missing ':'");
      var f = l(fs), b = c({
        type: ws,
        property: oi(g[0].replace(ni, gt)),
        value: f ? oi(f[0].replace(ni, gt)) : gt
      });
      return l(hs), b;
    }
  }
  function k() {
    var c = [];
    d(c);
    for (var g; g = h(); )
      g !== !1 && (c.push(g), d(c));
    return c;
  }
  return m(), k();
};
function oi(t) {
  return t ? t.replace(xs, gt) : gt;
}
var _s = U && U.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(En, "__esModule", { value: !0 });
En.default = Es;
var vs = _s(ks);
function Es(t, e) {
  var n = null;
  if (!t || typeof t != "string")
    return n;
  var i = (0, vs.default)(t), r = typeof e == "function";
  return i.forEach(function(a) {
    if (a.type === "declaration") {
      var o = a.property, p = a.value;
      r ? e(o, p, a) : p && (n = n || {}, n[o] = p);
    }
  }), n;
}
var Oe = {};
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.camelCase = void 0;
var Ss = /^--[a-zA-Z0-9_-]+$/, Rs = /-([a-z])/g, Ts = /^[^-]+$/, As = /^-(webkit|moz|ms|o|khtml)-/, Cs = /^-(ms)-/, zs = function(t) {
  return !t || Ts.test(t) || Ss.test(t);
}, Os = function(t, e) {
  return e.toUpperCase();
}, ai = function(t, e) {
  return "".concat(e, "-");
}, Ns = function(t, e) {
  return e === void 0 && (e = {}), zs(t) ? t : (t = t.toLowerCase(), e.reactCompat ? t = t.replace(Cs, ai) : t = t.replace(As, ai), t.replace(Rs, Os));
};
Oe.camelCase = Ns;
var Ls = U && U.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
}, Is = Ls(En), Fs = Oe;
function Qe(t, e) {
  var n = {};
  return !t || typeof t != "string" || (0, Is.default)(t, function(i, r) {
    i && r && (n[(0, Fs.camelCase)(i, e)] = r);
  }), n;
}
Qe.default = Qe;
var Ms = Qe;
(function(t) {
  var e = U && U.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.returnFirstArg = t.canTextBeChildOfNode = t.ELEMENTS_WITH_NO_TEXT_CHILDREN = t.PRESERVE_CUSTOM_ATTRIBUTES = void 0, t.isCustomComponent = a, t.setStyleProp = p;
  var n = he, i = e(Ms), r = /* @__PURE__ */ new Set([
    "annotation-xml",
    "color-profile",
    "font-face",
    "font-face-src",
    "font-face-uri",
    "font-face-format",
    "font-face-name",
    "missing-glyph"
  ]);
  function a(d, u) {
    return d.includes("-") ? !r.has(d) : !!(u && typeof u.is == "string");
  }
  var o = {
    reactCompat: !0
  };
  function p(d, u) {
    if (typeof d == "string") {
      if (!d.trim()) {
        u.style = {};
        return;
      }
      try {
        u.style = (0, i.default)(d, o);
      } catch {
        u.style = {};
      }
    }
  }
  t.PRESERVE_CUSTOM_ATTRIBUTES = Number(n.version.split(".")[0]) >= 16, t.ELEMENTS_WITH_NO_TEXT_CHILDREN = /* @__PURE__ */ new Set([
    "tr",
    "tbody",
    "thead",
    "tfoot",
    "colgroup",
    "table",
    "head",
    "html",
    "frameset"
  ]);
  var l = function(d) {
    return !t.ELEMENTS_WITH_NO_TEXT_CHILDREN.has(d.name);
  };
  t.canTextBeChildOfNode = l;
  var m = function(d) {
    return d;
  };
  t.returnFirstArg = m;
})(vn);
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.default = Bs;
var Lt = nt, pi = vn, Ps = ["checked", "value"], Ds = ["input", "select", "textarea"], js = {
  reset: !0,
  submit: !0
};
function Bs(t, e) {
  t === void 0 && (t = {});
  var n = {}, i = !!(t.type && js[t.type]);
  for (var r in t) {
    var a = t[r];
    if ((0, Lt.isCustomAttribute)(r)) {
      n[r] = a;
      continue;
    }
    var o = r.toLowerCase(), p = si(o);
    if (p) {
      var l = (0, Lt.getPropertyInfo)(p);
      switch (Ps.includes(p) && Ds.includes(e) && !i && (p = si("default" + o)), n[p] = a, l && l.type) {
        case Lt.BOOLEAN:
          n[p] = !0;
          break;
        case Lt.OVERLOADED_BOOLEAN:
          a === "" && (n[p] = !0);
          break;
      }
      continue;
    }
    pi.PRESERVE_CUSTOM_ATTRIBUTES && (n[r] = a);
  }
  return (0, pi.setStyleProp)(t.style, n), n;
}
function si(t) {
  return Lt.possibleStandardNames[t];
}
var Sn = {}, Us = U && U.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Sn, "__esModule", { value: !0 });
Sn.default = zr;
var Ue = he, $s = Us(Te), Pt = vn, Hs = {
  cloneElement: Ue.cloneElement,
  createElement: Ue.createElement,
  isValidElement: Ue.isValidElement
};
function zr(t, e) {
  e === void 0 && (e = {});
  for (var n = [], i = typeof e.replace == "function", r = e.transform || Pt.returnFirstArg, a = e.library || Hs, o = a.cloneElement, p = a.createElement, l = a.isValidElement, m = t.length, d = 0; d < m; d++) {
    var u = t[d];
    if (i) {
      var h = e.replace(u, d);
      if (l(h)) {
        m > 1 && (h = o(h, {
          key: h.key || d
        })), n.push(r(h, u, d));
        continue;
      }
    }
    if (u.type === "text") {
      var k = !u.data.trim().length;
      if (k && u.parent && !(0, Pt.canTextBeChildOfNode)(u.parent) || e.trim && k)
        continue;
      n.push(r(u.data, u, d));
      continue;
    }
    var c = u, g = {};
    Vs(c) ? ((0, Pt.setStyleProp)(c.attribs.style, c.attribs), g = c.attribs) : c.attribs && (g = (0, $s.default)(c.attribs, c.name));
    var f = void 0;
    switch (u.type) {
      case "script":
      case "style":
        u.children[0] && (g.dangerouslySetInnerHTML = {
          __html: u.children[0].data
        });
        break;
      case "tag":
        u.name === "textarea" && u.children[0] ? g.defaultValue = u.children[0].data : u.children && u.children.length && (f = zr(u.children, e));
        break;
      default:
        continue;
    }
    m > 1 && (g.key = d), n.push(r(p(u.name, g, f), u, d));
  }
  return n.length === 1 ? n[0] : n;
}
function Vs(t) {
  return Pt.PRESERVE_CUSTOM_ATTRIBUTES && t.type === "tag" && (0, Pt.isCustomComponent)(t.name, t.attribs);
}
(function(t) {
  var e = U && U.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(t, "__esModule", { value: !0 }), t.htmlToDOM = t.domToReact = t.attributesToProps = t.Text = t.ProcessingInstruction = t.Element = t.Comment = void 0, t.default = p;
  var n = e(un);
  t.htmlToDOM = n.default;
  var i = e(Te);
  t.attributesToProps = i.default;
  var r = e(Sn);
  t.domToReact = r.default;
  var a = hn;
  Object.defineProperty(t, "Comment", { enumerable: !0, get: function() {
    return a.Comment;
  } }), Object.defineProperty(t, "Element", { enumerable: !0, get: function() {
    return a.Element;
  } }), Object.defineProperty(t, "ProcessingInstruction", { enumerable: !0, get: function() {
    return a.ProcessingInstruction;
  } }), Object.defineProperty(t, "Text", { enumerable: !0, get: function() {
    return a.Text;
  } });
  var o = { lowerCaseAttributeNames: !1 };
  function p(l, m) {
    if (typeof l != "string")
      throw new TypeError("First argument must be a string");
    return l ? (0, r.default)((0, n.default)(l, (m == null ? void 0 : m.htmlparser2) || o), m) : [];
  }
})(Ee);
const li = /* @__PURE__ */ $a(Ee), Gs = li.default || li;
var qs = Object.create, Ne = Object.defineProperty, Zs = Object.defineProperties, Ws = Object.getOwnPropertyDescriptor, Xs = Object.getOwnPropertyDescriptors, Or = Object.getOwnPropertyNames, fe = Object.getOwnPropertySymbols, Ys = Object.getPrototypeOf, Rn = Object.prototype.hasOwnProperty, Nr = Object.prototype.propertyIsEnumerable, mi = (t, e, n) => e in t ? Ne(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, pt = (t, e) => {
  for (var n in e || (e = {}))
    Rn.call(e, n) && mi(t, n, e[n]);
  if (fe)
    for (var n of fe(e))
      Nr.call(e, n) && mi(t, n, e[n]);
  return t;
}, Le = (t, e) => Zs(t, Xs(e)), Lr = (t, e) => {
  var n = {};
  for (var i in t)
    Rn.call(t, i) && e.indexOf(i) < 0 && (n[i] = t[i]);
  if (t != null && fe)
    for (var i of fe(t))
      e.indexOf(i) < 0 && Nr.call(t, i) && (n[i] = t[i]);
  return n;
}, Ks = (t, e) => function() {
  return e || (0, t[Or(t)[0]])((e = { exports: {} }).exports, e), e.exports;
}, Js = (t, e) => {
  for (var n in e)
    Ne(t, n, { get: e[n], enumerable: !0 });
}, Qs = (t, e, n, i) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of Or(e))
      !Rn.call(t, r) && r !== n && Ne(t, r, { get: () => e[r], enumerable: !(i = Ws(e, r)) || i.enumerable });
  return t;
}, tl = (t, e, n) => (n = t != null ? qs(Ys(t)) : {}, Qs(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  !t || !t.__esModule ? Ne(n, "default", { value: t, enumerable: !0 }) : n,
  t
)), el = Ks({
  "../../node_modules/.pnpm/prismjs@1.29.0_patch_hash=vrxx3pzkik6jpmgpayxfjunetu/node_modules/prismjs/prism.js"(t, e) {
    var n = function() {
      var i = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, r = 0, a = {}, o = {
        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
          encode: function c(g) {
            return g instanceof p ? new p(g.type, c(g.content), g.alias) : Array.isArray(g) ? g.map(c) : g.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          },
          /**
           * Returns the name of the type of the given value.
           *
           * @param {any} o
           * @returns {string}
           * @example
           * type(null)      === 'Null'
           * type(undefined) === 'Undefined'
           * type(123)       === 'Number'
           * type('foo')     === 'String'
           * type(true)      === 'Boolean'
           * type([1, 2])    === 'Array'
           * type({})        === 'Object'
           * type(String)    === 'Function'
           * type(/abc+/)    === 'RegExp'
           */
          type: function(c) {
            return Object.prototype.toString.call(c).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(c) {
            return c.__id || Object.defineProperty(c, "__id", { value: ++r }), c.__id;
          },
          /**
           * Creates a deep clone of the given object.
           *
           * The main intended use of this function is to clone language definitions.
           *
           * @param {T} o
           * @param {Record<number, any>} [visited]
           * @returns {T}
           * @template T
           */
          clone: function c(g, f) {
            f = f || {};
            var b, y;
            switch (o.util.type(g)) {
              case "Object":
                if (y = o.util.objId(g), f[y])
                  return f[y];
                b = /** @type {Record<string, any>} */
                {}, f[y] = b;
                for (var _ in g)
                  g.hasOwnProperty(_) && (b[_] = c(g[_], f));
                return (
                  /** @type {any} */
                  b
                );
              case "Array":
                return y = o.util.objId(g), f[y] ? f[y] : (b = [], f[y] = b, g.forEach(function(R, v) {
                  b[v] = c(R, f);
                }), /** @type {any} */
                b);
              default:
                return g;
            }
          },
          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function(c) {
            for (; c; ) {
              var g = i.exec(c.className);
              if (g)
                return g[1].toLowerCase();
              c = c.parentElement;
            }
            return "none";
          },
          /**
           * Sets the Prism `language-xxxx` class of the given element.
           *
           * @param {Element} element
           * @param {string} language
           * @returns {void}
           */
          setLanguage: function(c, g) {
            c.className = c.className.replace(RegExp(i, "gi"), ""), c.classList.add("language-" + g);
          },
          /**
           * Returns whether a given class is active for `element`.
           *
           * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
           * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
           * given class is just the given class with a `no-` prefix.
           *
           * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
           * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
           * ancestors have the given class or the negated version of it, then the default activation will be returned.
           *
           * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
           * version of it, the class is considered active.
           *
           * @param {Element} element
           * @param {string} className
           * @param {boolean} [defaultActivation=false]
           * @returns {boolean}
           */
          isActive: function(c, g, f) {
            for (var b = "no-" + g; c; ) {
              var y = c.classList;
              if (y.contains(g))
                return !0;
              if (y.contains(b))
                return !1;
              c = c.parentElement;
            }
            return !!f;
          }
        },
        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
          /**
           * The grammar for plain, unformatted text.
           */
          plain: a,
          plaintext: a,
          text: a,
          txt: a,
          /**
           * Creates a deep copy of the language with the given id and appends the given tokens.
           *
           * If a token in `redef` also appears in the copied language, then the existing token in the copied language
           * will be overwritten at its original position.
           *
           * ## Best practices
           *
           * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
           * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
           * understand the language definition because, normally, the order of tokens matters in Prism grammars.
           *
           * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
           * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
           *
           * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
           * @param {Grammar} redef The new tokens to append.
           * @returns {Grammar} The new language created.
           * @public
           * @example
           * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
           *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
           *     // at its original position
           *     'comment': { ... },
           *     // CSS doesn't have a 'color' token, so this token will be appended
           *     'color': /\b(?:red|green|blue)\b/
           * });
           */
          extend: function(c, g) {
            var f = o.util.clone(o.languages[c]);
            for (var b in g)
              f[b] = g[b];
            return f;
          },
          /**
           * Inserts tokens _before_ another token in a language definition or any other grammar.
           *
           * ## Usage
           *
           * This helper method makes it easy to modify existing languages. For example, the CSS language definition
           * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
           * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
           * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
           * this:
           *
           * ```js
           * Prism.languages.markup.style = {
           *     // token
           * };
           * ```
           *
           * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
           * before existing tokens. For the CSS example above, you would use it like this:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'cdata', {
           *     'style': {
           *         // token
           *     }
           * });
           * ```
           *
           * ## Special cases
           *
           * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
           * will be ignored.
           *
           * This behavior can be used to insert tokens after `before`:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'comment', {
           *     'comment': Prism.languages.markup.comment,
           *     // tokens after 'comment'
           * });
           * ```
           *
           * ## Limitations
           *
           * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
           * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
           * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
           * deleting properties which is necessary to insert at arbitrary positions.
           *
           * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
           * Instead, it will create a new object and replace all references to the target object with the new one. This
           * can be done without temporarily deleting properties, so the iteration order is well-defined.
           *
           * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
           * you hold the target object in a variable, then the value of the variable will not change.
           *
           * ```js
           * var oldMarkup = Prism.languages.markup;
           * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
           *
           * assert(oldMarkup !== Prism.languages.markup);
           * assert(newMarkup === Prism.languages.markup);
           * ```
           *
           * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
           * object to be modified.
           * @param {string} before The key to insert before.
           * @param {Grammar} insert An object containing the key-value pairs to be inserted.
           * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
           * object to be modified.
           *
           * Defaults to `Prism.languages`.
           * @returns {Grammar} The new grammar object.
           * @public
           */
          insertBefore: function(c, g, f, b) {
            b = b || /** @type {any} */
            o.languages;
            var y = b[c], _ = {};
            for (var R in y)
              if (y.hasOwnProperty(R)) {
                if (R == g)
                  for (var v in f)
                    f.hasOwnProperty(v) && (_[v] = f[v]);
                f.hasOwnProperty(R) || (_[R] = y[R]);
              }
            var C = b[c];
            return b[c] = _, o.languages.DFS(o.languages, function(S, T) {
              T === C && S != c && (this[S] = _);
            }), _;
          },
          // Traverse a language definition with Depth First Search
          DFS: function c(g, f, b, y) {
            y = y || {};
            var _ = o.util.objId;
            for (var R in g)
              if (g.hasOwnProperty(R)) {
                f.call(g, R, g[R], b || R);
                var v = g[R], C = o.util.type(v);
                C === "Object" && !y[_(v)] ? (y[_(v)] = !0, c(v, f, null, y)) : C === "Array" && !y[_(v)] && (y[_(v)] = !0, c(v, f, R, y));
              }
          }
        },
        plugins: {},
        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function(c, g, f) {
          var b = {
            code: c,
            grammar: g,
            language: f
          };
          if (o.hooks.run("before-tokenize", b), !b.grammar)
            throw new Error('The language "' + b.language + '" has no grammar.');
          return b.tokens = o.tokenize(b.code, b.grammar), o.hooks.run("after-tokenize", b), p.stringify(o.util.encode(b.tokens), b.language);
        },
        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function(c, g) {
          var f = g.rest;
          if (f) {
            for (var b in f)
              g[b] = f[b];
            delete g.rest;
          }
          var y = new d();
          return u(y, y.head, c), m(c, y, g, y.head, 0), k(y);
        },
        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
          all: {},
          /**
           * Adds the given callback to the list of callbacks for the given hook.
           *
           * The callback will be invoked when the hook it is registered for is run.
           * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
           *
           * One callback function can be registered to multiple hooks and the same hook multiple times.
           *
           * @param {string} name The name of the hook.
           * @param {HookCallback} callback The callback function which is given environment variables.
           * @public
           */
          add: function(c, g) {
            var f = o.hooks.all;
            f[c] = f[c] || [], f[c].push(g);
          },
          /**
           * Runs a hook invoking all registered callbacks with the given environment variables.
           *
           * Callbacks will be invoked synchronously and in the order in which they were registered.
           *
           * @param {string} name The name of the hook.
           * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
           * @public
           */
          run: function(c, g) {
            var f = o.hooks.all[c];
            if (!(!f || !f.length))
              for (var b = 0, y; y = f[b++]; )
                y(g);
          }
        },
        Token: p
      };
      function p(c, g, f, b) {
        this.type = c, this.content = g, this.alias = f, this.length = (b || "").length | 0;
      }
      p.stringify = function c(g, f) {
        if (typeof g == "string")
          return g;
        if (Array.isArray(g)) {
          var b = "";
          return g.forEach(function(C) {
            b += c(C, f);
          }), b;
        }
        var y = {
          type: g.type,
          content: c(g.content, f),
          tag: "span",
          classes: ["token", g.type],
          attributes: {},
          language: f
        }, _ = g.alias;
        _ && (Array.isArray(_) ? Array.prototype.push.apply(y.classes, _) : y.classes.push(_)), o.hooks.run("wrap", y);
        var R = "";
        for (var v in y.attributes)
          R += " " + v + '="' + (y.attributes[v] || "").replace(/"/g, "&quot;") + '"';
        return "<" + y.tag + ' class="' + y.classes.join(" ") + '"' + R + ">" + y.content + "</" + y.tag + ">";
      };
      function l(c, g, f, b) {
        c.lastIndex = g;
        var y = c.exec(f);
        if (y && b && y[1]) {
          var _ = y[1].length;
          y.index += _, y[0] = y[0].slice(_);
        }
        return y;
      }
      function m(c, g, f, b, y, _) {
        for (var R in f)
          if (!(!f.hasOwnProperty(R) || !f[R])) {
            var v = f[R];
            v = Array.isArray(v) ? v : [v];
            for (var C = 0; C < v.length; ++C) {
              if (_ && _.cause == R + "," + C)
                return;
              var S = v[C], T = S.inside, O = !!S.lookbehind, B = !!S.greedy, G = S.alias;
              if (B && !S.pattern.global) {
                var J = S.pattern.toString().match(/[imsuy]*$/)[0];
                S.pattern = RegExp(S.pattern.source, J + "g");
              }
              for (var qt = S.pattern || S, P = b.next, it = y; P !== g.tail && !(_ && it >= _.reach); it += P.value.length, P = P.next) {
                var _t = P.value;
                if (g.length > c.length)
                  return;
                if (!(_t instanceof p)) {
                  var Zt = 1, tt;
                  if (B) {
                    if (tt = l(qt, it, c, O), !tt || tt.index >= c.length)
                      break;
                    var Wt = tt.index, $r = tt.index + tt[0].length, lt = it;
                    for (lt += P.value.length; Wt >= lt; )
                      P = P.next, lt += P.value.length;
                    if (lt -= P.value.length, it = lt, P.value instanceof p)
                      continue;
                    for (var Rt = P; Rt !== g.tail && (lt < $r || typeof Rt.value == "string"); Rt = Rt.next)
                      Zt++, lt += Rt.value.length;
                    Zt--, _t = c.slice(it, lt), tt.index -= it;
                  } else if (tt = l(qt, 0, _t, O), !tt)
                    continue;
                  var Wt = tt.index, Xt = tt[0], Ie = _t.slice(0, Wt), An = _t.slice(Wt + Xt.length), Fe = it + _t.length;
                  _ && Fe > _.reach && (_.reach = Fe);
                  var Yt = P.prev;
                  Ie && (Yt = u(g, Yt, Ie), it += Ie.length), h(g, Yt, Zt);
                  var Hr = new p(R, T ? o.tokenize(Xt, T) : Xt, G, Xt);
                  if (P = u(g, Yt, Hr), An && u(g, P, An), Zt > 1) {
                    var Me = {
                      cause: R + "," + C,
                      reach: Fe
                    };
                    m(c, g, f, P.prev, it, Me), _ && Me.reach > _.reach && (_.reach = Me.reach);
                  }
                }
              }
            }
          }
      }
      function d() {
        var c = { value: null, prev: null, next: null }, g = { value: null, prev: c, next: null };
        c.next = g, this.head = c, this.tail = g, this.length = 0;
      }
      function u(c, g, f) {
        var b = g.next, y = { value: f, prev: g, next: b };
        return g.next = y, b.prev = y, c.length++, y;
      }
      function h(c, g, f) {
        for (var b = g.next, y = 0; y < f && b !== c.tail; y++)
          b = b.next;
        g.next = b, b.prev = g, c.length -= y;
      }
      function k(c) {
        for (var g = [], f = c.head.next; f !== c.tail; )
          g.push(f.value), f = f.next;
        return g;
      }
      return o;
    }();
    e.exports = n, n.default = n;
  }
}), w = tl(el());
w.languages.markup = { comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 }, prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 }, doctype: { pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i, greedy: !0, inside: { "internal-subset": { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null }, string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 }, punctuation: /^<!|>$|[[\]]/, "doctype-tag": /^DOCTYPE/i, name: /[^\s<>'"]+/ } }, cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 }, tag: { pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/, greedy: !0, inside: { tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, "special-attr": [], "attr-value": { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/, inside: { punctuation: [{ pattern: /^=/, alias: "attr-equals" }, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }] } }, punctuation: /\/?>/, "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: [{ pattern: /&[\da-z]{1,8};/i, alias: "named-entity" }, /&#x?[\da-f]{1,8};/i] }, w.languages.markup.tag.inside["attr-value"].inside.entity = w.languages.markup.entity, w.languages.markup.doctype.inside["internal-subset"].inside = w.languages.markup, w.hooks.add("wrap", function(t) {
  t.type === "entity" && (t.attributes.title = t.content.replace(/&amp;/, "&"));
}), Object.defineProperty(w.languages.markup.tag, "addInlined", { value: function(t, i) {
  var n = {}, n = (n["language-" + i] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: w.languages[i] }, n.cdata = /^<!\[CDATA\[|\]\]>$/i, { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: n } }), i = (n["language-" + i] = { pattern: /[\s\S]+/, inside: w.languages[i] }, {});
  i[t] = { pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
    return t;
  }), "i"), lookbehind: !0, greedy: !0, inside: n }, w.languages.insertBefore("markup", "cdata", i);
} }), Object.defineProperty(w.languages.markup.tag, "addAttribute", { value: function(t, e) {
  w.languages.markup.tag.inside["special-attr"].push({ pattern: RegExp(/(^|["'\s])/.source + "(?:" + t + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"), lookbehind: !0, inside: { "attr-name": /^[^\s=]+/, "attr-value": { pattern: /=[\s\S]+/, inside: { value: { pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: !0, alias: [e, "language-" + e], inside: w.languages[e] }, punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } } } });
} }), w.languages.html = w.languages.markup, w.languages.mathml = w.languages.markup, w.languages.svg = w.languages.markup, w.languages.xml = w.languages.extend("markup", {}), w.languages.ssml = w.languages.xml, w.languages.atom = w.languages.xml, w.languages.rss = w.languages.xml, function(t) {
  var e = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: "escape" }, n = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/, i = "(?:[^\\\\-]|" + n.source + ")", i = RegExp(i + "-" + i), r = { pattern: /(<|')[^<>']+(?=[>']$)/, lookbehind: !0, alias: "variable" };
  t.languages.regex = { "char-class": { pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/, lookbehind: !0, inside: { "char-class-negation": { pattern: /(^\[)\^/, lookbehind: !0, alias: "operator" }, "char-class-punctuation": { pattern: /^\[|\]$/, alias: "punctuation" }, range: { pattern: i, inside: { escape: n, "range-punctuation": { pattern: /-/, alias: "operator" } } }, "special-escape": e, "char-set": { pattern: /\\[wsd]|\\p\{[^{}]+\}/i, alias: "class-name" }, escape: n } }, "special-escape": e, "char-set": { pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i, alias: "class-name" }, backreference: [{ pattern: /\\(?![123][0-7]{2})[1-9]/, alias: "keyword" }, { pattern: /\\k<[^<>']+>/, alias: "keyword", inside: { "group-name": r } }], anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: "function" }, escape: n, group: [{ pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/, alias: "punctuation", inside: { "group-name": r } }, { pattern: /\)/, alias: "punctuation" }], quantifier: { pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/, alias: "number" }, alternation: { pattern: /\|/, alias: "keyword" } };
}(w), w.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, "class-name": { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/, boolean: /\b(?:false|true)\b/, function: /\b\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/, punctuation: /[{}[\];(),.:]/ }, w.languages.javascript = w.languages.extend("clike", { "class-name": [w.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: !0 }], keyword: [{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 }, { pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: !0 }], function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, number: { pattern: RegExp(/(^|[^\w$])/.source + "(?:" + /NaN|Infinity/.source + "|" + /0[bB][01]+(?:_[01]+)*n?/.source + "|" + /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + /\d+(?:_\d+)*n/.source + "|" + /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source + ")" + /(?![\w$])/.source), lookbehind: !0 }, operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/ }), w.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, w.languages.insertBefore("javascript", "keyword", { regex: { pattern: RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source), lookbehind: !0, greedy: !0, inside: { "regex-source": { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: !0, alias: "language-regex", inside: w.languages.regex }, "regex-delimiter": /^\/|\/$/, "regex-flags": /^[a-z]+$/ } }, "function-variable": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/, lookbehind: !0, inside: w.languages.javascript }, { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, lookbehind: !0, inside: w.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: !0, inside: w.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/, lookbehind: !0, inside: w.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ }), w.languages.insertBefore("javascript", "string", { hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" }, "template-string": { pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/, greedy: !0, inside: { "template-punctuation": { pattern: /^`|`$/, alias: "string" }, interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/, lookbehind: !0, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: w.languages.javascript } }, string: /[\s\S]+/ } }, "string-property": { pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m, lookbehind: !0, greedy: !0, alias: "property" } }), w.languages.insertBefore("javascript", "operator", { "literal-property": { pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m, lookbehind: !0, alias: "property" } }), w.languages.markup && (w.languages.markup.tag.addInlined("script", "javascript"), w.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript")), w.languages.js = w.languages.javascript, w.languages.actionscript = w.languages.extend("javascript", { keyword: /\b(?:as|break|case|catch|class|const|default|delete|do|dynamic|each|else|extends|final|finally|for|function|get|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|null|override|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|use|var|void|while|with)\b/, operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/ }), w.languages.actionscript["class-name"].alias = "function", delete w.languages.actionscript.parameter, delete w.languages.actionscript["literal-property"], w.languages.markup && w.languages.insertBefore("actionscript", "string", { xml: { pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/, lookbehind: !0, inside: w.languages.markup } }), function(t) {
  var e = /#(?!\{).+/, n = { pattern: /#\{[^}]+\}/, alias: "variable" };
  t.languages.coffeescript = t.languages.extend("javascript", { comment: e, string: [{ pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 }, { pattern: /"(?:\\[\s\S]|[^\\"])*"/, greedy: !0, inside: { interpolation: n } }], keyword: /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/, "class-member": { pattern: /@(?!\d)\w+/, alias: "variable" } }), t.languages.insertBefore("coffeescript", "comment", { "multiline-comment": { pattern: /###[\s\S]+?###/, alias: "comment" }, "block-regex": { pattern: /\/{3}[\s\S]*?\/{3}/, alias: "regex", inside: { comment: e, interpolation: n } } }), t.languages.insertBefore("coffeescript", "string", { "inline-javascript": { pattern: /`(?:\\[\s\S]|[^\\`])*`/, inside: { delimiter: { pattern: /^`|`$/, alias: "punctuation" }, script: { pattern: /[\s\S]+/, alias: "language-javascript", inside: t.languages.javascript } } }, "multiline-string": [{ pattern: /'''[\s\S]*?'''/, greedy: !0, alias: "string" }, { pattern: /"""[\s\S]*?"""/, greedy: !0, alias: "string", inside: { interpolation: n } }] }), t.languages.insertBefore("coffeescript", "keyword", { property: /(?!\d)\w+(?=\s*:(?!:))/ }), delete t.languages.coffeescript["template-string"], t.languages.coffee = t.languages.coffeescript;
}(w), function(t) {
  var e = t.languages.javadoclike = { parameter: { pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m, lookbehind: !0 }, keyword: { pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m, lookbehind: !0 }, punctuation: /[{}]/ };
  Object.defineProperty(e, "addSupport", { value: function(n, i) {
    (n = typeof n == "string" ? [n] : n).forEach(function(r) {
      var a = function(u) {
        u.inside || (u.inside = {}), u.inside.rest = i;
      }, o = "doc-comment";
      if (p = t.languages[r]) {
        var p, l = p[o];
        if ((l = l || (p = t.languages.insertBefore(r, "comment", { "doc-comment": { pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/, lookbehind: !0, alias: "comment" } }))[o]) instanceof RegExp && (l = p[o] = { pattern: l }), Array.isArray(l))
          for (var m = 0, d = l.length; m < d; m++)
            l[m] instanceof RegExp && (l[m] = { pattern: l[m] }), a(l[m]);
        else
          a(l);
      }
    });
  } }), e.addSupport(["java", "javascript", "php"], e);
}(w), function(t) {
  var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/, e = (t.languages.css = { comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + e.source + ")*?" + /(?:;|(?=\s*\{))/.source), inside: { rule: /^@[\w-]+/, "selector-function-argument": { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: !0, alias: "selector" }, keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 } } }, url: { pattern: RegExp("\\burl\\((?:" + e.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"), greedy: !0, inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp("^" + e.source + "$"), alias: "url" } } }, selector: { pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + e.source + ")*(?=\\s*\\{)"), lookbehind: !0 }, string: { pattern: e, greedy: !0 }, property: { pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: !0 }, important: /!important\b/i, function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 }, punctuation: /[(){};:,]/ }, t.languages.css.atrule.inside.rest = t.languages.css, t.languages.markup);
  e && (e.tag.addInlined("style", "css"), e.tag.addAttribute("style", "css"));
}(w), function(t) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, e = (t.languages.css.selector = { pattern: t.languages.css.selector.pattern, lookbehind: !0, inside: e = { "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/, "pseudo-class": /:[-\w]+/, class: /\.[-\w]+/, id: /#[-\w]+/, attribute: { pattern: RegExp(`\\[(?:[^[\\]"']|` + e.source + ")*\\]"), greedy: !0, inside: { punctuation: /^\[|\]$/, "case-sensitivity": { pattern: /(\s)[si]$/i, lookbehind: !0, alias: "keyword" }, namespace: { pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/, lookbehind: !0, inside: { punctuation: /\|$/ } }, "attr-name": { pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/, lookbehind: !0 }, "attr-value": [e, { pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/, lookbehind: !0 }], operator: /[|~*^$]?=/ } }, "n-th": [{ pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/, lookbehind: !0, inside: { number: /[\dn]+/, operator: /[+-]/ } }, { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 }], combinator: />|\+|~|\|\|/, punctuation: /[(),]/ } }, t.languages.css.atrule.inside["selector-function-argument"].inside = e, t.languages.insertBefore("css", "property", { variable: { pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i, lookbehind: !0 } }), { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: !0 }), n = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
  t.languages.insertBefore("css", "function", { operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 }, hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: "color" }, color: [{ pattern: /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i, lookbehind: !0 }, { pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i, inside: { unit: e, number: n, function: /[\w-]+(?=\()/, punctuation: /[(),]/ } }], entity: /\\[\da-f]{1,8}/i, unit: e, number: n });
}(w), function(t) {
  var e = /[*&][^\s[\]{},]+/, n = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/, i = "(?:" + n.source + "(?:[ 	]+" + e.source + ")?|" + e.source + "(?:[ 	]+" + n.source + ")?)", r = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function() {
    return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
  }), a = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
  function o(p, l) {
    l = (l || "").replace(/m/g, "") + "m";
    var m = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
      return i;
    }).replace(/<<value>>/g, function() {
      return p;
    });
    return RegExp(m, l);
  }
  t.languages.yaml = { scalar: { pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function() {
    return i;
  })), lookbehind: !0, alias: "string" }, comment: /#.*/, key: { pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function() {
    return i;
  }).replace(/<<key>>/g, function() {
    return "(?:" + r + "|" + a + ")";
  })), lookbehind: !0, greedy: !0, alias: "atrule" }, directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: "important" }, datetime: { pattern: o(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source), lookbehind: !0, alias: "number" }, boolean: { pattern: o(/false|true/.source, "i"), lookbehind: !0, alias: "important" }, null: { pattern: o(/null|~/.source, "i"), lookbehind: !0, alias: "important" }, string: { pattern: o(a), lookbehind: !0, greedy: !0 }, number: { pattern: o(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, "i"), lookbehind: !0 }, tag: n, important: e, punctuation: /---|[:[\]{}\-,|>?]|\.\.\./ }, t.languages.yml = t.languages.yaml;
}(w), function(t) {
  var e = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
  function n(m) {
    return m = m.replace(/<inner>/g, function() {
      return e;
    }), RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + m + ")");
  }
  var i = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source, r = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function() {
    return i;
  }), a = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source, o = (t.languages.markdown = t.languages.extend("markup", {}), t.languages.insertBefore("markdown", "prolog", { "front-matter-block": { pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/, lookbehind: !0, greedy: !0, inside: { punctuation: /^---|---$/, "front-matter": { pattern: /\S+(?:\s+\S+)*/, alias: ["yaml", "language-yaml"], inside: t.languages.yaml } } }, blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" }, table: { pattern: RegExp("^" + r + a + "(?:" + r + ")*", "m"), inside: { "table-data-rows": { pattern: RegExp("^(" + r + a + ")(?:" + r + ")*$"), lookbehind: !0, inside: { "table-data": { pattern: RegExp(i), inside: t.languages.markdown }, punctuation: /\|/ } }, "table-line": { pattern: RegExp("^(" + r + ")" + a + "$"), lookbehind: !0, inside: { punctuation: /\||:?-{3,}:?/ } }, "table-header-row": { pattern: RegExp("^" + r + "$"), inside: { "table-header": { pattern: RegExp(i), alias: "important", inside: t.languages.markdown }, punctuation: /\|/ } } } }, code: [{ pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/, lookbehind: !0, alias: "keyword" }, { pattern: /^```[\s\S]*?^```$/m, greedy: !0, inside: { "code-block": { pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m, lookbehind: !0 }, "code-language": { pattern: /^(```).+/, lookbehind: !0 }, punctuation: /```/ } }], title: [{ pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m, alias: "important", inside: { punctuation: /==+$|--+$/ } }, { pattern: /(^\s*)#.+/m, lookbehind: !0, alias: "important", inside: { punctuation: /^#+|#+$/ } }], hr: { pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: "punctuation" }, list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: "punctuation" }, "url-reference": { pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/, inside: { variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 }, string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/, punctuation: /^[\[\]!:]|[<>]/ }, alias: "url" }, bold: { pattern: n(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source), lookbehind: !0, greedy: !0, inside: { content: { pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: !0, inside: {} }, punctuation: /\*\*|__/ } }, italic: { pattern: n(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source), lookbehind: !0, greedy: !0, inside: { content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} }, punctuation: /[*_]/ } }, strike: { pattern: n(/(~~?)(?:(?!~)<inner>)+\2/.source), lookbehind: !0, greedy: !0, inside: { content: { pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: !0, inside: {} }, punctuation: /~~?/ } }, "code-snippet": { pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/, lookbehind: !0, greedy: !0, alias: ["code", "keyword"] }, url: { pattern: n(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source), lookbehind: !0, greedy: !0, inside: { operator: /^!/, content: { pattern: /(^\[)[^\]]+(?=\])/, lookbehind: !0, inside: {} }, variable: { pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/, lookbehind: !0 }, url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 }, string: { pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/, lookbehind: !0 } } } }), ["url", "bold", "italic", "strike"].forEach(function(m) {
    ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(d) {
      m !== d && (t.languages.markdown[m].inside.content.inside[d] = t.languages.markdown[d]);
    });
  }), t.hooks.add("after-tokenize", function(m) {
    m.language !== "markdown" && m.language !== "md" || function d(u) {
      if (u && typeof u != "string")
        for (var h = 0, k = u.length; h < k; h++) {
          var c, g = u[h];
          g.type !== "code" ? d(g.content) : (c = g.content[1], g = g.content[3], c && g && c.type === "code-language" && g.type === "code-block" && typeof c.content == "string" && (c = c.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp"), c = "language-" + (c = (/[a-z][\w-]*/i.exec(c) || [""])[0].toLowerCase()), g.alias ? typeof g.alias == "string" ? g.alias = [g.alias, c] : g.alias.push(c) : g.alias = [c]));
        }
    }(m.tokens);
  }), t.hooks.add("wrap", function(m) {
    if (m.type === "code-block") {
      for (var d = "", u = 0, h = m.classes.length; u < h; u++) {
        var k = m.classes[u], k = /language-(.+)/.exec(k);
        if (k) {
          d = k[1];
          break;
        }
      }
      var c, g = t.languages[d];
      g ? m.content = t.highlight(function(f) {
        return f = f.replace(o, ""), f = f.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(b, y) {
          var _;
          return (y = y.toLowerCase())[0] === "#" ? (_ = y[1] === "x" ? parseInt(y.slice(2), 16) : Number(y.slice(1)), l(_)) : p[y] || b;
        });
      }(m.content), g, d) : d && d !== "none" && t.plugins.autoloader && (c = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(1e16 * Math.random()), m.attributes.id = c, t.plugins.autoloader.loadLanguages(d, function() {
        var f = document.getElementById(c);
        f && (f.innerHTML = t.highlight(f.textContent, t.languages[d], d));
      }));
    }
  }), RegExp(t.languages.markup.tag.pattern.source, "gi")), p = { amp: "&", lt: "<", gt: ">", quot: '"' }, l = String.fromCodePoint || String.fromCharCode;
  t.languages.md = t.languages.markdown;
}(w), w.languages.graphql = { comment: /#.*/, description: { pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i, greedy: !0, alias: "string", inside: { "language-markdown": { pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/, lookbehind: !0, inside: w.languages.markdown } } }, string: { pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/, greedy: !0 }, number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i, boolean: /\b(?:false|true)\b/, variable: /\$[a-z_]\w*/i, directive: { pattern: /@[a-z_]\w*/i, alias: "function" }, "attr-name": { pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i, greedy: !0 }, "atom-input": { pattern: /\b[A-Z]\w*Input\b/, alias: "class-name" }, scalar: /\b(?:Boolean|Float|ID|Int|String)\b/, constant: /\b[A-Z][A-Z_\d]*\b/, "class-name": { pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/, lookbehind: !0 }, fragment: { pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/, lookbehind: !0, alias: "function" }, "definition-mutation": { pattern: /(\bmutation\s+)[a-zA-Z_]\w*/, lookbehind: !0, alias: "function" }, "definition-query": { pattern: /(\bquery\s+)[a-zA-Z_]\w*/, lookbehind: !0, alias: "function" }, keyword: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/, operator: /[!=|&]|\.{3}/, "property-query": /\w+(?=\s*\()/, object: /\w+(?=\s*\{)/, punctuation: /[!(){}\[\]:=,]/, property: /\w+/ }, w.hooks.add("after-tokenize", function(t) {
  if (t.language === "graphql")
    for (var e = t.tokens.filter(function(c) {
      return typeof c != "string" && c.type !== "comment" && c.type !== "scalar";
    }), n = 0; n < e.length; ) {
      var i = e[n++];
      if (i.type === "keyword" && i.content === "mutation") {
        var r = [];
        if (u(["definition-mutation", "punctuation"]) && d(1).content === "(") {
          n += 2;
          var a = h(/^\($/, /^\)$/);
          if (a === -1)
            continue;
          for (; n < a; n++) {
            var o = d(0);
            o.type === "variable" && (k(o, "variable-input"), r.push(o.content));
          }
          n = a + 1;
        }
        if (u(["punctuation", "property-query"]) && d(0).content === "{" && (n++, k(d(0), "property-mutation"), 0 < r.length)) {
          var p = h(/^\{$/, /^\}$/);
          if (p !== -1)
            for (var l = n; l < p; l++) {
              var m = e[l];
              m.type === "variable" && 0 <= r.indexOf(m.content) && k(m, "variable-input");
            }
        }
      }
    }
  function d(c) {
    return e[n + c];
  }
  function u(c, g) {
    g = g || 0;
    for (var f = 0; f < c.length; f++) {
      var b = d(f + g);
      if (!b || b.type !== c[f])
        return;
    }
    return 1;
  }
  function h(c, g) {
    for (var f = 1, b = n; b < e.length; b++) {
      var y = e[b], _ = y.content;
      if (y.type === "punctuation" && typeof _ == "string") {
        if (c.test(_))
          f++;
        else if (g.test(_) && --f === 0)
          return b;
      }
    }
    return -1;
  }
  function k(c, g) {
    var f = c.alias;
    f ? Array.isArray(f) || (c.alias = f = [f]) : c.alias = f = [], f.push(g);
  }
}), w.languages.sql = { comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: !0 }, variable: [{ pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 }, /@[\w.$]+/], string: { pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/, greedy: !0, lookbehind: !0 }, identifier: { pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/, greedy: !0, lookbehind: !0, inside: { punctuation: /^`|`$/ } }, function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i, keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i, boolean: /\b(?:FALSE|NULL|TRUE)\b/i, number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i, operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i, punctuation: /[;[\]()`,.]/ }, function(t) {
  var e = t.languages.javascript["template-string"], n = e.pattern.source, i = e.inside.interpolation, r = i.inside["interpolation-punctuation"], a = i.pattern.source;
  function o(u, h) {
    if (t.languages[u])
      return { pattern: RegExp("((?:" + h + ")\\s*)" + n), lookbehind: !0, greedy: !0, inside: { "template-punctuation": { pattern: /^`|`$/, alias: "string" }, "embedded-code": { pattern: /[\s\S]+/, alias: u } } };
  }
  function p(u, h, k) {
    return u = { code: u, grammar: h, language: k }, t.hooks.run("before-tokenize", u), u.tokens = t.tokenize(u.code, u.grammar), t.hooks.run("after-tokenize", u), u.tokens;
  }
  function l(u, h, k) {
    var f = t.tokenize(u, { interpolation: { pattern: RegExp(a), lookbehind: !0 } }), c = 0, g = {}, f = p(f.map(function(y) {
      if (typeof y == "string")
        return y;
      for (var _, R, y = y.content; u.indexOf((R = c++, _ = "___" + k.toUpperCase() + "_" + R + "___")) !== -1; )
        ;
      return g[_] = y, _;
    }).join(""), h, k), b = Object.keys(g);
    return c = 0, function y(_) {
      for (var R = 0; R < _.length; R++) {
        if (c >= b.length)
          return;
        var v, C, S, T, O, B, G, J = _[R];
        typeof J == "string" || typeof J.content == "string" ? (v = b[c], (G = (B = typeof J == "string" ? J : J.content).indexOf(v)) !== -1 && (++c, C = B.substring(0, G), O = g[v], S = void 0, (T = {})["interpolation-punctuation"] = r, (T = t.tokenize(O, T)).length === 3 && ((S = [1, 1]).push.apply(S, p(T[1], t.languages.javascript, "javascript")), T.splice.apply(T, S)), S = new t.Token("interpolation", T, i.alias, O), T = B.substring(G + v.length), O = [], C && O.push(C), O.push(S), T && (y(B = [T]), O.push.apply(O, B)), typeof J == "string" ? (_.splice.apply(_, [R, 1].concat(O)), R += O.length - 1) : J.content = O)) : (G = J.content, Array.isArray(G) ? y(G) : y([G]));
      }
    }(f), new t.Token(k, f, "language-" + k, u);
  }
  t.languages.javascript["template-string"] = [o("css", /\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/.source), o("html", /\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source), o("svg", /\bsvg/.source), o("markdown", /\b(?:markdown|md)/.source), o("graphql", /\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source), o("sql", /\bsql/.source), e].filter(Boolean);
  var m = { javascript: !0, js: !0, typescript: !0, ts: !0, jsx: !0, tsx: !0 };
  function d(u) {
    return typeof u == "string" ? u : Array.isArray(u) ? u.map(d).join("") : d(u.content);
  }
  t.hooks.add("after-tokenize", function(u) {
    u.language in m && function h(k) {
      for (var c = 0, g = k.length; c < g; c++) {
        var f, b, y, _ = k[c];
        typeof _ != "string" && (f = _.content, Array.isArray(f) ? _.type === "template-string" ? (_ = f[1], f.length === 3 && typeof _ != "string" && _.type === "embedded-code" && (b = d(_), _ = _.alias, _ = Array.isArray(_) ? _[0] : _, y = t.languages[_]) && (f[1] = l(b, y, _))) : h(f) : typeof f != "string" && h([f]));
      }
    }(u.tokens);
  });
}(w), function(t) {
  t.languages.typescript = t.languages.extend("javascript", { "class-name": { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/, lookbehind: !0, greedy: !0, inside: null }, builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/ }), t.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/, /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/, /\btype\b(?=\s*(?:[\{*]|$))/), delete t.languages.typescript.parameter, delete t.languages.typescript["literal-property"];
  var e = t.languages.extend("typescript", {});
  delete e["class-name"], t.languages.typescript["class-name"].inside = e, t.languages.insertBefore("typescript", "function", { decorator: { pattern: /@[$\w\xA0-\uFFFF]+/, inside: { at: { pattern: /^@/, alias: "operator" }, function: /^[\s\S]+/ } }, "generic-function": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/, greedy: !0, inside: { function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/, generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: e } } } }), t.languages.ts = t.languages.typescript;
}(w), function(t) {
  var e = t.languages.javascript, n = /\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})+\}/.source, i = "(@(?:arg|argument|param|property)\\s+(?:" + n + "\\s+)?)";
  t.languages.jsdoc = t.languages.extend("javadoclike", { parameter: { pattern: RegExp(i + /(?:(?!\s)[$\w\xA0-\uFFFF.])+(?=\s|$)/.source), lookbehind: !0, inside: { punctuation: /\./ } } }), t.languages.insertBefore("jsdoc", "keyword", { "optional-parameter": { pattern: RegExp(i + /\[(?:(?!\s)[$\w\xA0-\uFFFF.])+(?:=[^[\]]+)?\](?=\s|$)/.source), lookbehind: !0, inside: { parameter: { pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/, lookbehind: !0, inside: { punctuation: /\./ } }, code: { pattern: /(=)[\s\S]*(?=\]$)/, lookbehind: !0, inside: e, alias: "language-javascript" }, punctuation: /[=[\]]/ } }, "class-name": [{ pattern: RegExp(/(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\s+(?:<TYPE>\s+)?)[A-Z]\w*(?:\.[A-Z]\w*)*/.source.replace(/<TYPE>/g, function() {
    return n;
  })), lookbehind: !0, inside: { punctuation: /\./ } }, { pattern: RegExp("(@[a-z]+\\s+)" + n), lookbehind: !0, inside: { string: e.string, number: e.number, boolean: e.boolean, keyword: t.languages.typescript.keyword, operator: /=>|\.\.\.|[&|?:*]/, punctuation: /[.,;=<>{}()[\]]/ } }], example: { pattern: /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/, lookbehind: !0, inside: { code: { pattern: /^([\t ]*(?:\*\s*)?)\S.*$/m, lookbehind: !0, inside: e, alias: "language-javascript" } } } }), t.languages.javadoclike.addSupport("javascript", t.languages.jsdoc);
}(w), function(t) {
  t.languages.flow = t.languages.extend("javascript", {}), t.languages.insertBefore("flow", "keyword", { type: [{ pattern: /\b(?:[Bb]oolean|Function|[Nn]umber|[Ss]tring|[Ss]ymbol|any|mixed|null|void)\b/, alias: "class-name" }] }), t.languages.flow["function-variable"].pattern = /(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/i, delete t.languages.flow.parameter, t.languages.insertBefore("flow", "operator", { "flow-punctuation": { pattern: /\{\||\|\}/, alias: "punctuation" } }), Array.isArray(t.languages.flow.keyword) || (t.languages.flow.keyword = [t.languages.flow.keyword]), t.languages.flow.keyword.unshift({ pattern: /(^|[^$]\b)(?:Class|declare|opaque|type)\b(?!\$)/, lookbehind: !0 }, { pattern: /(^|[^$]\B)\$(?:Diff|Enum|Exact|Keys|ObjMap|PropertyType|Record|Shape|Subtype|Supertype|await)\b(?!\$)/, lookbehind: !0 });
}(w), w.languages.n4js = w.languages.extend("javascript", { keyword: /\b(?:Array|any|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|package|private|protected|public|return|set|static|string|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/ }), w.languages.insertBefore("n4js", "constant", { annotation: { pattern: /@+\w+/, alias: "operator" } }), w.languages.n4jsd = w.languages.n4js, function(t) {
  function e(o, p) {
    return RegExp(o.replace(/<ID>/g, function() {
      return /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/.source;
    }), p);
  }
  t.languages.insertBefore("javascript", "function-variable", { "method-variable": { pattern: RegExp("(\\.\\s*)" + t.languages.javascript["function-variable"].pattern.source), lookbehind: !0, alias: ["function-variable", "method", "function", "property-access"] } }), t.languages.insertBefore("javascript", "function", { method: { pattern: RegExp("(\\.\\s*)" + t.languages.javascript.function.source), lookbehind: !0, alias: ["function", "property-access"] } }), t.languages.insertBefore("javascript", "constant", { "known-class-name": [{ pattern: /\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/, alias: "class-name" }, { pattern: /\b(?:[A-Z]\w*)Error\b/, alias: "class-name" }] }), t.languages.insertBefore("javascript", "keyword", { imports: { pattern: e(/(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/.source), lookbehind: !0, inside: t.languages.javascript }, exports: { pattern: e(/(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/.source), lookbehind: !0, inside: t.languages.javascript } }), t.languages.javascript.keyword.unshift({ pattern: /\b(?:as|default|export|from|import)\b/, alias: "module" }, { pattern: /\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/, alias: "control-flow" }, { pattern: /\bnull\b/, alias: ["null", "nil"] }, { pattern: /\bundefined\b/, alias: "nil" }), t.languages.insertBefore("javascript", "operator", { spread: { pattern: /\.{3}/, alias: "operator" }, arrow: { pattern: /=>/, alias: "operator" } }), t.languages.insertBefore("javascript", "punctuation", { "property-access": { pattern: e(/(\.\s*)#?<ID>/.source), lookbehind: !0 }, "maybe-class-name": { pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/, lookbehind: !0 }, dom: { pattern: /\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/, alias: "variable" }, console: { pattern: /\bconsole(?=\s*\.)/, alias: "class-name" } });
  for (var n = ["function", "function-variable", "method", "method-variable", "property-access"], i = 0; i < n.length; i++) {
    var a = n[i], r = t.languages.javascript[a], a = (r = t.util.type(r) === "RegExp" ? t.languages.javascript[a] = { pattern: r } : r).inside || {};
    (r.inside = a)["maybe-class-name"] = /^[A-Z][\s\S]*/;
  }
}(w), function(t) {
  var e = t.util.clone(t.languages.javascript), n = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source, i = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source, r = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
  function a(l, m) {
    return l = l.replace(/<S>/g, function() {
      return n;
    }).replace(/<BRACES>/g, function() {
      return i;
    }).replace(/<SPREAD>/g, function() {
      return r;
    }), RegExp(l, m);
  }
  r = a(r).source, t.languages.jsx = t.languages.extend("markup", e), t.languages.jsx.tag.pattern = a(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source), t.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/, t.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/, t.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/, t.languages.jsx.tag.inside.comment = e.comment, t.languages.insertBefore("inside", "attr-name", { spread: { pattern: a(/<SPREAD>/.source), inside: t.languages.jsx } }, t.languages.jsx.tag), t.languages.insertBefore("inside", "special-attr", { script: { pattern: a(/=<BRACES>/.source), alias: "language-javascript", inside: { "script-punctuation": { pattern: /^=(?=\{)/, alias: "punctuation" }, rest: t.languages.jsx } } }, t.languages.jsx.tag);
  function o(l) {
    for (var m = [], d = 0; d < l.length; d++) {
      var u = l[d], h = !1;
      typeof u != "string" && (u.type === "tag" && u.content[0] && u.content[0].type === "tag" ? u.content[0].content[0].content === "</" ? 0 < m.length && m[m.length - 1].tagName === p(u.content[0].content[1]) && m.pop() : u.content[u.content.length - 1].content !== "/>" && m.push({ tagName: p(u.content[0].content[1]), openedBraces: 0 }) : 0 < m.length && u.type === "punctuation" && u.content === "{" ? m[m.length - 1].openedBraces++ : 0 < m.length && 0 < m[m.length - 1].openedBraces && u.type === "punctuation" && u.content === "}" ? m[m.length - 1].openedBraces-- : h = !0), (h || typeof u == "string") && 0 < m.length && m[m.length - 1].openedBraces === 0 && (h = p(u), d < l.length - 1 && (typeof l[d + 1] == "string" || l[d + 1].type === "plain-text") && (h += p(l[d + 1]), l.splice(d + 1, 1)), 0 < d && (typeof l[d - 1] == "string" || l[d - 1].type === "plain-text") && (h = p(l[d - 1]) + h, l.splice(d - 1, 1), d--), l[d] = new t.Token("plain-text", h, null, h)), u.content && typeof u.content != "string" && o(u.content);
    }
  }
  var p = function(l) {
    return l ? typeof l == "string" ? l : typeof l.content == "string" ? l.content : l.content.map(p).join("") : "";
  };
  t.hooks.add("after-tokenize", function(l) {
    l.language !== "jsx" && l.language !== "tsx" || o(l.tokens);
  });
}(w), function(t) {
  var e = t.util.clone(t.languages.typescript), e = (t.languages.tsx = t.languages.extend("jsx", e), delete t.languages.tsx.parameter, delete t.languages.tsx["literal-property"], t.languages.tsx.tag);
  e.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + "(?:" + e.pattern.source + ")", e.pattern.flags), e.lookbehind = !0;
}(w), w.languages.swift = { comment: { pattern: /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/, lookbehind: !0, greedy: !0 }, "string-literal": [{ pattern: RegExp(/(^|[^"#])/.source + "(?:" + /"(?:\\(?:\((?:[^()]|\([^()]*\))*\)|\r\n|[^(])|[^\\\r\n"])*"/.source + "|" + /"""(?:\\(?:\((?:[^()]|\([^()]*\))*\)|[^(])|[^\\"]|"(?!""))*"""/.source + ")" + /(?!["#])/.source), lookbehind: !0, greedy: !0, inside: { interpolation: { pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/, lookbehind: !0, inside: null }, "interpolation-punctuation": { pattern: /^\)|\\\($/, alias: "punctuation" }, punctuation: /\\(?=[\r\n])/, string: /[\s\S]+/ } }, { pattern: RegExp(/(^|[^"#])(#+)/.source + "(?:" + /"(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|\r\n|[^#])|[^\\\r\n])*?"/.source + "|" + /"""(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|[^#])|[^\\])*?"""/.source + ")\\2"), lookbehind: !0, greedy: !0, inside: { interpolation: { pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/, lookbehind: !0, inside: null }, "interpolation-punctuation": { pattern: /^\)|\\#+\($/, alias: "punctuation" }, string: /[\s\S]+/ } }], directive: { pattern: RegExp(/#/.source + "(?:" + /(?:elseif|if)\b/.source + "(?:[ 	]*" + /(?:![ \t]*)?(?:\b\w+\b(?:[ \t]*\((?:[^()]|\([^()]*\))*\))?|\((?:[^()]|\([^()]*\))*\))(?:[ \t]*(?:&&|\|\|))?/.source + ")+|" + /(?:else|endif)\b/.source + ")"), alias: "property", inside: { "directive-name": /^#\w+/, boolean: /\b(?:false|true)\b/, number: /\b\d+(?:\.\d+)*\b/, operator: /!|&&|\|\||[<>]=?/, punctuation: /[(),]/ } }, literal: { pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/, alias: "constant" }, "other-directive": { pattern: /#\w+\b/, alias: "property" }, attribute: { pattern: /@\w+/, alias: "atrule" }, "function-definition": { pattern: /(\bfunc\s+)\w+/, lookbehind: !0, alias: "function" }, label: { pattern: /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/, lookbehind: !0, alias: "important" }, keyword: /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/, boolean: /\b(?:false|true)\b/, nil: { pattern: /\bnil\b/, alias: "constant" }, "short-argument": /\$\d+\b/, omit: { pattern: /\b_\b/, alias: "keyword" }, number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i, "class-name": /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/, function: /\b[a-z_]\w*(?=\s*\()/i, constant: /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/, operator: /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/, punctuation: /[{}[\]();,.:\\]/ }, w.languages.swift["string-literal"].forEach(function(t) {
  t.inside.interpolation.inside = w.languages.swift;
}), function(t) {
  t.languages.kotlin = t.languages.extend("clike", { keyword: { pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/, lookbehind: !0 }, function: [{ pattern: /(?:`[^\r\n`]+`|\b\w+)(?=\s*\()/, greedy: !0 }, { pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/, lookbehind: !0, greedy: !0 }], number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/, operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/ }), delete t.languages.kotlin["class-name"];
  var e = { "interpolation-punctuation": { pattern: /^\$\{?|\}$/, alias: "punctuation" }, expression: { pattern: /[\s\S]+/, inside: t.languages.kotlin } };
  t.languages.insertBefore("kotlin", "string", { "string-literal": [{ pattern: /"""(?:[^$]|\$(?:(?!\{)|\{[^{}]*\}))*?"""/, alias: "multiline", inside: { interpolation: { pattern: /\$(?:[a-z_]\w*|\{[^{}]*\})/i, inside: e }, string: /[\s\S]+/ } }, { pattern: /"(?:[^"\\\r\n$]|\\.|\$(?:(?!\{)|\{[^{}]*\}))*"/, alias: "singleline", inside: { interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:[a-z_]\w*|\{[^{}]*\})/i, lookbehind: !0, inside: e }, string: /[\s\S]+/ } }], char: { pattern: /'(?:[^'\\\r\n]|\\(?:.|u[a-fA-F0-9]{0,4}))'/, greedy: !0 } }), delete t.languages.kotlin.string, t.languages.insertBefore("kotlin", "keyword", { annotation: { pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/, alias: "builtin" } }), t.languages.insertBefore("kotlin", "function", { label: { pattern: /\b\w+@|@\w+\b/, alias: "symbol" } }), t.languages.kt = t.languages.kotlin, t.languages.kts = t.languages.kotlin;
}(w), w.languages.c = w.languages.extend("clike", { comment: { pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 }, string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 }, "class-name": { pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/, lookbehind: !0 }, keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/, function: /\b[a-z_]\w*(?=\s*\()/i, number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i, operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/ }), w.languages.insertBefore("c", "string", { char: { pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/, greedy: !0 } }), w.languages.insertBefore("c", "string", { macro: { pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im, lookbehind: !0, greedy: !0, alias: "property", inside: { string: [{ pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 }, w.languages.c.string], char: w.languages.c.char, comment: w.languages.c.comment, "macro-name": [{ pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 }, { pattern: /(^#\s*define\s+)\w+\b(?=\()/i, lookbehind: !0, alias: "function" }], directive: { pattern: /^(#\s*)[a-z]+/, lookbehind: !0, alias: "keyword" }, "directive-hash": /^#/, punctuation: /##|\\(?=[\r\n])/, expression: { pattern: /\S[\s\S]*/, inside: w.languages.c } } } }), w.languages.insertBefore("c", "function", { constant: /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/ }), delete w.languages.c.boolean, w.languages.objectivec = w.languages.extend("c", { string: { pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 }, keyword: /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/, operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/ }), delete w.languages.objectivec["class-name"], w.languages.objc = w.languages.objectivec, w.languages.reason = w.languages.extend("clike", { string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/, greedy: !0 }, "class-name": /\b[A-Z]\w*/, keyword: /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/, operator: /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:asr|land|lor|lsl|lsr|lxor|mod)\b/ }), w.languages.insertBefore("reason", "class-name", { char: { pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/, greedy: !0 }, constructor: /\b[A-Z]\w*\b(?!\s*\.)/, label: { pattern: /\b[a-z]\w*(?=::)/, alias: "symbol" } }), delete w.languages.reason.function, function(t) {
  for (var e = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source, n = 0; n < 2; n++)
    e = e.replace(/<self>/g, function() {
      return e;
    });
  e = e.replace(/<self>/g, function() {
    return /[^\s\S]/.source;
  }), t.languages.rust = { comment: [{ pattern: RegExp(/(^|[^\\])/.source + e), lookbehind: !0, greedy: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }], string: { pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/, greedy: !0 }, char: { pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/, greedy: !0 }, attribute: { pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/, greedy: !0, alias: "attr-name", inside: { string: null } }, "closure-params": { pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/, lookbehind: !0, greedy: !0, inside: { "closure-punctuation": { pattern: /^\||\|$/, alias: "punctuation" }, rest: null } }, "lifetime-annotation": { pattern: /'\w+/, alias: "symbol" }, "fragment-specifier": { pattern: /(\$\w+:)[a-z]+/, lookbehind: !0, alias: "punctuation" }, variable: /\$\w+/, "function-definition": { pattern: /(\bfn\s+)\w+/, lookbehind: !0, alias: "function" }, "type-definition": { pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/, lookbehind: !0, alias: "class-name" }, "module-declaration": [{ pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/, lookbehind: !0, alias: "namespace" }, { pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/, lookbehind: !0, alias: "namespace", inside: { punctuation: /::/ } }], keyword: [/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/, /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/], function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/, macro: { pattern: /\b\w+!/, alias: "property" }, constant: /\b[A-Z_][A-Z_\d]+\b/, "class-name": /\b[A-Z]\w*\b/, namespace: { pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/, inside: { punctuation: /::/ } }, number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/, boolean: /\b(?:false|true)\b/, punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/, operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/ }, t.languages.rust["closure-params"].inside.rest = t.languages.rust, t.languages.rust.attribute.inside.string = t.languages.rust.string;
}(w), w.languages.go = w.languages.extend("clike", { string: { pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/, lookbehind: !0, greedy: !0 }, keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/, boolean: /\b(?:_|false|iota|nil|true)\b/, number: [/\b0(?:b[01_]+|o[0-7_]+)i?\b/i, /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i, /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i], operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./, builtin: /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/ }), w.languages.insertBefore("go", "string", { char: { pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/, greedy: !0 } }), delete w.languages.go["class-name"], function(t) {
  var e = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/, n = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function() {
    return e.source;
  });
  t.languages.cpp = t.languages.extend("c", { "class-name": [{ pattern: RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g, function() {
    return e.source;
  })), lookbehind: !0 }, /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/, /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i, /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/], keyword: e, number: { pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i, greedy: !0 }, operator: />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/, boolean: /\b(?:false|true)\b/ }), t.languages.insertBefore("cpp", "string", { module: { pattern: RegExp(/(\b(?:import|module)\s+)/.source + "(?:" + /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source + "|" + /<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g, function() {
    return n;
  }) + ")"), lookbehind: !0, greedy: !0, inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ } }, "raw-string": { pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/, alias: "string", greedy: !0 } }), t.languages.insertBefore("cpp", "keyword", { "generic-function": { pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i, inside: { function: /^\w+/, generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: t.languages.cpp } } } }), t.languages.insertBefore("cpp", "operator", { "double-colon": { pattern: /::/, alias: "punctuation" } }), t.languages.insertBefore("cpp", "class-name", { "base-clause": { pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/, lookbehind: !0, greedy: !0, inside: t.languages.extend("cpp", {}) } }), t.languages.insertBefore("inside", "double-colon", { "class-name": /\b[a-z_]\w*\b(?!\s*::)/i }, t.languages.cpp["base-clause"]);
}(w), w.languages.python = { comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 }, "string-interpolation": { pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i, greedy: !0, inside: { interpolation: { pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/, lookbehind: !0, inside: { "format-spec": { pattern: /(:)[^:(){}]+(?=\}$)/, lookbehind: !0 }, "conversion-option": { pattern: /![sra](?=[:}]$)/, alias: "punctuation" }, rest: null } }, string: /[\s\S]+/ } }, "triple-quoted-string": { pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i, greedy: !0, alias: "string" }, string: { pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: !0 }, function: { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0 }, "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 }, decorator: { pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m, lookbehind: !0, alias: ["annotation", "punctuation"], inside: { punctuation: /\./ } }, keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/, builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/, boolean: /\b(?:False|None|True)\b/, number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i, operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/, punctuation: /[{}[\];(),.:]/ }, w.languages.python["string-interpolation"].inside.interpolation.inside.rest = w.languages.python, w.languages.py = w.languages.python, w.languages.json = { property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: !0, greedy: !0 }, string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: !0, greedy: !0 }, comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 }, number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i, punctuation: /[{}[\],]/, operator: /:/, boolean: /\b(?:false|true)\b/, null: { pattern: /\bnull\b/, alias: "keyword" } }, w.languages.webmanifest = w.languages.json;
var Ir = {};
Js(Ir, {
  dracula: () => il,
  duotoneDark: () => ol,
  duotoneLight: () => pl,
  github: () => ll,
  gruvboxMaterialDark: () => Dl,
  gruvboxMaterialLight: () => Bl,
  jettwaveDark: () => zl,
  jettwaveLight: () => Nl,
  nightOwl: () => dl,
  nightOwlLight: () => gl,
  oceanicNext: () => fl,
  okaidia: () => xl,
  oneDark: () => Il,
  oneLight: () => Ml,
  palenight: () => yl,
  shadesOfPurple: () => kl,
  synthwave84: () => vl,
  ultramin: () => Sl,
  vsDark: () => Fr,
  vsLight: () => Al
});
var nl = {
  plain: {
    color: "#F8F8F2",
    backgroundColor: "#282A36"
  },
  styles: [
    {
      types: ["prolog", "constant", "builtin"],
      style: {
        color: "rgb(189, 147, 249)"
      }
    },
    {
      types: ["inserted", "function"],
      style: {
        color: "rgb(80, 250, 123)"
      }
    },
    {
      types: ["deleted"],
      style: {
        color: "rgb(255, 85, 85)"
      }
    },
    {
      types: ["changed"],
      style: {
        color: "rgb(255, 184, 108)"
      }
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "rgb(248, 248, 242)"
      }
    },
    {
      types: ["string", "char", "tag", "selector"],
      style: {
        color: "rgb(255, 121, 198)"
      }
    },
    {
      types: ["keyword", "variable"],
      style: {
        color: "rgb(189, 147, 249)",
        fontStyle: "italic"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(98, 114, 164)"
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: "rgb(241, 250, 140)"
      }
    }
  ]
}, il = nl, rl = {
  plain: {
    backgroundColor: "#2a2734",
    color: "#9a86fd"
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      style: {
        color: "#6c6783"
      }
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["tag", "operator", "number"],
      style: {
        color: "#e09142"
      }
    },
    {
      types: ["property", "function"],
      style: {
        color: "#9a86fd"
      }
    },
    {
      types: ["tag-id", "selector", "atrule-id"],
      style: {
        color: "#eeebff"
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: "#c4b9fe"
      }
    },
    {
      types: [
        "boolean",
        "string",
        "entity",
        "url",
        "attr-value",
        "keyword",
        "control",
        "directive",
        "unit",
        "statement",
        "regex",
        "atrule",
        "placeholder",
        "variable"
      ],
      style: {
        color: "#ffcc99"
      }
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through"
      }
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline"
      }
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["important"],
      style: {
        color: "#c4b9fe"
      }
    }
  ]
}, ol = rl, al = {
  plain: {
    backgroundColor: "#faf8f5",
    color: "#728fcb"
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      style: {
        color: "#b6ad9a"
      }
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["tag", "operator", "number"],
      style: {
        color: "#063289"
      }
    },
    {
      types: ["property", "function"],
      style: {
        color: "#b29762"
      }
    },
    {
      types: ["tag-id", "selector", "atrule-id"],
      style: {
        color: "#2d2006"
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: "#896724"
      }
    },
    {
      types: [
        "boolean",
        "string",
        "entity",
        "url",
        "attr-value",
        "keyword",
        "control",
        "directive",
        "unit",
        "statement",
        "regex",
        "atrule"
      ],
      style: {
        color: "#728fcb"
      }
    },
    {
      types: ["placeholder", "variable"],
      style: {
        color: "#93abdc"
      }
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through"
      }
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline"
      }
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["important"],
      style: {
        color: "#896724"
      }
    }
  ]
}, pl = al, sl = {
  plain: {
    color: "#393A34",
    backgroundColor: "#f6f8fa"
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#999988",
        fontStyle: "italic"
      }
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#e3116c"
      }
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#393A34"
      }
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted"
      ],
      style: {
        color: "#36acaa"
      }
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#00a4db"
      }
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#d73a49"
      }
    },
    {
      types: ["function-variable"],
      style: {
        color: "#6f42c1"
      }
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#00009f"
      }
    }
  ]
}, ll = sl, ml = {
  plain: {
    color: "#d6deeb",
    backgroundColor: "#011627"
  },
  styles: [
    {
      types: ["changed"],
      style: {
        color: "rgb(162, 191, 252)",
        fontStyle: "italic"
      }
    },
    {
      types: ["deleted"],
      style: {
        color: "rgba(239, 83, 80, 0.56)",
        fontStyle: "italic"
      }
    },
    {
      types: ["inserted", "attr-name"],
      style: {
        color: "rgb(173, 219, 103)",
        fontStyle: "italic"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(99, 119, 119)",
        fontStyle: "italic"
      }
    },
    {
      types: ["string", "url"],
      style: {
        color: "rgb(173, 219, 103)"
      }
    },
    {
      types: ["variable"],
      style: {
        color: "rgb(214, 222, 235)"
      }
    },
    {
      types: ["number"],
      style: {
        color: "rgb(247, 140, 108)"
      }
    },
    {
      types: ["builtin", "char", "constant", "function"],
      style: {
        color: "rgb(130, 170, 255)"
      }
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ["punctuation"],
      style: {
        color: "rgb(199, 146, 234)"
      }
    },
    {
      types: ["selector", "doctype"],
      style: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic"
      }
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(255, 203, 139)"
      }
    },
    {
      types: ["tag", "operator", "keyword"],
      style: {
        color: "rgb(127, 219, 202)"
      }
    },
    {
      types: ["boolean"],
      style: {
        color: "rgb(255, 88, 116)"
      }
    },
    {
      types: ["property"],
      style: {
        color: "rgb(128, 203, 196)"
      }
    },
    {
      types: ["namespace"],
      style: {
        color: "rgb(178, 204, 214)"
      }
    }
  ]
}, dl = ml, cl = {
  plain: {
    color: "#403f53",
    backgroundColor: "#FBFBFB"
  },
  styles: [
    {
      types: ["changed"],
      style: {
        color: "rgb(162, 191, 252)",
        fontStyle: "italic"
      }
    },
    {
      types: ["deleted"],
      style: {
        color: "rgba(239, 83, 80, 0.56)",
        fontStyle: "italic"
      }
    },
    {
      types: ["inserted", "attr-name"],
      style: {
        color: "rgb(72, 118, 214)",
        fontStyle: "italic"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(152, 159, 177)",
        fontStyle: "italic"
      }
    },
    {
      types: ["string", "builtin", "char", "constant", "url"],
      style: {
        color: "rgb(72, 118, 214)"
      }
    },
    {
      types: ["variable"],
      style: {
        color: "rgb(201, 103, 101)"
      }
    },
    {
      types: ["number"],
      style: {
        color: "rgb(170, 9, 130)"
      }
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ["punctuation"],
      style: {
        color: "rgb(153, 76, 195)"
      }
    },
    {
      types: ["function", "selector", "doctype"],
      style: {
        color: "rgb(153, 76, 195)",
        fontStyle: "italic"
      }
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(17, 17, 17)"
      }
    },
    {
      types: ["tag"],
      style: {
        color: "rgb(153, 76, 195)"
      }
    },
    {
      types: ["operator", "property", "keyword", "namespace"],
      style: {
        color: "rgb(12, 150, 155)"
      }
    },
    {
      types: ["boolean"],
      style: {
        color: "rgb(188, 84, 84)"
      }
    }
  ]
}, gl = cl, W = {
  char: "#D8DEE9",
  comment: "#999999",
  keyword: "#c5a5c5",
  primitive: "#5a9bcf",
  string: "#8dc891",
  variable: "#d7deea",
  boolean: "#ff8b50",
  tag: "#fc929e",
  function: "#79b6f2",
  className: "#FAC863"
}, ul = {
  plain: {
    backgroundColor: "#282c34",
    color: "#ffffff"
  },
  styles: [
    {
      types: ["attr-name"],
      style: {
        color: W.keyword
      }
    },
    {
      types: ["attr-value"],
      style: {
        color: W.string
      }
    },
    {
      types: [
        "comment",
        "block-comment",
        "prolog",
        "doctype",
        "cdata",
        "shebang"
      ],
      style: {
        color: W.comment
      }
    },
    {
      types: [
        "property",
        "number",
        "function-name",
        "constant",
        "symbol",
        "deleted"
      ],
      style: {
        color: W.primitive
      }
    },
    {
      types: ["boolean"],
      style: {
        color: W.boolean
      }
    },
    {
      types: ["tag"],
      style: {
        color: W.tag
      }
    },
    {
      types: ["string"],
      style: {
        color: W.string
      }
    },
    {
      types: ["punctuation"],
      style: {
        color: W.string
      }
    },
    {
      types: ["selector", "char", "builtin", "inserted"],
      style: {
        color: W.char
      }
    },
    {
      types: ["function"],
      style: {
        color: W.function
      }
    },
    {
      types: ["operator", "entity", "url", "variable"],
      style: {
        color: W.variable
      }
    },
    {
      types: ["keyword"],
      style: {
        color: W.keyword
      }
    },
    {
      types: ["atrule", "class-name"],
      style: {
        color: W.className
      }
    },
    {
      types: ["important"],
      style: {
        fontWeight: "400"
      }
    },
    {
      types: ["bold"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    }
  ]
}, fl = ul, hl = {
  plain: {
    color: "#f8f8f2",
    backgroundColor: "#272822"
  },
  styles: [
    {
      types: ["changed"],
      style: {
        color: "rgb(162, 191, 252)",
        fontStyle: "italic"
      }
    },
    {
      types: ["deleted"],
      style: {
        color: "#f92672",
        fontStyle: "italic"
      }
    },
    {
      types: ["inserted"],
      style: {
        color: "rgb(173, 219, 103)",
        fontStyle: "italic"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "#8292a2",
        fontStyle: "italic"
      }
    },
    {
      types: ["string", "url"],
      style: {
        color: "#a6e22e"
      }
    },
    {
      types: ["variable"],
      style: {
        color: "#f8f8f2"
      }
    },
    {
      types: ["number"],
      style: {
        color: "#ae81ff"
      }
    },
    {
      types: ["builtin", "char", "constant", "function", "class-name"],
      style: {
        color: "#e6db74"
      }
    },
    {
      types: ["punctuation"],
      style: {
        color: "#f8f8f2"
      }
    },
    {
      types: ["selector", "doctype"],
      style: {
        color: "#a6e22e",
        fontStyle: "italic"
      }
    },
    {
      types: ["tag", "operator", "keyword"],
      style: {
        color: "#66d9ef"
      }
    },
    {
      types: ["boolean"],
      style: {
        color: "#ae81ff"
      }
    },
    {
      types: ["namespace"],
      style: {
        color: "rgb(178, 204, 214)",
        opacity: 0.7
      }
    },
    {
      types: ["tag", "property"],
      style: {
        color: "#f92672"
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: "#a6e22e !important"
      }
    },
    {
      types: ["doctype"],
      style: {
        color: "#8292a2"
      }
    },
    {
      types: ["rule"],
      style: {
        color: "#e6db74"
      }
    }
  ]
}, xl = hl, bl = {
  plain: {
    color: "#bfc7d5",
    backgroundColor: "#292d3e"
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "rgb(105, 112, 152)",
        fontStyle: "italic"
      }
    },
    {
      types: ["string", "inserted"],
      style: {
        color: "rgb(195, 232, 141)"
      }
    },
    {
      types: ["number"],
      style: {
        color: "rgb(247, 140, 108)"
      }
    },
    {
      types: ["builtin", "char", "constant", "function"],
      style: {
        color: "rgb(130, 170, 255)"
      }
    },
    {
      types: ["punctuation", "selector"],
      style: {
        color: "rgb(199, 146, 234)"
      }
    },
    {
      types: ["variable"],
      style: {
        color: "rgb(191, 199, 213)"
      }
    },
    {
      types: ["class-name", "attr-name"],
      style: {
        color: "rgb(255, 203, 107)"
      }
    },
    {
      types: ["tag", "deleted"],
      style: {
        color: "rgb(255, 85, 114)"
      }
    },
    {
      types: ["operator"],
      style: {
        color: "rgb(137, 221, 255)"
      }
    },
    {
      types: ["boolean"],
      style: {
        color: "rgb(255, 88, 116)"
      }
    },
    {
      types: ["keyword"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["doctype"],
      style: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic"
      }
    },
    {
      types: ["namespace"],
      style: {
        color: "rgb(178, 204, 214)"
      }
    },
    {
      types: ["url"],
      style: {
        color: "rgb(221, 221, 221)"
      }
    }
  ]
}, yl = bl, wl = {
  plain: {
    color: "#9EFEFF",
    backgroundColor: "#2D2A55"
  },
  styles: [
    {
      types: ["changed"],
      style: {
        color: "rgb(255, 238, 128)"
      }
    },
    {
      types: ["deleted"],
      style: {
        color: "rgba(239, 83, 80, 0.56)"
      }
    },
    {
      types: ["inserted"],
      style: {
        color: "rgb(173, 219, 103)"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(179, 98, 255)",
        fontStyle: "italic"
      }
    },
    {
      types: ["punctuation"],
      style: {
        color: "rgb(255, 255, 255)"
      }
    },
    {
      types: ["constant"],
      style: {
        color: "rgb(255, 98, 140)"
      }
    },
    {
      types: ["string", "url"],
      style: {
        color: "rgb(165, 255, 144)"
      }
    },
    {
      types: ["variable"],
      style: {
        color: "rgb(255, 238, 128)"
      }
    },
    {
      types: ["number", "boolean"],
      style: {
        color: "rgb(255, 98, 140)"
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: "rgb(255, 180, 84)"
      }
    },
    {
      types: [
        "keyword",
        "operator",
        "property",
        "namespace",
        "tag",
        "selector",
        "doctype"
      ],
      style: {
        color: "rgb(255, 157, 0)"
      }
    },
    {
      types: ["builtin", "char", "constant", "function", "class-name"],
      style: {
        color: "rgb(250, 208, 0)"
      }
    }
  ]
}, kl = wl, _l = {
  plain: {
    backgroundColor: "linear-gradient(to bottom, #2a2139 75%, #34294f)",
    backgroundImage: "#34294f",
    color: "#f92aad",
    textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3"
  },
  styles: [
    {
      types: ["comment", "block-comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#495495",
        fontStyle: "italic"
      }
    },
    {
      types: ["punctuation"],
      style: {
        color: "#ccc"
      }
    },
    {
      types: [
        "tag",
        "attr-name",
        "namespace",
        "number",
        "unit",
        "hexcode",
        "deleted"
      ],
      style: {
        color: "#e2777a"
      }
    },
    {
      types: ["property", "selector"],
      style: {
        color: "#72f1b8",
        textShadow: "0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475"
      }
    },
    {
      types: ["function-name"],
      style: {
        color: "#6196cc"
      }
    },
    {
      types: ["boolean", "selector-id", "function"],
      style: {
        color: "#fdfdfd",
        textShadow: "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975"
      }
    },
    {
      types: ["class-name", "maybe-class-name", "builtin"],
      style: {
        color: "#fff5f6",
        textShadow: "0 0 2px #000, 0 0 10px #fc1f2c75, 0 0 5px #fc1f2c75, 0 0 25px #fc1f2c75"
      }
    },
    {
      types: ["constant", "symbol"],
      style: {
        color: "#f92aad",
        textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3"
      }
    },
    {
      types: ["important", "atrule", "keyword", "selector-class"],
      style: {
        color: "#f4eee4",
        textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575"
      }
    },
    {
      types: ["string", "char", "attr-value", "regex", "variable"],
      style: {
        color: "#f87c32"
      }
    },
    {
      types: ["parameter"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["entity", "url"],
      style: {
        color: "#67cdcc"
      }
    },
    {
      types: ["operator"],
      style: {
        color: "ffffffee"
      }
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["entity"],
      style: {
        cursor: "help"
      }
    },
    {
      types: ["inserted"],
      style: {
        color: "green"
      }
    }
  ]
}, vl = _l, El = {
  plain: {
    color: "#282a2e",
    backgroundColor: "#ffffff"
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "rgb(197, 200, 198)"
      }
    },
    {
      types: ["string", "number", "builtin", "variable"],
      style: {
        color: "rgb(150, 152, 150)"
      }
    },
    {
      types: ["class-name", "function", "tag", "attr-name"],
      style: {
        color: "rgb(40, 42, 46)"
      }
    }
  ]
}, Sl = El, Rl = {
  plain: {
    color: "#9CDCFE",
    backgroundColor: "#1E1E1E"
  },
  styles: [
    {
      types: ["prolog"],
      style: {
        color: "rgb(0, 0, 128)"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(106, 153, 85)"
      }
    },
    {
      types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
      style: {
        color: "rgb(86, 156, 214)"
      }
    },
    {
      types: ["number", "inserted"],
      style: {
        color: "rgb(181, 206, 168)"
      }
    },
    {
      types: ["constant"],
      style: {
        color: "rgb(100, 102, 149)"
      }
    },
    {
      types: ["attr-name", "variable"],
      style: {
        color: "rgb(156, 220, 254)"
      }
    },
    {
      types: ["deleted", "string", "attr-value", "template-punctuation"],
      style: {
        color: "rgb(206, 145, 120)"
      }
    },
    {
      types: ["selector"],
      style: {
        color: "rgb(215, 186, 125)"
      }
    },
    {
      // Fix tag color
      types: ["tag"],
      style: {
        color: "rgb(78, 201, 176)"
      }
    },
    {
      // Fix tag color for HTML
      types: ["tag"],
      languages: ["markup"],
      style: {
        color: "rgb(86, 156, 214)"
      }
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "rgb(212, 212, 212)"
      }
    },
    {
      // Fix punctuation color for HTML
      types: ["punctuation"],
      languages: ["markup"],
      style: {
        color: "#808080"
      }
    },
    {
      types: ["function"],
      style: {
        color: "rgb(220, 220, 170)"
      }
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(78, 201, 176)"
      }
    },
    {
      types: ["char"],
      style: {
        color: "rgb(209, 105, 105)"
      }
    }
  ]
}, Fr = Rl, Tl = {
  plain: {
    color: "#000000",
    backgroundColor: "#ffffff"
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "rgb(0, 128, 0)"
      }
    },
    {
      types: ["builtin"],
      style: {
        color: "rgb(0, 112, 193)"
      }
    },
    {
      types: ["number", "variable", "inserted"],
      style: {
        color: "rgb(9, 134, 88)"
      }
    },
    {
      types: ["operator"],
      style: {
        color: "rgb(0, 0, 0)"
      }
    },
    {
      types: ["constant", "char"],
      style: {
        color: "rgb(129, 31, 63)"
      }
    },
    {
      types: ["tag"],
      style: {
        color: "rgb(128, 0, 0)"
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: "rgb(255, 0, 0)"
      }
    },
    {
      types: ["deleted", "string"],
      style: {
        color: "rgb(163, 21, 21)"
      }
    },
    {
      types: ["changed", "punctuation"],
      style: {
        color: "rgb(4, 81, 165)"
      }
    },
    {
      types: ["function", "keyword"],
      style: {
        color: "rgb(0, 0, 255)"
      }
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(38, 127, 153)"
      }
    }
  ]
}, Al = Tl, Cl = {
  plain: {
    color: "#f8fafc",
    backgroundColor: "#011627"
  },
  styles: [
    {
      types: ["prolog"],
      style: {
        color: "#000080"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "#6A9955"
      }
    },
    {
      types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
      style: {
        color: "#569CD6"
      }
    },
    {
      types: ["number", "inserted"],
      style: {
        color: "#B5CEA8"
      }
    },
    {
      types: ["constant"],
      style: {
        color: "#f8fafc"
      }
    },
    {
      types: ["attr-name", "variable"],
      style: {
        color: "#9CDCFE"
      }
    },
    {
      types: ["deleted", "string", "attr-value", "template-punctuation"],
      style: {
        color: "#cbd5e1"
      }
    },
    {
      types: ["selector"],
      style: {
        color: "#D7BA7D"
      }
    },
    {
      types: ["tag"],
      style: {
        color: "#0ea5e9"
      }
    },
    {
      types: ["tag"],
      languages: ["markup"],
      style: {
        color: "#0ea5e9"
      }
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#D4D4D4"
      }
    },
    {
      types: ["punctuation"],
      languages: ["markup"],
      style: {
        color: "#808080"
      }
    },
    {
      types: ["function"],
      style: {
        color: "#7dd3fc"
      }
    },
    {
      types: ["class-name"],
      style: {
        color: "#0ea5e9"
      }
    },
    {
      types: ["char"],
      style: {
        color: "#D16969"
      }
    }
  ]
}, zl = Cl, Ol = {
  plain: {
    color: "#0f172a",
    backgroundColor: "#f1f5f9"
  },
  styles: [
    {
      types: ["prolog"],
      style: {
        color: "#000080"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "#6A9955"
      }
    },
    {
      types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
      style: {
        color: "#0c4a6e"
      }
    },
    {
      types: ["number", "inserted"],
      style: {
        color: "#B5CEA8"
      }
    },
    {
      types: ["constant"],
      style: {
        color: "#0f172a"
      }
    },
    {
      types: ["attr-name", "variable"],
      style: {
        color: "#0c4a6e"
      }
    },
    {
      types: ["deleted", "string", "attr-value", "template-punctuation"],
      style: {
        color: "#64748b"
      }
    },
    {
      types: ["selector"],
      style: {
        color: "#D7BA7D"
      }
    },
    {
      types: ["tag"],
      style: {
        color: "#0ea5e9"
      }
    },
    {
      types: ["tag"],
      languages: ["markup"],
      style: {
        color: "#0ea5e9"
      }
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#475569"
      }
    },
    {
      types: ["punctuation"],
      languages: ["markup"],
      style: {
        color: "#808080"
      }
    },
    {
      types: ["function"],
      style: {
        color: "#0e7490"
      }
    },
    {
      types: ["class-name"],
      style: {
        color: "#0ea5e9"
      }
    },
    {
      types: ["char"],
      style: {
        color: "#D16969"
      }
    }
  ]
}, Nl = Ol, Ll = {
  plain: {
    backgroundColor: "hsl(220, 13%, 18%)",
    color: "hsl(220, 14%, 71%)",
    textShadow: "0 1px rgba(0, 0, 0, 0.3)"
  },
  styles: [
    {
      types: ["comment", "prolog", "cdata"],
      style: {
        color: "hsl(220, 10%, 40%)"
      }
    },
    {
      types: ["doctype", "punctuation", "entity"],
      style: {
        color: "hsl(220, 14%, 71%)"
      }
    },
    {
      types: [
        "attr-name",
        "class-name",
        "maybe-class-name",
        "boolean",
        "constant",
        "number",
        "atrule"
      ],
      style: { color: "hsl(29, 54%, 61%)" }
    },
    {
      types: ["keyword"],
      style: { color: "hsl(286, 60%, 67%)" }
    },
    {
      types: ["property", "tag", "symbol", "deleted", "important"],
      style: {
        color: "hsl(355, 65%, 65%)"
      }
    },
    {
      types: [
        "selector",
        "string",
        "char",
        "builtin",
        "inserted",
        "regex",
        "attr-value"
      ],
      style: {
        color: "hsl(95, 38%, 62%)"
      }
    },
    {
      types: ["variable", "operator", "function"],
      style: {
        color: "hsl(207, 82%, 66%)"
      }
    },
    {
      types: ["url"],
      style: {
        color: "hsl(187, 47%, 55%)"
      }
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through"
      }
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline"
      }
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["important"],
      style: {
        color: "hsl(220, 14%, 71%)"
      }
    }
  ]
}, Il = Ll, Fl = {
  plain: {
    backgroundColor: "hsl(230, 1%, 98%)",
    color: "hsl(230, 8%, 24%)"
  },
  styles: [
    {
      types: ["comment", "prolog", "cdata"],
      style: {
        color: "hsl(230, 4%, 64%)"
      }
    },
    {
      types: ["doctype", "punctuation", "entity"],
      style: {
        color: "hsl(230, 8%, 24%)"
      }
    },
    {
      types: [
        "attr-name",
        "class-name",
        "boolean",
        "constant",
        "number",
        "atrule"
      ],
      style: {
        color: "hsl(35, 99%, 36%)"
      }
    },
    {
      types: ["keyword"],
      style: {
        color: "hsl(301, 63%, 40%)"
      }
    },
    {
      types: ["property", "tag", "symbol", "deleted", "important"],
      style: {
        color: "hsl(5, 74%, 59%)"
      }
    },
    {
      types: [
        "selector",
        "string",
        "char",
        "builtin",
        "inserted",
        "regex",
        "attr-value",
        "punctuation"
      ],
      style: {
        color: "hsl(119, 34%, 47%)"
      }
    },
    {
      types: ["variable", "operator", "function"],
      style: {
        color: "hsl(221, 87%, 60%)"
      }
    },
    {
      types: ["url"],
      style: {
        color: "hsl(198, 99%, 37%)"
      }
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through"
      }
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline"
      }
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["important"],
      style: {
        color: "hsl(230, 8%, 24%)"
      }
    }
  ]
}, Ml = Fl, Pl = {
  plain: {
    color: "#ebdbb2",
    backgroundColor: "#292828"
  },
  styles: [
    {
      types: [
        "imports",
        "class-name",
        "maybe-class-name",
        "constant",
        "doctype",
        "builtin",
        "function"
      ],
      style: {
        color: "#d8a657"
      }
    },
    {
      types: ["property-access"],
      style: {
        color: "#7daea3"
      }
    },
    {
      types: ["tag"],
      style: {
        color: "#e78a4e"
      }
    },
    {
      types: ["attr-name", "char", "url", "regex"],
      style: {
        color: "#a9b665"
      }
    },
    {
      types: ["attr-value", "string"],
      style: {
        color: "#89b482"
      }
    },
    {
      types: ["comment", "prolog", "cdata", "operator", "inserted"],
      style: {
        color: "#a89984"
      }
    },
    {
      types: [
        "delimiter",
        "boolean",
        "keyword",
        "selector",
        "important",
        "atrule",
        "property",
        "variable",
        "deleted"
      ],
      style: {
        color: "#ea6962"
      }
    },
    {
      types: ["entity", "number", "symbol"],
      style: {
        color: "#d3869b"
      }
    }
  ]
}, Dl = Pl, jl = {
  plain: {
    color: "#654735",
    backgroundColor: "#f9f5d7"
  },
  styles: [
    {
      types: [
        "delimiter",
        "boolean",
        "keyword",
        "selector",
        "important",
        "atrule",
        "property",
        "variable",
        "deleted"
      ],
      style: {
        color: "#af2528"
      }
    },
    {
      types: [
        "imports",
        "class-name",
        "maybe-class-name",
        "constant",
        "doctype",
        "builtin"
      ],
      style: {
        color: "#b4730e"
      }
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#477a5b"
      }
    },
    {
      types: ["property-access"],
      style: {
        color: "#266b79"
      }
    },
    {
      types: ["function", "attr-name", "char", "url"],
      style: {
        color: "#72761e"
      }
    },
    {
      types: ["tag"],
      style: {
        color: "#b94c07"
      }
    },
    {
      types: ["comment", "prolog", "cdata", "operator", "inserted"],
      style: {
        color: "#a89984"
      }
    },
    {
      types: ["entity", "number", "symbol"],
      style: {
        color: "#924f79"
      }
    }
  ]
}, Bl = jl, Ul = (t) => mt(
  (e) => {
    var n = e, { className: i, style: r, line: a } = n, o = Lr(n, ["className", "style", "line"]);
    const p = Le(pt({}, o), {
      className: L("token-line", i)
    });
    return typeof t == "object" && "plain" in t && (p.style = t.plain), typeof r == "object" && (p.style = pt(pt({}, p.style || {}), r)), p;
  },
  [t]
), $l = (t) => {
  const e = mt(
    ({ types: n, empty: i }) => {
      if (t != null) {
        {
          if (n.length === 1 && n[0] === "plain")
            return i != null ? { display: "inline-block" } : void 0;
          if (n.length === 1 && i != null)
            return t[n[0]];
        }
        return Object.assign(
          i != null ? { display: "inline-block" } : {},
          ...n.map((r) => t[r])
        );
      }
    },
    [t]
  );
  return mt(
    (n) => {
      var i = n, { token: r, className: a, style: o } = i, p = Lr(i, ["token", "className", "style"]);
      const l = Le(pt({}, p), {
        className: L("token", ...r.types, a),
        children: r.content,
        style: e(r)
      });
      return o != null && (l.style = pt(pt({}, l.style || {}), o)), l;
    },
    [e]
  );
}, Hl = /\r\n|\r|\n/, di = (t) => {
  t.length === 0 ? t.push({
    types: ["plain"],
    content: `
`,
    empty: !0
  }) : t.length === 1 && t[0].content === "" && (t[0].content = `
`, t[0].empty = !0);
}, ci = (t, e) => {
  const n = t.length;
  return n > 0 && t[n - 1] === e ? t : t.concat(e);
}, Vl = (t) => {
  const e = [[]], n = [t], i = [0], r = [t.length];
  let a = 0, o = 0, p = [];
  const l = [p];
  for (; o > -1; ) {
    for (; (a = i[o]++) < r[o]; ) {
      let m, d = e[o];
      const h = n[o][a];
      if (typeof h == "string" ? (d = o > 0 ? d : ["plain"], m = h) : (d = ci(d, h.type), h.alias && (d = ci(d, h.alias)), m = h.content), typeof m != "string") {
        o++, e.push(d), n.push(m), i.push(0), r.push(m.length);
        continue;
      }
      const k = m.split(Hl), c = k.length;
      p.push({
        types: d,
        content: k[0]
      });
      for (let g = 1; g < c; g++)
        di(p), l.push(p = []), p.push({
          types: d,
          content: k[g]
        });
    }
    o--, e.pop(), n.pop(), i.pop(), r.pop();
  }
  return di(p), l;
}, gi = Vl, Gl = ({ prism: t, code: e, grammar: n, language: i }) => tn(() => {
  if (n == null)
    return gi([e]);
  const r = {
    code: e,
    grammar: n,
    language: i,
    tokens: []
  };
  return t.hooks.run("before-tokenize", r), r.tokens = t.tokenize(e, n), t.hooks.run("after-tokenize", r), gi(r.tokens);
}, [
  e,
  n,
  i,
  // prism is a stable import
  t
]), ql = (t, e) => {
  const { plain: n } = t, i = t.styles.reduce((r, a) => {
    const { languages: o, style: p } = a;
    return o && !o.includes(e) || a.types.forEach((l) => {
      const m = pt(pt({}, r[l]), p);
      r[l] = m;
    }), r;
  }, {});
  return i.root = n, i.plain = Le(pt({}, n), { backgroundColor: void 0 }), i;
}, Zl = ql, Wl = ({
  children: t,
  language: e,
  code: n,
  theme: i,
  prism: r
}) => {
  const a = e.toLowerCase(), o = Zl(i, a), p = Ul(o), l = $l(o), m = r.languages[a], d = Gl({ prism: r, language: a, code: n, grammar: m });
  return t({
    tokens: d,
    className: `prism-code language-${a}`,
    style: o != null ? o.root : {},
    getLineProps: p,
    getTokenProps: l
  });
}, Xl = (t) => Zr(Wl, Le(pt({}, t), {
  prism: t.prism || w,
  theme: t.theme || Fr,
  code: t.code,
  language: t.language
}));
/*! Bundled license information:

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)
*/
function Yl(t) {
  let e = "";
  return e = t.children[0].data, e;
}
const Kl = ({ body: t = "", language: e = "" }) => {
  const [n, i] = j("Copy");
  return t ? /* @__PURE__ */ E(
    "div",
    {
      className: "bg-darkGrey text-white d-flex align-center justify-between gp-4 gmt-6",
      style: { borderRadius: "8px 8px 0 0" },
      children: [
        /* @__PURE__ */ s("p", { className: "font_12_500 gml-4", style: { margin: 0 }, children: e }),
        /* @__PURE__ */ s(
          vt,
          {
            onClick: async () => {
              try {
                await navigator.clipboard.writeText(t), i("Copied"), setTimeout(() => {
                  i("Copy");
                }, 5e3);
              } catch (a) {
                console.error("Failed to copy: ", a);
              }
            },
            className: "font_12_500 text-white gp-4",
            variant: "text",
            children: n
          }
        )
      ]
    }
  ) : null;
};
function Jl({
  domNode: t
}) {
  var i;
  const e = Yl(t), n = ((i = t == null ? void 0 : t.attribs) == null ? void 0 : i.class.split("-").pop()) || "python";
  return /* @__PURE__ */ E(Bt, { children: [
    /* @__PURE__ */ s(Kl, { body: e, language: n }),
    /* @__PURE__ */ s(
      "code",
      {
        ...Ee.attributesToProps(t.attribs),
        style: {
          borderRadius: "4px"
        },
        children: /* @__PURE__ */ s(Xl, { theme: Ir.vsDark, code: e, language: n, children: ({ className: r, style: a, tokens: o, getLineProps: p, getTokenProps: l }) => /* @__PURE__ */ s("pre", { style: a, className: r, children: o.map((m, d) => /* @__PURE__ */ s("div", { ...p({ line: m }), children: m.map((u, h) => /* @__PURE__ */ s("span", { ...l({ token: u }) }, h)) }, d)) }) })
      }
    )
  ] });
}
const Ql = (t) => {
  const e = (t == null ? void 0 : t.size) || 14;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      height: e,
      width: e,
      style: { fill: "currentColor" },
      children: [
        "// --!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.",
        /* @__PURE__ */ s("path", { d: "M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" })
      ]
    }
  ) });
}, tm = (t) => {
  const e = (t == null ? void 0 : t.size) || 14;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      height: e,
      width: e,
      style: { fill: "currentColor" },
      children: [
        "// --!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--",
        /* @__PURE__ */ s("path", { d: "M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" })
      ]
    }
  ) });
}, em = (t) => {
  const e = (t == null ? void 0 : t.size) || 14;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      height: e,
      width: e,
      style: { fill: "currentColor" },
      children: [
        "// --!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--",
        /* @__PURE__ */ s("path", { d: "M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" })
      ]
    }
  ) });
}, nm = (t) => {
  const e = (t == null ? void 0 : t.size) || 14;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      style: { fill: "currentColor" },
      children: [
        "// --!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--",
        /* @__PURE__ */ s("path", { d: "M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z" })
      ]
    }
  ) });
};
ki(void 0);
const im = ki({}), Gt = () => Wr(im), rm = (t) => {
  const e = (t == null ? void 0 : t.size) || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ s(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      children: /* @__PURE__ */ s("path", { d: "M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" })
    }
  ) });
}, om = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      width: e,
      height: e,
      children: [
        "/* --!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc. */",
        /* @__PURE__ */ s("path", { d: "M128 416l0 48c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16l0-48 96 0zm-16 96c12.3 0 23.5-4.6 32-12.2c8.5 7.6 19.7 12.2 32 12.2l64 0c26.5 0 48-21.5 48-48l0-48 0-16 0-16 0-190.2 51.4 198.1 4 15.5 18 69.2c6.6 25.5 32 40.6 56.7 33.8l59.6-16.5c24.7-6.8 39.3-33 32.7-58.5l-13.9-53.7-4-15.5-63.9-246-4-15.5-18-69.2C400 9.9 374.6-5.2 349.9 1.6L290.3 18.1c-3.5 1-6.8 2.3-9.9 4C271.9 8.8 257 0 240 0L176 0c-12.3 0-23.5 4.6-32 12.2C135.5 4.6 124.3 0 112 0L48 0C21.5 0 0 21.5 0 48L0 96l0 16 0 16L0 384l0 16 0 16 0 48c0 26.5 21.5 48 48 48l64 0zM288 64.8l0-1.3c.3-7.2 5.1-13 10.8-14.6l59.6-16.5c6.6-1.8 14.8 2 17.2 11l14.1 54.2-87.3 24.2L288.6 68.6c-.3-1.3-.5-2.6-.6-3.8zm-32-.6c0 0 0 0 0 0L256 96l-96 0 0-48c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16l0 16.2zM176 480c-8.8 0-16-7.2-16-16l0-48 96 0 0 48c0 8.8-7.2 16-16 16l-64 0zM128 128l0 256-96 0 0-256 96 0zm0-80l0 48L32 96l0-48c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16zM256 384l-96 0 0-256 96 0 0 256zM397.7 128.7l59.8 230.5-87.3 24.2L310.4 152.8l87.3-24.2zm67.9 261.5l13.8 53.2c2.4 9.4-3.2 17.7-10.3 19.6l-59.6 16.5c-6.6 1.8-14.8-2-17.2-11l-14.1-54.2 87.3-24.2z" })
      ]
    }
  ) });
}, Mr = (t) => {
  const e = t.size || 16;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ s(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 448 512",
      height: e,
      width: e,
      children: /* @__PURE__ */ s("path", { d: "M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" })
    }
  ) });
}, Pr = (t) => {
  const { data: e, layoutController: n, metaData: i } = t, [r, a] = j(!0);
  Q(() => {
    a(!0), setTimeout(() => {
      a(!1);
    }, 0);
  }, [e.url]);
  const o = km(e.url);
  if (!e || !(e != null && e.url)) return null;
  const p = jr(
    i == null ? void 0 : i.content_type,
    (i == null ? void 0 : i.redirect_urls[0]) || (e == null ? void 0 : e.url),
    24
  );
  return r ? null : /* @__PURE__ */ E("div", { className: "flex-1 d-flex flex-col", children: [
    /* @__PURE__ */ E(
      "div",
      {
        className: "b-lt-1 b-rt-1 b-btm-1 gp-10 w-100 d-flex justify-between align-center bg-white",
        style: { height: "56px" },
        children: [
          /* @__PURE__ */ E("div", { className: "d-flex align-center", style: { maxWidth: "90%" }, children: [
            p ? /* @__PURE__ */ s(p, {}) : i != null && i.logo ? /* @__PURE__ */ s(
              "img",
              {
                src: i == null ? void 0 : i.logo,
                alt: e == null ? void 0 : e.title,
                style: {
                  width: "24px",
                  height: "24px",
                  borderRadius: "100px",
                  objectFit: "contain"
                }
              }
            ) : null,
            /* @__PURE__ */ s(
              "p",
              {
                className: "font_16_500 m-0 flex-1 gml-8",
                style: {
                  maxWidth: "85%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                },
                children: e == null ? void 0 : e.title
              }
            ),
            /* @__PURE__ */ s(
              Y,
              {
                onClick: () => window.open(e == null ? void 0 : e.url, "_ablank"),
                variant: "text-alt",
                className: "gml-4",
                children: /* @__PURE__ */ s(rm, { size: 14 })
              }
            )
          ] }),
          /* @__PURE__ */ s(
            Y,
            {
              onClick: () => n == null ? void 0 : n.toggleSecondaryDrawer(null),
              variant: "text-alt",
              className: "gp-6",
              children: /* @__PURE__ */ s(en, { size: 20 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ s(
      "iframe",
      {
        src: o,
        className: "flex-1",
        style: { height: "100%", width: "100%", border: 0 }
      }
    )
  ] });
}, am = (t) => {
  var R;
  const { data: e, layoutController: n } = t, { getTempStoreValue: i, setTempStoreValue: r, layoutController: a } = Gt(), o = n || a, [p, l] = j(
    (i == null ? void 0 : i(e.url)) || null
  ), { mainString: m } = dm(e == null ? void 0 : e.title), [d, u] = (m || "").split(",");
  Q(() => {
    !e || p || i != null && i(e.url) || gm(e.url).then((v) => {
      v && Object.keys(v).length && ((v == null ? void 0 : v.title) === "- YouTube" && (v.title = e.title), l(v), r == null || r(e.url, v));
    });
  }, []);
  const h = (p == null ? void 0 : p.redirect_urls[(p == null ? void 0 : p.redirect_urls.length) - 1]) || (e == null ? void 0 : e.url), [k] = cm(h || (e == null ? void 0 : e.url)), c = jr(
    p == null ? void 0 : p.content_type,
    (p == null ? void 0 : p.redirect_urls[0]) || (e == null ? void 0 : e.url)
  ), g = k.includes("googleapis") ? "" : k + (e != null && e.refNumber || u ? "⋅" : ""), f = () => window.open(e == null ? void 0 : e.url, "_blank"), b = mt(() => {
    var v;
    (v = o == null ? void 0 : o.toggleSecondaryDrawer) == null || v.call(o, () => /* @__PURE__ */ s(
      Pr,
      {
        data: e,
        layoutController: o,
        metaData: p
      }
    ));
  }, [e, o, p]), _ = ((R = p == null ? void 0 : p.content_type) == null ? void 0 : R.includes("csv")) ? f : b;
  return e ? /* @__PURE__ */ E(
    "button",
    {
      onClick: _.bind(null),
      className: L(
        "pos-relative sources-card gp-0 gm-0 text-left overflow-hidden gmr-8"
      ),
      children: [
        (p == null ? void 0 : p.image) && /* @__PURE__ */ s(
          "div",
          {
            style: {
              position: "absolute",
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              background: `url(${p == null ? void 0 : p.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
              filter: "brightness(0.6)",
              transition: "all 1s ease-in-out"
            },
            className: "bg-filter"
          }
        ),
        /* @__PURE__ */ E(
          "div",
          {
            className: "d-flex flex-col justify-between gp-6",
            style: {
              zIndex: 1,
              height: "100%"
            },
            children: [
              /* @__PURE__ */ s(
                "p",
                {
                  className: L("font_10_600", p != null && p.image ? "text-white" : ""),
                  style: {
                    margin: 0
                  },
                  children: wm((p == null ? void 0 : p.title) || d, 50)
                }
              ),
              /* @__PURE__ */ E(
                "div",
                {
                  className: L(
                    "d-flex align-center font_10_600",
                    p != null && p.image ? "text-white" : "text-muted"
                  ),
                  children: [
                    c || !(p != null && p.logo) ? /* @__PURE__ */ s(c, {}) : /* @__PURE__ */ s(
                      "img",
                      {
                        src: p == null ? void 0 : p.logo,
                        alt: e == null ? void 0 : e.title,
                        style: {
                          width: "14px",
                          height: "14px",
                          borderRadius: "100px",
                          objectFit: "contain"
                        }
                      }
                    ),
                    /* @__PURE__ */ s(
                      "p",
                      {
                        className: L(
                          "font_10_500 gml-4",
                          p != null && p.image ? "text-white" : "text-muted"
                        ),
                        style: { margin: 0 },
                        children: g + (u ? u.trim() : "") + (e != null && e.refNumber ? `${u ? "⋅" : ""}[${e == null ? void 0 : e.refNumber}]` : "")
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  ) : null;
}, pm = (t) => {
  const { references: e = [], layoutController: n } = t, i = [...e], { config: r, layoutController: a } = Gt(), o = n || a, [p, l] = j(
    (r == null ? void 0 : r.expandedSources) || !1
  ), m = (d) => {
    d.preventDefault(), d.stopPropagation(), l((u) => !u);
  };
  return /* @__PURE__ */ E("div", { className: "gmb-8", children: [
    /* @__PURE__ */ E("div", { className: "d-flex align-center gpt-4 gpb-8 gpl-16", children: [
      /* @__PURE__ */ s(
        "span",
        {
          style: { height: "24px", width: "24px" },
          className: "d-flex justify-center align-center gmr-12",
          children: /* @__PURE__ */ s(om, {})
        }
      ),
      /* @__PURE__ */ E("div", { className: "d-flex cr-pointer", onClick: m, children: [
        /* @__PURE__ */ s("h4", { className: "font_14_500 gmr-6", children: "Sources" }),
        /* @__PURE__ */ s(
          Y,
          {
            variant: "filled",
            className: L(
              "bg-light gp-2",
              p ? "chevron-down" : "chevron-up"
            ),
            onClick: m,
            children: /* @__PURE__ */ s(Mr, { size: 12 })
          }
        )
      ] })
    ] }),
    p && /* @__PURE__ */ s(Dr, { data: i, layoutController: o })
  ] });
}, Dr = ({
  data: t,
  isInline: e = !1,
  layoutController: n
}) => !t || !t.length ? null : /* @__PURE__ */ s("div", { className: "text-reveal-container", children: /* @__PURE__ */ s("div", { className: "gooey-scroll-wrapper", children: /* @__PURE__ */ E("div", { className: "gpb-8 gpt-4 sources-listContainer gooey-scroll-container", children: [
  t.map((i, r) => /* @__PURE__ */ s(
    "div",
    {
      className: L(r === 0 && !e && "gml-52"),
      children: /* @__PURE__ */ s(am, { data: i, index: r, layoutController: n })
    },
    (i == null ? void 0 : i.title) + r
  )),
  /* @__PURE__ */ s("div", { className: "gooey-scroll-fade" })
] }) }) }), sm = (t) => {
  const { layoutController: e } = Gt(), n = () => {
    var i;
    (i = e == null ? void 0 : e.toggleSecondaryDrawer) == null || i.call(e, () => /* @__PURE__ */ s(
      Pr,
      {
        data: t == null ? void 0 : t.data,
        layoutController: e
      }
    ));
  };
  return /* @__PURE__ */ s(
    "a",
    {
      onClick: () => n(),
      style: { color: t.configColor },
      className: "gooey-link cr-pointer",
      children: t.children
    }
  );
}, ui = (t) => {
  const e = (t == null ? void 0 : t.size) || 12;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      width: e,
      height: e,
      viewBox: "0 0 74 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ s(
          "mask",
          {
            id: "mask0_1:52",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "1",
            y: "1",
            width: "71",
            height: "98",
            children: /* @__PURE__ */ s(
              "path",
              {
                d: "M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ s("g", { mask: "url(#mask0_1:52)", children: /* @__PURE__ */ s(
          "path",
          {
            d: "M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L56.4365 16.8843L45.398 1.43036Z",
            fill: "#0F9D58"
          }
        ) }),
        /* @__PURE__ */ s(
          "mask",
          {
            id: "mask1_1:52",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "1",
            y: "1",
            width: "71",
            height: "98",
            children: /* @__PURE__ */ s(
              "path",
              {
                d: "M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ s("g", { mask: "url(#mask1_1:52)", children: /* @__PURE__ */ s(
          "path",
          {
            d: "M18.9054 48.8962V80.908H54.2288V48.8962H18.9054ZM34.3594 76.4926H23.3209V70.9733H34.3594V76.4926ZM34.3594 67.6617H23.3209V62.1424H34.3594V67.6617ZM34.3594 58.8309H23.3209V53.3116H34.3594V58.8309ZM49.8134 76.4926H38.7748V70.9733H49.8134V76.4926ZM49.8134 67.6617H38.7748V62.1424H49.8134V67.6617ZM49.8134 58.8309H38.7748V53.3116H49.8134V58.8309Z",
            fill: "#F1F1F1"
          }
        ) }),
        /* @__PURE__ */ s(
          "mask",
          {
            id: "mask2_1:52",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "1",
            y: "1",
            width: "71",
            height: "98",
            children: /* @__PURE__ */ s(
              "path",
              {
                d: "M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ s("g", { mask: "url(#mask2_1:52)", children: /* @__PURE__ */ s(
          "path",
          {
            d: "M47.3352 25.9856L71.8905 50.5354V27.9229L47.3352 25.9856Z",
            fill: "url(#paint0_linear_1:52)"
          }
        ) }),
        /* @__PURE__ */ s(
          "mask",
          {
            id: "mask3_1:52",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "1",
            y: "1",
            width: "71",
            height: "98",
            children: /* @__PURE__ */ s(
              "path",
              {
                d: "M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ s("g", { mask: "url(#mask3_1:52)", children: /* @__PURE__ */ s(
          "path",
          {
            d: "M45.398 1.43036V21.2998C45.398 24.959 48.3618 27.9229 52.0211 27.9229H71.8905L45.398 1.43036Z",
            fill: "#87CEAC"
          }
        ) }),
        /* @__PURE__ */ s(
          "mask",
          {
            id: "mask4_1:52",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "1",
            y: "1",
            width: "71",
            height: "98",
            children: /* @__PURE__ */ s(
              "path",
              {
                d: "M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ s("g", { mask: "url(#mask4_1:52)", children: /* @__PURE__ */ s(
          "path",
          {
            d: "M7.86688 1.43036C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V8.60542C1.24374 4.9627 4.22415 1.98229 7.86688 1.98229H45.398V1.43036H7.86688Z",
            fill: "white",
            fillOpacity: "0.2"
          }
        ) }),
        /* @__PURE__ */ s(
          "mask",
          {
            id: "mask5_1:52",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "1",
            y: "1",
            width: "71",
            height: "98",
            children: /* @__PURE__ */ s(
              "path",
              {
                d: "M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ s("g", { mask: "url(#mask5_1:52)", children: /* @__PURE__ */ s(
          "path",
          {
            d: "M65.2674 98.0177H7.86688C4.22415 98.0177 1.24374 95.0373 1.24374 91.3946V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V91.3946C71.8905 95.0373 68.9101 98.0177 65.2674 98.0177Z",
            fill: "#263238",
            fillOpacity: "0.2"
          }
        ) }),
        /* @__PURE__ */ s(
          "mask",
          {
            id: "mask6_1:52",
            style: { maskType: "alpha" },
            maskUnits: "userSpaceOnUse",
            x: "1",
            y: "1",
            width: "71",
            height: "98",
            children: /* @__PURE__ */ s(
              "path",
              {
                d: "M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z",
                fill: "white"
              }
            )
          }
        ),
        /* @__PURE__ */ s("g", { mask: "url(#mask6_1:52)", children: /* @__PURE__ */ s(
          "path",
          {
            d: "M52.0211 27.9229C48.3618 27.9229 45.398 24.959 45.398 21.2998V21.8517C45.398 25.511 48.3618 28.4748 52.0211 28.4748H71.8905V27.9229H52.0211Z",
            fill: "#263238",
            fillOpacity: "0.1"
          }
        ) }),
        /* @__PURE__ */ s(
          "path",
          {
            d: "M45.398 1.43036H7.86688C4.22415 1.43036 1.24374 4.41077 1.24374 8.0535V91.9465C1.24374 95.5893 4.22415 98.5697 7.86688 98.5697H65.2674C68.9101 98.5697 71.8905 95.5893 71.8905 91.9465V27.9229L45.398 1.43036Z",
            fill: "url(#paint1_radial_1:52)"
          }
        ),
        /* @__PURE__ */ E("defs", { children: [
          /* @__PURE__ */ E(
            "linearGradient",
            {
              id: "paint0_linear_1:52",
              x1: "59.6142",
              y1: "28.0935",
              x2: "59.6142",
              y2: "50.5388",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ s("stop", { "stop-color": "#263238", stopOpacity: "0.2" }),
                /* @__PURE__ */ s("stop", { offset: "1", "stop-color": "#263238", stopOpacity: "0.02" })
              ]
            }
          ),
          /* @__PURE__ */ E(
            "radialGradient",
            {
              id: "paint1_radial_1:52",
              cx: "0",
              cy: "0",
              r: "1",
              gradientUnits: "userSpaceOnUse",
              gradientTransform: "translate(3.48187 3.36121) scale(113.917)",
              children: [
                /* @__PURE__ */ s("stop", { "stop-color": "white", stopOpacity: "0.1" }),
                /* @__PURE__ */ s("stop", { offset: "1", "stop-color": "white", stopOpacity: "0" })
              ]
            }
          )
        ] })
      ]
    }
  ) });
}, oe = (t) => {
  const e = (t == null ? void 0 : t.size) || 12;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      width: e,
      height: e,
      viewBox: "0 0 73 100",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ E("g", { clipPath: "url(#clip0_1:149)", children: [
          /* @__PURE__ */ s(
            "mask",
            {
              id: "mask0_1:149",
              style: { maskType: "alpha" },
              maskUnits: "userSpaceOnUse",
              x: "0",
              y: "0",
              width: "73",
              height: "100",
              children: /* @__PURE__ */ s(
                "path",
                {
                  d: "M45.1923 0H6.77885C3.05048 0 0 3.06818 0 6.81818V93.1818C0 96.9318 3.05048 100 6.77885 100H65.5288C69.2572 100 72.3077 96.9318 72.3077 93.1818V27.2727L45.1923 0Z",
                  fill: "white"
                }
              )
            }
          ),
          /* @__PURE__ */ s("g", { mask: "url(#mask0_1:149)", children: /* @__PURE__ */ s(
            "path",
            {
              d: "M45.1923 0H6.77885C3.05048 0 0 3.06818 0 6.81818V93.1818C0 96.9318 3.05048 100 6.77885 100H65.5288C69.2572 100 72.3077 96.9318 72.3077 93.1818V27.2727L56.4904 15.9091L45.1923 0Z",
              fill: "#4285F4"
            }
          ) }),
          /* @__PURE__ */ s(
            "mask",
            {
              id: "mask1_1:149",
              style: { maskType: "alpha" },
              maskUnits: "userSpaceOnUse",
              x: "0",
              y: "0",
              width: "73",
              height: "100",
              children: /* @__PURE__ */ s(
                "path",
                {
                  d: "M45.1923 0H6.77885C3.05048 0 0 3.06818 0 6.81818V93.1818C0 96.9318 3.05048 100 6.77885 100H65.5288C69.2572 100 72.3077 96.9318 72.3077 93.1818V27.2727L45.1923 0Z",
                  fill: "white"
                }
              )
            }
          ),
          /* @__PURE__ */ s("g", { mask: "url(#mask1_1:149)", children: /* @__PURE__ */ s(
            "path",
            {
              d: "M47.1751 25.2784L72.3077 50.5511V27.2727L47.1751 25.2784Z",
              fill: "url(#paint0_linear_1:149)"
            }
          ) }),
          /* @__PURE__ */ s(
            "mask",
            {
              id: "mask2_1:149",
              style: { maskType: "alpha" },
              maskUnits: "userSpaceOnUse",
              x: "0",
              y: "0",
              width: "73",
              height: "100",
              children: /* @__PURE__ */ s(
                "path",
                {
                  d: "M45.1923 0H6.77885C3.05048 0 0 3.06818 0 6.81818V93.1818C0 96.9318 3.05048 100 6.77885 100H65.5288C69.2572 100 72.3077 96.9318 72.3077 93.1818V27.2727L45.1923 0Z",
                  fill: "white"
                }
              )
            }
          ),
          /* @__PURE__ */ s("g", { mask: "url(#mask2_1:149)", children: /* @__PURE__ */ s(
            "path",
            {
              d: "M18.0769 72.7273H54.2308V68.1818H18.0769V72.7273ZM18.0769 81.8182H45.1923V77.2727H18.0769V81.8182ZM18.0769 50V54.5455H54.2308V50H18.0769ZM18.0769 63.6364H54.2308V59.0909H18.0769V63.6364Z",
              fill: "#F1F1F1"
            }
          ) }),
          /* @__PURE__ */ s(
            "mask",
            {
              id: "mask3_1:149",
              style: { maskType: "alpha" },
              maskUnits: "userSpaceOnUse",
              x: "0",
              y: "0",
              width: "73",
              height: "100",
              children: /* @__PURE__ */ s(
                "path",
                {
                  d: "M45.1923 0H6.77885C3.05048 0 0 3.06818 0 6.81818V93.1818C0 96.9318 3.05048 100 6.77885 100H65.5288C69.2572 100 72.3077 96.9318 72.3077 93.1818V27.2727L45.1923 0Z",
                  fill: "white"
                }
              )
            }
          ),
          /* @__PURE__ */ s("g", { mask: "url(#mask3_1:149)", children: /* @__PURE__ */ s(
            "path",
            {
              d: "M45.1923 0V20.4545C45.1923 24.2216 48.2258 27.2727 51.9712 27.2727H72.3077L45.1923 0Z",
              fill: "#A1C2FA"
            }
          ) }),
          /* @__PURE__ */ s(
            "mask",
            {
              id: "mask4_1:149",
              style: { maskType: "alpha" },
              maskUnits: "userSpaceOnUse",
              x: "0",
              y: "0",
              width: "73",
              height: "100",
              children: /* @__PURE__ */ s(
                "path",
                {
                  d: "M45.1923 0H6.77885C3.05048 0 0 3.06818 0 6.81818V93.1818C0 96.9318 3.05048 100 6.77885 100H65.5288C69.2572 100 72.3077 96.9318 72.3077 93.1818V27.2727L45.1923 0Z",
                  fill: "white"
                }
              )
            }
          ),
          /* @__PURE__ */ s("g", { mask: "url(#mask4_1:149)", children: /* @__PURE__ */ s(
            "path",
            {
              d: "M6.77885 0C3.05048 0 0 3.06818 0 6.81818V7.38636C0 3.63636 3.05048 0.568182 6.77885 0.568182H45.1923V0H6.77885Z",
              fill: "white",
              fillOpacity: "0.2"
            }
          ) }),
          /* @__PURE__ */ s(
            "mask",
            {
              id: "mask5_1:149",
              style: { maskType: "alpha" },
              maskUnits: "userSpaceOnUse",
              x: "0",
              y: "0",
              width: "73",
              height: "100",
              children: /* @__PURE__ */ s(
                "path",
                {
                  d: "M45.1923 0H6.77885C3.05048 0 0 3.06818 0 6.81818V93.1818C0 96.9318 3.05048 100 6.77885 100H65.5288C69.2572 100 72.3077 96.9318 72.3077 93.1818V27.2727L45.1923 0Z",
                  fill: "white"
                }
              )
            }
          ),
          /* @__PURE__ */ s("g", { mask: "url(#mask5_1:149)", children: /* @__PURE__ */ s(
            "path",
            {
              d: "M65.5288 99.4318H6.77885C3.05048 99.4318 0 96.3636 0 92.6136V93.1818C0 96.9318 3.05048 100 6.77885 100H65.5288C69.2572 100 72.3077 96.9318 72.3077 93.1818V92.6136C72.3077 96.3636 69.2572 99.4318 65.5288 99.4318Z",
              fill: "#1A237E",
              fillOpacity: "0.2"
            }
          ) }),
          /* @__PURE__ */ s(
            "mask",
            {
              id: "mask6_1:149",
              style: { maskType: "alpha" },
              maskUnits: "userSpaceOnUse",
              x: "0",
              y: "0",
              width: "73",
              height: "100",
              children: /* @__PURE__ */ s(
                "path",
                {
                  d: "M45.1923 0H6.77885C3.05048 0 0 3.06818 0 6.81818V93.1818C0 96.9318 3.05048 100 6.77885 100H65.5288C69.2572 100 72.3077 96.9318 72.3077 93.1818V27.2727L45.1923 0Z",
                  fill: "white"
                }
              )
            }
          ),
          /* @__PURE__ */ s("g", { mask: "url(#mask6_1:149)", children: /* @__PURE__ */ s(
            "path",
            {
              d: "M51.9712 27.2727C48.2258 27.2727 45.1923 24.2216 45.1923 20.4545V21.0227C45.1923 24.7898 48.2258 27.8409 51.9712 27.8409H72.3077V27.2727H51.9712Z",
              fill: "#1A237E",
              fillOpacity: "0.1"
            }
          ) }),
          /* @__PURE__ */ s(
            "path",
            {
              d: "M45.1923 0H6.77885C3.05048 0 0 3.06818 0 6.81818V93.1818C0 96.9318 3.05048 100 6.77885 100H65.5288C69.2572 100 72.3077 96.9318 72.3077 93.1818V27.2727L45.1923 0Z",
              fill: "url(#paint1_radial_1:149)"
            }
          )
        ] }),
        /* @__PURE__ */ E("defs", { children: [
          /* @__PURE__ */ E(
            "linearGradient",
            {
              id: "paint0_linear_1:149",
              x1: "59.7428",
              y1: "27.4484",
              x2: "59.7428",
              y2: "50.5547",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ s("stop", { stopColor: "#1A237E", stopOpacity: "0.2" }),
                /* @__PURE__ */ s("stop", { offset: "1", stopColor: "#1A237E", stopOpacity: "0.02" })
              ]
            }
          ),
          /* @__PURE__ */ E(
            "radialGradient",
            {
              id: "paint1_radial_1:149",
              cx: "0",
              cy: "0",
              r: "1",
              gradientUnits: "userSpaceOnUse",
              gradientTransform: "translate(2.29074 1.9765) scale(116.595)",
              children: [
                /* @__PURE__ */ s("stop", { stopColor: "white", stopOpacity: "0.1" }),
                /* @__PURE__ */ s("stop", { offset: "1", stopColor: "white", stopOpacity: "0" })
              ]
            }
          ),
          /* @__PURE__ */ s("clipPath", { id: "clip0_1:149", children: /* @__PURE__ */ s("rect", { width: "72.3077", height: "100", fill: "white" }) })
        ] })
      ]
    }
  ) });
}, fi = (t) => {
  const e = (t == null ? void 0 : t.size) || 12;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ E(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 242424 333334",
      "shape-rendering": "geometricPrecision",
      "text-rendering": "geometricPrecision",
      "image-rendering": "optimizeQuality",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      width: e,
      height: e,
      children: [
        /* @__PURE__ */ E("defs", { children: [
          /* @__PURE__ */ E(
            "linearGradient",
            {
              id: "c",
              gradientUnits: "userSpaceOnUse",
              x1: "200291",
              y1: "94137",
              x2: "200291",
              y2: "173145",
              children: [
                /* @__PURE__ */ s("stop", { offset: "0", "stop-color": "#bf360c" }),
                /* @__PURE__ */ s("stop", { offset: "1", "stop-color": "#bf360c" })
              ]
            }
          ),
          /* @__PURE__ */ E("mask", { id: "b", children: [
            /* @__PURE__ */ E(
              "linearGradient",
              {
                id: "a",
                gradientUnits: "userSpaceOnUse",
                x1: "200291",
                y1: "91174.4",
                x2: "200291",
                y2: "176107",
                children: [
                  /* @__PURE__ */ s("stop", { offset: "0", "stop-opacity": ".02", "stop-color": "#fff" }),
                  /* @__PURE__ */ s("stop", { offset: "1", "stop-opacity": ".2", "stop-color": "#fff" })
                ]
              }
            ),
            /* @__PURE__ */ s("path", { fill: "url(#a)", d: "M158007 84111h84568v99059h-84568z" })
          ] })
        ] }),
        /* @__PURE__ */ E("g", { "fill-rule": "nonzero", children: [
          /* @__PURE__ */ s(
            "path",
            {
              d: "M151516 0H22726C10228 0 0 10228 0 22726v287880c0 12494 10228 22728 22726 22728h196971c12494 0 22728-10234 22728-22728V90909l-53037-37880L151516 1z",
              fill: "#f4b300"
            }
          ),
          /* @__PURE__ */ s(
            "path",
            {
              d: "M170452 151515H71970c-6252 0-11363 5113-11363 11363v98483c0 6251 5112 11363 11363 11363h98482c6252 0 11363-5112 11363-11363v-98483c0-6250-5111-11363-11363-11363zm-3792 87118H75756v-53027h90904v53027z",
              fill: "#f0f0f0"
            }
          ),
          /* @__PURE__ */ s(
            "path",
            {
              mask: "url(#b)",
              fill: "url(#c)",
              d: "M158158 84261l84266 84242V90909z"
            }
          ),
          /* @__PURE__ */ s(
            "path",
            {
              d: "M151516 0v68181c0 12557 10167 22728 22726 22728h68182L151515 0z",
              fill: "#f9da80"
            }
          ),
          /* @__PURE__ */ s(
            "path",
            {
              fill: "#fff",
              "fill-opacity": ".102",
              d: "M151516 0v1893l89008 89016h1900z"
            }
          ),
          /* @__PURE__ */ s(
            "path",
            {
              d: "M22726 0C10228 0 0 10228 0 22726v1893C0 12121 10228 1893 22726 1893h128790V0H22726z",
              fill: "#fff",
              "fill-opacity": ".2"
            }
          ),
          /* @__PURE__ */ s(
            "path",
            {
              d: "M219697 331433H22726C10228 331433 0 321209 0 308705v1900c0 12494 10228 22728 22726 22728h196971c12494 0 22728-10234 22728-22728v-1900c0 12504-10233 22728-22728 22728z",
              fill: "#bf360c",
              "fill-opacity": ".2"
            }
          ),
          /* @__PURE__ */ s(
            "path",
            {
              d: "M174243 90909c-12559 0-22726-10171-22726-22728v1893c0 12557 10167 22728 22726 22728h68182v-1893h-68182z",
              fill: "#bf360c",
              "fill-opacity": ".102"
            }
          )
        ] })
      ]
    }
  ) });
}, hi = (t) => {
  const e = (t == null ? void 0 : t.size) || 10;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ s(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      height: e,
      width: e,
      ...t,
      children: /* @__PURE__ */ s("path", { d: "M0 0L224 0l0 160 160 0 0 144-272 0 0 208L0 512 0 0zM384 128l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32 0 16-32 0 0-16 0-48 0-80 0-16 16 0zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0-16 0 0-16 0-128 0-16 16 0zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-128l16 0 48 0 16 0 0 32-16 0-32 0 0 32 32 0 16 0 0 32-16 0-32 0 0 48 0 16-32 0 0-16 0-64 0-64 0-16z" })
    }
  ) });
}, xi = (t) => {
  const e = (t == null ? void 0 : t.size) || 10;
  return /* @__PURE__ */ s(M, { children: /* @__PURE__ */ s(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 28.57  20",
      focusable: "false",
      height: e,
      width: e,
      children: /* @__PURE__ */ s(
        "svg",
        {
          viewBox: "0 0 28.57 20",
          preserveAspectRatio: "xMidYMid meet",
          xmlns: "http://www.w3.org/2000/svg",
          children: /* @__PURE__ */ E("g", { children: [
            /* @__PURE__ */ s(
              "path",
              {
                d: "M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z",
                fill: "#FF0000"
              }
            ),
            /* @__PURE__ */ s(
              "path",
              {
                d: "M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z",
                fill: "white"
              }
            )
          ] })
        }
      )
    }
  ) });
}, lm = ({ children: t, ...e }) => {
  const { config: n } = Gt(), [i, r] = j(
    (n == null ? void 0 : n.expandedSources) || !1
  ), a = () => {
    r(!i);
  };
  return Q(() => {
    n != null && n.expandedSources && r(n == null ? void 0 : n.expandedSources);
  }, [n == null ? void 0 : n.expandedSources]), /* @__PURE__ */ E(
    "span",
    {
      className: L(
        "collapsible-button",
        i && "collapsible-button-expanded"
      ),
      children: [
        /* @__PURE__ */ s(
          Y,
          {
            ...e,
            variant: "",
            id: "expand-collapse-button",
            className: "bg-light gp-4",
            onClick: (o) => {
              e != null && e.onClick && (e == null || e.onClick(o)), a();
            },
            children: /* @__PURE__ */ s(Mr, { size: 12 })
          }
        ),
        i && !(e != null && e.disabled) && /* @__PURE__ */ s(
          "div",
          {
            className: L(
              "collapsed-area",
              i && "collapsed-area-expanded"
            ),
            children: t
          }
        )
      ]
    }
  );
}, mm = "https://metascraper.gooey.ai", bi = /\[\d+(,\s*\d+)*\]/g, jr = (t, e, n = 12) => {
  const i = e.toLowerCase();
  if (i.includes("youtube.com") || i.includes("youtu.be"))
    return () => /* @__PURE__ */ s(xi, { size: n });
  if (i.endsWith(".pdf"))
    return () => /* @__PURE__ */ s(hi, { style: { fill: "#F40F02" }, size: n || 12 });
  if (i.endsWith(".xls") || i.endsWith(".xlsx") || i.includes("docs.google") && i.includes("spreadsheets"))
    return () => /* @__PURE__ */ s(ui, { size: n });
  if (i.endsWith(".docx") || i.includes("docs.google") && i.includes("document"))
    return () => /* @__PURE__ */ s(oe, { size: n });
  if (i.endsWith(".pptx") || i.includes("docs.google") && i.includes("presentation"))
    return () => /* @__PURE__ */ s(fi, { size: n });
  if (i.endsWith(".txt"))
    return () => /* @__PURE__ */ s(oe, { size: n });
  if (i.endsWith(".html"))
    return null;
  switch (t = t == null ? void 0 : t.toLowerCase().split(";")[0], t) {
    case "video":
      return () => /* @__PURE__ */ s(xi, {});
    case "application/pdf":
      return () => /* @__PURE__ */ s(hi, { style: { fill: "#F40F02" }, size: 12 });
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.oasis.opendocument.spreadsheet":
      return () => /* @__PURE__ */ s(ui, {});
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return () => /* @__PURE__ */ s(oe, {});
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return () => /* @__PURE__ */ s(fi, {});
    case "text/plain":
      return () => /* @__PURE__ */ s(oe, {});
    case "text/html":
      return null;
    default:
      return () => /* @__PURE__ */ s(Ki, { size: 12 });
  }
};
function Br(t) {
  const e = t.split("/");
  return e[e.length - 1];
}
function dm(t) {
  const e = Br(t), n = /\.([a-zA-Z0-9]+)(\?.*)?$/, i = e.match(n);
  if (i) {
    const r = "." + i[1];
    return { mainString: e.slice(0, -r.length), extension: r };
  } else
    return { mainString: e, extension: null };
}
function cm(t) {
  try {
    const n = new URL(t).hostname, i = n.split(".");
    if (i.length >= 2) {
      const r = i.slice(-2, -1)[0], a = i.slice(-1)[0];
      return n.includes("google") ? [i.slice(-3, -1).join("."), n] : [r, r + "." + a];
    }
  } catch (e) {
    return console.error("Invalid URL:", e), null;
  }
}
const gm = async (t) => {
  const e = await D.get(
    `${mm}/fetchUrlMeta?url=${t}`
  );
  return (e == null ? void 0 : e.data) || {};
}, um = (t) => {
  const { type: e = "", status: n = "", text: i, detail: r, output_text: a = {} } = t;
  let o = "";
  if (e === We.MESSAGE_PART) {
    if (i)
      return o = i, o = o.replace("🎧 I heard", "🎙️"), o;
    o = r;
  }
  return e === We.FINAL_RESPONSE && n === "completed" && (o = a[0]), console.log(o, ">>out"), o = o.replace("🎧 I heard", "🎙️"), o;
}, Tn = (t) => ({
  htmlparser2: {
    lowerCaseTags: !1,
    lowerCaseAttributeNames: !1
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  replace: function(e) {
    var n, i;
    if (e.attribs && e.children.length && e.children[0].name === "code" && (i = (n = e.children[0].attribs) == null ? void 0 : n.class) != null && i.includes("language-"))
      return /* @__PURE__ */ s(
        Jl,
        {
          domNode: e.children[0],
          options: Tn(t)
        }
      );
  },
  transform(e, n) {
    if (n.type === "text" && t.showSources)
      return bm(e, n, t);
    switch (n.name) {
      case "img":
        return hm(e, n);
      case "a":
        return xm(e, n, t);
      default:
        return e;
    }
  }
}), fm = (t, e) => {
  const i = ((e == null ? void 0 : e.references) || []).filter((r) => r.url === t);
  i.length && i[0];
}, hm = (t, e) => {
  if (!t) return t;
  const n = e.attribs.src;
  return /* @__PURE__ */ s("a", { href: n, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ s("img", { src: n, alt: e.attribs.alt }) });
}, xm = (t, e, n) => {
  if (!t) return t;
  const i = e.attribs.href;
  delete e.attribs.href;
  let r = fm(i, n);
  return r || (r = {
    title: (e == null ? void 0 : e.children[0].data) || Br(i),
    url: i
  }), /* @__PURE__ */ s(sm, { data: r, configColor: (n == null ? void 0 : n.linkColor) || "default", children: Ee.domToReact(e.children, Tn(n)) });
}, bm = (t, e, n) => {
  if (!e) return e;
  let i = e.data || "";
  const r = Array.from(
    new Set(
      (i.match(bi) || []).map(
        (p) => parseInt(p.slice(1, -1), 10)
      )
    )
  );
  if (!r || !r.length) return t;
  const { references: a = [] } = n, o = [...a].splice(
    r[0] - 1,
    r[r.length - 1] - r[0] + 1
  );
  return i = i.replaceAll(bi, ""), i[i.length - 1] === "." && i[i.length - 2] === " " && (i = i.slice(0, -2) + "."), /* @__PURE__ */ E(he.Fragment, { children: [
    i,
    " ",
    !!a.length && /* @__PURE__ */ s(lm, { children: /* @__PURE__ */ s(Dr, { data: o, isInline: !0 }) })
  ] });
}, ym = (t, e, n) => {
  const i = um(t);
  if (console.log(i, ">>body"), !i) return "";
  const r = N.parse(i, {
    async: !1,
    breaks: !0,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  });
  return console.log(r, ">>rawHtml"), Gs(
    r,
    Tn({
      ...t,
      showSources: n,
      linkColor: e
    })
  );
}, Ur = (t, e) => {
  switch (t) {
    case "FEEDBACK_THUMBS_UP":
      return e ? /* @__PURE__ */ s(tm, { size: 12, className: "text-muted" }) : /* @__PURE__ */ s(Ql, { size: 12, className: "text-muted" });
    case "FEEDBACK_THUMBS_DOWN":
      return e ? /* @__PURE__ */ s(em, { size: 12, className: "text-muted" }) : /* @__PURE__ */ s(nm, { size: 12, className: "text-muted" });
    default:
      return null;
  }
};
function wm(t, e) {
  if (t.length <= e)
    return t;
  const n = "...", i = n.length, r = e - i, a = Math.ceil(r / 2), o = Math.floor(r / 2);
  return t.slice(0, a) + n + t.slice(-o);
}
const km = (t) => {
  try {
    const e = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/, n = t.match(e);
    return n && n[1] ? `https://www.youtube.com/embed/${n[1]}` : t;
  } catch (e) {
    return console.error("Error processing URL:", e), t;
  }
};
st(an);
const yi = ({
  button: t,
  onClick: e,
  className: n
}) => {
  const i = Ur(t.id, t.isPressed || !1);
  return i ? /* @__PURE__ */ s("div", { className: L("my-auto", n), children: /* @__PURE__ */ s(vt, { className: "text-muted", onClick: e, children: i }) }) : /* @__PURE__ */ s(
    vt,
    {
      className: L("text-left", n),
      variant: "outlined",
      onClick: e,
      hideOverflow: !1,
      children: t.title
    }
  );
}, _m = ({ data: t, onFeedbackClick: e }) => {
  const { buttons: n } = t;
  if (!n) return null;
  const i = [], r = [];
  return n.forEach((a) => {
    a.id.includes("thumb") || Ur(a.id, a.isPressed || !1) ? i.push(a) : r.push(a);
  }), /* @__PURE__ */ s("div", { children: i.length > 0 && /* @__PURE__ */ E("div", { children: [
    r.length > 0 && /* @__PURE__ */ E("div", { className: "gooey-scroll-wrapper", children: [
      /* @__PURE__ */ s(
        "div",
        {
          className: "d-flex flex-col sm-flex-row gooey-scroll-container gpl-36",
          style: { gap: "12px" },
          children: r.map((a) => /* @__PURE__ */ s(
            yi,
            {
              button: a,
              className: "my-1 mx-md-2 w-100",
              onClick: () => {
                a.isPressed || e(a);
              }
            },
            a.id
          ))
        }
      ),
      /* @__PURE__ */ s("div", { className: "gooey-scroll-fade d-none sm-d-block" })
    ] }),
    /* @__PURE__ */ s("div", { className: "d-flex gmt-2 justify-content-start gml-36", style: { gap: "4px" }, children: i.map((a) => /* @__PURE__ */ s(
      yi,
      {
        button: a,
        onClick: () => {
          a.isPressed || e(a);
        }
      },
      a.id
    )) })
  ] }) });
};
st(an);
const vm = _i(
  ({ data: t, id: e, showSources: n, linkColor: i, autoPlay: r, photoUrl: a, onFeedbackClick: o, layoutController: p }) => {
    const {
      output_audio: l = [],
      output_video: m = [],
      type: d,
      references: u = []
    } = t, h = l[0], k = m[0], c = d !== We.FINAL_RESPONSE, [g, f] = j("");
    return Q(() => {
      f(ym(t, i, n));
    }, [t]), console.log(g, ">>parsedElements"), g ? /* @__PURE__ */ E("div", { className: "gooey-incomingMsg gpb-12 mw-100", children: [
      /* @__PURE__ */ E("div", { className: "gpl-16 mw-100", children: [
        /* @__PURE__ */ s(Ji, { photoUrl: a, children: /* @__PURE__ */ s(
          "div",
          {
            className: L(
              "font_16_400 pos-relative gooey-output-text markdown text-reveal-container mw-100",
              c && "response-streaming"
            ),
            id: e,
            children: g
          }
        ) }),
        !c && !k && h && /* @__PURE__ */ s("div", { className: "gmt-8 gml-36 mw-100", children: /* @__PURE__ */ s(
          "audio",
          {
            autoPlay: r,
            playsInline: !0,
            controls: !0,
            src: h
          }
        ) }),
        !c && k && /* @__PURE__ */ s("div", { className: "gmt-16 gml-36", children: /* @__PURE__ */ s(
          "video",
          {
            autoPlay: r,
            playsInline: !0,
            controls: !0,
            src: k,
            style: { backgroundColor: "#000" }
          }
        ) }),
        !c && t.buttons && /* @__PURE__ */ s(
          _m,
          {
            data: t,
            onFeedbackClick: (b) => {
              o({
                id: b.id,
                title: b.title
              });
            }
          }
        )
      ] }),
      n && !!u.length && /* @__PURE__ */ s(pm, { ...t, layoutController: p })
    ] }) : /* @__PURE__ */ s(Qi, { show: !0 });
  }
), Em = ".gooey-outgoingMsg{max-width:100%;animation:fade-in-A .4s}.gooey-outgoingMsg audio{width:100%;height:40px}.gooey-outgoing-text{white-space:break-spaces!important}.outgoingMsg-image{max-width:200px;min-width:200px;background-color:#eee;animation:fade-in-A .4s;height:100px;object-fit:cover}";
st(Em);
const Sm = _i(
  ({
    input_prompt: t = "",
    input_audio: e = void 0,
    input_images: n = [],
    button_pressed: i = {}
  }) => {
    const r = t || (i == null ? void 0 : i.button_title) || "";
    return /* @__PURE__ */ E("div", { className: "gooey-outgoingMsg gmb-12 gpl-16", children: [
      n.length > 0 && n.map((a) => /* @__PURE__ */ s("a", { href: a, target: "_blank", children: /* @__PURE__ */ s(
        "img",
        {
          src: a,
          alt: a,
          className: L(
            "outgoingMsg-image b-1 br-large",
            r && "gmb-4"
          )
        }
      ) }, a)),
      e && /* @__PURE__ */ s("div", { className: "gmt-16", children: /* @__PURE__ */ s(
        "audio",
        {
          controls: !0,
          src: URL.createObjectURL(e)
        }
      ) }),
      r && /* @__PURE__ */ s("p", { className: "font_20_400 anim-typing gooey-outgoing-text", children: r })
    ] });
  }
), Rm = ({
  queue: t,
  data: e,
  preventAutoplay: n,
  config: i,
  initializeQuery: r = () => {
  },
  layoutController: a
}) => t ? /* @__PURE__ */ s(Bt, { children: t.map((o) => {
  var m, d, u;
  const p = e.get(o);
  return p ? (console.log(p, ">>11"), p.role === "user" ? /* @__PURE__ */ s(
    Sm,
    {
      input_prompt: p.input_prompt,
      input_audio: p.input_audio,
      input_images: p.input_images,
      button_pressed: p.button_pressed
    }
  ) : /* @__PURE__ */ s(
    vm,
    {
      layoutController: a,
      data: p,
      id: o,
      showSources: (i == null ? void 0 : i.showSources) || !1,
      linkColor: ((d = (m = i == null ? void 0 : i.branding) == null ? void 0 : m.colors) == null ? void 0 : d.primary) || "#000",
      autoPlay: n ? !1 : i == null ? void 0 : i.autoPlayResponses,
      photoUrl: (u = i == null ? void 0 : i.branding) == null ? void 0 : u.photoUrl,
      onFeedbackClick: ({ id: h, title: k }) => r({
        button_pressed: {
          button_id: h,
          button_title: k,
          context_msg_id: p.bot_message_id
        }
      })
    }
  )) : null;
}) }) : null, Tm = ({
  messages: t,
  isSending: e = !1,
  scrollContainerRef: n,
  isMessagesLoading: i,
  avoidAutoplay: r = () => null,
  preventAutoplay: a = !0,
  config: o,
  onSend: p,
  layoutController: l
}) => {
  var d;
  if (Q(() => {
    r();
  }, [r]), i)
    return /* @__PURE__ */ s("div", { className: "d-flex h-100 w-100 align-center justify-center", children: /* @__PURE__ */ s(Ri, {}) });
  const m = !(t != null && t.size) && !e;
  return /* @__PURE__ */ E(
    "div",
    {
      ref: n,
      className: L(
        "flex-1 bg-white gpt-16 gpb-16 gpr-16 gpb-16 d-flex flex-col",
        m ? "justify-end" : "justify-start"
      ),
      style: { overflowY: "auto" },
      children: [
        m && /* @__PURE__ */ s(
          ip,
          {
            initializeQuery: p || (() => null),
            config: o
          }
        ),
        /* @__PURE__ */ s(
          Rm,
          {
            queue: Array.from(t.keys()),
            data: t,
            preventAutoplay: a,
            config: o,
            layoutController: l
          }
        ),
        /* @__PURE__ */ s(Qi, { show: e, photoUrl: (d = o == null ? void 0 : o.branding) == null ? void 0 : d.photoUrl })
      ]
    }
  );
}, Am = 300, Cm = 800, wi = 5, zm = ({
  isMobile: t,
  isOpen: e,
  contentRenderer: n
}) => {
  console.log({
    isMobile: t,
    isOpen: e,
    contentRenderer: n
  }, "SecondaryDrawer props");
  const { layoutController: i } = Gt(), r = t ?? (i == null ? void 0 : i.isMobile), a = e ?? (i == null ? void 0 : i.isSecondaryDrawerOpen), o = n ?? (i == null ? void 0 : i.secondaryDrawerContent), p = ht(null), [l, m] = j(!1), [d, u] = j(window.innerWidth * 0.65);
  Q(() => {
    const k = p.current;
    !k || !a || (r ? (k.style.width = "100%", k.style.position = "absolute !important") : (k.style.width = `${d}px`, k.style.position = "relative !important"));
  }, [r, a, d]);
  const h = (k) => {
    r || (m(!0), k.preventDefault());
  };
  return Q(() => {
    const k = (g) => {
      var R;
      if (!l) return;
      const f = (R = p.current) == null ? void 0 : R.parentElement;
      if (!f) return;
      const b = f.getBoundingClientRect(), y = b.right - g.clientX, _ = Math.min(
        Math.max(y, Am),
        Math.max(Cm, b.width * 0.8)
      );
      u(_);
    }, c = () => m(!1);
    return l ? (document.addEventListener("mousemove", k), document.addEventListener("mouseup", c), document.body.style.userSelect = "none", document.body.style.cursor = "ew-resize") : (document.body.style.userSelect = "", document.body.style.cursor = ""), () => {
      document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", c), document.body.style.userSelect = "", document.body.style.cursor = "";
    };
  }, [l]), /* @__PURE__ */ E(
    "div",
    {
      ref: p,
      id: "gooey-right-bar",
      style: {
        zIndex: 10,
        transition: l ? "none" : "width 0.2s ease",
        position: r ? "absolute" : "relative"
      },
      className: L(
        "h-100 top-0 overflow-x-hidden right-0 bg-grey d-flex flex-col"
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "h-100 w-100 flex-1 d-flex flex-col", children: o == null ? void 0 : o() }),
        !r && /* @__PURE__ */ s(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: -5 / 2,
              width: `${wi}px`,
              height: "100%",
              cursor: "ew-resize",
              zIndex: 20
            },
            className: L(l && "bg-light"),
            onMouseDown: h,
            children: /* @__PURE__ */ s(
              "div",
              {
                style: {
                  position: "absolute",
                  left: wi / 2,
                  width: "5px",
                  height: "100%"
                },
                className: "bg-white b-lt-1 b-rt-1 drawer-resize-bar"
              }
            )
          }
        ),
        l && /* @__PURE__ */ s(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 19,
              cursor: "ew-resize"
            }
          }
        )
      ]
    }
  );
};
st(Kr);
st(Jr);
const td = (t) => {
  var C, S;
  const {
    messages: e = [],
    isSending: n = !1,
    scrollContainerRef: i = null,
    config: r,
    onSend: a,
    onCancelSend: o,
    onNewConversation: p
  } = t, [l, m] = j(!0), d = ht(null), u = ht(null);
  console.log((C = d == null ? void 0 : d.current) == null ? void 0 : C.shadowRoot, ">>shadowRoot");
  const {
    isSecondaryDrawerOpen: h,
    secondaryDrawerContent: k,
    toggleSecondaryDrawer: c
  } = Om({
    isMobile: !0,
    shadowRoot: (S = d.current) == null ? void 0 : S.shadowRoot
  }), g = tn(() => {
    let T = /* @__PURE__ */ new Map();
    return e.forEach((O) => {
      T.set(O.id || O.bot_message_id, O);
    }), T;
  }, [JSON.stringify(e.map((T) => T.id || T.bot_message_id))]), f = () => {
    m(!0), setTimeout(() => {
      m(!1);
    }, 3e3);
  }, b = {
    ...r,
    branding: {
      name: "Gooey Bot",
      photoUrl: "https://gooey.ai/favicon.ico",
      ...r == null ? void 0 : r.branding
    }
  }, y = mt(
    a || ((T) => console.log("Send message:", T)),
    [a]
  ), _ = mt(
    o || (() => console.log("Cancel send")),
    [o]
  ), R = mt(
    p || (() => console.log("New conversation")),
    [p]
  ), v = () => {
    var T, O;
    return /* @__PURE__ */ E(
      "div",
      {
        className: "gooey-embed-container d-flex flex-col h-100 flex-1",
        id: "gooeyChat-container",
        children: [
          /* @__PURE__ */ s(
            tp,
            {
              isEmptyMessages: g.size === 0,
              showNewConversationButton: !0,
              name: ((T = b == null ? void 0 : b.branding) == null ? void 0 : T.name) || "",
              photoUrl: ((O = b == null ? void 0 : b.branding) == null ? void 0 : O.photoUrl) || "",
              onNewConversation: R
            }
          ),
          /* @__PURE__ */ s(
            Tm,
            {
              messages: g,
              isSending: n,
              scrollContainerRef: i,
              preventAutoplay: l,
              avoidAutoplay: f,
              config: b,
              layoutController: {
                toggleSecondaryDrawer: c
              }
            }
          ),
          /* @__PURE__ */ s(
            Ua,
            {
              config: b,
              isSending: n,
              isReceiving: n,
              onSend: y,
              onCancelSend: _
            }
          ),
          /* @__PURE__ */ s(
            zm,
            {
              isMobile: !0,
              isOpen: h,
              contentRenderer: k
            }
          )
        ]
      }
    );
  };
  return Q(() => {
    const T = d.current;
    if (!T || T.shadowRoot && u.current) return;
    const O = T.shadowRoot ?? T.attachShadow({
      mode: "open",
      delegatesFocus: !0
    }), B = Nt.createRoot(O);
    return u.current = B, B.render(
      /* @__PURE__ */ E(he.StrictMode, { children: [
        /* @__PURE__ */ s(no, {}),
        /* @__PURE__ */ s(v, {})
      ] })
    ), () => {
      B.unmount(), u.current = null;
    };
  }, [n, g]), /* @__PURE__ */ s("span", { ref: d, style: { display: "contents" } });
}, Om = ({
  isMobile: t = !1,
  shadowRoot: e = null
}) => {
  const [n, i] = j(!1), [r, a] = j(
    () => null
  );
  console.log(e, ">>sideBarElement");
  const o = mt(
    (p) => {
      const l = e == null ? void 0 : e.querySelector(
        "#gooey-right-bar"
      );
      if (console.log(l, ">>sideBarElement"), !l) return;
      const m = !!p;
      i(m), a(() => p || (() => null)), m ? l.style.width = t ? "100%" : "65vw" : l.style.width = "0px";
    },
    [t, e]
  );
  return {
    isSecondaryDrawerOpen: n,
    secondaryDrawerContent: r,
    toggleSecondaryDrawer: o
  };
};
export {
  td as GWChatWidget
};
