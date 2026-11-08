import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'pt' | 'en'

export const dict = {
  pt: {
    contactTop: 'Entrar em contato',
    heroRole: 'Desenvolvedor · Jogos · Web',
    heroBio: 'Eu programo jogos, sites, bots e ferramentas. Também criei minha própria linguagem: a .alf.',
    linkCode: 'O que eu programo',
    linkAlf: 'Conheça a .alf',
    linkGithub: 'Meu GitHub',
    linkMail: 'Enviar e-mail',
    codeTitle: 'O que eu programo',
    codeSub: 'Linguagens e tecnologias que uso nos meus projetos',
    groups: {
      web: 'Web',
      back: 'Back-end e deploy',
      games: 'Jogos e bots',
    },
    alfTitle: '.alf',
    alfSub: 'Criada por mim',
    alfText:
      'A .alf é uma criação minha. Edite este texto em src/i18n.tsx para explicar o que ela é e para que serve.',
    alfBadge: 'Criação própria',
    footerLang: 'Idioma',
    rights: 'Todos os direitos reservados.',
  },
  en: {
    contactTop: 'Get in touch',
    heroRole: 'Developer · Games · Web',
    heroBio: 'I code games, websites, bots and tools. I also created my own language: .alf.',
    linkCode: 'What I code with',
    linkAlf: 'Meet .alf',
    linkGithub: 'My GitHub',
    linkMail: 'Send an email',
    codeTitle: 'What I code with',
    codeSub: 'Languages and technologies I use in my projects',
    groups: {
      web: 'Web',
      back: 'Back-end and deploy',
      games: 'Games and bots',
    },
    alfTitle: '.alf',
    alfSub: 'Created by me',
    alfText:
      '.alf is something I created myself. Edit this text in src/i18n.tsx to explain what it is and what it is for.',
    alfBadge: 'My own creation',
    footerLang: 'Language',
    rights: 'All rights reserved.',
  },
} as const

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof dict)['pt' | 'en'] }
const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    /* storage indisponível */
  }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {
      /* ignora */
    }
  }
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang precisa estar dentro de LangProvider')
  return ctx
}
