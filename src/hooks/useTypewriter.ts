import { useEffect, useState } from 'react'

/** Digita um texto uma única vez (usado no terminal da Alpha). Retorna o texto parcial e se terminou. */
export function useTypewriter(text: string, start: boolean, reduced: boolean, speed = 34) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!start) return
    if (reduced) {
      setN(text.length)
      return
    }
    setN(0)
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setN(i)
      if (i >= text.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
  }, [text, start, reduced, speed])
  return { shown: text.slice(0, n), done: n >= text.length }
}
