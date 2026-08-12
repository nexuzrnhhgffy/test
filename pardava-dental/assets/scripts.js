const PARDAVA = {
  beforeAfter: [
    { id: 'lam-1', label: 'لمینت سرامیکی', category: 'laminate', img: 'assets/images/ba-laminate-1.jpg' },
    { id: 'lam-2', label: 'لمینت کامپوزیت', category: 'laminate', img: 'assets/images/ba-laminate-2.jpg' },
    { id: 'blc-1', label: 'بلیچینگ دندان', category: 'bleach', img: 'assets/images/ba-bleach-1.jpg' },
    { id: 'blc-2', label: 'سفیدکردن لیزری', category: 'bleach', img: 'assets/images/ba-bleach-2.jpg' },
    { id: 'imp-1', label: 'ایمپلنت تک‌دندان', category: 'implant', img: 'assets/images/ba-implant-1.jpg' },
    { id: 'imp-2', label: 'ایمپلنت کامل فک', category: 'implant', img: 'assets/images/ba-implant-2.jpg' },
    { id: 'ort-1', label: 'ارتودنسی نامرئی', category: 'ortho', img: 'assets/images/ba-ortho-1.jpg' },
    { id: 'ort-2', label: 'ارتودنسی ثابت', category: 'ortho', img: 'assets/images/ba-ortho-2.jpg' }
  ],
  services: [
    {
      title: 'ایمپلنت دندان',
      desc: 'کاشت ریشه تیتانیومی با برندهای اروپایی و آمریکایی، بدون درد و با گارانتی مادام‌العمر.',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pardava-color-primary-dark)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6M12 8c-2.2 0-4 1.8-4 4v2h8v-2c0-2.2-1.8-4-4-4z"/><rect x="9" y="14" width="6" height="4" rx="1"/><path d="M10 18v3M14 18v3"/><path d="M8 21h8"/></svg>'
    },
    {
      title: 'لمینت سرامیکی',
      desc: 'روکش‌های نازک سرامیکی با ضخامت ۰.۳ میلی‌متر برای تغییر رنگ، فرم و اندازه دندان‌ها.',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pardava-color-primary-dark)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-2.2 0-3.6 1.3-4.8 1.3C5.8 4.3 4 3.5 4 6.2c0 3 .9 6.4 1.8 9 .6 1.8 1.1 3.5 2.3 3.5 1.4 0 1.4-2.3 2-4.4.3-1 .6-1.6 1.9-1.6s1.6.6 1.9 1.6c.6 2.1.6 4.4 2 4.4 1.2 0 1.7-1.7 2.3-3.5.9-2.6 1.8-6 1.8-9 0-2.7-1.8-1.9-3.2-1.9C15.6 4.3 14.2 3 12 3z"/></svg>'
    },
    {
      title: 'ارتودنسی',
      desc: 'ارتودنسی ثابت، متحرک و نامرئی برای تمام سنین با قالب‌گیری و طرح درمان دیجیتال.',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pardava-color-primary-dark)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="10" rx="3"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/><circle cx="12" cy="13" r="1.5"/><circle cx="8" cy="13" r="1"/><circle cx="16" cy="13" r="1"/></svg>'
    },
    {
      title: 'بلیچینگ و سفیدکردن',
      desc: 'سفیدکردن دندان با لیزر یا روش خانگی، تا هشت درجه روشن‌تر در یک جلسه.',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pardava-color-primary-dark)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>'
    },
    {
      title: 'جراحی دندان عقل',
      desc: 'برداشت بدون درد دندان‌های نهفته و نیمه‌نهفته با تکنیک‌های میکروسکوپی و لیزری.',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pardava-color-primary-dark)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>'
    },
    {
      title: 'عصب‌کشی و ترمیم',
      desc: 'درمان ریشه با دستگاه روتاری و ترمیم با کامپوزیت نانوهیبرید همرنگ دندان.',
      icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--pardava-color-primary-dark)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-2.2 0-3.6 1.3-4.8 1.3C5.8 4.3 4 3.5 4 6.2c0 3 .9 6.4 1.8 9 .6 1.8 1.1 3.5 2.3 3.5 1.4 0 1.4-2.3 2-4.4.3-1 .6-1.6 1.9-1.6s1.6.6 1.9 1.6c.6 2.1.6 4.4 2 4.4 1.2 0 1.7-1.7 2.3-3.5.9-2.6 1.8-6 1.8-9 0-2.7-1.8-1.9-3.2-1.9C15.6 4.3 14.2 3 12 3z"/><path d="M10 10h4M10 14h4"/></svg>'
    }
  ],
  doctors: [
    { name: 'دکتر سارا احمدی', role: 'متخصص ایمپلنت', exp: '۱۲ سال تجربه', cases: '۲۳۰۰+', img: 'assets/images/doctor-sara.jpg' },
    { name: 'دکتر مهدی رضایی', role: 'متخصص ارتودنسی', exp: '۱۰ سال تجربه', cases: '۱۸۰۰+', img: 'assets/images/doctor-mehdi.jpg' },
    { name: 'دکتر نازنین کریمی', role: 'متخصص زیبایی دندان', exp: '۸ سال تجربه', cases: '۱۵۰۰+', img: 'assets/images/doctor-nazanin.jpg' },
    { name: 'دکتر امیرحسین موسوی', role: 'جراح فک و صورت', exp: '۱۵ سال تجربه', cases: '۳۱۰۰+', img: 'assets/images/doctor-amir.jpg' }
  ],
  testimonials: [
    { name: 'مریم حسینی', case: 'لمینت سرامیکی', text: 'بعد از لمینت در پردآوا دوباره با خیال راحت لبخند می‌زنم؛ رنگ و فرم دندان‌ها کاملاً طبیعی شده است.', stars: 5, img: 'assets/images/patient-maryam.jpg' },
    { name: 'علی محمدپور', case: 'ایمپلنت دندان', text: 'سه دندانم را با ایمپلنت جایگزین کردند. روند درمان بدون درد بود و نتیجه شبیه دندان طبیعی درآمد.', stars: 5, img: 'assets/images/patient-ali.jpg' },
    { name: 'زهرا عباسی', case: 'ارتودنسی نامرئی', text: 'با ارتودنسی نامرئی در ۱۴ ماه دندان‌هایم مرتب شد؛ بدون اینکه ظاهر کار مشخص باشد.', stars: 5, img: 'assets/images/patient-zahra.jpg' }
  ],
  pricing: [
    { title: 'جرمگیری و پیشگیری', amount: '۳۵۰', unit: 'هزار تومان', note: 'هر جلسه', featured: false, list: ['جرمگیری حرفه‌ای', 'فلوراید تراپی', 'بررسی لثه', 'آموزش مسواک'] },
    { title: 'لمینت سرامیکی', amount: '۴,۸۰۰', unit: 'هزار تومان', note: 'هر واحد دندان', featured: true, list: ['سرامیک IPS e.max', 'ضخامت ۰.۳ میلی‌متر', 'گارانتی ۱۰ ساله', 'بی‌حسی بدون درد', 'قالب‌گیری دیجیتال'] },
    { title: 'ایمپلنت دندان', amount: '۸,۵۰۰', unit: 'هزار تومان', note: 'هر واحد + اباتمنت', featured: false, list: ['ایمپلنت استرومن', 'جراحی بدون درد', 'اباتمنت سفارشی', 'تاج سرامیکی', 'گارانتی مادام‌العمر'] }
  ],
  faq: [
    { q: 'آیا درمان ایمپلنت دردناک است؟', a: 'خیر. با بی‌حسی موضعی کامل و تکنیک‌های جدید جراحی، معمولاً دردی حس نمی‌شود. بعد از جراحی هم با مسکن معمولی قابل کنترل است.' },
    { q: 'لمینت سرامیکی چه مدت دوام دارد؟', a: 'با رعایت بهداشت دهان و معاینات دوره‌ای، بین ۱۰ تا ۱۵ سال دوام دارد و در پردآوا گارانتی ۱۰ ساله دارد.' },
    { q: 'آیا بیمه‌ها پوشش می‌دهند؟', a: 'بله. کلینیک طرف قرارداد با تأمین اجتماعی، ایران، دی، آسیا و سامان است. میزان پوشش بسته به نوع بیمه و خدمت متفاوت است.' },
    { q: 'آیا امکان پرداخت اقساطی وجود دارد؟', a: 'بله. برای درمان‌های بالای ۵ میلیون تومان، پرداخت اقساطی ۳ تا ۱۲ ماهه با چک یا کارت اعتباری ممکن است.' },
    { q: 'ارتودنسی نامرئی چقدر طول می‌کشد؟', a: 'بسته به میزان ناهنجاری بین ۶ تا ۲۴ ماه متغیر است. زمان تقریبی در جلسه مشاوره اولیه اعلام می‌شود.' }
  ]
};

