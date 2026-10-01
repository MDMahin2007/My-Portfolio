import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data'

const API_URL = import.meta.env.VITE_API_URL || ''

const makeDirectEmail = ({ name, email, phone, message }) => {
  const subject = `Portfolio message from ${name}`
  const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\n${message}`
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [fallbackLink, setFallbackLink] = useState('')
  const [sending, setSending] = useState(false)

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const showDirectEmailFallback = (openComposer = false) => {
    const directEmail = makeDirectEmail(form)
    setFallbackLink(directEmail)
    setStatus({ type: 'fallback', text: 'Opening your email app. Press Send there to deliver the message.' })
    if (openComposer) window.location.assign(directEmail)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSending(true)
    setStatus({ type: '', text: '' })
    setFallbackLink('')

    try {
      if (!API_URL) {
        showDirectEmailFallback(true)
        return
      }

      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()

      if (result.fallbackRequired) {
        showDirectEmailFallback(true)
      } else if (!response.ok) {
        const apiError = new Error(result.message || 'Could not send your message.')
        apiError.status = response.status
        throw apiError
      } else {
        setStatus({ type: 'success', text: result.emailSent ? 'Thanks - your message is on its way.' : 'Message saved successfully.' })
        setForm({ name: '', email: '', phone: '', message: '' })
      }
    } catch (error) {
      if (error.status >= 500 || error.name === 'TypeError') showDirectEmailFallback(true)
      else setStatus({ type: 'error', text: error.message })
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.section
      className="contact section-wrap"
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container contact-layout">
        <div className="contact-copy">
          <span className="section-number">GET IN TOUCH</span>
          <h2>Let&apos;s make<br /><em>something real.</em></h2>
          <p>My inbox is open for opportunities, collaborations, and curious conversations. Drop me a line and I&apos;ll get back to you soon.</p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}><small>EMAIL</small><strong>{profile.email}</strong><span>↗</span></a>
            <a href={`tel:${profile.phone}`}><small>PHONE</small><strong>{profile.phone}</strong><span>↗</span></a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-topline"><span>START A CONVERSATION</span><span>Build something great together.</span></div>
          <label><span>Your name</span><input name="name" value={form.name} onChange={handleChange} placeholder="How should I call you?" autoComplete="name" required /></label>
          <label><span>Email address</span><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" autoComplete="email" required /></label>
          <label><span>Phone <small>(optional)</small></span><input name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" autoComplete="tel" /></label>
          <label><span>Message</span><textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me a little about your idea..." rows="3" required /></label>
          <div className="form-submit">
            <button className="button button-primary" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'} <span>↗</span></button>
            {status.text && (status.type === 'fallback'
              ? <div className="fallback-message" role="status" aria-live="polite"><p>{status.text}</p><a href={fallbackLink}>Open email app <span>↗</span></a></div>
              : <p className={status.type} role="status" aria-live="polite">{status.text}</p>)}
          </div>
        </form>
      </div>
    </motion.section>
  )
}

export default Contact
