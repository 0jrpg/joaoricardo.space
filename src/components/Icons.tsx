type P = { size?: number }

const CDN_URL = 'https://cdn.files.joaoricardo.space'

export const GithubIcon = ({ size = 22 }: P) => (
  <img src={`${CDN_URL}/GithubIcon.svg`} width={size} height={size} alt="" aria-hidden="true" />
)

export const MailIcon = ({ size = 22 }: P) => (
  <img src={`${CDN_URL}/MailIcon.svg`} width={size} height={size} alt="" aria-hidden="true" />
)

export const ArrowIcon = ({ size = 18 }: P) => (
  <img src={`${CDN_URL}/ArrowIcon.svg`} width={size} height={size} alt="" aria-hidden="true" />
)

export const MenuIcon = ({ size = 30 }: P) => (
  <img src={`${CDN_URL}/MenuIcon.svg`} width={size} height={size} alt="" aria-hidden="true" />
)

export const CloseIcon = ({ size = 28 }: P) => (
  <img src={`${CDN_URL}/CloseIcon.svg`} width={size} height={size} alt="" aria-hidden="true" />
)

export const FlagBR = () => (
  <img src={`${CDN_URL}/FlagBR.svg`} width={30} height={21} alt="" aria-hidden="true" />
)

export const FlagUS = () => (
  <img src={`${CDN_URL}/FlagUS.svg`} width={30} height={21} alt="" aria-hidden="true" />
)
