import type { CSSProperties } from 'react'
import { cdn } from '../../data/site'
import { useLang, type Lang } from '../../i18n'

const INFO: Record<Lang, { name: string; flag: string }> = {
  pt: { name: 'Português', flag: 'flag-br.svg' },
  en: { name: 'English', flag: 'flag-us.svg' },
  es: { name: 'Español', flag: 'flag-es.svg' },
}

/** Cortina de 5 faixas que sobe cobrindo a tela, mostra o idioma novo no centro e abre revelando o texto trocado. */
export default function LangTransition() {
  const { fx } = useLang()
  if (!fx) return null
  const { name, flag } = INFO[fx]
  return (
    <div className="lang-fx" key={fx} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <i key={i} style={{ '--i': i } as CSSProperties} />
      ))}
      <div className="lt-label">
        <img src={cdn(flag)} alt="" />
        <b>{name}</b>
      </div>
    </div>
  )
}
