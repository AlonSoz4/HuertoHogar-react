import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function NuevoUsuario() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comuna, setComuna] = useState('Santiago')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('client')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !password) {
      alert('Rellena todos los campos obligatorios.')
      return
    }

    const usuariosDB = JSON.parse(localStorage.getItem("huerto_users")) || []
    const correoExiste = usuariosDB.some(u => u.email.toLowerCase().trim() === email.toLowerCase().trim())

    if (correoExiste) {
      alert('Este correo electrónico ya está registrado en el sistema.')
      return
    }

    const nuevoUsuario = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      comuna: comuna,
      password: password,
      role: role
    }

    usuariosDB.push(nuevoUsuario)
    localStorage.setItem("huerto_users", JSON.stringify(usuariosDB))
    alert('Usuario guardado exitosamente.')
    navigate('/admin/usuarios')
  }

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif', maxWidth: '550px' }}>
      <div className="card border-0 shadow-sm p-4 bg-white">
        <h2 className="fw-bold text-center mb-4" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
          👤 Crear Perfil de Usuario
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">NOMBRE COMPLETO</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">CORREO ELECTRÓNICO</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">COMUNA DE SANTIAGO</label>
            <input type="text" className="form-control" value={comuna} onChange={(e) => setComuna(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary">CONTRASEÑA</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
            <button type="submit" className="btn btn-dark fw-bold w-50 py-2">Crear Cuenta</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NuevoUsuario