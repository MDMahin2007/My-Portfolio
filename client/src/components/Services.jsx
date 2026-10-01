import { services } from '../data'
import { motion } from 'framer-motion'

function Services() {
  return (
    <motion.section className="services section-wrap" id="services" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7 }}>
      <div className="container"><div className="section-heading-row services-heading"><div><span className="section-number">WHAT I DO</span><h2>Ideas into<br /><em>useful things.</em></h2></div><p>From the first wireframe to a working API, I care about the details that make software feel simple.</p></div>
        <div className="service-list">{services.map((service) => <article className="service-row" key={service.number}><div className="service-number">{service.number}</div><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="service-arrow">↗</span></article>)}</div>
      </div>
    </motion.section>
  )
}

export default Services
