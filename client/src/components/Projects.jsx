import { projects, profile } from '../data'
import { motion } from 'framer-motion'

function Projects() {
  return (
    <motion.section className="projects section-wrap" id="projects" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7 }}>
      <div className="container"><div className="section-heading-row"><div><span className="section-number">SELECTED WORK</span><h2>Learning by<br /><em>shipping.</em></h2></div><p>A living archive of the work I&apos;m building, the systems I&apos;m learning, and the ideas I&apos;m bringing to life.</p></div>
        <div className="project-grid">{projects.map((project) => <article className={`project-card ${project.accent}`} key={project.index}><div className="project-top"><span>{project.index}</span><span>{project.category}</span></div><div className="project-art"><div className="art-window"><span /><span /><span /><b>{project.index}</b></div><div className="art-line line-a" /><div className="art-line line-b" /><div className="art-circle" /></div><div className="project-info"><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub profile <span>↗</span></a><span className="demo-label">Demo concept</span></div></div></article>)}</div>
        <div className="project-cta"><span>Want to see what&apos;s next?</span><a className="button button-primary" href={profile.github} target="_blank" rel="noreferrer">Browse the full archive <span>↗</span></a></div>
      </div>
    </motion.section>
  )
}

export default Projects
