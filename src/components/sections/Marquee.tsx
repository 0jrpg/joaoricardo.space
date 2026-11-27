import { allTech } from '../../data/stack'

const rows = [allTech.slice(0, 6), allTech.slice(6)]

/** Faixa infinita com as tecnologias, duas linhas andando em sentidos opostos. */
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      {rows.map((items, r) => {
        const half = [...items, ...items, ...items]
        return (
          <div className={`mq-row${r % 2 ? ' rev' : ''}`} key={r}>
            <div className="mq-track">
              {[...half, ...half].map((name, i) => (
                <span key={i} className="mq-item">
                  <i>✦</i>
                  {name}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
