import { useBoot } from '../../boot/BootProvider'
import { allTech } from '../../data/stack'
import { projects } from '../../data/projects'
import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'
import { LANGS, useLang } from '../../i18n'
import { vars } from '../../lib/css'

function Stat({ value, label, delay }: { value: number; label: string; delay: number }) {
  const { ready } = useBoot()
  const [ref, inView] = useInView<HTMLDivElement>({ enabled: ready })
  const n = useCountUp(value, inView)
  return (
    <div ref={ref} className={`stat glass reveal rv-zoom${inView ? ' in' : ''}`} style={vars({ '--d': `${delay}ms` })}>
      <b>{String(n).padStart(2, '0')}</b>
      <span>{label}</span>
    </div>
  )
}

/** Números com contagem animada — todos calculados a partir dos dados reais do site. */
export default function Stats() {
  const { t } = useLang()
  return (
    <section className="stats-wrap">
      <div className="container stats">
        <Stat value={projects.length} label={t.stats.projects} delay={0} />
        <Stat value={allTech.length} label={t.stats.tech} delay={110} />
        <Stat value={1} label={t.stats.own} delay={220} />
        <Stat value={LANGS.length} label={t.stats.langs} delay={330} />
      </div>
    </section>
  )
}
