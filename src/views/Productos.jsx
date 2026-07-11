import React, { useState, useEffect } from 'react'
import { getProducts } from '../services/dataService'
import ProductCard from '../components/ProductCard'

function Productos() {
  // Inicializamos el estado reactivo del catálogo en memoria RAM
  const [listaProductos, setListaProductos] = useState([])

  // Ciclo de vida: Carga los datos simulados en tiempo real apenas aparece la vista
  useEffect(() => {
    const datosCatálogo = getProducts()
    setListaProductos(datosCatálogo)
  }, []) // Los corchetes vacíos aseguran que se ejecute una sola vez al montar

  return (
    <div className="container my-5">
      <div className="border-bottom pb-3 mb-4">
        <h1 className="fw-bold text-dark">Catálogo General</h1>
        <p className="text-muted mb-0">Revisa la disponibilidad de nuestros abarrotes y productos orgánicos frescos.</p>
      </div>

      {/* Grilla responsiva que itera de forma dinámica */}
      <div className="row">
        {listaProductos.length > 0 ? (
          listaProductos.map((producto) => (
            <ProductCard key={producto.code} producto={producto} />
          ))
        ) : (
          <div className="col-100 text-center py-5">
            <p className="text-muted fs-5">No hay productos disponibles en este momento.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Productos