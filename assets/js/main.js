/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SMOOTH SCROLLING ===============*/
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

/*=============== COUNTER ANIMATION ===============*/
function animateCounters() {
    const counters = document.querySelectorAll('.stat__number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

/*=============== PORTFOLIO FILTER ===============*/
const filterButtons = document.querySelectorAll('.filter__button');
const portfolioItems = document.querySelectorAll('.portfolio__item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.backgroundColor = '#27AE60';
            
            // Reset form
            this.reset();
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
            }, 3000);
        }, 2000);
    });
}

/*=============== SCROLL ANIMATIONS ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation when stats section is visible
            if (entry.target.classList.contains('home__stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.section__header, .about__content, .portfolio__grid, .services__container, .contact__container, .home__stats');
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

/*=============== PARALLAX EFFECT ===============*/
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.home__bg-img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/*=============== LOADING ANIMATION ===============*/
window.addEventListener('load', () => {
    // Add loading animation to hero elements
    const heroElements = document.querySelectorAll('.home__title, .home__description, .home__buttons');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

/*=============== HEADER SCROLL EFFECT ===============*/
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

/*=============== PORTFOLIO HOVER EFFECTS ===============*/
const portfolioCards = document.querySelectorAll('.portfolio__item');

portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

/*=============== SERVICE CARDS STAGGER ANIMATION ===============*/
const serviceCards = document.querySelectorAll('.service__card');

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    serviceObserver.observe(card);
});

/*=============== TYPING EFFECT FOR HERO TITLE ===============*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.home__title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

/*=============== MOUSE CURSOR EFFECT ===============*/
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

/*=============== PERFORMANCE OPTIMIZATION ===============*/
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    scrollHeader();
    scrollUp();
    scrollActive();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

/*=============== LAZY LOADING IMAGES ===============*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*=============== PRELOADER ===============*/
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

/*=============== BACK TO TOP SMOOTH SCROLL ===============*/
const scrollUpButton = document.getElementById('scroll-up');
if (scrollUpButton) {
    scrollUpButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*=============== FORM VALIDATION ===============*/
const formInputs = document.querySelectorAll('.form__input');

formInputs.forEach(input => {
    input.addEventListener('blur', validateInput);
    input.addEventListener('input', clearValidation);
});

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing validation classes
    input.classList.remove('valid', 'invalid');
    
    if (input.hasAttribute('required') && !value) {
        input.classList.add('invalid');
        showValidationMessage(input, 'This field is required');
    } else if (input.type === 'email' && value && !isValidEmail(value)) {
        input.classList.add('invalid');
        showValidationMessage(input, 'Please enter a valid email address');
    } else if (value) {
        input.classList.add('valid');
        hideValidationMessage(input);
    }
}

function clearValidation(e) {
    const input = e.target;
    input.classList.remove('invalid');
    hideValidationMessage(input);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showValidationMessage(input, message) {
    hideValidationMessage(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-message';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

function hideValidationMessage(input) {
    const existingMessage = input.parentNode.querySelector('.validation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

/*=============== MOBILE MENU IMPROVEMENTS ===============*/
const navToggleBtn = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        navToggleBtn.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggleBtn.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            navToggleBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

/*=============== INITIALIZE ALL FUNCTIONS ===============*/
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and effects
    console.log('Crestbourne website loaded successfully');
    
    // Add initial styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .home__title, .home__description, .home__buttons {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .validation-message {
            color: #E74C3C;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            animation: fadeInUp 0.3s ease;
        }
        
        .form__input.valid {
            border-color: #27AE60;
        }
        
        .form__input.invalid {
            border-color: #E74C3C;
        }
        
        .menu-open {
            overflow: hidden;
        }
        
        .nav__toggle.active {
            transform: rotate(90deg);
        }
    `;
    document.head.appendChild(style);

    // New logo animation script
    const logoParts = document.querySelectorAll('.logo-text .crest, .logo-text .bourne');
    let totalDelay = 0;

    logoParts.forEach(part => {
        const text = part.textContent;
        if (part.querySelector('.char')) {
            return;
        }
        part.innerHTML = ''; 
        
        text.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.textContent = char;
            charSpan.style.animationDelay = `${totalDelay}s`;
            part.appendChild(charSpan);
            totalDelay += 0.05;
        });
    });
});



/*=============== ANIMATED COUNTERS ===============*/
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return; // Prevent multiple animations
    countersAnimated = true;
    
    const counters = document.querySelectorAll('.stat__number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds animation
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                
                // Format numbers with commas for large numbers
                if (target >= 1000) {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                } else {
                    counter.textContent = Math.floor(current) + '+';
                }
                
                requestAnimationFrame(updateCounter);
            } else {
                // Final formatting
                if (target >= 1000) {
                    counter.textContent = target.toLocaleString() + '+';
                } else {
                    counter.textContent = target + '+';
                }
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for triggering animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            setTimeout(() => {
                animateCounters();
            }, 200); // Small delay to ensure visibility
            statsObserver.unobserve(entry.target); // Only animate once
        }
    });
}, {
    threshold: 0.3 // Trigger when 30% of the stats section is visible
});

// Observe the stats section and add fallback
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.home__stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
        
        // Fallback: trigger animation after 3 seconds if not already triggered
        setTimeout(() => {
            if (!countersAnimated) {
                animateCounters();
            }
        }, 3000);
    }
});

// Also trigger on scroll as additional fallback
window.addEventListener('scroll', () => {
    if (!countersAnimated) {
        const statsSection = document.querySelector('.home__stats');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateCounters();
            }
        }
    }
});


/*=============== GLASSMORPHISM HEADER SCROLL ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scrolled class
    if (this.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Add scroll event listener
window.addEventListener('scroll', scrollHeader);

// Initialize header state on page load
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// This script handles the sequential letter fade-in animation on page load.
document.addEventListener('DOMContentLoaded', () => {
    const logoParts = document.querySelectorAll('.logo-text .crest, .logo-text .bourne');
    let totalDelay = 0;

    logoParts.forEach(part => {
        const text = part.textContent;
        // Check if the element has already been processed to prevent re-running
        if (part.querySelector('.char')) {
            return;
        }
        part.innerHTML = ''; // Clear the original text
        
        // Split text into characters, wrap each in a span, and apply animation delay
        text.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.textContent = char;
            // Stagger the animation for each letter
            charSpan.style.animationDelay = `${totalDelay}s`;
            part.appendChild(charSpan);
            totalDelay += 0.05; // Increment delay for the next letter
        });
    });
});


