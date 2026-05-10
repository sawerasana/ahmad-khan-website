'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // ---------- CONFIG CHECK ----------
  if (typeof SITE_CONFIG === 'undefined') {
    console.error('SITE_CONFIG not found. Ensure js/config.js is loaded.');
    return;
  }

  // ---------- DOM REFERENCES ----------
  const channelsGrid = document.getElementById('channels-grid');
  const loader = document.getElementById('channels-loader');
  const noResults = document.getElementById('no-channels');
  const categoryFilter = document.getElementById('category-filter');
  const followersFilter = document.getElementById('followers-filter');
  const priceFilter = document.getElementById('price-filter');
  const sortFilter = document.getElementById('sort-filter');
  const resetFiltersBtn = document.getElementById('reset-filters');
  const floatingWhatsapp = document.getElementById('floating-whatsapp');
  const announcementBar = document.getElementById('announcement-bar');
  const announcementText = document.getElementById('announcement-text');
  const announcementClose = document.getElementById('announcement-close');
  const currentYearSpan = document.getElementById('current-year');
  const themeToggle = document.getElementById('theme-toggle');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // ---------- GLOBAL CHANNELS DATA ----------
  let allChannels = [];

  // ---------- INITIAL SETUP ----------
  setAnnouncementBar();
  setThemeFromStorage();
  setCurrentYear();
  setMobileMenu();
  setFloatingWhatsapp();
  setSocialLinks();
  loadChannels();

  // ---------- 1. ANNOUNCEMENT BAR ----------
  function setAnnouncementBar() {
    if (SITE_CONFIG.showAnnouncement) {
      announcementText.textContent = SITE_CONFIG.announcementText;
      announcementBar.style.display = 'flex';
    }
    if (announcementClose) {
      announcementClose.addEventListener('click', function () {
        announcementBar.style.display = 'none';
      });
    }
  }

  // ---------- 2. THEME ----------
  function setThemeFromStorage() {
    const saved = localStorage.getItem('ahmad-theme') || SITE_CONFIG.defaultTheme || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('ahmad-theme', next);
        updateThemeIcon(next);
      });
    }
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // ---------- 3. CURRENT YEAR ----------
  function setCurrentYear() {
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }
  }

  // ---------- 4. MOBILE MENU ----------
  function setMobileMenu() {
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
      });
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
          navLinks.classList.remove('active');
        });
      });
    }
  }

  // ---------- 5. FLOATING WHATSAPP ----------
  function setFloatingWhatsapp() {
    if (floatingWhatsapp) {
      const number = SITE_CONFIG.ownerWhatsApp;
      const message = SITE_CONFIG.waMessageTemplates.buyChannel || 'Hello, I want to buy a channel.';
      floatingWhatsapp.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      floatingWhatsapp.target = '_blank';
      floatingWhatsapp.rel = 'noopener';
    }
  }

  // ---------- 6. SOCIAL LINKS ----------
  function setSocialLinks() {
    function setLink(id, url) {
      const el = document.getElementById('social-' + id);
      if (el && url) {
        el.href = url;
        el.style.display = 'inline-flex';
      }
    }
    setLink('tiktok', SITE_CONFIG.socialLinks.tiktok);
    setLink('instagram', SITE_CONFIG.socialLinks.instagram);
    setLink('facebook', SITE_CONFIG.socialLinks.facebook);
  }

  // ---------- 7. LOAD CHANNELS ----------
  async function loadChannels() {
    try {
      const response = await fetch(SITE_CONFIG.channelsDataUrl || 'js/channels.json');
      if (!response.ok) throw new Error('Failed to load channels');
      allChannels = await response.json();
      applyFiltersAndRender();
    } catch (error) {
      console.error(error);
      if (loader) loader.innerHTML = '<p style="color:red;">Error loading channels. Please try again.</p>';
    }
  }

  // ---------- 8. APPLY FILTERS & SORT ----------
  function applyFiltersAndRender() {
    const category = categoryFilter?.value || 'all';
    const minFollowers = parseInt(followersFilter?.value || 0);
    const maxPrice = parseInt(priceFilter?.value || 999999);
    const sortBy = sortFilter?.value || 'followers-desc';

    let filtered = allChannels.filter(channel => {
      if (category !== 'all' && channel.category !== category) return false;
      if (channel.followers < minFollowers) return false;
      if (channel.price > maxPrice) return false;
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'followers-desc': filtered.sort((a, b) => b.followers - a.followers); break;
      case 'followers-asc': filtered.sort((a, b) => a.followers - b.followers); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
    }

    renderChannels(filtered);
  }

  // ---------- 9. RENDER CHANNELS ----------
  function renderChannels(channels) {
    if (!channelsGrid) return;

    // Clear grid
    channelsGrid.innerHTML = '';

    if (channels.length === 0) {
      if (noResults) noResults.style.display = 'block';
      return;
    }

    if (noResults) noResults.style.display = 'none';

    channels.forEach(channel => {
      const card = document.createElement('div');
      card.className = 'channel-card';

      const whatsappMessage = `Assalam-o-Alaikum! I am interested in the channel "${channel.name}".`;

      card.innerHTML = `
        <div class="channel-card-image">
          <img src="${channel.image || 'assets/images/channel-placeholder.png'}" alt="${channel.name}" loading="lazy">
        </div>
        <div class="channel-card-body">
          <span class="channel-category">${channel.category}</span>
          <h3>${channel.name}</h3>
          <p class="channel-desc">${channel.description || ''}</p>
          <div class="channel-stats">
            <span><i class="fas fa-users"></i> ${formatNumber(channel.followers)} followers</span>
            <span class="channel-price">Rs. ${channel.price.toLocaleString()}</span>
          </div>
          <a href="https://wa.me/${SITE_CONFIG.ownerWhatsApp}?text=${encodeURIComponent(whatsappMessage)}" 
             class="btn btn-primary btn-small" target="_blank" rel="noopener">
            <i class="fab fa-whatsapp"></i> Inquire Now
          </a>
        </div>
      `;

      channelsGrid.appendChild(card);
    });
  }

  // ---------- 10. FORMAT NUMBER ----------
  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  }

  // ---------- 11. FILTER EVENT LISTENERS ----------
  [categoryFilter, followersFilter, priceFilter, sortFilter].forEach(filter => {
    if (filter) filter.addEventListener('change', applyFiltersAndRender);
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', function () {
      if (categoryFilter) categoryFilter.value = 'all';
      if (followersFilter) followersFilter.value = '0';
      if (priceFilter) priceFilter.value = '999999';
      if (sortFilter) sortFilter.value = 'followers-desc';
      applyFiltersAndRender();
    });
  }

});
