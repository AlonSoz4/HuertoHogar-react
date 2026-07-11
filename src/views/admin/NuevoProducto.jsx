import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getProducts } from '../../services/dataService'

function NuevoProducto() {
  const navigate = useNavigate()

  // Estados locales para capturar los campos del formulario
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('FRUTAS FRESCAS') // Por defecto la primera oficial
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  // Las 4 categorías oficiales exactas de tu pauta
  const categoriasDisponibles = ['FRUTAS FRESCAS', 'VERDURAS ORGÁNICAS', 'PRODUCTOS ORGÁNICOS', 'PRODUCTOS LÁCTEOS']

  const handleSubmit = (e) => {
    e.preventDefault()

    // 1. Validaciones básicas de campos vacíos
    if (!code.trim() || !name.trim() || !price || !stock) {
      alert('Por favor, rellena todos los campos obligatorios.')
      return
    }

    const listaProductos = getProducts() || []

    // 2. Control de duplicados: Verificar si el código ya existe en la DB simulada
    const codigoExiste = listaProductos.some(p => p.code.toUpperCase().trim() === code.toUpperCase().trim())
    if (codigoExiste) {
      alert(`Error: Ya existe un producto registrado con el código "${code}". Ingrese uno diferente.`)
      return
    }

    // 3. Construir el nuevo objeto formateado correctamente
    const nuevoProducto = {
      code: code.trim().toUpperCase(),
      name: name.trim(),
      category: category,
      price: parseInt(price, 10),
      stock: parseInt(stock, 10)
    }

    // 4. Guardar en el LocalStorage
    listaProductos.push(nuevoProducto)
    localStorage.setItem("huerto_products", JSON.stringify(listaProductos))

    alert('¡Producto agregado con éxito al inventario!')
    
    // Volvemos automáticamente a la tabla del mantenedor
    navigate('/admin/productos')
  }

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif', maxWidth: '600px' }}>
      
      <div className="card border-0 shadow-sm p-4 bg-white">
        <h2 className="fw-bold text-center mb-4" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
          ✨ Nuevo Producto
        </h2>

        <form onSubmit={handleSubmit}>
          
          {/* Código del Producto */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">CÓDIGO ÚNICO</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ej: FRUT-01, LACT-05" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">NOMBRE DEL PRODUCTO</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Ej: Manzanas Rojas Orgánicas" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Categoría Selector */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">CATEGORÍA OFICIAL</label>
            <select 
              className="form-select text-uppercase"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoriasDisponibles.map(cat => (
                <option key={cat} value={cat}>{cat.toLowerCase()}</option>
              ))}
            </select>
          </div>

          {/* Fila de Precio y Stock */}
          <div className="row g-3 mb-4">
            <div className="col-6">
              <label className="form-label fw-bold small text-secondary">PRECIO ($ CL)</label>
              <input 
                type="number" 
                className="form-control" 
                min="1" 
                placeholder="Ej: 2500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <label className="form-label fw-bold small text-secondary">STOCK INICIAL</label>
              <input 
                type="number" 
                className="form-control" 
                min="0" 
                placeholder="Ej: 50"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Botonera del Formulario */}
          <div className="d-flex gap-2">
            <Link to="/admin/productos" className="btn btn-light border fw-bold w-50 py-2">
              Cancelar
            </Link>
            <button type="submit" className="btn btn-success fw-bold w-50 py-2" style={{ backgroundColor: '#2E8B57', border: 'none' }}>
              Guardar Producto
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default NuevoProducto