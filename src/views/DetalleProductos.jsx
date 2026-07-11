import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductByCode } from '../services/dataService'

function Detalle() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    const prod = getProductByCode(code)
    if (prod) {
      setProducto(prod)
    } else {
      navigate('/productos')
    }
  }, [code, navigate])

  if (!producto) return <div className="container my-5">Cargando producto...</div>

  const handleAgregarAlCarro = () => {
    // Lógica básica de persistencia temporal
    alert(`¡Añadido al carro! ${cantidad} unidades de ${producto.name}`)
  }

  return (
    <div className="container my-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/" className="text-success text-decoration-none">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/productos" className="text-success text-decoration-none">Productos</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{producto.name}</li>
        </ol>
      </nav>

      <div className="card border-0 shadow-sm p-4 bg-white mt-3">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <div className="bg-light border rounded d-flex justify-content-center align-items-center text-muted" style={{ height: '350px', fontSize: '3rem' }}>
              🌱
            </div>
          </div>
          <div className="col-md-6">
            <span className="badge bg-success mb-2 text-uppercase">{producto.category}</span>
            <h2 className="fw-bold mb-3 text-dark">{producto.name}</h2>
            <h3 className="text-success fw-bold mb-4">${producto.price.toLocaleString('es-CL')}</h3>
            
            <p className="text-muted small mb-4" style={{ textAlign: 'justify' }}>
              Abarrote fresco y orgánico distribuido directamente por HuertoHogar. Conserva todas sus propiedades naturales y cuenta con certificación de origen local.
            </p>

            <div className="mb-4">
              <span className="small fw-bold text-secondary d-block mb-2">Stock Disponible: {producto.stock} unidades</span>
              <div className="d-flex align-items-center gap-2" style={{ maxWidth: '140px' }}>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setCantidad(c => Math.max(1, c - 1))}>-</button>
                <input type="number" className="form-control form-control-sm text-center fw-bold" value={cantidad} readOnly />
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setCantidad(c => Math.min(producto.stock, c + 1))}>+</button>
              </div>
            </div>

            <button className="btn btn-success fw-bold px-4 py-2" onClick={handleAgregarAlCarro} style={{ backgroundColor: '#2E8B57', border: 'none' }}>
              🛒 AÑADIR AL CARRITO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detalle