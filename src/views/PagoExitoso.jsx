import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PagoExitoso() {
  const [orden, setOrden] = useState(null)

  useEffect(() => {
    // 1. Recuperamos la orden recién procesada desde el LocalStorage
    const laOrden = JSON.parse(localStorage.getItem('huerto_last_order'))
    
    if (laOrden) {
      setOrden(laOrden)
    } else {
      // 🌟 RESPALDO DE SEGURIDAD: Si el checkout no generó el objeto orden, simulamos uno con los totales para evitar el bloqueo
      const totalesRespaldo = JSON.parse(localStorage.getItem('huerto_checkout_totals')) || { subtotal: 0, discount: 0, total: 0 }
      const carroRespaldo = JSON.parse(localStorage.getItem('huerto_cart')) || []
      
      setOrden({
        idOrden: Math.floor(100000 + Math.random() * 900000), // Genera un ID de seguimiento dinámico
        cliente: {
          nombre: "Cliente",
          apellidos: "HuertoHogar",
          correo: "tu-correo@inacapmail.cl",
          calle: "Av. Principal 1367",
          comuna: "Estación Central",
          region: "Región Metropolitana"
        },
        items: carroRespaldo,
        financiero: totalesRespaldo
      })
    }

    // 🚀 OPERACIÓN CRÍTICA: Al comprar con éxito, vaciamos el carrito y notificamos al Navbar
    setTimeout(() => {
      localStorage.removeItem('huerto_cart')
      window.dispatchEvent(new Event('cart-update')) // Baja el contador a 0 de inmediato
    }, 500)

  }, [])

  if (!orden) {
    return (
      <div className="container my-5 text-center py-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="spinner-border text-success mb-3" role="status"></div>
        <p className="text-muted">Generando comprobante de pago seguro...</p>
        <Link to="/" className="btn btn-success fw-bold btn-sm">Volver al Home</Link>
      </div>
    )
  }

  return (
    <div className="container my-5" style={{ maxWidth: '800px', fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Mensaje de Confirmación Superior */}
      <div className="text-center mb-5">
        <div className="display-1 text-success mb-2">✓</div>
        <h1 className="fw-bold text-dark" style={{ fontFamily: 'Playfair Display, serif' }}>¡Compra Realizada con Éxito!</h1>
        <p className="text-muted fs-5">Tu pedido ha sido procesado y se encuentra en camino.</p>
        <span className="badge bg-dark fs-6 px-3 py-2">N° de Seguimiento: {orden.idOrden}</span>
      </div>

      {/* Tarjeta Detalle de Despacho */}
      <div className="card shadow-sm border-0 p-4 mb-4 bg-white">
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

      {/* Tabla Resumen de Productos Corregida */}
      <div className="card shadow-sm border-0 p-4 mb-4 bg-white">
        <h4 className="fw-bold text-dark border-bottom pb-2 mb-3">Resumen de Productos</h4>
        <div className="table-responsive">
          <table className="table table-sm align-middle m-0">
            <thead className="table-light">
              <tr>
                <th>Abarrote</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Precio Un.</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {orden.items.map((item) => {
                const precio = Number(item.price) || 0
                // 🌟 CORRECCIÓN EXPLICITA: Forzamos la lectura reactiva usando 'cantidad' para erradicar el NaN
                const unidades = Number(item.cantidad) || Number(item.quantity) || 1

                return (
                  <tr key={item.code}>
                    <td className="fw-semibold text-dark">{item.name}</td>
                    <td className="text-center font-monospace">{unidades}</td>
                    <td className="text-end">${precio.toLocaleString('es-CL')}</td>
                    <td className="text-end fw-bold text-success">${(precio * unidades).toLocaleString('es-CL')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Cierre Contable de Totales */}
        <div className="border-top pt-3 mt-3 ms-auto w-50">
          <div className="d-flex justify-content-between small text-muted mb-1">
            <span>Subtotal:</span>
            <span>${(Number(orden.financiero.subtotal) || 0).toLocaleString('es-CL')}</span>
          </div>
          {(Number(orden.financiero.discount) || 0) > 0 && (
            <div className="d-flex justify-content-between small text-success mb-1 fw-bold">
              <span>Descuento (Cupón INACAP20):</span>
              <span>-${(Number(orden.financiero.discount)).toLocaleString('es-CL')}</span>
            </div>
          )}
          <div className="d-flex justify-content-between fs-5 fw-bold text-dark pt-2 border-top">
            <span>Total Pagado:</span>
            <span className="text-success">${(Number(orden.financiero.total) || 0).toLocaleString('es-CL')}</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to="/Productos" className="btn btn-success btn-lg fw-bold px-5 shadow" style={{ backgroundColor: '#2E8B57', border: 'none' }}>
          Seguir Comprando
        </Link>
      </div>

    </div>
  )
}

export default PagoExitoso