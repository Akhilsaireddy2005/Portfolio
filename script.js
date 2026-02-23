/* ══════════════════════════════════════════
   PORTFOLIO SCRIPT — Alex Dev
══════════════════════════════════════════ */

/* ─── Navbar scroll effect & active links ─── */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateNavbar() {
    const scrollY = window.scrollY;

    // Sticky glass effect
    navbar.classList.toggle('scrolled', scrollY > 50);

    // Back to top button
    backToTop.classList.toggle('visible', scrollY > 400);

    // Active nav link highlight
    let currentSection = '';
    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 130) currentSection = sec.id;
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* ─── Hamburger menu ─── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
});

// Close menu when nav link clicked
navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
    });
});

/* ─── Typing effect ─── */
const roles = [
    'AI & Data Science Student',
    'Full Stack Developer',
    'React.js Developer',
    'Django Developer',
    'Machine Learning Enthusiast'
];

const typedText = document.getElementById('typedText');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 110;

function type() {
    const current = roles[roleIndex];
    const displayed = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);

    typedText.textContent = displayed;
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    let delay = typingDelay;

    if (!isDeleting && charIndex === current.length + 1) {
        // Finished typing — pause then delete
        isDeleting = true;
        delay = 1800;
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting — move to next
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 500;
    } else if (isDeleting) {
        delay = 55;
    }

    setTimeout(type, delay);
}

setTimeout(type, 800);

/* ─── Scroll reveal via IntersectionObserver ─── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger the delay slightly per element
            const delay = entry.target.style.animationDelay
                ? parseFloat(entry.target.style.animationDelay) * 1000
                : 0;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── Skill bars animation ─── */
const skillFills = document.querySelectorAll('.skill-fill');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const width = fill.getAttribute('data-width');
                fill.style.width = width + '%';
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-card').forEach(card => skillsObserver.observe(card));

/* ─── Counter animation for stats ─── */
function animateCount(el, target, duration = 1500) {
    const start = performance.now();
    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    };
    requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-num').forEach(el => {
                animateCount(el, parseInt(el.getAttribute('data-count'), 10));
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

const aboutSection = document.getElementById('about');
if (aboutSection) statsObserver.observe(aboutSection);

/* ─── Contact form validation ─── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add('error');
    if (error) error.textContent = message;
}

function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.remove('error');
    if (error) error.textContent = '';
}

function clearAllErrors() {
    ['name', 'email', 'subject', 'message'].forEach(id => {
        clearError(id, `${id}Error`);
    });
}

function validateForm() {
    clearAllErrors();
    let valid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || name.length < 2) {
        setError('name', 'nameError', 'Please enter your full name (min 2 characters).');
        valid = false;
    }
    if (!email || !validateEmail(email)) {
        setError('email', 'emailError', 'Please enter a valid email address.');
        valid = false;
    }
    if (!subject || subject.length < 3) {
        setError('subject', 'subjectError', 'Please enter a subject (min 3 characters).');
        valid = false;
    }
    if (!message || message.length < 10) {
        setError('message', 'messageError', 'Message must be at least 10 characters long.');
        valid = false;
    }

    return valid;
}

/* ─── PASTE YOUR GOOGLE APPS SCRIPT URL HERE after deployment ─── */
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzzeyEcfPnnB1wnIglEXjW2REo6hUWuSE4lSIAJvvGcDTJEVk1p0H5SJD-tQi0Rp2dn7A/exec';

contactForm && contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const icon = submitBtn.querySelector('i');
    const text = submitBtn.querySelector('span');

    submitBtn.disabled = true;
    icon.className = 'fas fa-circle-notch fa-spin';
    text.textContent = 'Sending…';

    try {
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            date: new Date().toLocaleString()
        };

        await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',            // Google Apps Script requires no-cors
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        // Show success
        contactForm.classList.add('sent');
        formSuccess.classList.add('show');
        contactForm.reset();

        icon.className = 'fas fa-check';
        text.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    } catch (err) {
        console.error('Form submission error:', err);
        icon.className = 'fas fa-exclamation-triangle';
        text.textContent = 'Failed — try again';
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
    } finally {
        submitBtn.disabled = false;
    }

    setTimeout(() => {
        icon.className = 'fas fa-paper-plane';
        text.textContent = 'Send Message';
        submitBtn.style.background = '';
        formSuccess.classList.remove('show');
    }, 5000);
});

/* ─── Real-time field validation clear on input ─── */
['name', 'email', 'subject', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id, `${id}Error`));
});

/* ─── Smooth scroll for all anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* ─── Navbar transparent on hero, glass elsewhere ─── */
// Already handled by `updateNavbar()` above
