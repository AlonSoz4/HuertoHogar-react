import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logoHuerto from '../assets/images/HuertoHogar-Logo.jpg'

function Footer() {
  // Capturamos el año actual dinámicamente con JavaScript
  const currentYear = new Date().getFullYear()

  // Estado local para capturar el correo electrónico del boletín
  const [emailBoletin, setEmailBoletin] = useState('')

  const handleSuscripcion = (e) => {
    e.preventDefault()
    if (!emailBoletin.trim()) {
      alert('Por favor, ingresa un correo electrónico válido.')
      return
    }
    alert(`¡Gracias por suscribirte a nuestro boletín! Enviáremos las mejores novedades agrícolas a: ${emailBoletin}`)
    setEmailBoletin('')
  }

  return (
    <footer className="bg-dark text-light py-5 mt-auto border-top border-success border-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="container">
        <div className="row g-4">
          
          {/* 1. Nombre de la marca con tu LOGO OFICIAL */}
          <div className="col-sm-6 col-md-3 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
              <img 
                src={logoHuerto} 
                alt="Logo HuertoHogar" 
                className="rounded border border-success"
                style={{ width: '45px', height: 'auto', maxHeight: '40px', objectFit: 'contain', backgroundColor: '#FFFFFF' }} 
              />
              <h5 className="text-success fw-bold m-0" style={{ fontFamily: 'Playfair Display, serif' }}>HuertoHogar</h5>
            </div>
            <p className="small text-muted mb-0">Tu almacén de abarrotes y productos orgánicos de confianza.</p>
          </div>

          {/* 2. Enlaces de Redirección con Contraste y Hover Activo */}
          <div className="col-sm-6 col-md-2 text-center text-md-start">
            <h6 className="fw-bold text-success text-uppercase mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
              Secciones
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 m-0" style={{ fontSize: '0.85rem' }}>
              <li>
                <Link to="/nosotros" className="text-white-50 text-decoration-none link-success transition-all">
                  • Nosotros
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-white-50 text-decoration-none link-success transition-all">
                  • Blogs
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-white-50 text-decoration-none link-success transition-all">
                  • Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Horario de Atención Ordenado en una Tabla Limpia */}
          <div className="col-sm-6 col-md-4">
            <h6 className="fw-bold text-success text-uppercase text-center mb-3" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
              🕒 Horario de Atención
            </h6>
            <div className="table-responsive">
              <table className="table table-sm table-borderless text-light m-0 mx-auto" style={{ maxWidth: '280px', fontSize: '0.85rem' }}>
                <tbody>
                  <tr>
                    <td className="fw-bold text-muted p-1">Lunes a Viernes:</td>
                    <td className="text-end p-1">10:00 AM - 20:00 PM</td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-muted p-1">Sábado y Domingo:</td>
                    <td className="text-end text-danger fw-bold p-1">Cerrado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 4. Formulario de Suscripción al Boletín */}
          <div className="col-sm-6 col-md-3 text-center text-md-end">
            <h6 className="fw-bold text-success text-uppercase mb-2" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>📩 Boletín Informativo</h6>
            <form onSubmit={handleSuscripcion} className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-end gap-1">
              <input 
                type="email" 
                className="form-control form-control-sm" 
                placeholder="tu-correo@inacapmail.cl" 
                style={{ maxWidth: '220px', inlineSize: '100%' }}
                value={emailBoletin}
                onChange={(e) => setEmailBoletin(e.target.value)}
              />
              <button className="btn btn-success btn-sm fw-bold px-3" type="submit" style={{ backgroundColor: '#2E8B57', border: 'none' }}>
                Unirse
              </button>
            </form>
          </div>
        </div>

        {/* Separador estético */}
        <hr className="border-secondary my-4" />

        {/* Derechos reservados y ubicación */}
        <div className="row">
          <div className="col-12 text-center">
            <p className="small text-muted mb-1">
              &copy; {currentYear} HuertoHogar. Todos los derechos reservados.
            </p>
            <p className="small text-success mb-0" style={{ fontSize: '0.8rem' }}>
              Santiago, Chile • HuertoHogar S.A. • Av. Principal 1367, Comuna Estación Central
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer