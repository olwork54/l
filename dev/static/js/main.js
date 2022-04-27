(function () {
  (function () {
    var throttle = function (type, name, obj) {
      obj = obj || window;
      var running = false;
      var func = function () {
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
    let animTime = 100,
      preloader = document.getElementById('preloader'),
      logo = document.querySelector('.logo');
    setTimeout(() => {
      logo.classList.remove('show');
      setTimeout(() => {
        preloader.style.transition = `visibility ease ${animTime}ms, opacity ease ${animTime}ms`;
        preloader.classList.remove('show');
      }, animTime);
    }, animTime)
  }


  function lazyVideoPoster() {
    let videos = null;
    try {
       videos = document.querySelectorAll('video');
    } catch (error) {
      return;
    }
    if (videos.length){
      videos.forEach( v => {
        v.setAttribute('poster', v.dataset.poster);
      })
    }
  }


  const navHeandler = {
    // bodyElem: document.querySelector('BODY'),
    navElem: document.querySelector('.nav'),
    // menu: document.querySelector('#menu'),
    // mobileMenuOpenBtn: document.querySelector('#mobile-menu-open-btn'),
    // mobileMenuCloseBtn: document.querySelector('#mobile-menu-close-btn'),
    scrolledClass: "scrolled",
    stickMenuToggle() {
      if (scrollY >= 600) this.navElem.classList.add(this.scrolledClass)
      else this.navElem.classList.remove(this.scrolledClass)
      window.addEventListener('scroll', e => {
        if (scrollY >= 600) this.navElem.classList.add(this.scrolledClass)
        else this.navElem.classList.remove(this.scrolledClass)
      })
    },
    mobileMenuToggle() {
      if(scrollY){
        this.mobileMenuOpenBtn.addEventListener('click', e => {
          this.menu.classList.add('mobile-menu-open');
          this.bodyElem.classList.add('overflow');
        });
        this.mobileMenuCloseBtn.addEventListener('click', e => {
          this.menu.classList.remove('mobile-menu-open');
          this.bodyElem.classList.remove('overflow');
        })
      }
      
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
      // this.mobileMenuToggle();
    }
  }


  function smoothScroll() {
    const anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const blockID = anchor.getAttribute('href').substr(1)
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }
  }


  class Slider {
    constructor(options) {
      this.slider = document.querySelector(options.slider);
      this.slides = document.querySelectorAll(options.slides);
      this.btnNext = document.querySelector(options.btnNext);
      this.btnPrev = document.querySelector(options.btnPrev);
      this.indicator = document.querySelector(options.indicator);
      this.currSlide = options.currSlide || 0;
      this.isСhangeSliderHeight = options.changeSliderHeight ? true : false;
      this.init();
    }
    changeSliderHeaight(slide) {
      if (this.isСhangeSliderHeight) {
        if (window.getComputedStyle(this.btnNext)['display'] !== 'block') this.slider.style.height = '';
        else this.slider.style.height = window.getComputedStyle(slide, null).getPropertyValue("height");
        window.addEventListener("optimizedResize", e => {
          if (window.getComputedStyle(this.btnNext)['display'] !== 'block') this.slider.style.height = '';
        });
      }
    }
    changeSlide(currNum) {
      let prevNum, nextNum;
      if (+currNum === 0) prevNum = this.slides.length - 1;
      else prevNum = +currNum - 1;
      if (+currNum >= this.slides.length - 1) nextNum = 0;
      else nextNum = +currNum + 1;
      this.currSlide = +currNum;
      this.slides.forEach(slideElem => {
        slideElem.classList.remove('prev', 'curr', 'next');
      });
      this.slides[prevNum].classList.add('prev');
      this.slides[currNum].classList.add('curr');
      this.slides[nextNum].classList.add('next');
      this.changeSliderHeaight(this.slides[currNum]);
      this.indicator.innerText = `${+currNum + 1} / ${this.slides.length}`
    }
    prevSlide() {
      let slideNum;
      if (this.currSlide === 0) slideNum = this.slides.length - 1;
      else slideNum = this.currSlide - 1;
      this.changeSlide(slideNum);
    }
    nextSlide() {
      let slideNum;
      if (this.currSlide >= this.slides.length - 1) slideNum = 0;
      else slideNum = this.currSlide + 1;
      this.changeSlide(slideNum);
    }
    init() {
      this.changeSlide(this.currSlide);
      this.btnNext.addEventListener('click', e => this.nextSlide());
      this.btnPrev.addEventListener('click', e => this.prevSlide());
      this.slides.forEach(slide => {
        slide.addEventListener('click', e => {
          if (window.getComputedStyle(this.btnNext)['display'] !== 'block') return;
          if (e.currentTarget.classList.contains('next')) this.nextSlide();
          else if (e.currentTarget.classList.contains('prev')) this.prevSlide()
        })
      })
    }
  }


  class Accordeon {
    constructor(options) {
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
    changeAcordeonHeight() {
      if (!this.isNeedChangeHeight) return;
      let height = '';
      this.items.forEach(item => {
        const itmemStyle = window.getComputedStyle(item);
        height = +height + parseInt(itmemStyle['height']) + parseInt(itmemStyle['margin-top']);
      })
      this.acordeonElem.style.height = height + 'px';
    }
    isVisible(target) {
      let targetPosition = {
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
      if (targetPosition.bottom > windowPosition.top &&
        targetPosition.top < windowPosition.bottom &&
        targetPosition.right > windowPosition.left &&
        targetPosition.left < windowPosition.right) {
        return true;
      } else {
        return false;
      };
    }
    changeImg(id) {
      if (this.isNeedChangeImg) {
        if (!this.imgs) this.imgs = document.querySelectorAll(this.imgSelector);
        this.imgs[this.currItem].classList.remove('active');
        this.imgs[id].classList.add('active');
      }
    }
    setActive(id, time = this.time) {
      this.items[this.currItem].classList.remove('active');
      this.showProgress(this.items[id], time);
      this.changeImg(id);
      this.items[id].classList.add('active');
      this.changeAcordeonHeight()
      this.currItem = id;
    }
    startLoop(id = null) {
      if (this.loop) return;
      this.loop = setInterval(() => {
        if (id === null) id = this.currItem;
        if (this.currItem >= this.items.length - 1) id = 0;
        else id = +this.currItem + 1;
        this.setActive(id);
      }, this.time);
      this.setActive(this.currItem);
    }
    pauseLoop() {
      if (this.timeout) clearTimeout(this.timeout);
      clearInterval(this.loop);
      this.loop = null;
      this.timeout = setTimeout(() => {
        this.startLoop();
      }, this.pauseTime);
    }
    stopLoop() {
      if (this.timeout) clearTimeout(this.timeout);
      clearInterval(this.loop);
      this.loop = null;
      this.clearProgress(this.items[this.currItem]);
    }
    clearProgress(item) {
      if (this.isProgressEnable) {
        if (this.progressInterval) clearInterval(this.progressInterval);
        let progressBar;
        if (this.isProgressCommon) {
          progressBar = document.querySelector(this.progressSelector)
        } else {
          progressBar = item.querySelector(this.progressSelector)
        }
        progressBar.style[this.progressStyleType] = '0%';
      }
    }
    showProgress(item, time) {
      if (this.isProgressEnable) {
        if (this.progressInterval) clearInterval(this.progressInterval);

        let progressBar;
        if (this.isProgressCommon) {
          progressBar = document.querySelector(this.progressSelector)
        } else {
          progressBar = item.querySelector(this.progressSelector)
        }
        let timeStep = 40;
        let progressStep = 100 / (time / timeStep);
        let progress = 0;

        this.progressInterval = setInterval(() => {
          if (progress >= 100) progress = 100;
          progressBar.style[this.progressStyleType] = progress + '%';
          progress = progress + +progressStep;
        }, timeStep)
      }
    }
    init() {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        item.dataset.id = i;
        item.addEventListener('click', e => {
          this.pauseLoop();
          this.setActive(e.currentTarget.dataset.id, this.pauseTime);
        })
      }

      if (this.isVisible(this.acordeonElem)) this.startLoop();
      else this.stopLoop();

      window.addEventListener("optimizedResize", e => {
        this.changeAcordeonHeight()
      });

      window.addEventListener('scroll', e => {
        if (this.isVisible(this.acordeonElem)) this.startLoop();
        else this.stopLoop();
      });
    }
  }




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


const gallerySwiper = new Swiper('.gallery-slider', {
  // loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
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


const reviewSwiper = new Swiper('.review-slider', {
  // loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
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


  lazyVideoPoster();
  window.addEventListener('load', hidePreloader);
  smoothScroll();
  navHeandler.init();
  // modalFormHeandler.init();
  modalPolicyHeandler.init();
  // langChanger.init();
})();

