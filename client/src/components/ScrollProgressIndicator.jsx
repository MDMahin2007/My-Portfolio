import { useEffect, useRef } from 'react'

function ScrollProgressIndicator() {
  const fillRef = useRef(null)
  const valueRef = useRef(null)

  useEffect(() => {
    let frameId = 0

    const update = () => {
      frameId = 0
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${progress})`
      if (valueRef.current) valueRef.current.textContent = `${Math.round(progress * 100).toString().padStart(2, '0')}`
    }

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress-value" ref={valueRef}>00</span>
      <span className="scroll-progress-track"><i ref={fillRef} /></span>
      <span className="scroll-progress-label">SCROLL</span>
    </div>
  )
}

export default ScrollProgressIndicator