(function renderServices() {
  var grid = document.getElementById('pardava-services-grid');
  if (!grid) return;
  grid.innerHTML = PARDAVA.services.map(function (s) {
    return '<div class="pardava-service-card">' +
      '<div class="pardava-service-card__icon">' + s.icon + '</div>' +
      '<div class="pardava-service-card__title">' + s.title + '</div>' +
      '<div class="pardava-service-card__desc">' + s.desc + '</div>' +
      '<a href="#pardava-booking" class="pardava-service-card__link">رزرو نوبت <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></a>' +
      '</div>';
  }).join('');
})();

(function renderDoctors() {
  var grid = document.getElementById('pardava-doctors-grid');
  if (!grid) return;
  grid.innerHTML = PARDAVA.doctors.map(function (d) {
    return '<div class="pardava-doctor-card">' +
      '<div class="pardava-doctor-card__photo"><img src="' + d.img + '" alt="' + d.name + '" loading="lazy" width="400" height="460"></div>' +
      '<div class="pardava-doctor-card__body">' +
      '<div class="pardava-doctor-card__name">' + d.name + '</div>' +
      '<div class="pardava-doctor-card__role">' + d.role + '</div>' +
      '<div class="pardava-doctor-card__meta"><span>' + d.exp + '</span><span>' + d.cases + ' مورد درمان</span></div>' +
      '</div></div>';
  }).join('');
})();

