import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PagoExitoso() {
  const [orden, setOrden] = useState(null)

  // Recuperamos la orden recién procesada desde el LocalStorage
  useEffect(() => {
    const laOrden = JSON.parse(localStorage.getItem('huerto_last_order'))
    if (laOrden) {
      setOrden(laOrden)
    }
  }, [])

  if (!orden) {
    return (
      <div className="container my-5 text-center py-5">
        <p className="text-muted">Cargando datos del comprobante...</p>
        <Link to="/" className="btn btn-success fw-bold">Volver al Home</Link>
      </div>
    )
  }

  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      
      {/* Mensaje de Confirmación Superior (Figura 7) */}
      <div className="text-center mb-5">
        <div className="display-1 text-success mb-2">✓</div>
        <h1 className="fw-bold text-dark">¡Compra Realizada con Éxito!</h1>
        <p className="text-muted fs-5">Tu pedido ha sido procesado y se encuentra en camino.</p>
        <span className="badge bg-dark fs-6 px-3 py-2">N° de Seguimiento: {orden.idOrden}</span>
      </div>

      {/* Tarjeta Detalle de Despacho (Figura 7) */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h4 className="fw-bold text-success border-bottom pb-2 mb-3">Datos de Despacho</h4>
        <div className="row g-2 fs-6">
          <div className="col-sm-4 text-muted fw-semibold">Cliente:</div>
          <div className="col-sm-8 text-dark fw-bold">{orden.cliente.nombre} {orden.cliente.apellidos}</div>
          
          <div className="col-sm-4 text-muted fw-semibold">Correo:</div>
          <div className="col-sm-8 text-dark">{orden.cliente.correo}</div>
          
          <div className="col-sm-4 text-muted fw-semibold">Dirección:</div>
          <div className="col-sm-8 text-dark">
            {orden.cliente.calle} {orden.cliente.departamento && `, Depto ${orden.cliente.departamento}`}
          </div>
          
          <div className="col-sm-4 text-muted fw-semibold">Ubicación:</div>
          <div className="col-sm-8 text-dark">{orden.cliente.comuna}, {orden.cliente.region}</div>
          
          {orden.cliente.indicaciones && (
            <>
              <div className="col-sm-4 text-muted fw-semibold">Notas:</div>
              <div className="col-sm-8 text-muted italic">"{orden.cliente.indicaciones}"</div>
            </>
          )}
        </div>
      </div>

      {/* Tabla Resumen de Productos de Alonso (Figura 7) */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h4 className="fw-bold text-dark border-bottom pb-2 mb-3">Resumen de Productos</h4>
        <div className="table-responsive">
          <table className="table table-sm align-middle">
            <thead className="table-light">
              <tr>
                <th>Abarrote</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Precio Un.</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {orden.items.map((item) => (
                <tr key={item.code}>
                  <td className="fw-semibold text-dark">{item.name}</td>
                  <td className="text-center font-monospace">{item.quantity}</td>
                  <td className="text-end">${item.price.toLocaleString('es-CL')}</td>
                  <td className="text-end fw-bold">${(item.price * item.quantity).toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cierre Contable de Totales */}
        <div className="border-top pt-3 mt-2 ms-auto w-50">
          <div className="d-flex justify-content-between small text-muted mb-1">
            <span>Subtotal:</span>
            <span>${orden.financiero.subtotal.toLocaleString('es-CL')}</span>
          </div>
          {orden.financiero.discount > 0 && (
            <div className="d-flex justify-content-between small text-success mb-1 fw-bold">
              <span>Descuento (Cupón INACAP20):</span>
              <span>-${orden.financiero.discount.toLocaleString('es-CL')}</span>
            </div>
          )}
          <div className="d-flex justify-content-between fs-5 fw-bold text-dark pt-2 border-top">
            <span>Total Pagado:</span>
            <span className="text-success">${orden.financiero.total.toLocaleString('es-CL')}</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/productos" className="btn btn-success btn-lg fw-bold px-5 shadow">
          Seguir Comprando
        </Link>
      </div>

    </div>
  )
}

export default PagoExitoso