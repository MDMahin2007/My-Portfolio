import { useCallback, useEffect, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import Preloader from './components/Preloader'
import ProjectCursor from './components/ProjectCursor'
import SmoothScroll from './components/SmoothScroll'
import ScrollProgressIndicator from './components/ScrollProgressIndicator'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoaded, setIsLoaded] = useState(false)

  const handlePreloaderComplete = useCallback(() => setIsLoaded(true), [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const sections = ['home', 'about', 'skills', 'services', 'projects', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] },
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">Skip to content</a>
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
      <motion.div className="app-shell" initial={{ opacity: 0, y: 8 }} animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 8 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <ParticleBackground />
        <ProjectCursor />
        <SmoothScroll />
        <ScrollProgressIndicator />
        <Navbar activeSection={activeSection} />
        <Hero />
        <main id="main-content">
          <About />
          <Skills />
          <Services />
          <Projects />
          <Clients />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </MotionConfig>
  )
}

export default App
