export const GITHUB = 'https://github.com/0jrpg'
export const EMAIL = 'mail@joaoricardo.space'
export const EDUCATURDI_SITE = 'https://educaturdi.vercel.app'
export const ALF_REPO = 'https://github.com/alphalanguage/alf'

export type Featured = {
  key: string
  name: string
  repo: string
  live?: string
  tags: string[]
  pt: string
  en: string
}

// Projetos em destaque (vindos do README do seu GitHub). Edite à vontade.
export const featured: Featured[] = [
  {
    key: 'educaturdi',
    name: 'EducaTurdi',
    repo: 'https://github.com/EducaTurdi/EDUTRD',
    live: EDUCATURDI_SITE,
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    pt: 'Plataforma escolar moderna e integrada, com identidade visual própria, microanimações e transições suaves. Foco em organização, praticidade e conexão da comunidade escolar.',
    en: 'A modern, integrated school platform with its own visual identity, micro-animations and smooth transitions. Focused on organization, practicality and connecting the school community.',
  },
  {
    key: 'joaoricardo',
    name: 'joaoricardo',
    repo: 'https://github.com/0jrpg/joaoricardo',
    tags: ['Next.js', 'GitHub', 'Vercel'],
    pt: 'Site de arquivos que usa o GitHub como backend: qualquer arquivo é servido por URL direta e sites inteiros (HTML, CSS e JS) funcionam com as pastas preservadas.',
    en: 'A file site that uses GitHub as its backend: any file is served by direct URL and entire sites (HTML, CSS and JS) work with their folders preserved.',
  },
  {
    key: 'nevoa',
    name: 'névoa',
    repo: 'https://github.com/0jrpg/blog',
    live: 'https://blognevoa.vercel.app',
    tags: ['Next.js', 'Liquid glass', 'Login com GitHub'],
    pt: 'Blog liquid glass em Next.js. Quem pode escrever é decidido pelo próprio GitHub (admin ou colaborador com permissão de escrita), sem senha nem cadastro.',
    en: 'A liquid glass blog in Next.js. Who can write is decided by GitHub itself (admin or collaborator with write access), with no password or sign-up.',
  },
  {
    key: 'biohtml',
    name: 'biohtml',
    repo: 'https://github.com/0jrpg/biohtml',
    live: 'https://0jrpg.github.io/biohtml/',
    tags: ['HTML'],
    pt: 'Página de bio com links acessíveis, feita em HTML. Dá para montar uma para qualquer pessoa.',
    en: 'A bio page with accessible links, built in HTML. One can be made for anyone.',
  },
]
