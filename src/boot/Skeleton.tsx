import { vars } from '../lib/css'

/** Bloco cinza com brilho que passa (shimmer). `k` escalona a entrada de cada bloco. */
function S({ w = '100%', h = 14, r = 12, k = 0, className = '' }: { w?: string | number; h?: string | number; r?: string | number; k?: number; className?: string }) {
  return <i className={`sk-b ${className}`} style={vars({ width: w, height: h, borderRadius: r, '--k': k })} />
}

/** Esqueleto que imita o layout real da página (cabeçalho, hero, cards). */
export default function Skeleton() {
  return (
    <div className="sk" aria-hidden="true">
      <div className="sk-head">
        <S w={150} h={24} k={0} />
        <div className="sk-nav">
          {[0, 1, 2, 3, 4].map((i) => (
            <S key={i} w={58} h={12} k={i + 1} />
          ))}
        </div>
        <S w={140} h={42} r={999} k={2} className="sk-pill" />
      </div>

      <div className="sk-hero">
        <div className="sk-text">
          <S w="46%" h={14} k={3} />
          <S w="86%" h="clamp(46px,8vw,92px)" r={14} k={4} />
          <S w="68%" h="clamp(46px,8vw,92px)" r={14} k={5} />
          <S w="52%" h={20} k={6} />
          <div className="sk-lines">
            <S w="92%" h={13} k={7} />
            <S w="84%" h={13} k={8} />
            <S w="58%" h={13} k={9} />
          </div>
          <div className="sk-row">
            <S w={168} h={50} r={999} k={10} />
            <S w={168} h={50} r={999} k={11} />
          </div>
        </div>
        <div className="sk-photo">
          <S w="100%" h="100%" r="50%" k={6} className="sk-circle" />
        </div>
      </div>

      <div className="sk-cards">
        {[0, 1, 2].map((i) => (
          <S key={i} h={150} r={24} k={12 + i} />
        ))}
      </div>
    </div>
  )
}
