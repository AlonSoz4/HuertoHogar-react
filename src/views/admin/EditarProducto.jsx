import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProducts } from '../../services/dataService'

function EditarProducto() {
  const { code } = useParams() // Captura el código de la URL
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('FRUTAS FRESCAS')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [existe, setExiste] = useState(true)

  const categoriasDisponibles = ['FRUTAS FRESCAS', 'VERDURAS ORGÁNICAS', 'PRODUCTOS ORGÁNICOS', 'PRODUCTOS LÁCTEOS']

  useEffect(() => {
    const listaProductos = getProducts() || []
    const productoAEditar = listaProductos.find(p => p.code.toUpperCase().trim() === code.toUpperCase().trim())

    if (productoAEditar) {
      setName(productoAEditar.name)
      setCategory(productoAEditar.category)
      setPrice(productoAEditar.price)
      setStock(productoAEditar.stock)
    } else {
      setExiste(false)
    }
  }, [code])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !price || !stock) {
      alert('Por favor, rellena todos los campos.')
      return
    }

    const listaProductos = getProducts() || []
    // Mapeamos el arreglo actualizando únicamente el producto coincidente
    const productosActualizados = listaProductos.map(p => {
      if (p.code.toUpperCase().trim() === code.toUpperCase().trim()) {
        return {
          ...p,
          name: name.trim(),
          category: category,
          price: parseInt(price, 10),
          stock: parseInt(stock, 10)
        }
      }
      return p
    })

    localStorage.setItem("huerto_products", JSON.stringify(productosActualizados))
    alert('¡Producto actualizado con éxito!')
    navigate('/admin/productos')
  }

  if (!existe) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger">El producto con el código {code} no existe en la base de datos.</div>
        <Link to="/admin/productos" className="btn btn-dark">Volver al Inventario</Link>
      </div>
    )
  }

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif', maxWidth: '600px' }}>
      <div className="card border-0 shadow-sm p-4 bg-white">
        <h2 className="fw-bold text-center mb-2" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
          ✏️ Editar Producto
        </h2>
        <p className="text-center text-muted small mb-4">Modificando el registro del código: <strong className="text-dark">{code}</strong></p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">NOMBRE DEL PRODUCTO</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">CATEGORÍA OFICIAL</label>
            <select className="form-select text-uppercase" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categoriasDisponibles.map(cat => (
                <option key={cat} value={cat}>{cat.toLowerCase()}</option>
              ))}
            </select>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="form-label fw-bold small text-secondary">PRECIO ($ CL)</label>
              <input type="number" className="form-control" min="1" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="col-6">
              <label className="form-label fw-bold small text-secondary">STOCK</label>
              <input type="number" className="form-control" min="0" value={stock} onChange={(e) => setStock(e.target.value)} required />
            </div>
          </div>

          <div className="d-flex gap-2">
            <Link to="/admin/productos" className="btn btn-light border fw-bold w-50 py-2">Cancelar</Link>
            <button type="submit" className="btn btn-primary fw-bold w-50 py-2">Actualizar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditarProducto