export type StackKey = 'web' | 'back' | 'games'
export type StackGroup = { key: StackKey; items: string[] }

export const stack: StackGroup[] = [
  { key: 'web', items: ['Next.js', 'TypeScript', 'React', 'HTML', 'CSS', 'JavaScript'] },
  { key: 'back', items: ['Supabase', 'PostgreSQL', 'GitHub (backend)', 'Vercel'] },
  { key: 'games', items: ['Python', 'Alpha (.alf)'] },
]

export const allTech = stack.flatMap((g) => g.items)
