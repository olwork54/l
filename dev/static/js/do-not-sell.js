(function () {
    class FormWizard {
        constructor(options) {
            this.form = document.querySelector(options.form);
            this.reg = {
                email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                name: /^([a-zA-Z]{1,}\s{0,}[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/,
            };
            this.init();
        }

        closeModalWindow() {
            const mainContent = document.querySelector('.main-content');
            const zipModal = document.querySelector('.quiz.modal');
            const shureModal = document.querySelector('.are-you-shure');
            const toHome = document.querySelector('.to-home-page');

            const errMsg = this.form.querySelectorAll('.error-msg');
            const aplayBtns = this.form.querySelectorAll(this.applyBtnSelector);
            const yesNoBtns = this.form.querySelectorAll('.yes-btn, .no-btn');
            const dataInfo = this.form.querySelectorAll('.data-info');
            const fancyInput = this.form.querySelectorAll('.fancy-input');

            mainContent.classList.remove('overflow');
            zipModal.classList.remove('show');
            shureModal.classList.remove('show');
            toHome.classList.remove('show');

            this.form.reset();
            this.toStep(0);

            aplayBtns.forEach(el => {
                el.classList.remove('hide');
                if (el.dataset.state === 'disable') {
                    el.setAttribute('disabled', 'disabled');
                }
            })
            yesNoBtns.forEach(el => el.classList.add('hide'));
            dataInfo.forEach(el => el.innerText = '');
            errMsg.forEach(el => el.innerText = '');
            fancyInput.forEach(el => el.classList.remove('error'))
        }
        toggleConfirmExitWindow() {
            const zipModal = document.querySelector('.quiz.modal');
            const shureModal = document.querySelector('.are-you-shure');

            shureModal.classList.toggle('show');
            zipModal.classList.toggle('show');
        }
        openGoToHomeWindow() {
            const zipModal = document.querySelector('.quiz.modal');
            const toHome = document.querySelector('.to-home-page');

            toHome.classList.add('show');
            zipModal.classList.remove('show');
        }
        validate(stepEl) {
            const inputs = stepEl.querySelectorAll('input');
            let error = false;

            inputs.forEach(inputEl => {
                if (inputEl.name === 'tel' && this.validateTel(inputEl)) {
                    error = true;
                } if (inputEl.name === 'name' && this.validateName(inputEl)) {
                    error = true;
                } else if (inputEl.name === 'email' && this.validateEmail(inputEl)) {
                    error = true;
                }
            });

            return !error;
        }
        validateEmail(inputEl) {
            const fancyInput = inputEl.closest('.fancy-input');
            const erorEl = fancyInput.querySelector('.error-msg');
            let error = false;
            let errText = '';

            if (!inputEl.value) {
                error = true;
                errText = 'Enter your email please';
            } else if (!this.reg.email.test(inputEl.value)) {
                error = true;
                errText = 'Enter valid email please'
            }

            if (error) fancyInput.classList.add('error');
            else fancyInput.classList.remove('error');

            erorEl.innerText = errText;

            inputEl.addEventListener('input', e => {
                fancyInput.classList.remove('error');
                erorEl.innerText = '';
            })

            return error;
        }
        init() {
            this.form.addEventListener('submit', e => {
                e.preventDefault();
                if (this.validate(this.form)) this.form.submit();
            })
        }
    }

try{
    const formModal = new FormWizard({
        form: '#step-form',
    });
} catch (err) {}
    




})();