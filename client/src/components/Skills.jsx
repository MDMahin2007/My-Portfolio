import { skills } from '../data'
import { Reveal } from '../motion'

function Skills() {
  return (
    <section className="skills section-wrap" id="skills">
      <Reveal className="container">
        <div className="section-heading-row"><div><span className="section-number">THE TOOLKIT</span><h2>The stack behind<br /><em>the work.</em></h2></div><p>I&apos;m always learning, but these are the tools I use to turn ideas into usable, scalable experiences.</p></div>
        <Reveal className="skills-board" delay={0.1}>
          {skills.map((skill) => <div className="skill-item" key={skill.name}><div className="skill-icon"><img src={skill.icon} alt="" /></div><div><strong>{skill.name}</strong><span className={skill.level === 'Advanced' ? 'advanced' : ''}>{skill.level}</span></div></div>)}
        </Reveal>
        <div className="skills-foot"><span><i /> Advanced focus</span><span><i className="muted" /> Growing every day</span><a className="text-link" href="https://github.com/MDMahin2007" target="_blank" rel="noreferrer">See my GitHub <span>↗</span></a></div>
      </Reveal>
    </section>
  )
}

export default Skills
