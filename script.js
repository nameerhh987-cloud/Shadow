// ============================================================================
// Shadow Fitness – Gulshan Branch | Main Application Logic (script.js)
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const DATA = window.SHADOW_DATA || {};

  // ─── Header Scroll ────────────────────────────────────────────────────────
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }
  }, { passive: true });

  // ─── Mobile Drawer ────────────────────────────────────────────────────────
  const drawer       = document.getElementById('drawer');
  const menuToggle   = document.getElementById('menu-toggle');
  const drawerClose  = document.getElementById('drawer-close');
  const backdrop     = document.getElementById('drawer-backdrop');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  // Close drawer on any nav link or CTA click
  drawer?.querySelectorAll('.drawer-link, .btn').forEach(el => {
    el.addEventListener('click', closeDrawer);
  });

  // ─── Day Pass / Booking Modal ─────────────────────────────────────────────
  const modal      = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalForm  = document.getElementById('modal-form');
  const modalPlan  = document.getElementById('modal-plan');
  const slotSelect = document.getElementById('f-slot');

  // Populate time slots from data.js if available
  if (slotSelect && DATA.slots && DATA.slots.length > 0) {
    slotSelect.innerHTML = DATA.slots.map(s => `<option value="${s}">${s}</option>`).join('');
  }

  function openModal(plan = 'Free 1-Day Pass') {
    if (!modal) return;
    if (modalPlan) modalPlan.value = plan;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach modal trigger to all .open-modal buttons
  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan') || 'Free 1-Day Pass';
      openModal(plan);
    });
  });

  modalClose?.addEventListener('click', closeModal);

  // Close when clicking outside modal box
  modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // Keyboard escape closes modal & drawer
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      closeDrawer();
    }
  });

  // Form Submission -> WhatsApp
  modalForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('f-name')?.value.trim() || '';
    const phone = document.getElementById('f-phone')?.value.trim() || '';
    const slot  = document.getElementById('f-slot')?.value || '';
    const plan  = modalPlan?.value || 'Free 1-Day Pass';

    if (!name || !phone) return;

    const gymName = DATA.gym?.name || 'Shadow Fitness Gulshan';
    const waNumber = DATA.gym?.whatsappNumber || '923364769509';
    const msg = `Hello ${gymName}!%0A%0A*Booking Request:* ${encodeURIComponent(plan)}%0A%0A• Name: ${encodeURIComponent(name)}%0A• Phone: ${encodeURIComponent(phone)}%0A• Slot: ${encodeURIComponent(slot)}`;

    closeModal();
    showToast('Opening WhatsApp to confirm your pass…');
    setTimeout(() => {
      window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
    }, 450);
  });

  // ─── Athletic BMI Calculator ───────────────────────────────────────────────
  const bmiCalc   = document.getElementById('bmi-calc');
  const bmiResult = document.getElementById('bmi-result');
  const bmiScore  = document.getElementById('bmi-score');
  const bmiStatus = document.getElementById('bmi-status');
  const bmiAdvice = document.getElementById('bmi-advice');

  bmiCalc?.addEventListener('click', () => {
    const h = parseFloat(document.getElementById('bmi-h')?.value);
    const w = parseFloat(document.getElementById('bmi-w')?.value);

    if (!h || !w || h < 50 || h > 280 || w < 10 || w > 500) {
      showToast('Please enter valid height (cm) and weight (kg).');
      return;
    }

    const bmi = (w / Math.pow(h / 100, 2)).toFixed(1);
    if (bmiScore) bmiScore.textContent = bmi;

    let status = '', color = '', advice = '';

    if (bmi < 18.5) {
      status = 'Underweight Range';
      color  = '#fbbf24';
      advice = 'Focus on surplus nutrition, hypertrophy training, and progressive overload at Shadow Fitness.';
    } else if (bmi < 25) {
      status = 'Optimal Athletic Range';
      color  = '#34d399';
      advice = 'Excellent baseline! Focus on strength progression, powerlifting, and conditioning.';
    } else if (bmi < 30) {
      status = 'Overweight Range';
      color  = '#fb923c';
      advice = 'High-intensity conditioning, steady-state cardio, and a controlled caloric deficit are recommended.';
    } else {
      status = 'High Body Mass Range';
      color  = '#f87171';
      advice = 'Our certified trainers will map out a joint-friendly fat loss and mobility program for you.';
    }

    if (bmiStatus) {
      bmiStatus.textContent = status;
      bmiStatus.style.color = color;
    }
    if (bmiAdvice) {
      bmiAdvice.textContent = advice;
    }
    if (bmiResult) {
      bmiResult.classList.add('show');
      if (window.innerWidth < 640) {
        setTimeout(() => bmiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
      }
    }
  });

  // ─── Toast Notifications ───────────────────────────────────────────────────
  function showToast(text) {
    const toast  = document.getElementById('toast');
    const toastT = document.getElementById('toast-text');
    if (!toast || !toastT) return;
    toastT.textContent = text;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  window.showToast = showToast;
});
