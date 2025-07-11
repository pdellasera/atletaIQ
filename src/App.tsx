import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ConfiguracionPage from "./pages/ConfiguracionPage"
import CrearCuentaPage from "./pages/CrearCuentaPage"
import CrearJuegoPage from "./pages/CrearJuegoPage"
import "./App.css"
import AthletesPage from "./pages/AtletaPage"
import CompetitionsPage from "./pages/CompeticionPage"
import ReportsPage from "./pages/ReportPage"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/atletas" element={<AthletesPage />} />
          <Route path="/competencias" element={<CompetitionsPage />} />
          <Route path="/reportes" element={<ReportsPage />} />
          <Route path="/configuracion" element={<ConfiguracionPage />} />
          <Route path="/configuracion/crear-cuenta" element={<CrearCuentaPage />} />
          <Route path="/configuracion/crear-juego" element={<CrearJuegoPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
