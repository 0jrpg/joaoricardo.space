import { useEffect, useState } from 'react'

/** Digita e apaga uma lista de palavras em loop. */
export function useTyped(words: readonly string[], active: boolean, reduced: boolean) {
  const [text, setText] = useState('')
  useEffect(() => {
    setText('')
    if (!active || !words.length) return
    if (reduced) {
      setText(words[0])
      return
    }
    let w = 0
    let c = 0
    let deleting = false
    let id = 0
    const tick = () => {
      const word = words[w]
      c += deleting ? -1 : 1
      setText(word.slice(0, c))
      let delay = deleting ? 32 : 70
      if (!deleting && c === word.length) {
        deleting = true
        delay = 1600
      } else if (deleting && c === 0) {
        deleting = false
        w = (w + 1) % words.length
        delay = 350
      }
      id = window.setTimeout(tick, delay)
    }
    id = window.setTimeout(tick, 500)
    return () => window.clearTimeout(id)
  }, [words, active, reduced])
  return text
}
