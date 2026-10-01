import { profile } from '../data'
import { Reveal } from '../motion'

function About() {
  return (
    <section className="about section-wrap" id="about">
      <Reveal className="container about-layout">
        <div className="section-intro">
          <span className="section-number">ABOUT ME</span>
          <h2>Curious by nature.<br /><em>Builder</em> by choice.</h2>
        </div>
        <div className="about-body">
          <p className="lead-copy">I&apos;m a motivated developer who enjoys the space where business thinking meets technology. I&apos;m currently studying BBA in Marketing while growing through hands-on web development.</p>
          <p>I completed Programming Hero&apos;s Complete Web Development Course and a diploma in Full Stack Web Development using MERN from Daffodil International Professional Training. Each project is a chance to learn a little deeper and build a little better.</p>
          <div className="about-details">
            <div><small>LOCATION</small><strong>{profile.location}</strong></div>
            <div><small>EDUCATION</small><strong>BBA - Marketing, Tejgaon College</strong></div>
            <div><small>TRAINING</small><strong>Web Development - MERN, Daffodil International Professional Training Institute</strong></div>
          </div>
          <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">More about my journey <span>↗</span></a>
        </div>
      </Reveal>
      <Reveal className="container stat-strip" delay={0.12}>
        <div className="stat"><strong>01<span>+</span></strong><small>Years learning<br />& building</small></div>
        <div className="stat"><strong>15<span>+</span></strong><small>Projects<br />explored</small></div>
        <div className="stat"><strong>20<span>+</span></strong><small>Happy client<br />ambition</small></div>
        <div className="stat stat-note"><span>“</span><p>Strong discipline.<br />Fast learning mindset.</p></div>
      </Reveal>
    </section>
  )
}

export default About
