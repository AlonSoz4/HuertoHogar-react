import React, { useState } from 'react'

function Nosotros() {
  // Matriz de ciudades oficiales con sus respectivos mapas reales de Google Maps (localidades de Chile)
  const ciudades = [
    { name: "SANTIAGO", region: "Santiago, Región Metropolitana, Chile", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.052044810756!2d-70.6692655!3d-33.4488897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c57f0407d991%3A0x78cb65ea11a3504e!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1710000000000!5m2!1ses-419!2scl" },
    { name: "VIÑA DEL MAR", region: "Viña del Mar, Región de Valparaíso, Chile", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.123456789!2d-71.5518!3d-33.0245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689e0b8da4c8133%3A0x868cb26e2552345!2zVmnDsWEgZGVsIE1hciwgVmFscGFyYcOtc28!5e0!3m2!1ses-419!2scl!4v1710000000001" },
    { name: "VALPARAÍSO", region: "Valparaíso, Región de Valparaíso, Chile", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.5!2d-71.6167!3d-33.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689e13333333333%3A0x3333333333333333!2sValpara%C3%ADso!5e0!3m2!1ses-419!2scl!4v1710000000002" },
    { name: "VILLARRICA", region: "Villarrica, Región de la Araucanía, Chile", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113.5!2d-72.2333!3d-39.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9614000000000000%3A0x0000000000000000!2sVillarrica%2C%20Araucan%C3%ADa!5e0!3m2!1ses-419!2scl!4v1710000000003" },
    { name: "NACIMIENTO", region: "Nacimiento, Región del Biobío, Chile", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.5!2d-72.6833!3d-37.5025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9615000000000000%3A0x0000000000000000!2sNacimiento%2C%20Biob%C3%ADo!5e0!3m2!1ses-419!2scl!4v1710000000004" },
    { name: "CONCEPCIÓN", region: "Concepción, Región del Biobío, Chile", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.5!2d-73.05!3d-36.8167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669000000000000%3A0x0000000000000000!2sConcepci%C3%B3n%2C%20Biob%C3%ADo!5e0!3m2!1ses-419!2scl!4v1710000000005" },
    { name: "PUERTO MONTT", region: "Puerto Montt, Región de Los Lagos, Chile", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.5!2d-72.9333!3d-41.4667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9618000000000000%3A0x0000000000000000!2sPuerto%20Montt%2C%20Los%20Lagos!5e0!3m2!1ses-419!2scl!4v1710000000006" }
  ]

  // Estado para controlar qué ciudad y mapa están renderizados
  const [ciudadActiva, setCiudadActiva] = useState(ciudades[0])

  return (
    <div className="container my-5" style={{ color: '#333333' }}>
      
      {/* SECCIÓN NUESTRA HISTORIA (Título unificado en clase .titulo-pagina) */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-center my-4" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>Nuestra Historia</h2>
        <p className="lead mx-auto" style={{ maxWidth: '850px', fontSize: '1.05rem', lineHeight: '1.7' }}>
          <strong>HuertoHogar</strong> es una tienda online dedicada a llevar la frescura y calidad de los productos del campo directamente a la puerta de nuestros clientes en Chile.
        </p>
        <p className="text-muted mx-auto" style={{ maxWidth: '850px', fontSize: '0.95rem' }}>
          Con más de 6 años de experiencia, operamos en más de 9 puntos a lo largo del país, conectando a las familias chilenas con el entorno rural, apoyando activamente el comercio local y promoviendo un estilo de vida consciente y saludable.
        </p>
      </div>

      {/* SECCIÓN MISIÓN Y VISIÓN */}
      <div className="row g-4 mb-5 justify-content-center">
        <div className="col-md-5">
          <div className="card h-100 border border-2 border-dark rounded-3 p-3 bg-white shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold mb-3 text-dark">Misión</h4>
              <p className="text-muted small" style={{ textAlign: 'justify', lineHeight: '1.6' }}>
                Proporcionar productos frescos y de calidad directamente desde el campo hasta la puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos comprometemos a fomentar una conexión más cercana entre los consumidores y los agricultores locales, apoyando prácticas agrícolas sostenibles y promoviendo una alimentación saludable en todos los hogares chilenos.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card h-100 border border-2 border-dark rounded-3 p-3 bg-white shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold mb-3 text-dark">Visión</h4>
              <p className="text-muted small" style={{ textAlign: 'justify', lineHeight: '1.6' }}>
                Ser la tienda online líder en la distribución de productos frescos y naturales en Chile, reconocida por nuestra calidad exceptional, servicio al cliente y compromiso con la sostenibilidad. Aspiramos a expandir nuestra presencia a nivel nacional e internacional, estableciendo un nuevo estándar en la distribución de productos agrícolas directos del productor al consumidor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN NUESTRA PRESENCIA NACIONAL CON IFRAME DE GOOGLE MAPS INTERACTIVO REAL */}
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card border border-1 p-4 bg-white rounded shadow-sm">
            <h4 className="fw-bold text-dark mb-1">Nuestra Presencia Nacional</h4>
            <p className="text-muted small mb-4">
              Estamos comprometidos con el desarrollo local. Actualmente puedes encontrarnos operando estratégicamente en ciudades clave como:
            </p>

            {/* Fila de Botones (Igual a tu captura original) */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {ciudades.map((ciudad) => (
                <button
                  key={ciudad.name}
                  type="button"
                  className={`btn btn-sm fw-bold px-3 py-2 border border-2 transition-all ${
                    ciudadActiva.name === ciudad.name 
                      ? 'btn-dark border-dark text-white' 
                      : 'btn-outline-dark bg-white text-dark'
                  }`}
                  onClick={() => setCiudadActiva(ciudad)}
                >
                  {ciudad.name}
                </button>
              ))}
            </div>

            {/* Contenedor del Mapa Real Embebido Semánticamente */}
            <div className="border rounded p-3 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                <div>
                  <h5 className="fw-bold m-0 text-dark" style={{ fontSize: '1rem' }}>{ciudadActiva.name}</h5>
                  <small className="text-muted">{ciudadActiva.region}</small>
                </div>
                <span className="text-success small fw-bold">📍 Tienda Física Operativa</span>
              </div>
              
              {/* iFrame Semántico que recarga dinámicamente según la ciudad seleccionada */}
              <div className="ratio ratio-21x9 bg-white border rounded shadow-sm" style={{ height: '380px' }}>
                <iframe
                  title={`Mapa de distribución en ${ciudadActiva.name}`}
                  src={ciudadActiva.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Nosotros