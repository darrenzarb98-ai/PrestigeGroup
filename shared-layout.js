/* PRESTIGE GROUP · shared-layout.js */
(function () {

  const currentFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const navItems = [
    { href: 'index.html',        label: 'Home' },
    { href: 'about.html',        label: 'About' },
    { href: 'towing.html',       label: 'Towing' },
    { href: 'boxing.html',       label: 'Boxing' },
    { href: 'appointments.html', label: 'Book' },
    { href: 'tracking.html',     label: 'Track' },
    { href: 'payments.html',     label: 'Pay' },
    { href: 'gallery.html',      label: 'Gallery' },
    { href: 'contact.html',      label: 'Contact' },
  ];

  const cornerSVG = `<svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M4 86 L4 4 L86 4" stroke="#d4af37" stroke-width="1"/>
    <path d="M4 48 L32 4" stroke="#d4af37" stroke-width=".5" opacity=".45"/>
    <path d="M48 4 L4 28" stroke="#d4af37" stroke-width=".5" opacity=".45"/>
  </svg>`;

  const isActive = (href) => currentFile === href.toLowerCase();

  // ── Skip link + background layers + nav ──
  document.body.insertAdjacentHTML('afterbegin', `
    <a class="skip-link" href="#main-content">Skip to content</a>

    <div class="bg-fixed bg-radial" aria-hidden="true"></div>
    <div class="bg-fixed bg-noise" aria-hidden="true"></div>
    <div class="bg-fixed bg-grid" aria-hidden="true"></div>
    <div class="bg-fixed bg-scan" aria-hidden="true"></div>
    <canvas id="canvas" aria-hidden="true"></canvas>

    <div class="corner-mark corner-mark--tl" aria-hidden="true">${cornerSVG}</div>
    <div class="corner-mark corner-mark--tr" aria-hidden="true">${cornerSVG}</div>
    <div class="corner-mark corner-mark--bl" aria-hidden="true">${cornerSVG}</div>
    <div class="corner-mark corner-mark--br" aria-hidden="true">${cornerSVG}</div>

    <nav class="nav" id="mainNav" aria-label="Primary">
      <a class="nav-brand" href="index.html" aria-label="Prestige Group — home">
        <img class="nav-brand-logo" src="profilepic.png" alt="" width="42" height="42">
        <div class="nav-brand-text">
          <div class="nav-brand-name">Prestige</div>
          <div class="nav-brand-sub">Group · Malta</div>
        </div>
      </a>

      <ul class="nav-links">
        ${navItems.map(item => `
          <li><a href="${item.href}"${isActive(item.href) ? ' class="active" aria-current="page"' : ''}>${item.label}</a></li>
        `).join('')}
      </ul>

      <a href="contact.html" class="nav-cta"><span>Get in Touch</span></a>

      <button class="nav-toggle" id="navToggle" type="button"
              aria-controls="navDrawer" aria-expanded="false" aria-label="Open menu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </nav>

    <div class="nav-drawer" id="navDrawer" role="dialog" aria-modal="true" aria-label="Site menu">
      <button class="nav-drawer-close" id="navDrawerClose" type="button" aria-label="Close menu">✕</button>
      ${navItems.map(item => `
        <div class="nav-drawer-item"><a href="${item.href}"${isActive(item.href) ? ' class="active" aria-current="page"' : ''}>${item.label}</a></div>
      `).join('')}
    </div>
  `);

  // ── Wrap original page content with <main> for skip-link target ──
  (function wrapMain(){
    const page = document.querySelector('.page');
    if(!page) return;
    // Only wrap if no <main> yet
    if(!page.querySelector('main')){
      page.id = page.id || 'main-content';
      if(!page.hasAttribute('role')) page.setAttribute('role','main');
    }
  })();

  // ── Footer ──
  const year = new Date().getFullYear();
  document.body.insertAdjacentHTML('beforeend', `
    <footer class="footer">
      <div class="footer-main">

        <div>
          <div class="footer-brand-logo">
            <img src="profilepic.png" alt="" width="34" height="34">
            Prestige Group
          </div>
          <p class="footer-brand-desc">
            Premium towing and elite services across Malta — delivering reliability, speed, and trust.
          </p>
        </div>

        <div>
          <div class="footer-col-title">Navigation</div>
          <ul class="footer-links">
            ${navItems.map(item => `
              <li><a href="${item.href}">${item.label}</a></li>
            `).join('')}
          </ul>
        </div>

        <div>
          <div class="footer-col-title">Services</div>
          <ul class="footer-links">
            <li><a href="towing.html">Towing Services</a></li>
            <li><a href="boxing.html">Prince Boxing Malta</a></li>
            <li><a href="appointments.html">Book Appointment</a></li>
            <li><a href="tracking.html">Track Driver</a></li>
            <li><a href="payments.html">Make a Payment</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-col-title">Follow Us</div>
          <div class="social-links">
            <a href="https://www.facebook.com/profile.php?id=61574419577566" target="_blank" rel="noopener noreferrer" aria-label="Prestige Group on Facebook">
              <span aria-hidden="true">📘</span> Facebook
            </a>
            <a href="https://www.instagram.com/prestigegroup.mt/" target="_blank" rel="noopener noreferrer" aria-label="Prestige Group on Instagram">
              <span aria-hidden="true">📸</span> Instagram
            </a>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <div class="footer-copy">© ${year} Prestige Group Malta. All rights reserved.</div>
      </div>
    </footer>
  `);

  // ── Floating socials ──
  const fbIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M13.5 21.95V13.5h2.9l.44-3.36H13.5V7.99c0-.97.27-1.64 1.67-1.64h1.78V3.34c-.31-.04-1.37-.13-2.6-.13-2.57 0-4.33 1.57-4.33 4.45v2.48H7.1v3.36h2.92v8.45h3.48z"/></svg>`;
  const igIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.6"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.3" cy="6.7" r="1.05" fill="currentColor" stroke="none"/></svg>`;

  document.body.insertAdjacentHTML('beforeend', `
    <div class="floating-socials" aria-label="Social shortcuts">
      <a class="floating-social" href="https://www.facebook.com/profile.php?id=61574419577566" target="_blank" rel="noopener noreferrer" aria-label="Visit Prestige Group on Facebook">
        <span class="floating-social-label" aria-hidden="true">Facebook</span>
        <span class="floating-social-icon" aria-hidden="true">${fbIcon}</span>
      </a>
      <a class="floating-social" href="https://www.instagram.com/prestigegroup.mt/" target="_blank" rel="noopener noreferrer" aria-label="Visit Prestige Group on Instagram">
        <span class="floating-social-label" aria-hidden="true">Instagram</span>
        <span class="floating-social-icon" aria-hidden="true">${igIcon}</span>
      </a>
    </div>
  `);

  // ── Nav scroll state ──
  const mainNav = document.getElementById('mainNav');
  const onScroll = () => {
    if (!mainNav) return;
    mainNav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile drawer ──
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');
  const drawerClose = document.getElementById('navDrawerClose');

  const setDrawer = (open) => {
    if (!drawer || !toggle) return;
    drawer.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (toggle) toggle.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));
  if (drawerClose) drawerClose.addEventListener('click', () => setDrawer(false));
  if (drawer) {
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setDrawer(false)));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) setDrawer(false);
  });

  // Close drawer automatically on breakpoint change
  const mq = window.matchMedia('(min-width: 1025px)');
  (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))((e) => {
    if (e.matches) setDrawer(false);
  });

})();
