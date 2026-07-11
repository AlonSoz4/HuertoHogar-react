import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Componentes Globales fijos
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// VISTAS DE LA TIENDA PÚBLICA (Directas en src/views/)
import Home from './views/Home'
import Productos from './views/Productos'
import Carrito from './views/Carrito'
import Checkout from './views/Checkout'
import PagoExitoso from './views/PagoExitoso'
import PagoFallido from './views/PagoFallido'
import Contacto from './views/Contacto'
import Nosotros from './views/Nosotros'
import Blogs from './views/Blogs'
import IniciarSesion from './views/IniciarSesion'
import RegistroUsuario from './views/RegistroUsuario' // <-- Importado correctamente aquí
import Categorias from './views/Categorias' // 
import DetalleBlog from './views/DetalleBlog' // 

// Importamos tu componente real de detalle con su nombre exacto
import DetalleProductos from './views/DetalleProductos' 

// VISTAS DEL MÓDULO ADMINISTRATIVO (Dentro de src/views/admin/)
import HomeAdmin from './views/admin/HomeAdmin'
import ProductosAdmin from './views/admin/ProductosAdmin'
import NuevoProducto from './views/admin/NuevoProducto'
import EditarProducto from './views/admin/EditarProducto'
import UsuariosAdmin from './views/admin/UsuariosAdmin'
import NuevoUsuario from './views/admin/NuevoUsuario'
import EditarUsuario from './views/admin/EditarUsuario'

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#F7F7F7', fontFamily: 'Montserrat, sans-serif' }}>
        
        {/* Menú de navegación */}
        <Navbar />

        {/* Contenedor e inyector de pantallas */}
        <main className="flex-grow-1">
          <Routes>
            {/* Rutas Públicas de la Tienda */}
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pago-exitoso" element={<PagoExitoso />} />
            <Route path="/pago-fallido" element={<PagoFallido />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<IniciarSesion />} />
            <Route path="/blogs/:id" element={<DetalleBlog />} />
            
            {/* 🌟 CORREGIDO: Ahora usa tu componente real RegistroUsuario */}
            <Route path="/registro" element={<RegistroUsuario />} />

            {/* Enlazamos la ruta pública a tu componente real de detalle */}
            <Route path="/producto/:code" element={<DetalleProductos />} />

            {/* Rutas Privadas del Panel Administrativo */}
            <Route path="/admin" element={<HomeAdmin />} />
            <Route path="/admin/productos" element={<ProductosAdmin />} />
            <Route path="/admin/productos/nuevo" element={<NuevoProducto />} />
            <Route path="/admin/productos/editar/:code" element={<EditarProducto />} />
            <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
            <Route path="/admin/usuarios/nuevo" element={<NuevoUsuario />} />
            <Route path="/admin/usuarios/editar/:run" element={<EditarUsuario />} />
          </Routes>
        </main>

        {/* Pie de página global */}
        <Footer />

      </div>
    </Router>
  )
}

export default App