import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const cartCount = 0 // Temporal para la Entrega 2, se conectará al arreglo del carro

  // 🌟 Unificamos en un solo estado reactivo para la sesión
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem('huerto_session')
    return session ? JSON.parse(session) : null
  })

  // 🌟 Efecto Seguro: Escucha eventos de login y cambios de almacenamiento sin bucles
  useEffect(() => {
    const verificarSesion = () => {
      const session = localStorage.getItem('huerto_session')
      const datosParseados = session ? JSON.parse(session) : null
      
      // Solo actualiza si de verdad cambió el usuario, evitando renderizados infinitos
      setUser((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(datosParseados)) {
          return datosParseados
        }
        return prev
      })
    }

    // Escuchadores nativos para actualizar la barra al instante
    window.addEventListener('user-login', verificarSesion)
    window.addEventListener('storage', verificarSesion)

    return () => {
      window.removeEventListener('user-login', verificarSesion)
      window.removeEventListener('storage', verificarSesion)
    }
  }, []) // 🌟 CORRECCIÓN CLAVE: Los corchetes vacíos rompen el bucle infinito de raíz

  const handleLogout = () => {
    localStorage.removeItem('huerto_session')
    setUser(null)
    alert('Sesión cerrada correctamente')
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
          {/* ENLACES OFICIALES DEL MENÚ */}
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
            
            {/* 🛡️ ACCESO PRIVADO CONDICIONAL: Solo aparece si el usuario logueado es Administrador */}
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold border border-warning rounded px-2" to="/admin">
                  ⚙️ Panel Admin
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
              // Vista pública: Botones limpios para loguearse o registrarse
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

            {/* Icono del Carrito de Compras */}
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