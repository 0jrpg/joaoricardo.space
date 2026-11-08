import { useLang } from '../i18n'

export default function Footer() {
  const { lang, setLang, t } = useLang()
  return (
    <footer className="footer">
      <div className="lang" role="group" aria-label={t.footerLang}>
        <button className={lang === 'pt' ? 'on' : ''} onClick={() => setLang('pt')} aria-pressed={lang === 'pt'}>
          Português
        </button>
        <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>
          English
        </button>
      </div>
      <p>
        © {new Date().getFullYear()} João Ricardo Pontes Garbelini. {t.rights}
      </p>
    </footer>
  )
}
