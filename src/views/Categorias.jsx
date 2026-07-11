import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom' // <-- Asegúrate de importar useLocation
import { getProducts } from '../services/dataService'

function Categorias() {
  const location = useLocation() // <-- Captura el estado oculto del router
  const [productos, setProductos] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('FRUTAS FRESCAS')

  useEffect(() => {
    const productosDB = getProducts() || []
    setProductos(productosDB)

    // 🌟 Si viene un estado desde el Home, lo inyectamos directamente en el filtro activo
    if (location.state && location.state.catSeleccionada) {
      setCategoriaSeleccionada(location.state.catSeleccionada)
    }
  }, [location])

  // 🌟 Las 4 categorías oficiales exactas de tu pauta
  const listaCategorias = [
    { id: 'FRUTAS FRESCAS', nombre: 'Frutas Frescas', icono: '🍎' },
    { id: 'VERDURAS ORGÁNICAS', nombre: 'Verduras Orgánicas', icono: '🥦' },
    { id: 'PRODUCTOS ORGÁNICOS', nombre: 'Productos Orgánicos', icono: '🌾' },
    { id: 'PRODUCTOS LÁCTEOS', nombre: 'Productos Lácteos', icono: '🥛' }
  ]

  // Filtrado en tiempo real comparando en mayúsculas para evitar errores de tipeo
  const productosFiltrados = productos.filter(
    p => p.category && p.category.toUpperCase().trim() === categoriaSeleccionada
  )

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      <h2 className="fw-bold text-center text-uppercase my-4" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
        Categorías
      </h2>

      {/* 📊 Bloques Superiores de Selección (Figura 4 con tus 4 columnas responsivas) */}
      <div className="row g-3 justify-content-center mb-5">
        {listaCategorias.map((cat) => (
          <div className="col-6 col-md-3" key={cat.id}>
            <div 
              className={`card h-100 text-center p-3 border-0 shadow-sm transition-all`}
              style={{ 
                cursor: 'pointer', 
                border: categoriaSeleccionada === cat.id ? '2px solid #2E8B57' : 'none',
                backgroundColor: categoriaSeleccionada === cat.id ? '#FFFFFF' : '#F8F9FA'
              }}
              onClick={() => setCategoriaSeleccionada(cat.id)}
            >
              <div className="fs-1 mb-2">{cat.icono}</div>
              <h6 className="fw-bold text-dark small text-uppercase m-0">{cat.nombre}</h6>
            </div>
          </div>
        ))}
      </div>

      {/* Título de la sección activa */}
      <h3 className="fw-bold mb-4 pb-2 border-bottom text-secondary text-uppercase" style={{ fontSize: '1.4rem' }}>
        {categoriaSeleccionada}
      </h3>

      {/* 🛒 Grilla de Productos */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {productosFiltrados.map((prod) => (
          <div className="col" key={prod.code}>
            <div className="card h-100 border-0 shadow-sm p-2 bg-white card-producto">
              <div className="bg-light border rounded d-flex justify-content-center align-items-center text-muted" style={{ height: '180px' }}>
                🌱
              </div>
              
              <div className="card-body d-flex flex-column p-2">
                <span className="text-muted small text-uppercase font-monospace">{prod.category}</span>
                
                <Link to={`/producto/${prod.code}`} className="text-decoration-none text-dark hover-success">
                  <h6 className="fw-bold my-1 text-truncate">{prod.name}</h6>
                </Link>

                <div className="mt-auto pt-2">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-success" style={{ fontSize: '1.1rem' }}>
                      ${prod.price ? prod.price.toLocaleString('es-CL') : '0'}
                    </span>
                    <span className="text-muted small">Stock: {prod.stock}</span>
                  </div>
                  
                  <button className="btn btn-outline-success btn-sm w-100 fw-bold py-1" style={{ fontSize: '0.8rem' }}>
                    AÑADIR AL CARRO
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div className="text-center py-5 text-muted">
          No hay productos registrados en la categoría "{categoriaSeleccionada}" dentro del LocalStorage.
        </div>
      )}
    </div>
  )
}

export default Categorias