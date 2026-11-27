import { EMAIL, GITHUB } from '../../data/site'
import { vars } from '../../lib/css'
import { GithubIcon, MailIcon } from '../ui/Icons'
import LangSwitch from './LangSwitch'

type Props = { open: boolean; links: readonly (readonly [string, string])[]; active: string; onClose: () => void }

/** Menu em tela cheia: abre como um círculo que cresce a partir do botão. */
export default function MobileMenu({ open, links, active, onClose }: Props) {
  const tab = open ? 0 : -1
  return (
    <div className={`mmenu${open ? ' open' : ''}`} aria-hidden={!open}>
      <nav>
        {links.map(([id, label], i) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={onClose} tabIndex={tab} style={vars({ '--i': i })}>
            <small>{String(i + 1).padStart(2, '0')}</small>
            {label}
          </a>
        ))}
      </nav>
      <div className="mm-foot" style={vars({ '--i': links.length })}>
        <LangSwitch />
        <div className="mm-social">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub" tabIndex={tab}>
            <GithubIcon size={24} />
          </a>
          <a href={`mailto:${EMAIL}`} aria-label="E-mail" tabIndex={tab}>
            <MailIcon size={24} />
          </a>
        </div>
      </div>
    </div>
  )
}
