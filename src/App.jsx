import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Importación de Componentes Globales Estáticos
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Importación de las Vistas Públicas (Tienda)
import Home from './views/Home'
import Productos from './views/Productos'
import Categorias from './views/Categorias'
import Carrito from './views/Carrito'
import Checkout from './views/Checkout'
import PagoExitoso from './views/PagoExitoso'
import PagoFallido from './views/PagoFallido'

// Importación de la Vista Privada (Administrador)
import Dashboard from './views/Dashboard'

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-Sole">
        {/* La barra de navegación se renderiza arriba de todas las vistas públicas */}
        <Navbar />

        {/* Contenedor principal dinámico que cambiará según la URL */}
        <main className="flex-grow-1">
          <Routes>
            {/* Rutas del Flujo Público (Figuras 2 y 3) */}
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pago-correcto" element={<PagoExitoso />} />
            <Route path="/pago-error" element={<PagoFallido />} />

            {/* Ruta del Flujo de Gestión (Figuras 2 y 10) */}
            <Route path="/admin" element={<Dashboard />} />
          </Routes>
        </main>

        {/* El pie de página corporativo unificado abajo de todo */}
        <Footer />
      </div>
    </Router>
  )
}

export default App