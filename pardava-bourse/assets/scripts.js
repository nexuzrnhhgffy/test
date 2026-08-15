(function () {
  var fa = "۰۱۲۳۴۵۶۷۸۹";
  function pardavaFa(n, d) {
    if (typeof n === "number") {
      n = d != null ? n.toFixed(d) : String(Math.round(n));
    }
    return String(n).replace(/\d/g, function (c) { return fa[c]; }).replace(/-/g, "−");
  }
  function pardavaSep(n) {
    var s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
    return pardavaFa(s);
  }
  function pardavaToast(msg) {
    var el = document.getElementById("pardava-toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-on");
    window.setTimeout(function () { el.classList.remove("is-on"); }, 2400);
  }
  function pardavaChg(v) {
    var cls = v >= 0 ? "is-up" : "is-down";
    var sign = v >= 0 ? "+" : "";
    return '<span class="pardava-chg ' + cls + '">' + sign + pardavaFa(v, 2) + "٪</span>";
  }

  var PARDAVA = {
    selected: "فولاد",
    board: "all",
    mover: "up",
    news: "all",
    sort: "vol",
    dir: -1,
    q: "",
    watch: [],
    idx: { tedpix: 2148320, equal: 718450, tedOpen: 2139300, eqOpen: 719740 },
    symbols: [
      { name: "فولاد", full: "فولاد مبارکه", ind: "فلزات", price: 4210, open: 4188, vol: 182400000, pe: 6.4, q: "buy" },
      { name: "شپنا", full: "پالایش نفت اصفهان", ind: "پالایشی", price: 18640, open: 18810, vol: 42100000, pe: 8.1, q: "" },
      { name: "خودرو", full: "ایران‌خودرو", ind: "خودرو", price: 3125, open: 3200, vol: 256000000, pe: 0, q: "sell" },
      { name: "خساپا", full: "سایپا", ind: "خودرو", price: 2410, open: 2388, vol: 198000000, pe: 0, q: "" },
      { name: "وبملت", full: "بانک ملت", ind: "بانک", price: 3750, open: 3712, vol: 90300000, pe: 4.8, q: "" },
      { name: "وتجارت", full: "بانک تجارت", ind: "بانک", price: 1620, open: 1644, vol: 110200000, pe: 5.2, q: "sell" },
      { name: "کگل", full: "گل‌گهر", ind: "معدن", price: 12480, open: 12310, vol: 18400000, pe: 7.3, q: "buy" },
      { name: "کچاد", full: "چادرملو", ind: "معدن", price: 9870, open: 9920, vol: 22100000, pe: 6.9, q: "" },
      { name: "شبندر", full: "پالایش بندرعباس", ind: "پالایشی", price: 22150, open: 21840, vol: 15300000, pe: 7.7, q: "" },
      { name: "فارس", full: "صنایع پتروشیمی خلیج فارس", ind: "شیمیایی", price: 18400, open: 18220, vol: 9800000, pe: 9.4, q: "" },
      { name: "رمپنا", full: "گروه مپنا", ind: "برق", price: 8640, open: 8710, vol: 27400000, pe: 11.2, q: "" },
      { name: "اخابر", full: "مخابرات ایران", ind: "ارتباطات", price: 1290, open: 1274, vol: 64000000, pe: 12.1, q: "buy" },
      { name: "همراه", full: "همراه‌اول", ind: "ارتباطات", price: 4520, open: 4488, vol: 33100000, pe: 10.5, q: "" },
      { name: "شستا", full: "سرمایه‌گذاری تأمین اجتماعی", ind: "چندرشته", price: 1188, open: 1204, vol: 210000000, pe: 5.6, q: "sell" },
      { name: "پارسان", full: "نفت و گاز پارسیان", ind: "شیمیایی", price: 7340, open: 7210, vol: 12600000, pe: 8.8, q: "buy" },
      { name: "حکشتی", full: "کشتیرانی", ind: "حمل‌ونقل", price: 15680, open: 15520, vol: 8900000, pe: 6.1, q: "" }
    ],
    newsItems: [
      { k: "macro", t: "نرخ بهره بین‌بانکی در سطح آزمایشی ثابت ماند", d: "۲ ساعت پیش" },
      { k: "co", t: "فولاد مبارکه گزارش تولید ماه را منتشر کرد — متن تستی", d: "۳ ساعت پیش" },
      { k: "macro", t: "ارزش معاملات خرد به محدوده متعادل رسید", d: "۵ ساعت پیش" },
      { k: "co", t: "شبندر از برنامه تعمیرات دوره‌ای خبر داد", d: "دیروز" },
      { k: "co", t: "وبملت افزایش سرمایه را در حد تست ثبت کرد", d: "دیروز" },
      { k: "macro", t: "نقشه صنایع فلزی امروز سبزتر از خودرو بود", d: "۲ روز پیش" }
    ],
    cal: [
      ["شنبه", "مجمع آزمایشی فارس"],
      ["یکشنبه", "گزارش ماهانه شپنا"],
      ["دوشنبه", "عرضه اولیه ساختگی"],
      ["سه‌شنبه", "توقف نماد رمپنا — تست"],
      ["چهارشنبه", "انتشار آمار ارزش معاملات"]
    ],
    sectors: [
      ["فلزات", 18, "#0d7a4f"],
      ["بانک", 14, "#16324f"],
      ["پالایشی", 12, "#1f6b4a"],
      ["شیمیایی", 11, "#2a4d6e"],
      ["خودرو", 9, "#c23b32"],
      ["معدن", 8, "#0f6a58"],
      ["ارتباطات", 6, "#3d5a73"],
      ["سایر", 5, "#6b7280"]
    ]
  };

  try {
    PARDAVA.watch = JSON.parse(localStorage.getItem("pardava-watch") || "[]");
  } catch (e) {
    PARDAVA.watch = [];
  }

  PARDAVA.symbols.forEach(function (s) {
    s.high = s.price;
    s.low = s.price;
    s.hist = [];
    var p = s.open;
    for (var i = 0; i < 40; i++) {
      p = p * (1 + (Math.random() - 0.48) * 0.008);
      s.hist.push(p);
    }
    s.hist.push(s.price);
  });

  function pardavaFind(name) {
    return PARDAVA.symbols.filter(function (s) { return s.name === name; })[0];
  }
  function pardavaPct(s) {
    return ((s.price - s.open) / s.open) * 100;
  }

  function pardavaDrawChart(sym) {
    var el = document.getElementById("pardava-svg");
    if (!el || !sym) return;
    var w = 640, h = 220, pad = 12;
    var arr = sym.hist;
    var min = Math.min.apply(null, arr);
    var max = Math.max.apply(null, arr);
    var span = max - min || 1;
    var pts = arr.map(function (v, i) {
      var x = pad + (i / (arr.length - 1)) * (w - pad * 2);
      var y = h - pad - ((v - min) / span) * (h - pad * 2);
      return x.toFixed(1) + "," + y.toFixed(1);
    });
    var up = sym.price >= sym.open;
    var col = up ? "#0d7a4f" : "#c23b32";
    var fill = pad + "," + (h - pad) + " " + pts.join(" ") + " " + (w - pad) + "," + (h - pad);
    el.innerHTML =
      '<defs><linearGradient id="pardava-cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + col + '" stop-opacity=".28"/><stop offset="1" stop-color="' + col + '" stop-opacity="0"/></linearGradient></defs>' +
      '<polygon fill="url(#pardava-cg)" points="' + fill + '"/>' +
      '<polyline fill="none" stroke="' + col + '" stroke-width="2.2" points="' + pts.join(" ") + '"/>';
  }

  function pardavaBook(sym) {
    var bid = document.getElementById("pardava-bid");
    var ask = document.getElementById("pardava-ask");
    if (!bid || !ask) return;
    var rows = "";
    var rows2 = "";
    for (var i = 0; i < 4; i++) {
      var bp = Math.round(sym.price * (1 - 0.002 * (i + 1)));
      var ap = Math.round(sym.price * (1 + 0.002 * (i + 1)));
      var v = Math.round((4 - i) * 120000 + Math.random() * 40000);
      rows += "<li><span class='pardava-num'>" + pardavaSep(bp) + "</span><span>" + pardavaSep(v) + "</span></li>";
      rows2 += "<li><span class='pardava-num'>" + pardavaSep(ap) + "</span><span>" + pardavaSep(v * 0.8) + "</span></li>";
    }
    bid.innerHTML = rows;
    ask.innerHTML = rows2;
  }

  function pardavaSelect(name) {
    var sym = pardavaFind(name);
    if (!sym) return;
    PARDAVA.selected = name;
    document.getElementById("pardava-sel-name").textContent = name + " — " + sym.full;
    document.getElementById("pardava-sel-price").textContent = pardavaSep(sym.price);
    var ch = document.getElementById("pardava-sel-ch");
    ch.innerHTML = pardavaChg(pardavaPct(sym));
    document.getElementById("pardava-sel-open").textContent = pardavaSep(sym.open);
    document.getElementById("pardava-sel-low").textContent = pardavaSep(sym.low);
    document.getElementById("pardava-sel-high").textContent = pardavaSep(sym.high);
    document.getElementById("pardava-sel-vol").textContent = pardavaSep(sym.vol);
    document.getElementById("pardava-sel-pe").textContent = sym.pe ? pardavaFa(sym.pe, 1) : "—";
    var pin = document.getElementById("pardava-pin");
    pin.textContent = PARDAVA.watch.indexOf(name) >= 0 ? "حذف از دیده‌بان" : "افزودن به دیده‌بان";
    pardavaDrawChart(sym);
    pardavaBook(sym);
    pardavaBoard();
  }

  function pardavaTape() {
    var el = document.getElementById("pardava-tape");
    if (!el) return;
    var html = PARDAVA.symbols.map(function (s) {
      var p = pardavaPct(s);
      return "<span><b>" + s.name + "</b><span class='pardava-num'>" + pardavaSep(s.price) + "</span> " + pardavaChg(p) + "</span>";
    }).join("");
    el.innerHTML = html + html;
  }

  function pardavaIndices() {
    var t = PARDAVA.idx.tedpix;
    var e = PARDAVA.idx.equal;
    var tc = ((t - PARDAVA.idx.tedOpen) / PARDAVA.idx.tedOpen) * 100;
    var ec = ((e - PARDAVA.idx.eqOpen) / PARDAVA.idx.eqOpen) * 100;
    document.getElementById("pardava-tedpix").textContent = pardavaSep(t);
    document.getElementById("pardava-equal").textContent = pardavaSep(e);
    var tch = document.getElementById("pardava-tedpix-ch");
    var ech = document.getElementById("pardava-equal-ch");
    tch.className = "pardava-chg " + (tc >= 0 ? "is-up" : "is-down");
    ech.className = "pardava-chg " + (ec >= 0 ? "is-up" : "is-down");
    tch.textContent = (tc >= 0 ? "+" : "") + pardavaFa(tc, 2) + "٪";
    ech.textContent = (ec >= 0 ? "+" : "") + pardavaFa(ec, 2) + "٪";
    var val = PARDAVA.symbols.reduce(function (a, s) { return a + s.price * s.vol; }, 0) / 1e13;
    document.getElementById("pardava-value").textContent = pardavaFa(val, 1) + " همت";
    var vol = PARDAVA.symbols.reduce(function (a, s) { return a + s.vol; }, 0) / 1e9;
    document.getElementById("pardava-volume").textContent = pardavaFa(vol, 1) + " میلیارد";
    var buy = PARDAVA.symbols.filter(function (s) { return s.q === "buy"; }).length;
    var sell = PARDAVA.symbols.filter(function (s) { return s.q === "sell"; }).length;
    document.getElementById("pardava-queue").textContent = pardavaFa(buy) + " / " + pardavaFa(sell);
  }

  function pardavaFiltered() {
    var q = PARDAVA.q;
    return PARDAVA.symbols.filter(function (s) {
      if (q && (s.name + s.full + s.ind).indexOf(q) === -1) return false;
      if (PARDAVA.board === "watch") return PARDAVA.watch.indexOf(s.name) >= 0;
      if (PARDAVA.board === "buy") return s.q === "buy";
      if (PARDAVA.board === "sell") return s.q === "sell";
      return true;
    }).sort(function (a, b) {
      var va = PARDAVA.sort === "chg" ? pardavaPct(a) : PARDAVA.sort === "value" ? a.price * a.vol : a[PARDAVA.sort];
      var vb = PARDAVA.sort === "chg" ? pardavaPct(b) : PARDAVA.sort === "value" ? b.price * b.vol : b[PARDAVA.sort];
      if (va < vb) return -1 * PARDAVA.dir;
      if (va > vb) return 1 * PARDAVA.dir;
      return 0;
    });
  }

  function pardavaBoard() {
    var tb = document.querySelector("#pardava-board tbody");
    if (!tb) return;
    var rows = pardavaFiltered();
    tb.innerHTML = rows.map(function (s) {
      var p = pardavaPct(s);
      var on = s.name === PARDAVA.selected ? " is-on" : "";
      var st = s.q === "buy" ? "صف خرید" : s.q === "sell" ? "صف فروش" : "مجاز";
      var star = PARDAVA.watch.indexOf(s.name) >= 0 ? "is-on" : "";
      return "<tr data-pardava-sym='" + s.name + "' class='" + on + "'>" +
        "<td><button class='pardava-star " + star + "' type='button' data-pardava-star='" + s.name + "'>★</button></td>" +
        "<td><b>" + s.name + "</b> <span class='pardava-note'>" + s.full + "</span></td>" +
        "<td class='pardava-num' data-pardava-px='" + s.name + "'>" + pardavaSep(s.price) + "</td>" +
        "<td>" + pardavaChg(p) + "</td>" +
        "<td class='pardava-num'>" + pardavaSep(s.vol) + "</td>" +
        "<td class='pardava-num'>" + pardavaFa(s.price * s.vol / 1e10, 1) + "</td>" +
        "<td>" + s.ind + "</td>" +
        "<td>" + st + "</td></tr>";
    }).join("") || "<tr><td colspan='8'>نمادی در این فیلتر نیست.</td></tr>";
  }

  function pardavaMovers() {
    var el = document.getElementById("pardava-movers");
    if (!el) return;
    var rows = PARDAVA.symbols.slice();
    if (PARDAVA.mover === "up") rows.sort(function (a, b) { return pardavaPct(b) - pardavaPct(a); });
    else if (PARDAVA.mover === "down") rows.sort(function (a, b) { return pardavaPct(a) - pardavaPct(b); });
    else rows.sort(function (a, b) { return b.vol - a.vol; });
    el.innerHTML = rows.slice(0, 7).map(function (s) {
      return "<li data-pardava-sym='" + s.name + "'><b>" + s.name + "</b><span class='pardava-num'>" + pardavaSep(s.price) + "</span>" + pardavaChg(pardavaPct(s)) + "</li>";
    }).join("");
  }

  function pardavaNews() {
    var el = document.getElementById("pardava-news-list");
    if (!el) return;
    el.innerHTML = PARDAVA.newsItems.filter(function (n) {
      return PARDAVA.news === "all" || n.k === PARDAVA.news;
    }).map(function (n) {
      return "<article><div><time>" + n.d + "</time><h3>" + n.t + "</h3></div></article>";
    }).join("");
  }

  function pardavaSectors() {
    var el = document.getElementById("pardava-sectors");
    if (!el) return;
    el.innerHTML = PARDAVA.sectors.map(function (s) {
      return "<button type='button' style='background:" + s[2] + ";grid-column:span 1'><span>" + s[0] + "</span><b>" + pardavaFa(s[1]) + "٪</b></button>";
    }).join("");
  }

  function pardavaCal() {
    var el = document.getElementById("pardava-cal");
    if (!el) return;
    el.innerHTML = PARDAVA.cal.map(function (c) {
      return "<li><span>" + c[0] + "</span><b>" + c[1] + "</b></li>";
    }).join("");
  }

  function pardavaClock() {
    var el = document.getElementById("pardava-clock");
    var sess = document.getElementById("pardava-session");
    var now = new Date();
    var tehran = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tehran" }));
    var hh = tehran.getHours();
    var mm = tehran.getMinutes();
    var day = tehran.getDay();
    var open = day >= 6 || day <= 3;
    var hours = hh > 9 || (hh === 9 && mm >= 0);
    var beforeClose = hh < 12 || (hh === 12 && mm <= 30);
    var isOpen = open && hours && beforeClose;
    if (el) el.textContent = tehran.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
    if (sess) {
      sess.className = "pardava-pill " + (isOpen ? "is-open" : "is-closed");
      sess.innerHTML = "<i></i><span>" + (isOpen ? "جلسه آزمایشی باز" : "جلسه آزمایشی بسته") + "</span>";
    }
  }

  function pardavaTick() {
    PARDAVA.symbols.forEach(function (s) {
      var drift = (Math.random() - 0.49) * s.price * 0.004;
      s.price = Math.max(10, s.price + drift);
      s.high = Math.max(s.high, s.price);
      s.low = Math.min(s.low, s.price);
      s.vol += Math.floor(Math.random() * 25000);
      s.hist.push(s.price);
      if (s.hist.length > 48) s.hist.shift();
    });
    PARDAVA.idx.tedpix *= 1 + (Math.random() - 0.48) * 0.0012;
    PARDAVA.idx.equal *= 1 + (Math.random() - 0.5) * 0.0014;
    pardavaTape();
    pardavaIndices();
    pardavaMovers();
    pardavaBoard();
    pardavaSelect(PARDAVA.selected);
    var px = document.querySelector('[data-pardava-px="' + PARDAVA.selected + '"]');
    if (px) {
      var up = pardavaFind(PARDAVA.selected).price >= pardavaFind(PARDAVA.selected).open;
      px.classList.remove("is-flash-up", "is-flash-down");
      void px.offsetWidth;
      px.classList.add(up ? "is-flash-up" : "is-flash-down");
    }
  }

  function pardavaToggleWatch(name) {
    var i = PARDAVA.watch.indexOf(name);
    if (i >= 0) PARDAVA.watch.splice(i, 1);
    else PARDAVA.watch.push(name);
    try { localStorage.setItem("pardava-watch", JSON.stringify(PARDAVA.watch)); } catch (e) {}
    pardavaSelect(PARDAVA.selected);
    pardavaToast(i >= 0 ? "از دیده‌بان حذف شد." : "به دیده‌بان اضافه شد.");
  }

  function pardavaDrawer(name) {
    var s = pardavaFind(name);
    var box = document.getElementById("pardava-drawer");
    var scrim = document.getElementById("pardava-scrim");
    if (!s || !box) return;
    box.innerHTML =
      "<button class='pardava-btn pardava-btn--ghost' id='pardava-drawer-x' type='button'>بستن</button>" +
      "<h2 style='margin:16px 0 6px'>" + s.name + "</h2>" +
      "<p class='pardava-note'>" + s.full + " — " + s.ind + "</p>" +
      "<p><b class='pardava-num' style='font-size:1.6rem'>" + pardavaSep(s.price) + "</b> " + pardavaChg(pardavaPct(s)) + "</p>" +
      "<p class='pardava-note'>این پنل جزئیات آزمایشی است. سفارش واقعی ثبت نمی‌شود.</p>" +
      "<button class='pardava-btn' id='pardava-alert' type='button' style='margin-top:12px'>هشدار قیمت تستی</button>";
    box.classList.add("is-on");
    scrim.classList.add("is-on");
    document.getElementById("pardava-drawer-x").onclick = pardavaClose;
    document.getElementById("pardava-alert").onclick = function () {
      pardavaToast("هشدار آزمایشی برای " + s.name + " ثبت شد.");
    };
  }
  function pardavaClose() {
    document.getElementById("pardava-drawer").classList.remove("is-on");
    document.getElementById("pardava-scrim").classList.remove("is-on");
  }

  document.getElementById("pardava-board").addEventListener("click", function (e) {
    var star = e.target.closest("[data-pardava-star]");
    if (star) {
      e.stopPropagation();
      pardavaToggleWatch(star.getAttribute("data-pardava-star"));
      return;
    }
    var tr = e.target.closest("[data-pardava-sym]");
    if (!tr) return;
    pardavaSelect(tr.getAttribute("data-pardava-sym"));
    pardavaDrawer(tr.getAttribute("data-pardava-sym"));
  });
  document.getElementById("pardava-movers").addEventListener("click", function (e) {
    var li = e.target.closest("[data-pardava-sym]");
    if (!li) return;
    pardavaSelect(li.getAttribute("data-pardava-sym"));
  });
  document.getElementById("pardava-pin").addEventListener("click", function () {
    pardavaToggleWatch(PARDAVA.selected);
  });
  document.getElementById("pardava-scrim").addEventListener("click", pardavaClose);

  document.getElementById("pardava-q").addEventListener("input", function (e) {
    PARDAVA.q = e.target.value.trim();
    pardavaBoard();
  });
  document.querySelectorAll("#pardava-board thead [data-pardava-sort]").forEach(function (th) {
    th.addEventListener("click", function () {
      var k = th.getAttribute("data-pardava-sort");
      PARDAVA.dir = PARDAVA.sort === k ? -PARDAVA.dir : -1;
      PARDAVA.sort = k;
      pardavaBoard();
    });
  });
  document.getElementById("pardava-board-tabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-pardava-board]");
    if (!b) return;
    PARDAVA.board = b.getAttribute("data-pardava-board");
    document.querySelectorAll("#pardava-board-tabs button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
    pardavaBoard();
  });
  document.getElementById("pardava-mover-tabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-pardava-mover]");
    if (!b) return;
    PARDAVA.mover = b.getAttribute("data-pardava-mover");
    document.querySelectorAll("#pardava-mover-tabs button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
    pardavaMovers();
  });
  document.getElementById("pardava-news-tabs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-pardava-news]");
    if (!b) return;
    PARDAVA.news = b.getAttribute("data-pardava-news");
    document.querySelectorAll("#pardava-news-tabs button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
    pardavaNews();
  });

  document.getElementById("pardava-calc").addEventListener("submit", function (e) {
    e.preventDefault();
    var buy = Number(document.getElementById("pardava-buy").value) || 0;
    var sell = Number(document.getElementById("pardava-sell").value) || 0;
    var qty = Number(document.getElementById("pardava-qty").value) || 0;
    var fee = 0.0074;
    var cost = buy * qty * (1 + fee);
    var got = sell * qty * (1 - fee);
    var pnl = got - cost;
    var pct = cost ? (pnl / cost) * 100 : 0;
    document.getElementById("pardava-calc-out").textContent =
      "سود/زیان خالص تستی: " + pardavaSep(pnl) + " ریال  |  " + (pct >= 0 ? "+" : "") + pardavaFa(pct, 2) + "٪";
  });

  var burger = document.getElementById("pardava-burger");
  var nav = document.getElementById("pardava-nav");
  burger.addEventListener("click", function () { nav.classList.toggle("is-open"); });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.querySelectorAll("a").forEach(function (x) { x.classList.remove("is-on"); });
      a.classList.add("is-on");
      nav.classList.remove("is-open");
    });
  });

  pardavaSectors();
  pardavaCal();
  pardavaNews();
  pardavaClock();
  pardavaSelect("فولاد");
  pardavaTape();
  pardavaIndices();
  pardavaMovers();
  pardavaBoard();
  window.setInterval(pardavaClock, 1000);
  window.setInterval(pardavaTick, 1200);
})();
