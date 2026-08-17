(function () {
  var fa = "۰۱۲۳۴۵۶۷۸۹";
  function pardavaFa(n) {
    return String(n).replace(/\d/g, function (d) { return fa[d]; });
  }
  function pardavaToast(msg) {
    var el = document.getElementById("pardava-toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-on");
    window.setTimeout(function () { el.classList.remove("is-on"); }, 2400);
  }

  var PARDAVA_PROPS = [
    { id: "p2", title: "آپارتمان ۱۸۵ متری مدرن در نیاوران", deal: "فروش", feat: true, type: "آپارتمان", area: "نیاوران", meter: 185, rooms: 3, park: 2, bath: 2, price: "۲۸٬۵۰۰٬۰۰۰٬۰۰۰ تومان", priceB: 28.5, img: "assets/images/p2.jpg", when: "امروز" },
    { id: "p4", title: "ویلای باغ‌دار در ولنجک", deal: "فروش", feat: true, type: "ویلا", area: "ولنجک", meter: 420, rooms: 5, park: 3, bath: 4, price: "۸۹٬۰۰۰٬۰۰۰٬۰۰۰ تومان", priceB: 89, img: "assets/images/p4.jpg", when: "دیروز" },
    { id: "p5", title: "آپارتمان نوساز فرمانیه", deal: "اجاره", feat: false, type: "آپارتمان", area: "فرمانیه", meter: 140, rooms: 2, park: 1, bath: 2, price: "۵۰۰ میلیون رهن + ۳۰ میلیون اجاره", priceB: 0.5, img: "assets/images/p5.jpg", when: "۲ روز پیش" },
    { id: "p1", title: "خانه مدرن زعفرانیه", deal: "فروش", feat: true, type: "خانه", area: "زعفرانیه", meter: 310, rooms: 4, park: 2, bath: 3, price: "۶۲٬۰۰۰٬۰۰۰٬۰۰۰ تومان", priceB: 62, img: "assets/images/p1.jpg", when: "۳ روز پیش" },
    { id: "p6", title: "پنت‌هاوس الهیه با تراس", deal: "فروش", feat: false, type: "آپارتمان", area: "الهیه", meter: 240, rooms: 3, park: 2, bath: 3, price: "۵۴٬۰۰۰٬۰۰۰٬۰۰۰ تومان", priceB: 54, img: "assets/images/p6.jpg", when: "۴ روز پیش" },
    { id: "p3", title: "دفتر کار مبله نیاوران", deal: "اجاره", feat: false, type: "دفتر", area: "نیاوران", meter: 95, rooms: 2, park: 1, bath: 1, price: "۳۰۰ میلیون رهن + ۱۸ میلیون اجاره", priceB: 0.3, img: "assets/images/p3.jpg", when: "۵ روز پیش" },
    { id: "p7", title: "آپارتمان سرمایه‌ای ولنجک", deal: "رهن", feat: false, type: "آپارتمان", area: "ولنجک", meter: 125, rooms: 2, park: 1, bath: 1, price: "۱٫۸ میلیارد رهن کامل", priceB: 1.8, img: "assets/images/p7.jpg", when: "هفته پیش" },
    { id: "p8", title: "پروژه ویلایی نیمه‌کاره", deal: "فروش", feat: false, type: "ویلا", area: "نیاوران", meter: 500, rooms: 6, park: 4, bath: 5, price: "توافقی", priceB: 120, img: "assets/images/p8.jpg", when: "هفته پیش" }
  ];

  var fav = [];
  var cmp = [];
  try { fav = JSON.parse(localStorage.getItem("pardava-fav") || "[]"); } catch (e) {}
  try { cmp = JSON.parse(localStorage.getItem("pardava-cmp") || "[]"); } catch (e) {}

  function pardavaCard(p) {
    var on = fav.indexOf(p.id) >= 0 ? " is-on" : "";
    var con = cmp.indexOf(p.id) >= 0 ? " is-on" : "";
    return '<article class="pardava-pcard pardava-span-4" data-pardava-id="' + p.id + '">' +
      '<div class="pardava-pcard__media">' +
      '<img src="' + p.img + '" alt="' + p.title + '" loading="lazy">' +
      '<span class="pardava-badge">' + p.deal + "</span>" +
      (p.feat ? '<span class="pardava-badge pardava-badge--feat">Featured</span>' : "") +
      '<button class="pardava-fav' + on + '" type="button" data-pardava-fav="' + p.id + '" aria-label="علاقه‌مندی">♥</button>' +
      '<button class="pardava-cmp' + con + '" type="button" data-pardava-cmp="' + p.id + '">مقایسه</button>' +
      "</div><div class='pardava-pcard__body'>" +
      "<h3>" + p.title + "</h3>" +
      '<p class="pardava-spec">' + pardavaFa(p.meter) + " متر  |  " + pardavaFa(p.rooms) + " خواب  |  " + pardavaFa(p.park) + " پارکینگ</p>" +
      '<p class="pardava-price">' + p.price + "</p>" +
      "<p>" + p.area + "، تهران · " + p.when + "</p>" +
      '<a class="pardava-more" href="property.html">مشاهده ملک ←</a></div></article>';
  }

  function pardavaHCard(p) {
    return '<a class="pardava-hcard" href="property.html" style="margin-bottom:12px">' +
      '<img src="' + p.img + '" alt="' + p.title + '" loading="lazy">' +
      "<div class='pardava-pcard__body'><span class='pardava-badge' style='position:static'>" + p.deal + "</span>" +
      "<h3>" + p.title + "</h3><p class='pardava-spec'>" + pardavaFa(p.meter) + " متر · " + p.area + "</p>" +
      "<p class='pardava-price'>" + p.price + "</p></div></a>";
  }

  var featured = document.getElementById("pardava-featured-grid");
  if (featured) {
    var list = window.location.pathname.indexOf("area") >= 0
      ? PARDAVA_PROPS.filter(function (p) { return p.area === "نیاوران"; })
      : PARDAVA_PROPS.filter(function (p) { return p.feat; });
    featured.innerHTML = list.map(pardavaCard).join("");
  }

  var page = 1;
  var per = 4;
  var sort = "new";
  var latestDeal = "";
  function pardavaLatest() {
    var box = document.getElementById("pardava-latest-list");
    if (!box) return;
    var rows = PARDAVA_PROPS.filter(function (p) { return !latestDeal || p.deal === latestDeal; });
    if (sort === "meter") rows.sort(function (a, b) { return b.meter - a.meter; });
    if (sort === "price") rows.sort(function (a, b) { return b.priceB - a.priceB; });
    var start = (page - 1) * per;
    box.innerHTML = rows.slice(start, start + per).map(pardavaHCard).join("") || "<p>فایلی در این فیلتر نیست.</p>";
    var pg = document.getElementById("pardava-pager");
    if (pg) {
      var n = Math.max(1, Math.ceil(rows.length / per));
      pg.innerHTML = Array.from({ length: n }, function (_, i) {
        return '<button type="button" class="' + (i + 1 === page ? "is-on" : "") + '" data-pardava-page="' + (i + 1) + '">' + pardavaFa(i + 1) + "</button>";
      }).join("");
    }
  }
  var sortEl = document.getElementById("pardava-sort");
  if (sortEl) sortEl.addEventListener("change", function () { sort = sortEl.value; page = 1; pardavaLatest(); });
  var latestFilter = document.getElementById("pardava-latest-filter");
  if (latestFilter) latestFilter.addEventListener("change", function () { latestDeal = latestFilter.value; page = 1; pardavaLatest(); });
  var pager = document.getElementById("pardava-pager");
  if (pager) pager.addEventListener("click", function (e) {
    var b = e.target.closest("[data-pardava-page]");
    if (!b) return;
    page = Number(b.getAttribute("data-pardava-page"));
    pardavaLatest();
  });
  pardavaLatest();

  document.addEventListener("click", function (e) {
    var favBtn = e.target.closest("[data-pardava-fav]");
    if (favBtn) {
      var id = favBtn.getAttribute("data-pardava-fav");
      var i = fav.indexOf(id);
      if (i >= 0) fav.splice(i, 1);
      else fav.push(id);
      try { localStorage.setItem("pardava-fav", JSON.stringify(fav)); } catch (err) {}
      favBtn.classList.toggle("is-on");
      pardavaToast(i >= 0 ? "از علاقه‌مندی‌ها حذف شد." : "به علاقه‌مندی‌ها اضافه شد.");
      return;
    }
    var cmpBtn = e.target.closest("[data-pardava-cmp]");
    if (!cmpBtn) return;
    var cid = cmpBtn.getAttribute("data-pardava-cmp");
    var ci = cmp.indexOf(cid);
    if (ci >= 0) cmp.splice(ci, 1);
    else {
      if (cmp.length >= 3) { pardavaToast("حداکثر سه فایل برای مقایسه."); return; }
      cmp.push(cid);
    }
    try { localStorage.setItem("pardava-cmp", JSON.stringify(cmp)); } catch (err) {}
    cmpBtn.classList.toggle("is-on");
    pardavaToast(ci >= 0 ? "از مقایسه حذف شد." : pardavaFa(cmp.length) + " فایل در مقایسه.");
  });

  var search = document.getElementById("pardava-search-form");
  if (search) {
    search.addEventListener("submit", function (e) {
      e.preventDefault();
      var deal = document.getElementById("pardava-deal").value;
      var type = document.getElementById("pardava-type").value;
      var area = document.getElementById("pardava-area").value;
      var meter = Number((document.getElementById("pardava-meter").value || "").replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); })) || 0;
      var budget = Number((document.getElementById("pardava-budget").value || "").replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); })) || 0;
      var rooms = document.getElementById("pardava-rooms").value;
      var rows = PARDAVA_PROPS.filter(function (p) {
        if (deal === "خرید" && p.deal !== "فروش") return false;
        if (deal && deal !== "خرید" && p.deal !== deal) return false;
        if (type && p.type !== type) return false;
        if (area && area !== "شمال تهران" && p.area !== area) return false;
        if (meter && p.meter < meter) return false;
        if (budget && p.priceB > budget) return false;
        if (rooms === "۴+" && p.rooms < 4) return false;
        if (rooms && rooms !== "۴+" && p.rooms < Number(rooms)) return false;
        return true;
      });
      var box = document.getElementById("pardava-featured-grid");
      if (box) box.innerHTML = rows.map(pardavaCard).join("") || "<p>فایلی با این فیلتر در نمونه نیست.</p>";
      document.getElementById("pardava-featured").scrollIntoView({ behavior: "smooth" });
      pardavaToast(pardavaFa(rows.length) + " فایل نمایشی پیدا شد.");
    });
  }

  ["pardava-sell-form", "pardava-val-form", "pardava-view-form"].forEach(function (id) {
    var f = document.getElementById(id);
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      pardavaToast("درخواست شما ثبت نمایشی شد. سعید احمدی تماس واقعی نمی‌گیرد.");
      f.reset();
    });
  });

  var burger = document.getElementById("pardava-burger");
  var nav = document.getElementById("pardava-nav");
  if (burger && nav) burger.addEventListener("click", function () { nav.classList.toggle("is-open"); });

  var chart = document.getElementById("pardava-chart");
  if (chart) {
    var pts = [320, 328, 335, 340, 352, 360, 368, 390, 402, 410, 418, 420];
    var w = 520, h = 180, pad = 12;
    var line = pts.map(function (v, i) {
      var x = pad + (i / (pts.length - 1)) * (w - pad * 2);
      var y = h - pad - ((v - 300) / 140) * (h - pad * 2);
      return x + "," + y;
    }).join(" ");
    chart.innerHTML = '<polyline fill="none" stroke="#9a7b4f" stroke-width="2.4" points="' + line + '"/>';
  }

  var thumbs = document.getElementById("pardava-thumbs");
  var gimg = document.getElementById("pardava-gimg");
  if (thumbs && gimg) {
    var imgs = ["assets/images/p2.jpg", "assets/images/p3.jpg", "assets/images/p6.jpg", "assets/images/p7.jpg", "assets/images/hero.jpg"];
    thumbs.innerHTML = imgs.map(function (src, i) {
      return '<button type="button" class="' + (i === 0 ? "is-on" : "") + '" data-pardava-src="' + src + '"><img src="' + src + '" alt="تصویر ' + (i + 1) + '"></button>';
    }).join("");
    thumbs.addEventListener("click", function (e) {
      var b = e.target.closest("[data-pardava-src]");
      if (!b) return;
      gimg.src = b.getAttribute("data-pardava-src");
      thumbs.querySelectorAll("button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
    });
    var box = document.getElementById("pardava-lightbox");
    var limg = document.getElementById("pardava-lightbox-img");
    gimg.addEventListener("click", function () {
      if (!box) return;
      limg.src = gimg.src;
      box.classList.add("is-on");
    });
    if (box) box.addEventListener("click", function () { box.classList.remove("is-on"); });
  }

  var mort = document.getElementById("pardava-mortgage");
  if (mort) {
    mort.addEventListener("submit", function (e) {
      e.preventDefault();
      var price = Number(document.getElementById("pardava-m-price").value) || 0;
      var down = Number(document.getElementById("pardava-m-down").value) || 0;
      var years = Number(document.getElementById("pardava-m-years").value) || 1;
      var loan = Math.max(0, price - down);
      var monthly = (loan * 1.18) / (years * 12);
      document.getElementById("pardava-m-out").textContent =
        "قسط تقریبی نمایشی: حدود " + monthly.toFixed(2) + " میلیارد تومان در ماه. این عدد توصیه مالی نیست.";
    });
  }
})();
