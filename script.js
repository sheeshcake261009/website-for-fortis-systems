// Navigation scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

function handleScroll() {
  const currentScroll = window.scrollY;

  if (currentScroll > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
}

window.addEventListener('scroll', handleScroll);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
});

// Product tabs
const productTabs = document.querySelectorAll('.product-tab');
const productAuxilium = document.getElementById('product-auxilium');
const productSynapse = document.getElementById('product-synapse');

productTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const product = tab.dataset.product;

    // Update active tab
    productTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show/hide product content
    if (product === 'auxilium') {
      productAuxilium.classList.remove('hidden');
      productAuxilium.classList.add('active');
      productSynapse.classList.add('hidden');
      productSynapse.classList.remove('active');
    } else {
      productSynapse.classList.remove('hidden');
      productSynapse.classList.add('active');
      productAuxilium.classList.add('hidden');
      productAuxilium.classList.remove('active');
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form submission handler - Formspree
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const formData = new FormData(contactForm);

      const response = await fetch('https://formspree.io/f/xnjyyzja', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        alert('Thank you! Your message has been sent.');
        contactForm.reset();
      } else {
        alert('There was a problem sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('A network error occurred. Please try again later.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// Add animation delays to icon cells
document.querySelectorAll('.icon-cell svg').forEach((svg, index) => {
  svg.style.animationDelay = `${index * 0.2}s`;
});