(function renderTestimonials() {
  var track = document.getElementById('pardava-testimonials-track');
  if (!track) return;
  track.innerHTML = PARDAVA.testimonials.map(function (t) {
    return '<div class="pardava-testimonial-card">' +
      '<div class="pardava-testimonial-card__stars">' + '★'.repeat(t.stars) + '</div>' +
      '<div class="pardava-testimonial-card__text">«' + t.text + '»</div>' +
      '<div class="pardava-testimonial-card__person">' +
      '<div class="pardava-testimonial-card__avatar"><img src="' + t.img + '" alt="' + t.name + '" loading="lazy" width="100" height="100"></div>' +
      '<div><div class="pardava-testimonial-card__name">' + t.name + '</div>' +
      '<div class="pardava-testimonial-card__case">' + t.case + '</div></div></div></div>';
  }).join('');
})();

(function renderPricing() {
  var grid = document.getElementById('pardava-pricing-grid');
  if (!grid) return;
  grid.innerHTML = PARDAVA.pricing.map(function (p) {
    return '<div class="pardava-price-card' + (p.featured ? ' pardava-price-card--featured' : '') + '">' +
      (p.featured ? '<span class="pardava-price-card__tag">پرطرفدارترین</span>' : '') +
      '<div class="pardava-price-card__title">' + p.title + '</div>' +
      '<div class="pardava-price-card__amount">' + p.amount + '</div>' +
      '<div class="pardava-price-card__note">' + p.unit + ' — ' + p.note + '</div>' +
      '<ul class="pardava-price-card__list">' +
      p.list.map(function (item) {
        return '<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pardava-color-success)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>' + item + '</li>';
      }).join('') +
      '</ul>' +
      '<a href="#pardava-booking" class="pardava-btn ' + (p.featured ? 'pardava-btn-primary' : 'pardava-btn-outline') + ' pardava-btn-block">رزرو مشاوره رایگان</a>' +
      '</div>';
  }).join('');
})();

(function renderFAQ() {
  var list = document.getElementById('pardava-faq-list');
  if (!list) return;
  list.innerHTML = PARDAVA.faq.map(function (f, i) {
    return '<div class="pardava-faq-item" data-faq="' + i + '">' +
      '<button type="button" class="pardava-faq-item__q"><span>' + f.q + '</span><span class="pardava-faq-item__icon">+</span></button>' +
      '<div class="pardava-faq-item__a">' + f.a + '</div></div>';
  }).join('');
  list.addEventListener('click', function (e) {
    var item = e.target.closest('.pardava-faq-item');
    if (!item) return;
    var wasOpen = item.classList.contains('pardava-open');
    list.querySelectorAll('.pardava-faq-item').forEach(function (el) { el.classList.remove('pardava-open'); });
    if (!wasOpen) item.classList.add('pardava-open');
  });
})();

