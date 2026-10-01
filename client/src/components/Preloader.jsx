import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Preloader({ onComplete }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let finished = false
    const finish = () => {
      if (!finished) {
        finished = true
        onComplete()
      }
    }

    if (prefersReducedMotion) {
      const reducedMotionTimer = window.setTimeout(finish, 2000)
      return () => window.clearTimeout(reducedMotionTimer)
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: finish })
      timeline
        .fromTo('.preloader-kicker', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' })
        .fromTo('.preloader-name', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.12')
        .to('.preloader-content', { y: -30, opacity: 0, duration: 0.45, ease: 'power2.in' }, '+=0.3')
        .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.75, ease: 'power4.inOut' }, '-=0.12')

      return () => timeline.kill()
    }, root)

    return () => {
      context.revert()
      finished = true
    }
  }, [onComplete])

  return (
    <div className="preloader" ref={rootRef} role="status" aria-live="polite" aria-label="Loading Mahin.dev portfolio">
      <div className="preloader-content">
        <span className="preloader-kicker">PORTFOLIO / FULL-STACK DEVELOPMENT</span>
        <h1 className="preloader-name">MD<br /><em>MAHIN UDDIN</em></h1>
      </div>
    </div>
  )
}

export default Preloader
