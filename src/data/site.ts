/** Todos os arquivos estáticos (imagens, SVGs...) ficam aqui: https://cdn.files.joaoricardo.space/<nome-do-arquivo> */
export const CDN = 'https://cdn.files.joaoricardo.space'
export const cdn = (file: string) => `${CDN}/${file}`

export const GITHUB = 'https://github.com/0jrpg'
export const EMAIL = 'mail@joaoricardo.space'
export const EDUCATURDI_SITE = 'https://educaturdi.vercel.app'
export const ALF_REPO = 'https://github.com/alphalanguage/alf'

/** IDs das seções, na ordem em que aparecem na página. */
export const SECTIONS = ['inicio', 'codigo', 'destaques', 'alf', 'contato'] as const

/** Tempos (ms) da abertura do site. `skeleton` = quanto tempo o skeleton screen fica na tela. */
/** Troca de idioma: `swap` = ms até o texto trocar (tela coberta); `total` = ms até a animação sumir. */
export const LANG_FX = { swap: 580, total: 1260 }

export const BOOT = { skeleton: 3000, logo: 950, wipe: 950 }
