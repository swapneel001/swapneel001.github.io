/*!
    Swapneel Bhatt — personal portfolio
    Vanilla JS, no dependencies. Loaded directly by index.html (no minified build step).
*/

(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  // Current year in the footer
  var year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  // Sticky header styling once scrolled past the top
  var header = document.getElementById('site-header');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var toggle = document.getElementById('menu-toggle');
  var closeMenu = function () {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('#menu a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Back to top
  var toTop = document.getElementById('to-top');
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Reveal sections as they enter the viewport
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px' });

    revealables.forEach(function (el, i) {
      // Stagger siblings slightly so grids cascade instead of popping at once
      el.style.transitionDelay = (i % 2) * 90 + 'ms';
      revealer.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('visible'); });
  }

  // Highlight the nav link for whichever section is in view
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('#menu a');
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { spy.observe(section); });
  }
})();
