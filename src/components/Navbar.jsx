import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const cartCount = 0 // Temporal para la Entrega 2, se conectará al arreglo del carro

  // Estado para capturar de forma reactiva si hay una sesión activa en el navegador
  const [user, setUser] = useState(null)

  // Efecto continuo: Verifica si el usuario inició sesión para pintar su nombre
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('huerto_user'))
    if (savedUser) {
      setUser(savedUser)
    } else {
      setUser(null)
    }
  }) // Se ejecuta en cada renderizado para capturar el cambio de ruta de forma inmediata

  const handleLogout = () => {
    localStorage.removeItem('huerto_user')
    setUser(null)
    navigate('/') // Al cerrar sesión devolvemos al cliente al Home público
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        
        {/* LOGO CORPORATIVO DE HUERTOHOGAR */}
        <Link className="navbar-brand fw-bold text-success d-flex align-items-center gap-2" to="/">
          <span className="fs-3">🌱</span> 
          <span style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>HuertoHogar</span>
        </Link>

        {/* Hamburguesa responsiva de Bootstrap para celulares */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* ENLACES OFICIALES DEL MENÚ (Mapeados exactamente al flujo de la Figura 1 y 2) */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-semibold text-uppercase" style={{ fontSize: '0.9rem', gap: '15px' }}>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/blogs">Blogs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contacto">Contacto</Link>
            </li>
            
            {/* 🛡️ ACCESO PRIVADO CONDICIONAL: Solo se inyecta si el usuario logueado es Administrador */}
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link text-danger fw-bold border border-danger rounded px-2" to="/admin">
                  ⚙️ Mantenedor
                </Link>
              </li>
            )}
          </ul>

          {/* BOTONERA DE SESIÓN Y CARRO A LA DERECHA */}
          <div className="d-flex align-items-center gap-3">
            {user ? (
              // Vista Si el usuario ya se autenticó (Muestra Nombre y botón de salida)
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '0.85rem' }}>
                  👤 {user.name}
                </span>
                <button className="btn btn-outline-danger btn-sm fw-bold px-3 text-uppercase" onClick={handleLogout} style={{ fontSize: '0.75rem' }}>
                  Salir
                </button>
              </div>
            ) : (
              // Vista pública: Botones limpios de la Figura 3 para loguearse o registrarse
              <div className="d-flex gap-2">
                <Link className="btn btn-link text-success fw-bold text-decoration-none small" to="/login">
                  Iniciar sesión
                </Link>
                <span className="text-muted">|</span>
                <Link className="btn btn-link text-success fw-bold text-decoration-none small" to="/registro">
                  Registrar usuario
                </Link>
              </div>
            )}

            {/* Icono del Carrito de Compras de la Figura 3 */}
            {/* Icono del Carrito de Compras de la Figura 3 Conectado a la Ruta */}
            <Link 
              to="/carrito" 
              className="btn btn-success d-flex align-items-center fw-bold px-3 gap-2 shadow-sm text-decoration-none" 
              style={{ backgroundColor: '#2E8B57', border: 'none' }}
            >
              <span>🛒</span>
              <span className="badge bg-white text-success rounded-pill">{cartCount}</span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar