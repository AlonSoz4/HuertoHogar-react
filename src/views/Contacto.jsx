import React, { useState } from 'react'

function Contacto() {
  // Estados para capturar los campos del formulario de contacto
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [comentario, setComentario] = useState('')

  // Estados para almacenar los mensajes de error dinámicos
  const [errors, setErrors] = useState({ nombre: '', correo: '', comentario: '' })
  const [success, setSuccess] = useState('')

  // Función lógica de validación (Requerimiento JavaScript)
  const validarFormulario = () => {
    let unError = { nombre: '', correo: '', comentario: '' }
    let esValido = true

    // 1. Validación del Nombre (Requerido y Máx 100)
    if (!nombre.trim()) {
      unError.nombre = 'El nombre completo es requerido.'
      esValido = false
    } else if (nombre.trim().length > 100) {
      unError.nombre = 'El nombre no puede superar los 100 caracteres.'
      esValido = false
    }

    // 2. Validación del Correo (Requerido, Máx 100 y Dominios exactos)
    if (!correo.trim()) {
      unError.correo = 'El correo electrónico es requerido.'
      esValido = false
    } else if (correo.trim().length > 100) {
      unError.correo = 'El correo no puede superar los 100 caracteres.'
      esValido = false
    } else {
      // Expresión regular que aprueba estrictamente los tres dominios exigidos por el cliente
      const regexDominiosContacto = /^[a-zA-Z0-9._%+-]+@(inacap\.cl|profesor\.inacap\.cl|gmail\.com)$/i
      if (!regexDominiosContacto.test(correo.trim())) {
        unError.correo = 'Solo se permiten correos con @inacap.cl, @profesor.inacap.cl o @gmail.com.'
        esValido = false
      }
    }

    // 3. Validación del Comentario (Requerido y Máx 500)
    if (!comentario.trim()) {
      unError.comentario = 'El comentario o mensaje es requerido.'
      esValido = false
    } else if (comentario.trim().length > 500) {
      unError.comentario = 'El mensaje no puede superar los 500 caracteres.'
      esValido = false
    }

    setErrors(unError)
    return esValido
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess('')

    if (validarFormulario()) {
      // Si pasa las reglas de negocio, simulamos el envío interno con éxito
      setSuccess('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo a la brevedad.')
      
      // Limpiamos los campos del formulario
      setNombre('')
      setCorreo('')
      setComentario('')
      setErrors({ nombre: '', correo: '', comentario: '' })
    }
  }

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      
      {/* Encabezado con la paleta tipográfica corporativa (#8B4513) */}
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
          Contacto HuertoHogar
        </h2>
        <p className="text-muted small">Envíanos tus dudas o sugerencias de manera interna</p>
      </div>

      <div className="card shadow-sm border-0 p-4 bg-white">
        <h4 className="fw-bold text-center text-dark mb-4 border-bottom pb-2">FORMULARIO DE CONTACTO</h4>
        
        {/* Banner de Feedback Exitoso */}
        {success && (
          <div className="alert alert-success fw-bold small py-2 mb-3 shadow-sm">{success}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Campo Nombre Completo */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">NOMBRE COMPLETO*</label>
            <input 
              type="text" 
              className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Pedro Hacker"
            />
            {errors.nombre && <div className="invalid-feedback fw-bold">{errors.nombre}</div>}
          </div>

          {/* Campo Correo */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-dark">CORREO*</label>
            <input 
              type="email" 
              className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@inacapmail.cl"
            />
            {errors.correo && <div className="invalid-feedback fw-bold">{errors.correo}</div>}
          </div>

          {/* Campo Comentario / Contenido */}
          <div className="mb-4">
            <label className="form-label small fw-bold text-dark">CONTENIDO*</label>
            <textarea 
              className={`form-control ${errors.comentario ? 'is-invalid' : ''}`}
              rows="4"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
            <div className="d-flex justify-content-between align-items-center mt-1">
              {errors.comentario ? (
                <div className="text-danger small fw-bold" style={{ fontSize: '0.85rem' }}>{errors.comentario}</div>
              ) : (
                <span className="text-muted small">Máximo 500 caracteres.</span>
              )}
              <span className={`small fw-bold ${comentario.length > 500 ? 'text-danger' : 'text-muted'}`}>
                {comentario.length}/500
              </span>
            </div>
          </div>

          {/* Botón de Interacción Verde Esmeralda (#2E8B57) */}
          <button 
            className="btn btn-success w-100 fw-bold py-2 shadow-sm" 
            style={{ backgroundColor: '#2E8B57', border: 'none' }}
            type="submit"
          >
            ENVIAR MENSAJE
          </button>
        </form>
      </div>

    </div>
  )
}

export default Contacto