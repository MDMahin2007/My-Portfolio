import { motion } from 'framer-motion'
import { ease, spring, useMotionPreference } from '../motionConfig'

function Hero() {
  const reduceMotion = useMotionPreference()
  const entrance = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
  return (
    <motion.section className="hero section-wrap" id="home" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease }}>
      <div className="hero-grid container">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={entrance} transition={{ delay: 0.15, duration: 0.6, ease }}><span className="status-dot" /> Available for opportunities</motion.div>
          <motion.p className="hero-kicker" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={entrance} transition={{ delay: 0.22, duration: 0.6, ease }}>Hello, I&apos;m <span>MD Mahin Uddin</span></motion.p>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={entrance} transition={{ delay: 0.3, duration: 0.75, ease }}>Building digital<br /><em>experiences</em> that matter.</motion.h1>
          <motion.p className="hero-summary" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={entrance} transition={{ delay: 0.4, duration: 0.65, ease }}>Aspiring full-stack developer from Dhaka, Bangladesh. I turn thoughtful ideas into responsive interfaces and dependable MERN applications.</motion.p>
          <motion.div className="hero-actions" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={entrance} transition={{ delay: 0.48, duration: 0.65, ease }}>
            <a className="button button-cv" href="/mahin-resume.pdf" download="MD-Mahin-Uddin-CV.pdf">Download CV <span>↓</span></a>
            <a className="button button-primary" href="#projects">Explore my work <span>↗</span></a>
            <a className="button button-ghost" href="#contact">Get in touch <span>→</span></a>
          </motion.div>
          <motion.div className="hero-meta" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62, duration: 0.7 }}>
            <span>Based in <strong>Dhaka, BD</strong></span>
            <span className="meta-line" />
            <span>Focused on <strong>full-stack web</strong></span>
          </motion.div>
        </div>
        <motion.div className="hero-visual" initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.9, ease }}>
          <motion.div className="visual-orbit orbit-one" animate={reduceMotion ? undefined : { rotate: [-28, -22, -28] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="visual-orbit orbit-two" animate={reduceMotion ? undefined : { rotate: [45, 50, 45] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="portrait-frame" whileHover={reduceMotion ? undefined : { rotate: 1, y: -5 }} transition={spring}>
            <div className="portrait-topline"><span>WEB</span><span>DEVELOPER</span></div>
            <motion.img src="/images/Mahin.png" alt="MD Mahin Uddin" loading="eager" initial={reduceMotion ? false : { scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.1, ease }} />
            <div className="portrait-label"><span>MD Mahin Uddin</span><small>FULL-STACK DEVELOPER</small></div>
          </motion.div>
          <motion.div className="floating-code" animate={reduceMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><span className="code-dot" /> <span>const</span> future = <b>&apos;built&apos;</b></motion.div>
          <div className="floating-stack"><small>MY STACK</small><strong>MERN</strong><span>React · Node · Mongo</span></div>
        </motion.div>
      </div>
      <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
    </motion.section>
  )
}

export default Hero
