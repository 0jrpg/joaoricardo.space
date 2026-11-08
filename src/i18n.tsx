import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'pt' | 'en'

export const dict = {
  pt: {
    contactTop: 'Entrar em contato',
    menu: 'Menu',
    close: 'Fechar',
    nav: { home: 'Início', code: 'O que eu programo', featured: 'Destaques', alf: 'Alpha (.alf)', contact: 'Contato' },
    heroRole: 'Desenvolvedor · Next.js · TypeScript',
    heroBio: 'Crio plataformas web em Next.js e TypeScript, como a EducaTurdi. Também criei a Alpha, uma linguagem de programação brasileira (.alf).',
    heroCta1: 'Ver destaques',
    heroCta2: 'Entrar em contato',
    code: { a: 'O que', b: 'eu programo', sub: 'Linguagens e tecnologias que uso nos meus projetos' },
    groups: { web: 'Web', back: 'Dados e deploy', games: 'Linguagens' },
    feat: { a: 'Meus', b: 'destaques', sub: 'Alguns dos melhores projetos do meu GitHub', code: 'Código', site: 'Abrir site', all: 'Ver todos os repositórios' },
    alf: {
      a: 'Alpha',
      b: '.alf',
      sub: 'Alpha Language',
      badge: 'Criação própria',
      t1: 'Alpha é uma linguagem brasileira que transforma arquivos .alf em aplicações web completas.',
      t2: 'Você escreve HTML, JS e Python em um só código, em português, e o tradutor.py gera o .html para você.',
      repo: 'Ver no GitHub',
    },
    contact: {
      a: 'Entre',
      b: 'em contato',
      sub: 'Vamos criar algo juntos',
      email: 'E-mail',
      name: 'Seu nome',
      yourEmail: 'Seu e-mail',
      message: 'Sua mensagem...',
      send: 'Enviar mensagem',
      subject: 'Contato pelo site',
    },
    langLabel: 'Mudar idioma para inglês',
    rights: 'Todos os direitos reservados.',
  },
  en: {
    contactTop: 'Get in touch',
    menu: 'Menu',
    close: 'Close',
    nav: { home: 'Home', code: 'What I code with', featured: 'Highlights', alf: 'Alpha (.alf)', contact: 'Contact' },
    heroRole: 'Developer · Next.js · TypeScript',
    heroBio: 'I build web platforms in Next.js and TypeScript, like EducaTurdi. I also created Alpha, a Brazilian programming language (.alf).',
    heroCta1: 'See highlights',
    heroCta2: 'Get in touch',
    code: { a: 'What I', b: 'code with', sub: 'Languages and technologies I use in my projects' },
    groups: { web: 'Web', back: 'Data and deploy', games: 'Languages' },
    feat: { a: 'My', b: 'highlights', sub: 'Some of the best projects on my GitHub', code: 'Code', site: 'Open site', all: 'See all repositories' },
    alf: {
      a: 'Alpha',
      b: '.alf',
      sub: 'Alpha Language',
      badge: 'My own creation',
      t1: 'Alpha is a Brazilian programming language that turns .alf files into complete web applications.',
      t2: 'You write HTML, JS and Python in a single piece of code, in Portuguese, and tradutor.py generates the .html for you.',
      repo: 'View on GitHub',
    },
    contact: {
      a: 'Get',
      b: 'in touch',
      sub: "Let's build something together",
      email: 'Email',
      name: 'Your name',
      yourEmail: 'Your email',
      message: 'Your message...',
      send: 'Send message',
      subject: 'Contact from the website',
    },
    langLabel: 'Switch language to Portuguese',
    rights: 'All rights reserved.',
  },
} as const

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof dict)[Lang] }
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
