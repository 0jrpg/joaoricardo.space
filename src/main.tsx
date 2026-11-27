import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BootProvider } from './boot/BootProvider'
import { LangProvider } from './i18n'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <BootProvider>
        <App />
      </BootProvider>
    </LangProvider>
  </StrictMode>,
)
