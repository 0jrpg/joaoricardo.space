import { useEffect, useState } from 'react'
import { useLang } from '../i18n'

export default function Header() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <a href="#inicio" className="brand" aria-label="JoãoRicardo.space">
        JoãoRicardo<span className="brand-space">.space</span>
      </a>
      <a className="pill pill-solid" href="mailto:mail@joaoricardo.space">
        {t.contactTop}
      </a>
    </header>
  )
}
