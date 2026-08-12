(function () {
  var header = document.getElementById('pardava-header');
  var toggle = document.getElementById('pardava-nav-toggle');
  var nav = document.getElementById('pardava-nav');
  var form = document.getElementById('pardava-form');
  var status = document.getElementById('pardava-form-status');

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('pardava-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
  }

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        header.classList.add('pardava-scrolled');
      } else {
        header.classList.remove('pardava-scrolled');
      }
    }, { passive: true });
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNavOpen(!nav.classList.contains('pardava-open'));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setNavOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setNavOpen(false);
    });
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'درخواست شما ثبت شد';
      }
      if (status) status.textContent = 'با سپاس؛ به‌زودی با شما تماس می‌گیریم.';
      window.setTimeout(function () {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'ارسال درخواست';
        }
        if (status) status.textContent = '';
        form.reset();
      }, 2600);
    });
  }
})();
