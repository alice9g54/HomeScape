/* ============================================================
   HOMESCAPE — API CONFIG & HELPERS
   ============================================================
   Purpose: Central configuration + fetch helpers.
   Every page imports this. Change API_BASE when backend arrives.

   DEVELOPMENT:  API_BASE = '/data'  (reads JSON files)
   PRODUCTION:   API_BASE = '/api'   (reads backend)
   ============================================================ */

window.HS = (function() {
  'use strict';

  var CONFIG = {
    // ⚠️ CHANGE THIS ONE LINE WHEN BACKEND IS READY:
    API_BASE: '/data',          // ← JSON files
    // API_BASE: '/api',        // ← uncomment when backend is live

    // Company contact — used everywhere
    COMPANY: {
      name: 'HomeScape Real Estate Group',
      phone: '+254722123456',
      phoneFormatted: '+254 722 123 456',
      phone2: '+254733123456',
      phone2Formatted: '+254 733 123 456',
      whatsapp: '254722123456',
      whatsappUrl: 'https://wa.me/254722123456',
      email: 'inquiries@homescape.co.ke',
      emailSupport: 'support@homescape.co.ke',
      address: 'HomeScape Plaza, 4th Floor, Westlands Road, Nairobi, Kenya',
      hours: 'Mon–Fri 08:00–18:00, Sat 09:00–15:00'
    },

    // Endpoints (used by every page)
    ENDPOINTS: {
      properties: '/properties.json',
      videos: '/videos.json',
      testimonials: '/testimonials.json',
      inquiries: '/inquiries',       // POST only — backend needed
      bookings: '/bookings'          // POST only — backend needed
    }
  };

  // ============================================================
  // FETCH HELPERS
  // ============================================================

  async function apiGet(key) {
    var url = CONFIG.API_BASE + (CONFIG.ENDPOINTS[key] || key);
    var res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      credentials: 'same-origin'
    });
    if (!res.ok) throw new Error('API_UNAVAILABLE');
    return res.json();
  }

  async function apiPost(key, body) {
    var url = CONFIG.API_BASE + (CONFIG.ENDPOINTS[key] || key);
    var res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('API_UNAVAILABLE');
    return res.json();
  }

  // ============================================================
  // HELPERS — used everywhere
  // ============================================================

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    var div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  }

  function sanitizeURL(url) {
    if (!url) return '';
    var s = String(url).trim();
    if (s.indexOf('javascript:') === 0 || s.indexOf('data:') === 0) return '';
    return s;
  }

  function formatPrice(value) {
    if (!value && value !== 0) return 'KSh 0';
    return 'KSh ' + Number(value).toLocaleString('en-KE');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
      var d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) { return '—'; }
  }

  function getParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function whatsappLink(message) {
    var base = CONFIG.COMPANY.whatsappUrl;
    if (message) return base + '?text=' + encodeURIComponent(message);
    return base;
  }

  function phoneLink() {
    return 'tel:' + CONFIG.COMPANY.phone.replace(/\s/g, '');
  }

  function emailLink(subject, body) {
    var link = 'mailto:' + CONFIG.COMPANY.email;
    var params = [];
    if (subject) params.push('subject=' + encodeURIComponent(subject));
    if (body) params.push('body=' + encodeURIComponent(body));
    if (params.length) link += '?' + params.join('&');
    return link;
  }

  // ============================================================
  // PUBLIC API
  // ============================================================

  return {
    CONFIG: CONFIG,
    apiGet: apiGet,
    apiPost: apiPost,
    escapeHTML: escapeHTML,
    sanitizeURL: sanitizeURL,
    formatPrice: formatPrice,
    formatDate: formatDate,
    getParam: getParam,
    whatsappLink: whatsappLink,
    phoneLink: phoneLink,
    emailLink: emailLink
  };

})();