document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close menu when clicking a nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to nav items based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (currentPage === linkPage) {
      link.classList.add('active');
    }
  });
  
  // Intersection Observer for animations
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }
  
  // Handle form submissions (if form exists)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formStatus = document.getElementById('formStatus');
      formStatus.textContent = 'Sending message...';
      formStatus.className = 'form-status sending';
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      }, 1500);
    });
  }
  
  // Add responsive handling to external links
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    // Add appropriate aria labels
    if (!link.getAttribute('aria-label')) {
      link.setAttribute('aria-label', `${link.textContent} (opens in a new tab)`);
    }
    
    // Add rel attributes for security and performance
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // Add animation to skill bars if they exist
  const skillsList = document.querySelector('.skills-list');
  if (skillsList) {
    skillsList.querySelectorAll('li').forEach((skill, index) => {
      // Add animation delay based on index
      skill.style.opacity = '0';
      skill.style.transform = 'translateX(-20px)';
      skill.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
      
      setTimeout(() => {
        skill.style.opacity = '1';
        skill.style.transform = 'translateX(0)';
      }, 300);
    });
  }
  
  // Add animation to section cards if they exist
  const sectionCards = document.querySelectorAll('.section-card');
  if (sectionCards.length > 0) {
    sectionCards.forEach((card, index) => {
      // Add animation delay based on index
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 500);
    });
  }

  // Enhance card elements with hover animation
  const enhanceableCards = document.querySelectorAll('.project-card, .certification-card, .experience-card, .event-card, .publication-card, .award-card, .organization-card');
  enhanceableCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = this.classList.contains('experience-card') 
        ? 'translateX(8px)' 
        : 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) translateX(0)';
    });
  });

  // Add reveal animation to contact methods
  const contactMethods = document.querySelectorAll('.contact-method');
  if (contactMethods.length > 0) {
    contactMethods.forEach((method, index) => {
      method.style.opacity = '0';
      method.style.transform = 'translateY(20px)';
      method.style.transition = `opacity 0.4s ease ${index * 0.15}s, transform 0.4s ease ${index * 0.15}s`;
      
      setTimeout(() => {
        method.style.opacity = '1';
        method.style.transform = 'translateY(0)';
      }, 300);
    });
  }

  // Add lazy loading to images
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });

  // Highlight current year in timeline elements (if they exist)
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('.timeline-year').forEach(yearElement => {
    if (parseInt(yearElement.textContent) === currentYear) {
      yearElement.classList.add('current-year');
    }
  });

  // Add back-to-top button functionality
  const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '&uarr;';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.display = 'none';
    button.style.backgroundColor = 'var(--accent-color)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '50%';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.fontSize = '20px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '99';
    button.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    button.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        button.style.display = 'block';
        button.style.opacity = '1';
      } else {
        button.style.opacity = '0';
        setTimeout(() => {
          if (window.pageYOffset <= 300) {
            button.style.display = 'none';
          }
        }, 300);
      }
    });
  };
  
  // Only create back-to-top button on pages with enough content
  if (document.body.scrollHeight > window.innerHeight * 1.5) {
    createBackToTopButton();
  }

  
  
});