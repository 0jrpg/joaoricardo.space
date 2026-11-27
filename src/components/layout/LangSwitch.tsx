import { useLang } from '../../i18n'
import { FlagBR, FlagUS } from '../ui/Icons'

/** Seletor de idioma com "pílula" deslizante. */
export default function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <div className="lang" role="group" aria-label={t.langLabel} data-lang={lang}>
      <span className="lang-thumb" aria-hidden="true" />
      <button type="button" aria-pressed={lang === 'pt'} onClick={() => setLang('pt')}>
        <FlagBR size={18} />
        PT
      </button>
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
        <FlagUS size={18} />
        EN
      </button>
    </div>
  )
}
