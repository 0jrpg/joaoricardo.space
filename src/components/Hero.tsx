import { useLang } from '../i18n'
import { profilePhoto } from '../photo'
import Title from './Title'

export default function Hero() {
  const { t } = useLang()
  return (
    <section id="inicio" className="hero">
      <div className="hero-photo">
        {profilePhoto ? (
          <img className="avatar" src={profilePhoto} alt="João Ricardo" />
        ) : (
          <div className="avatar avatar-fallback" aria-label="João Ricardo">
            JR
          </div>
        )}
      </div>
      <div className="hero-text">
        <p className="role">{t.heroRole}</p>
        <Title as="h1" a="João" b="Ricardo" />
        <p className="lead">{t.heroBio}</p>
        <div className="row">
          <a className="btn btn-solid" href="#destaques">
            {t.heroCta1}
          </a>
          <a className="btn" href="#contato">
            {t.heroCta2}
          </a>
        </div>
      </div>
    </section>
  )
}
