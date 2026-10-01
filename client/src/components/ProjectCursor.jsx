import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function ProjectCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches

    if (!cursor || reducedMotion || coarsePointer || window.innerWidth < 768) return undefined

    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power2.out' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power2.out' })
    const move = (event) => {
      moveX(event.clientX)
      moveY(event.clientY)
      gsap.to(cursor, { autoAlpha: 1, duration: 0.18, overwrite: true })
    }

    window.addEventListener('mousemove', move, { passive: true })

    return () => {
      window.removeEventListener('mousemove', move)
      gsap.killTweensOf(cursor)
    }
  }, [])

  return <svg className="project-cursor" ref={cursorRef} viewBox="0 0 27 30" aria-hidden="true"><path d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z" /></svg>
}

export default ProjectCursor
