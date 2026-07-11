import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function EditarUsuario() {
  const { email } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [comuna, setComuna] = useState('')
  const [role, setRole] = useState('client')
  const [password, setPassword] = useState('')
  const [existe, setExiste] = useState(true)

  useEffect(() => {
    const usuariosDB = JSON.parse(localStorage.getItem("huerto_users")) || []
    const usuario = usuariosDB.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim())

    if (usuario) {
      setName(usuario.name)
      setComuna(usuario.comuna || '')
      setRole(usuario.role || 'client')
      setPassword(usuario.password || '')
    } else {
      setExiste(false)
    }
  }, [email])

  const handleSubmit = (e) => {
    e.preventDefault()

    const usuariosDB = JSON.parse(localStorage.getItem("huerto_users")) || []
    const actualizados = usuariosDB.map(u => {
      if (u.email.toLowerCase().trim() === email.toLowerCase().trim()) {
        return {
          ...u,
          name: name.trim(),
          comuna: comuna.trim(),
          role: role,
          password: password
        }
      }
      return u
    })

    localStorage.setItem("huerto_users", JSON.stringify(actualizados))
    alert('Usuario actualizado con éxito.')
    navigate('/admin/usuarios')
  }

  if (!existe) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger">El usuario con el email {email} no existe.</div>
        <Link to="/admin/usuarios" className="btn btn-dark">Volver</Link>
      </div>
    )
  }

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif', maxWidth: '550px' }}>
      <div className="card border-0 shadow-sm p-4 bg-white">
        <h2 className="fw-bold text-center mb-2" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
          ✏️ Modificar Usuario
        </h2>
        <p className="text-center text-muted small mb-4">Editando a: <strong className="text-dark">{email}</strong></p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">NOMBRE COMPLETO</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">COMUNA</label>
            <input type="text" className="form-control" value={comuna} onChange={(e) => setComuna(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">CONTRASEÑA</label>
            <input type="text" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold small text-secondary">ROL DEL SISTEMA</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="client">Cliente Común</option>
              <option value="admin">Administrador General ⚙️</option>
            </select>
          </div>

          <div className="d-flex gap-2">
            <Link to="/admin/usuarios" className="btn btn-light border fw-bold w-50 py-2">Cancelar</Link>
            <button type="submit" className="btn btn-primary fw-bold w-50 py-2">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditarUsuario