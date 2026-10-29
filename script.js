(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    }));
  }

  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      const select = document.querySelector('#service-select');
      if (select) select.value = link.dataset.service;
    });
  });

  document.querySelectorAll('[data-package]').forEach(link => {
    link.addEventListener('click', () => {
      const details = document.querySelector('[name="details"]');
      if (details) details.value = `I'm interested in the ${link.dataset.package} package. Please share a tailored quote.`;
    });
  });

  const form = document.querySelector('#quote-form');
  const status = document.querySelector('#form-status');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const service = String(data.get('service') || '').trim();
      if (!name || !email || !service) {
        status.textContent = 'Please fill in your name, email and service first.';
        return;
      }
      const subject = encodeURIComponent(`PureHaven quote request — ${service}`);
      const body = encodeURIComponent(
        `Hello PureHaven,\\n\\nI'd like to request a quote.\\n\\nName: ${name}\\nEmail: ${email}\\nService: ${service}\\nFrequency: ${data.get('frequency') || 'Not specified'}\\nDetails: ${String(data.get('details') || '').trim() || 'None provided'}\\n\\nPlease let me know the next steps.`
      );
      status.textContent = 'Your email draft is ready. If your email app did not open, check your browser’s mail settings.';
      // Replace the placeholder inbox with the buyer's real business email before launch.
      window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();