import { cdn } from '../data/site'

// 1) Foto no CDN tem prioridade.
const externalPhoto = cdn('joao-ricardo.jpeg')

// 2) Plano B: qualquer imagem dentro de src/images (prefere perfil/profile/foto/me).
const found = import.meta.glob('../images/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const entries = Object.entries(found)
const preferred = entries.find(([path]) => /\/(perfil|profile|foto|me)\./i.test(path))
const localPhoto = (preferred ?? entries[0])?.[1]

/** Ordem de tentativa: se uma falhar ao carregar, o Hero passa para a próxima e, por fim, para as iniciais "JR". */
export const photoSources: string[] = [externalPhoto, localPhoto].filter(Boolean) as string[]
