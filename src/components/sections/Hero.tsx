import { useState, type PointerEvent } from 'react'
import { useBoot } from '../../boot/BootProvider'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTyped } from '../../hooks/useTyped'
import { useLang } from '../../i18n'
import { vars } from '../../lib/css'
import { photoSources } from '../../lib/photo'
import Button from '../ui/Button'
import Magnetic from '../ui/Magnetic'
import Reveal from '../ui/Reveal'
import SplitText from '../ui/SplitText'

const ORBIT = ['Next.js', 'TypeScript', 'Alpha', 'Vercel']

/** Foto com fallback em cadeia: CDN → imagem local → iniciais. */
function Avatar() {
  const [idx, setIdx] = useState(0)
  const src = photoSources[idx]
  return src ? (
    <img className="avatar" src={src} alt="João Ricardo" onError={() => setIdx((i) => i + 1)} />
  ) : (
    <div className="avatar avatar-fallback" role="img" aria-label="João Ricardo">
      JR
    </div>
  )
}

export default function Hero() {
  const { t } = useLang()
  const { ready } = useBoot()
  const reduced = useReducedMotion()
  const typed = useTyped(t.hero.typed, ready, reduced)

  // Parallax: o mouse move as camadas da foto em velocidades diferentes.
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--px', String(((e.clientX - r.left) / r.width - 0.5) * 2))
    e.currentTarget.style.setProperty('--py', String(((e.clientY - r.top) / r.height - 0.5) * 2))
  }

  return (
    <section id="inicio" className="hero" onPointerMove={onMove}>
      <div className="container hero-grid">
        <div className="hero-text">
          <Reveal variant="left">
            <p className="role">
              <span className="live-dot" />
              {t.hero.role}
            </p>
          </Reveal>

          <h1 className="hero-name">
            <span className="line">
              <SplitText text="João" />
            </span>
            <span className="line">
              <SplitText text="Ricardo" out delay={220} />
            </span>
          </h1>

          <Reveal as="p" className="typed-line" delay={500} variant="blur">
            <span className="tl-prefix">{t.hero.prefix}</span> <span className="tl-typed">{typed}</span>
            <span className="caret" />
          </Reveal>

          <Reveal as="p" className="lead" delay={650}>
            {t.hero.bio}
          </Reveal>

          <Reveal className="row" delay={800}>
            <Magnetic>
              <Button variant="solid" href="#destaques">
                {t.hero.cta1}
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="#contato">{t.hero.cta2}</Button>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal className="hero-photo" variant="zoom" delay={300}>
          <div className="ph-glow" />
          <div className="ph-layer l1">
            <i className="ring r1" />
            <i className="ring r2" />
            <div className="orbit">
              {ORBIT.map((name, i) => (
                <span key={name} className="orbit-chip" style={vars({ '--a': `${i * 90 + 20}deg` })}>
                  <span>{name}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="ph-layer l2">
            <div className="ph-frame">
              <Avatar />
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal as="a" eager className="scroll-hint" href="#codigo" delay={1100} variant="blur" aria-label={t.hero.scroll}>
        <span className="mouse">
          <i />
        </span>
        <small>{t.hero.scroll}</small>
      </Reveal>
    </section>
  )
}
