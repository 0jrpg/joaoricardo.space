import { cdn } from '../../data/site'
import { vars } from '../../lib/css'

type P = { size?: number }

/**
 * Ícones: os arquivos .svg ficam no CDN (cdn.files.joaoricardo.space/icon-*.svg).
 * São usados como máscara CSS, então continuam herdando a cor do texto e podem mudar no hover.
 * Obs.: máscara exige que o CDN envie o header `Access-Control-Allow-Origin` (veja o README).
 */
const icon = (file: string, defaultSize: number) =>
  function Icon({ size = defaultSize }: P) {
    return <span className="ico" aria-hidden="true" style={vars({ width: size, height: size, '--src': `url(${cdn(file)})` })} />
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

/** Bandeiras: imagens normais (não precisam de cor dinâmica). */
export const FlagBR = ({ size = 22 }: P) => <img src={cdn('flag-br.svg')} width={size} height={size * 0.7} alt="" />
export const FlagUS = ({ size = 22 }: P) => <img src={cdn('flag-us.svg')} width={size} height={size * 0.7} alt="" />
