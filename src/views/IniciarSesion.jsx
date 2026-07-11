import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function IniciarSesion() {
  const navigate = useNavigate()

  // Estados locales para los campos del formulario
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Estados locales para almacenar y pintar los errores de validación en tiempo real
  const [errors, setErrors] = useState({ email: '', password: '', global: '' })

  // Función de validación de negocio con JavaScript
  const validarFormulario = () => {
    let unError = { email: '', password: '', global: '' }
    let esValido = true

    // 1. Validaciones del Correo (Máx 100 caracteres y dominios específicos)
    const correoLimpio = email.trim()
    if (!correoLimpio) {
      unError.email = 'El correo electrónico es requerido.'
      esValido = false
    } else if (correoLimpio.length > 100) {
      unError.email = 'El correo no puede superar los 100 caracteres.'
      esValido = false
    } else {
      // Expresión regular para validar de forma exacta los tres dominios permitidos por la pauta
      const regexDominios = /^[a-zA-Z0-9._%+-]+@(inacap\.cl|inacapmail\.cl)$/i
      if (!regexDominios.test(correoLimpio)) {
        unError.email = 'Solo se permiten correos con @inacap.cl o @inacapmail.cl'
        esValido = false
      }
    }

    // 2. Validaciones de la Contraseña (Requerida, entre 4 y 10 caracteres)
    if (!password) {
      unError.password = 'La contraseña es requerida.'
      esValido = false
    } else if (password.length < 4 || password.length > 10) {
      unError.password = 'La contraseña debe tener entre 4 y 10 caracteres.'
      esValido = false
    }

    setErrors(unError)
    return esValido
  }

  // Manejador del envío del formulario (Submit)
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validarFormulario()) {
      // Recuperamos el arreglo de usuarios simulados del LocalStorage
      const usuariosDB = JSON.parse(localStorage.getItem('huerto_users')) || [
        { email: 'alonso@inacap.cl', password: '1234', name: 'Alonso Admin', role: 'admin' }
      ]

      // Buscamos si coinciden las credenciales
      const usuarioEncontrado = usuariosDB.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      )

      if (usuarioEncontrado) {
        // Guardamos la sesión activa en el navegador
        localStorage.setItem('huerto_user', JSON.stringify({
          name: usuarioEncontrado.name,
          role: usuarioEncontrado.role
        }))

        // Redirección inteligente basada en el rol asociado al sistema
        if (usuarioEncontrado.role === 'admin') {
          navigate('/admin') // Va al Panel de Gestión
        } else {
          navigate('/') // Va a la Tienda Pública
        }
      } else {
        setErrors(prev => ({ ...prev, global: 'Credenciales inválidas. Intenta nuevamente.' }))
      }
    }
  }

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center flex-column">
      
      {/* Contenedor de la marca e imagen (Mockup Figura 5) */}
      <div className="text-center mb-4">
        <div className="p-3 bg-white rounded shadow-sm border border-success d-inline-block mb-2" style={{ width: '100px', height: '100px' }}>
          <span className="fs-1">🌱</span>
        </div>
        <h2 className="fw-bold" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>HuertoHogar</h2>
        <p className="text-muted small">Del Campo al Hogar</p>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="card shadow-sm border-0 p-4 w-100" style={{ maxWidth: '450px', backgroundColor: '#FFFFFF' }}>
        <h4 className="fw-bold text-center text-dark mb-4 border-bottom pb-2">Inicio de Sesión</h4>
        
        {errors.global && (
          <div className="alert alert-danger small fw-bold py-2">{errors.global}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Campo Correo */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">CORREO</label>
            <input 
              type="email" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@inacap.cl"
            />
            {errors.email && (
              <div className="invalid-feedback fw-bold">{errors.email}</div>
            )}
          </div>

          {/* Campo Contraseña */}
          <div className="mb-4">
            <label className="form-label small fw-bold text-dark">CONTRASEÑA</label>
            <input 
              type="password" 
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {errors.password && (
              <div className="invalid-feedback fw-bold">{errors.password}</div>
            )}
          </div>

          {/* Botón de Envío */}
          <button className="btn btn-success w-100 fw-bold py-2 shadow-sm mb-3" style={{ backgroundColor: '#2E8B57' }} type="submit">
            Iniciar sesión
          </button>

          <div className="text-center small mt-2">
            <span className="text-muted">¿No tienes una cuenta? </span>
            <Link to="/registro" className="text-success fw-bold text-decoration-none">Regístrate aquí</Link>
          </div>
        </form>
      </div>

    </div>
  )
}

export default IniciarSesion