// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const navMenu = document.getElementById('nav-menu');
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    }
  });
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Particle animation in hero section
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 3 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random animation duration
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = duration + 's';
    
    // Random delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = delay + 's';
    
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
  '.highlight-card, .skill-category, .project-card, .timeline-item, .cert-card'
);

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Skill bar animation
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const progress = progressBar.getAttribute('data-progress');
      
      // Animate the width
      setTimeout(() => {
        progressBar.style.width = progress + '%';
      }, 200);
      
      skillObserver.unobserve(progressBar);
    }
  });
}, { threshold: 0.5 });

// Observe all skill progress bars
const skillBars = document.querySelectorAll('.skill-progress');
skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Active navigation link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  const scrollPosition = window.pageYOffset + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Button ripple effect
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});

// Add smooth reveal animation on page load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Project card hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Dynamic year update in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText && currentYear > 2025) {
  footerText.textContent = footerText.textContent.replace('2025', currentYear);
}

// Add glowing cursor effect
const cursor = document.createElement('div');
cursor.className = 'cursor-glow';
cursor.style.cssText = `
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(220, 20, 60, 0.4), transparent);
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  display: none;
`;

document.body.appendChild(cursor);

// Only show cursor glow on desktop
if (window.innerWidth > 768) {
  cursor.style.display = 'block';
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });
  
  // Enhance glow on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.4), transparent)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'radial-gradient(circle, rgba(220, 20, 60, 0.4), transparent)';
    });
  });
}

// Console message for recruiters
console.log('%c👋 Hey there!', 'color: #DC143C; font-size: 24px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #FFD700; font-size: 16px;');
console.log('%cIf you\'re interested in working together, let\'s connect!', 'color: #f0f0f0; font-size: 14px;');