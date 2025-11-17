import { useState } from 'react'

function Navbar() {
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Toggle mobile menu
  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Smooth scroll navigation
  const handleNavClick = (e) => {
    e.preventDefault()
    const targetId = e.target.getAttribute('href')
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      // Close mobile menu after clicking
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav id="navbar">
      <div className="nav-brand">
        <span>Alex Johnson</span>
      </div>
      <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><a href="#home" className="nav-link" onClick={handleNavClick}>Home</a></li>
        <li><a href="#about" className="nav-link" onClick={handleNavClick}>About</a></li>
        <li><a href="#skills" className="nav-link" onClick={handleNavClick}>Skills</a></li>
        <li><a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a></li>
        <li><a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a></li>
      </ul>
      <div
        className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={handleMobileToggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}

export default Navbar