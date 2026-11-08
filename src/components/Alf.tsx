import { useLang } from '../i18n'

const sample = `<janela> #B0C4DE {login}
*usuario "Usuário"
@entrar
&mensagem "Bem-vindo ao Alpha"
</janela>`

export default function Alf() {
  const { t } = useLang()
  return (
    <section id="alf" className="section">
      <div className="glass panel alf">
        <span className="badge">{t.alfBadge}</span>
        <h2 className="alf-title">{t.alfTitle}</h2>
        <p className="sub">{t.alfSub}</p>
        <p>{t.alfText}</p>
        <p>{t.alfText2}</p>
        <pre className="code" aria-label="Exemplo de código .alf">{sample}</pre>
        <a className="alf-link" href="https://github.com/alphalanguage/alf" target="_blank" rel="noopener noreferrer">
          {t.alfRepo}
        </a>
      </div>
    </section>
  )
}
