import { useLang } from '../i18n'
import { FlagBR, FlagUS } from './Icons'

export default function LangButton() {
  const { lang, setLang, t } = useLang()
  return (
    <button className="lang-btn" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} aria-label={t.langLabel} title={t.langLabel}>
      {lang === 'pt' ? <FlagBR /> : <FlagUS />}
    </button>
  )
}
