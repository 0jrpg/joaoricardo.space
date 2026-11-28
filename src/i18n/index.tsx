import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { LANG_FX } from '../data/site'
import { prefersReducedMotion } from '../hooks/useReducedMotion'
import { en, es, pt, type Dict } from './dictionary'

export type Lang = 'pt' | 'en' | 'es'
export const dict: Record<Lang, Dict> = { pt, en, es }
export const LANGS = Object.keys(dict) as Lang[]
const HTML_LANG: Record<Lang, string> = { pt: 'pt-BR', en: 'en', es: 'es' }

type Ctx = {
  lang: Lang
  /** idioma escolhido (já muda no seletor na hora, antes do texto trocar) */
  picked: Lang
  /** enquanto a animação de troca roda, guarda o idioma de destino */
  fx: Lang | null
  setLang: (l: Lang) => void
  t: Dict
}
const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'pt' || saved === 'en' || saved === 'es') return saved
  } catch {
    /* storage indisponível */
  }
  const nav = navigator.language.toLowerCase()
  return nav.startsWith('pt') ? 'pt' : nav.startsWith('es') ? 'es' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [fx, setFx] = useState<Lang | null>(null)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const setLang = (l: Lang) => {
    if (l === lang || fx) return
    try {
      localStorage.setItem('lang', l)
    } catch {
      /* ignora */
    }
    if (prefersReducedMotion()) {
      setLangState(l)
      return
    }
    // 1) cortina cobre a tela  2) texto troca por trás dela  3) cortina abre e tudo anima de novo
    setFx(l)
    timers.current = [window.setTimeout(() => setLangState(l), LANG_FX.swap), window.setTimeout(() => setFx(null), LANG_FX.total)]
  }

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang]
  }, [lang])

  return <LangContext.Provider value={{ lang, picked: fx ?? lang, fx, setLang, t: dict[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang precisa estar dentro de LangProvider')
  return ctx
}
