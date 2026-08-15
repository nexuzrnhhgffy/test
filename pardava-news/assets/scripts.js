(function () {
  var PARDAVA_NEWS = [
    { t: "بازار سرمایه پس از سه روز اصلاح به تعادل رسید", c: "اقتصادی", img: "assets/images/hero.jpg", d: "۲ ساعت پیش", a: "کیان رستمی", s: "جریان پول خرد به فلزات و پالایشی برگشت." },
    { t: "مه غلیظ در مسیرهای کوهستانی شمال غرب ماندگار شد", c: "جهان", img: "assets/images/n3.jpg", d: "۴ ساعت پیش", a: "سامان مرادی", s: "رانندگان به احتیاط در گردنه‌ها توصیه شدند." },
    { t: "مرکز داده جدید با مصرف انرژی کمتر وارد مدار شد", c: "فناوری", img: "assets/images/n1.jpg", d: "۶ ساعت پیش", a: "آرمان نوری", s: "استاندارد تازه مصرف برق در مراکز داده آزمایش شد." },
    { t: "سطح آب دریاچه‌های فصلی نسبت به پارسال افزایش یافت", c: "اجتماعی", img: "assets/images/n6.jpg", d: "۸ ساعت پیش", a: "کیان رستمی", s: "بارش‌های بهاری در چند حوضه اثر گذاشت." },
    { t: "لایحه شفافیت بودجه در کمیسیون بررسی می‌شود", c: "سیاسی", img: "assets/images/n7.jpg", d: "امروز", a: "آرمان نوری", s: "زمان‌بندی جلسات علنی به‌روز شد." },
    { t: "پوشش فیبر نوری در سه استان به آستانه بهره‌برداری رسید", c: "فناوری", img: "assets/images/n13.jpg", d: "امروز", a: "سامان مرادی", s: "اتصال خانوارها مرحله‌به‌مرحله انجام می‌شود." },
    { t: "نقشه جریان نقدینگی به صنایع صادرات‌محور چرخید", c: "اقتصادی", img: "assets/images/n5.jpg", d: "دیروز", a: "کیان رستمی", s: "کالایی‌ها وزن بیشتری در ورود پول داشتند." },
    { t: "رصدخانه ملی نخستین مجموعه داده فصل را منتشر کرد", c: "فناوری", img: "assets/images/n4.jpg", d: "دیروز", a: "آرمان نوری", s: "داده‌ها برای پژوهش نمایشی در دسترس است." }
  ];
  var PARDAVA_BREAK = [
    "شاخص کل در پایان جلسه با نوسان محدود بسته شد",
    "مه صبحگاهی در جاده‌های غربی تردد را کند کرد",
    "نرخ بهره بین‌بانکی بدون تغییر آزمایشی ماند"
  ];

  function pardavaToast(msg) {
    var el = document.getElementById("pardava-toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-on");
    window.setTimeout(function () { el.classList.remove("is-on"); }, 2400);
  }

  var cat = "all";
  var newest = true;
  function pardavaLatest() {
    var grid = document.getElementById("pardava-latest-grid");
    if (!grid) return;
    var rows = PARDAVA_NEWS.filter(function (n) { return cat === "all" || n.c === cat; });
    if (!newest) rows = rows.slice().reverse();
    grid.innerHTML = rows.map(function (n) {
      return '<a class="pardava-card pardava-card--std pardava-span-3" href="article.html">' +
        '<div class="pardava-media"><img src="' + n.img + '" alt="" width="800" height="533" loading="lazy"></div>' +
        '<span class="pardava-badge">' + n.c + "</span>" +
        "<h3>" + n.t + "</h3>" +
        "<p>" + n.s + "</p>" +
        '<p class="pardava-meta">' + n.d + " · " + n.a + "</p></a>";
    }).join("");
  }

  var sfilter = "all";
  function pardavaSearchRender(q) {
    var box = document.getElementById("pardava-search-results");
    if (!box) return;
    q = (q || "").trim();
    var rows = PARDAVA_NEWS.filter(function (n) {
      if (sfilter !== "all" && n.c !== sfilter) return false;
      return !q || (n.t + n.s + n.c).indexOf(q) !== -1;
    });
    box.innerHTML = rows.map(function (n) {
      return '<a class="pardava-result" href="article.html"><div class="pardava-media"><img src="' + n.img + '" alt="" loading="lazy"></div><div><span class="pardava-badge">' + n.c + "</span><h3>" + n.t + "</h3><p class='pardava-meta'>" + n.s + "</p></div></a>";
    }).join("") || "<p class='pardava-meta'>نتیجه‌ای یافت نشد.</p>";
  }

  var breakI = 0;
  function pardavaBreakSet() {
    var el = document.getElementById("pardava-break-text");
    if (el) el.textContent = PARDAVA_BREAK[breakI];
  }

  var header = document.getElementById("pardava-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-slim", window.scrollY > 24);
    }, { passive: true });
  }

  var burger = document.getElementById("pardava-burger");
  var nav = document.getElementById("pardava-nav");
  if (burger && nav) {
    burger.addEventListener("click", function () { nav.classList.toggle("is-open"); });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("is-open"); });
    });
  }

  document.querySelectorAll("[data-pardava-theme]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-pardava-theme") === "dark" ? "" : "dark";
      if (cur) document.documentElement.setAttribute("data-pardava-theme", "dark");
      else document.documentElement.removeAttribute("data-pardava-theme");
      try { localStorage.setItem("pardava-theme", cur); } catch (e) {}
    });
  });
  try {
    if (localStorage.getItem("pardava-theme") === "dark") {
      document.documentElement.setAttribute("data-pardava-theme", "dark");
    }
  } catch (e) {}

  var search = document.getElementById("pardava-search");
  var searchBtn = document.getElementById("pardava-search-btn");
  var searchClose = document.getElementById("pardava-search-close");
  var searchInput = document.getElementById("pardava-search-input");
  function pardavaOpenSearch() {
    if (!search) return;
    search.classList.add("is-on");
    pardavaSearchRender("");
    if (searchInput) searchInput.focus();
  }
  function pardavaCloseSearch() { if (search) search.classList.remove("is-on"); }
  if (searchBtn) searchBtn.addEventListener("click", pardavaOpenSearch);
  if (searchClose) searchClose.addEventListener("click", pardavaCloseSearch);
  if (searchInput) searchInput.addEventListener("input", function () { pardavaSearchRender(searchInput.value); });
  document.querySelectorAll("[data-pardava-sfilter]").forEach(function (b) {
    b.addEventListener("click", function () {
      sfilter = b.getAttribute("data-pardava-sfilter");
      document.querySelectorAll("[data-pardava-sfilter]").forEach(function (x) { x.classList.toggle("is-on", x === b); });
      pardavaSearchRender(searchInput ? searchInput.value : "");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      pardavaCloseSearch();
      var login = document.getElementById("pardava-login");
      if (login) login.classList.remove("is-on");
    }
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      pardavaOpenSearch();
    }
  });

  var login = document.getElementById("pardava-login");
  document.querySelectorAll("[data-pardava-login]").forEach(function (b) {
    b.addEventListener("click", function () { if (login) login.classList.add("is-on"); });
  });
  var loginClose = document.getElementById("pardava-login-close");
  if (loginClose) loginClose.addEventListener("click", function () { login.classList.remove("is-on"); });
  if (login) login.addEventListener("click", function (e) { if (e.target === login) login.classList.remove("is-on"); });
  var loginForm = document.getElementById("pardava-login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      login.classList.remove("is-on");
      pardavaToast("ورود نمایشی انجام شد.");
    });
  }

  var newsForm = document.getElementById("pardava-news-form");
  if (newsForm) {
    newsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      pardavaToast("عضویت خبرنامه ثبت نمایشی شد.");
      newsForm.reset();
    });
  }
  var commentForm = document.getElementById("pardava-comment-form");
  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      pardavaToast("دیدگاه نمایشی ارسال شد.");
      commentForm.reset();
    });
  }
  document.querySelectorAll("[data-pardava-share]").forEach(function (b) {
    b.addEventListener("click", function () { pardavaToast("اشتراک نمایشی — پیوند کپی نشد مگر جدا."); });
  });
  document.querySelectorAll("[data-pardava-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
      pardavaToast("پیوند صفحه کپی شد.");
    });
  });

  var filters = document.getElementById("pardava-latest-filters");
  if (filters) {
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("[data-pardava-cat]");
      if (b) {
        cat = b.getAttribute("data-pardava-cat");
        filters.querySelectorAll("[data-pardava-cat]").forEach(function (x) { x.classList.toggle("is-on", x === b); });
        pardavaLatest();
      }
      if (e.target.closest("[data-pardava-sort]")) {
        newest = !newest;
        e.target.closest("[data-pardava-sort]").textContent = newest ? "جدیدترین" : "قدیمی‌تر";
        pardavaLatest();
      }
    });
  }

  var prev = document.getElementById("pardava-break-prev");
  var next = document.getElementById("pardava-break-next");
  if (prev) prev.addEventListener("click", function () {
    breakI = (breakI + PARDAVA_BREAK.length - 1) % PARDAVA_BREAK.length;
    pardavaBreakSet();
  });
  if (next) next.addEventListener("click", function () {
    breakI = (breakI + 1) % PARDAVA_BREAK.length;
    pardavaBreakSet();
  });
  window.setInterval(function () {
    breakI = (breakI + 1) % PARDAVA_BREAK.length;
    pardavaBreakSet();
  }, 7000);

  var dateEl = document.getElementById("pardava-date");
  if (dateEl) {
    try {
      dateEl.textContent = new Date().toLocaleDateString("fa-IR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    } catch (e) {}
  }

  if (window.matchMedia("(max-width: 720px)").matches) {
    document.querySelectorAll(".pardava-footer details").forEach(function (d) { d.open = false; });
  }

  pardavaLatest();
  pardavaBreakSet();
  window.setTimeout(function () { document.body.classList.add("is-ready"); }, 420);
})();
