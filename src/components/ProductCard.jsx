import React from 'react'

function ProductCard({ producto }) {
  // Verificamos si el producto viene sin stock para deshabilitar controles
  const sinStock = producto.stock === 0;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm border-0 position-relative">
        
        {/* Badge flotante de Categoría */}
        <span className="position-absolute top-0 start-0 m-2 badge bg-success bg-opacity-75">
          {producto.category}
        </span>

        {/* Caja gris que emula el contenedor del wireframe de las fotos */}
        <div className="bg-light text-center py-5 border-bottom rounded-top text-muted">
          <span className="display-6 fw-bold">400 x 300</span>
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-dark mb-1">{producto.name}</h5>
          <p className="card-text text-muted small flex-grow-1 mb-3">{producto.description}</p>
          
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <div>
              <span className="text-muted small d-block">Precio</span>
              <span className="fs-5 fw-bold text-success">${producto.price.toLocaleString('es-CL')}</span>
            </div>
            <div className="text-end">
              <span className="text-muted small d-block">Stock disp.</span>
              <span className={`fw-bold ${sinStock ? 'text-danger' : 'text-dark'}`}>
                {sinStock ? 'Agotado' : producto.stock}
              </span>
            </div>
          </div>
        </div>

        <div className="card-footer bg-white border-0 p-3 pt-0">
          {/* Botón dinámico controlado por el estado del stock original de Alonso */}
          <button 
            className={`btn w-100 fw-bold ${sinStock ? 'btn-secondary disabled' : 'btn-dark'}`}
            type="button"
          >
            {sinStock ? 'Sin Stock Disponible' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard