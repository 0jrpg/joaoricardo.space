import { useLang } from '../i18n'

const stack = {
  web: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
  back: ['Node.js', 'Git', 'GitHub', 'Vercel'],
  games: ['Lua', 'Roblox Studio', 'Discord API'],
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
      <h2>{t.codeTitle}</h2>
      <p className="sub">{t.codeSub}</p>
      <div className="glass panel">
        {groups.map((g) => (
          <div className="group" key={g.key}>
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
