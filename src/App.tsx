import { Analytics } from '@vercel/analytics/react'
import { useEffect, useRef } from 'react'
import LangTransition from './components/fx/LangTransition'
import { useLang } from './i18n'
import Boot from './boot/Boot'
import { useBoot } from './boot/BootProvider'
import BackgroundFX from './components/fx/BackgroundFX'
import BackToTop from './components/fx/BackToTop'
import ScrollProgress from './components/fx/ScrollProgress'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import SideSocial from './components/layout/SideSocial'
import Alpha from './components/sections/Alpha'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import Projects from './components/sections/Projects'
import Stack from './components/sections/Stack'
import Stats from './components/sections/Stats'

export default function App() {
  const { ready } = useBoot()
  const { lang } = useLang()
  const page = useRef<HTMLDivElement>(null)

  // Enquanto o skeleton está na tela, a página por trás não recebe foco (teclado/leitor de tela).
  useEffect(() => {
    const el = page.current
    if (!el) return
    if (ready) el.removeAttribute('inert')
    else el.setAttribute('inert', '')
  }, [ready])

  return (
    <>
      <BackgroundFX />
      <ScrollProgress />
      <div ref={page}>
        <Header />
        <SideSocial />
        <main>
          <Hero key={`hero-${lang}`} />
          <Marquee />
          <Stats key={`stats-${lang}`} />
          <Stack key={`stack-${lang}`} />
          <Projects key={`projects-${lang}`} />
          <Alpha key={`alpha-${lang}`} />
          <Contact />
        </main>
        <Footer key={`footer-${lang}`} />
      </div>
      <BackToTop />
      <LangTransition />
      <Boot />
      <Analytics />
    </>
  )
}
