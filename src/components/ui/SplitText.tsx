import { useBoot } from '../../boot/BootProvider'
import { useInView } from '../../hooks/useInView'
import { vars } from '../../lib/css'

type Props = { text: string; out?: boolean; delay?: number; className?: string }

/** Quebra o texto em letras que "sobem" uma a uma. `out` = versão só com contorno. */
export default function SplitText({ text, out = false, delay = 0, className = '' }: Props) {
  const { ready } = useBoot()
  const [ref, inView] = useInView<HTMLSpanElement>({ enabled: ready, threshold: 0.3 })
  let n = 0
  const words = text.split(' ').map((w) => [...w].map((ch) => ({ ch, i: n++ })))
  return (
    <span ref={ref} className={`split${out ? ' out' : ''}${inView ? ' in' : ''} ${className}`} style={vars({ '--sd': `${delay}ms` })}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi}>
            <span className="sw">
              {w.map(({ ch, i }) => (
                <span key={i} className="sl" style={vars({ '--i': i })}>
                  {ch}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </span>
  )
}
