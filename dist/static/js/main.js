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
  })();

  function hidePreloader() {
    var animTime = 0;
    var preloader = document.getElementById('preloader'); // let logo = document.querySelector('.logo');

    setTimeout(function () {
      // logo.classList.remove('show');
      setTimeout(function () {
        preloader.style.transition = "visibility ease ".concat(animTime, "ms, opacity ease ").concat(animTime, "ms");
        preloader.classList.remove('show');
      }, animTime);
    }, animTime);
  }

  function lazyVideoPoster() {
    var videos = null;

    try {
      videos = document.querySelectorAll('video');
    } catch (error) {
      return;
    }

    if (videos.length) {
      videos.forEach(function (v) {
        v.setAttribute('poster', v.dataset.poster);
      });
    }
  }

  var navHeandler = {
    // bodyElem: document.querySelector('BODY'),
    navElem: document.querySelector('.nav'),
    // menu: document.querySelector('#menu'),
    // mobileMenuOpenBtn: document.querySelector('#mobile-menu-open-btn'),
    // mobileMenuCloseBtn: document.querySelector('#mobile-menu-close-btn'),
    scrolledClass: "scrolled",
    stickMenuToggle: function stickMenuToggle() {
      var _this = this;

      if (scrollY >= 600) this.navElem.classList.add(this.scrolledClass);else this.navElem.classList.remove(this.scrolledClass);
      window.addEventListener('scroll', function (e) {
        if (scrollY >= 600) _this.navElem.classList.add(_this.scrolledClass);else _this.navElem.classList.remove(_this.scrolledClass);
      });
    },
    mobileMenuToggle: function mobileMenuToggle() {
      var _this2 = this;

      if (scrollY) {
        this.mobileMenuOpenBtn.addEventListener('click', function (e) {
          _this2.menu.classList.add('mobile-menu-open');

          _this2.bodyElem.classList.add('overflow');
        });
        this.mobileMenuCloseBtn.addEventListener('click', function (e) {
          _this2.menu.classList.remove('mobile-menu-open');

          _this2.bodyElem.classList.remove('overflow');
        });
      }

      this.navElem.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && _this2.menu.classList.contains('mobile-menu-open')) {
          _this2.menu.classList.remove('mobile-menu-open');

          _this2.bodyElem.classList.remove('overflow');
        }
      });
    },
    init: function init() {
      this.stickMenuToggle(); // this.mobileMenuToggle();
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
  }

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
        var _this3 = this;

        if (this.isСhangeSliderHeight) {
          if (window.getComputedStyle(this.btnNext)['display'] !== 'block') this.slider.style.height = '';else this.slider.style.height = window.getComputedStyle(slide, null).getPropertyValue("height");
          window.addEventListener("optimizedResize", function (e) {
            if (window.getComputedStyle(_this3.btnNext)['display'] !== 'block') _this3.slider.style.height = '';
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
        var _this4 = this;

        this.changeSlide(this.currSlide);
        this.btnNext.addEventListener('click', function (e) {
          return _this4.nextSlide();
        });
        this.btnPrev.addEventListener('click', function (e) {
          return _this4.prevSlide();
        });
        this.slides.forEach(function (slide) {
          slide.addEventListener('click', function (e) {
            if (window.getComputedStyle(_this4.btnNext)['display'] !== 'block') return;
            if (e.currentTarget.classList.contains('next')) _this4.nextSlide();else if (e.currentTarget.classList.contains('prev')) _this4.prevSlide();
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
        var _this5 = this;

        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (this.loop) return;
        this.loop = setInterval(function () {
          if (id === null) id = _this5.currItem;
          if (_this5.currItem >= _this5.items.length - 1) id = 0;else id = +_this5.currItem + 1;

          _this5.setActive(id);
        }, this.time);
        this.setActive(this.currItem);
      }
    }, {
      key: "pauseLoop",
      value: function pauseLoop() {
        var _this6 = this;

        if (this.timeout) clearTimeout(this.timeout);
        clearInterval(this.loop);
        this.loop = null;
        this.timeout = setTimeout(function () {
          _this6.startLoop();
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
        var _this7 = this;

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
            progressBar.style[_this7.progressStyleType] = progress + '%';
            progress = progress + +progressStep;
          }, timeStep);
        }
      }
    }, {
      key: "init",
      value: function init() {
        var _this8 = this;

        for (var i = 0; i < this.items.length; i++) {
          var item = this.items[i];
          item.dataset.id = i;
          item.addEventListener('click', function (e) {
            _this8.pauseLoop();

            _this8.setActive(e.currentTarget.dataset.id, _this8.pauseTime);
          });
        }

        if (this.isVisible(this.acordeonElem)) this.startLoop();else this.stopLoop();
        window.addEventListener("optimizedResize", function (e) {
          _this8.changeAcordeonHeight();
        });
        window.addEventListener('scroll', function (e) {
          if (_this8.isVisible(_this8.acordeonElem)) _this8.startLoop();else _this8.stopLoop();
        });
      }
    }]);

    return Accordeon;
  }();

  var gallerySwiper = new Swiper('.gallery-slider', {
    // loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    scrollbar: {
      el: '.swiper-scrollbar'
    },
    breakpoints: {
      200: {
        slidesPerView: 1,
        spaceBetween: 8
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 16
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 16
      }
    }
  });
  var reviewSwiper = new Swiper('.review-slider', {
    // loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      200: {
        slidesPerView: 1,
        spaceBetween: 8
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 16
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 16
      }
    }
  });

  var FormWizard = /*#__PURE__*/function () {
    function FormWizard(options) {
      _classCallCheck(this, FormWizard);

      this.form = document.querySelector(options.form);
      this.steps = this.form.querySelectorAll(options.steps);
      this.progress = document.querySelector(options.progress);
      this.applyBtnSelector = options.nextBtn;
      this.reg = {
        email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        name: /^([a-zA-Z]{1,}\s{0,}[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/
      };
      this.step = 0;
      this.stepsAmount = this.steps.length;
      this.init();
    }

    _createClass(FormWizard, [{
      key: "closeModalWindow",
      value: function closeModalWindow() {
        var mainContent = document.querySelector('.main-content');
        var zipModal = document.querySelector('.quiz.modal');
        var shureModal = document.querySelector('.are-you-shure');
        var toHome = document.querySelector('.to-home-page');
        var aplayBtns = this.form.querySelectorAll(this.applyBtnSelector);
        var yesNoBtns = this.form.querySelectorAll('.yes-btn, .no-btn');
        var dataInfo = this.form.querySelectorAll('.data-info');
        mainContent.classList.remove('overflow');
        zipModal.classList.remove('show');
        shureModal.classList.remove('show');
        toHome.classList.remove('show');
        this.form.reset();
        this.toStep(0);
        aplayBtns.forEach(function (el) {
          el.classList.remove('hide');

          if (el.dataset.state === 'disable') {
            el.setAttribute('disabled', 'disabled');
          }
        });
        yesNoBtns.forEach(function (el) {
          return el.classList.add('hide');
        });
        dataInfo.forEach(function (el) {
          return el.innerText = '';
        });
      }
    }, {
      key: "toggleConfirmExitWindow",
      value: function toggleConfirmExitWindow() {
        var zipModal = document.querySelector('.quiz.modal');
        var shureModal = document.querySelector('.are-you-shure');
        shureModal.classList.toggle('show');
        zipModal.classList.toggle('show');
      }
    }, {
      key: "openGoToHomeWindow",
      value: function openGoToHomeWindow() {
        var zipModal = document.querySelector('.quiz.modal');
        var toHome = document.querySelector('.to-home-page');
        toHome.classList.add('show');
        zipModal.classList.remove('show');
      }
    }, {
      key: "toStep",
      value: function toStep(n) {
        var _this9 = this;

        this.step = n;
        this.steps.forEach(function (stepEl, i) {
          if (i < _this9.step) {
            stepEl.classList.remove('active', 'next');
            stepEl.classList.add('prev');
          } else if (i === _this9.step) {
            stepEl.classList.remove('prev', 'next');
            stepEl.classList.add('active');
          } else {
            stepEl.classList.remove('prev', 'active');
            stepEl.classList.add('next');
          }
        });
        this.updateHeroMsg(this.steps[this.step]);
        this.progressUpdate();
      }
    }, {
      key: "progressUpdate",
      value: function progressUpdate() {
        this.progress.style.width = 100 / this.stepsAmount * (this.step + 1) + '%';
      }
    }, {
      key: "nextStep",
      value: function nextStep() {
        this.step++;
        this.toStep(this.step);
      }
    }, {
      key: "validate",
      value: function validate(stepEl) {
        var _this10 = this;

        var inputs = stepEl.querySelectorAll('input');
        var error = false;
        inputs.forEach(function (inputEl) {
          if (inputEl.name === 'tel') {
            error = _this10.validateTel(inputEl);
          }

          if (inputEl.name === 'name') {
            error = _this10.validateName(inputEl);
          } else if (inputEl.name === 'email') {
            error = _this10.validateEmail(inputEl);
          }
        });
        return !error;
      }
    }, {
      key: "validateEmail",
      value: function validateEmail(inputEl) {
        var fancyInput = inputEl.closest('.fancy-input');
        var erorEl = fancyInput.querySelector('.error-msg');
        var error = false;
        var errText = '';

        if (!inputEl.value) {
          error = true;
          errText = 'Enter your email please';
        } else if (!this.reg.email.test(inputEl.value)) {
          error = true;
          errText = 'Enter valid email please';
        }

        if (error) fancyInput.classList.add('error');else fancyInput.classList.remove('error');
        erorEl.innerText = errText;
        inputEl.addEventListener('input', function (e) {
          fancyInput.classList.remove('error');
          erorEl.innerText = '';
        });
        return error;
      }
    }, {
      key: "validateName",
      value: function validateName(inputEl) {
        var fancyInput = inputEl.closest('.fancy-input');
        var erorEl = fancyInput.querySelector('.error-msg');
        var error = false;
        var errText = '';

        if (!inputEl.value) {
          error = true;
          errText = 'Enter your full name please';
        } else if (!inputEl.value.trim().includes(' ')) {
          error = true;
          errText = 'Enter valid full name: first name and last name';
        } else if (!this.reg.name.test(inputEl.value)) {
          error = true;
          errText = 'Enter valid full name, only latter and space';
        }

        if (error) fancyInput.classList.add('error');else fancyInput.classList.remove('error');
        erorEl.innerText = errText;
        inputEl.addEventListener('input', function (e) {
          fancyInput.classList.remove('error');
          erorEl.innerText = '';
        });
        return error;
      }
    }, {
      key: "validateTel",
      value: function validateTel(inputEl) {
        var fancyInput = inputEl.closest('.fancy-input');
        var erorEl = fancyInput.querySelector('.error-msg');
        var error = false;
        var errText = '';

        if (!inputEl.value) {
          error = true;
          errText = 'Enter your phone number please';
        } else if (inputEl.value.length < 14) {
          error = true;
          errText = 'Enter valid phone number please';
        }

        if (error) fancyInput.classList.add('error');else fancyInput.classList.remove('error');
        erorEl.innerText = errText;
        inputEl.addEventListener('input', function (e) {
          fancyInput.classList.remove('error');
          erorEl.innerText = '';
        });
        return error;
      }
    }, {
      key: "updateConfirmPhone",
      value: function updateConfirmPhone(tel) {
        if (this.form.querySelector('.phone-confirm')) {
          var phoneConfirmEl = this.form.querySelector('.phone-confirm');
          phoneConfirmEl.innerText = tel;
        }
      }
    }, {
      key: "updateHeroMsg",
      value: function updateHeroMsg(elem) {
        var heroMsgElems = document.querySelector('#hero-msg');

        if (elem.dataset.info) {
          heroMsgElems.innerText = elem.dataset.info;
        } else {
          heroMsgElems.innerText = '';
        }
      }
    }, {
      key: "init",
      value: function init() {
        var _this11 = this;

        var changePhoneEl = this.form.querySelector('.change-phone');
        var closeBtn = document.querySelector('.close-modal-btn');
        var exitQuiz = document.querySelector('.are-you-shure .exit');
        var goHome = document.querySelector('.to-home-page .exit');
        var continueQuiz = document.querySelector('.are-you-shure .continue');
        this.progressUpdate();
        this.steps[this.step].classList.remove('prev', 'next');
        this.steps[this.step].classList.add('active');
        this.updateHeroMsg(this.steps[this.step]);
        this.steps.forEach(function (stepEl) {
          var applyBtn = stepEl.querySelector(_this11.applyBtnSelector);
          var yesBtn = stepEl.querySelector('.yes-btn');
          var noBtn = stepEl.querySelector('.no-btn');
          var inputs = stepEl.querySelectorAll('input');
          var dataInfo = stepEl.querySelector('.data-info');
          inputs.forEach(function (inputEl) {
            if (inputEl.type === 'radio') {
              inputEl.addEventListener('change', function (e) {
                if (inputEl.checked) applyBtn.removeAttribute('disabled');else applyBtn.setAttribute('disabled');

                if (inputEl.dataset.info) {
                  dataInfo.innerText = inputEl.dataset.info;
                  yesBtn.classList.remove('hide');
                  noBtn.classList.remove('hide');
                  applyBtn.classList.add('hide');
                } else {
                  dataInfo.innerText = '';
                  yesBtn.classList.add('hide');
                  noBtn.classList.add('hide');
                  applyBtn.classList.remove('hide');
                }
              });
            } else if (inputEl.name === 'tel') {
              inputEl.addEventListener('input', function (e) {
                var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                e.target.value = '(' + x[1] + ') ' + x[2] + '-' + x[3];

                _this11.updateConfirmPhone(e.target.value);
              });
            }
          });
          noBtn.addEventListener('click', function (e) {
            e.preventDefault();

            _this11.openGoToHomeWindow();
          });
          yesBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (_this11.validate(stepEl)) {
              _this11.nextStep();
            }
          });
          applyBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (_this11.validate(stepEl)) {
              _this11.nextStep();
            }
          });
        });
        changePhoneEl.addEventListener('click', function (e) {
          e.preventDefault();

          _this11.toStep(_this11.step - 1);
        });
        closeBtn.addEventListener('click', function (e) {
          _this11.toggleConfirmExitWindow();
        });
        exitQuiz.addEventListener('click', function (e) {
          e.preventDefault();

          _this11.closeModalWindow();
        });
        goHome.addEventListener('click', function (e) {
          e.preventDefault();

          _this11.closeModalWindow();
        });
        continueQuiz.addEventListener('click', function (e) {
          e.preventDefault();

          _this11.toggleConfirmExitWindow();
        });
        this.form.addEventListener('submit', function (e) {
          e.preventDefault();
          window.location.href = './success.html';
        });
      }
    }]);

    return FormWizard;
  }();

  var formModal = new FormWizard({
    form: '#step-form',
    steps: '.step',
    progress: '#form-progress',
    nextBtn: '.aplay-btn'
  });

  function zipCodeHeandler() {
    var zipInputs = document.querySelectorAll('input.zip-modal-open');

    function openModal(zipCode) {
      var mainContent = document.querySelector('.main-content');
      var zipModal = document.querySelector('.quiz.modal');
      var zipInput = document.querySelector('input.zip-input');
      zipInput.value = zipCode;
      mainContent.classList.add('overflow');
      zipModal.classList.add('show');
    }

    zipInputs.forEach(function (input) {
      var form = input.closest('form.enter-zip-code-wrap');
      var errorMsg = form.querySelector('.error-msg');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (input.value.length === 5) openModal(input.value), form.reset();else errorMsg.innerText = 'Enter valid zip-code: 6 numbers';
      });
      input.addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})/);
        e.target.value = x[1];

        if (e.target.value.length === 5) {
          errorMsg.innerText = '';
        }
      });
    });
  }

  zipCodeHeandler();
  window.addEventListener('load', function (e) {
    hidePreloader();
    lazyVideoPoster();
  });
  smoothScroll();
  navHeandler.init(); // modalFormHeandler.init();
  // modalPolicyHeandler.init();
  // langChanger.init();
  // class FormHeandler {
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
  // const langChanger = {
  //   controlls: document.querySelectorAll('.lang-changer .lang'),
  //   currentLang: localStorage.getItem('userLang') ? localStorage.getItem('userLang') : false,
  //   changeLang(elem) {
  //     let serchParam = (new URL(document.location)).searchParams;
  //     if (serchParam) serchParam = `?${serchParam}`; 
  //     if (elem.dataset.lang === this.currentLang) return;
  //     this.currentLang = elem.dataset.lang;
  //     localStorage.setItem('userLang', this.currentLang);
  //     this.controlls.forEach(langElem => {
  //       if (langElem.dataset.lang === this.currentLang) langElem.classList.add('active');
  //       else langElem.classList.remove('active');
  //     });
  //     if (this.currentLang === 'ru-RU') {
  //       window.location.assign(`ru.html${serchParam}`);
  //     } else if (this.currentLang === 'en-US') {
  //       window.location.assign(`index.html${serchParam}`);
  //     } else {
  //       window.location.assign(`index.html${serchParam}`);
  //     }
  //   },
  //   init() {
  //     if (this.currentLang !== 'ru-RU') this.currentLang = 'en-US';
  //     this.controlls.forEach(langElem => {
  //       if (langElem.dataset.lang === this.currentLang) langElem.classList.add('active');
  //       else langElem.classList.remove('active');
  //       langElem.addEventListener('click', (e) => {
  //         e.preventDefault();
  //         this.changeLang(e.target);
  //       })
  //     });
  //   }
  // };
  // const modalFormHeandler = {
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
  // const modalPolicyHeandler = {
  //   bodyElem: document.querySelector('BODY'),
  //   policyModal: document.querySelector('#privacy-policy'),
  //   openBtn: document.querySelector('#policy-open'),
  //   closeBtn: document.querySelector('#policy-close-btn'),
  //   hideModalWindow() {
  //     this.bodyElem.classList.remove('overflow');
  //     this.policyModal.classList.remove('show');
  //   },
  //   showModalWindow() {
  //     this.bodyElem.classList.add('overflow');
  //     this.policyModal.classList.add('show');
  //   },
  //   init() {
  //     this.openBtn.addEventListener('click', e => {
  //       this.showModalWindow();
  //     })
  //     this.closeBtn.addEventListener('click', e => {
  //       this.hideModalWindow();
  //     });
  //   }
  // }
  // const functionSlider = new Slider({
  //   slider: '#main-function .cards',
  //   slides: '#main-function .card',
  //   btnNext: '#main-function .controls .next',
  //   btnPrev: '#main-function .controls .prev',
  //   indicator: '#main-function .controls .indicator',
  //   changeSliderHeight: true
  // });
  // const priceSlider = new Slider({
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
  // const appointmentAccordeon = new Accordeon({
  //   acordeonSelector: "#appointment .appointment-list",
  //   itemsSelector: '#appointment .appointment-list .list-item',
  //   isProgressEnable: false,
  //   loopEnable: 'true',
  //   time: '4000',
  //   pauseTime: '8000'
  // })
  // const interfaceAccordeon = new Accordeon({
  //   acordeonSelector: "#differences .differences-slider",
  //   itemsSelector: '#differences .differences-slider .list-item',
  //   isProgressEnable: true,
  //   isProgressCommon: true,
  //   progressSelector: '#differences .progress',
  //   progressStyleType: 'width',
  //   loopEnable: 'true',
  //   time: '10000',
  //   pauseTime: '20000',
  //   isNeedChangeImg: true,
  //   imgSelector: '#differences .screen-view img'
  // })
  // const solutionAccordeon = new Accordeon({
  //   acordeonSelector: "#solutions .solutions-list",
  //   itemsSelector: '#solutions .solutions-list .list-item',
  //   isProgressEnable: true,
  //   isProgressCommon: false,
  //   progressSelector: '.progress',
  //   progressStyleType: 'height',
  //   loopEnable: 'true',
  //   time: '10000',
  //   pauseTime: '20000',
  //   isNeedChangeHeight: true
  // })
  // const formHeandler = new FormHeandler({
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
})();