import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProducts } from '../services/dataService'

function Carrito() {
  const navigate = useNavigate()
  
  // Estados reactivos locales para el carrito y el cupón de descuento
  const [cart, setCart] = useState([])
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')

  // Ciclo de vida: Cargar el carrito simulado desde el LocalStorage al arrancar
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('huerto_cart')) || []
    setCart(savedCart)
  }, [])

  // Guardar cambios en el LocalStorage de forma automatizada cada vez que mute el carrito
  const saveCartToStorage = (updatedCart) => {
    setCart(updatedCart)
    localStorage.setItem('huerto_cart', JSON.stringify(updatedCart))
  }

  // Operación: Eliminar un producto por completo de la bolsa
  const removeItem = (code) => {
    const updated = cart.filter(item => item.code !== code)
    saveCartToStorage(updated)
  }

  // Operación: Modificar las cantidades (+ / -) respetando el stock real
  const updateQuantity = (code, amount) => {
    const updated = cart.map(item => {
      if (item.code === code) {
        const newQty = item.quantity + amount
        // Validamos que no baje de 1 ni supere el stock disponible de Alonso
        if (newQty >= 1 && newQty <= item.stock) {
          return { ...item, quantity: newQty }
        }
      }
      return item
    })
    saveCartToStorage(updated)
  }

  // Función: Vaciar por completo la bolsa de compras
  const clearCart = () => {
    saveCartToStorage([])
    setDiscount(0)
    setCoupon('')
    setCouponSuccess('')
  }

  // Lógica Matemática: Calcular Subtotal usando operaciones declarativas (.reduce)
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  // Lógica del Cupón de Descuento de Alonso (INACAP20 -> 20% de descuento)
  const applyCoupon = (e) => {
    e.preventDefault()
    if (coupon.trim().toUpperCase() === 'INACAP20') {
      const discountValue = subtotal * 0.20
      setDiscount(discountValue)
      setCouponSuccess('¡Cupón INACAP20 aplicado con éxito! (20% de descuento)')
      setCouponError('')
    } else {
      setDiscount(0)
      setCouponError('El cupón ingresado no es válido.')
      setCouponSuccess('')
    }
  }

  const total = subtotal - discount

  // Navegación dirigida hacia la pasarela de pago
  const handleCheckout = () => {
    localStorage.setItem('huerto_checkout_totals', JSON.stringify({ subtotal, discount, total }))
    navigate('/checkout')
  }

  return (
    <div className="container my-5">
      <div className="border-bottom pb-3 mb-4">
        <h1 className="fw-bold text-dark">Carrito de Compras</h1>
        <p className="text-muted mb-0">Revisa y gestiona los abarrotes seleccionados antes de proceder al pago.</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-5 bg-light rounded border">
          <p className="text-muted fs-5 mb-3">Tu carrito está vacío.</p>
          <Link to="/productos" className="btn btn-success fw-bold">Ir a buscar productos</Link>
        </div>
      ) : (
        <div className="row g-4">
          
          {/* Tabla de Productos Seleccionados (Lado Izquierdo - Figura 5) */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="table-responsive p-3">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th className="text-center">Cantidad</th>
                      <th>Subtotal</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.code}>
                        <td>
                          <div className="fw-bold text-dark">{item.name}</div>
                          <small className="text-muted">Cód: {item.code}</small>
                        </td>
                        <td>${item.price.toLocaleString('es-CL')}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.code, -1)}>-</button>
                            <span className="fw-bold px-2">{item.quantity}</span>
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.code, 1)}>+</button>
                          </div>
                        </td>
                        <td className="fw-bold">${(item.price * item.quantity).toLocaleString('es-CL')}</td>
                        <td className="text-center">
                          <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.code)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer bg-white p-3 text-end">
                <button className="btn btn-outline-danger fw-bold" onClick={clearCart}>Limpiar Carrito</button>
              </div>
            </div>
          </div>

          {/* Resumen Financiero y Cupón (Lado Derecho - Figura 5) */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 p-4 bg-light">
              <h4 className="fw-bold text-dark mb-4">Resumen del Pedido</h4>
              
              {/* Formulario avanzado de Cupones */}
              <form onSubmit={applyCoupon} className="mb-4">
                <label className="form-label small fw-bold text-muted">¿Tienes un cupón de descuento?</label>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ej: INACAP20"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button className="btn btn-dark" type="submit">Aplicar</button>
                </div>
                {couponError && <div className="text-danger small mt-1 fw-bold">{couponError}</div>}
                {couponSuccess && <div className="text-success small mt-1 fw-bold">{couponSuccess}</div>}
              </form>

              <hr />

              <div className="d-flex justify-content-between mb-2 fs-5">
                <span className="text-muted">Subtotal:</span>
                <span className="fw-semibold">${subtotal.toLocaleString('es-CL')}</span>
              </div>
              {discount > 0 && (
                <div className="d-flex justify-content-between mb-2 fs-5 text-success">
                  <span>Descuento (20%):</span>
                  <span>-${discount.toLocaleString('es-CL')}</span>
                </div>
              )}
              <div className="d-flex justify-content-between mb-4 fs-4 border-top pt-2">
                <span className="fw-bold">Total:</span>
                <span className="fw-bold text-success">${total.toLocaleString('es-CL')}</span>
              </div>

              <button className="btn btn-success btn-lg w-100 fw-bold py-3 shadow" onClick={handleCheckout}>
                Proceder al Checkout
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Carrito