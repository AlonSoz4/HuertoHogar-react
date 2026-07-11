import React from 'react'

function Footer() {
  // Capturamos el año actual dinámicamente con JavaScript
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light py-4 mt-auto border-top border-success border-3">
      <div className="container">
        <div className="row align-items-center">
          {/* Nombre de la marca y eslogan responsivo */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h5 className="text-success fw-bold mb-1">🌱 HuertoHogar</h5>
            <p className="small text-muted mb-0">Tu almacén de abarrotes y productos orgánicos de confianza.</p>
          </div>
          
          {/* Derechos reservados y ubicación */}
          <div className="col-md-6 text-center text-md-end">
            <p className="small text-muted mb-0">
              &copy; {currentYear} HuertoHogar. Todos los derechos reservados.
            </p>
            <p className="small text-success mb-0" style={{ fontSize: '0.8rem' }}>
              Santiago, Chile • HuertoHogar S.A. • Av. Principal 1367, Comuna Estacion Central
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer