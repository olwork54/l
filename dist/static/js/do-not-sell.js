"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var FormWizard = /*#__PURE__*/function () {
    function FormWizard(options) {
      _classCallCheck(this, FormWizard);

      this.form = document.querySelector(options.form);
      this.reg = {
        email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        name: /^([a-zA-Z]{1,}\s{0,}[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/
      };
      this.init();
    }

    _createClass(FormWizard, [{
      key: "openThankYou",
      value: function openThankYou() {
        var doNotSell = document.querySelector('.do-not-sell');
        var thankYou = document.querySelector('.thank-you');
        thankYou.classList.add('show');
        doNotSell.classList.remove('show');
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
      key: "validate",
      value: function validate(stepEl) {
        var _this = this;

        var inputs = stepEl.querySelectorAll('input');
        var error = false;
        inputs.forEach(function (inputEl) {
          if (inputEl.name === 'tel' && _this.validateTel(inputEl)) {
            error = true;
          }

          if (inputEl.name === 'name' && _this.validateName(inputEl)) {
            error = true;
          } else if (inputEl.name === 'email' && _this.validateEmail(inputEl)) {
            error = true;
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
      key: "init",
      value: function init() {
        var _this2 = this;

        this.form.addEventListener('submit', function (e) {
          e.preventDefault();

          if (_this2.validate(_this2.form)) {
            _this2.openThankYou();
          }
        });
      }
    }]);

    return FormWizard;
  }();

  try {
    var formModal = new FormWizard({
      form: '#step-form'
    });
  } catch (err) {}
})();