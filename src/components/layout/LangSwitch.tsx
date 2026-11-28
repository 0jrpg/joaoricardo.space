import { useLang, type Lang } from '../../i18n'
import { FlagBR, FlagES, FlagUS } from '../ui/Icons'

const options: { id: Lang; label: string; Flag: typeof FlagBR }[] = [
  { id: 'pt', label: 'PT', Flag: FlagBR },
  { id: 'en', label: 'EN', Flag: FlagUS },
  { id: 'es', label: 'ES', Flag: FlagES },
]

/** Seletor de idioma com "pílula" deslizante. */
export default function LangSwitch() {
  const { picked, setLang, t } = useLang()
  return (
    <div className="lang" role="group" aria-label={t.langLabel} data-lang={picked}>
      <span className="lang-thumb" aria-hidden="true" />
      {options.map(({ id, label, Flag }) => (
        <button key={id} type="button" aria-pressed={picked === id} onClick={() => setLang(id)}>
          <Flag size={18} />
          {label}
        </button>
      ))}
    </div>
  )
}
