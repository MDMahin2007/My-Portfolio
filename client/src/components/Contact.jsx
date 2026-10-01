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
  const [status, setStatus] = useState({ type: '', title: '', text: '', detail: '' })
  const [fallbackLink, setFallbackLink] = useState('')
  const [sending, setSending] = useState(false)

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const showDirectEmailFallback = (text, detail = '', openComposer = false) => {
    const directEmail = makeDirectEmail(form)
    setFallbackLink(directEmail)
    setStatus({ type: 'fallback', title: 'Message was not delivered', text, detail })
    if (openComposer) window.location.assign(directEmail)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSending(true)
    setStatus({ type: '', title: '', text: '', detail: '' })
    setFallbackLink('')

    try {
      if (!API_URL) {
        showDirectEmailFallback('The contact API is not configured. Use the email option below to send it directly.')
        return
      }

      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json().catch(() => ({ message: `Server returned HTTP ${response.status}.` }))

      if (result.fallbackRequired) {
        showDirectEmailFallback(result.message || 'Gmail delivery is unavailable right now.', result.deliveryError || (result.savedToDatabase ? 'Your message was saved, but the Gmail notification could not be sent.' : 'The server could not deliver the message.'))
      } else if (!response.ok) {
        const apiError = new Error(result.message || 'Could not send your message.')
        apiError.status = response.status
        throw apiError
      } else {
        if (result.emailSent) {
          setStatus({ type: 'success', title: 'Message sent successfully', text: 'Your message was delivered to my Gmail inbox.', detail: result.savedToDatabase ? 'Saved securely to the portfolio database.' : '' })
          setForm({ name: '', email: '', phone: '', message: '' })
        } else {
          showDirectEmailFallback('The server accepted the request, but Gmail delivery was not confirmed.', 'Use the email option below to send it directly.')
        }
      }
    } catch (error) {
      if (error.status >= 500 || error.name === 'TypeError') showDirectEmailFallback('The contact server is unavailable right now.', 'Start the server or use the email option below to send your message directly.')
      else setStatus({ type: 'error', title: 'Message could not be sent', text: error.message, detail: 'Please review the form and try again.' })
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
            {status.text && <div className={`status-card status-${status.type}`} role="status" aria-live="polite">
              <span className="status-card-icon">{status.type === 'success' ? '✓' : '!'}</span>
              <div><strong>{status.title}</strong><p>{status.text}</p>{status.detail && <small>{status.detail}</small>}{status.type === 'fallback' && <a href={fallbackLink}>Open email app <span>↗</span></a>}</div>
            </div>}
          </div>
        </form>
      </div>
    </motion.section>
  )
}

export default Contact
