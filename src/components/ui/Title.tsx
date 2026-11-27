import Reveal from './Reveal'
import SplitText from './SplitText'

type Props = { index: string; eyebrow: string; a: string; b: string; sub?: string; center?: boolean }

/** Cabeçalho padrão das seções: rótulo numerado + título em letras animadas + subtítulo. */
export default function Title({ index, eyebrow, a, b, sub, center = false }: Props) {
  return (
    <header className={`sec-head${center ? ' center' : ''}`}>
      <Reveal variant="left">
        <p className="eyebrow">
          <span className="eb-num">{index}</span>
          <span className="eb-line" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="title">
        <SplitText text={a} /> <SplitText text={b} out delay={160} />
      </h2>
      {sub && (
        <Reveal as="p" className="sub" delay={260}>
          {sub}
        </Reveal>
      )}
    </header>
  )
}
