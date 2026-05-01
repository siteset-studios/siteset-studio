/* ============================================================
   SITESET STUDIOS — script.js
   Pure vanilla JS — no frameworks, no build tools required
   Security: no eval(), no inline handlers, uses addEventListener
   Performance: debounced scroll/mouse, passive listeners, RAF
   ============================================================ */

'use strict';

/* ─── Utility: debounce ──────────────────────── */
function debounce(fn, delay) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

/* ─── Cursor Glow ────────────────────────────── */
(function initCursorGlow() {
  var glow = document.getElementById('cursor-glow');
  if (!glow) return;
  /* Only show on non-touch devices */
  if (window.matchMedia('(hover: none)').matches) {
    glow.style.display = 'none';
    return;
  }
  var raf = null;
  var mx = -300, my = -300;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (!raf) {
      raf = requestAnimationFrame(function () {
        glow.style.left = (mx - 150) + 'px';
        glow.style.top = (my - 150) + 'px';
        raf = null;
      });
    }
  }, { passive: true });
  document.addEventListener('mouseleave', function () {
    glow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    glow.style.opacity = '1';
  });
})();

/* ─── Navbar scroll effect ───────────────────── */
(function initNavbar() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ─── Hamburger / Mobile menu ────────────────── */
(function initMobileMenu() {
  var btn  = document.getElementById('hamburger');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    menu.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    if (menu.classList.contains('open')) { closeMenu(); } else { openMenu(); }
  }

  btn.addEventListener('click', toggleMenu);

  /* Close when a link is clicked */
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on outside click */
  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); }
  });
})();

/* ─── Smooth scroll for anchor links ─────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var offset = 76;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();

/* ─── Scroll indicator button ────────────────── */
(function initScrollIndicator() {
  var btn = document.getElementById('hero-scroll-btn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var target = document.getElementById('stats');
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
  });
})();

/* ─── IntersectionObserver: fade-up animations ── */
(function initFadeUp() {
  var els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  els.forEach(function (el) { io.observe(el); });
})();

