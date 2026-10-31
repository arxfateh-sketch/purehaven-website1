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



  // Demo estimator rates in PKR. Replace these with the buyer's real prices.
  const estimateType = document.querySelector('#estimate-type');
  const estimateBeds = document.querySelector('#estimate-beds');
  const estimateBaths = document.querySelector('#estimate-baths');
  const estimateFrequency = document.querySelector('#estimate-frequency');
  const estimatePrice = document.querySelector('#estimate-price');
  const estimateSummary = document.querySelector('#estimate-summary');
  const estimateWhatsApp = document.querySelector('#estimate-whatsapp');
  const whatsappNumber = '92345598786'; // Pakistan country code + user's number, without leading 0 or +
  const typeNames = { standard: 'Standard clean', deep: 'Deep clean', move: 'Move-in / move-out clean' };
  const frequencyNames = { once: 'One-time', weekly: 'Weekly', fortnightly: 'Every two weeks', monthly: 'Monthly' };
  function updateEstimate() {
    if (!estimateType || !estimateBeds || !estimateBaths || !estimateFrequency) return;
    const beds = Number(estimateBeds.value);
    const baths = Number(estimateBaths.value);
    const multipliers = { standard: 1, deep: 1.55, move: 1.8 };
    const frequencyDiscounts = { once: 1, weekly: 0.85, fortnightly: 0.9, monthly: 0.95 };
    const amount = Math.round((3500 + beds * 1000 + baths * 750) * multipliers[estimateType.value] * frequencyDiscounts[estimateFrequency.value] / 250) * 250;
    const summary = `${typeNames[estimateType.value]} · ${beds === 0 ? 'Studio' : beds + (beds === 5 ? '+' : '') + ' bedroom' + (beds === 1 ? '' : 's')} · ${baths + (baths === 4 ? '+' : '')} bathroom${baths === 1 ? '' : 's'} · ${frequencyNames[estimateFrequency.value]}`;
    if (estimatePrice) estimatePrice.textContent = 'PKR ' + amount.toLocaleString('en-PK');
    if (estimateSummary) estimateSummary.textContent = summary;
    if (estimateWhatsApp) {
      const message = `Hello PureHaven! I'd like to ask about this cleaning estimate:\n${summary}\nIllustrative estimate: PKR ${amount.toLocaleString('en-PK')}\nPlease confirm your actual price and availability.`;
      estimateWhatsApp.onclick = () => window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    }
  }
  [estimateType, estimateBeds, estimateBaths, estimateFrequency].forEach(el => el && el.addEventListener('change', updateEstimate));
  updateEstimate();

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
