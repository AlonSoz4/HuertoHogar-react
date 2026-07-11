import React from 'react'
import { Link } from 'react-router-dom'

function PagoFallido() {
  return (
    <div className="container my-5 text-center py-5" style={{ maxWidth: '600px', fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Icono de Rechazo Estilo Wireframe */}
      <div className="display-1 text-danger mb-3">✕</div>
      
      <h1 className="fw-bold text-dark mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Transacción Rechazada</h1>
      
      <div className="alert alert-danger border-0 shadow-sm p-4 text-start mb-4 bg-white border-start border-danger border-3">
        <h5 className="fw-bold mb-2 text-danger">Posibles motivos del problema:</h5>
        <ul className="mb-0 small text-muted d-flex flex-column gap-1">
          <li>• Fondos insuficientes en la cuenta bancaria simulada.</li>
          <li>• Error de comunicación con los servidores de Webpay/Transbank.</li>
          <li>• Datos de tarjeta o claves de seguridad inválidos.</li>
        </ul>
      </div>
      
      <p className="text-muted mb-4 small">
        No te preocupes, los productos de tu <strong>HuertoHogar</strong> siguen guardados dentro de tu bolsa de compras intactos.
      </p>

      <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
        <Link to="/checkout" className="btn btn-danger fw-bold px-4 py-2 shadow-sm">
          Reintentar el Pago
        </Link>
        <Link to="/carrito" className="btn btn-outline-secondary fw-bold px-4 py-2">
          Modificar Carrito
        </Link>
      </div>

    </div>
  )
}

export default PagoFallido