/* ─── CountUp animation ──────────────────────── */
(function initCountUp() {
  var cards = document.querySelectorAll('[data-countup]');
  if (!cards.length) return;

  function animateCount(el, target) {
    var counterEl = el.querySelector('.counter');
    if (!counterEl) return;
    var duration = 1800;
    var start = performance.now();

    function step(now) {
      var elapsed, progress, eased;
      elapsed  = now - start;
      progress = Math.min(elapsed / duration, 1);
      eased    = 1 - Math.pow(1 - progress, 3);
      counterEl.textContent = Math.round(target * eased);
      if (progress < 1) { requestAnimationFrame(step); }
    }
    requestAnimationFrame(step);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var target;
      if (entry.isIntersecting) {
        target = parseInt(entry.target.dataset.target || '0', 10);
        animateCount(entry.target, target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  cards.forEach(function (card) { io.observe(card); });
})();

/* ─── Before/After Slider ────────────────────── */
(function initSlider() {
  var container  = document.getElementById('slider');
  if (!container) return;

  var handle     = document.getElementById('slider-handle');
  var afterPanel = container.querySelector('.panel-after');
  if (!handle || !afterPanel) return;

  var isDragging = false;

  function setPosition(pct) {
    pct = Math.max(2, Math.min(98, pct));
    handle.style.left = pct + '%';
    afterPanel.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
  }

  function getPercent(clientX) {
    var rect = container.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  setPosition(50);

  /* Mouse */
  container.addEventListener('mousedown', function (e) {
    isDragging = true;
    setPosition(getPercent(e.clientX));
    e.preventDefault();
  });
  window.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    setPosition(getPercent(e.clientX));
  });
  window.addEventListener('mouseup', function () { isDragging = false; });

  /* Touch */
  container.addEventListener('touchstart', function (e) {
    isDragging = true;
    setPosition(getPercent(e.touches[0].clientX));
  }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    setPosition(getPercent(e.touches[0].clientX));
  }, { passive: true });
  window.addEventListener('touchend', function () { isDragging = false; });
})();

/* ─── Problem / Solution auto-cycling ────────── */
(function initProblemSolution() {
  var problemPanel = document.getElementById('ps-problem');
  var solutionPanel = document.getElementById('ps-solution');
  var dot0 = document.getElementById('dot-0');
  var dot1 = document.getElementById('dot-1');
  var bar  = document.getElementById('ps-bar');
  var barSol = document.getElementById('ps-bar-sol');
  if (!problemPanel || !solutionPanel) return;

  var psState = 0;
  var psInterval = null;

  function resetBar(el) {
    if (!el) return;
    el.style.animation = 'none';
    /* Force reflow */
    void el.offsetHeight;
    el.style.animation = '';
  }

  function switchPS(index) {
    psState = index;

    problemPanel.classList.toggle('active', index === 0);
    solutionPanel.classList.toggle('active', index === 1);

    if (dot0) {
      dot0.classList.toggle('active', index === 0);
      dot0.setAttribute('aria-selected', String(index === 0));
    }
    if (dot1) {
      dot1.classList.toggle('active', index === 1);
      dot1.setAttribute('aria-selected', String(index === 1));
    }

    resetBar(bar);
    resetBar(barSol);
  }

  function startCycle() {
    if (psInterval) return;
    psInterval = setInterval(function () {
      psState = psState === 0 ? 1 : 0;
      switchPS(psState);
    }, 4500);
  }

  function stopCycle() {
    clearInterval(psInterval);
    psInterval = null;
  }

  startCycle();

  /* Dot click handlers */
  [dot0, dot1].forEach(function (dot, i) {
    if (!dot) return;
    dot.addEventListener('click', function () {
      stopCycle();
      switchPS(i);
      /* Restart after 8s of no interaction */
      setTimeout(startCycle, 8000);
    });
  });
})();

/* ─── Service card expand/collapse ──────────── */
(function initServiceCards() {
  var buttons = document.querySelectorAll('.service-learn-btn');
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var detailId = btn.getAttribute('data-detail');
      if (!detailId) return;
      var detail = document.getElementById(detailId);
      if (!detail) return;

      var isOpen = detail.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
})();

/* ─── Pricing card hover tilt ────────────────── */
(function initPricingTilt() {
  var cards = document.querySelectorAll('.pricing-card');
  if (!cards.length) return;

  cards.forEach(function (card) {
    var raf = null;
    card.addEventListener('mousemove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var rect = card.getBoundingClientRect();
        var x  = e.clientX - rect.left;
        var y  = e.clientY - rect.top;
        var cx = rect.width  / 2;
        var cy = rect.height / 2;
        var tiltX = ((y - cy) / cy) * -6;
        var tiltY = ((x - cx) / cx) *  6;
        var scaleBase = card.classList.contains('popular') ? 1.05 : 1.02;
        card.style.transform = 'perspective(900px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) scale(' + (scaleBase + 0.01) + ')';
        raf = null;
      });
    });

    card.addEventListener('mouseleave', function () {
      var base = card.classList.contains('popular') ? 'scale(1.03)' : '';
      card.style.transform = base;
    });
  });
})();

/* ─── Hero parallax on scroll ────────────────── */
(function initHeroParallax() {
  var heroOrbs   = document.querySelectorAll('#hero .orb');
  var heroShapes = document.querySelectorAll('#hero .shape');
  if (!heroOrbs.length) return;

  var raf = null;
  var lastScrollY = 0;

  window.addEventListener('scroll', function () {
    lastScrollY = window.scrollY;
    if (raf) return;
    raf = requestAnimationFrame(function () {
      var scrollY = lastScrollY;
      if (scrollY > window.innerHeight) { raf = null; return; }
      heroOrbs.forEach(function (orb, i) {
        var speed = 0.08 + i * 0.03;
        var dir   = i % 2 === 0 ? 1 : -1;
        orb.style.transform = 'translateY(' + (dir * scrollY * speed) + 'px)';
      });
      heroShapes.forEach(function (shape, i) {
        var speed = 0.06 + i * 0.035;
        var dir   = i % 2 === 0 ? 1 : -1;
        shape.style.transform = 'translateY(' + (dir * scrollY * speed) + 'px)';
      });
      raf = null;
    });
  }, { passive: true });
})();

/* ─── Active nav link on scroll ──────────────── */
(function initActiveNav() {
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navLinks = document.querySelectorAll('.nav-links a, #mobile-menu a');
  if (!sections.length || !navLinks.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id, isActive;
      if (entry.isIntersecting) {
        id = entry.target.id;
        navLinks.forEach(function (link) {
          var href = link.getAttribute('href');
          isActive = href === '#' + id || (id === 'footer' && href === '#footer');
          link.classList.toggle('active', isActive);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-70px 0px 0px 0px' });

  sections.forEach(function (s) { io.observe(s); });
})();

/* ─── Footer year ────────────────────────────── */
(function setFooterYear() {
  var el = document.getElementById('footer-year');
  if (el) { el.textContent = new Date().getFullYear().toString(); }
})();
