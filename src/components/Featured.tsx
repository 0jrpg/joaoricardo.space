import { useLang } from '../i18n'
import { featured, GITHUB } from '../data'
import { ArrowIcon } from './Icons'
import Title from './Title'

export default function Featured() {
  const { lang, t } = useLang()
  return (
    <section id="destaques" className="section">
      <Title a={t.feat.a} b={t.feat.b} />
      <p className="sub">{t.feat.sub}</p>
      <div className="grid">
        {featured.map((p) => (
          <article className="card repo" key={p.key}>
            <h3>{p.name}</h3>
            <p>{p[lang]}</p>
            <ul className="chips small">
              {p.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="repo-links">
              <a className="text-link" href={p.repo} target="_blank" rel="noopener noreferrer">
                {t.feat.code} <ArrowIcon size={15} />
              </a>
              {p.live && (
                <a className="text-link" href={p.live} target="_blank" rel="noopener noreferrer">
                  {t.feat.site} <ArrowIcon size={15} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <a className="btn btn-dotted wide" href={GITHUB} target="_blank" rel="noopener noreferrer">
        {t.feat.all}
      </a>
    </section>
  )
}
