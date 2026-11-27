import type { CSSProperties } from 'react'

/** Permite passar custom properties (--x) no atributo style com tipagem segura. */
export const vars = (v: Record<string, string | number>) => v as unknown as CSSProperties
