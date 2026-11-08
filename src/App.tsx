import Header from './components/Header'
import SideSocial from './components/SideSocial'
import LangButton from './components/LangButton'
import Hero from './components/Hero'
import Code from './components/Code'
import Featured from './components/Featured'
import Alf from './components/Alf'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Header />
      <SideSocial />
      <LangButton />
      <main>
        <Hero />
        <Code />
        <Featured />
        <Alf />
        <Contact />
      </main>
    </>
  )
}
