import { useLang } from '../i18n'
import { GithubIcon, MailIcon, CodeIcon, SparkIcon } from './Icons'

// Pega a primeira imagem de src/images (de preferência uma chamada "perfil" ou "profile").
const found = import.meta.glob('../images/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const entries = Object.entries(found)
const preferred = entries.find(([path]) => /\/(perfil|profile|foto|me)\./i.test(path))
export const profilePhoto: string | undefined = (preferred ?? entries[0])?.[1]

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="inicio" className="hero">
      <div className="bio">
        <div className="social" role="group" aria-label="Links">
          <a className="icon-btn" href="https://github.com/0jrpg" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a className="icon-btn" href="mailto:mail@joaoricardo.space" aria-label="E-mail">
            <MailIcon />
          </a>
        </div>

        {profilePhoto ? (
          <img className="avatar" src={profilePhoto} alt="João Ricardo" />
        ) : (
          <div className="avatar avatar-fallback" aria-label="João Ricardo">
            JR
          </div>
        )}

        <h1>João Ricardo</h1>
        <p className="role">{t.heroRole}</p>
        <p className="lead">{t.heroBio}</p>

        <div className="links">
          <a className="link-btn" href="#codigo">
            <CodeIcon />
            <span>{t.linkCode}</span>
          </a>
          <a className="link-btn" href="#alf">
            <SparkIcon />
            <span>{t.linkAlf}</span>
          </a>
          <a className="link-btn" href="https://github.com/0jrpg" target="_blank" rel="noopener noreferrer">
            <GithubIcon size={20} />
            <span>{t.linkGithub}</span>
          </a>
          <a className="link-btn" href="mailto:mail@joaoricardo.space">
            <MailIcon size={20} />
            <span>{t.linkMail}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
