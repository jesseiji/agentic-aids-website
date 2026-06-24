/* ========================================
   Agentic Aids – Main JavaScript
   ======================================== */

// --- Typing Animation for Hero ---
// Cycles through phrases with a typewriter effect
function initTypingAnimation() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'grow your business.',
    'attract new customers.',
    'stand out online.',
    'convert visitors to sales.',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex--);
    } else {
      el.textContent = current.substring(0, charIndex++);
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex > current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

// --- Mobile Navigation Toggle ---
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

// --- Navbar Scroll Effect ---
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 14, 26, 0.95)';
    } else {
      navbar.style.background = 'rgba(10, 14, 26, 0.85)';
    }
  });
}

// --- Form Validation ---
// Validates a single field and shows/hides error messages
function validateField(input) {
  const group = input.closest('.form-group');
  if (!group) return true;

  const errorEl = group.querySelector('.form-error');
  let isValid = true;
  let message = '';

  if (input.required && !input.value.trim()) {
    isValid = false;
    message = 'This field is required.';
  } else if (input.type === 'email' && input.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      isValid = false;
      message = 'Please enter a valid email address.';
    }
  } else if (input.type === 'tel' && input.value) {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
    if (!phoneRegex.test(input.value)) {
      isValid = false;
      message = 'Please enter a valid phone number.';
    }
  } else if (input.dataset.minlength && input.value.length < parseInt(input.dataset.minlength)) {
    isValid = false;
    message = `Must be at least ${input.dataset.minlength} characters.`;
  }

  if (isValid) {
    group.classList.remove('error');
  } else {
    group.classList.add('error');
    if (errorEl) errorEl.textContent = message;
  }

  return isValid;
}

// Validates password match for signup form
function validatePasswordMatch(pw, confirm) {
  const group = confirm.closest('.form-group');
  const errorEl = group ? group.querySelector('.form-error') : null;

  if (pw.value && confirm.value && pw.value !== confirm.value) {
    if (group) group.classList.add('error');
    if (errorEl) errorEl.textContent = 'Passwords do not match.';
    return false;
  }

  if (group) group.classList.remove('error');
  return true;
}

// --- Contact Form ---
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Live validation on blur
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allValid = true;

    form.querySelectorAll('input, textarea').forEach(input => {
      if (!validateField(input)) allValid = false;
    });

    if (allValid) {
      form.style.display = 'none';
      const success = document.getElementById('contactSuccess');
      if (success) success.classList.add('show');
    }
  });
}

// --- Get Started Form ---
function initGetStartedForm() {
  const form = document.getElementById('getStartedForm');
  if (!form) return;

  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allValid = true;

    form.querySelectorAll('input, textarea, select').forEach(input => {
      if (!validateField(input)) allValid = false;
    });

    if (allValid) {
      form.style.display = 'none';
      const success = document.getElementById('getStartedSuccess');
      if (success) success.classList.add('show');
    }
  });
}

// --- Login / Signup Auth ---
// Mock auth using localStorage
function initAuth() {
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (!loginTab || !signupTab) return;

  // Tab switching
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  });

  signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  });

  // Password visibility toggles
  document.querySelectorAll('.pw-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'hide';
      } else {
        input.type = 'password';
        btn.textContent = 'show';
      }
    });
  });

  // Signup
  if (signupForm) {
    signupForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('blur', () => validateField(input));
    });

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;

      signupForm.querySelectorAll('input').forEach(input => {
        if (!validateField(input)) allValid = false;
      });

      const pw = document.getElementById('signupPassword');
      const confirmPw = document.getElementById('signupConfirm');
      if (!validatePasswordMatch(pw, confirmPw)) allValid = false;

      if (allValid) {
        const email = document.getElementById('signupEmail').value;
        const password = pw.value;
        const name = document.getElementById('signupName').value;

        // Store user in localStorage
        const users = JSON.parse(localStorage.getItem('aa_users') || '{}');
        if (users[email]) {
          alert('An account with this email already exists. Please log in.');
          return;
        }

        users[email] = { name, password: btoa(password) };
        localStorage.setItem('aa_users', JSON.stringify(users));
        localStorage.setItem('aa_currentUser', JSON.stringify({ name, email }));

        showAuthSuccess(name);
      }
    });
  }

  // Login
  if (loginForm) {
    loginForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('blur', () => validateField(input));
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;

      loginForm.querySelectorAll('input').forEach(input => {
        if (!validateField(input)) allValid = false;
      });

      if (allValid) {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const users = JSON.parse(localStorage.getItem('aa_users') || '{}');

        if (!users[email] || atob(users[email].password) !== password) {
          const errorDiv = document.getElementById('loginError');
          if (errorDiv) {
            errorDiv.textContent = 'Invalid email or password.';
            errorDiv.style.display = 'block';
          }
          return;
        }

        localStorage.setItem('aa_currentUser', JSON.stringify({ name: users[email].name, email }));
        showAuthSuccess(users[email].name);
      }
    });
  }
}

function showAuthSuccess(name) {
  const card = document.querySelector('.auth-card');
  if (!card) return;

  card.innerHTML = `
    <div class="form-success show">
      <h3>Welcome, ${name}!</h3>
      <p>You're now logged in to your Agentic Aids dashboard.</p>
      <br>
      <button class="btn btn-outline" onclick="handleLogout()">Log Out</button>
    </div>
  `;
}

// Check if user is already logged in on page load
function checkAuthState() {
  const currentUser = localStorage.getItem('aa_currentUser');
  if (currentUser && document.querySelector('.auth-card')) {
    const user = JSON.parse(currentUser);
    showAuthSuccess(user.name);
  }
}

function handleLogout() {
  localStorage.removeItem('aa_currentUser');
  window.location.reload();
}

// --- Scroll Reveal Animation ---
// Fades in elements as they enter the viewport
function initScrollReveal() {
  const reveals = document.querySelectorAll(
    '.service-card, .tool-card, .portfolio-card, .pricing-card, .step, .timeline-step, .contact-info-card'
  );

  if (!reveals.length) return;

  // Set initial hidden state
  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// --- Initialize Everything ---
document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initNavToggle();
  initNavScroll();
  initContactForm();
  initGetStartedForm();
  initAuth();
  checkAuthState();
  initScrollReveal();
});
