/* ============================================================
   RED HOT MOTOR OIL® — v2 JavaScript
   Theme: Urban Streetwear / Brutalist Editorial
   main.js
   ============================================================ */
 
(function () {
  'use strict';
 
  /* ── CUSTOM CURSOR ── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
 
  if (cursor && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
 
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });
 
    // Slightly lagging ring
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
 
    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .blog-card, .blog-small-card, .use-card, .partner-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('hovered'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('hovered'); });
    });
  }
 
  /* ── NAVBAR SCROLL STATE ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
 
  /* ── SPA NAVIGATION ── */
  const navLinks    = document.querySelectorAll('[data-page]');
  const sections    = document.querySelectorAll('.page-section');
  let   currentPage = '';
 
  function showPage(page) {
    if (page === currentPage) return;
    currentPage = page;
 
    // Apply body class for page-specific nav color overrides
    document.body.className = document.body.className
      .replace(/\bpage-\w+\b/g, '')
      .trim();
    document.body.classList.add('page-' + page);
 
    sections.forEach(function (s) { s.classList.remove('active'); });
 
    const target = document.getElementById('page-' + page);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Reset & trigger reveals for new page
      setTimeout(triggerReveal, 80);
    }
 
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.dataset.page === page);
    });
 
    closeMobileNav();
  }
 
  navLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      showPage(this.dataset.page);
    });
  });
 
  /* ── MOBILE NAV ── */
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('nav-drawer');
 
  function closeMobileNav() {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
 
  hamburger.addEventListener('click', function () {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      hamburger.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
 
  /* ── SCROLL REVEAL ── */
  let observer;
 
  function triggerReveal() {
    if (observer) observer.disconnect();
 
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
 
    const reveals = document.querySelectorAll('.page-section.active .reveal');
    reveals.forEach(function (el) {
      el.classList.remove('visible');
      observer.observe(el);
    });
  }
 
  /* ── HERO BG ENTRANCE ── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    if (heroBg.complete) {
      heroBg.classList.add('loaded');
    } else {
      heroBg.addEventListener('load', function () {
        heroBg.classList.add('loaded');
      });
    }
  }
 
  /* ── TICKER DUPLICATE (seamless loop) ── */
  const tickerInner = document.querySelector('.ticker-inner');
  if (tickerInner) {
    tickerInner.innerHTML = tickerInner.innerHTML + tickerInner.innerHTML;
  }
 
  /* ── ORDER FORM ── */
  const orderForm   = document.getElementById('order-form');
  const formSuccess = document.getElementById('form-success');
 
  if (orderForm && formSuccess) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();
 
      const btn = orderForm.querySelector('.btn-submit');
      const origText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      btn.style.opacity = '0.6';
 
      // Replace with real API endpoint
      setTimeout(function () {
        orderForm.style.display   = 'none';
        formSuccess.style.display = 'block';
      }, 1200);
    });
 
    // Live validation feedback
    const inputs = orderForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        if (!this.value.trim()) {
          this.style.borderColor = 'var(--red)';
        } else {
          this.style.borderColor = 'var(--yellow)';
        }
      });
    });
  }
 
  /* ── BLOG POST READER ── */
  const blogIndex   = document.getElementById('blog-index');
  const blogPost    = document.getElementById('blog-post');
  const postBackBtn = document.getElementById('post-back-btn');
 
  function openPost(postId) {
    blogIndex.style.display = 'none';
    blogPost.style.display  = 'block';
    document.querySelectorAll('.post-article').forEach(function (a) {
      a.style.display = 'none';
    });
    const target = document.getElementById('post-' + postId);
    if (target) target.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
 
  function closePost() {
    blogPost.style.display  = 'none';
    blogIndex.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(triggerReveal, 80);
  }
 
  document.addEventListener('click', function (e) {
    const card = e.target.closest('[data-post]');
    if (card) { openPost(card.dataset.post); return; }
  });
 
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('[data-post]');
      if (card) { e.preventDefault(); openPost(card.dataset.post); }
    }
  });
 
  if (postBackBtn) {
    postBackBtn.addEventListener('click', closePost);
  }
 
  // Also reset blog to index view when switching away and back
  const origShowPage = showPage;
 
  /* ── INIT ── */
  showPage('home');
 
})();