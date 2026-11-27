import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { BOOT } from '../data/site'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

/**
 * Linha do tempo da abertura:
 *  skeleton (3s) → logo → wipe (cortina abre e o conteúdo anima) → done
 */
export type Phase = 'skeleton' | 'logo' | 'wipe' | 'done'

const BootContext = createContext<{ phase: Phase; ready: boolean }>({ phase: 'done', ready: true })

export function BootProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('skeleton')

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const logo = reduced ? 0 : BOOT.logo
    const wipe = reduced ? 0 : BOOT.wipe
    const ids = [
      window.setTimeout(() => setPhase('logo'), BOOT.skeleton),
      window.setTimeout(() => setPhase('wipe'), BOOT.skeleton + logo),
      window.setTimeout(() => setPhase('done'), BOOT.skeleton + logo + wipe),
    ]
    return () => ids.forEach(window.clearTimeout)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('boot-lock', phase === 'skeleton' || phase === 'logo')
    root.dataset.phase = phase
  }, [phase])

  return <BootContext.Provider value={{ phase, ready: phase === 'wipe' || phase === 'done' }}>{children}</BootContext.Provider>
}

export const useBoot = () => useContext(BootContext)
