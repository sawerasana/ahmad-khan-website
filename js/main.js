'use strict';

// ============================================================
// Ahmad Khan – Main JavaScript
// All interactive logic for the website.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---------- CONFIG CHECK ----------
  if (typeof SITE_CONFIG === 'undefined') {
    console.error('SITE_CONFIG not found. Make sure js/config.js is loaded.');
    return;
  }

  // ---------- DOM REFERENCES ----------
  const announcementBar = document.getElementById('announcement-bar');
  const announcementText = document.getElementById('announcement-text');
  const announcementClose = document.getElementById('announcement-close');
  const themeToggle = document.getElementById('theme-toggle');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const floatingWhatsApp = document.getElementById('floating-whatsapp');
  const currentYearSpan = document.getElementById('current-year');
  const pricingGrid = document.getElementById('pricing-grid');
  const testimonialSlider = document.getElementById('testimonial-slider');
  const faqList = document.getElementById('faq-list');
  const communityLink = document.getElementById('community-link');

  // ---------- 1. ANNOUNCEMENT BAR ----------
  if (SITE_CONFIG.showAnnouncement) {
    announcementText.textContent = SITE_CONFIG.announcementText;
    announcementBar.style.display = 'flex';
  }
  if (announcementClose) {
    announcementClose.addEventListener('click', function () {
      announcementBar.style.display = 'none';
    });
  }

  // ---------- 2. THEME TOGGLE ----------
  // Set initial theme
  const savedTheme = localStorage.getItem('ahmad-theme') || SITE_CONFIG.defaultTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ahmad-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // ---------- 3. MOBILE MENU TOGGLE ----------
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
      });
    });
  }

  // ---------- 4. SMOOTH SCROLL FOR ANCHOR LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- 5. COUNTER ANIMATION ----------
  const counters = document.querySelectorAll('.counter-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target')) || 0;
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }

  // ---------- 6. WHATSAPP LINK GENERATOR ----------
  const whatsappNumber = SITE_CONFIG.ownerWhatsApp;
  const messageTemplates = SITE_CONFIG.waMessageTemplates;

  function openWhatsApp(templateKey) {
    const message = messageTemplates[templateKey] || messageTemplates.general;
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
  }

  // All links with class 'whatsapp-link' use data-message-template
  document.querySelectorAll('.whatsapp-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const template = this.getAttribute('data-message-template') || 'general';
      openWhatsApp(template);
    });
  });

  // Hero WhatsApp button
  const heroWhatsAppBtn = document.getElementById('whatsapp-hero-btn');
  if (heroWhatsAppBtn) {
    heroWhatsAppBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openWhatsApp('general');
    });
  }

  // Contact section WhatsApp button
  const contactWhatsAppBtn = document.getElementById('whatsapp-contact-btn');
  if (contactWhatsAppBtn) {
    contactWhatsAppBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openWhatsApp('general');
    });
  }

  // Floating WhatsApp button
  if (floatingWhatsApp) {
    floatingWhatsApp.setAttribute('href', `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageTemplates.general)}`);
    floatingWhatsApp.setAttribute('target', '_blank');
    floatingWhatsApp.setAttribute('rel', 'noopener');
  }

  // Community group link
  if (communityLink && SITE_CONFIG.ownerChannelLink) {
    communityLink.href = SITE_CONFIG.ownerChannelLink;
    communityLink.style.display = 'inline-flex';
  } else if (communityLink) {
    communityLink.style.display = 'none';
  }

  // ---------- 7. PRICING TABLE RENDERING ----------
  if (pricingGrid) {
    const plans = SITE_CONFIG.pricingPlans;
    plans.forEach((plan, index) => {
      const card = document.createElement('div');
      card.className = 'pricing-card' + (index === 1 ? ' featured' : '');
      
      const featuresHTML = plan.features.map(f => `<li>${f}</li>`).join('');
      
      card.innerHTML = `
        <h3>${plan.name}</h3>
        <div class="price">Rs. ${plan.price.toLocaleString()}</div>
        <ul class="features-list">${featuresHTML}</ul>
        <a href="#" class="btn btn-primary btn-small whatsapp-link" data-message-template="promotion">Book Now</a>
      `;
      pricingGrid.appendChild(card);
      
      // Re-attach WhatsApp listener for newly created button
      card.querySelector('.whatsapp-link').addEventListener('click', function (e) {
        e.preventDefault();
        openWhatsApp('promotion');
      });
    });
  }

  // ---------- 8. TESTIMONIALS RENDERING ----------
  if (testimonialSlider) {
    const testimonials = SITE_CONFIG.testimonials;
    testimonials.forEach(t => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.innerHTML = `
        <i class="fas fa-quote-left quote-icon"></i>
        <p class="quote-text">"${t.quote}"</p>
        <p class="author">— ${t.name}</p>
        <p class="city">${t.city}</p>
      `;
      testimonialSlider.appendChild(card);
    });
  }

  // ---------- 9. FAQ ACCORDION RENDERING ----------
  if (faqList) {
    const faqItems = SITE_CONFIG.faqItems;
    faqItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'faq-item';
      div.innerHTML = `
        <button class="faq-question">
          <span>${item.question}</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="faq-answer">${item.answer}</div>
      `;
      faqList.appendChild(div);
      
      const questionBtn = div.querySelector('.faq-question');
      questionBtn.addEventListener('click', function () {
        const parent = this.parentElement;
        const isActive = parent.classList.contains('active');
        // Close all others
        document.querySelectorAll('.faq-item.active').forEach(el => el.classList.remove('active'));
        if (!isActive) {
          parent.classList.add('active');
        }
      });
    });
  }

  // ---------- 10. SOCIAL LINKS ----------
  function setSocialLink(id, url) {
    const element = document.getElementById('social-' + id);
    if (element && url) {
      element.href = url;
      element.style.display = 'inline-flex';
    }
  }
  setSocialLink('tiktok', SITE_CONFIG.socialLinks.tiktok);
  setSocialLink('instagram', SITE_CONFIG.socialLinks.instagram);
  setSocialLink('facebook', SITE_CONFIG.socialLinks.facebook);

  // ---------- 11. DYNAMIC TEXT POPULATION (data-config) ----------
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    if (SITE_CONFIG[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.value = SITE_CONFIG[key];
      } else {
        el.textContent = SITE_CONFIG[key];
      }
    }
  });

  // ---------- 12. CURRENT YEAR ----------
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
