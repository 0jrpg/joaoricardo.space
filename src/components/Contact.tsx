import { useState, type FormEvent } from 'react'
import { useLang } from '../i18n'
import { EMAIL, GITHUB, EDUCATURDI_SITE } from '../data'
import { GithubIcon, MailIcon, ArrowIcon } from './Icons'
import Title from './Title'

export default function Contact() {
  const { t } = useLang()
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [msg, setMsg] = useState('')

  // Sem servidor: o envio abre o app de e-mail já preenchido.
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const subject = `${t.contact.subject} — ${name}`
    const body = `${msg}\n\n${name}\n${from}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contato" className="section contact">
      <div className="center">
        <Title a={t.contact.a} b={t.contact.b} />
        <p className="sub">{t.contact.sub}</p>
      </div>
      <div className="contact-grid">
        <div className="contact-left">
          <a className="card mail-card" href={`mailto:${EMAIL}`}>
            <span className="mail-ic"><MailIcon size={26} /></span>
            <span>
              <small>{t.contact.email}</small>
              <b>{EMAIL}</b>
            </span>
          </a>
          <div className="two">
            <a className="btn-box" href={GITHUB} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={18} /> GitHub
            </a>
            <a className="btn-box" href={EDUCATURDI_SITE} target="_blank" rel="noopener noreferrer">
              <ArrowIcon size={18} /> EducaTurdi
            </a>
          </div>
        </div>
        <form className="card form" onSubmit={submit}>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t.contact.name} aria-label={t.contact.name} />
          <input required type="email" value={from} onChange={(e) => setFrom(e.target.value)} placeholder={t.contact.yourEmail} aria-label={t.contact.yourEmail} />
          <textarea required rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t.contact.message} aria-label={t.contact.message} />
          <button className="btn btn-solid" type="submit">
            {t.contact.send}
          </button>
        </form>
      </div>
      <footer className="footer">© {new Date().getFullYear()} João Ricardo Pontes Garbelini. {t.rights}</footer>
    </section>
  )
}
