import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container my-5">
      
      {/* 1. Hero Banner Central (Figura 1) */}
      <div className="p-5 mb-5 bg-light rounded-3 border text-center text-secondary">
        <div className="container-fluid py-5">
          <h1 className="display-4 fw-bold text-dark">1200 x 300</h1>
          <h2 className="fs-3 fw-semibold text-success mt-3">Nuevos Lanzamientos</h2>
          <p className="col-md-8 mx-auto fs-5 text-muted">
            Descubre los últimos productos orgánicos y frescos disponibles en nuestra tienda.
          </p>
          <div className="d-flex justify-content-center gap-2 mt-2">
            <span className="badge bg-secondary rounded-pill px-2" style={{ width: '30px', height: '8px' }}></span>
            <span className="badge bg-success rounded-pill px-2" style={{ width: '30px', height: '8px' }}></span>
            <span className="badge bg-secondary rounded-pill px-2" style={{ width: '30px', height: '8px' }}></span>
          </div>
        </div>
      </div>

      {/* 2. Sección de Categorías Destacadas (Figura 1) */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-center mb-4" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>Categorías</h2>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Tarjeta 1 */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100 border-0">
            <div className="card-body bg-light py-5 border rounded">
              <h3 className="card-title display-6 fw-bold text-muted mb-4">400 x 200</h3>
              <h5 className="fw-bold text-dark mb-3">Frutas Frescas</h5>
              <Link to="/categorias" state={{ catSeleccionada: 'FRUTAS FRESCAS' }} className="btn btn-outline-success btn-sm px-4">Ver Catálogo</Link>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100 border-0">
            <div className="card-body bg-light py-5 border rounded">
              <h3 className="card-title display-6 fw-bold text-muted mb-4">400 x 200</h3>
              <h5 className="fw-bold text-dark mb-3">Verduras Orgánicas</h5>
              <Link to="/categorias" state={{ catSeleccionada: 'VERDURAS ORGÁNICAS' }} className="btn btn-outline-success btn-sm px-4">Ver Catálogo</Link>
            </div>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100 border-0">
            <div className="card-body bg-light py-5 border rounded">
              <h3 className="card-title display-6 fw-bold text-muted mb-4">400 x 200</h3>
              <h5 className="fw-bold text-dark mb-3">Productos Orgánicos</h5>
              <Link to="/categorias" state={{ catSeleccionada: 'PRODUCTOS ORGÁNICOS' }} className="btn btn-outline-success btn-sm px-4">Ver Catálogo</Link>
            </div>
          </div>
        </div>
        {/* Tarjeta 4 */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100 border-0">
            <div className="card-body bg-light py-5 border rounded">
              <h3 className="card-title display-6 fw-bold text-muted mb-4">400 x 200</h3>
              <h5 className="fw-bold text-dark mb-3">Lácteos</h5>
              <Link to="/categorias" state={{ catSeleccionada: 'PRODUCTOS LÁCTEOS' }} className="btn btn-outline-success btn-sm px-4">Ver Catálogo</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home