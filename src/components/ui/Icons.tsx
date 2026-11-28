import { cdn } from '../../data/site'

type P = { size?: number }

/**
 * Ícones: os arquivos .svg ficam no CDN (cdn.files.joaoricardo.space/icon-*.svg).
 * São <img> normais (não precisam de CORS). A cor já vem dentro de cada arquivo:
 * branco (padrão), ciano (globe/database/code) e escuro (check).
 */
const icon = (file: string, defaultSize: number) =>
  function Icon({ size = defaultSize }: P) {
    return <img className="ico" src={cdn(file)} width={size} height={size} alt="" draggable={false} />
  }

export const GithubIcon = icon('icon-github.svg', 22)
export const MailIcon = icon('icon-mail.svg', 22)
export const ArrowIcon = icon('icon-arrow.svg', 18)
export const ArrowUpIcon = icon('icon-arrow-up.svg', 20)
export const CopyIcon = icon('icon-copy.svg', 18)
export const CheckIcon = icon('icon-check.svg', 18)
export const SendIcon = icon('icon-send.svg', 18)
export const GlobeIcon = icon('icon-globe.svg', 22)
export const DbIcon = icon('icon-database.svg', 22)
export const CodeIcon = icon('icon-code.svg', 22)

/** Bandeiras */
const flag = (file: string) => ({ size = 22 }: P) => <img src={cdn(file)} width={size} height={size * 0.7} alt="" draggable={false} />
export const FlagBR = flag('flag-br.svg')
export const FlagUS = flag('flag-us.svg')
export const FlagES = flag('flag-es.svg')
