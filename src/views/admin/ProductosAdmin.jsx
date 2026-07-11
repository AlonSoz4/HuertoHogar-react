import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../services/dataService'

function ProductosAdmin() {
  const [productos, setProductos] = useState([])

  // Cargar el inventario al montar la vista
  useEffect(() => {
    const productosDB = getProducts() || []
    setProductos(productosDB)
  }, [])

  // 🗑️ Función para eliminar un producto del LocalStorage
  const handleEliminar = (code) => {
    const confirmar = window.confirm(`¿Estás seguro de que deseas eliminar el producto con código: ${code}?`)
    
    if (confirmar) {
      const productosActuales = getProducts() || []
      // Filtramos para sacar el producto que queremos borrar
      const productosFiltrados = productosActuales.filter(p => p.code !== code)
      
      // Guardamos la nueva lista limpia en el LocalStorage
      localStorage.setItem("huerto_products", JSON.stringify(productosFiltrados))
      
      // Actualizamos el estado para que desaparezca de la pantalla al tiro
      setProductos(productosFiltrados)
      alert('Producto eliminado con éxito.')
    }
  }

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Cabecera con botón para añadir */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
        <h2 className="fw-bold m-0" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
          Mantenedor de Productos
        </h2>
        <Link to="/admin/productos/nuevo" className="btn btn-success fw-bold px-4 py-2 shadow-sm">
          ➕ Agregar Nuevo Producto
        </Link>
      </div>

      {/* Tabla Responsiva de Inventario */}
      <div className="card border-0 shadow-sm bg-white">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle m-0">
              <thead className="table-dark">
                <tr>
                  <th className="ps-3">Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th className="text-center pe-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.code}>
                    <td className="fw-bold text-secondary ps-3">{prod.code}</td>
                    <td>{prod.name}</td>
                    <td>
                      <span className="badge bg-light text-dark border text-uppercase font-monospace">
                        {prod.category}
                      </span>
                    </td>
                    <td className="fw-bold text-success">
                      ${prod.price ? prod.price.toLocaleString('es-CL') : '0'}
                    </td>
                    <td>
                      <span className={`fw-bold ${prod.stock <= 5 ? 'text-danger' : 'text-dark'}`}>
                        {prod.stock} {prod.stock <= 5 && '⚠️'}
                      </span>
                    </td>
                    <td className="text-center pe-3">
                      <div className="d-flex justify-content-center gap-2">
                        {/* Botón de Editar: viaja mandando el código por la URL */}
                        <Link to={`/admin/productos/editar/${prod.code}`} className="btn btn-sm btn-outline-primary fw-bold">
                          ✏️ Editar
                        </Link>
                        {/* Botón de Eliminar */}
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-danger fw-bold"
                          onClick={() => handleEliminar(prod.code)}
                        >
                          🗑️ Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {productos.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      No hay productos registrados en el inventario de la tienda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enlace para volver atrás */}
      <div className="mt-4">
        <Link to="/admin" className="text-decoration-none text-muted fw-bold">
          ← Volver al Panel de Control
        </Link>
      </div>

    </div>
  )
}

export default ProductosAdmin