import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import ErrorBoundary from './services/errorBoundary.ts'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <ErrorBoundary fallback={<p>Ha ocurrido un error inesperado.</p>}>
    <App />
  </ErrorBoundary>
  //</StrictMode>,
)
