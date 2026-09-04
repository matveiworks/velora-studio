(function () {
  var header = document.getElementById('site-header');
  var sentinelObs = new IntersectionObserver(function (entries) {
    header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
  }, { rootMargin: '-1px 0px 0px 0px', threshold: 1 });
  var hero = document.querySelector('.hero');
  if (hero) sentinelObs.observe(hero);

  var toggle = document.getElementById('navToggle');
  var panel = document.getElementById('mobilePanel');
  toggle.addEventListener('click', function () {
    var open = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  panel.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.section-head, .service-cat, .about-text, .about-visual, .master, .review, .contact-info, .form-card');
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  var form = document.getElementById('bookingForm');
  var success = document.getElementById('formSuccess');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    success.classList.add('is-shown');
    form.reset();
  });
})();
