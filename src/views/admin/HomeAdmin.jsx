import React from 'react'
import { Link } from 'react-router-dom'

function HomeAdmin() {
  // 📊 Datos simulados para robustecer el Dashboard estadístico del Administrador
  const estadisticasMes = {
    totalVentas: 345600,
    ordenesCompletadas: 54,
    nuevosUsuarios: 12
  }

  const productosMasVendidos = [
    { nombre: "Manzanas Fuji", porcentaje: 85, color: "bg-success" },
    { nombre: "Queso HuertoHogar", porcentaje: 70, color: "bg-warning" },
    { nombre: "Leche Entera", porcentaje: 55, color: "bg-info" },
    { nombre: "Zanahorias Orgánicas", porcentaje: 40, color: "bg-danger" }
  ]

  const ultimosUsuarios = [
    { run: "19.876.543-2", nombre: "Carlos Mendoza", correo: "c.mendoza@inacapmail.cl", comuna: "La Florida" },
    { run: "20.123.456-K", nombre: "Valentina Jara", correo: "v.jara@gmail.com", comuna: "Providencia" },
    { run: "18.654.321-7", nombre: "Andrés Silva", correo: "a.silva@outlook.cl", comuna: "Maipú" }
  ]

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Encabezado Principal del Panel */}
      <div className="bg-dark text-white p-5 rounded shadow-sm mb-5 text-center text-md-start">
        <h1 className="fw-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          ⚙️ Panel de Control Administrativo
        </h1>
        <p className="lead text-white-50 m-0">
          Bienvenido al sistema de gestión interna de <strong>HuertoHogar</strong>. Desde aquí puedes monitorear estadísticas, controlar el inventario y los usuarios.
        </p>
      </div>

      {/* 📊 SECCIÓN 1: TARJETAS DE INDICADORES CLAVE (KPIs) */}
      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white border-start border-success border-4">
            <div className="text-muted small fw-bold text-uppercase">Ventas del Mes</div>
            <div className="fs-3 fw-bold text-success">${estadisticasMes.totalVentas.toLocaleString('es-CL')}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white border-start border-primary border-4">
            <div className="text-muted small fw-bold text-uppercase">Órdenes Procesadas</div>
            <div className="fs-3 fw-bold text-primary">{estadisticasMes.ordenesCompletadas} pedidos</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white border-start border-info border-4">
            <div className="text-muted small fw-bold text-uppercase">Nuevos Clientes</div>
            <div className="fs-3 fw-bold text-info">+{estadisticasMes.nuevosUsuarios} este mes</div>
          </div>
        </div>
      </div>

      {/* 📊 SECCIÓN 2: RENDIMIENTO DE INVENTARIO Y ÚLTIMOS REGISTROS */}
      <div className="row g-4 mb-5">
        {/* Productos más vendidos */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 bg-white h-100">
            <h5 className="fw-bold mb-3 text-dark" style={{ fontFamily: 'Playfair Display, serif' }}>⚡ Productos Más Demandados</h5>
            <p className="text-muted small">Tendencia de salida basada en la simulación de compras.</p>
            <div className="d-flex flex-column gap-3 mt-2">
              {productosMasVendidos.map((prod, idx) => (
                <div key={idx}>
                  <div className="d-flex justify-content-between small fw-semibold mb-1">
                    <span>{prod.nombre}</span>
                    <span>{prod.porcentaje}%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className={`progress-bar ${prod.color}`} role="progressbar" style={{ width: `${prod.porcentaje}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Últimos usuarios incorporados */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 bg-white h-100">
            <h5 className="fw-bold mb-3 text-dark" style={{ fontFamily: 'Playfair Display, serif' }}>📋 Últimos Clientes Registrados</h5>
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
                  {ultimosUsuarios.map((usr) => (
                    <tr key={usr.run}>
                      <td className="fw-semibold">{usr.nombre}</td>
                      <td className="text-muted">{usr.correo}</td>
                      <td>{usr.comuna}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Título de los Módulos Operacionales */}
      <h4 className="fw-bold mb-4 text-secondary text-uppercase" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
        Accesos Directos de Gestión
      </h4>

      {/* Grilla de Módulos de Gestión */}
      <div className="row g-4 justify-content-center">
        {/* Card 1: Mantenedor de Productos */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 bg-white text-center card-admin">
            <div className="fs-1 mb-2">📦</div>
            <h4 className="fw-bold text-dark mb-3">Gestión de Productos</h4>
            <p className="text-muted small mb-4">
              Controla el stock disponible, añade nuevos productos al catálogo, edita precios, categorías o elimina ítems que ya no estén en distribución.
            </p>
            <Link to="/admin/productos" className="btn btn-success fw-bold mt-auto w-100 py-2 shadow-sm" style={{ backgroundColor: '#2E8B57', border: 'none' }}>
              Gestionar Inventario
            </Link>
          </div>
        </div>

        {/* Card 2: Mantenedor de Usuarios */}
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm p-4 bg-white text-center card-admin">
            <div className="fs-1 mb-2">👥</div>
            <h4 className="fw-bold text-dark mb-3">Administración de Usuarios</h4>
            <p className="text-muted small mb-4">
              Visualiza el listado completo de clientes registrados, edita sus datos de despacho, gestiona perfiles o cambia privilegios de acceso al sistema.
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