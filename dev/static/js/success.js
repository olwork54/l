(function () {
  const modalPolicyHeandler = {
    bodyElem: document.querySelector('BODY'),
    policyModal: document.querySelector('#privacy-policy'),
    openBtn: document.querySelector('#policy-open'),
    closeBtn: document.querySelector('#policy-close-btn'),

    hideModalWindow() {
      this.bodyElem.classList.remove('overflow');
      this.policyModal.classList.remove('show');
    },
    showModalWindow() {
      this.bodyElem.classList.add('overflow');
      this.policyModal.classList.add('show');
    },
    init() {
      this.openBtn.addEventListener('click', e => {
        this.showModalWindow();
      })
      this.closeBtn.addEventListener('click', e => {
        this.hideModalWindow();
      });
    }
  }

  const navHeandler = {
    bodyElem: document.querySelector('BODY'),
    navElem: document.querySelector('.nav'),
    menu: document.querySelector('#menu'),
    mobileMenuOpenBtn: document.querySelector('#mobile-menu-open-btn'),
    mobileMenuCloseBtn: document.querySelector('#mobile-menu-close-btn'),
    scrolledClass: "scrolled",
    stickMenuToggle() {
      window.addEventListener('scroll', e => {
        if (pageYOffset >= 10) this.navElem.classList.add(this.scrolledClass)
        else this.navElem.classList.remove(this.scrolledClass)
      })
    },
    mobileMenuToggle() {
      this.mobileMenuOpenBtn.addEventListener('click', e => {
        this.menu.classList.add('mobile-menu-open');
        this.bodyElem.classList.add('overflow');
      });
      this.mobileMenuCloseBtn.addEventListener('click', e => {
        this.menu.classList.remove('mobile-menu-open');
        this.bodyElem.classList.remove('overflow');
      })
      this.navElem.addEventListener('click', e => {
        if ((e.target.tagName === 'A') &&
          this.menu.classList.contains('mobile-menu-open')) {
          this.menu.classList.remove('mobile-menu-open');
          this.bodyElem.classList.remove('overflow');
        }
      })
    },
    init() {
      this.stickMenuToggle();
      this.mobileMenuToggle();
    }
  }
  navHeandler.init();
  modalPolicyHeandler.init();
})()