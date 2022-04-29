"use strict";

(function () {
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
      var _this = this;

      this.openBtn.addEventListener('click', function (e) {
        _this.showModalWindow();
      });
      this.closeBtn.addEventListener('click', function (e) {
        _this.hideModalWindow();
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
      var _this2 = this;

      window.addEventListener('scroll', function (e) {
        if (pageYOffset >= 10) _this2.navElem.classList.add(_this2.scrolledClass);else _this2.navElem.classList.remove(_this2.scrolledClass);
      });
    },
    mobileMenuToggle: function mobileMenuToggle() {
      var _this3 = this;

      this.mobileMenuOpenBtn.addEventListener('click', function (e) {
        _this3.menu.classList.add('mobile-menu-open');

        _this3.bodyElem.classList.add('overflow');
      });
      this.mobileMenuCloseBtn.addEventListener('click', function (e) {
        _this3.menu.classList.remove('mobile-menu-open');

        _this3.bodyElem.classList.remove('overflow');
      });
      this.navElem.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && _this3.menu.classList.contains('mobile-menu-open')) {
          _this3.menu.classList.remove('mobile-menu-open');

          _this3.bodyElem.classList.remove('overflow');
        }
      });
    },
    init: function init() {
      this.stickMenuToggle();
      this.mobileMenuToggle();
    }
  };
  navHeandler.init();
  modalPolicyHeandler.init();
})();