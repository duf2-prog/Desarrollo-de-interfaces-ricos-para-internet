import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import ErrorBoundary from './services/errorBoundary.ts'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<p>Ha ocurrido un error inesperado.</p>}>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
)
