import { GITHUB, EMAIL } from '../data'
import { GithubIcon, MailIcon } from './Icons'

export default function SideSocial() {
  return (
    <aside className="side" aria-label="Links">
      <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <GithubIcon size={34} />
      </a>
      <a href={`mailto:${EMAIL}`} aria-label="E-mail">
        <MailIcon size={34} />
      </a>
    </aside>
  )
}
