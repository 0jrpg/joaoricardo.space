type P = { size?: number }
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const GithubIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
)
export const MailIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 8 8 6 8-6" />
  </svg>
)
export const ArrowIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)
export const MenuIcon = ({ size = 30 }: P) => (
  <svg width={size} height={size} viewBox="0 0 32 24" {...base} strokeWidth={1.6} aria-hidden="true">
    <path d="M2 4h28M2 12h28M2 20h28" />
  </svg>
)
export const CloseIcon = ({ size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.8} aria-hidden="true">
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
)
export const FlagBR = () => (
  <svg width="30" height="21" viewBox="0 0 28 20" aria-hidden="true">
    <rect width="28" height="20" rx="2" fill="#009c3b" />
    <path d="M14 3 25 10 14 17 3 10Z" fill="#ffdf00" />
    <circle cx="14" cy="10" r="4.2" fill="#002776" />
  </svg>
)
export const FlagUS = () => (
  <svg width="30" height="21" viewBox="0 0 28 20" aria-hidden="true">
    <rect width="28" height="20" rx="2" fill="#fff" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect key={i} y={i * 3.08} width="28" height="1.54" fill="#b22234" />
    ))}
    <rect width="12" height="10.8" fill="#3c3b6e" />
  </svg>
)
