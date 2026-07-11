import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/dataService'

function Productos() {
  const [listaProductos, setListaProductos] = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState('TODOS')

  // Cargamos los productos llamando a tu servicio de base de datos
  useEffect(() => {
    const productosDB = getProducts()
    setListaProductos(productosDB || [])
  }, [])

  // Las 5 opciones de la botonera oficial de la tienda
  const categorias = ['TODOS', 'FRUTAS FRESCAS', 'VERDURAS ORGÁNICAS', 'PRODUCTOS ORGÁNICOS', 'PRODUCTOS LÁCTEOS']

  // 🌟 FILTRADO INTELIGENTE: Busca coincidencias parciales y limpia tildes/espacios
  const productosFiltrados = categoriaActiva === 'TODOS'
    ? listaProductos
    : listaProductos.filter(p => {
        if (!p.category) return false

        // Normalizamos el texto del producto (Mayúsculas, sin espacios extra y sin tildes)
        const catProducto = p.category.toUpperCase().trim()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")

        // Evaluamos el botón presionado de forma flexible
        if (categoriaActiva === 'FRUTAS FRESCAS') {
          return catProducto.includes('FRUTA')
        }
        if (categoriaActiva === 'VERDURAS ORGÁNICAS') {
          return catProducto.includes('VERDURA')
        }
        if (categoriaActiva === 'PRODUCTOS ORGÁNICOS') {
          return catProducto.includes('ORGANIC') || (catProducto.includes('PRODUCTO') && catProducto.includes('ORG'))
        }
        if (categoriaActiva === 'PRODUCTOS LÁCTEOS') {
          return catProducto.includes('LACTEO') || catProducto.includes('LECHE') || catProducto.includes('QUESO')
        }

        return catProducto === categoriaActiva.toUpperCase().trim()
      })

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Título de la tienda */}
      <h2 className="fw-bold text-center text-uppercase my-4" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
        Productos
      </h2>

      {/* 📊 BOTONERA DE FILTROS INTERACTIVOS */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        {categorias.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`btn btn-sm fw-bold px-4 py-2 border transition-all ${
              categoriaActiva === cat 
                ? 'btn-dark border-dark text-white' 
                : 'btn-outline-dark bg-white text-dark'
            }`}
            onClick={() => setCategoriaActiva(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Título dinámico de la sección */}
      <h4 className="fw-bold text-secondary mb-4 text-uppercase pb-2 border-bottom">
        {categoriaActiva === 'TODOS' ? 'Catálogo General' : categoriaActiva}
      </h4>

      {/* 🛒 GRILLA RESPONSIVA DE PRODUCTOS */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {productosFiltrados.map((prod) => (
          <div className="col" key={prod.code}>
            <div className="card h-100 border-0 shadow-sm p-2 bg-white card-producto">
              {/* Contenedor estético de la imagen */}
              <div className="bg-light border rounded d-flex justify-content-center align-items-center text-muted" style={{ height: '180px', fontSize: '2rem' }}>
                🌾
              </div>
              
              <div className="card-body d-flex flex-column p-2">
                <span className="text-muted small text-uppercase font-monospace">{prod.category}</span>
                
                {/* Enlace dinámico directo al detalle */}
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
          No hay abarrotes disponibles para el filtro "{categoriaActiva}" en el LocalStorage.
        </div>
      )}
    </div>
  )
}

export default Productos