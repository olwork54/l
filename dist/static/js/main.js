"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _createForOfIteratorHelper(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,t=function(){};return{s:t,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){i=!0,s=e},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw s}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}!function(){!function(e,t,r){r=r||window;var n=!1;r.addEventListener(e,function(){n||(n=!0,requestAnimationFrame(function(){r.dispatchEvent(new CustomEvent(t)),n=!1}))})}("resize","optimizedResize");var e={navElem:document.querySelector(".nav"),scrolledClass:"scrolled",stickMenuToggle:function(){var t=this;600<=scrollY?this.navElem.classList.add(this.scrolledClass):this.navElem.classList.remove(this.scrolledClass),window.addEventListener("scroll",function(e){600<=scrollY?t.navElem.classList.add(t.scrolledClass):t.navElem.classList.remove(t.scrolledClass)})},mobileMenuToggle:function(){var t=this;scrollY&&(this.mobileMenuOpenBtn.addEventListener("click",function(e){t.menu.classList.add("mobile-menu-open"),t.bodyElem.classList.add("overflow")}),this.mobileMenuCloseBtn.addEventListener("click",function(e){t.menu.classList.remove("mobile-menu-open"),t.bodyElem.classList.remove("overflow")})),this.navElem.addEventListener("click",function(e){"A"===e.target.tagName&&t.menu.classList.contains("mobile-menu-open")&&(t.menu.classList.remove("mobile-menu-open"),t.bodyElem.classList.remove("overflow"))})},init:function(){this.stickMenuToggle()}};new Swiper(".gallery-slider",{navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},scrollbar:{el:".swiper-scrollbar"},breakpoints:{200:{slidesPerView:1,spaceBetween:8},640:{slidesPerView:2,spaceBetween:16},992:{slidesPerView:3,spaceBetween:16}}}),new Swiper(".review-slider",{navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{200:{slidesPerView:1,spaceBetween:8},640:{slidesPerView:2,spaceBetween:16},992:{slidesPerView:3,spaceBetween:16}}}),new(function(){function t(e){_classCallCheck(this,t),this.form=document.querySelector(e.form),this.steps=this.form.querySelectorAll(e.steps),this.progress=document.querySelector(e.progress),this.applyBtnSelector=e.nextBtn,this.reg={email:/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,name:/^([a-zA-Z]{1,}\s{0,}[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/},this.step=0,this.stepsAmount=this.steps.length,this.init()}return _createClass(t,[{key:"closeModalWindow",value:function(){var e=document.querySelector(".main-content"),t=document.querySelector(".quiz.modal"),r=document.querySelector(".are-you-shure"),n=document.querySelector(".to-home-page"),s=this.form.querySelectorAll(".error-msg"),o=this.form.querySelectorAll(this.applyBtnSelector),i=this.form.querySelectorAll(".yes-btn, .no-btn"),a=this.form.querySelectorAll(".data-info"),l=this.form.querySelectorAll(".fancy-input");e.classList.remove("overflow"),t.classList.remove("show"),r.classList.remove("show"),n.classList.remove("show"),this.form.reset(),this.toStep(0),o.forEach(function(e){e.classList.remove("hide"),"disable"===e.dataset.state&&e.setAttribute("disabled","disabled")}),i.forEach(function(e){return e.classList.add("hide")}),a.forEach(function(e){return e.innerText=""}),s.forEach(function(e){return e.innerText=""}),l.forEach(function(e){return e.classList.remove("error")})}},{key:"toggleConfirmExitWindow",value:function(){var e=document.querySelector(".quiz.modal");document.querySelector(".are-you-shure").classList.toggle("show"),e.classList.toggle("show")}},{key:"openGoToHomeWindow",value:function(){var e=document.querySelector(".quiz.modal");document.querySelector(".to-home-page").classList.add("show"),e.classList.remove("show")}},{key:"toStep",value:function(e){var r=this;this.step=e,this.steps.forEach(function(e,t){t<r.step?(e.classList.remove("active","next"),e.classList.add("prev")):t===r.step?(e.classList.remove("prev","next"),e.classList.add("active")):(e.classList.remove("prev","active"),e.classList.add("next"))}),this.updateHeroMsg(this.steps[this.step]),this.progressUpdate()}},{key:"progressUpdate",value:function(){this.progress.style.width=100/this.stepsAmount*(this.step+1)+"%"}},{key:"nextStep",value:function(){this.step++,this.toStep(this.step)}},{key:"validate",value:function(e){var t=this,e=e.querySelectorAll("input"),r=!1;return e.forEach(function(e){"tel"===e.name&&t.validateTel(e)&&(r=!0),("name"===e.name&&t.validateName(e)||"email"===e.name&&t.validateEmail(e))&&(r=!0)}),!r}},{key:"validateEmail",value:function(e){var t=e.closest(".fancy-input"),r=t.querySelector(".error-msg"),n=!1,s="";return e.value?this.reg.email.test(e.value)||(n=!0,s="Enter valid email please"):(n=!0,s="Enter your email please"),n?t.classList.add("error"):t.classList.remove("error"),r.innerText=s,e.addEventListener("input",function(e){t.classList.remove("error"),r.innerText=""}),n}},{key:"validateName",value:function(e){var t=e.closest(".fancy-input"),r=t.querySelector(".error-msg"),n=!1,s="";return e.value?e.value.trim().includes(" ")?this.reg.name.test(e.value)||(n=!0,s="Enter valid full name, only latter and space"):(n=!0,s="Enter valid full name: first name and last name"):(n=!0,s="Enter your full name please"),n?t.classList.add("error"):t.classList.remove("error"),r.innerText=s,e.addEventListener("input",function(e){t.classList.remove("error"),r.innerText=""}),n}},{key:"validateTel",value:function(e){var t=e.closest(".fancy-input"),r=t.querySelector(".error-msg"),n=!1,s="";return e.value?e.value.length<14&&(n=!0,s="Enter valid phone number please"):(n=!0,s="Enter your phone number please"),n?t.classList.add("error"):t.classList.remove("error"),r.innerText=s,e.addEventListener("input",function(e){t.classList.remove("error"),r.innerText=""}),n}},{key:"updateConfirmPhone",value:function(e){this.form.querySelector(".phone-confirm")&&(this.form.querySelector(".phone-confirm").innerText=e)}},{key:"updateHeroMsg",value:function(e){var t=document.querySelector("#hero-msg");e.dataset.info?t.innerText=e.dataset.info:t.innerText=""}},{key:"init",value:function(){var i=this,e=this.form.querySelector(".change-phone"),t=document.querySelector(".close-modal-btn"),r=document.querySelector(".are-you-shure .exit"),n=document.querySelector(".to-home-page .exit"),s=document.querySelector(".are-you-shure .continue");function a(e){console.log(e.target,e.code),"Enter"!==e.key&&"Tab"!==e.key||e.preventDefault()}this.progressUpdate(),this.steps[this.step].classList.remove("prev","next"),this.steps[this.step].classList.add("active"),this.updateHeroMsg(this.steps[this.step]),this.steps.forEach(function(t){var r=t.querySelector(i.applyBtnSelector),n=t.querySelector(".yes-btn"),s=t.querySelector(".no-btn"),e=t.querySelectorAll("input"),o=t.querySelector(".data-info");e.forEach(function(t){"radio"===t.type?t.addEventListener("change",function(e){t.checked?r.removeAttribute("disabled"):r.setAttribute("disabled"),t.dataset.info?(o.innerText=t.dataset.info,n.classList.remove("hide"),s.classList.remove("hide"),r.classList.add("hide")):(o.innerText="",n.classList.add("hide"),s.classList.add("hide"),r.classList.remove("hide"))}):"tel"===t.name&&t.addEventListener("input",function(e){var t=e.target.value.replace(/\D/g,"").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);e.target.value="("+t[1]+") "+t[2]+"-"+t[3],i.updateConfirmPhone(e.target.value)}),t.addEventListener("keydown",a)});try{s.addEventListener("click",function(e){e.preventDefault(),i.openGoToHomeWindow()}),s.addEventListener("keydown",a)}catch(e){}try{n.addEventListener("click",function(e){e.preventDefault(),i.validate(t)&&i.nextStep()}),n.addEventListener("keydown",a)}catch(e){}try{r.addEventListener("click",function(e){e.preventDefault(),i.validate(t)&&i.nextStep()}),r.addEventListener("keydown",a)}catch(e){}}),e.addEventListener("click",function(e){e.preventDefault(),i.toStep(i.step-1)}),t.addEventListener("click",function(e){i.toggleConfirmExitWindow()}),r.addEventListener("click",function(e){e.preventDefault(),i.closeModalWindow()}),n.addEventListener("click",function(e){e.preventDefault(),i.closeModalWindow()}),s.addEventListener("click",function(e){e.preventDefault(),i.toggleConfirmExitWindow()}),this.form.addEventListener("submit",function(e){e.preventDefault(),window.location.href="./success.html"})}}]),t}())({form:"#step-form",steps:".step",progress:"#form-progress",nextBtn:".aplay-btn"});window.addEventListener("load",function(e){var t;t=document.getElementById("preloader"),setTimeout(function(){setTimeout(function(){t.style.transition="visibility ease ".concat(0,"ms, opacity ease ").concat(0,"ms"),t.classList.remove("show")},0)},0)}),function(){var e,t=_createForOfIteratorHelper(document.querySelectorAll('a[href*="#"]'));try{for(t.s();!(e=t.n()).done;)!function(){var t=e.value;t.addEventListener("click",function(e){e.preventDefault();e=t.getAttribute("href").substr(1);document.getElementById(e).scrollIntoView({behavior:"smooth",block:"start"})})}()}catch(e){t.e(e)}finally{t.f()}}(),e.init(),document.querySelectorAll("input.zip-modal-open").forEach(function(n){var s=n.closest("form.enter-zip-code-wrap"),o=s.querySelector(".error-msg");s.addEventListener("submit",function(e){var t,r;e.preventDefault(),5===n.value.length?(t=n.value,r=document.querySelector(".main-content"),e=document.querySelector(".quiz.modal"),document.querySelector("input.zip-input").value=t,r.classList.add("overflow"),e.classList.add("show"),s.reset()):o.innerText="Enter valid zip-code: 6 numbers"}),n.addEventListener("input",function(e){var t=e.target.value.replace(/\D/g,"").match(/(\d{0,5})/);e.target.value=t[1],5===e.target.value.length&&(o.innerText="")})})}();