import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MotionLink } from '../motion'
const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['skills', 'Stack'],
  ['services', 'Services'],
  ['projects', 'Work'],
]

function Navbar({ activeSection }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    const handleKeyDown = (event) => event.key === 'Escape' && setOpen(false)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <motion.header className={`site-header ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`} initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
      <nav className="nav-shell container" aria-label="Main navigation">
        <MotionLink className="wordmark" href="#home" onClick={closeMenu} aria-label="Mahin.dev home">
          <img className="brand-logo" src="/images/icons/logo.svg" alt="" /><span>ahin<span className="wordmark-dot">.</span>dev</span>
        </MotionLink>
        <motion.button className="menu-toggle" type="button" aria-label="Toggle navigation menu" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)} whileTap={{ scale: 0.9 }}>
          <span /><span /><span />
        </motion.button>
        <div className="nav-menu" id="site-menu">
          <a className="nav-cv" href="/mahin-resume.pdf" download="MD-Mahin-Uddin-CV.pdf" onClick={closeMenu}>Download CV <span>↓</span></a>
          <div className="nav-links">
            {links.map(([id, label]) => (
              <a className={activeSection === id ? 'active' : ''} href={`#${id}`} key={id} onClick={closeMenu}>{label}</a>
            ))}
          </div>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let&apos;s talk <span>↗</span></a>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navbar
