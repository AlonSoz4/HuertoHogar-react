import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const navigate = useNavigate()
  
  // Estados para montos y el carrito
  const [totals, setTotals] = useState({ subtotal: 0, discount: 0, total: 0 })
  const [cart, setCart] = useState([])

  // Estado del formulario de envío (Figura 6)
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: ''
  })

  // Cargar datos consolidados del paso anterior
  useEffect(() => {
    const savedTotals = JSON.parse(localStorage.getItem('huerto_checkout_totals')) || { subtotal: 0, discount: 0, total: 0 }
    const savedCart = JSON.parse(localStorage.getItem('huerto_cart')) || []
    setTotals(savedTotals)
    setCart(savedCart)
  }, [])

  // Captura genérica de inputs con control de estado reactivo
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Simulación: Flujo de procesamiento de pago
  const procesarPago = (esExitoso) => {
    // Guardamos los datos de la orden en localStorage para que la boleta los imprima
    const ordenFinal = {
      idOrden: "ORDEN" + Math.floor(10000 + Math.random() * 90000),
      cliente: formData,
      items: cart,
      financiero: totals,
      fecha: new Date().toLocaleDateString('es-CL')
    }
    
    localStorage.setItem('huerto_last_order', JSON.stringify(ordenFinal))

    if (esExitoso) {
      // 🌟 CORRECCIÓN: Buscamos en tus posibles llaves de base de datos local
      const storageKey = localStorage.getItem('huerto_products_db') ? 'huerto_products_db' : 'huerto_products'
      const products = JSON.parse(localStorage.getItem(storageKey)) || []
      
      const updatedProducts = products.map(prod => {
        const itemEnCarro = cart.find(c => c.code === prod.code)
        if (itemEnCarro) {
          // 🌟 CORRECCIÓN CRÍTICA: Cambiado .quantity por .cantidad para evitar el NaN
          const unidadesCompradas = Number(itemEnCarro.cantidad) || Number(itemEnCarro.quantity) || 1
          const nuevoStock = Number(prod.stock) - unidadesCompradas
          return { ...prod, stock: nuevoStock >= 0 ? nuevoStock : 0 }
        }
        return prod
      })
      
      localStorage.setItem(storageKey, JSON.stringify(updatedProducts))
      
      // Vaciamos el carro y redirigimos
      localStorage.removeItem('huerto_cart')
      navigate('/pago-correcto')
    } else {
      // Si falla, redirigimos manteniendo el carro intacto
      navigate('/pago-error')
    }
  }

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="row g-4">
        
        {/* Formulario de Datos (Lado Izquierdo - Figura 6) */}
        <div className="col-md-7">
          <div className="card shadow-sm p-4 border-0 bg-white">
            <h4 className="fw-bold text-dark mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Información del Cliente</h4>
            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label className="form-label small fw-bold">Nombre*</label>
                <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleInputChange} required placeholder="Ej: Pedro" />
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-bold">Apellidos*</label>
                <input type="text" className="form-control" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required placeholder="Ej: Hacker" />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">Correo Electrónico*</label>
                <input type="email" className="form-control" name="correo" value={formData.correo} onChange={handleInputChange} required placeholder="pedro.hacker@example.com" />
              </div>
            </div>

            <h4 className="fw-bold text-dark mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Dirección de entrega de los productos</h4>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label small fw-bold">Calle*</label>
                <input type="text" className="form-control" name="calle" value={formData.calle} onChange={handleInputChange} required placeholder="Ej: Los crisantemos, Edificio Norte" />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Departamento (opcional)</label>
                <input type="text" className="form-control" name="departamento" value={formData.departamento} onChange={handleInputChange} placeholder="Ej: 603" />
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-bold">Región*</label>
                <select className="form-select" name="region" value={formData.region} onChange={handleInputChange}>
                  <option>Región Metropolitana de Santiago</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-bold">Comuna*</label>
                <select className="form-select" name="comuna" value={formData.comuna} onChange={handleInputChange}>
                  <option>Cerrillos</option>
                  <option>El Bosque</option>
                  <option>Santiago Centro</option>
                  <option>Providencia</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">Indicaciones para la entrega (opcional)</label>
                <textarea className="form-control" rows="3" name="indicaciones" value={formData.indicaciones} onChange={handleInputChange} placeholder="Ej: Entre calles, color del edificio..."></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen e Interactividad del Pago (Lado Derecho) */}
        <div className="col-md-5">
          <div className="card shadow-sm p-4 bg-light border-0 text-center">
            <h4 className="fw-bold text-dark mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Total a pagar: ${totals.total.toLocaleString('es-CL')}
            </h4>
            <p className="text-muted small">Para efectos de evaluación de la Entrega 2, simule el comportamiento de la pasarela bancaria seleccionando un resultado:</p>
            
            <div className="d-grid gap-3 mt-3">
              <button className="btn btn-success btn-lg fw-bold py-3 shadow-sm border-0" type="button" onClick={() => procesarPago(true)} style={{ backgroundColor: '#198754' }}>
                🟢 Simular Pago Exitoso
              </button>
              <button className="btn btn-danger btn-lg fw-bold py-3 shadow-sm border-0" type="button" onClick={() => procesarPago(false)} style={{ backgroundColor: '#dc3545' }}>
                🔴 Simular Pago con Error
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout