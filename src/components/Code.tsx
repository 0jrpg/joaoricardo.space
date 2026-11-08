import { useLang } from '../i18n'
import Title from './Title'

const stack = {
  web: ['Next.js', 'TypeScript', 'React', 'HTML', 'CSS', 'JavaScript'],
  back: ['Supabase', 'PostgreSQL', 'GitHub como backend', 'Vercel'],
  games: ['Python', 'Alpha (.alf)'],
}

export default function Code() {
  const { t } = useLang()
  const groups = [
    { key: 'web', title: t.groups.web, items: stack.web },
    { key: 'back', title: t.groups.back, items: stack.back },
    { key: 'games', title: t.groups.games, items: stack.games },
  ]
  return (
    <section id="codigo" className="section">
      <Title a={t.code.a} b={t.code.b} />
      <p className="sub">{t.code.sub}</p>
      <div className="cols3">
        {groups.map((g) => (
          <div className="card" key={g.key}>
            <h3>{g.title}</h3>
            <ul className="chips">
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
