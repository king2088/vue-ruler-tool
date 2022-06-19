!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var n in i)("object"==typeof exports?exports:e)[n]=i[n]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=1)}([function(e,t,i){"use strict";function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var r=i(9);t.a={name:"VRuler",components:{},props:{position:{type:String,default:"relative",validator:function(e){return-1!==["absolute","fixed","relative","static","inherit"].indexOf(e)}},isHotKey:{type:Boolean,default:!0},isScaleRevise:{type:Boolean,default:!1},value:{type:Array,default:function(){return[]}},contentLayout:{type:Object,default:function(){return{top:0,left:0}}},parent:{type:Boolean,default:!1},visible:{type:Boolean,default:!0},stepLength:{type:Number,default:50,validator:function(e){return e%10==0}},zoomScale:{type:Number,default:1}},data:function(){return{size:17,left_top:18,windowWidth:0,windowHeight:0,xScale:[],yScale:[],topSpacing:0,leftSpacing:0,isDrag:!1,dragFlag:"",horizontalDottedLeft:-999,verticalDottedTop:-999,rulerWidth:0,rulerHeight:0,dragLineId:"",keyCode:{r:82},rulerToggle:!0}},computed:{wrapperStyle:function(){return{width:this.windowWidth+"px",height:this.windowHeight+"px",position:this.position}},contentStyle:function(){return{left:this.contentLayout.left+"px",top:this.contentLayout.top+"px",padding:this.left_top+"px 0px 0px "+this.left_top+"px"}},lineList:function(){var e=this,t=0,i=0;return this.value.map(function(r){var o="h"===r.type;return n({id:r.type+"_"+(o?t++:i++),type:r.type,title:r.site.toFixed(2)+"px"},o?"top":"left",r.site/(e.stepLength/50)+e.size)})}},watch:{visible:{handler:function(e){this.rulerToggle=e},immediate:!0}},mounted:function(){Object(r.b)(document,"mousemove",this.dottedLineMove),Object(r.b)(document,"mouseup",this.dottedLineUp),Object(r.b)(document,"keyup",this.keyboard),this.init(),Object(r.b)(window,"resize",this.windowResize)},beforeDestroy:function(){Object(r.a)(document,"mousemove",this.dottedLineMove),Object(r.a)(document,"mouseup",this.dottedLineUp),Object(r.a)(document,"keyup",this.keyboard),Object(r.a)(window,"resize",this.windowResize)},methods:{init:function(){this.box(),this.scaleCalc()},windowResize:function(){this.xScale=[],this.yScale=[],this.init()},getLineStyle:function(e){var t=e.type,i=e.top,n=e.left;return"h"===t?{top:i+"px"}:{left:n+"px"}},handleDragLine:function(e){var t=e.type,i=e.id;return"h"===t?this.dragHorizontalLine(i):this.dragVerticalLine(i)},box:function(){if(this.isScaleRevise){var e=this.$refs.content,t=e.offsetLeft,i=e.offsetTop;this.getCalcRevise(this.xScale,t),this.getCalcRevise(this.yScale,i)}if(this.parent){var n=window.getComputedStyle(this.$el.parentNode,null);this.windowWidth=parseInt(n.getPropertyValue("width"),10),this.windowHeight=parseInt(n.getPropertyValue("height"),10)}else this.windowWidth=document.documentElement.clientWidth-this.leftSpacing,this.windowHeight=document.documentElement.clientHeight-this.topSpacing;this.rulerWidth=this.$refs.verticalRuler.clientWidth,this.rulerHeight=this.$refs.horizontalRuler.clientHeight,this.setSpacing()},setSpacing:function(){this.topSpacing=this.$refs.horizontalRuler.getBoundingClientRect().y,this.leftSpacing=this.$refs.verticalRuler.getBoundingClientRect().x},scaleCalc:function(){this.getCalc(this.xScale,this.windowWidth),this.getCalc(this.yScale,this.windowHeight)},getCalc:function(e,t){for(var i=0;i<t*this.stepLength/50;i+=this.stepLength)i%this.stepLength==0&&e.push({id:Math.floor(i*this.zoomScale)})},getCalcRevise:function(e,t){for(var i=0;i<t;i+=1)i%this.stepLength==0&&i+this.stepLength<=t&&e.push({id:Math.floor(i*this.zoomScale)})},newLine:function(e){this.isDrag=!0,this.dragFlag=e},dottedLineMove:function(e){switch(this.setSpacing(),this.dragFlag){case"x":this.isDrag&&(this.verticalDottedTop=e.pageY-this.topSpacing);break;case"y":this.isDrag&&(this.horizontalDottedLeft=e.pageX-this.leftSpacing);break;case"h":this.isDrag&&(this.verticalDottedTop=e.pageY-this.topSpacing);break;case"v":this.isDrag&&(this.horizontalDottedLeft=e.pageX-this.leftSpacing)}},dottedLineUp:function(e){if(this.setSpacing(),this.isDrag){this.isDrag=!1;var t=JSON.parse(JSON.stringify(this.value));switch(this.dragFlag){case"x":e.pageY-this.topSpacing>this.size&&(t.push({type:"h",site:(e.pageY-this.topSpacing-this.size)*(this.stepLength/50)}),this.$emit("input",t));break;case"y":e.pageX-this.leftSpacing>this.size&&(t.push({type:"v",site:(e.pageX-this.leftSpacing-this.size)*(this.stepLength/50)}),this.$emit("input",t));break;case"h":this.dragCalc(t,e.pageY,this.topSpacing,this.rulerHeight,"h"),this.$emit("input",t);break;case"v":this.dragCalc(t,e.pageX,this.leftSpacing,this.rulerWidth,"v"),this.$emit("input",t)}this.verticalDottedTop=this.horizontalDottedLeft=-10}},dragCalc:function(e,t,i,n,r){var o=this;if(t-i<n){var s=void 0,a=void 0;this.lineList.forEach(function(e,t){e.id===o.dragLineId&&(s=t,a=e.id)}),e.splice(s,1,{type:r,site:-600})}else{var u=void 0,l=void 0;this.lineList.forEach(function(e,t){e.id===o.dragLineId&&(u=t,l=e.id)}),e.splice(u,1,{type:r,site:(t-i-this.size)*(this.stepLength/50)})}},horizontalDragRuler:function(){this.newLine("x")},verticalDragRuler:function(){this.newLine("y")},dragHorizontalLine:function(e){this.isDrag=!0,this.dragFlag="h",this.dragLineId=e},dragVerticalLine:function(e){this.isDrag=!0,this.dragFlag="v",this.dragLineId=e},keyboard:function(e){if(this.isHotKey)switch(e.keyCode){case this.keyCode.r:this.rulerToggle=!this.rulerToggle,this.$emit("update:visible",this.rulerToggle),this.rulerToggle?this.left_top=18:this.left_top=0}}}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(2);i.d(t,"default",function(){return n.a})},function(e,t,i){"use strict";function n(e){i(3)}var r=i(0),o=i(10),s=i(8),a=n,u=s(r.a,o.a,!1,a,null,null);t.a=u.exports},function(e,t,i){var n=i(4);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i(6)("678dc901",n,!0,{})},function(e,t,i){t=e.exports=i(5)(!1),t.push([e.i,".vue-ruler-wrapper{left:0;top:0;z-index:999;overflow:hidden;user-select:none}.vue-ruler-h,.vue-ruler-ref-dot-h,.vue-ruler-ref-dot-v,.vue-ruler-ref-line-h,.vue-ruler-ref-line-v,.vue-ruler-v{position:absolute;left:0;top:0;overflow:hidden;z-index:999}.vue-ruler-h{width:100%;height:18px;left:18px;opacity:.6;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACNJREFUeNpiYCAdMDKRCka1jGoBA2JZZGshiaCXFpIBQIABAAplBkCmQpujAAAAAElFTkSuQmCC) repeat-x}.vue-ruler-v{width:18px;height:100%;top:18px;opacity:.6;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAyCAMAAABmvHtTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACBJREFUeNpiYGBEBwwMTGiAakI0NX7U9aOuHyGuBwgwAH6bBkAR6jkzAAAAAElFTkSuQmCC) repeat-y}.vue-ruler-h .n,.vue-ruler-v .n{position:absolute;font:10px/1 Arial,sans-serif;color:#333;cursor:default}.vue-ruler-v .n{width:8px;left:3px;word-wrap:break-word}.vue-ruler-h .n{top:1px}.vue-ruler-ref-dot-h,.vue-ruler-ref-dot-v,.vue-ruler-ref-line-h,.vue-ruler-ref-line-v{z-index:998}.vue-ruler-ref-line-h{width:100%;height:3px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFSv//AAAAH8VRuAAAAA5JREFUeNpiYIACgAADAAAJAAE0lmO3AAAAAElFTkSuQmCC) repeat-x 0;cursor:n-resize}.vue-ruler-ref-line-v{width:3px;height:100%;_height:9999px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAICAMAAAAPxGVzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFSv//AAAAH8VRuAAAAA5JREFUeNpiYEAFAAEGAAAQAAGePof9AAAAAElFTkSuQmCC) repeat-y top;cursor:w-resize}.vue-ruler-ref-dot-h{width:100%;height:3px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFf39/////F3PnHQAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==) repeat-x left 1px;cursor:n-resize;top:-10px}.vue-ruler-ref-dot-v{width:3px;height:100%;_height:9999px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFf39/////F3PnHQAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==) repeat-y 1px top;cursor:w-resize;left:-10px}.vue-ruler-content{position:absolute;z-index:997}.vue-ruler-content-mask{position:absolute;width:100%;height:100%;background:transparent;z-index:998}",""])},function(e,t){function i(e,t){var i=e[1]||"",r=e[3];if(!r)return i;if(t&&"function"==typeof btoa){var o=n(r);return[i].concat(r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"})).concat([o]).join("\n")}return[i].join("\n")}function n(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=i(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,i){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(n[o]=!0)}for(r=0;r<e.length;r++){var s=e[r];"number"==typeof s[0]&&n[s[0]]||(i&&!s[2]?s[2]=i:i&&(s[2]="("+s[2]+") and ("+i+")"),t.push(s))}},t}},function(e,t,i){function n(e){for(var t=0;t<e.length;t++){var i=e[t],n=c[i.id];if(n){n.refs++;for(var r=0;r<n.parts.length;r++)n.parts[r](i.parts[r]);for(;r<i.parts.length;r++)n.parts.push(o(i.parts[r]));n.parts.length>i.parts.length&&(n.parts.length=i.parts.length)}else{for(var s=[],r=0;r<i.parts.length;r++)s.push(o(i.parts[r]));c[i.id]={id:i.id,refs:1,parts:s}}}}function r(){var e=document.createElement("style");return e.type="text/css",d.appendChild(e),e}function o(e){var t,i,n=document.querySelector("style["+v+'~="'+e.id+'"]');if(n){if(f)return A;n.parentNode.removeChild(n)}if(y){var o=h++;n=p||(p=r()),t=s.bind(null,n,o,!1),i=s.bind(null,n,o,!0)}else n=r(),t=a.bind(null,n),i=function(){n.parentNode.removeChild(n)};return t(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;t(e=n)}else i()}}function s(e,t,i,n){var r=i?"":n.css;if(e.styleSheet)e.styleSheet.cssText=m(t,r);else{var o=document.createTextNode(r),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(o,s[t]):e.appendChild(o)}}function a(e,t){var i=t.css,n=t.media,r=t.sourceMap;if(n&&e.setAttribute("media",n),g.ssrId&&e.setAttribute(v,t.id),r&&(i+="\n/*# sourceURL="+r.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l=i(7),c={},d=u&&(document.head||document.getElementsByTagName("head")[0]),p=null,h=0,f=!1,A=function(){},g=null,v="data-vue-ssr-id",y="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,i,r){f=i,g=r||{};var o=l(e,t);return n(o),function(t){for(var i=[],r=0;r<o.length;r++){var s=o[r],a=c[s.id];a.refs--,i.push(a)}t?(o=l(e,t),n(o)):o=[];for(var r=0;r<i.length;r++){var a=i[r];if(0===a.refs){for(var u=0;u<a.parts.length;u++)a.parts[u]();delete c[a.id]}}}};var m=function(){var e=[];return function(t,i){return e[t]=i,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var i=[],n={},r=0;r<t.length;r++){var o=t[r],s=o[0],a=o[1],u=o[2],l=o[3],c={id:e+":"+r,css:a,media:u,sourceMap:l};n[s]?n[s].parts.push(c):i.push(n[s]={id:s,parts:[c]})}return i}},function(e,t){e.exports=function(e,t,i,n,r,o){var s,a=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(s=e,a=e.default);var l="function"==typeof a?a.options:a;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns,l._compiled=!0),i&&(l.functional=!0),r&&(l._scopeId=r);var c;if(o?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},l._ssrRegister=c):n&&(c=n),c){var d=l.functional,p=d?l.render:l.beforeCreate;d?(l._injectStyles=c,l.render=function(e,t){return c.call(t),p(e,t)}):l.beforeCreate=p?[].concat(p,c):[c]}return{esModule:s,exports:a,options:l}}},function(e,t,i){"use strict";i.d(t,"b",function(){return n}),i.d(t,"a",function(){return r});var n=function(){return document.addEventListener?function(e,t,i){e&&t&&i&&e.addEventListener(t,i,!1)}:function(e,t,i){e&&t&&i&&e.attachEvent("on"+t,i)}}(),r=function(){return document.removeEventListener?function(e,t,i){e&&t&&e.removeEventListener(t,i,!1)}:function(e,t,i){e&&t&&e.detachEvent("on"+t,i)}}()},function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vue-ruler-wrapper",style:e.wrapperStyle,attrs:{onselectstart:"return false;"}},[i("section",{directives:[{name:"show",rawName:"v-show",value:e.rulerToggle,expression:"rulerToggle"}]},[i("div",{ref:"horizontalRuler",staticClass:"vue-ruler-h",on:{mousedown:function(t){return t.stopPropagation(),e.horizontalDragRuler.apply(null,arguments)}}},e._l(e.xScale,function(t,n){return i("span",{key:n,staticClass:"n",style:{left:50*n+2+"px"}},[e._v(e._s(t.id))])}),0),e._v(" "),i("div",{ref:"verticalRuler",staticClass:"vue-ruler-v",on:{mousedown:function(t){return t.stopPropagation(),e.verticalDragRuler.apply(null,arguments)}}},e._l(e.yScale,function(t,n){return i("span",{key:n,staticClass:"n",style:{top:50*n+2+"px"}},[e._v(e._s(t.id))])}),0),e._v(" "),i("div",{staticClass:"vue-ruler-ref-dot-h",style:{top:e.verticalDottedTop+"px"}}),e._v(" "),i("div",{staticClass:"vue-ruler-ref-dot-v",style:{left:e.horizontalDottedLeft+"px"}}),e._v(" "),e._l(e.lineList,function(t){return i("div",{key:t.id,class:"vue-ruler-ref-line-"+t.type,style:e.getLineStyle(t),attrs:{title:t.title},on:{mousedown:function(i){return e.handleDragLine(t)}}})})],2),e._v(" "),i("div",{ref:"content",staticClass:"vue-ruler-content",style:e.contentStyle},[e._t("default")],2),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.isDrag,expression:"isDrag"}],staticClass:"vue-ruler-content-mask"})])},r=[],o={render:n,staticRenderFns:r};t.a=o}])});
//# sourceMappingURL=index.js.map