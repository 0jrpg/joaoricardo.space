import { Fragment, type ReactNode } from 'react'
import { useBoot } from '../../boot/BootProvider'
import { ALF_REPO } from '../../data/site'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTypewriter } from '../../hooks/useTypewriter'
import { useLang } from '../../i18n'
import Reveal from '../ui/Reveal'
import { ArrowIcon } from '../ui/Icons'
import Title from '../ui/Title'

const sample = `<janela> #B0C4DE {login}
*usuario "Usuário"
@entrar
&mensagem "Bem-vindo ao Alpha"
</janela>`

// strings | tags | cores | {chaves} | *@& comandos
const TOKEN = /("[^"]*"?)|(<\/?[a-zA-Z]*>?)|(#[0-9a-fA-F]{3,6})|(\{[^}]*\}?)|([*@&][\wÀ-ú]+)/g
const KINDS = ['', 'str', 'tag', 'col', 'br', 'sym']

/** Colore a sintaxe .alf (inclusive enquanto o texto ainda está sendo digitado). */
function highlight(line: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  for (const m of line.matchAll(TOKEN)) {
    const at = m.index ?? 0
    if (at > last) out.push(line.slice(last, at))
    const kind = KINDS[m.findIndex((g, i) => i > 0 && g !== undefined)]
    out.push(
      <span key={at} className={`tk-${kind}`}>
        {m[0]}
      </span>,
    )
    last = at + m[0].length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

export default function Alpha() {
  const { t } = useLang()
  const { ready } = useBoot()
  const reduced = useReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>({ enabled: ready, threshold: 0.35 })
  const { shown, done } = useTypewriter(sample, inView, reduced)
  const lines = shown.split('\n')

  return (
    <section id="alf" className="section">
      <div className="container">
        <div className="alf-grid">
          <div className="alf-info">
            <Title index="03" eyebrow={t.alf.eyebrow} a={t.alf.a} b={t.alf.b} sub={t.alf.sub} />
            <Reveal delay={100}>
              <span className="badge">{t.alf.badge}</span>
            </Reveal>
            <Reveal as="p" className="alf-p" delay={160}>
              {t.alf.t1}
            </Reveal>
            <Reveal as="p" className="alf-p" delay={220}>
              {t.alf.t2}
            </Reveal>

            <Reveal className="flow" delay={280} variant="blur">
              <span className="flow-node">{t.alf.flow.src}</span>
              <i className="flow-link" />
              <span className="flow-node hot">{t.alf.flow.tool}</span>
              <i className="flow-link" />
              <span className="flow-node">{t.alf.flow.out}</span>
            </Reveal>

            <Reveal delay={340}>
              <a className="text-link" href={ALF_REPO} target="_blank" rel="noopener noreferrer">
                {t.alf.repo} <ArrowIcon size={15} />
              </a>
            </Reveal>
          </div>

          <Reveal variant="right" delay={150}>
            <div className="term" ref={ref}>
              <div className="term-bar">
                <span className="pb-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <b>{t.alf.file}</b>
              </div>
              <pre className="term-body" aria-label="Exemplo de código .alf">
                {lines.map((l, i) => (
                  <Fragment key={i}>
                    <div className="ln">
                      {highlight(l)}
                      {i === lines.length - 1 && <span className={`tcaret${done ? ' idle' : ''}`} />}
                    </div>
                  </Fragment>
                ))}
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
