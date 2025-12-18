import MenuPage from './pages/MenuPage'
import RoutesPages from './utils/RoutesPages'

function App() {

  return (
    <>

      <MenuPage />      {/* El menú de navegación siempre cargado y visible */}
      <RoutesPages />   {/* Las demás páginas se cargan a continuación */}
    </>
  )
}

export default App
