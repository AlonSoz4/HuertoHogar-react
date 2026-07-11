import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductByCode, getProducts } from '../services/dataService'

function Detalle() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    const prod = getProductByCode(code)
    if (prod) {
      setProducto(prod)
      setCantidad(1) // Reinicia el contador a 1 si cambia de producto recomendado
    } else {
      navigate('/productos')
    }
  }, [code, navigate])

  if (!producto) return <div className="container my-5">Cargando producto...</div>

  // 🌟 CONEXIÓN REAL Y PERSISTENTE AL CARRITO
  const handleAgregarAlCarro = () => {
    // 1. Traer el carro actual o inicializarlo vacío
    const carroActual = JSON.parse(localStorage.getItem('huerto_cart')) || []

    // 2. Verificar si ya se había añadido el producto anteriormente
    const existe = carroActual.find(item => item.code === producto.code)

    if (existe) {
      // Validamos que la suma no supere el stock disponible de la tienda
      if (existe.cantidad + cantidad <= producto.stock) {
        existe.cantidad += cantidad
      } else {
        alert(`No puedes agregar esa cantidad. El stock total disponible es de ${producto.stock} unidades y ya tienes ${existe.cantidad} en tu carro.`)
        return
      }
    } else {
      // Si es nuevo, lo inyectamos con la cantidad elegida
      carroActual.push({
        code: producto.code,
        name: producto.name,
        price: producto.price,
        image: '🌱',
        category: producto.category,
        cantidad: cantidad,
        stockMax: producto.stock
      })
    }

    // 3. Guardar cambios en el almacenamiento local
    localStorage.setItem('huerto_cart', JSON.stringify(carroActual))

    // 4. 🚀 REACTIVIDAD INMEDIATA: Forzar al Navbar a actualizar su contador
    window.dispatchEvent(new Event('cart-update'))

    alert(`¡Añadido al carro! ${cantidad} unidades de ${producto.name}`)
  }

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/" className="text-success text-decoration-none">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/productos" className="text-success text-decoration-none">Productos</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{producto.name}</li>
        </ol>
      </nav>

      <div className="card border-0 shadow-sm p-4 bg-white mt-3 mb-5">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <div className="bg-light border rounded d-flex justify-content-center align-items-center text-muted" style={{ height: '350px', fontSize: '3rem' }}>
              🌱
            </div>
          </div>
          <div className="col-md-6">
            <span className="badge bg-success mb-2 text-uppercase">{producto.category}</span>
            <h2 className="fw-bold mb-3 text-dark" style={{ fontFamily: 'Playfair Display, serif' }}>{producto.name}</h2>
            <h3 className="text-success fw-bold mb-4">${producto.price.toLocaleString('es-CL')}</h3>
            
            <p className="text-muted small mb-4" style={{ textAlign: 'justify' }}>
              Abarrote fresco y orgánico distribuido directamente por HuertoHogar. Conserva todas sus propiedades naturales y cuenta con certificación de origen local.
            </p>

            <div className="mb-4">
              <span className="small fw-bold text-secondary d-block mb-2">Stock Disponible: {producto.stock} unidades</span>
              <div className="d-flex align-items-center gap-2" style={{ maxWidth: '140px' }}>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setCantidad(c => Math.max(1, c - 1))}>-</button>
                <input type="number" className="form-control form-control-sm text-center fw-bold" value={cantidad} readOnly />
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setCantidad(c => Math.min(producto.stock, c + 1))} disabled={producto.stock === 0}>+</button>
              </div>
            </div>

            <button 
              className="btn btn-success fw-bold px-4 py-2" 
              onClick={handleAgregarAlCarro} 
              style={{ backgroundColor: '#2E8B57', border: 'none' }}
              disabled={producto.stock === 0}
            >
              {producto.stock === 0 ? '❌ SIN STOCK DISPONIBLE' : '🛒 AÑADIR AL CARRITO'}
            </button>
          </div>
        </div>
      </div>

      {/* 🌿 SECCIÓN: PRODUCTOS RECOMENDADOS (Misma categoría, distinto código) */}
      <div className="border-top pt-5">
        <h3 className="fw-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#8B4513' }}>
          Productos Recomendados
        </h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {getProducts()
            .filter(p => p.category === producto.category && p.code !== producto.code)
            .slice(0, 3) // Mostramos hasta 3 recomendaciones
            .map(recom => (
              <div className="col" key={recom.code}>
                <div className="card h-100 border-0 shadow-sm text-center p-3 bg-white">
                  <div className="fs-1 my-2">🌱</div>
                  <span className="text-muted small text-uppercase font-monospace">{recom.category}</span>
                  <h6 className="fw-bold text-dark text-truncate mt-1 mb-2">{recom.name}</h6>
                  <p className="text-success fw-bold mb-3">${recom.price?.toLocaleString('es-CL')}</p>
                  <Link to={`/producto/${recom.code}`} className="btn btn-outline-success btn-sm fw-bold w-100 mt-auto">
                    Ver Detalle
                  </Link>
                </div>
              </div>
            ))}
        </div>
        
        {getProducts().filter(p => p.category === producto.category && p.code !== producto.code).length === 0 && (
          <p className="text-muted small">No hay otros productos disponibles en esta categoría por el momento.</p>
        )}
      </div>

    </div>
  )
}

export default Detalle