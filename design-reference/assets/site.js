/* ============================================================
   NeuMed Franchise — shared site behavior
   Injects nav + footer, handles scroll state, mobile menu,
   reveal-on-scroll, FAQ accordion, and lead-form validation.
   ============================================================ */
(function () {
  /* ============================================================
     LEAD-FORM DELIVERY CONFIG  ←  set this up to receive emails
     ------------------------------------------------------------
     Submissions are emailed via Web3Forms (free, no server needed):
       1. Go to https://web3forms.com → enter the inbox you want
          leads delivered to → copy your Access Key.
       2. Paste it below as WEB3FORMS_KEY.
     That's it — every submission is emailed to that inbox.

     Until a key is set, the form falls back to opening the
     visitor's email client addressed to LEAD_EMAIL (still works,
     just less seamless). Every lead is also saved to localStorage.
     ============================================================ */
  const WEB3FORMS_KEY = 'YOUR-WEB3FORMS-ACCESS-KEY';      // ← paste key here
  const LEAD_EMAIL    = 'franchise@neumed.com';            // fallback inbox
  const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

  const PAGES = [
    { id: 'home', label: 'Home', href: 'Home.html' },
    { id: 'opportunity', label: 'Opportunity', href: 'Opportunity.html' },
    { id: 'process', label: 'Process', href: 'Process.html' },
    { id: 'faq', label: 'FAQ', href: 'FAQ.html' },
    { id: 'contact', label: 'Contact', href: 'Contact.html' },
  ];
  const current = document.body.getAttribute('data-page') || 'home';

  /* ---------- NAV ---------- */
  // Logo swaps by header state: white over the dark hero, color once scrolled.
  function wordmark(variant) {
    const cls = variant === 'footer' ? 'nm-logo nm-logo-footer' : 'nm-logo';
    return `<a href="Home.html" class="${cls}" aria-label="NeuMed — home">
      <img class="logo-white" src="assets/logo-white.png" alt="NeuMed" />
      <img class="logo-color" src="assets/logo-color.png" alt="NeuMed" />
    </a>`;
  }
  const navLinks = PAGES.filter(p => p.id !== 'contact')
    .map(p => `<a href="${p.href}" class="${p.id === current ? 'active' : ''}">${p.label}</a>`).join('');

  const nav = document.createElement('div');
  nav.innerHTML = `
    <header class="nav"><div class="wrap nav-inner">
      <div class="nav-left">${wordmark()}<span class="nav-tag">Franchise</span></div>
      <nav class="nav-links">
        ${navLinks}
        <a href="Contact.html" class="nm-btn nm-btn-primary" style="padding:11px 20px;font-size:14px">Request Info</a>
      </nav>
      <button class="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div></header>
    <div class="mobile-menu">
      ${PAGES.map(p => `<a href="${p.href}">${p.label}</a>`).join('')}
      <a href="Contact.html" class="nm-btn nm-btn-primary" style="justify-content:center">Request Franchise Info</a>
    </div>`;
  document.body.prepend(nav);

  const header = nav.querySelector('.nav');
  const burger = nav.querySelector('.nav-burger');
  const menu = nav.querySelector('.mobile-menu');
  burger.addEventListener('click', () => menu.classList.toggle('open'));

  function onScroll() {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- FOOTER ---------- */
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="wrap">
      <div class="footer-top">
        <div class="fcol">
          ${wordmark('footer')}
          <p class="blurb">A scalable urgent care + wellness franchise model — built for recurring revenue, durable margins, and real community impact.</p>
        </div>
        <div class="fcol">
          <h5>Franchise</h5>
          <a href="Opportunity.html">The Opportunity</a>
          <a href="Process.html">How It Works</a>
          <a href="FAQ.html">FAQ</a>
          <a href="Contact.html">Request Info</a>
        </div>
        <div class="fcol">
          <h5>Company</h5>
          <a href="https://neumed.com/about-neumed/" target="_blank" rel="noopener">About NeuMed</a>
          <a href="https://neumed.com/locations/" target="_blank" rel="noopener">Our Clinics</a>
          <a href="https://neumed.com/" target="_blank" rel="noopener">neumed.com</a>
        </div>
        <div class="fcol">
          <h5>Get in touch</h5>
          <a href="Contact.html">franchise@neumed.com</a>
          <a href="Contact.html">Book a discovery call</a>
          <a href="#" >Houston, TX</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 NeuMed Modern Urgent Care + IV Therapy</span>
        <span class="disc">This is not a franchise offering. A franchise offering is made only by a Franchise Disclosure Document. Figures shown are illustrative.</span>
      </div>
    </div>`;
  document.body.appendChild(footer);

  /* ---------- REVEAL ---------- */
  const reveals = document.querySelectorAll('[data-reveal]');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reveals.length && !/[?&]noreveal/.test(location.search)) {
    const root = document.documentElement;
    // Arm the hidden start-state up front (before paint) to avoid a flash...
    root.classList.add('reveal-armed');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el, i) => { el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms'; io.observe(el); });
    // ...but if the animation clock is frozen (headless/inactive renderer),
    // rAF never fires — so un-arm after a beat and show everything.
    let live = false;
    requestAnimationFrame(() => { live = true; });
    setTimeout(() => { if (!live || prefersReduced) root.classList.remove('reveal-armed'); }, 450);
  }

  /* ---------- FAQ ACCORDION ---------- */
  const setOpen = (a) => { a.style.maxHeight = a.scrollHeight + 'px'; };
  // Initialise any item marked open in markup — instantly, so it shows even
  // in renderers where the max-height transition can't advance.
  document.querySelectorAll('.faq-item.open .faq-a').forEach(a => {
    const prev = a.style.transition;
    a.style.transition = 'none';
    setOpen(a);
    // force reflow then restore transition for subsequent toggles
    void a.offsetHeight;
    a.style.transition = prev;
  });
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      const group = item.closest('.faq');
      if (group) group.querySelectorAll('.faq-item.open').forEach(o => {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; }
      });
      if (open) { item.classList.remove('open'); a.style.maxHeight = null; }
      else { item.classList.add('open'); setOpen(a); }
    });
  });

  /* ---------- LEAD FORM ---------- */
  const form = document.getElementById('request-form');
  if (form) {
    const wrap = form.closest('.formwrap') || form.parentElement;
    const submitBtn = form.querySelector('[type="submit"]');
    const submitLabel = submitBtn ? submitBtn.innerHTML : '';
    form.setAttribute('novalidate', '');
    const showError = (field) => field.classList.add('invalid');
    const clearError = (field) => field.classList.remove('invalid');

    // Inline status line (errors / sending), injected above the submit button
    let statusEl = null;
    if (submitBtn) {
      statusEl = document.createElement('div');
      statusEl.className = 'form-status';
      submitBtn.parentNode.insertBefore(statusEl, submitBtn);
    }
    const setStatus = (msg, kind) => {
      if (!statusEl) return;
      statusEl.textContent = msg || '';
      statusEl.className = 'form-status' + (kind ? ' ' + kind : '') + (msg ? ' show' : '');
    };

    form.querySelectorAll('input, select, textarea').forEach(inp => {
      inp.addEventListener('input', () => {
        const f = inp.closest('.field'); if (f) clearError(f);
        setStatus('');
      });
    });

    const succeed = () => {
      const nameVal = (form.querySelector('[name="name"]') || {}).value || '';
      const sn = wrap.querySelector('.form-success .sname');
      if (sn && nameVal) sn.textContent = nameVal.trim().split(' ')[0] + ', ';
      wrap.classList.add('done');
      window.scrollTo({ top: wrap.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' });
    };

    // Fallback: open the visitor's email client pre-filled (used when no
    // Web3Forms key is configured, or if the network request fails).
    const mailtoFallback = (data) => {
      const lines = [
        'New NeuMed franchise inquiry', '',
        'Name: ' + (data.name || ''),
        'Email: ' + (data.email || ''),
        'Phone: ' + (data.phone || ''),
        'Target market: ' + (data.market || ''),
        'Liquid capital: ' + (data.capital || ''),
        'Background: ' + (data.background || ''),
        'Message: ' + (data.message || ''),
      ];
      const href = 'mailto:' + LEAD_EMAIL
        + '?subject=' + encodeURIComponent('Franchise inquiry — ' + (data.name || 'New lead'))
        + '&body=' + encodeURIComponent(lines.join('\n'));
      window.location.href = href;
    };

    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      let ok = true;
      form.querySelectorAll('[required]').forEach(inp => {
        const field = inp.closest('.field');
        let valid = !!inp.value.trim();
        if (valid && inp.type === 'email') valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inp.value.trim());
        if (!valid) { showError(field); ok = false; } else { clearError(field); }
      });
      if (!ok) {
        setStatus('Please complete the highlighted fields.', 'err');
        const first = form.querySelector('.field.invalid');
        if (first) window.scrollTo({ top: first.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());

      // Always keep a local copy of the lead
      try {
        const all = JSON.parse(localStorage.getItem('nm_leads') || '[]');
        all.push({ ...data, ts: Date.now() });
        localStorage.setItem('nm_leads', JSON.stringify(all));
      } catch (e) {}

      const keyReady = WEB3FORMS_KEY && !/YOUR-WEB3FORMS/.test(WEB3FORMS_KEY);
      if (!keyReady) {
        // No email service configured yet → fall back to mail client.
        mailtoFallback(data);
        succeed();
        return;
      }

      // Send via Web3Forms → emails the submission to your inbox.
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Sending…'; }
      setStatus('Sending your request…', 'pending');
      try {
        const payload = {
          access_key: WEB3FORMS_KEY,
          subject: 'NeuMed franchise inquiry — ' + (data.name || 'New lead'),
          from_name: 'NeuMed Franchise Site',
          to_email: LEAD_EMAIL,
          name: data.name, email: data.email, phone: data.phone,
          target_market: data.market, liquid_capital: data.capital,
          background: data.background, message: data.message || '(none)',
        };
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const out = await res.json().catch(() => ({}));
        if (res.ok && out.success) {
          setStatus('');
          succeed();
        } else {
          throw new Error((out && out.message) || 'Request failed');
        }
      } catch (err) {
        // Network/service error → don't lose the lead, offer mail client.
        setStatus('We couldn\u2019t send automatically — opening your email app instead.', 'err');
        mailtoFallback(data);
        succeed();
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = submitLabel; }
      }
    });
  }
})();
