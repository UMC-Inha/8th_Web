import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DarkProvider } from './context/darkProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkProvider>
      <App />
    </DarkProvider>
  </StrictMode>,
)
