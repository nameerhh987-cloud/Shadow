// ============================================================================
// TG The Gym – Mesa | Main Application Logic + Full 3D & Animation Engine
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

  drawer?.querySelectorAll('.drawer-link, .btn').forEach(el => {
    el.addEventListener('click', closeDrawer);
  });

  // ─── Day Pass / Booking Modal ─────────────────────────────────────────────
  const modal      = document.getElementById('modal');
  const modalClose = document.getElementById('modal-close');
  const modalForm  = document.getElementById('modal-form');
  const modalPlan  = document.getElementById('modal-plan');
  const slotSelect = document.getElementById('f-slot');

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

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan') || 'Free 1-Day Pass';
      openModal(plan);
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeDrawer(); }
  });

  modalForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('f-name')?.value.trim() || '';
    const phone = document.getElementById('f-phone')?.value.trim() || '';
    const slot  = document.getElementById('f-slot')?.value || '';
    const plan  = modalPlan?.value || 'Free 1-Day Pass';
    if (!name || !phone) return;
    const gymEmail = DATA.gym?.email || 'thegymmesa@gmail.com';
    const subject = encodeURIComponent(`Free Day Pass Request – ${plan}`);
    const body = encodeURIComponent(`Hello TG The Gym Mesa!\n\nBooking Request: ${plan}\n\n• Name: ${name}\n• Phone: ${phone}\n• Preferred Slot: ${slot}\n\nPlease confirm my free day pass. Thank you!`);
    closeModal();
    showToast('Pass request sent! We\'ll confirm your slot shortly.');
    setTimeout(() => { window.location.href = `mailto:${gymEmail}?subject=${subject}&body=${body}`; }, 450);
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
    if (bmi < 18.5) { status = 'Underweight Range'; color = '#fbbf24'; advice = 'Focus on surplus nutrition, hypertrophy training, and progressive overload at TG The Gym Mesa.'; }
    else if (bmi < 25) { status = 'Optimal Athletic Range'; color = '#34d399'; advice = 'Excellent baseline! Focus on strength progression, powerlifting, and conditioning.'; }
    else if (bmi < 30) { status = 'Overweight Range'; color = '#fb923c'; advice = 'High-intensity conditioning, steady-state cardio, and a controlled caloric deficit are recommended.'; }
    else { status = 'High Body Mass Range'; color = '#f87171'; advice = 'Our certified trainers will map out a joint-friendly fat loss and mobility program for you.'; }
    if (bmiStatus) { bmiStatus.textContent = status; bmiStatus.style.color = color; }
    if (bmiAdvice) bmiAdvice.textContent = advice;
    if (bmiResult) {
      bmiResult.classList.add('show');
      if (window.innerWidth < 640) setTimeout(() => bmiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
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

  // ══════════════════════════════════════════════════════════════════════════
  // 3D PARTICLE CANVAS — Three.js powered background
  // ══════════════════════════════════════════════════════════════════════════
  loadThreeJS(() => initThreeBackground());

  function loadThreeJS(cb) {
    if (window.THREE) { cb(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  function initThreeBackground() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || !window.THREE) return;

    const getW = () => canvas.offsetWidth || window.innerWidth;
    const getH = () => canvas.offsetHeight || window.innerHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, getW() / getH(), 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(getW(), getH());
    renderer.setClearColor(0x000000, 0);

    // ── Floating Particle Field with Interactive Physics ──
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 900 : 2000;
    const geo = new THREE.BufferGeometry();
    const positions  = new Float32Array(particleCount * 3);
    const colors     = new Float32Array(particleCount * 3);
    const sizes      = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    const colCrimson = new THREE.Color('#e8192c');
    const colBright  = new THREE.Color('#ffffff');
    const colDeep    = new THREE.Color('#420a10');
    const colMuted   = new THREE.Color('#25181b');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 22;
      positions[i3 + 1] = (Math.random() - 0.5) * 22;
      positions[i3 + 2] = (Math.random() - 0.5) * 14;

      velocities[i3]     = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.0015;

      const r = Math.random();
      let col;
      if (r < 0.10)      col = colCrimson;
      else if (r < 0.25) col = colBright;
      else if (r < 0.60) col = colDeep;
      else               col = colMuted;

      colors[i3]     = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[i] = Math.random() * 3.8 + 0.8;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (320.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = clamp(0.5 + 0.5 * (position.z + 7.0) / 14.0, 0.15, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // ── 3D Torus Energy Rings ─────────────────────────────
    const torusGeo1 = new THREE.TorusGeometry(2.4, 0.015, 12, 120);
    const torusMat1 = new THREE.MeshBasicMaterial({ color: 0xe8192c, transparent: true, opacity: 0.22 });
    const torus1    = new THREE.Mesh(torusGeo1, torusMat1);
    torus1.rotation.x = Math.PI / 3;
    scene.add(torus1);

    const torusGeo2 = new THREE.TorusGeometry(3.8, 0.008, 8, 120);
    const torusMat2 = new THREE.MeshBasicMaterial({ color: 0xff3b4e, transparent: true, opacity: 0.12 });
    const torus2    = new THREE.Mesh(torusGeo2, torusMat2);
    torus2.rotation.x = -Math.PI / 5;
    torus2.rotation.y = Math.PI / 6;
    scene.add(torus2);

    // ── 3D Geometric Barbell Sculpture ────────────────────
    const barbellGroup = new THREE.Group();
    const chromeMat    = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true, transparent: true, opacity: 0.16 });
    const crimsonWire  = new THREE.MeshBasicMaterial({ color: 0xe8192c, wireframe: true, transparent: true, opacity: 0.28 });

    // Shaft
    const barGeo = new THREE.CylinderGeometry(0.035, 0.035, 3.0, 16);
    const barMesh = new THREE.Mesh(barGeo, chromeMat);
    barMesh.rotation.z = Math.PI / 2;
    barGroupSafeAdd(barbellGroup, barMesh);

    // Inner & outer weight plates (left side)
    const plateGeoL1 = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 20);
    const plateL1 = new THREE.Mesh(plateGeoL1, crimsonWire);
    plateL1.rotation.z = Math.PI / 2;
    plateL1.position.x = -1.1;
    barGroupSafeAdd(barbellGroup, plateL1);

    const plateGeoL2 = new THREE.CylinderGeometry(0.44, 0.44, 0.08, 20);
    const plateL2 = new THREE.Mesh(plateGeoL2, chromeMat);
    plateL2.rotation.z = Math.PI / 2;
    plateL2.position.x = -1.22;
    barGroupSafeAdd(barbellGroup, plateL2);

    // Inner & outer weight plates (right side)
    const plateGeoR1 = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 20);
    const plateR1 = new THREE.Mesh(plateGeoR1, crimsonWire);
    plateR1.rotation.z = Math.PI / 2;
    plateR1.position.x = 1.1;
    barGroupSafeAdd(barbellGroup, plateR1);

    const plateGeoR2 = new THREE.CylinderGeometry(0.44, 0.44, 0.08, 20);
    const plateR2 = new THREE.Mesh(plateGeoR2, chromeMat);
    plateR2.rotation.z = Math.PI / 2;
    plateR2.position.x = 1.22;
    barGroupSafeAdd(barbellGroup, plateR2);

    function barGroupSafeAdd(group, obj) { group.add(obj); }

    barbellGroup.position.set(2.8, 0.2, -1.2);
    barbellGroup.rotation.x = 0.4;
    barbellGroup.rotation.y = -0.3;
    if (!isMobile) scene.add(barbellGroup);

    // ── Floating Icosahedron Sculpture ────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0xe8192c, wireframe: true, transparent: true, opacity: 0.10 });
    const ico    = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(3.4, -2.0, -2.2);
    scene.add(ico);

    // ── Floating Octahedron Core ──────────────────────────
    const octGeo = new THREE.OctahedronGeometry(0.9, 0);
    const octMat = new THREE.MeshBasicMaterial({ color: 0xff3b4e, wireframe: true, transparent: true, opacity: 0.12 });
    const oct    = new THREE.Mesh(octGeo, octMat);
    oct.position.set(-3.2, 1.4, -2.5);
    scene.add(oct);

    // ── Mouse & Touch Parallax ────────────────────────────
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    document.addEventListener('mousemove', e => {
      targetMouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // ── Scroll Depth Tracking ─────────────────────────────
    let scrollY = 0;
    window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

    // ── 60FPS WebGL Render Loop ───────────────────────────
    let t = 0;
    function animate() {
      requestAnimationFrame(animate);
      t += 0.006;

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Update particle positions
      const pos = geo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3]     += velocities[i3];
        pos[i3 + 1] += velocities[i3 + 1];
        pos[i3 + 2] += velocities[i3 + 2];

        // Wrap around boundaries
        if (pos[i3]     >  11) pos[i3]     = -11;
        if (pos[i3]     < -11) pos[i3]     =  11;
        if (pos[i3 + 1] >  11) pos[i3 + 1] = -11;
        if (pos[i3 + 1] < -11) pos[i3 + 1] =  11;
      }
      geo.attributes.position.needsUpdate = true;

      // Camera parallax
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.035;
      camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.035;
      camera.position.z  = 5 - scrollY * 0.0018;

      // Rotate kinetic 3D geometries
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.012;

      torus1.rotation.z    = t * 0.16;
      torus2.rotation.z    = -t * 0.09;
      torus2.rotation.x    = Math.sin(t * 0.35) * 0.4 - Math.PI / 5;

      ico.rotation.x       = t * 0.22;
      ico.rotation.y       = t * 0.32;

      oct.rotation.x       = -t * 0.18;
      oct.rotation.y       = t * 0.26;

      if (barbellGroup) {
        barbellGroup.rotation.y = -0.3 + Math.sin(t * 0.6) * 0.2 + mouseX * 0.3;
        barbellGroup.rotation.x = 0.3 + Math.cos(t * 0.5) * 0.15 - mouseY * 0.2;
        barbellGroup.position.y = 0.2 + Math.sin(t * 0.8) * 0.15;
      }

      renderer.render(scene, camera);
    }
    animate();

    // Resize Handler
    function handleResize() {
      const w = getW();
      const h = getH();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', handleResize, { passive: true });
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(handleResize);
      ro.observe(canvas);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SCROLL REVEAL — Intersection Observer based entrance animations
  // ══════════════════════════════════════════════════════════════════════════
  const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .stagger-item');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('revealed'), parseInt(delay));
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ══════════════════════════════════════════════════════════════════════════
  // ANIMATED COUNTER — for stat values
  // ══════════════════════════════════════════════════════════════════════════
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4);
      const val      = eased * target;
      el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.floor(val)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MAGNETIC BUTTONS — 3D hover tilt effect
  // ══════════════════════════════════════════════════════════════════════════
  function initMagneticButtons() {
    document.querySelectorAll('.btn-primary, .btn-ghost, .call-btn, .desk-pass-btn').forEach(btn => {
      btn.classList.add('magnetic');
      btn.addEventListener('mousemove', e => {
        const r   = btn.getBoundingClientRect();
        const x   = e.clientX - r.left - r.width  / 2;
        const y   = e.clientY - r.top  - r.height / 2;
        const tx  = x * 0.22;
        const ty  = y * 0.22;
        const rx  = (-y / r.height) * 14;
        const ry  = ( x / r.width)  * 14;
        btn.style.transform = `translate(${tx}px, ${ty}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
        setTimeout(() => { btn.style.transition = ''; }, 500);
      });
    });
  }
  initMagneticButtons();

  // ══════════════════════════════════════════════════════════════════════════
  // CARD 3D TILT — perspective hover on feature cards
  // ══════════════════════════════════════════════════════════════════════════
  document.querySelectorAll('.card, .prog-card, .price-card, .contact-card, .info-card, .timing-row').forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const x   = (e.clientX - r.left) / r.width  - 0.5;
      const y   = (e.clientY - r.top)  / r.height - 0.5;
      const rx  = -y * 12;
      const ry  =  x * 12;
      const glowX = (x + 0.5) * 100;
      const glowY = (y + 0.5) * 100;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
      card.style.setProperty('--glow-x', glowX + '%');
      card.style.setProperty('--glow-y', glowY + '%');
      card.classList.add('tilt-active');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
      card.classList.remove('tilt-active');
      setTimeout(() => { card.style.transition = ''; }, 600);
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // HERO PARALLAX — subtle depth scroll on hero elements
  // ══════════════════════════════════════════════════════════════════════════
  const heroBg    = document.querySelector('.hero-bg');
  const heroGlow  = document.querySelector('.hero-glow');
  const heroBadge = document.querySelector('.hero-badge');
  const heroH1    = document.querySelector('.hero-h1');
  const heroSub   = document.querySelector('.hero-sub');
  const heroCtas  = document.querySelector('.hero-ctas');
  const heroStats = document.querySelector('.hero-stats');

  function updateParallax() {
    const sy = window.scrollY;
    if (sy > window.innerHeight * 1.5) return;
    if (heroBg)    heroBg.style.transform    = `scale(1.04) translateY(${sy * 0.18}px)`;
    if (heroGlow)  heroGlow.style.transform  = `translateY(${sy * 0.3}px)`;
    if (heroBadge) heroBadge.style.transform = `translateY(${sy * 0.08}px)`;
    if (heroH1)    heroH1.style.transform    = `translateY(${sy * 0.12}px)`;
    if (heroSub)   heroSub.style.transform   = `translateY(${sy * 0.15}px)`;
    if (heroCtas)  heroCtas.style.transform  = `translateY(${sy * 0.18}px)`;
    if (heroStats) heroStats.style.transform = `translateY(${sy * 0.22}px)`;
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();

  // ══════════════════════════════════════════════════════════════════════════
  // SECTION PROGRESS LINE — animated scan line on scroll
  // ══════════════════════════════════════════════════════════════════════════
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (window.scrollY / max * 100) + '%';
    }, { passive: true });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // FLOATING PARTICLES OVERLAY — CSS driven ambient orbs
  // ══════════════════════════════════════════════════════════════════════════
  (function createFloatingOrbs() {
    const container = document.getElementById('ambient-orbs');
    if (!container) return;
    const orbCount = window.innerWidth < 768 ? 4 : 8;
    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div');
      orb.className = 'ambient-orb';
      const size = Math.random() * 280 + 120;
      const x    = Math.random() * 100;
      const y    = Math.random() * 100;
      const dur  = Math.random() * 20 + 15;
      const del  = Math.random() * 10;
      const r    = Math.random();
      orb.style.cssText = `
        width:${size}px; height:${size}px;
        left:${x}%; top:${y}%;
        animation-duration:${dur}s;
        animation-delay:-${del}s;
        background: radial-gradient(circle, ${r < 0.4 ? 'rgba(232,25,44,0.06)' : 'rgba(255,255,255,0.025)'} 0%, transparent 70%);
      `;
      container.appendChild(orb);
    }
  })();

  // ══════════════════════════════════════════════════════════════════════════
  // STAGGER CHILDREN — for grids
  // ══════════════════════════════════════════════════════════════════════════
  document.querySelectorAll('.facilities-grid, .programs-grid, .pricing-grid').forEach(grid => {
    grid.querySelectorAll(':scope > *').forEach((child, i) => {
      child.classList.add('stagger-item');
      child.dataset.delay = i * 100;
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // GLITCH TEXT EFFECT on brand name hover
  // ══════════════════════════════════════════════════════════════════════════
  document.querySelectorAll('.brand-name, .footer-brand-name').forEach(el => {
    el.classList.add('glitch-text');
    el.dataset.text = el.textContent;
  });

  // ══════════════════════════════════════════════════════════════════════════
  // HERO TEXT TYPEWRITER effect on load
  // ══════════════════════════════════════════════════════════════════════════
  (function heroEntrance() {
    const el = document.querySelector('.hero-h1');
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)';
      el.style.opacity = '1';
      el.style.transform = '';
    }, 200);
  })();

  // ══════════════════════════════════════════════════════════════════════════
  // LIVE CURSOR GLOW (desktop only)
  // ══════════════════════════════════════════════════════════════════════════
  if (window.innerWidth > 1024) {
    const cursor = document.getElementById('cursor-glow');
    if (cursor) {
      let cx = 0, cy = 0, tx = 0, ty = 0;
      document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
      (function moveCursor() {
        cx += (tx - cx) * 0.12;
        cy += (ty - cy) * 0.12;
        cursor.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
        requestAnimationFrame(moveCursor);
      })();

      document.addEventListener('mousedown', () => cursor.classList.add('cursor-press'));
      document.addEventListener('mouseup',   () => cursor.classList.remove('cursor-press'));
      document.querySelectorAll('a, button, .tilt-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
      });
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // RE-INIT on DOM ready — re-observe after stagger classes added
  // ══════════════════════════════════════════════════════════════════════════
  document.querySelectorAll('.stagger-item').forEach(el => revealObserver.observe(el));

});
