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
    window.setTimeout(function () { el.classList.remove("is-on"); }, 2600);
  }
  function pardavaSvg(el, html) {
    if (!el) return;
    el.innerHTML = html;
  }
  function pardavaMax(arr) {
    return Math.max.apply(null, arr.concat([1]));
  }
  function pardavaPts(arr, w, h, pad) {
    var m = pardavaMax(arr);
    var n = arr.length;
    return arr.map(function (v, i) {
      var x = pad + (i / Math.max(n - 1, 1)) * (w - pad * 2);
      var y = h - pad - (v / m) * (h - pad * 2);
      return x.toFixed(1) + "," + y.toFixed(1);
    }).join(" ");
  }
  function pardavaArea(el, a, b) {
    if (!el) return;
    var w = 640, h = 240, p = 18;
    var pa = pardavaPts(a, w, h, p).split(" ");
    var line = pa.join(" ");
    var fill = p + "," + (h - p) + " " + line + " " + (w - p) + "," + (h - p);
    var extra = "";
    if (b) {
      extra = '<polyline fill="none" stroke="#8a9bb0" stroke-width="2" stroke-dasharray="5 4" points="' + pardavaPts(b, w, h, p) + '"/>';
    }
    pardavaSvg(el,
      '<defs><linearGradient id="pardava-ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d4bc86" stop-opacity=".45"/><stop offset="1" stop-color="#d4bc86" stop-opacity="0"/></linearGradient></defs>' +
      '<polygon fill="url(#pardava-ag)" points="' + fill + '"/>' +
      '<polyline fill="none" stroke="#d4bc86" stroke-width="2.4" points="' + line + '"/>' + extra
    );
  }
  function pardavaSpark(el, arr, color) {
    if (!el) return;
    pardavaSvg(el, '<polyline fill="none" stroke="' + color + '" stroke-width="2" points="' + pardavaPts(arr, 120, 42, 4) + '"/>');
  }
  function pardavaBars(el, labels, vals, vw, vh) {
    if (!el) return;
    vw = vw || 520; vh = vh || 180;
    var m = pardavaMax(vals);
    var gap = 10;
    var bw = (vw - 40 - gap * vals.length) / vals.length;
    var html = "";
    vals.forEach(function (v, i) {
      var bh = (v / m) * (vh - 40);
      var x = 20 + i * (bw + gap);
      var y = vh - 22 - bh;
      html += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + bh + '" rx="4" fill="' + (i % 2 ? "#97a8ba" : "#b8955a") + '"/>';
      html += '<text x="' + (x + bw / 2) + '" y="' + (vh - 6) + '" fill="#8b9aab" font-size="11" text-anchor="middle">' + labels[i] + "</text>";
    });
    pardavaSvg(el, html);
  }
  function pardavaDonut(el, items) {
    if (!el) return;
    var total = items.reduce(function (s, x) { return s + x.v; }, 0);
    var cx = 110, cy = 88, r = 58, r2 = 36, a = -Math.PI / 2;
    var html = "";
    items.forEach(function (it) {
      var slice = (it.v / total) * Math.PI * 2;
      var a2 = a + slice;
      var large = slice > Math.PI ? 1 : 0;
      var p1 = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      var p2 = [cx + r * Math.cos(a2), cy + r * Math.sin(a2)];
      var q1 = [cx + r2 * Math.cos(a2), cy + r2 * Math.sin(a2)];
      var q2 = [cx + r2 * Math.cos(a), cy + r2 * Math.sin(a)];
      html += '<path d="M' + p1[0] + " " + p1[1] + " A" + r + " " + r + " 0 " + large + " 1 " + p2[0] + " " + p2[1] +
        " L" + q1[0] + " " + q1[1] + " A" + r2 + " " + r2 + " 0 " + large + " 0 " + q2[0] + " " + q2[1] + ' Z" fill="' + it.c + '"/>';
      a = a2;
    });
    html += '<text x="' + cx + '" y="' + (cy + 4) + '" text-anchor="middle" fill="#e8eef4" font-size="13">سهم</text>';
    pardavaSvg(el, html);
    var leg = document.getElementById("pardava-donut-leg");
    if (leg) {
      leg.innerHTML = items.map(function (it) {
        return '<span><i class="pardava-dot" style="background:' + it.c + '"></i>' + it.n + " " + pardavaFa(it.v) + "٪</span>";
      }).join("");
    }
  }
  function pardavaGauge(el, val) {
    if (!el) return;
    var t = Math.max(0, Math.min(100, val)) / 100;
    var a0 = Math.PI * 0.8, a1 = Math.PI * 2.2;
    var a = a0 + (a1 - a0) * t;
    function pt(ang, r) { return [110 + r * Math.cos(ang), 100 + r * Math.sin(ang)]; }
    var s = pt(a0, 70), e = pt(a1, 70), n = pt(a, 70);
    pardavaSvg(el,
      '<path d="M' + s[0] + " " + s[1] + " A70 70 0 1 1 " + e[0] + " " + e[1] + '" fill="none" stroke="#1a2d48" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M' + s[0] + " " + s[1] + " A70 70 0 1 1 " + n[0] + " " + n[1] + '" fill="none" stroke="#d4bc86" stroke-width="12" stroke-linecap="round"/>' +
      '<text x="110" y="108" text-anchor="middle" fill="#e8eef4" font-size="22" font-weight="700">' + pardavaFa(val) + "</text>"
    );
    var gv = document.getElementById("pardava-gauge-val");
    if (gv) gv.textContent = pardavaFa(val) + " از ۱۰۰";
  }

  var PARDAVA = {
    range: "30",
    page: 1,
    per: 5,
    sort: "rev",
    dir: -1,
    q: "",
    kpis: {
      "7": { k1: "۴٫۹ میلیارد", k2: "۱٬۱۰۴", k3: "۴٫۱٪", k4: "۴٫۴ میلیون", d1: "+۶٪", d2: "+۳٪", d3: "+۰٫۲٪", d4: "+۱٪" },
      "30": { k1: "۱۸٫۴ میلیارد", k2: "۴٬۲۱۸", k3: "۳٫۸٪", k4: "۴٫۳ میلیون", d1: "+۱۲٪", d2: "+۸٪", d3: "−۰٫۴٪", d4: "+۵٪" },
      "90": { k1: "۵۱٫۲ میلیارد", k2: "۱۲٬۴۴۰", k3: "۳٫۶٪", k4: "۴٫۱ میلیون", d1: "+۹٪", d2: "+۱۱٪", d3: "−۰٫۷٪", d4: "+۲٪" }
    },
    series: {
      "7": [2.1, 2.4, 2.0, 2.8, 3.1, 2.7, 3.4],
      "30": [1.8, 2.1, 2.0, 2.4, 2.2, 2.8, 3.0, 2.6, 3.2, 3.1, 3.6, 3.4, 3.9, 3.5, 4.1, 3.8, 4.0, 4.4, 4.2, 4.6, 4.3, 4.8, 5.0, 4.7, 5.2, 5.1, 5.4, 5.0, 5.6, 5.8],
      "90": [1.6, 1.8, 2.0, 2.2, 2.1, 2.5, 2.7, 2.4, 2.9, 3.1, 2.8, 3.3, 3.6, 3.4, 3.8, 4.0, 3.7, 4.2, 4.5, 4.3, 4.8, 5.0, 4.7, 5.2, 5.5]
    },
    target: [2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.2, 4.4, 4.6, 4.8, 5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6, 6.1, 6.2, 6.3, 6.4],
    spark: [
      [12, 14, 13, 16, 18, 17, 21, 19, 22, 24],
      [20, 18, 22, 21, 25, 24, 28, 26, 30, 29],
      [8, 9, 8, 7, 8, 7, 6, 7, 6, 6],
      [10, 11, 12, 11, 13, 14, 13, 15, 16, 15]
    ],
    donut: [
      { n: "جستجو", v: 38, c: "#d4bc86" },
      { n: "مستقیم", v: 24, c: "#97a8ba" },
      { n: "شبکه", v: 21, c: "#6fbfa3" },
      { n: "ایمیل", v: 17, c: "#c46b6b" }
    ],
    cats: { l: ["خانه", "پوشاک", "کالای دیجیتال", "سفر", "کتاب"], v: [62, 48, 71, 33, 22] },
    regions: [
      ["تهران", 86], ["اصفهان", 64], ["خراسان رضوی", 58], ["فارس", 41], ["آذربایجان شرقی", 36]
    ],
    campaigns: [
      { name: "نوروز شمال", ch: "جستجو", rev: 1840, cvr: 4.2, st: "فعال" },
      { name: "تابستان خلیج", ch: "شبکه", rev: 1320, cvr: 3.1, st: "فعال" },
      { name: "بازگشت مهر", ch: "ایمیل", rev: 980, cvr: 5.4, st: "پایان" },
      { name: "جمعه سیاه تستی", ch: "مستقیم", rev: 2210, cvr: 6.1, st: "فعال" },
      { name: "کمپین کوهستان", ch: "جستجو", rev: 740, cvr: 2.8, st: "توقف" },
      { name: "شب‌های شهر", ch: "شبکه", rev: 1560, cvr: 3.9, st: "فعال" },
      { name: "کاتالوگ معماری", ch: "ایمیل", rev: 610, cvr: 2.2, st: "فعال" },
      { name: "پیشنهاد وفاداری", ch: "مستقیم", rev: 890, cvr: 4.8, st: "فعال" }
    ],
    pages: [
      ["/landing/north", 12400, 28, 4.1],
      ["/shop/home", 9800, 31, 3.4],
      ["/blog/light", 6400, 42, 1.1],
      ["/checkout", 4100, 18, 22.0],
      ["/gallery", 3900, 36, 2.0],
      ["/pricing", 2700, 33, 3.8]
    ],
    reports: [
      { t: "خلاصه فروش هفتگی", k: "sales", r: "۷ روز", o: "کیان رستمی", s: "آماده" },
      { t: "ترافیک کانال‌ها", k: "ops", r: "۳۰ روز", o: "سامان مرادی", s: "آماده" },
      { t: "ریسک نرخ پرش", k: "risk", r: "۳۰ روز", o: "آرمان نوری", s: "پیش‌نویس" },
      { t: "تحقق بودجه فصل", k: "sales", r: "۹۰ روز", o: "کیان رستمی", s: "آماده" },
      { t: "پایداری سرویس", k: "ops", r: "۷ روز", o: "نیکان جعفری", s: "آرشیو" },
      { t: "هشدار آستانه مالی", k: "risk", r: "۳۰ روز", o: "سامان مرادی", s: "آماده" }
    ],
    alerts: [
      { lv: "bad", t: "نرخ پرش از ۴۰٪ گذشت", d: "صفحه فرود شمال — متن تستی", tm: "۱۲ دقیقه پیش" },
      { lv: "warn", t: "تأخیر در همگام‌سازی انبار", d: "صف ۹۴ مورد مانده", tm: "۴۵ دقیقه پیش" },
      { lv: "ok", t: "پشتیبان‌گیری شبانه کامل شد", d: "حجم ۲٫۱ گیگ — آزمایشی", tm: "۲ ساعت پیش" },
      { lv: "warn", t: "کمپین کوهستان زیر هدف", d: "تحقق ۶۸٪ از پلن", tm: "دیروز" },
      { lv: "ok", t: "گواهی SSL تمدید شد", d: "اعتبار ۳۶۵ روز تستی", tm: "۲ روز پیش" }
    ],
    feed: [
      ["سفارش تستی از اصفهان ثبت شد", "همین حالا"],
      ["کمپین شب‌های شهر به سقف بودجه رسید", "۸ دقیقه پیش"],
      ["خروجی مالی قفل آزمایشی شد", "۲۰ دقیقه پیش"],
      ["همگام‌سازی استان فارس تمام شد", "۱ ساعت پیش"]
    ]
  };

  function pardavaKpis() {
    var k = PARDAVA.kpis[PARDAVA.range];
    ["k1", "k2", "k3", "k4"].forEach(function (id) {
      var el = document.getElementById("pardava-" + id);
      if (el) el.textContent = k[id];
    });
    ["d1", "d2", "d3", "d4"].forEach(function (id) {
      var el = document.getElementById("pardava-" + id);
      if (!el) return;
      el.textContent = k[id];
      el.classList.toggle("is-down", k[id].indexOf("−") === 0);
      el.classList.toggle("is-up", k[id].indexOf("−") !== 0);
    });
    var clock = document.getElementById("pardava-clock");
    if (clock) clock.textContent = "۱۲ مرداد ۱۴۰۴ — بازه " + pardavaFa(PARDAVA.range) + " روز";
  }
  function pardavaHeat() {
    var box = document.getElementById("pardava-heat");
    if (!box) return;
    var html = "";
    for (var i = 0; i < 84; i++) {
      var v = (Math.sin(i * 0.47) + 1) / 2;
      html += '<i style="background:color-mix(in oklab, #d4bc86 ' + (v * 80).toFixed(0) + '%, #1a2d48)"></i>';
    }
    box.innerHTML = html;
  }
  function pardavaRegions() {
    var box = document.getElementById("pardava-regions");
    if (!box) return;
    box.innerHTML = PARDAVA.regions.map(function (r) {
      return '<div class="pardava-barrow"><span>' + r[0] + '</span><span class="pardava-track"><i style="width:' + r[1] + '%"></i></span><b>' + pardavaFa(r[1]) + "٪</b></div>";
    }).join("");
  }
  function pardavaFeed() {
    var box = document.getElementById("pardava-feed");
    if (!box) return;
    box.innerHTML = PARDAVA.feed.map(function (f) {
      return "<article><i></i><div>" + f[0] + "<br><time>" + f[1] + "</time></div></article>";
    }).join("");
  }
  function pardavaDevices() {
    var box = document.getElementById("pardava-devices");
    if (!box) return;
    var rows = [["موبایل", 58], ["دسکتاپ", 31], ["تبلت", 11]];
    box.innerHTML = rows.map(function (r) {
      return '<div class="pardava-barrow"><span>' + r[0] + '</span><span class="pardava-track"><i style="width:' + r[1] + '%"></i></span><b>' + pardavaFa(r[1]) + "٪</b></div>";
    }).join("");
  }
  function pardavaStatus(st) {
    var cls = st === "فعال" || st === "آماده" ? "is-ok" : st === "توقف" || st === "پیش‌نویس" ? "is-warn" : "is-bad";
    if (st === "پایان" || st === "آرشیو") cls = "is-warn";
    return '<span class="pardava-pill ' + cls + '">' + st + "</span>";
  }
  function pardavaTable() {
    var tb = document.querySelector("#pardava-table tbody");
    if (!tb) return;
    var rows = PARDAVA.campaigns.filter(function (r) {
      return !PARDAVA.q || (r.name + r.ch).indexOf(PARDAVA.q) !== -1;
    });
    rows.sort(function (a, b) {
      var va = a[PARDAVA.sort], vb = b[PARDAVA.sort];
      if (va < vb) return -1 * PARDAVA.dir;
      if (va > vb) return 1 * PARDAVA.dir;
      return 0;
    });
    var start = (PARDAVA.page - 1) * PARDAVA.per;
    var slice = rows.slice(start, start + PARDAVA.per);
    tb.innerHTML = slice.map(function (r) {
      return "<tr><td>" + r.name + "</td><td>" + r.ch + "</td><td>" + pardavaFa(r.rev) + "</td><td>" + pardavaFa(r.cvr) + "٪</td><td>" + pardavaStatus(r.st) + "</td></tr>";
    }).join("") || '<tr><td colspan="5" class="pardava-empty">موردی مطابق جستجو نیست.</td></tr>';
    var pages = Math.max(1, Math.ceil(rows.length / PARDAVA.per));
    var pg = document.getElementById("pardava-pager");
    if (pg) {
      pg.innerHTML = Array.from({ length: pages }, function (_, i) {
        var n = i + 1;
        return '<button type="button" class="' + (n === PARDAVA.page ? "is-on" : "") + '" data-pardava-page="' + n + '">' + pardavaFa(n) + "</button>";
      }).join("");
    }
  }
  function pardavaPages() {
    var tb = document.querySelector("#pardava-pages tbody");
    if (!tb) return;
    tb.innerHTML = PARDAVA.pages.map(function (p) {
      return "<tr><td dir='ltr'>" + p[0] + "</td><td>" + pardavaFa(p[1]) + "</td><td>" + pardavaFa(p[2]) + "٪</td><td>" + pardavaFa(p[3]) + "٪</td></tr>";
    }).join("");
  }
  function pardavaReports(kind) {
    var tb = document.querySelector("#pardava-reports tbody");
    if (!tb) return;
    var rows = PARDAVA.reports.filter(function (r) { return kind === "all" || r.k === kind; });
    tb.innerHTML = rows.map(function (r) {
      return "<tr><td>" + r.t + "</td><td>" + r.k + "</td><td>" + r.r + "</td><td>" + r.o + "</td><td>" + pardavaStatus(r.s) + "</td></tr>";
    }).join("");
  }
  function pardavaAlerts() {
    var box = document.getElementById("pardava-alert-list");
    if (!box) return;
    box.innerHTML = '<div class="pardava-card__head"><h3>صف هشدار</h3><span>۵ مورد تستی</span></div>' + PARDAVA.alerts.map(function (a) {
      var c = a.lv === "ok" ? "#6fbfa3" : a.lv === "warn" ? "#d4a05a" : "#c46b6b";
      return '<div class="pardava-alert"><i style="background:' + c + '"></i><div><b>' + a.t + "</b><span class='pardava-note'>" + a.d + "</span></div><time class='pardava-note'>" + a.tm + "</time></div>";
    }).join("");
  }

  function pardavaDraw() {
    pardavaKpis();
    pardavaSpark(document.getElementById("pardava-sp1"), PARDAVA.spark[0], "#d4bc86");
    pardavaSpark(document.getElementById("pardava-sp2"), PARDAVA.spark[1], "#6fbfa3");
    pardavaSpark(document.getElementById("pardava-sp3"), PARDAVA.spark[2], "#c46b6b");
    pardavaSpark(document.getElementById("pardava-sp4"), PARDAVA.spark[3], "#97a8ba");
    pardavaArea(document.getElementById("pardava-area"), PARDAVA.series[PARDAVA.range], PARDAVA.range === "30" ? PARDAVA.target : null);
    pardavaDonut(document.getElementById("pardava-donut"), PARDAVA.donut);
    pardavaBars(document.getElementById("pardava-bars"), PARDAVA.cats.l, PARDAVA.cats.v);
    pardavaGauge(document.getElementById("pardava-gauge"), 74);
    pardavaHeat();
    pardavaRegions();
    pardavaFeed();
    pardavaTable();
    pardavaArea(document.getElementById("pardava-dual"), PARDAVA.series["30"], PARDAVA.target);
    pardavaArea(document.getElementById("pardava-hourly"), [8, 6, 5, 4, 5, 9, 14, 22, 28, 31, 29, 33, 36, 34, 30, 32, 38, 41, 37, 28, 22, 18, 14, 10]);
    pardavaDevices();
    pardavaPages();
    pardavaReports(document.getElementById("pardava-report-kind") ? document.getElementById("pardava-report-kind").value : "all");
    pardavaAlerts();
    pardavaBars(document.getElementById("pardava-alert-bars"), ["بحرانی", "هشدار", "اطلاع"], [4, 9, 14], 280, 180);
  }

  function pardavaView(name) {
    document.querySelectorAll(".pardava-view").forEach(function (v) {
      v.classList.toggle("is-on", v.id === "pardava-view-" + name);
    });
    document.querySelectorAll(".pardava-nav__btn").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-pardava-view") === name);
    });
    var app = document.getElementById("pardava-app");
    if (app) app.classList.remove("is-open");
    var scrim = document.getElementById("pardava-scrim");
    if (scrim) scrim.classList.remove("is-on");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  var app = document.getElementById("pardava-app");
  var burger = document.getElementById("pardava-burger");
  var scrim = document.getElementById("pardava-scrim");
  if (burger) {
    burger.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 900px)").matches) {
        app.classList.toggle("is-open");
        scrim.classList.toggle("is-on", app.classList.contains("is-open"));
      } else {
        app.classList.toggle("is-collapsed");
      }
    });
  }
  if (scrim) scrim.addEventListener("click", function () {
    app.classList.remove("is-open");
    scrim.classList.remove("is-on");
  });

  document.getElementById("pardava-nav").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-pardava-view]");
    if (!btn) return;
    pardavaView(btn.getAttribute("data-pardava-view"));
  });

  document.getElementById("pardava-period").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-pardava-range]");
    if (!btn) return;
    PARDAVA.range = btn.getAttribute("data-pardava-range");
    document.querySelectorAll("#pardava-period button").forEach(function (b) {
      b.classList.toggle("is-on", b === btn);
    });
    pardavaDraw();
    pardavaToast("بازه به " + pardavaFa(PARDAVA.range) + " روز تغییر کرد. این متن تستی است.");
  });

  var search = document.getElementById("pardava-search");
  if (search) {
    search.addEventListener("input", function () {
      PARDAVA.q = search.value.trim();
      PARDAVA.page = 1;
      pardavaTable();
    });
  }

  var table = document.getElementById("pardava-table");
  if (table) {
    table.addEventListener("click", function (e) {
      var th = e.target.closest("[data-pardava-sort]");
      if (!th) return;
      var key = th.getAttribute("data-pardava-sort");
      PARDAVA.dir = PARDAVA.sort === key ? -PARDAVA.dir : -1;
      PARDAVA.sort = key;
      pardavaTable();
    });
  }
  var pager = document.getElementById("pardava-pager");
  if (pager) {
    pager.addEventListener("click", function (e) {
      var b = e.target.closest("[data-pardava-page]");
      if (!b) return;
      PARDAVA.page = Number(b.getAttribute("data-pardava-page"));
      pardavaTable();
    });
  }

  var bell = document.getElementById("pardava-bell");
  var drop = document.getElementById("pardava-bell-drop");
  if (bell && drop) {
    bell.addEventListener("click", function (e) {
      e.stopPropagation();
      drop.classList.toggle("is-open");
    });
    document.addEventListener("click", function () { drop.classList.remove("is-open"); });
  }

  var exp = document.getElementById("pardava-export");
  if (exp) exp.addEventListener("click", function () {
    pardavaToast("خروجی CSV آزمایشی آماده شد. فایل واقعی ساخته نمی‌شود.");
  });
  var pr = document.getElementById("pardava-print");
  if (pr) pr.addEventListener("click", function () { window.print(); });

  var kind = document.getElementById("pardava-report-kind");
  if (kind) kind.addEventListener("change", function () { pardavaReports(kind.value); });

  document.querySelectorAll("[data-pardava-toggle]").forEach(function (t) {
    t.addEventListener("click", function () { t.classList.toggle("is-on"); });
  });
  var form = document.getElementById("pardava-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      pardavaToast("تنظیمات نمایشی ذخیره شد. این متن تستی است.");
    });
  }

  window.addEventListener("resize", function () {
    window.clearTimeout(pardavaDraw._t);
    pardavaDraw._t = window.setTimeout(pardavaDraw, 180);
  });

  pardavaDraw();
})();
