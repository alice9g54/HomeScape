/* ============================================================
   HOMESCAPE - PWA INSTALL PROMPT & SERVICE WORKER REGISTRATION
   Version: 1.0.0
   ============================================================ */

(function() {
  'use strict';

  // ============================================================
  // 1. SERVICE WORKER REGISTRATION
  // ============================================================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('✅ Service Worker registered:', registration.scope);
        })
        .catch(function(error) {
          console.warn('⚠️ Service Worker registration failed:', error);
        });
    });
  }

  // ============================================================
  // 2. INSTALL PROMPT
  // ============================================================
  var deferredPrompt = null;
  var installBanner = null;

  // Capture install prompt
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    console.log('💡 PWA install prompt available');
    showInstallBanner();
  });

  // Create install banner
  function showInstallBanner() {
    // Don't show if already dismissed
    if (localStorage.getItem('homescape_install_dismissed') === 'true') return;
    
    // Don't show if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    if (window.navigator.standalone === true) return;

    if (installBanner) return; // Already showing

    installBanner = document.createElement('div');
    installBanner.id = 'pwa-install-banner';
    installBanner.style.cssText = 'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:9999;max-width:90%;width:100%;animation:slideUp 0.4s ease;';
    installBanner.innerHTML = 
      '<div style="background:linear-gradient(135deg,#047857,#022c22);border-radius:1rem;padding:1rem 1.25rem;box-shadow:0 20px 40px -10px rgba(4,120,87,0.5);display:flex;align-items:center;gap:0.75rem;color:white;font-family:system-ui,-apple-system,sans-serif;border:1px solid rgba(52,211,153,0.3);">' +
        '<img src="/assets/images/icon-96x96.png" alt="HomeScape" style="width:44px;height:44px;border-radius:0.75rem;flex-shrink:0;">' +
        '<div style="flex:1;min-width:0;">' +
          '<p style="font-weight:700;font-size:0.85rem;margin:0;">Install HomeScape</p>' +
          '<p style="font-size:0.7rem;color:rgba(255,255,255,0.7);margin:0.15rem 0 0;">Get the app for faster browsing</p>' +
        '</div>' +
        '<button id="pwa-install-btn" style="background:#22c55e;color:#000;font-weight:700;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.05em;padding:0.6rem 1rem;border-radius:0.6rem;border:none;cursor:pointer;white-space:nowrap;">Install</button>' +
        '<button id="pwa-dismiss-btn" style="background:transparent;color:rgba(255,255,255,0.6);border:none;cursor:pointer;padding:0.4rem;font-size:1.2rem;line-height:1;">×</button>' +
      '</div>';

    // Add animation
    if (!document.getElementById('pwa-styles')) {
      var style = document.createElement('style');
      style.id = 'pwa-styles';
      style.textContent = '@keyframes slideUp{from{transform:translateX(-50%) translateY(100%);opacity:0}to{transform:translateX(-50%) translateY(0);opacity:1}}';
      document.head.appendChild(style);
    }

    document.body.appendChild(installBanner);

    // Install button
    document.getElementById('pwa-install-btn').addEventListener('click', function() {
      if (!deferredPrompt) return;
      
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function(choiceResult) {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ PWA installed');
          showToast('HomeScape app installed successfully!');
        } else {
          console.log('❌ PWA install dismissed');
        }
        deferredPrompt = null;
        hideInstallBanner();
      });
    });

    // Dismiss button
    document.getElementById('pwa-dismiss-btn').addEventListener('click', function() {
      localStorage.setItem('homescape_install_dismissed', 'true');
      hideInstallBanner();
    });
  }

  function hideInstallBanner() {
    if (installBanner) {
      installBanner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      installBanner.style.opacity = '0';
      installBanner.style.transform = 'translateX(-50%) translateY(100%)';
      setTimeout(function() {
        if (installBanner && installBanner.parentNode) {
          installBanner.parentNode.removeChild(installBanner);
        }
        installBanner = null;
      }, 300);
    }
  }

  // ============================================================
  // 3. TOAST
  // ============================================================
  function showToast(message) {
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:1.5rem;left:50%;transform:translateX(-50%);background:#047857;color:white;padding:0.75rem 1.25rem;border-radius:0.75rem;font-size:0.8rem;font-weight:600;z-index:10000;box-shadow:0 10px 30px rgba(4,120,87,0.4);font-family:system-ui,-apple-system,sans-serif;';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(function() {
      toast.style.transition = 'opacity 0.3s ease';
      toast.style.opacity = '0';
      setTimeout(function() {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // ============================================================
  // 4. DETECT INSTALL
  // ============================================================
  window.addEventListener('appinstalled', function() {
    console.log('✅ PWA installed');
    localStorage.setItem('homescape_install_dismissed', 'true');
    hideInstallBanner();
  });

  // ============================================================
  // 5. LOG
  // ============================================================
  console.log('🚀 PWA module loaded');

})();