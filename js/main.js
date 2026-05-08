/* =====================================================================
   COSTA'S LIFESTYLE LOUNGE — Master JavaScript
   Vanilla JS · zero dependencies · runs on every page
   ===================================================================== */

(() => {
  'use strict';

  /* ---------- Mobile Nav Toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const drawerLinks = document.querySelectorAll('.mobile-drawer a');
  if (toggle) {
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
    drawerLinks.forEach(l => l.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
    }));
  }

  /* ---------- Hide-on-scroll Nav ---------- */
  const navShell = document.querySelector('.nav-shell');
  let lastY = 0;
  if (navShell) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > lastY && y > 200) {
        navShell.style.top = '-100px';
      } else {
        navShell.style.top = '1.1rem';
      }
      lastY = y;
    }, { passive: true });
  }

  /* ---------- Slideshow ---------- */
  document.querySelectorAll('.slideshow').forEach(initSlideshow);
  function initSlideshow(root) {
    const slides = root.querySelectorAll('.slide');
    const dotsHost = root.querySelector('.slide-dots');
    const prev = root.querySelector('.slide-arrow.prev');
    const next = root.querySelector('.slide-arrow.next');
    if (!slides.length) return;
    let i = 0;
    let timer;

    // Build dots
    if (dotsHost) {
      dotsHost.innerHTML = '';
      slides.forEach((_, idx) => {
        const b = document.createElement('button');
        b.className = 'slide-dot' + (idx === 0 ? ' active' : '');
        b.setAttribute('aria-label', `Slide ${idx + 1}`);
        b.addEventListener('click', () => go(idx));
        dotsHost.appendChild(b);
      });
    }

    function go(n) {
      slides[i].classList.remove('active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
      if (dotsHost) {
        dotsHost.querySelectorAll('.slide-dot').forEach((d, idx) =>
          d.classList.toggle('active', idx === i)
        );
      }
      restart();
    }
    function start() { timer = setInterval(() => go(i + 1), 5000); }
    function restart() { clearInterval(timer); start(); }

    if (prev) prev.addEventListener('click', () => go(i - 1));
    if (next) next.addEventListener('click', () => go(i + 1));

    // Pause on hover (desktop)
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', start);

    // Touch swipe
    let sx = 0;
    root.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
    root.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    });

    start();
  }

  /* ---------- Reveal on scroll ---------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ---------- Gallery Filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.toggle('active', b === btn));
        galleryItems.forEach(item => {
          const show = cat === 'all' || item.dataset.cat === cat;
          item.classList.toggle('hidden', !show);
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lbContent = lightbox.querySelector('.lightbox-content');
    const lbTag = lightbox.querySelector('.lightbox-tag');
    const lbClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const bg = item.querySelector('.item-bg');
        const tag = item.querySelector('.item-tag');
        if (bg && lbContent) {
          // Copy the placeholder background; will work too with real <img>
          const cs = window.getComputedStyle(bg);
          lbContent.style.background = cs.background;
          lbContent.style.backgroundSize = 'cover';
          lbContent.style.backgroundPosition = 'center';
        }
        if (tag && lbTag) lbTag.textContent = tag.textContent;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLb() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (lbClose) lbClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
  }

  /* ---------- Smooth focus transition for forms ---------- */
  document.querySelectorAll('.form input, .form select, .form textarea').forEach(field => {
    field.addEventListener('focus', () => field.parentElement?.classList.add('focused'));
    field.addEventListener('blur',  () => field.parentElement?.classList.remove('focused'));
  });

  /* ---------- Booking Form → WhatsApp ---------- */
  // REPLACE: phone number for WhatsApp redirect (no spaces, intl format)
  const WHATSAPP = '27630501133';

  document.querySelectorAll('form[data-whatsapp]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const lines = [];
      lines.push(`*New Enquiry — Costa's Lifestyle Lounge*`);
      lines.push('');
      data.forEach((value, key) => {
        if (!value) return;
        const label = key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        lines.push(`*${label}:* ${value}`);
      });
      const msg = encodeURIComponent(lines.join('\n'));
      window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
    });
  });

  /* ---------- Active Nav Link (auto) ---------- */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Year in footer ---------- */
  const yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

})();
