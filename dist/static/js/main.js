"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  (function () {
    var throttle = function throttle(type, name, obj) {
      obj = obj || window;
      var running = false;

      var func = function func() {
        if (running) {
          return;
        }

        running = true;
        requestAnimationFrame(function () {
          obj.dispatchEvent(new CustomEvent(name));
          running = false;
        });
      };

      obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");
  })(); // class FormHeandler {
  //   constructor(options) {
  //     this.formElem = document.querySelector(options.formSelector);
  //     this.baseURL = options.baseURL;
  //     this.submitRef = options.submitRef;
  //     this.qustionID = options.qustionID;
  //     this.getParams = options.getParams;
  //     this.getParamString = null;
  //     this.init();
  //   }
  //   getParamsHeandle() {
  //     if (!this.getParams) return;
  //     this.getParamString = (new URL(document.location)).searchParams;
  //     for (const key in this.getParams) {
  //       if (Object.hasOwnProperty.call(this.getParams, key) && this.getParamString) {
  //         this.getParamString  = `&${encodeURIComponent(this.getParams[key])}=${encodeURIComponent(this.getParamString)}`;
  //         this.formElem.querySelector('input[name="' + key + '"]').value = this.getParamString;
  //       }
  //     }
  //   }
  //   submitForm(form, url) {
  //     const formInputs = form.querySelectorAll('input, select, button');
  //     this.disableFormInputs(formInputs);
  //     fetch(url, {
  //       method: 'POST',
  //       mode: 'no-cors',
  //       body: new FormData(form)
  //     }).then(response => {
  //       if (response.status === 0) {
  //         form.reset();
  //         this.enableFormInputs(formInputs);
  //         document.location.href = './success.html';
  //       }
  //     })
  //   }
  //   enableFormInputs(formInputs) {
  //     formInputs.forEach(element => {
  //       element.removeAttribute('disabled');
  //     });
  //   }
  //   disableFormInputs(formInputs) {
  //     formInputs.forEach(element => {
  //       element.setAttribute('disabled', true);
  //     });
  //   }
  //   init() {
  //     this.getParamsHeandle();
  //     this.formElem.addEventListener('submit', e => {
  //       e.preventDefault();
  //       let resultUrl = "";
  //       resultUrl += this.baseURL;
  //       this.qustionID.forEach(element => {
  //         for (let key in element) {
  //           if (Object.hasOwnProperty.call(element, key)) {
  //             const input = e.currentTarget.querySelector('*[name="' + key + '"]');
  //             resultUrl += `${encodeURIComponent(element[key])}=${encodeURIComponent(input.value)}&`;
  //             // input.setAttribute('name', element[key]);
  //           }
  //         }
  //       });
  //       resultUrl = resultUrl.substring(0, resultUrl.length - 1);
  //       if (this.getParamString) resultUrl += this.getParamString;
  //       resultUrl += this.submitRef;
  //       this.formElem.setAttribute('action', resultUrl);
  //       this.submitForm(e.currentTarget, resultUrl);
  //       // e.currentTarget.submit();
  //     })
  //   }
  // }


  function hidePreloader() {
    var animTime = 100,
        preloader = document.getElementById('preloader'),
        logo = document.querySelector('.logo');
    setTimeout(function () {
      logo.classList.remove('show');
      setTimeout(function () {
        preloader.style.transition = "visibility ease ".concat(animTime, "ms, opacity ease ").concat(animTime, "ms");
        preloader.classList.remove('show');
      }, animTime);
    }, animTime);
  }

  var langChanger = {
    controlls: document.querySelectorAll('.lang-changer .lang'),
    currentLang: localStorage.getItem('userLang') ? localStorage.getItem('userLang') : false,
    changeLang: function changeLang(elem) {
      var _this = this;

      var serchParam = new URL(document.location).searchParams;
      if (serchParam) serchParam = "?".concat(serchParam);
      if (elem.dataset.lang === this.currentLang) return;
      this.currentLang = elem.dataset.lang;
      localStorage.setItem('userLang', this.currentLang);
      this.controlls.forEach(function (langElem) {
        if (langElem.dataset.lang === _this.currentLang) langElem.classList.add('active');else langElem.classList.remove('active');
      });

      if (this.currentLang === 'ru-RU') {
        window.location.assign("ru.html".concat(serchParam));
      } else if (this.currentLang === 'en-US') {
        window.location.assign("index.html".concat(serchParam));
      } else {
        window.location.assign("index.html".concat(serchParam));
      }
    },
    init: function init() {
      var _this2 = this;

      if (this.currentLang !== 'ru-RU') this.currentLang = 'en-US';
      this.controlls.forEach(function (langElem) {
        if (langElem.dataset.lang === _this2.currentLang) langElem.classList.add('active');else langElem.classList.remove('active');
        langElem.addEventListener('click', function (e) {
          e.preventDefault();

          _this2.changeLang(e.target);
        });
      });
    }
  };

  function smoothScroll() {
    var anchors = document.querySelectorAll('a[href*="#"]');

    var _iterator = _createForOfIteratorHelper(anchors),
        _step;

    try {
      var _loop = function _loop() {
        var anchor = _step.value;
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          var blockID = anchor.getAttribute('href').substr(1);
          document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } // const modalFormHeandler = {
  //   bodyElem: document.querySelector('BODY'),
  //   modalForm: document.querySelector('#modal-form'),
  //   openModalFormBtns: document.querySelectorAll('.open-modal-form-btn'),
  //   closeBtn: document.querySelector('#modal-form-close-btn'),
  //   sendEmailForm: document.querySelector('#send-email-block'),
  //   hideModalWindow() {
  //     this.bodyElem.classList.remove('overflow');
  //     this.modalForm.classList.remove('show');
  //   },
  //   showModalWindow() {
  //     this.bodyElem.classList.add('overflow');
  //     this.modalForm.classList.add('show');
  //   },
  //   init() {
  //     this.openModalFormBtns.forEach(openBtn => {
  //       openBtn.addEventListener('click', e => {
  //         this.showModalWindow();
  //       })
  //     });
  //     this.closeBtn.addEventListener('click', e => {
  //       this.hideModalWindow();
  //     });
  //     this.modalForm.addEventListener('click', e => {
  //       if (e.target.classList.contains('modal')) this.hideModalWindow();
  //     });
  //     this.sendEmailForm.addEventListener('submit', e => {
  //       e.preventDefault();
  //       let emailElem = this.sendEmailForm.querySelector('input.email');
  //       if (emailElem.value) {
  //         let modalFormEmailElem = this.modalForm.querySelector('.email');
  //         modalFormEmailElem.value = emailElem.value;
  //         this.sendEmailForm.reset();
  //         this.showModalWindow();
  //         modalFormEmailElem.focus();
  //       }
  //     })
  //   }
  // }


  var modalPolicyHeandler = {
    bodyElem: document.querySelector('BODY'),
    policyModal: document.querySelector('#privacy-policy'),
    openBtn: document.querySelector('#policy-open'),
    closeBtn: document.querySelector('#policy-close-btn'),
    hideModalWindow: function hideModalWindow() {
      this.bodyElem.classList.remove('overflow');
      this.policyModal.classList.remove('show');
    },
    showModalWindow: function showModalWindow() {
      this.bodyElem.classList.add('overflow');
      this.policyModal.classList.add('show');
    },
    init: function init() {
      var _this3 = this;

      this.openBtn.addEventListener('click', function (e) {
        _this3.showModalWindow();
      });
      this.closeBtn.addEventListener('click', function (e) {
        _this3.hideModalWindow();
      });
    }
  };
  var navHeandler = {
    bodyElem: document.querySelector('BODY'),
    navElem: document.querySelector('.nav'),
    menu: document.querySelector('#menu'),
    mobileMenuOpenBtn: document.querySelector('#mobile-menu-open-btn'),
    mobileMenuCloseBtn: document.querySelector('#mobile-menu-close-btn'),
    scrolledClass: "scrolled",
    stickMenuToggle: function stickMenuToggle() {
      var _this4 = this;

      if (pageYOffset >= 10) this.navElem.classList.add(this.scrolledClass);else this.navElem.classList.remove(this.scrolledClass);
      window.addEventListener('scroll', function (e) {
        if (pageYOffset >= 10) _this4.navElem.classList.add(_this4.scrolledClass);else _this4.navElem.classList.remove(_this4.scrolledClass);
      });
    },
    mobileMenuToggle: function mobileMenuToggle() {
      var _this5 = this;

      this.mobileMenuOpenBtn.addEventListener('click', function (e) {
        _this5.menu.classList.add('mobile-menu-open');

        _this5.bodyElem.classList.add('overflow');
      });
      this.mobileMenuCloseBtn.addEventListener('click', function (e) {
        _this5.menu.classList.remove('mobile-menu-open');

        _this5.bodyElem.classList.remove('overflow');
      });
      this.navElem.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && _this5.menu.classList.contains('mobile-menu-open')) {
          _this5.menu.classList.remove('mobile-menu-open');

          _this5.bodyElem.classList.remove('overflow');
        }
      });
    },
    init: function init() {
      this.stickMenuToggle();
      this.mobileMenuToggle();
    }
  };

  var Slider = /*#__PURE__*/function () {
    function Slider(options) {
      _classCallCheck(this, Slider);

      this.slider = document.querySelector(options.slider);
      this.slides = document.querySelectorAll(options.slides);
      this.btnNext = document.querySelector(options.btnNext);
      this.btnPrev = document.querySelector(options.btnPrev);
      this.indicator = document.querySelector(options.indicator);
      this.currSlide = options.currSlide || 0;
      this.isСhangeSliderHeight = options.changeSliderHeight ? true : false;
      this.init();
    }

    _createClass(Slider, [{
      key: "changeSliderHeaight",
      value: function changeSliderHeaight(slide) {
        var _this6 = this;

        if (this.isСhangeSliderHeight) {
          if (window.getComputedStyle(this.btnNext)['display'] !== 'block') this.slider.style.height = '';else this.slider.style.height = window.getComputedStyle(slide, null).getPropertyValue("height");
          window.addEventListener("optimizedResize", function (e) {
            if (window.getComputedStyle(_this6.btnNext)['display'] !== 'block') _this6.slider.style.height = '';
          });
        }
      }
    }, {
      key: "changeSlide",
      value: function changeSlide(currNum) {
        var prevNum, nextNum;
        if (+currNum === 0) prevNum = this.slides.length - 1;else prevNum = +currNum - 1;
        if (+currNum >= this.slides.length - 1) nextNum = 0;else nextNum = +currNum + 1;
        this.currSlide = +currNum;
        this.slides.forEach(function (slideElem) {
          slideElem.classList.remove('prev', 'curr', 'next');
        });
        this.slides[prevNum].classList.add('prev');
        this.slides[currNum].classList.add('curr');
        this.slides[nextNum].classList.add('next');
        this.changeSliderHeaight(this.slides[currNum]);
        this.indicator.innerText = "".concat(+currNum + 1, " / ").concat(this.slides.length);
      }
    }, {
      key: "prevSlide",
      value: function prevSlide() {
        var slideNum;
        if (this.currSlide === 0) slideNum = this.slides.length - 1;else slideNum = this.currSlide - 1;
        this.changeSlide(slideNum);
      }
    }, {
      key: "nextSlide",
      value: function nextSlide() {
        var slideNum;
        if (this.currSlide >= this.slides.length - 1) slideNum = 0;else slideNum = this.currSlide + 1;
        this.changeSlide(slideNum);
      }
    }, {
      key: "init",
      value: function init() {
        var _this7 = this;

        this.changeSlide(this.currSlide);
        this.btnNext.addEventListener('click', function (e) {
          return _this7.nextSlide();
        });
        this.btnPrev.addEventListener('click', function (e) {
          return _this7.prevSlide();
        });
        this.slides.forEach(function (slide) {
          slide.addEventListener('click', function (e) {
            if (window.getComputedStyle(_this7.btnNext)['display'] !== 'block') return;
            if (e.currentTarget.classList.contains('next')) _this7.nextSlide();else if (e.currentTarget.classList.contains('prev')) _this7.prevSlide();
          });
        });
      }
    }]);

    return Slider;
  }();

  var Accordeon = /*#__PURE__*/function () {
    function Accordeon(options) {
      _classCallCheck(this, Accordeon);

      this.acordeonElem = document.querySelector(options.acordeonSelector);
      this.items = document.querySelectorAll(options.itemsSelector);
      this.isProgressEnable = options.isProgressEnable || false;
      this.isProgressCommon = options.isProgressCommon;
      this.progressSelector = options.progressSelector;
      this.progressStyleType = options.progressStyleType;
      this.isLoopEnable = options.loopEnable;
      this.time = options.time;
      this.pauseTime = options.pauseTime;
      this.isNeedChangeImg = options.isNeedChangeImg || false;
      this.isNeedChangeHeight = options.isNeedChangeHeight || false;
      this.imgSelector = options.imgSelector;
      this.currItem = options.currItem || 0;
      this.loop = null;
      this.timeout = null;
      this.progressInterval = null;
      this.imgs = null;
      this.init();
    }

    _createClass(Accordeon, [{
      key: "changeAcordeonHeight",
      value: function changeAcordeonHeight() {
        if (!this.isNeedChangeHeight) return;
        var height = '';
        this.items.forEach(function (item) {
          var itmemStyle = window.getComputedStyle(item);
          height = +height + parseInt(itmemStyle['height']) + parseInt(itmemStyle['margin-top']);
        });
        this.acordeonElem.style.height = height + 'px';
      }
    }, {
      key: "isVisible",
      value: function isVisible(target) {
        var targetPosition = {
          top: window.pageYOffset + target.getBoundingClientRect().top,
          left: window.pageXOffset + target.getBoundingClientRect().left,
          right: window.pageXOffset + target.getBoundingClientRect().right,
          bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
            windowPosition = {
          top: window.pageYOffset,
          left: window.pageXOffset,
          right: window.pageXOffset + document.documentElement.clientWidth,
          bottom: window.pageYOffset + document.documentElement.clientHeight
        };

        if (targetPosition.bottom > windowPosition.top && targetPosition.top < windowPosition.bottom && targetPosition.right > windowPosition.left && targetPosition.left < windowPosition.right) {
          return true;
        } else {
          return false;
        }

        ;
      }
    }, {
      key: "changeImg",
      value: function changeImg(id) {
        if (this.isNeedChangeImg) {
          if (!this.imgs) this.imgs = document.querySelectorAll(this.imgSelector);
          this.imgs[this.currItem].classList.remove('active');
          this.imgs[id].classList.add('active');
        }
      }
    }, {
      key: "setActive",
      value: function setActive(id) {
        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.time;
        this.items[this.currItem].classList.remove('active');
        this.showProgress(this.items[id], time);
        this.changeImg(id);
        this.items[id].classList.add('active');
        this.changeAcordeonHeight();
        this.currItem = id;
      }
    }, {
      key: "startLoop",
      value: function startLoop() {
        var _this8 = this;

        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (this.loop) return;
        this.loop = setInterval(function () {
          if (id === null) id = _this8.currItem;
          if (_this8.currItem >= _this8.items.length - 1) id = 0;else id = +_this8.currItem + 1;

          _this8.setActive(id);
        }, this.time);
        this.setActive(this.currItem);
      }
    }, {
      key: "pauseLoop",
      value: function pauseLoop() {
        var _this9 = this;

        if (this.timeout) clearTimeout(this.timeout);
        clearInterval(this.loop);
        this.loop = null;
        this.timeout = setTimeout(function () {
          _this9.startLoop();
        }, this.pauseTime);
      }
    }, {
      key: "stopLoop",
      value: function stopLoop() {
        if (this.timeout) clearTimeout(this.timeout);
        clearInterval(this.loop);
        this.loop = null;
        this.clearProgress(this.items[this.currItem]);
      }
    }, {
      key: "clearProgress",
      value: function clearProgress(item) {
        if (this.isProgressEnable) {
          if (this.progressInterval) clearInterval(this.progressInterval);
          var progressBar;

          if (this.isProgressCommon) {
            progressBar = document.querySelector(this.progressSelector);
          } else {
            progressBar = item.querySelector(this.progressSelector);
          }

          progressBar.style[this.progressStyleType] = '0%';
        }
      }
    }, {
      key: "showProgress",
      value: function showProgress(item, time) {
        var _this10 = this;

        if (this.isProgressEnable) {
          if (this.progressInterval) clearInterval(this.progressInterval);
          var progressBar;

          if (this.isProgressCommon) {
            progressBar = document.querySelector(this.progressSelector);
          } else {
            progressBar = item.querySelector(this.progressSelector);
          }

          var timeStep = 40;
          var progressStep = 100 / (time / timeStep);
          var progress = 0;
          this.progressInterval = setInterval(function () {
            if (progress >= 100) progress = 100;
            progressBar.style[_this10.progressStyleType] = progress + '%';
            progress = progress + +progressStep;
          }, timeStep);
        }
      }
    }, {
      key: "init",
      value: function init() {
        var _this11 = this;

        for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          item.dataset.id = i;
          item.addEventListener('click', function (e) {
            _this11.pauseLoop();

            _this11.setActive(e.currentTarget.dataset.id, _this11.pauseTime);
          });
        }

        if (this.isVisible(this.acordeonElem)) this.startLoop();else this.stopLoop();
        window.addEventListener("optimizedResize", function (e) {
          _this11.changeAcordeonHeight();
        });
        window.addEventListener('scroll', function (e) {
          if (_this11.isVisible(_this11.acordeonElem)) _this11.startLoop();else _this11.stopLoop();
        });
      }
    }]);

    return Accordeon;
  }();

  var functionSlider = new Slider({
    slider: '#main-function .cards',
    slides: '#main-function .card',
    btnNext: '#main-function .controls .next',
    btnPrev: '#main-function .controls .prev',
    indicator: '#main-function .controls .indicator',
    changeSliderHeight: true
  }); // const priceSlider = new Slider({
  //   slider: '#pricing .pricing-slider',
  //   slides: '#pricing .price-card',
  //   btnNext: '#pricing .controls .next',
  //   btnPrev: '#pricing .controls .prev',
  //   indicator: '#pricing .controls .indicator',
  //   changeSliderHeight: true,
  //   currSlide: 1
  // });
  // const partnersSlider = new Slider({
  //     slider: '#pricing .logo-list',
  //     slides: '#partners .logo-item',
  //     btnNext: '#partners .controls .next',
  //     btnPrev:  '#partners .controls .prev',
  //     indicator: '#partners .controls .indicator'
  // });

  var appointmentAccordeon = new Accordeon({
    acordeonSelector: "#appointment .appointment-list",
    itemsSelector: '#appointment .appointment-list .list-item',
    isProgressEnable: false,
    loopEnable: 'true',
    time: '4000',
    pauseTime: '8000'
  });
  var solutionAccordeon = new Accordeon({
    acordeonSelector: "#solutions .solutions-list",
    itemsSelector: '#solutions .solutions-list .list-item',
    isProgressEnable: true,
    isProgressCommon: false,
    progressSelector: '.progress',
    progressStyleType: 'height',
    loopEnable: 'true',
    time: '10000',
    pauseTime: '20000',
    isNeedChangeHeight: true
  });
  var interfaceAccordeon = new Accordeon({
    acordeonSelector: "#interface .inteface-slider",
    itemsSelector: '#interface .inteface-slider .list-item',
    isProgressEnable: true,
    isProgressCommon: true,
    progressSelector: '#interface .progress',
    progressStyleType: 'width',
    loopEnable: 'true',
    time: '10000',
    pauseTime: '20000',
    isNeedChangeImg: true,
    imgSelector: '#interface .screen-view img'
  }); // const formHeandler = new FormHeandler({
  //   formSelector: "#input-form",
  //   baseURL: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD72Vb0-qDsDL0VV6FTlGwLCWiDw2gaK9QlflYg_Rj6Is9Fw/formResponse?',
  //   qustionID: [{
  //       'name': 'entry.1954899840'
  //     },
  //     {
  //       'email': 'entry.1211480047'
  //     },
  //     {
  //       'messenger-type': 'entry.1813183483'
  //     },
  //     {
  //       'messenger': 'entry.1632707326'
  //     },
  //     {
  //       'country': 'entry.470860736'
  //     },
  //     {
  //       'problem': 'entry.370045024'
  //     },
  //   ],
  //   getParams: {
  //     'utm': 'entry.463003121'
  //   },
  //   submitRef: '&submit=-3300453198507295392'
  // });

  window.addEventListener('load', hidePreloader);
  smoothScroll();
  navHeandler.init(); // modalFormHeandler.init();

  modalPolicyHeandler.init();
  langChanger.init();
})();