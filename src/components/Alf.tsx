import { useLang } from '../i18n'
import { ALF_REPO } from '../data'
import Title from './Title'

const sample = `<janela> #B0C4DE {login}
*usuario "Usuário"
@entrar
&mensagem "Bem-vindo ao Alpha"
</janela>`

export default function Alf() {
  const { t } = useLang()
  return (
    <section id="alf" className="section">
      <Title a={t.alf.a} b={t.alf.b} />
      <p className="sub">{t.alf.sub}</p>
      <div className="card alf">
        <span className="badge">{t.alf.badge}</span>
        <p>{t.alf.t1}</p>
        <p>{t.alf.t2}</p>
        <pre className="code" aria-label="Exemplo de código .alf">{sample}</pre>
        <a className="text-link" href={ALF_REPO} target="_blank" rel="noopener noreferrer">
          {t.alf.repo}
        </a>
      </div>
    </section>
  )
}
