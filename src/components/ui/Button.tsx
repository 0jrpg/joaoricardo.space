import type { PointerEvent, ReactNode } from 'react'

type Props = {
  variant?: 'solid' | 'ghost' | 'dotted'
  href?: string
  external?: boolean
  type?: 'button' | 'submit'
  className?: string
  onClick?: () => void
  children: ReactNode
}

/** Efeito de onda (ripple) no ponto do clique. */
function ripple(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const size = Math.max(r.width, r.height) * 2
  const dot = document.createElement('span')
  dot.className = 'ripple'
  dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`
  el.appendChild(dot)
  dot.addEventListener('animationend', () => dot.remove())
}

export default function Button({ variant = 'ghost', href, external, type = 'button', className = '', onClick, children }: Props) {
  const cls = `btn btn-${variant} ${className}`
  if (href) {
    return (
      <a className={cls} href={href} onPointerDown={ripple} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} type={type} onPointerDown={ripple} onClick={onClick}>
      {children}
    </button>
  )
}
