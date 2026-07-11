import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  // 🌟 ESTADO DE CONTROL PARA EL DESPLAZAMIENTO AUTOMÁTICO
  const [indiceActivo, setIndiceActivo] = useState(0)

  // Datos de los 3 lanzamientos solicitados (Queso, Melón, Ají)
  const lanzamientos = [
    {
      titulo: "Nuevos Lanzamientos: Quesos Mantecosos de Campo",
      descripcion: "Madurados artesanalmente y traídos directamente desde las mejores praderas del sur de Chile.",
      urlImagen: "https://images.unsplash.com/photo-1486297678162-ad2a14b34897?auto=format&fit=crop&w=1200&h=400&q=80"
    },
    {
      titulo: "Nuevos Lanzamientos: Melones Calameños Orgánicos",
      descripcion: "Dulces, jugosos y cosechados en su punto óptimo de maduración por productores de la zona central.",
      urlImagen: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1200&h=400&q=80"
    },
    {
      titulo: "Nuevos Lanzamientos: Ají Cacho de Cabra Fresco",
      descripcion: "Tradición y picor balanceado, ideales para aderezos, salsas y preparaciones típicas chilenas.",
      urlImagen: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=1200&h=400&q=80"
    }
  ]

  // 🌟 EFECTO SEGURO: Cambia el slide automáticamente cada 3 segundos sin depender de Bootstrap.js
  useEffect(() => {
    const temporizador = setInterval(() => {
      setIndiceActivo((prevIndice) => (prevIndice + 1) % lanzamientos.length)
    }, 3000)

    return () => clearInterval(temporizador) // Limpieza del hook
  }, [])

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* 1. Hero Banner Central (Figura 1) - DESPLAZAMIENTO REACTIVO SEGURO */}
      <div 
        className="p-5 mb-5 rounded-3 border text-center d-flex align-items-center justify-content-center shadow-sm"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url('${lanzamientos[indiceActivo].urlImagen}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px',
          transition: 'background-image 0.5s ease-in-out' // Suaviza la transición al desplazarse
        }}
      >
        <div className="container-fluid py-4">
          <h2 className="fs-3 fw-bold text-success">{lanzamientos[indiceActivo].titulo}</h2>
          <p className="col-md-8 mx-auto fs-5 text-muted mt-2 fw-medium">
            {lanzamientos[indiceActivo].descripcion}
          </p>
          
          {/* Indicadores inferiores (Tus tres badges originales) */}
          <div className="d-flex justify-content-center gap-2 mt-4">
            <span className={`badge rounded-pill px-2`} style={{ width: '30px', height: '8px', backgroundColor: indiceActivo === 0 ? '#198754' : '#6c757d' }}></span>
            <span className={`badge rounded-pill px-2`} style={{ width: '30px', height: '8px', backgroundColor: indiceActivo === 1 ? '#198754' : '#6c757d' }}></span>
            <span className={`badge rounded-pill px-2`} style={{ width: '30px', height: '8px', backgroundColor: indiceActivo === 2 ? '#198754' : '#6c757d' }}></span>
          </div>
        </div>
      </div>

      {/* 2. Sección de Categorías Destacadas (Figura 1) */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-center mb-4" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>Categorías</h2>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Tarjeta 1 - Frutas Frescas (URL Corregida de alta disponibilidad) */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100 border-0">
            <div className="card-body bg-light p-0 border rounded d-flex flex-column overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=400&h=200&q=80" 
                alt="Frutas Frescas" 
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="p-4">
                <h5 className="fw-bold text-dark mb-3">Frutas Frescas</h5>
                <Link to="/categorias" state={{ catSeleccionada: 'FRUTAS FRESCAS' }} className="btn btn-outline-success btn-sm px-4 fw-bold">Ver Catálogo</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 - Verduras Orgánicas */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100 border-0">
            <div className="card-body bg-light p-0 border rounded d-flex flex-column overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400&h=200&q=80" 
                alt="Verduras Orgánicas" 
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="p-4">
                <h5 className="fw-bold text-dark mb-3">Verduras Orgánicas</h5>
                <Link to="/categorias" state={{ catSeleccionada: 'VERDURAS ORGÁNICAS' }} className="btn btn-outline-success btn-sm px-4 fw-bold">Ver Catálogo</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 3 - Productos Orgánicos */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100 border-0">
            <div className="card-body bg-light p-0 border rounded d-flex flex-column overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=200&q=80" 
                alt="Productos Orgánicos" 
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="p-4">
                <h5 className="fw-bold text-dark mb-3">Productos Orgánicos</h5>
                <Link to="/categorias" state={{ catSeleccionada: 'PRODUCTOS ORGÁNICOS' }} className="btn btn-outline-success btn-sm px-4 fw-bold">Ver Catálogo</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta 4 - Lácteos */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm h-100 border-0">
            <div className="card-body bg-light p-0 border rounded d-flex flex-column overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&h=200&q=80" 
                alt="Lácteos" 
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="p-4">
                <h5 className="fw-bold text-dark mb-3">Lácteos</h5>
                <Link to="/categorias" state={{ catSeleccionada: 'PRODUCTOS LÁCTEOS' }} className="btn btn-outline-success btn-sm px-4 fw-bold">Ver Catálogo</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home