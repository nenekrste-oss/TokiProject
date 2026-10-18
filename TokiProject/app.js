// ─────────────────────────────────────────────
// RiftFitness — app.js  (shared across all pages)
// ─────────────────────────────────────────────
'use strict';

// ── LANGUAGE SYSTEM ──────────────────────────
let currentLang = localStorage.getItem('rf_lang') || 'en';

function applyTranslations(lang) {
  currentLang = lang;
  localStorage.setItem('rf_lang', lang);
  document.documentElement.lang = lang === 'mk' ? 'mk' : 'en';

  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });

  // Placeholder
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update language toggle button
  const btn = document.getElementById('langToggle');
  if (btn) {
    const enSpan = btn.querySelector('.lang-en');
    const mkSpan = btn.querySelector('.lang-mk');
    if (lang === 'mk') {
      enSpan.classList.remove('lang-active');
      mkSpan.classList.add('lang-active');
    } else {
      enSpan.classList.add('lang-active');
      mkSpan.classList.remove('lang-active');
    }
  }
}

function toggleLanguage() {
  applyTranslations(currentLang === 'en' ? 'mk' : 'en');
}

// ── NAV ───────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Active nav link based on current page
function setActiveNavLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
}
setActiveNavLink();

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── LANG TOGGLE BUTTON ────────────────────────
const langBtn = document.getElementById('langToggle');
if (langBtn) langBtn.addEventListener('click', toggleLanguage);

// ── COOKIE BANNER ─────────────────────────────
function initCookie() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (localStorage.getItem('rf_cookie')) { banner.classList.add('hidden'); return; }

  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('rf_cookie', 'accepted');
    banner.classList.add('hidden');
  });
  document.getElementById('cookieDecline')?.addEventListener('click', () => {
    localStorage.setItem('rf_cookie', 'declined');
    banner.classList.add('hidden');
  });
}

// ── SCROLL REVEAL ─────────────────────────────
function initReveal() {
  const els = document.querySelectorAll(
    '.prog-card, .team-card, .blog-card, .mission-card, .stat-box, .contact-detail, .section-header, .about-layout, .info-grid, .intro-layout, .test-card, .price-card, .faq-card, .schedule-table'
  );
  els.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.07}s`;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  els.forEach(el => obs.observe(el));
}

// ── CONTACT FORM ──────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = '...';
    await new Promise(r => setTimeout(r, 1400));
    const msg = document.getElementById('formSuccess');
    if (msg) { msg.style.display = 'block'; }
    form.style.display = 'none';
  });
}

// ── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
  initCookie();
  initReveal();
  initContactForm();
});
