// 1. Define a URL da imagem externa como prioridade
const externalPhoto = 'https://cdn.files.joaoricardo.space/file.enc'

// 2. Mantém a busca local em src/images como plano B (fallback)
const found = import.meta.glob('./images/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const entries = Object.entries(found)
const preferred = entries.find(([path]) => /\/(perfil|profile|foto|me)\./i.test(path))
const localPhoto = (preferred ?? entries[0])?.[1]

// 3. Exporta a foto do seu domínio (ou a local, se o link externo estiver vazio)
export const profilePhoto: string | undefined = externalPhoto || localPhoto
