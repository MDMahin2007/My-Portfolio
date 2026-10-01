import { motion } from 'framer-motion'
import { ease, revealVariants, spring, useMotionPreference, viewport } from './motionConfig'

export function Reveal({ children, className, delay = 0, variants = revealVariants, ...props }) {
  const reduceMotion = useMotionPreference()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function MotionLink({ children, className, ...props }) {
  return (
    <motion.a className={className} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} transition={spring} {...props}>
      {children}
    </motion.a>
  )
}

export function MotionButton({ children, className, ...props }) {
  return (
    <motion.button className={className} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} transition={spring} {...props}>
      {children}
    </motion.button>
  )
}
