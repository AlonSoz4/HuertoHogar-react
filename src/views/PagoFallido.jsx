import React from 'react'
import { Link } from 'react-router-dom'

function PagoFallido() {
  return (
    <div className="container my-5 text-center py-5" style={{ maxWidth: '600px' }}>
      
      {/* Icono de Rechazo Estilo Wireframe (Figura 8) */}
      <div className="display-1 text-danger mb-3">✕</div>
      
      <h1 className="fw-bold text-dark mb-3">Transacción Rechazada</h1>
      
      <div className="alert alert-danger border-0 shadow-sm p-4 text-start mb-4">
        <h5 className="fw-bold mb-2">Posibles motivos del problema:</h5>
        <ul className="mb-0 small">
          <li>Fondos insuficientes en la cuenta bancaria simulada.</li>
          <li>Error de comunicación con los servidores de Webpay/Transbank.</li>
          <li>Datos de tarjeta o claves de seguridad inválidos.</li>
        </ul>
      </div>
      
      <p className="text-muted mb-4">
        No te preocupes, los productos de tu HuertoHogar siguen reservados dentro de tu bolsa de compras intactos.
      </p>

      <div className="d-flex justify-content-center gap-3">
        <Link to="/checkout" className="btn btn-danger btn-lg fw-bold px-4 shadow-sm">
          Reintentar el Pago
        </Link>
        <Link to="/carrito" className="btn btn-outline-secondary btn-lg fw-bold px-4">
          Modificar Carrito
        </Link>
      </div>

    </div>
  )
}

export default PagoFallido