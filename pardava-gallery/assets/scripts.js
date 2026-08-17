(function () {
  var header = document.getElementById("pardava-header");
  var burger = document.getElementById("pardava-burger");
  var nav = document.getElementById("pardava-nav");
  var shots = document.getElementById("pardava-shots");
  var filters = document.getElementById("pardava-filters");
  var lightbox = document.getElementById("pardava-lightbox");
  var lightboxImg = document.getElementById("pardava-lightbox-img");
  var lightboxClose = document.getElementById("pardava-lightbox-close");
  var form = document.getElementById("pardava-form");
  var toast = document.getElementById("pardava-toast");

  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  function setNav(open) {
    if (!nav || !burger) return;
    nav.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger && nav) {
    burger.addEventListener("click", function () {
      setNav(!nav.classList.contains("is-open"));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setNav(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  if (filters && shots) {
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".pardava-filter");
      if (!btn) return;
      filters.querySelectorAll(".pardava-filter").forEach(function (el) {
        el.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      var cat = btn.getAttribute("data-pardava-filter");
      shots.querySelectorAll(".pardava-shot").forEach(function (shot) {
        var show = cat === "all" || shot.getAttribute("data-pardava-cat") === cat;
        shot.classList.toggle("is-hidden", !show);
      });
    });

    shots.addEventListener("click", function (e) {
      var shot = e.target.closest(".pardava-shot");
      if (!shot || !lightbox || !lightboxImg) return;
      var img = shot.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
    });
  }

  function closeBox() {
    if (lightbox) lightbox.classList.remove("is-open");
  }
  if (lightboxClose) lightboxClose.addEventListener("click", closeBox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeBox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeBox();
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-on");
    window.setTimeout(function () { toast.classList.remove("is-on"); }, 2800);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("درخواست نمونه ثبت شد. این متن تستی است.");
      form.reset();
    });
  }
})();
