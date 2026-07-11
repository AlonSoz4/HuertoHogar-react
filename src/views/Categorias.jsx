import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getProducts } from '../services/dataService'

function Categorias() {
  const location = useLocation()
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

  // 🌟 Las 4 categorías oficiales con sus imágenes de fondo reales
  const listaCategorias = [
    { 
      id: 'FRUTAS FRESCAS', 
      nombre: 'Frutas Frescas', 
      urlImg: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=150&h=150&q=80' 
    },
    { 
      id: 'VERDURAS ORGÁNICAS', 
      nombre: 'Verduras Orgánicas', 
      urlImg: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=150&h=150&q=80' 
    },
    { 
      id: 'PRODUCTOS ORGÁNICOS', 
      nombre: 'Productos Orgánicos', 
      urlImg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&h=150&q=80' 
    },
    { 
      id: 'PRODUCTOS LÁCTEOS', 
      nombre: 'Productos Lácteos', 
      urlImg: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=150&h=150&q=80' 
    }
  ]

  // 🌟 DICCIONARIO INTERACTIVO DE IMÁGENES Y ATRIBUTOS ALT (IMAGENPLACEHOLDER)
  const obtenerImagenYPlaceholder = (nombreProducto) => {
    const nombre = nombreProducto.toUpperCase().trim()

    const mapaImagenes = {
      'MANZANAS FUJI': {
        url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=400&h=300&q=80",
        alt: "Fotografía en primer plano de manzanas Fuji rojas y frescas con gotas de agua"
      },
      'NARANJAS VALENCIA': {
        url: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&h=300&q=80",
        alt: "Fotografía de naranjas Valencia maduras y brillantes amontonadas en una caja de madera"
      },
      'PLÁTANOS CAVENDISH': {
        url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&h=300&q=80",
        alt: "Fotografía de un racimo de plátanos Cavendish amarillos y orgánicos maduros"
      },
      'ZANAHORIAS ORGÁNICAS': {
        url: "https://images.unsplash.com/photo-1598170845058-32b996a69f76?auto=format&fit=crop&w=400&h=300&q=80",
        alt: "Fotografía de zanahorias orgánicas recién cosechadas con sus hojas verdes"
      },
      'ESPINACAS FRESCAS': {
        url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&h=300&q=80",
        alt: "Fotografía en primer plano de hojas de espinacas frescas, verdes y crujientes"
      },
      'PIMIENTOS TRICOLORES': {
        url: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400&h=300&q=80",
        alt: "Fotografía de pimientos tricolores frescos: uno rojo, uno amarillo y uno verde juntos"
      },
      'MIEL ORGÁNICA': {
        url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&h=300&q=80",
        alt: "Fotografía de un frasco de vidrio lleno de miel orgánica dorada al lado de un cucharón de madera"
      },
      'QUINUA ORGÁNICA': {
        url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&h=300&q=80",
        alt: "Fotografía de granos de quinua orgánica cruda servidos en un tazón rústico"
      },
      'LECHE ENTERA': {
        url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&h=300&q=80",
        alt: "Fotografía de una botella de vidrio transparente con leche entera fresca sobre un fondo claro"
      },
      'QUESO HUERTOHOGAR': {
        url: "https://images.unsplash.com/photo-1486297678162-ad2a14b34897?auto=format&fit=crop&w=400&h=300&q=80",
        alt: "Fotografía de un trozo grande de queso mantecoso artesanal cortado sobre una tabla"
      }
    }

    return mapaImagenes[nombre] || {
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=300&q=80",
      alt: `Fotografía descriptiva del producto ${nombreProducto}`
    }
  }

  // 🌟 CORRECCIÓN OPERACIONAL: Motor reactivo para añadir abbarotes a la bolsa en tiempo real
  const agregarAlCarro = (producto) => {
    const carroActual = JSON.parse(localStorage.getItem('huerto_cart')) || []
    const existe = carroActual.find(item => item.code === producto.code)

    if (existe) {
      // Validamos que no exceda las existencias físicas en bodega
      if (Number(existe.cantidad) < Number(producto.stock)) {
        existe.cantidad = (Number(existe.cantidad) || 0) + 1
      } else {
        alert(`Lo sentimos, no hay suficiente stock disponible de ${producto.name}.`)
        return
      }
    } else {
      const datosImg = obtenerImagenYPlaceholder(producto.name)
      carroActual.push({
        code: producto.code,
        name: producto.name,
        price: Number(producto.price) || 0,
        image: datosImg.url,
        category: producto.category,
        cantidad: 1,
        stockMax: Number(producto.stock) || 10
      })
    }

    // Persistimos los datos y notificamos globalmente para actualizar la burbuja flotante del menú
    localStorage.setItem('huerto_cart', JSON.stringify(carroActual))
    window.dispatchEvent(new Event('cart-update'))
    alert(`¡${producto.name} añadido al carrito con éxito!`)
  }

  // Filtrado en tiempo real comparando en mayúsculas para evitar errores de tipeo
  const productosFiltrados = productos.filter(
    p => p.category && p.category.toUpperCase().trim() === categoriaSeleccionada
  )

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      <h2 className="fw-bold text-center text-uppercase my-4" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
        Categorías
      </h2>

      {/* 📊 Bloques Superiores de Selección Responsiva */}
      <div className="row g-3 justify-content-center mb-5">
        {listaCategorias.map((cat) => (
          <div className="col-6 col-md-3" key={cat.id}>
            <div 
              className="card h-100 text-center p-2 border-0 shadow-sm overflow-hidden"
              style={{ 
                cursor: 'pointer', 
                outline: categoriaSeleccionada === cat.id ? '2px solid #2E8B57' : 'none',
                backgroundColor: '#FFFFFF',
                transition: 'all 0.2s ease-in-out'
              }}
              onClick={() => setCategoriaSeleccionada(cat.id)}
            >
              <div className="d-flex justify-content-center pt-2">
                <img 
                  src={cat.urlImg} 
                  alt={`Categoría ${cat.nombre}`} 
                  className="rounded-circle"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
              </div>
              <div className="card-body p-2">
                <h6 className="fw-bold text-dark small text-uppercase m-0" style={{ fontSize: '0.75rem' }}>{cat.nombre}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Título de la sección activa */}
      <h3 className="fw-bold mb-4 pb-2 border-bottom text-secondary text-uppercase" style={{ fontSize: '1.4rem' }}>
        {categoriaSeleccionada}
      </h3>

      {/* 🛒 Grilla de Productos con Fotos Reales */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {productosFiltrados.map((prod) => {
          const imgMeta = obtenerImagenYPlaceholder(prod.name)
          const stockFisico = Number(prod.stock) || 0

          return (
            <div className="col" key={prod.code}>
              <div className="card h-100 border-0 shadow-sm p-2 bg-white card-producto">
                
                {/* Contenedor de imagen real con alt descriptivo */}
                <div className="bg-light border rounded overflow-hidden" style={{ height: '180px' }}>
                  <img 
                    src={imgMeta.url} 
                    alt={imgMeta.alt} 
                    title={imgMeta.alt}
                    className="w-100 h-100 object-fit-cover"
                  />
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
                      <span className="text-muted small">Stock: {stockFisico}</span>
                    </div>
                    
                    {/* 🌟 CORRECCIÓN EN EL EVENTO: Llama a agregarAlCarro y se deshabilita si no hay existencias */}
                    <button 
                      className="btn btn-outline-success btn-sm w-100 fw-bold py-1" 
                      style={{ fontSize: '0.8rem' }}
                      onClick={() => agregarAlCarro(prod)}
                      disabled={stockFisico === 0}
                    >
                      {stockFisico === 0 ? 'SIN STOCK' : 'AÑADIR AL CARRO'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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