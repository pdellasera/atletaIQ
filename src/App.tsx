import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ConfiguracionPage from "./pages/ConfiguracionPage"
import CrearCuentaPage from "./pages/CrearCuentaPage"
import CrearJuegoPage from "./pages/CrearJuegoPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/configuracion" element={<ConfiguracionPage />} />
          <Route path="/configuracion/crear-cuenta" element={<CrearCuentaPage />} />
          <Route path="/configuracion/crear-juego" element={<CrearJuegoPage />} />
          <Route path="/atletas" element={<div>Atletas Page</div>} />
          <Route path="/reportes" element={<div>Reportes Page</div>} />
          <Route path="/competencias" element={<div>Competencias Page</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
