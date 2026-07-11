import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function HomeAdmin() {
  const [ventasTotales, setVentasTotales] = useState(0)
  const [cantidadOrdenes, setCantidadOrdenes] = useState(0)
  const [listaUsuarios, setListaUsuarios] = useState([])
  const [productosTop, setProductosTop] = useState([])

  useEffect(() => {
    // 1. Extraemos los usuarios reales registrados en LocalStorage
    const usuariosDB = JSON.parse(localStorage.getItem('huerto_usuarios_db')) || []
    setListaUsuarios(usuariosDB.reverse().slice(0, 4)) // Mostramos los últimos 4 registrados

    // 2. Extraemos el histórico de ventas reales
    const ventasDB = JSON.parse(localStorage.getItem('huerto_ventas_db')) || []
    setCantidadOrdenes(ventasDB.length)

    // Calculamos la suma total recaudada de forma dinámica
    const sumaCaja = ventasDB.reduce((acc, venta) => acc + (Number(venta.total) || 0), 0)
    setVentasTotales(sumaCaja)

    // 3. Mapeo Dinámico de Productos más vendidos
    const conteoProductos = {}
    ventasDB.forEach(venta => {
      if (venta.items) {
        venta.items.forEach(item => {
          conteoProductos[item.name] = (conteoProductos[item.name] || 0) + item.cantidad
          })
      }
    })

    // Transformamos el objeto a un arreglo ordenado de mayor a menor demanda
    const listaOrdenada = Object.keys(conteoProductos).map(nombre => ({
      nombre,
      unidades: conteoProductos[nombre]
    })).sort((a, b) => b.unidades - a.unidades)

    // Calculamos porcentajes relativos basados en el ítem más vendido para las barras
    const maxUnidades = listaOrdenada[0]?.unidades || 1
    const colores = ["bg-success", "bg-warning", "bg-info", "bg-danger"]
    
    const top4Format = listaOrdenada.slice(0, 4).map((p, index) => ({
      nombre: p.nombre,
      porcentaje: Math.round((p.unidades / maxUnidades) * 100),
      color: colores[index] || "bg-secondary"
    }))

    setProductosTop(top4Format)
  }, [])

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Encabezado Principal del Panel */}
      <div className="bg-dark text-white p-5 rounded shadow-sm mb-5 text-center text-md-start">
        <h1 className="fw-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          ⚙️ Panel de Control Administrativo
        </h1>
        <p className="lead text-white-50 m-0">
          Panel de control reactivo en **Tiempo Real** de <strong>HuertoHogar</strong>. Monitoreo automatizado de caja, órdenes y usuarios.
        </p>
      </div>

      {/* 📊 TARJETAS DE INDICADORES CLAVE (KPIs BIEN CALCULADOS) */}
      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white border-start border-success border-4">
            <div className="text-muted small fw-bold text-uppercase">Caja Real Recaudada</div>
            <div className="fs-3 fw-bold text-success">${ventasTotales.toLocaleString('es-CL')}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white border-start border-primary border-4">
            <div className="text-muted small fw-bold text-uppercase">Órdenes Pagadas</div>
            <div className="fs-3 fw-bold text-primary">{cantidadOrdenes} transacciones</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white border-start border-info border-4">
            <div className="text-muted small fw-bold text-uppercase">Clientes Registrados</div>
            <div className="fs-3 fw-bold text-info">{JSON.parse(localStorage.getItem('huerto_usuarios_db'))?.length || 0} usuarios</div>
          </div>
        </div>
      </div>

      {/* 📊 GRÁFICOS Y TABLAS REACTIVAS */}
      <div className="row g-4 mb-5">
        {/* Productos más vendidos */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 bg-white h-100">
            <h5 className="fw-bold mb-3 text-dark" style={{ fontFamily: 'Playfair Display, serif' }}>⚡ Demanda Real de Abarrotes</h5>
            <p className="text-muted small">Porcentaje de salida calculado automáticamente a partir de compras aprobadas.</p>
            <div className="d-flex flex-column gap-3 mt-2">
              {productosTop.length > 0 ? (
                productosTop.map((prod, idx) => (
                  <div key={idx}>
                    <div className="d-flex justify-content-between small fw-semibold mb-1">
                      <span>{prod.nombre}</span>
                      <span>{prod.porcentaje}%</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div className={`progress-bar ${prod.color}`} role="progressbar" style={{ width: `${prod.porcentaje}%` }}></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted small">No hay datos de ventas registrados todavía.</div>
              )}
            </div>
          </div>
        </div>

        {/* Últimos usuarios incorporados */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 bg-white h-100">
            <h5 className="fw-bold mb-3 text-dark" style={{ fontFamily: 'Playfair Display, serif' }}>📋 Últimos Clientes Incorporados</h5>
            <div className="table-responsive">
              <table className="table table-sm table-hover align-middle m-0 small">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Comuna</th>
                  </tr>
                </thead>
                <tbody>
                  {listaUsuarios.length > 0 ? (
                    listaUsuarios.map((usr, index) => (
                      <tr key={usr.run || index}>
                        <td className="fw-semibold">{usr.nombre}</td>
                        <td className="text-muted">{usr.correo}</td>
                        <td><span className="badge bg-light text-dark">{usr.comuna}</span></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">No hay nuevos clientes registrados en el LocalStorage.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Módulos Operacionales */}
      <h4 className="fw-bold mb-4 text-secondary text-uppercase" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
        Accesos Directos de Gestión
      </h4>

      <div className="row g-4 justify-content-center">
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 bg-white text-center">
            <div className="fs-1 mb-2">📦</div>
            <h4 className="fw-bold text-dark mb-3">Gestión de Productos</h4>
            <p className="text-muted small mb-4">
              Controla el stock disponible, añade nuevos productos al catálogo, edita precios o categorías de distribución.
            </p>
            <Link to="/admin/productos" className="btn btn-success fw-bold mt-auto w-100 py-2 shadow-sm" style={{ backgroundColor: '#2E8B57', border: 'none' }}>
              Gestionar Inventario
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 bg-white text-center">
            <div className="fs-1 mb-2">👥</div>
            <h4 className="fw-bold text-dark mb-3">Administración de Usuarios</h4>
            <p className="text-muted small mb-4">
              Visualiza el listado completo de clientes registrados, edita sus datos de despacho o gestiona perfiles de acceso.
            </p>
            <Link to="/admin/usuarios" className="btn btn-outline-dark fw-bold mt-auto w-100 py-2">
              Control de Clientes
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomeAdmin