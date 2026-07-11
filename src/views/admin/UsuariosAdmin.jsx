import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const usuariosDB = JSON.parse(localStorage.getItem("huerto_users")) || []
    setUsuarios(usuariosDB)
  }, [])

  const handleEliminar = (email) => {
    const sessionActiva = JSON.parse(localStorage.getItem('huerto_session'))
    if (sessionActiva && sessionActiva.email === email) {
      alert('No puedes eliminar tu propia cuenta de administrador mientras estás en sesión.')
      return
    }

    const confirmar = window.confirm(`¿Seguro que deseas eliminar al usuario con correo: ${email}?`)
    if (confirmar) {
      const usuariosDB = JSON.parse(localStorage.getItem("huerto_users")) || []
      const filtrados = usuariosDB.filter(u => u.email !== email)
      localStorage.setItem("huerto_users", JSON.stringify(filtrados))
      setUsuarios(filtrados)
      alert('Usuario removido del sistema.')
    }
  }

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4 gap-3">
        <h2 className="fw-bold m-0" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
          Control de Clientes y Roles
        </h2>
        <Link to="/admin/usuarios/nuevo" className="btn btn-dark fw-bold px-4 py-2 shadow-sm">
          👤 Registrar Nuevo Usuario
        </Link>
      </div>

      <div className="card border-0 shadow-sm bg-white">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle m-0">
              <thead className="table-dark">
                <tr>
                  <th className="ps-3">Nombre Completo</th>
                  <th>Correo Electrónico</th>
                  <th>Comuna</th>
                  <th>Rol</th>
                  <th className="text-center pe-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.email}>
                    <td className="fw-bold text-dark ps-3">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.comuna || 'Santiago Centro'}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-info text-dark'} text-uppercase`}>
                        {user.role || 'client'}
                      </span>
                    </td>
                    <td className="text-center pe-3">
                      <div className="d-flex justify-content-center gap-2">
                        <Link to={`/admin/usuarios/editar/${user.email}`} className="btn btn-sm btn-outline-primary fw-bold">
                          ✏️ Editar
                        </Link>
                        <button type="button" className="btn btn-sm btn-outline-danger fw-bold" onClick={() => handleEliminar(user.email)}>
                          🗑️ Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Link to="/admin" className="text-decoration-none text-muted fw-bold">← Volver al Panel de Control</Link>
      </div>
    </div>
  )
}

export default UsuariosAdmin