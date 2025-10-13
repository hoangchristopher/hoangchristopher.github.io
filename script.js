// Select all navigation links
const navLinks = document.querySelectorAll('.nav-link');

// Add smooth scroll to each nav link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default jump

        // Get the target section ID from href
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Smooth scroll to target
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active from all links
            navLinks.forEach(link => link.classList.remove('active'));

            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Select filter buttons and project cards
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Function to filter projects
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block'; // Show matching cards
        } else {
            card.style.display = 'none'; // Hide non-matching cards
        }
    });
}

// Add event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get filter value and filter projects
        const filterValue = button.getAttribute('data-filter');
        filterProjects(filterValue);
    });
});

// Select mobile menu elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Select all skill progress bars
const skillBars = document.querySelectorAll('.skill-progress');

// Animate skills on scroll
function animateSkills() {
    const skillsSection = document.querySelector('#skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (skillsPosition < screenPosition) {
        skillBars.forEach(bar => {
            const skillLevel = bar.style.getPropertyValue('--skill-level');
            bar.style.width = skillLevel;
        });
    }
}

// Add scroll listener
window.addEventListener('scroll', animateSkills);

// Run once on load in case skills are already visible
animateSkills();

// Select form and inputs
const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(input, message) {
    // Remove any existing error
    clearError(input);

    // Create error element
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;

    // Add error class to input
    input.classList.add('error');
    input.classList.remove('success');

    // Append error after input
    input.parentElement.appendChild(error);
}

// Clear error message
function clearError(input) {
    const error = input.parentElement.querySelector('.error-message');
    if (error) {
        error.remove();
    }
    input.classList.remove('error');
}

// Show success state
function showSuccess(input) {
    clearError(input);
    input.classList.add('success');
    input.classList.remove('error');
}

// Validate name input
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
    } else {
        showSuccess(nameInput);
    }
});

// Validate email input
emailInput.addEventListener('input', () => {
    if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        showSuccess(emailInput);
    }
});

// Validate message input
messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
    } else {
        showSuccess(messageInput);
    }
});

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual submission

    // Validate all fields
    let isValid = true;

    if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    }

    // If valid, show success
    if (isValid) {
        // Create success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Thank you! Your message has been sent successfully.';

        // Append after form
        contactForm.appendChild(successMsg);

        // Clear form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            successMsg.remove();
            document.querySelectorAll('.success').forEach(input => {
                input.classList.remove('success');
            });
        }, 3000);
    }
});