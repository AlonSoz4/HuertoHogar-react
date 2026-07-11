import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  // Simulación temporal del monto acumulado en el carro
  // Más adelante lo conectaremos con el estado real del LocalStorage
  const cartTotal = 0

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        {/* Logo de la empresa apuntando al Home virtual */}
        <Link className="navbar-brand fw-bold text-success d-flex align-items-center" to="/">
          <span className="fs-4">🌱 HuertoHogar</span>
        </Link>

        {/* Botón de hamburguesa responsivo para pantallas móviles */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor de enlaces y buscador colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Enlaces de Navegación Centrales (Figura 1) */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-semibold">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/admin">Administrador</Link>
            </li>
          </ul>

          {/* Barra de Búsqueda Integrada (Figura 1) */}
          <form className="d-flex me-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Buscar productos..." 
              aria-label="Buscar" 
            />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>

          {/* Botón Verde Destacado del Carrito (Figura 1) */}
          <Link className="btn btn-success d-flex align-items-center fw-bold" to="/carrito">
            <i className="bi bi-cart-fill me-2"></i>🛒 Carrito ${cartTotal.toLocaleString('es-CL')}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar