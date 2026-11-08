// Primeira parte cheia, segunda parte só com contorno (como no site de referência).
export default function Title({ a, b, as: Tag = 'h2' }: { a: string; b: string; as?: 'h1' | 'h2' }) {
  return (
    <Tag className="title">
      <span>{a}</span> <span className="out">{b}</span>
    </Tag>
  )
}
