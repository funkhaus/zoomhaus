!function(t){function e(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var o={};e.m=t,e.c=o,e.i=function(t){return t},e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=5)}([function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){+function(t){function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var o in e)if(void 0!==t.style[o])return{end:e[o]};return!1}t.fn.emulateTransitionEnd=function(e){var o=!1,n=this;t(this).one("bsTransitionEnd",function(){o=!0});var i=function(){o||t(n).trigger(t.support.transition.end)};return setTimeout(i,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}})})}(jQuery)}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){t("body").removeClass("zoomhaus-open").addClass("zoomhaus-transitioning");var o=t(".zoomhaus-target.active").get(0).getBoundingClientRect(),n=(t(".zoomhaus-target.active"),{left:o.left,top:o.top,width:o.width,"-webkit-transform":"none",transform:"none"});if(e.grow){var i=t(".zoomhaus-target.active"),a=i.parent().innerHeight(),r=i.innerHeight()-a;n["-webkit-clip-path"]="inset("+r/2+"px 0)",n["clip-path"]="inset("+r/2+"px 0)"}var s=!0,u=function e(){var o=t(".zoomhaus-target.active");if(o&&o.length){var n=o.get(0).getBoundingClientRect();t("#zoomhaus-overlay img").eq(0).css({top:n.top})}s&&requestAnimationFrame(e)};requestAnimationFrame(u),t("#zoomhaus-overlay img").css(n).one(t.support.transition.end,function(){t("#zoomhaus-overlay").hide().empty(),t(".zoomhaus-target.active").removeClass("active"),t("body").removeClass("zoomhaus-transitioning"),s=!1}).emulateTransitionEnd(600)}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e,o,n){var i=o(t);i.addClass("active");var a=i.get(0).getBoundingClientRect(),r={transform:"none",position:"absolute",width:a.width,left:a.left,top:a.top,height:"auto"};if(e.grow){var s=i.parent().innerHeight(),u=i.innerHeight()-s;r["-webkit-clip-path"]="inset("+u/2+"px 0)",r["clip-path"]="inset("+u/2+"px 0)"}var d=o(t).clone().css(r).removeClass("active zoomhaus-target");o("#zoomhaus-overlay").show().html(d.addClass("zoomhaus-image"));var h=Math.max(o(void 0).attr("height"),o(void 0).height())/Math.max(o(void 0).attr("width"),o(void 0).width()),c=Math.min(n.width-100,i.attr("width")),l=Math.min(n.height-100,i.attr("height"));c*h>l?c=l/h:l=c*h;a.width,a.width;window.requestAnimationFrame(function(){o("body").addClass("zoomhaus-open zoomhaus-transitioning"),d.one(o.support.transition.end,function(){o("body").removeClass("zoomhaus-transitioning")}).emulateTransitionEnd(600),d.css({"-webkit-clip-path":"inset(0)","clip-path":"inset(0)",top:"50%",left:"50%",width:c,"-webkit-transform":"-webkit-translate(-50%, -50%)",transform:"translate(-50%, -50%)"})})}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e={height:window.innerHeight||document.documentElement.clientHeight,width:window.innerWidth||document.documentElement.clientWidth};return t(window).resize(function(){e.height=window.innerHeight||document.documentElement.clientHeight,e.width=window.innerWidth||document.documentElement.clientWidth}),e}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n="";n+="#zoomhaus-overlay {",n+="pointer-events: none;",n+="-webkit-pointer-events: none;",n+="position: fixed;",n+="display: none;",n+="height: 100%;",n+="width: 100%;",n+="left: 0;",n+="top: 0;",n+="}",n+=".zoomhaus-target {",n+="cursor: pointer;",n+="}",n+="#zoomhaus-overlay img {",n+="-webkit-transform-origin: left top;",n+="transform-origin: left top;",n+="}",e.default=n},function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var i=o(0),a=n(i),r=o(3),s=n(r),u=o(4),d=n(u),h=o(1),c=n(h),l=o(2),m=n(l);(0,a.default)(function(t){t.fn.zoomhaus=function(e,o){var n=t.extend({container:window,grow:!0,arrows:!0,esc:!0},e),i=(0,s.default)(t);return t("body > #zoomhaus-overlay").length||t("body").append('<div id="zoomhaus-overlay"></div>'),t("head").append("<style>"+d.default+"</style>"),t(document).on("click",".zoomhaus-open",function(){(0,c.default)(t,n)}),t(n.container).scroll(function(){t("body").hasClass("zoomhaus-open")&&(0,c.default)(t,n)}),this.each(function(){t(this).is("img")&&(t(this).addClass("zoomhaus-target"),t(this).click(function(e){t("body.zoomhaus-open").length||t("body.zoomhaus-transitioning").length||(0,m.default)(this,n,t,i)}))}),n.esc&&void 0===t("body").data("zoomhaus.esc")&&(t(document).keydown(function(e){27==e.which&&t(".zoomhaus-open").length&&(0,c.default)(t,n)}),t("body").data("zoomhaus.esc",!0)),t(document).off("zoomhaus.goto"),t(document).on("zoomhaus.goto",function(e,o){if(t(".zoomhaus-target.active").length&&!(t(".zoomhaus-target").length<=1)){var n=t(".zoomhaus-target.active"),a=t(".zoomhaus-target").eq(o);t(".zoomhaus-image").attr("src",a.attr("src")),t(".zoomhaus-image").attr("srcset",a.attr("srcset"));var r=Math.min(i.width-100,a.attr("width"));t(".zoomhaus-image").css("width",r),n.removeClass("active"),a.addClass("active"),e.preventDefault()}}),void 0===jQuery("body").data("zoomhaus.arrow-nav")&&(jQuery(document).keydown(function(e){var o=t(".zoomhaus-target.active").index(".zoomhaus-target");switch(e.which){case 37:o-=1,o<0&&(o=t(".zoomhaus-target").length-1);break;case 39:o+=1,o>=t(".zoomhaus-target").length&&(o=0);break;default:return}jQuery(document).trigger("zoomhaus.goto",[o])}),jQuery("body").data("zoomhaus.arrow-nav",!0)),this}}(jQuery))}]);
//# sourceMappingURL=bundle.js.map