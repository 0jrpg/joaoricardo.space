import CursorGlow from './CursorGlow'
import Starfield from './Starfield'

/** Todo o fundo animado fica aqui: aurora, grade, estrelas, brilho do cursor e granulado. */
export default function BackgroundFX() {
  return (
    <>
      <div className="fx" aria-hidden="true">
        <div className="aurora">
          <i />
          <i />
          <i />
        </div>
        <div className="grid-lines" />
        <Starfield />
        <CursorGlow />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
