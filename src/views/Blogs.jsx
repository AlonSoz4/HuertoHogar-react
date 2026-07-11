import React from 'react'
import { Link } from 'react-router-dom'

function Blogs() {
  // Estructura de datos exacta para los dos casos curiosos exigidos por la pauta (Figura 2)
  const articulosBlog = [
    {
      id: "caso-1",
      titulo: "CASO CURIOSO #1",
      subtitulo: "Alimentación Saludable y el Impacto de los Abarrotes Orgánicos",
      descripcionCorta: "Descubre cómo los cultivos libres de pesticidas en los valles de la Región de O'Higgins y Maule conservan hasta un 40% más de antioxidantes esenciales para tu bienestar diario.",
      imagenPlaceholder: "1200 x 400"
    },
    {
      id: "caso-2",
      titulo: "CASO CURIOSO #2",
      subtitulo: "Sostenibilidad y Apoyo a los Pequeños Agricultores Locales",
      descripcionCorta: "Comprar local reduce drásticamente la huella de carbono del transporte. Conoce cómo el modelo de distribución directa de HuertoHogar ayuda a mitigar el impacto ambiental en Chile.",
      imagenPlaceholder: "1200 x 400"
    }
  ]

  return (
    <div className="container my-5" style={{ color: '#333333' }}>
      
      {/* Encabezado Principal del Blog (Fiel a tus mockups) */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-uppercase tracking-wide text-center mb-2" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
          Noticias Importantes
        </h2>
        <p className="text-muted small">Aprende sobre alimentación consciente, sostenibilidad y secretos del campo chileno</p>
      </div>

      {/* Listado de Casos (Estructura de Bloques Horizontales de la Figura 6) */}
      <div className="row justify-content-center g-4">
        {articulosBlog.map((articulo) => (
          <div className="col-lg-10" key={articulo.id}>
            <div className="card border-0 bg-light rounded-3 p-4 shadow-sm border">
              <div className="row align-items-center">
                
                {/* Textos Informativos (Lado Izquierdo) */}
                <div className="col-md-7 order-2 order-md-1 mt-3 mt-md-0">
                  <h4 className="fw-bold text-dark mb-1">{articulo.titulo}</h4>
                  <h5 className="fw-semibold text-success mb-3" style={{ fontSize: '1.1rem' }}>{articulo.subtitulo}</h5>
                  <p className="text-muted small mb-4" style={{ lineHeight: '1.6', textAlign: 'justify' }}>
                    {articulo.descripcionCorta}
                  </p>
                  
                  {/* Botón de navegación hacia el Detalle del Blog (Figura 1) */}
                  <div className="dropdown">
                    <button className="btn btn-outline-dark btn-sm fw-bold px-4 text-uppercase dropdown-toggle" type="button">
                      Ver Caso
                    </button>
                  </div>
                </div>

                {/* Contenedor Métrico de la Imagen (Lado Derecho) */}
                <div className="col-md-5 order-1 order-md-2">
                  <div className="bg-white border rounded d-flex justify-content-center align-items-center text-muted fw-bold shadow-sm" style={{ height: '220px' }}>
                    <div className="text-center">
                      <span className="fs-2 d-block mb-1">📰</span>
                      <span className="small">{articulo.imagenPlaceholder}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Blogs