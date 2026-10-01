import { useEffect, useState } from 'react'

export const ease = [0.22, 1, 0.36, 1]
export const viewport = { once: true, amount: 0.18, margin: '0px 0px -60px' }

export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

export const spring = { type: 'spring', stiffness: 260, damping: 22 }


export function useMotionPreference() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduced(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener?.('change', updatePreference)
    return () => mediaQuery.removeEventListener?.('change', updatePreference)
  }, [])

  return reduced
}
