import React from 'react'
import { Link } from 'react-router-dom'

function HomeAdmin() {
  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Encabezado Principal del Panel */}
      <div className="bg-dark text-white p-5 rounded shadow-sm mb-5 text-center text-md-start">
        <h1 className="fw-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          ⚙️ Panel de Control Administrativo
        </h1>
        <p className="lead text-muted m-0">
          Bienvenido al sistema de gestión interna de <strong>HuertoHogar</strong>. Desde aquí puedes controlar el inventario y los usuarios.
        </p>
      </div>

      {/* Grilla de Módulos de Gestión */}
      <div className="row g-4 justify-content-center">
        
        {/* Card 1: Mantenedor de Productos */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 bg-white text-center">
            <div className="fs-1 mb-2">📦</div>
            <h4 className="fw-bold text-dark mb-3">Gestión de Productos</h4>
            <p className="text-muted small mb-4">
              Controla el stock disponible, añade nuevos productos al catálogo, edita precios, categorías o elimina ítems que ya no estén en distribución.
            </p>
            {/* Redirección a la tabla de productos */}
            <Link to="/admin/productos" className="btn btn-success fw-bold mt-auto w-100 py-2" style={{ backgroundColor: '#2E8B57', border: 'none' }}>
              Gestionar Inventario
            </Link>
          </div>
        </div>

        {/* Card 2: Mantenedor de Usuarios */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 bg-white text-center">
            <div className="fs-1 mb-2">👥</div>
            <h4 className="fw-bold text-dark mb-3">Administración de Usuarios</h4>
            <p className="text-muted small mb-4">
              Visualiza el listado completo de clientes registrados, edita sus datos de despacho, gestiona perfiles o cambia privilegios de acceso al sistema.
            </p>
            {/* Redirección a la tabla de usuarios */}
            <Link to="/admin/usuarios" className="btn btn-outline-dark fw-bold mt-auto w-100 py-2">
              Control de Clientes
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomeAdmin