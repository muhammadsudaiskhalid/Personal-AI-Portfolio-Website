/* ============================================
   MAINLABS-STYLE PORTFOLIO
   Sudais Khalid - AI Engineer
   Clean, Minimal JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNavigation();
  initScrollAnimations();
  initScrollTop();
  initCounters();
});

/* ============================================
   PAGE LOADER
   ============================================ */
function initLoader() {
  const loader = document.querySelector('.page-loader');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded');
    }, 800);
  });
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const dot = document.querySelector('.cursor-dot');
  
  if (!cursor || !dot) return;
  
  // Check for touch device
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    dot.style.display = 'none';
    return;
  }
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows immediately
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });
  
  // Smooth cursor follow
  function animate() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animate);
  }
  animate();
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .work-card, .service-card, .tech-item');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.borderColor = 'rgba(99, 102, 241, 0.8)';
      dot.style.transform = 'translate(-50%, -50%) scale(0)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderColor = 'rgba(99, 102, 241, 0.5)';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
  const header = document.querySelector('header');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  
  // Scroll effect
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  // Add reveal class to elements
  const animateElements = document.querySelectorAll(
    '.about-intro, .about-content, .service-card, .why-content, .why-visual, .work-card, .cta-content, .section-header'
  );
  
  animateElements.forEach(el => {
    el.classList.add('reveal');
  });
  
  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
  
  // Stagger animation for grid items
  const grids = document.querySelectorAll('.services-grid, .work-grid, .tech-stack');
  
  grids.forEach(grid => {
    const items = grid.children;
    Array.from(items).forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  });
}

/* ============================================
   SCROLL TO TOP
   ============================================ */
function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTop');
  
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const text = element.textContent;
  const hasPlus = text.includes('+');
  const hasPercent = text.includes('%');
  const target = parseInt(text.replace(/[^0-9]/g, ''));
  
  if (isNaN(target)) return;
  
  let current = 0;
  const duration = 2000;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out
    const easeOut = 1 - Math.pow(1 - progress, 3);
    current = Math.floor(target * easeOut);
    
    let display = current.toString();
    if (hasPlus) display += '+';
    if (hasPercent) display += '%';
    
    element.textContent = display;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

/* ============================================
   TILT EFFECT ON CARDS
   ============================================ */
const tiltCards = document.querySelectorAll('.work-card, .service-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/* ============================================
   MAGNETIC BUTTONS
   ============================================ */
const magneticBtns = document.querySelectorAll('.btn-primary, .nav-cta');

magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

/* ============================================
   PARALLAX ON PARTICLES
   ============================================ */
const particles = document.querySelectorAll('.particle');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  particles.forEach((particle, index) => {
    const speed = 0.5 + (index * 0.1);
    particle.style.transform = `translateY(${scrollY * speed * -0.3}px)`;
  });
});

/* ============================================
   INIT COMPLETE
   ============================================ */
console.log('🚀 Portfolio initialized - Sudais Khalid');
