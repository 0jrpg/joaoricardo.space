import { useEffect, useRef, useState, type FormEvent } from 'react'
import { EDUCATURDI_SITE, EMAIL, GITHUB } from '../../data/site'
import { useLang } from '../../i18n'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { ArrowIcon, CheckIcon, CopyIcon, GithubIcon, MailIcon, SendIcon } from '../ui/Icons'
import Reveal from '../ui/Reveal'
import Title from '../ui/Title'

export default function Contact() {
  const { t, lang } = useLang()
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [msg, setMsg] = useState('')
  const [toast, setToast] = useState('')
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const notify = (text: string) => {
    setToast(text)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setToast('')
      setCopied(false)
    }, 2600)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      notify(t.contact.copied)
    } catch {
      notify(t.contact.copyFail)
    }
  }

  // Sem servidor: o envio abre o app de e-mail já preenchido.
  const submit = (e: FormEvent) => {
    e.preventDefault()
    notify(t.contact.opening)
    const subject = `${t.contact.subject} — ${name}`
    const body = `${msg}\n\n${name}\n${from}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contato" className="section contact">
      <div className="container">
        <Title key={lang} index="04" eyebrow={t.contact.eyebrow} a={t.contact.a} b={t.contact.b} sub={t.contact.sub} />

        <div className="contact-grid">
          <div className="contact-left">
            <Card variant="left" tilt className="mail-card">
              <a className="mail-main" href={`mailto:${EMAIL}`}>
                <span className="mail-ic">
                  <MailIcon size={26} />
                </span>
                <span>
                  <small>{t.contact.email}</small>
                  <b>{EMAIL}</b>
                </span>
              </a>
              <button type="button" className={`copy-btn${copied ? ' ok' : ''}`} onClick={copy} aria-label={t.contact.copy} title={t.contact.copy}>
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </Card>

            <div className="two">
              <Reveal delay={120} variant="zoom">
                <a className="btn-box" href={GITHUB} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={18} /> GitHub
                </a>
              </Reveal>
              <Reveal delay={200} variant="zoom">
                <a className="btn-box" href={EDUCATURDI_SITE} target="_blank" rel="noopener noreferrer">
                  <ArrowIcon size={18} /> EducaTurdi
                </a>
              </Reveal>
            </div>
          </div>

          <Card as="form" variant="right" delay={120} className="form" onSubmit={submit}>
            <label className="field">
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder=" " autoComplete="name" />
              <span>{t.contact.name}</span>
            </label>
            <label className="field">
              <input required type="email" value={from} onChange={(e) => setFrom(e.target.value)} placeholder=" " autoComplete="email" />
              <span>{t.contact.yourEmail}</span>
            </label>
            <label className="field">
              <textarea required rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder=" " />
              <span>{t.contact.message}</span>
            </label>
            <Button variant="solid" type="submit">
              {t.contact.send} <SendIcon size={17} />
            </Button>
          </Card>
        </div>
      </div>

      <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </section>
  )
}
