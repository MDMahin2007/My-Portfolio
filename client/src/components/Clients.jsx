import { motion } from 'framer-motion'

function Clients() {
  return (
    <motion.section className="clients section-wrap" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
      <div className="container client-banner"><div className="client-quote-mark">“</div><div><span className="section-number">WORKING TOGETHER</span><h2>Good work starts<br />with a <em>good conversation.</em></h2></div><p>Whether you have a product idea, a team to join, or simply want to talk tech — I&apos;d love to hear from you.</p></div>
    </motion.section>
  )
}

export default Clients
