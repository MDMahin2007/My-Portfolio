import { useEffect } from 'react'
import Lenis from 'lenis'

function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const previousScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    })

    let frameId
    const raf = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }
    frameId = window.requestAnimationFrame(raf)

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]')
      if (!anchor) return

      const targetId = anchor.getAttribute('href')
      const target = targetId && document.querySelector(targetId)
      if (!target) return

      event.preventDefault()
      lenis.scrollTo(target, { offset: -78, duration: 1.15 })
      window.history.replaceState(null, '', targetId)
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      window.cancelAnimationFrame(frameId)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    }
  }, [])

  return null
}

export default SmoothScroll
