import { GITHUB } from '../../data/site'
import { useLang } from '../../i18n'
import Reveal from '../ui/Reveal'
import SplitText from '../ui/SplitText'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-big" aria-hidden="true">
          <SplitText text="JOÃO RICARDO" out />
        </div>
        <Reveal className="foot-row" variant="blur">
          <p>
            © {new Date().getFullYear()} João Ricardo Pontes Garbelini. {t.footer.rights}
          </p>
          <p className="foot-built">{t.footer.built}</p>
          <div className="foot-links">
            <a href="#inicio">{t.footer.top} ↑</a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
