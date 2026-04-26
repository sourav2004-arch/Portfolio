/* ========================================================
   PORTFOLIO — INTERACTIVE SCRIPTS
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Initialize Lucide icons
  if (window.lucide) lucide.createIcons();

  /* --------------------------------------------------
     1. DARK / LIGHT THEME TOGGLE
  -------------------------------------------------- */
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored) html.setAttribute('data-theme', stored);

  themeToggle?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* --------------------------------------------------
     2. MOBILE NAVIGATION
  -------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* --------------------------------------------------
     3. NAVBAR SCROLL EFFECT & ACTIVE LINK HIGHLIGHT
  -------------------------------------------------- */
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('.section, .hero');
  const allLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    // Scrolled class
    navbar?.classList.toggle('scrolled', window.scrollY > 50);

    // Back-to-top visibility
    backToTop?.classList.toggle('visible', window.scrollY > 400);

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    allLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --------------------------------------------------
     4. BACK TO TOP BUTTON
  -------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* --------------------------------------------------
     5. REVEAL ON SCROLL (Intersection Observer)
  -------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------
     6. ANIMATED STAT COUNTERS
  -------------------------------------------------- */
  const statEls = document.querySelectorAll('.stat-value');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current;
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => counterObserver.observe(el));

  /* --------------------------------------------------
     7. SKILL BAR ANIMATION
  -------------------------------------------------- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(el => skillObserver.observe(el));

  /* --------------------------------------------------
     8. PROJECT FILTERING
  -------------------------------------------------- */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const cats = card.dataset.category || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* --------------------------------------------------
     9. TYPEWRITER EFFECT
  -------------------------------------------------- */
  const typewriterEl = document.getElementById('typewriter');
  const phrases = [
    'Full Stack Developer',
    'Python Enthusiast',
    'API Architect',
    'Open Source Contributor'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typewrite() {
    const currentPhrase = phrases[phraseIndex];
    if (!deleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(typewrite, 1800);
        return;
      }
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typewrite, deleting ? 40 : 80);
  }
  if (typewriterEl) typewrite();

  /* --------------------------------------------------
     10. CONTACT FORM (Demo handler)
  -------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSubmit  = document.getElementById('formSubmit');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    formSubmit.innerHTML = '<span>✓ Message Sent!</span>';
    formSubmit.style.background = 'linear-gradient(135deg, #22c55e, #10b981)';
    formSubmit.disabled = true;
    setTimeout(() => {
      formSubmit.innerHTML = '<i data-lucide="send"></i> Send Message';
      formSubmit.style.background = '';
      formSubmit.disabled = false;
      contactForm.reset();
      if (window.lucide) lucide.createIcons();
    }, 2500);
  });

  /* --------------------------------------------------
     11. PARTICLE CANVAS (Hero background)
  -------------------------------------------------- */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
      canvas.width  = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 92, 252, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(124, 92, 252, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // CSS keyframe for filter animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

});
