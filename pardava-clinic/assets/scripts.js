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
  function pardavaSvg(el, html) {
    if (el) el.innerHTML = html;
  }
  function pardavaMax(arr) { return Math.max.apply(null, arr.concat([1])); }
  function pardavaPts(arr, w, h, pad) {
    var m = pardavaMax(arr), n = arr.length;
    return arr.map(function (v, i) {
      var x = pad + (i / Math.max(n - 1, 1)) * (w - pad * 2);
      var y = h - pad - (v / m) * (h - pad * 2);
      return x.toFixed(1) + "," + y.toFixed(1);
    }).join(" ");
  }
  function pardavaSpark(el, arr, color) {
    if (!el) return;
    pardavaSvg(el, '<polyline fill="none" stroke="' + color + '" stroke-width="2" points="' + pardavaPts(arr, 120, 36, 3) + '"/>');
  }
  function pardavaArea(el, arr) {
    if (!el) return;
    var w = 640, h = 220, p = 16;
    var line = pardavaPts(arr, w, h, p);
    var fill = p + "," + (h - p) + " " + line + " " + (w - p) + "," + (h - p);
    pardavaSvg(el,
      '<defs><linearGradient id="pardava-g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0ea5a0" stop-opacity=".35"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/></linearGradient></defs>' +
      '<polygon fill="url(#pardava-g1)" points="' + fill + '"/>' +
      '<polyline fill="none" stroke="#0ea5a0" stroke-width="2.4" points="' + line + '"/>'
    );
  }
  function pardavaBars(el, labels, vals, w, h) {
    if (!el) return;
    w = w || 640; h = h || 180;
    var m = pardavaMax(vals), gap = 8, bw = (w - 36 - gap * vals.length) / vals.length, html = "";
    vals.forEach(function (v, i) {
      var bh = (v / m) * (h - 36);
      var x = 18 + i * (bw + gap);
      var y = h - 22 - bh;
      html += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + bh + '" rx="4" fill="' + (i % 2 ? "#6366f1" : "#0ea5a0") + '"/>';
      html += '<text x="' + (x + bw / 2) + '" y="' + (h - 6) + '" fill="#64748b" font-size="10" text-anchor="middle">' + labels[i] + "</text>";
    });
    pardavaSvg(el, html);
  }
  function pardavaDonut(el, items) {
    if (!el) return;
    var total = items.reduce(function (s, x) { return s + x.v; }, 0);
    var cx = 110, cy = 80, r = 54, r2 = 32, a = -Math.PI / 2, html = "";
    items.forEach(function (it) {
      var slice = (it.v / total) * Math.PI * 2, a2 = a + slice, large = slice > Math.PI ? 1 : 0;
      var p1 = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      var p2 = [cx + r * Math.cos(a2), cy + r * Math.sin(a2)];
      var q1 = [cx + r2 * Math.cos(a2), cy + r2 * Math.sin(a2)];
      var q2 = [cx + r2 * Math.cos(a), cy + r2 * Math.sin(a)];
      html += '<path d="M' + p1[0] + " " + p1[1] + " A" + r + " " + r + " 0 " + large + " 1 " + p2[0] + " " + p2[1] +
        " L" + q1[0] + " " + q1[1] + " A" + r2 + " " + r2 + " 0 " + large + " 0 " + q2[0] + " " + q2[1] + ' Z" fill="' + it.c + '"/>';
      a = a2;
    });
    pardavaSvg(el, html);
    var leg = document.getElementById("pardava-donut-leg");
    if (leg) {
      leg.innerHTML = items.map(function (it) {
        return "<span><i style='background:" + it.c + "'></i>" + it.n + " " + pardavaFa(it.v) + "٪</span>";
      }).join("");
    }
  }

  var PARDAVA_PATIENTS = [
    { id: 1, name: "کیان رستمی", code: "۰۰۱۲۳۴۵۶۷۸", phone: "۰۹۱۲۰۰۰۱۱۱۱", age: 42, allergy: "پنی‌سیلین", hist: "فشار خون", vis: "سردرد تنشی", files: 2 },
    { id: 2, name: "سامان مرادی", code: "۰۰۱۲۳۴۵۶۷۹", phone: "۰۹۱۲۰۰۰۲۲۲۲", age: 36, allergy: "ندارد", hist: "آسم خفیف", vis: "کنترل ریه", files: 4 },
    { id: 3, name: "آرمان نوری", code: "۰۰۱۲۳۴۵۶۸۰", phone: "۰۹۱۲۰۰۰۳۳۳۳", age: 51, allergy: "آسپرین", hist: "دیابت نوع ۲", vis: "تنظیم قند", files: 3 },
    { id: 4, name: "نیما کاظمی", code: "۰۰۱۲۳۴۵۶۸۱", phone: "۰۹۱۲۰۰۰۴۴۴۴", age: 29, allergy: "ندارد", hist: "سالم", vis: "چکاپ", files: 1 },
    { id: 5, name: "بهرام صالحی", code: "۰۰۱۲۳۴۵۶۸۲", phone: "۰۹۱۲۰۰۰۵۵۵۵", age: 47, allergy: "گرده گیاه", hist: "میگرن", vis: "سردرد", files: 2 },
    { id: 6, name: "کامران یوسفی", code: "۰۰۱۲۳۴۵۶۸۳", phone: "۰۹۱۲۰۰۰۶۶۶۶", age: 61, allergy: "ندارد", hist: "چربی خون", vis: "پیگیری آزمایش", files: 5 }
  ];
  var PARDAVA_APPTS = [
    { id: "a1", name: "کیان رستمی", day: 25, hour: 10, status: "wait" },
    { id: "a2", name: "سامان مرادی", day: 25, hour: 11, status: "ok" },
    { id: "a3", name: "آرمان نوری", day: 26, hour: 9, status: "ok" },
    { id: "a4", name: "نیما کاظمی", day: 27, hour: 16, status: "off" },
    { id: "a5", name: "بهرام صالحی", day: 28, hour: 12, status: "wait" },
    { id: "a6", name: "کامران یوسفی", day: 25, hour: 17, status: "ok" },
    { id: "a7", name: "رزرو آنلاین", day: 29, hour: 10, status: "wait" }
  ];
  var PARDAVA_DRUGS = [
    { n: "استامینوفن ۵۰۰", g: "مسکن" },
    { n: "آموکسی‌سیلین ۵۰۰", g: "آنتی‌بیوتیک" },
    { n: "متفورمین ۵۰۰", g: "دیابت" },
    { n: "لوسارتان ۵۰", g: "فشار خون" },
    { n: "سالبوتامول استنشاقی", g: "ریه" },
    { n: "امپرازول ۲۰", g: "گوارش" },
    { n: "ویتامین D3", g: "مکمل" }
  ];
  var PARDAVA_PAYS = [
    { name: "کیان رستمی", method: "کارت", amount: 850000, st: "ok" },
    { name: "سامان مرادی", method: "نقد", amount: 650000, st: "ok" },
    { name: "آرمان نوری", method: "بیمه", amount: 1200000, st: "wait" },
    { name: "نیما کاظمی", method: "کارت", amount: 850000, st: "ok" },
    { name: "بهرام صالحی", method: "بیمه", amount: 980000, st: "off" },
    { name: "کامران یوسفی", method: "نقد", amount: 650000, st: "ok" }
  ];
  var PARDAVA_RX = [];
  var calMode = "month";
  var patientPage = 1;
  var patientQ = "";
  var payPage = 1;
  var paySort = "amount";
  var payDir = -1;
  var selectedPatient = 1;

  function pardavaClock() {
    var el = document.getElementById("pardava-clock");
    if (!el) return;
    var d = new Date();
    el.textContent = d.toLocaleDateString("fa-IR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) +
      "  ·  " + d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  }
  pardavaClock();
  window.setInterval(pardavaClock, 30000);

  function pardavaShow(view) {
    document.querySelectorAll(".pardava-view").forEach(function (s) {
      s.classList.toggle("is-on", s.id === "pardava-view-" + view);
    });
    document.querySelectorAll("[data-pardava-view]").forEach(function (b) {
      if (b.classList.contains("pardava-nav__btn")) b.classList.toggle("is-active", b.getAttribute("data-pardava-view") === view);
    });
    document.getElementById("pardava-app").classList.remove("is-nav");
    var bd = document.getElementById("pardava-bell-drop");
    var ud = document.getElementById("pardava-user-drop");
    if (bd) bd.classList.remove("is-on");
    if (ud) ud.classList.remove("is-on");
    if (view === "appointments") pardavaRenderCal();
    if (view === "reports") pardavaRenderReports();
  }
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-pardava-view]");
    if (btn) {
      e.preventDefault();
      pardavaShow(btn.getAttribute("data-pardava-view"));
    }
    if (e.target.closest("#pardava-burger")) document.getElementById("pardava-app").classList.toggle("is-nav");
    if (e.target.closest("#pardava-bell")) {
      document.getElementById("pardava-bell-drop").classList.toggle("is-on");
    } else if (!e.target.closest("#pardava-bell-drop")) {
      document.getElementById("pardava-bell-drop").classList.remove("is-on");
    }
    if (e.target.closest("#pardava-user")) {
      document.getElementById("pardava-user-drop").classList.toggle("is-on");
    } else if (!e.target.closest("#pardava-user-drop")) {
      document.getElementById("pardava-user-drop").classList.remove("is-on");
    }
    var calBtn = e.target.closest("[data-pardava-cal]");
    if (calBtn) {
      calMode = calBtn.getAttribute("data-pardava-cal");
      document.querySelectorAll("[data-pardava-cal]").forEach(function (x) { x.classList.toggle("is-on", x === calBtn); });
      pardavaRenderCal();
    }
  });

  var themeBtn = document.getElementById("pardava-theme");
  var savedTheme = "light";
  try { savedTheme = localStorage.getItem("pardava-clinic-theme") || "light"; } catch (e) {}
  document.documentElement.setAttribute("data-pardava-theme", savedTheme);
  if (themeBtn) themeBtn.textContent = savedTheme === "dark" ? "☀" : "☾";
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-pardava-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-pardava-theme", next);
    themeBtn.textContent = next === "dark" ? "☀" : "☾";
    try { localStorage.setItem("pardava-clinic-theme", next); } catch (err) {}
  });
  var logout = document.getElementById("pardava-logout");
  if (logout) logout.addEventListener("click", function () { pardavaToast("خروج نمایشی است؛ نشست واقعی بسته نشد."); });

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".pardava-btn");
    if (!b) return;
    var r = document.createElement("span");
    r.className = "pardava-ripple";
    var rect = b.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + "px";
    r.style.right = (rect.right - e.clientX - size / 2) + "px";
    r.style.top = (e.clientY - rect.top - size / 2) + "px";
    b.appendChild(r);
    window.setTimeout(function () { r.remove(); }, 520);
  });

  pardavaSpark(document.getElementById("pardava-sp1"), [8, 11, 9, 14, 16, 18, 18], "#0ea5a0");
  pardavaSpark(document.getElementById("pardava-sp2"), [12, 10, 9, 8, 8, 7, 7], "#f59e0b");
  pardavaSpark(document.getElementById("pardava-sp3"), [12, 15, 14, 18, 20, 22, 25], "#6366f1");
  pardavaSpark(document.getElementById("pardava-sp4"), [1, 1, 2, 3, 3, 4, 5], "#10b981");
  pardavaArea(document.getElementById("pardava-week"), [22, 28, 25, 31, 29, 18, 12]);

  var soon = document.getElementById("pardava-soon");
  if (soon) {
    soon.innerHTML = PARDAVA_APPTS.filter(function (a) { return a.day === 25; }).map(function (a) {
      var cls = a.status === "ok" ? "pardava-badge--ok" : a.status === "wait" ? "pardava-badge--wait" : "pardava-badge--off";
      var lab = a.status === "ok" ? "تایید شده" : a.status === "wait" ? "در انتظار" : "لغو شده";
      return '<div class="pardava-patient"><span class="pardava-mono">' + a.name.charAt(0) + "</span><div><b>" + a.name + "</b><p class='pardava-note'>" + pardavaFa(a.hour) + ":۰۰</p></div><span class='pardava-badge " + cls + "'>" + lab + "</span></div>";
    }).join("");
  }

  function pardavaStatus(st) {
    return st === "ok" ? "is-ok" : st === "wait" ? "is-wait" : "is-off";
  }
  function pardavaRenderCal() {
    var mount = document.getElementById("pardava-cal-mount");
    var title = document.getElementById("pardava-cal-title");
    if (!mount) return;
    if (title) title.textContent = calMode === "day" ? "۲۵ مرداد ۱۴۰۵" : calMode === "week" ? "هفته چهارم مرداد ۱۴۰۵" : "مرداد ۱۴۰۵";
    if (calMode === "day") {
      var hours = [8, 9, 10, 11, 12, 16, 17, 18];
      mount.innerHTML = hours.map(function (h) {
        var items = PARDAVA_APPTS.filter(function (a) { return a.day === 25 && a.hour === h; }).map(pardavaChip).join("");
        return '<div class="pardava-daygrid"><b>' + pardavaFa(h) + ":۰۰</b><div class='pardava-slot' data-pardava-hour='" + h + "' data-pardava-day='25'>" + items + "</div></div>";
      }).join("");
    } else if (calMode === "week") {
      var days = [23, 24, 25, 26, 27, 28, 29];
      mount.innerHTML = '<div class="pardava-cal">' + days.map(function (d) {
        var items = PARDAVA_APPTS.filter(function (a) { return a.day === d; }).map(pardavaChip).join("");
        return '<div class="pardava-day' + (d === 25 ? " is-today" : "") + '" data-pardava-day="' + d + '"><b>' + pardavaFa(d) + " مرداد</b>" + items + "</div>";
      }).join("") + "</div>";
    } else {
      var names = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
      var html = names.map(function (n) { return '<div class="pardava-cal__hd">' + n + "</div>"; }).join("");
      for (var i = 0; i < 4; i++) html += "<div></div>";
      for (var d = 1; d <= 31; d++) {
        var items = PARDAVA_APPTS.filter(function (a) { return a.day === d; }).map(pardavaChip).join("");
        html += '<div class="pardava-day' + (d === 25 ? " is-today" : "") + '" data-pardava-day="' + d + '"><b>' + pardavaFa(d) + "</b>" + items + "</div>";
      }
      mount.innerHTML = '<div class="pardava-cal">' + html + "</div>";
    }
    pardavaBindDrag();
  }
  function pardavaChip(a) {
    return '<span class="pardava-chip ' + pardavaStatus(a.status) + '" draggable="true" data-pardava-appt="' + a.id + '">' + a.name + " · " + pardavaFa(a.hour) + "</span>";
  }
  function pardavaBindDrag() {
    document.querySelectorAll("[data-pardava-appt]").forEach(function (chip) {
      chip.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", chip.getAttribute("data-pardava-appt"));
      });
    });
    document.querySelectorAll("[data-pardava-day], .pardava-slot").forEach(function (slot) {
      slot.addEventListener("dragover", function (e) { e.preventDefault(); slot.classList.add("is-over"); });
      slot.addEventListener("dragleave", function () { slot.classList.remove("is-over"); });
      slot.addEventListener("drop", function (e) {
        e.preventDefault();
        slot.classList.remove("is-over");
        var id = e.dataTransfer.getData("text/plain");
        var ap = PARDAVA_APPTS.filter(function (x) { return x.id === id; })[0];
        if (!ap) return;
        ap.day = Number(slot.getAttribute("data-pardava-day") || ap.day);
        if (slot.getAttribute("data-pardava-hour")) ap.hour = Number(slot.getAttribute("data-pardava-hour"));
        pardavaRenderCal();
        pardavaToast("نوبت " + ap.name + " جابه‌جا شد — نمایشی.");
      });
    });
  }
  var book = document.getElementById("pardava-book");
  if (book) book.addEventListener("click", function () {
    PARDAVA_APPTS.push({ id: "a" + (PARDAVA_APPTS.length + 1), name: "رزرو آنلاین جدید", day: 25, hour: 18, status: "wait" });
    pardavaRenderCal();
    pardavaToast("رزرو آنلاین بیمار ثبت نمایشی شد.");
  });

  function pardavaPatients() {
    var q = patientQ;
    var rows = PARDAVA_PATIENTS.filter(function (p) { return !q || p.name.indexOf(q) >= 0 || p.code.indexOf(q) >= 0; });
    var per = 4, start = (patientPage - 1) * per;
    var list = document.getElementById("pardava-patient-list");
    var count = document.getElementById("pardava-patient-count");
    if (count) count.textContent = pardavaFa(rows.length) + " پرونده";
    if (list) {
      list.innerHTML = rows.slice(start, start + per).map(function (p) {
        return '<div class="pardava-patient' + (p.id === selectedPatient ? " is-on" : "") + '" data-pardava-pid="' + p.id + '"><span class="pardava-mono">' + p.name.charAt(0) + "</span><div><b>" + p.name + "</b><p class='pardava-note'>" + pardavaFa(p.age) + " سال · " + p.code + "</p></div></div>";
      }).join("");
    }
    var pager = document.getElementById("pardava-patient-pager");
    if (pager) {
      var n = Math.max(1, Math.ceil(rows.length / per));
      pager.innerHTML = Array.from({ length: n }, function (_, i) {
        return '<button type="button" class="' + (i + 1 === patientPage ? "is-on" : "") + '" data-pardava-pp="' + (i + 1) + '">' + pardavaFa(i + 1) + "</button>";
      }).join("");
    }
    pardavaPatientDetail(selectedPatient);
  }
  function pardavaPatientDetail(id) {
    var p = PARDAVA_PATIENTS.filter(function (x) { return x.id === id; })[0] || PARDAVA_PATIENTS[0];
    selectedPatient = p.id;
    var box = document.getElementById("pardava-patient-detail");
    if (!box) return;
    box.innerHTML =
      "<div class='pardava-card__head'><h3>" + p.name + "</h3><span>کد ملی " + p.code + "</span></div>" +
      "<div class='pardava-facts'>" +
      "<div><span>تماس</span><b>" + p.phone + "</b></div>" +
      "<div><span>سن</span><b>" + pardavaFa(p.age) + " سال</b></div>" +
      "<div><span>آخرین ویزیت</span><b>" + p.vis + "</b></div>" +
      "<div><span>اسناد</span><b>" + pardavaFa(p.files) + " فایل نمایشی</b></div>" +
      "</div>" +
      "<p class='pardava-note'>آلرژی و سابقه</p>" +
      "<div class='pardava-chips'><span class='pardava-badge pardava-badge--off'>آلرژی: " + p.allergy + "</span><span class='pardava-badge pardava-badge--info'>سابقه: " + p.hist + "</span></div>" +
      "<h3>اسناد پزشکی</h3>" +
      "<div class='pardava-files'>" +
      "<figure class='pardava-media'><img src='assets/images/radiology-hand-xray.jpg' alt='نمونه رادیولوژی دست بیمار — تصویر نمایشی' width='800' height='1000'><figcaption>رادیولوژی دست · پیوست پرونده</figcaption></figure>" +
      "<div class='pardava-file'>آزمایش خون · " + pardavaFa(p.files) + " فایل<br><small>آپلود واقعی نیست</small></div>" +
      "</div>";
  }
  var pq = document.getElementById("pardava-patient-q");
  if (pq) pq.addEventListener("input", function () { patientQ = pq.value.trim(); patientPage = 1; pardavaPatients(); });
  document.addEventListener("click", function (e) {
    var pg = e.target.closest("[data-pardava-pp]");
    if (pg) { patientPage = Number(pg.getAttribute("data-pardava-pp")); pardavaPatients(); }
    var row = e.target.closest("[data-pardava-pid]");
    if (row) { selectedPatient = Number(row.getAttribute("data-pardava-pid")); pardavaPatients(); }
  });
  pardavaPatients();

  var visitSel = document.getElementById("pardava-visit-patient");
  var paySel = document.getElementById("pardava-pay-patient");
  var msgSel = document.getElementById("pardava-msg-to");
  var opts = PARDAVA_PATIENTS.map(function (p) { return "<option>" + p.name + "</option>"; }).join("");
  if (visitSel) visitSel.innerHTML = opts;
  if (paySel) paySel.innerHTML = opts;
  if (msgSel) msgSel.innerHTML = opts + "<option>منشی مطب</option>";
  var visitForm = document.getElementById("pardava-visit-form");
  if (visitForm) visitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    pardavaToast("ویزیت ثبت نمایشی شد. پرونده واقعی ذخیره نشد.");
  });
  document.querySelectorAll(".pardava-file input").forEach(function (inp) {
    inp.addEventListener("change", function () { pardavaToast("پیوست نمایشی انتخاب شد: " + (inp.files[0] && inp.files[0].name || "فایل")); });
  });

  function pardavaDrugs(q) {
    var box = document.getElementById("pardava-drug-list");
    if (!box) return;
    box.innerHTML = PARDAVA_DRUGS.filter(function (d) { return !q || d.n.indexOf(q) >= 0 || d.g.indexOf(q) >= 0; }).map(function (d) {
      return '<div class="pardava-drug" data-pardava-drug="' + d.n + '"><div><b>' + d.n + "</b><p class='pardava-note'>" + d.g + "</p></div><span class='pardava-badge pardava-badge--info'>افزودن</span></div>";
    }).join("") || "<p class='pardava-note'>دارویی با این جستجو نیست.</p>";
  }
  function pardavaRxList() {
    var box = document.getElementById("pardava-rx-items");
    if (box) {
      box.innerHTML = PARDAVA_RX.length ? PARDAVA_RX.map(function (x, i) {
        return '<div class="pardava-rx-item"><div><b>' + x.n + "</b><p class='pardava-note'>" + x.dose + " · " + x.days + "</p></div><button type='button' data-pardava-rx-del='" + i + "'>حذف</button></div>";
      }).join("") : "<p class='pardava-note'>دارویی به نسخه اضافه نشده. از فهرست سمت راست انتخاب کنید.</p>";
    }
    var hist = document.getElementById("pardava-rx-hist");
    if (hist) {
      hist.innerHTML = "<tr><td>۱۸ مرداد</td><td>لوسارتان ۵۰</td><td><span class='pardava-badge pardava-badge--ok'>تحویل شده</span></td></tr>" +
        "<tr><td>۲ مرداد</td><td>متفورمین ۵۰۰</td><td><span class='pardava-badge pardava-badge--wait'>تکرار</span></td></tr>";
    }
  }
  pardavaDrugs("");
  pardavaRxList();
  var dq = document.getElementById("pardava-drug-q");
  if (dq) dq.addEventListener("input", function () { pardavaDrugs(dq.value.trim()); });
  document.addEventListener("click", function (e) {
    var del = e.target.closest("[data-pardava-rx-del]");
    if (del) {
      PARDAVA_RX.splice(Number(del.getAttribute("data-pardava-rx-del")), 1);
      pardavaRxList();
      pardavaToast("دارو از نسخه نمایشی حذف شد.");
      return;
    }
    var d = e.target.closest("[data-pardava-drug]");
    if (!d) return;
    var dose = document.getElementById("pardava-rx-dose").value;
    var days = document.getElementById("pardava-rx-days").value;
    PARDAVA_RX.push({ n: d.getAttribute("data-pardava-drug"), dose: dose, days: days });
    pardavaRxList();
    pardavaToast("دارو به نسخه نمایشی اضافه شد.");
  });
  var rxPrint = document.getElementById("pardava-rx-print");
  var rxSend = document.getElementById("pardava-rx-send");
  if (rxPrint) rxPrint.addEventListener("click", function () { window.print(); });
  if (rxSend) rxSend.addEventListener("click", function () { pardavaToast("نسخه به‌صورت نمایشی ارسال شد."); });

  function pardavaPayBadge(st) {
    return st === "ok" ? '<span class="pardava-badge pardava-badge--ok">موفق</span>' :
      st === "wait" ? '<span class="pardava-badge pardava-badge--wait">در انتظار بیمه</span>' :
      '<span class="pardava-badge pardava-badge--off">بدهی</span>';
  }
  function pardavaPays() {
    var rows = PARDAVA_PAYS.slice().sort(function (a, b) {
      var va = a[paySort], vb = b[paySort];
      if (va < vb) return -payDir;
      if (va > vb) return payDir;
      return 0;
    });
    var per = 4, start = (payPage - 1) * per;
    var tb = document.querySelector("#pardava-pay-table tbody");
    if (tb) {
      tb.innerHTML = rows.slice(start, start + per).map(function (r) {
        return "<tr><td>" + r.name + "</td><td>" + r.method + "</td><td>" + pardavaFa(r.amount.toLocaleString("en-US")) + "</td><td>" + pardavaPayBadge(r.st) + "</td></tr>";
      }).join("");
    }
    var pager = document.getElementById("pardava-pay-pager");
    if (pager) {
      var n = Math.ceil(rows.length / per);
      pager.innerHTML = Array.from({ length: n }, function (_, i) {
        return '<button type="button" class="' + (i + 1 === payPage ? "is-on" : "") + '" data-pardava-payp="' + (i + 1) + '">' + pardavaFa(i + 1) + "</button>";
      }).join("");
    }
  }
  pardavaPays();
  document.querySelectorAll("#pardava-pay-table th[data-pardava-sort]").forEach(function (th) {
    th.addEventListener("click", function () {
      var k = th.getAttribute("data-pardava-sort");
      if (paySort === k) payDir *= -1; else { paySort = k; payDir = 1; }
      pardavaPays();
    });
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-pardava-payp]");
    if (b) { payPage = Number(b.getAttribute("data-pardava-payp")); pardavaPays(); }
  });
  var payForm = document.getElementById("pardava-pay-form");
  if (payForm) payForm.addEventListener("submit", function (e) {
    e.preventDefault();
    PARDAVA_PAYS.unshift({ name: document.getElementById("pardava-pay-patient").value, method: document.getElementById("pardava-pay-method").value, amount: 850000, st: "ok" });
    payPage = 1;
    pardavaPays();
    pardavaToast("پرداخت نمایشی ثبت شد.");
  });
  var inv = document.getElementById("pardava-invoice");
  if (inv) inv.addEventListener("click", function () { pardavaToast("فاکتور نمایشی صادر شد."); });

  function pardavaRenderReports() {
    pardavaArea(document.getElementById("pardava-month"), [18, 22, 19, 25, 28, 24, 30, 27, 26, 29, 31, 28]);
    pardavaDonut(document.getElementById("pardava-donut"), [
      { n: "فشار خون", v: 32, c: "#0ea5a0" },
      { n: "دیابت", v: 24, c: "#6366f1" },
      { n: "تنفسی", v: 18, c: "#10b981" },
      { n: "سایر", v: 26, c: "#f59e0b" }
    ]);
    pardavaBars(document.getElementById("pardava-income"), ["فرو", "ار", "خر", "تی", "مر", "شه", "مه", "آبا", "آذر", "دی", "به", "اس"], [28, 31, 29, 34, 36, 33, 38, 35, 32, 37, 40, 41], 640, 180);
  }
  var xls = document.getElementById("pardava-xls");
  var pdf = document.getElementById("pardava-pdf");
  if (xls) xls.addEventListener("click", function () { pardavaToast("خروجی Excel نمایشی آماده شد."); });
  if (pdf) pdf.addEventListener("click", function () { pardavaToast("خروجی PDF نمایشی آماده شد."); });

  var msgList = document.getElementById("pardava-msg-list");
  if (msgList) {
    msgList.innerHTML = [
      { k: "پیامک", t: "۱۰:۳۰", who: "کیان رستمی", txt: "یادآوری نوبت امروز در مطب پرداوا." },
      { k: "منشی", t: "۰۹:۴۰", who: "کیان رستمی", txt: "اعلان داخلی: تأخیر سند بیمه تامین." },
      { k: "پیامک", t: "دیروز", who: "آرمان نوری", txt: "نتیجه آزمایش تیروئید آماده است — نمایشی." }
    ].map(function (m) {
      var cls = m.k === "منشی" ? "pardava-badge--wait" : "pardava-badge--info";
      return "<article class='pardava-msg'><header><span class='pardava-badge " + cls + "'>" + m.k + "</span><span class='pardava-note'>" + m.t + "</span></header><p>" + m.txt + "</p><p class='pardava-note'>گیرنده: " + m.who + "</p></article>";
    }).join("");
  }
  var msgForm = document.getElementById("pardava-msg-form");
  if (msgForm) msgForm.addEventListener("submit", function (e) {
    e.preventDefault();
    pardavaToast("پیامک/نوتیفیکیشن نمایشی ارسال شد.");
    msgForm.reset();
  });
  var backup = document.getElementById("pardava-backup");
  if (backup) backup.addEventListener("click", function () { pardavaToast("پشتیبان‌گیری نمایشی کامل شد."); });
})();
