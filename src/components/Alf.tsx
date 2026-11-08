import { useLang } from '../i18n'

export default function Alf() {
  const { t } = useLang()
  return (
    <section id="alf" className="section">
      <div className="glass panel alf">
        <span className="badge">{t.alfBadge}</span>
        <h2 className="alf-title">{t.alfTitle}</h2>
        <p className="sub">{t.alfSub}</p>
        <p>{t.alfText}</p>
      </div>
    </section>
  )
}