(function populateSelects() {
  var svcSel = document.getElementById('pardava-input-service');
  var docSel = document.getElementById('pardava-input-doctor');
  if (!svcSel || !docSel) return;
  svcSel.innerHTML = '<option value="">انتخاب کنید...</option>' + PARDAVA.services.map(function (s) {
    return '<option value="' + s.title + '">' + s.title + '</option>';
  }).join('');
  docSel.innerHTML = '<option value="">انتخاب کنید...</option>' + PARDAVA.doctors.map(function (d) {
    return '<option value="' + d.name + '">' + d.name + ' — ' + d.role + '</option>';
  }).join('');
})();

(function initBeforeAfter() {
  var cases = PARDAVA.beforeAfter;
  var container = document.getElementById('pardava-compare');
  var beforeDiv = document.getElementById('pardava-compare-before');
  var afterImg = document.getElementById('pardava-img-after');
  var beforeImg = document.getElementById('pardava-img-before');
  var handle = document.getElementById('pardava-compare-handle');
  var caseLabel = document.getElementById('pardava-case-label');
  var thumbsWrap = document.getElementById('pardava-gallery-thumbs');
  var tabsWrap = document.getElementById('pardava-gallery-tabs');
  if (!container || !beforeDiv || !afterImg || !beforeImg || !handle || !thumbsWrap || !tabsWrap) return;

  var activeCase = 0;
  var activeFilter = 'all';
  var isDragging = false;

  function updateCompareWidth() {
    container.style.setProperty('--pardava-compare-img-w', container.offsetWidth + 'px');
  }
  updateCompareWidth();
  window.addEventListener('resize', updateCompareWidth);

  function renderThumbs() {
    var filtered = activeFilter === 'all' ? cases : cases.filter(function (c) { return c.category === activeFilter; });
    thumbsWrap.innerHTML = filtered.map(function (c) {
      var realIndex = cases.indexOf(c);
      return '<button type="button" class="pardava-gallery-thumb' + (realIndex === activeCase ? ' pardava-gallery-thumb--active' : '') + '" data-index="' + realIndex + '" title="' + c.label + '">' +
        '<img src="' + c.img + '" alt="' + c.label + '" loading="lazy">' +
        '<span class="pardava-gallery-thumb__label">' + c.label + '</span></button>';
    }).join('');
  }

  function setSliderPos(ratio) {
    ratio = Math.max(0.02, Math.min(0.98, ratio));
    beforeDiv.style.width = (ratio * 100) + '%';
    handle.style.left = (ratio * 100) + '%';
  }

  function loadCase(index) {
    if (index < 0 || index >= cases.length) return;
    activeCase = index;
    var c = cases[index];
    afterImg.src = c.img;
    beforeImg.src = c.img;
    afterImg.alt = 'لبخند بعد از ' + c.label;
    beforeImg.alt = 'لبخند قبل از ' + c.label;
    caseLabel.textContent = c.label;
    setSliderPos(0.5);
    renderThumbs();
  }

  function getPointerRatio(e) {
    var rect = container.getBoundingClientRect();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return 1 - ((clientX - rect.left) / rect.width);
  }

  handle.addEventListener('mousedown', function (e) { isDragging = true; e.preventDefault(); });
  handle.addEventListener('touchstart', function () { isDragging = true; }, { passive: true });
  document.addEventListener('mousemove', function (e) { if (isDragging) setSliderPos(getPointerRatio(e)); });
  document.addEventListener('touchmove', function (e) { if (isDragging) setSliderPos(getPointerRatio(e)); }, { passive: true });
  document.addEventListener('mouseup', function () { isDragging = false; });
  document.addEventListener('touchend', function () { isDragging = false; });
  container.addEventListener('click', function (e) {
    if (e.target.closest('.pardava-compare__handle')) return;
    setSliderPos(getPointerRatio(e));
  });
  thumbsWrap.addEventListener('click', function (e) {
    var thumb = e.target.closest('.pardava-gallery-thumb');
    if (!thumb) return;
    loadCase(parseInt(thumb.dataset.index, 10));
  });
  tabsWrap.addEventListener('click', function (e) {
    var tab = e.target.closest('.pardava-gallery-tab');
    if (!tab) return;
    activeFilter = tab.dataset.filter;
    tabsWrap.querySelectorAll('.pardava-gallery-tab').forEach(function (t) { t.classList.remove('pardava-gallery-tab--active'); });
    tab.classList.add('pardava-gallery-tab--active');
    renderThumbs();
    var filtered = activeFilter === 'all' ? cases : cases.filter(function (c) { return c.category === activeFilter; });
    if (filtered.length && !filtered.find(function (c) { return cases.indexOf(c) === activeCase; })) {
      loadCase(cases.indexOf(filtered[0]));
    }
  });
  loadCase(0);
})();

