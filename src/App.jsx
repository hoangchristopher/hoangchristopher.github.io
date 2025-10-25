// Week 8: Migrating Your Interactive Portfolio to React
// This starter file guides you through migrating your Week 7 vanilla JavaScript portfolio to React

import './App.css'

function App() {
  // ============================================
  // PART 1: EVENT HANDLER FUNCTIONS
  // ============================================
  // TODO: Move your Week 7 event handler functions here
  // In Week 7, you had functions like:
  // - handleNavClick (for smooth scroll)
  // - filterProjects (for project filtering)
  // - handleFormSubmit (for form validation)
  //
  // HINT: These will be regular JavaScript functions defined inside App component
  // Example from Week 7:
  //   const filterProjects = (category) => {
  //     // Your filtering logic here
  //   }
  
  // TODO: Add smooth scroll handler
  // Replace: navLinks.forEach(link => link.addEventListener('click', ...))
  // With: const handleNavClick = (e) => { ... }
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  // TODO: Add filter handler
  // Replace: filterButtons.forEach(button => button.addEventListener('click', ...))
  // With: const handleFilterClick = (category) => { ... }
  const handleFilterClick = (e) => {
    const filterValue = e.currentTarget.getAttribute('data-filter');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (filterValue === 'all' || cardCategory === filterValue) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn =>
      btn.classList.remove('active')
    );
    e.currentTarget.classList.add('active');
  };
  
  // TODO: Add form validation functions
  // You'll need: isValidEmail, showError, clearError, showSuccess
  // These can stay mostly the same!
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

  
  
  // TODO: Add form submit handler
  // Replace: contactForm.addEventListener('submit', ...)
  // With: const handleFormSubmit = (e) => { ... }
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    // Your validation logic here
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    let isValid = true;

    if (nameValue.length < 2) {
      // show error
      showError(nameValue, 'Name must be at least 2 characters');
      isValid = false;
    } else {
      showSuccess(nameValue);
    }

    if (!isValidEmail(emailValue)) {
      // show error
      showError(emailValue, 'Please enter a valid email address');
      isValid = false;
    } else {
      showSuccess(emailValue);
    }

    if (messageValue.length < 10) {
      showError(messageValue, 'Message must be at least 10 characters');
      isValid = false;
    } else {
      showSuccess(messageValue);
    }


    // etc - all your Week 7 validation logic
    

    if (isValid) {
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
      console.log('Form submitted!');
      // Show success message
    }
  };

  const handleScroll = () => {
    // Active nav highlighting
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link =>
          link.classList.remove('active')
        );
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });

    // Skill animations logic here
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillsSection = document.querySelector('#skills');
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (skillsPosition < screenPosition) {
        skillBars.forEach(bar => {
            const skillLevel = bar.style.getPropertyValue('--skill-level');
            bar.style.width = skillLevel;
        });
      }
  };

  // Attach scroll listener when component loads
  window.addEventListener('scroll', handleScroll);

  const handleMobileMenuToggle = () => {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  };
  

  // ============================================
  // PART 2: JSX RETURN STATEMENT
  // ============================================
  // TODO: Copy your Week 7 HTML structure here
  // Remember to convert HTML to JSX:
  // - class → className
  // - onclick → onClick
  // - onsubmit → onSubmit
  // - for → htmlFor
  // - All event attributes use camelCase
  //
  // IMPORTANT: Put EVERYTHING in this one return statement!
  // This week we're building a MONOLITHIC component (one big component)
  // Week 9 will teach you how to break this into smaller pieces

  return (
    <div className="portfolio">
      {/*<!-- Navigation Bar -->*/}
    <nav id="navbar">
        <div className="nav-brand">
            <span>Christopher Hoang</span>
        </div>
        <ul className="nav-menu">
            <li><a href="#home" className="nav-link" onClick={handleNavClick}>Home</a></li>
            <li><a href="#about" className="nav-link" onClick={handleNavClick}>About</a></li>
            <li><a href="#skills" className="nav-link" onClick={handleNavClick}>Skills</a></li>
            <li><a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a></li>
            <li><a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a></li>
        </ul>
        <button className="theme-toggle">🌙</button>
        {/*<!-- Moble Menu Toggle TBD -->*/}
        <div className="nav-toggle" onClick={handleMobileMenuToggle}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>
    

    {/*<!-- Hero Section -->*/}
    <section id="home" className="hero">
        <div className="hero-content">
            <h1 className="hero-title">Christopher Hoang</h1>
            <p className="hero-subtitle">Undergraduate @ University of California, Berkeley</p>
            <p className="hero-tagline">Creating impactful software</p>
            <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">View Projects</a>
                <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
        </div>
    </section>

    {/*<!-- About Section -->*/}
    <section id="about" className="section">
        <div className="container">
            <div className="about-grid">
                <img className="about-image" src="myface500.png" alt="portrait"/>

                <div className="about-text">
                    <h2>About Me</h2>
                    <p>
                        I am a 3rd year Electrical Engineering and Computer Science student at UC Berkeley interested in fullstack 
                        software engineering currently involved in visual computing research!
                    </p>
                    <div className="about-details">
                        <div className="detail-item">
                            <span className="detail-icon">📍</span>
                            <span>Berkeley, CA</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-icon">✉️</span>
                            <a href="mailto:hoangchristopher@berkeley.edu">hoangchristopher@berkeley.edu</a>
                        </div>
                    </div>
                    <div className="about-availability">
                    <h3>Currently Available For:</h3>
                    <div className="availability-tags">
                        <span className="tag tag-available">Freelance</span>
                        <span className="tag tag-available">Internships</span>
                        <span className="tag tag-available">Remote</span>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    </section>

    {/*<!-- Skills Section -->*/}
    <section id="skills" className="section section-alt">
        <div className="container">
            <h2>Skills & Technologies</h2>
            <div className="skills-grid">
                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">⚛️</span>
                        <h3 className="skill-name">React</h3>
                    </div>
                    <div className="skill-category">Frontend Framework</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{"--skill-level": "90%"}}></div>
                    </div>
                    <span className="skill-percentage">90%</span>
                </div>

                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">🎨</span>
                        <h3 className="skill-name">CSS3</h3>
                    </div>
                    <div className="skill-category">Styling</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{"--skill-level": "95%"}}></div>
                    </div>
                    <span className="skill-percentage">95%</span>
                </div>

                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">📱</span>
                        <h3 className="skill-name">Responsive Design</h3>
                    </div>
                    <div className="skill-category">Design</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{"--skill-level": "88%"}}></div>
                    </div>
                    <span className="skill-percentage">88%</span>
                </div>

                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">🚀</span>
                        <h3 className="skill-name">JavaScript</h3>
                    </div>
                    <div className="skill-category">Programming</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{"--skill-level": "85%"}}></div>
                    </div>
                    <span className="skill-percentage">85%</span>
                </div>

                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">🎯</span>
                        <h3 className="skill-name">Figma</h3>
                    </div>
                    <div className="skill-category">Design Tools</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{"--skill-level":"80%"}}></div>
                    </div>
                    <span className="skill-percentage">80%</span>
                </div>

                <div className="skill-card">
                    <div className="skill-header">
                        <span className="skill-icon">🌐</span>
                        <h3 className="skill-name">Node.js</h3>
                    </div>
                    <div className="skill-category">Backend</div>
                    <div className="skill-level">
                        <div className="skill-progress" style={{"--skill-level": "75%"}}></div>
                    </div>
                    <span className="skill-percentage">75%</span>
                </div>
            </div>
        </div>
    </section>

    {/*<!-- Projects Section -->*/}
    <section id="projects" className="section">
        <div className="container">
            <h2>Featured Projects</h2>

            <div className="filter-buttons">
                <button className="filter-btn active" data-filter="all" onClick={handleFilterClick}>All Projects</button>
                <button className="filter-btn" data-filter="frontend" onClick={handleFilterClick}>Frontend</button>
                <button className="filter-btn" data-filter="fullstack" onClick={handleFilterClick}>Full-Stack</button>
                <button className="filter-btn" data-filter="design" onClick={handleFilterClick}>Design</button>
                <button className="filter-btn" data-filter="webapp" onClick={handleFilterClick}>Web App</button>
                <button className="filter-btn" data-filter="cv" onClick={handleFilterClick}>Computer Vision</button>
                <button className="filter-btn" data-filter="computergraphics" onClick={handleFilterClick}>Computer Graphics</button>
            </div>

            <div className="projects-grid">
                <div className="project-card featured" data-category="cv">
                    <div className="project-image">
                        <img src="/cs180/project1/projectimages/emirAligned[-24, -49][17, 57].png" alt="emir"/>
                        <div className="project-overlay">
                            <div className="project-links">
                                <a href="/cs180/project1/index.html" className="project-link">
                                    <span>💻</span> View
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="project-content">
                        <div className="project-header">
                            <h3 className="project-title">Images of the Russian Empire -- Colorizing the Prokudin-Gorskii Photo Collection</h3>
                            <span className="project-category">Computer Vision</span>
                        </div>
                        <p className="project-description">Using image processing techniques to automatically produce color images from the Prokudin-Gorskii Photo Collection.</p>
                        <div className="project-tags">
                            <span className="project-tag">Python</span>
                            <span className="project-tag">NumPy</span>
                            <span className="project-tag">OpenCV</span>
                        </div>
                    </div>
                </div>

                <div className="project-card" data-category="cv">
                    <div className="project-image">
                        <img src="/cs180/project2/projectimages/24/oraple_constructed_0.jpg" alt="oraple image"/>
                        <div className="project-overlay">
                            <div className="project-links">
                                <a href="/cs180/project2/index.html" className="project-link">
                                    <span>💻</span> View
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="project-content">
                        <div className="project-header">
                            <h3 className="project-title">Image Filters and Frequency Manipulation</h3>
                            <span className="project-category">Computer Vision</span>
                        </div>
                        <p className="project-description">Analysis and manipulation of image frequencies to create hybrid/blended images.</p>
                        <div className="project-tags">
                            <span className="project-tag">Python</span>
                            <span className="project-tag">NumPy</span>
                            <span className="project-tag">OpenCV</span>
                        </div>
                    </div>
                </div>

                <div className="project-card" data-category="cv">
                    <div className="project-image">
                        <img src="/cs180/project3/projectimages/b4/plaza_mosaic_1000.jpg" alt="oraple image"/>
                        <div className="project-overlay">
                            <div className="project-links">
                                <a href="/cs180/project3/index.html" className="project-link">
                                    <span>💻</span> View
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="project-content">
                        <div className="project-header">
                            <h3 className="project-title">Auto-stitching Photo Mosaic</h3>
                            <span className="project-category">Computer Vision</span>
                        </div>
                        <p className="project-description">Automatically stitching together photos to make larger mosaics.</p>
                        <div className="project-tags">
                            <span className="project-tag">Python</span>
                            <span className="project-tag">NumPy</span>
                            <span className="project-tag">OpenCV</span>
                        </div>
                    </div>
                </div>

                <div className="project-card" data-category="computergraphics">
                    <div className="project-image">
                        <img src="/cs184/raytracer/projectimages/CBbunny_direct_s1024_m5_l4_o1.png" alt="CB_bunny"/>
                        <div className="project-overlay">
                            <div className="project-links">
                                <a href="/cs184/raytracer/index.html" className="project-link">
                                    <span>💻</span> View
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="project-content">
                        <div className="project-header">
                            <h3 className="project-title">Physically-based Ray Tracer</h3>
                            <span className="project-category">Computer Graphics</span>
                        </div>
                        <p className="project-description">Calculating billions of light rays to generate beautiful scenes.</p>
                        <div className="project-tags">
                            <span className="project-tag">C++</span>
                            <span className="project-tag">OpenGL</span>
                        </div>
                    </div>
                </div>

                <div className="project-card" data-category="computergraphics">
                    <div className="project-image">
                        <img src="/cs184/clothsim/images/part3_ks500.png" alt="CB_bunny"/>
                        <div className="project-overlay">
                            <div className="project-links">
                                <a href="/cs184/clothsim/index.html" className="project-link">
                                    <span>💻</span> View
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="project-content">
                        <div className="project-header">
                            <h3 className="project-title">Cloth Simulator</h3>
                            <span className="project-category">Computer Graphics</span>
                        </div>
                        <p className="project-description">Simulating the behavior of cloth with math and physics!</p>
                        <div className="project-tags">
                            <span className="project-tag">C++</span>
                            <span className="project-tag">OpenGL</span>
                        </div>
                    </div>
                </div>


                

                
            </div>
        </div>
    </section>

    {/*<!-- Contact Section -->*/}
    <section id="contact" className="section section-alt">
        <div className="container">
            <h2>Get In Touch</h2>
            <div className="contact-content">
                <p>I'm always interested in hearing about new opportunities and projects. Feel free to reach out!</p>

                <form id="contact-form" className="contact-form" onSubmit={handleFormSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Name *</label>
                            <input type="text" id="name" name="name" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" name="email" required/>
                        </div>

                        <div className="form-group form-group-full">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject"/>
                        </div>

                        <div className="form-group form-group-full">
                            <label htmlFor="message">Message *</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>

                        <div className="form-group form-group-full">
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    {/*<!-- Footer -->*/}
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <p>&copy; 2025 Christopher Hoang. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://github.com/hoangchristopher" className="social-link">GitHub</a>
                    <a href="https://www.linkedin.com/in/hoangchristopher/" className="social-link">LinkedIn</a>
                </div>
            </div>
        </div>
    </footer>
    </div>
  )
}

export default App
