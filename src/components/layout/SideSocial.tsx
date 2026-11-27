import { EMAIL, GITHUB } from '../../data/site'
import { GithubIcon, MailIcon } from '../ui/Icons'

/** Atalhos fixos na lateral esquerda (somente telas grandes). */
export default function SideSocial() {
  return (
    <aside className="side" aria-label="Links">
      <span className="side-line" />
      <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <GithubIcon size={26} />
      </a>
      <a href={`mailto:${EMAIL}`} aria-label="E-mail">
        <MailIcon size={26} />
      </a>
      <span className="side-line" />
    </aside>
  )
}
