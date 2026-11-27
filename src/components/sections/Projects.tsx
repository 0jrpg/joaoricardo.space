import { GITHUB } from '../../data/site'
import { projects } from '../../data/projects'
import { useLang } from '../../i18n'
import { vars } from '../../lib/css'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { ArrowIcon } from '../ui/Icons'
import Reveal from '../ui/Reveal'
import Title from '../ui/Title'

export default function Projects() {
  const { lang, t } = useLang()
  return (
    <section id="destaques" className="section">
      <div className="container">
        <Title index="02" eyebrow={t.feat.eyebrow} a={t.feat.a} b={t.feat.b} sub={t.feat.sub} />

        <div className="projects">
          {projects.map((p, i) => (
            <Card as="article" key={p.key} tilt variant={i % 2 ? 'right' : 'left'} delay={(i % 2) * 120} className="proj" style={vars({ '--h': p.hue })}>
              <div className="proj-banner">
                <span className="pb-blob b1" />
                <span className="pb-blob b2" />
                <span className="pb-scan" />
                <span className="pb-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="pb-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="proj-body">
                <h3>{p.name}</h3>
                <p>{p[lang]}</p>
                <ul className="chips small">
                  {p.tags.map((tag, ti) => (
                    <li key={tag} style={vars({ '--i': ti })}>
                      {tag}
                    </li>
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
              </div>
            </Card>
          ))}
        </div>

        <Reveal variant="blur" delay={100}>
          <Button variant="dotted" href={GITHUB} external className="wide">
            {t.feat.all} <ArrowIcon size={18} />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
