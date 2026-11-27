import { stack, type StackKey } from '../../data/stack'
import { useLang } from '../../i18n'
import { vars } from '../../lib/css'
import Card from '../ui/Card'
import { CodeIcon, DbIcon, GlobeIcon } from '../ui/Icons'
import type { Variant } from '../ui/Reveal'
import Title from '../ui/Title'

const icons = { web: GlobeIcon, back: DbIcon, games: CodeIcon }
const variants: Record<StackKey, Variant> = { web: 'left', back: 'up', games: 'right' }

export default function Stack() {
  const { t } = useLang()
  return (
    <section id="codigo" className="section">
      <div className="container">
        <Title index="01" eyebrow={t.code.eyebrow} a={t.code.a} b={t.code.b} sub={t.code.sub} />
        <div className="stack-grid">
          {stack.map((g, gi) => {
            const Icon = icons[g.key]
            return (
              <Card key={g.key} tilt variant={variants[g.key]} delay={gi * 120} className={`stack-card sc-${g.key}`}>
                <div className="sc-head">
                  <span className="sc-ic">
                    <Icon size={22} />
                  </span>
                  <h3>{t.groups[g.key]}</h3>
                  <span className="sc-count">{String(g.items.length).padStart(2, '0')}</span>
                </div>
                <ul className="chips">
                  {g.items.map((item, i) => (
                    <li key={item} style={vars({ '--i': i })}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
