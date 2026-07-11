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

  // 🌟 DICCIONARIO CON LAS IMÁGENES EXACTAS Y SUS DESCRIPCIONES (IMAGENPLACEHOLDER)
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

    // Retorna la imagen del producto o una por defecto si el administrador crea uno nuevo con otro nombre
    return mapaImagenes[nombre] || {
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=300&q=80",
      alt: `Fotografía del producto ${nombreProducto} en el catálogo general`
    }
  }

  // 🌟 FUNCIÓN ENLAZADA: Añade los abarrotes controlando stock y reactividad del Navbar
  const agregarAlCarro = (producto) => {
    const carroActual = JSON.parse(localStorage.getItem('huerto_cart')) || []
    const existe = carroActual.find(item => item.code === producto.code)

    if (existe) {
      if (existe.cantidad < producto.stock) {
        existe.cantidad += 1
      } else {
        alert(`Lo sentimos, no hay suficiente stock disponible de ${producto.name}.`)
        return
      }
    } else {
      const datosImg = obtenerImagenYPlaceholder(producto.name)
      carroActual.push({
        code: producto.code,
        name: producto.name,
        price: producto.price,
        image: datosImg.url,
        category: producto.category,
        cantidad: 1,
        stockMax: producto.stock
      })
    }

    localStorage.setItem('huerto_cart', JSON.stringify(carroActual))
    window.dispatchEvent(new Event('cart-update'))
    alert(`¡${producto.name} añadido al carrito con éxito!`)
  }

  // 🌟 FILTRADO INTELIGENTE: Busca coincidencias parciales y limpia tildes/espacios
  const productosFiltrados = categoriaActiva === 'TODOS'
    ? listaProductos
    : listaProductos.filter(p => {
        if (!p.category) return false

        const catProducto = p.category.toUpperCase().trim()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")

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

      {/* 🛒 GRILLA RESPONSIVA DE PRODUCTOS CORREGIDA */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {productosFiltrados.map((prod) => {
          const imgMeta = obtenerImagenYPlaceholder(prod.name)

          return (
            <div className="col" key={prod.code}>
              <div className="card h-100 border-0 shadow-sm p-2 bg-white card-producto">
                
                {/* Contenedor corregido: Muestra la imagen real completa */}
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
                    
                    <button 
                      className="btn btn-outline-success btn-sm w-100 fw-bold py-1" 
                      style={{ fontSize: '0.8rem' }}
                      onClick={() => agregarAlCarro(prod)}
                      disabled={prod.stock === 0}
                    >
                      {prod.stock === 0 ? 'SIN STOCK' : 'AÑADIR AL CARRO'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mensaje de contingencia si no coinciden criterios */}
      {productosFiltrados.length === 0 && (
        <div className="text-center py-5 text-muted">
          No hay abarrotes disponibles para el filtro "{categoriaActiva}" en el LocalStorage.
        </div>
      )}
    </div>
  )
}

export default Productos