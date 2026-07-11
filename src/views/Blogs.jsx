import React from 'react'
import { Link } from 'react-router-dom'

function Blogs() {
  // 🌟 CORRECCIÓN: Ajustamos las IDs a "1" y "2" para que calcen con DetalleBlog.jsx
  const articulosBlog = [
    {
      id: "1",
      titulo: "CASO CURIOSO #1",
      subtitulo: "Cómo mantener tu huerto orgánico en departamentos",
      descripcionCorta: "Tener un espacio reducido no es una excusa para no cultivar tus propios alimentos. Descubre cómo aprovechar la luz de tus ventanas, el riego adecuado para macetas pequeñas y cuáles son las mejores hortalizas.",
      imagenPlaceholder: "1200 x 400",
      emoji: "🏢"
    },
    {
      id: "2",
      titulo: "CASO CURIOSO #2",
      subtitulo: "Los increíbles beneficios de consumir lácteos de campo",
      descripcionCorta: "Los productos lácteos artesanales y de libre pastoreo conservan propiedades nutricionales únicas. Conoce cómo el modelo de distribución directa de HuertoHogar ayuda a mitigar el impacto ambiental en Chile.",
      imagenPlaceholder: "1200 x 400",
      emoji: "🥛"
    }
  ]

  return (
    <div className="container my-5" style={{ color: '#333333', fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Encabezado Principal del Blog */}
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
                  
                  {/* 🌟 CORRECCIÓN: Botón transformado en un Link dinámico real de React Router */}
                  <Link 
                    to={`/blogs/${articulo.id}`} 
                    className="btn btn-outline-dark btn-sm fw-bold px-4 text-uppercase text-decoration-none"
                  >
                    Ver Caso
                  </Link>
                </div>

                {/* Contenedor Métrico de la Imagen (Lado Derecho) */}
                <div className="col-md-5 order-1 order-md-2">
                  <div className="bg-white border rounded d-flex justify-content-center align-items-center text-muted fw-bold shadow-sm" style={{ height: '220px' }}>
                    <div className="text-center">
                      <span className="display-4 d-block mb-1">{articulo.emoji}</span>
                      <span className="small text-muted font-monospace d-block mt-2">{articulo.imagenPlaceholder}</span>
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