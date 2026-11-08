// Usa a primeira imagem de src/images (de preferência uma chamada "perfil", "profile", "foto" ou "me").
const found = import.meta.glob('./images/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const entries = Object.entries(found)
const preferred = entries.find(([path]) => /\/(perfil|profile|foto|me)\./i.test(path))
export const profilePhoto: string | undefined = (preferred ?? entries[0])?.[1]