(function initToothMap() {
  var map = document.getElementById('pardava-tooth-map');
  var label = document.getElementById('pardava-tooth-map-label');
  var hidden = document.getElementById('pardava-input-tooth');
  if (!map || !label || !hidden) return;
  var selected = new Set();
  for (var i = 1; i <= 32; i++) {
    (function (num) {
      var tooth = document.createElement('button');
      tooth.type = 'button';
      tooth.className = 'pardava-tooth';
      tooth.dataset.tooth = String(num);
      tooth.title = 'دندان شماره ' + num;
      tooth.setAttribute('aria-label', 'دندان شماره ' + num);
      tooth.addEventListener('click', function () {
        if (selected.has(num)) {
          selected.delete(num);
          tooth.classList.remove('pardava-tooth--active');
        } else {
          selected.add(num);
          tooth.classList.add('pardava-tooth--active');
        }
        var arr = Array.from(selected).sort(function (a, b) { return a - b; });
        hidden.value = arr.join(',');
        label.textContent = arr.length ? 'دندان‌های انتخاب‌شده: ' + arr.join('، ') : 'روی دندان‌ها کلیک کنید';
      });
      map.appendChild(tooth);
    })(i);
  }
})();

(function initCounters() {
  var nums = document.querySelectorAll('[data-pardava-counter]');
  if (!nums.length) return;
  var toPersian = function (n) { return String(n).replace(/\d/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[d]; }); };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.dataset.pardavaCounter, 10);
      var duration = 1800;
      var start = performance.now();
      function tick(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(2, -10 * progress);
        el.textContent = toPersian(Math.round(eased * target).toLocaleString('en-US'));
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = toPersian(target.toLocaleString('en-US'));
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });
  nums.forEach(function (n) { observer.observe(n); });
})();

(function initBookingForm() {
  var form = document.getElementById('pardava-booking-form');
  var toast = document.getElementById('pardava-toast');
  if (!form) return;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('pardava-toast--visible');
    window.setTimeout(function () { toast.classList.remove('pardava-toast--visible'); }, 3500);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('pardava-input-name').value.trim();
    var phone = document.getElementById('pardava-input-phone').value.trim();
    if (!name || !phone) {
      showToast('لطفاً نام و شماره تماس را وارد کنید.');
      return;
    }
    showToast('درخواست نوبت ثبت شد؛ به‌زودی تماس می‌گیریم.');
    form.reset();
    document.querySelectorAll('.pardava-tooth--active').forEach(function (t) { t.classList.remove('pardava-tooth--active'); });
    document.getElementById('pardava-tooth-map-label').textContent = 'روی دندان‌ها کلیک کنید';
    document.getElementById('pardava-input-tooth').value = '';
  });
})();

(function initMobileMenu() {
  var burger = document.getElementById('pardava-burger');
  var nav = document.getElementById('pardava-nav');
  if (!burger || !nav) return;
  function setOpen(open) {
    nav.classList.toggle('pardava-nav--open', open);
    burger.classList.toggle('pardava-burger--open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () {
    setOpen(!nav.classList.contains('pardava-nav--open'));
  });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();

(function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var targets = document.querySelectorAll('.pardava-service-card, .pardava-doctor-card, .pardava-testimonial-card, .pardava-price-card, .pardava-feature, .pardava-gallery-thumb');
  targets.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var delay = Math.random() * 200;
      window.setTimeout(function () {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  targets.forEach(function (el) { observer.observe(el); });
})();
