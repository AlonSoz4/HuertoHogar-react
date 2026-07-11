import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/dataService'

function RegistroUsuario() {
  const navigate = useNavigate()

  // 1. DATA DE REGIONES Y COMUNAS EXIGIDAS EN LA PAUTA (Figura 4)
  const regionesData = {
    "Región Metropolitana de Santiago": ["Cerrillos", "El Bosque", "Santiago Centro", "Providencia"],
    "Región de la Araucanía": ["Villarrica", "Temuco", "Lonquimay"],
    "Región de Ñuble": ["Chillán", "San Carlos", "Coihueco"],
    "Región del Maule": ["Linares", "Longaví", "Talca"],
    "Región del Biobío": ["Concepción", "Nacimiento", "Los Ángeles"],
    "Región de Valparaíso": ["Viña del Mar", "Valparaíso", "Quilpué"]
  }

  // 2. ESTADOS REACTIVOS DEL FORMULARIO (Campos controlados)
  const [run, setRun] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [regionSeleccionada, setRegionSeleccionada] = useState('')
  const [comunasDisponibles, setComunasDisponibles] = useState([])
  const [comunaSeleccionada, setComunaSeleccionada] = useState('')
  const [direccion, setDireccion] = useState('')

  // Estados para capturar errores de validación y éxito
  const [errors, setErrors] = useState({})
  const [successMsg, setSuccessMsg] = useState('')

  // 3. EFECTO: Cambiar las comunas automáticamente al cambiar la región (Requerimiento)
  useEffect(() => {
    if (regionSeleccionada) {
      setComunasDisponibles(regionesData[regionSeleccionada] || [])
      setComunaSeleccionada('') // Reseteamos la comuna elegida
    } else {
      setComunasDisponibles([])
      setComunaSeleccionada('')
    }
  }, [regionSeleccionada])

  // 4. FUNCIÓN LÓGICA DE VALIDACIÓN DE NEGOCIO (JavaScript)
  const validarFormulario = () => {
    let localErrors = {}
    let esValido = true

    // Validación RUN: Sin puntos ni guion, entre 7 y 9 caracteres (Ej: 19011022K)
    const runLimpio = run.trim().toUpperCase()
    const regexRun = /^[0-9]{7,8}[0-9K]$/
    if (!runLimpio) {
      localErrors.run = 'El RUN es requerido.'
      esValido = false
    } else if (runLimpio.length < 7 || runLimpio.length > 9) {
      localErrors.run = 'El RUN debe tener entre 7 y 9 caracteres.'
      esValido = false
    } else if (!regexRun.test(runLimpio)) {
      localErrors.run = 'Formato inválido. Ingrese sin puntos, sin guion y con dígito verificador (Ej: 19011022K).'
      esValido = false
    }

    // Validación Nombre: Requerido, Máx 50 caracteres
    if (!nombre.trim()) {
      localErrors.name = 'El nombre es requerido.'
      esValido = false
    } else if (nombre.trim().length > 50) {
      localErrors.name = 'El nombre no puede superar los 50 caracteres.'
      esValido = false
    }

    // Validación Apellidos: Requerido, Máx 100 caracteres
    if (!apellidos.trim()) {
      localErrors.lastname = 'Los apellidos son requeridos.'
      esValido = false
    } else if (apellidos.trim().length > 100) {
      localErrors.lastname = 'Los apellidos no pueden superar los 100 caracteres.'
      esValido = false
    }

    // Validación Correo: Requerido, Máx 100, dominios permitidos
    const correoLimpio = correo.trim().toLowerCase()
    if (!correoLimpio) {
      localErrors.email = 'El correo es requerido.'
      esValido = false
    } else if (correoLimpio.length > 100) {
      localErrors.email = 'El correo no puede superar los 100 caracteres.'
      esValido = false
    } else {
      const regexDominios = /^[a-zA-Z0-9._%+-]+@(inacap\.cl|profesor\.inacap\.cl)$/i
      if (!regexDominios.test(correoLimpio)) {
        localErrors.email = 'Solo se permiten dominios @inacap.cl o @profesor.inacap.cl'
        esValido = false
      }
    }

    // Validación Contraseña: Requerida, entre 4 y 10 caracteres
    if (!password) {
      localErrors.password = 'La contraseña es requerida.'
      esValido = false
    } else if (password.length < 4 || password.length > 10) {
      localErrors.password = 'La contraseña debe tener entre 4 y 10 caracteres.'
      esValido = false
    }

    // Validación Región y Comuna
    if (!regionSeleccionada) {
      localErrors.region = 'Debe seleccionar una región.'
      esValido = false
    }
    if (!comunaSeleccionada) {
      localErrors.comuna = 'Debe seleccionar una comuna.'
      esValido = false
    }

    // Validación Dirección: Requerido, Máx 300 caracteres
    if (!direccion.trim()) {
      localErrors.direccion = 'La dirección de entrega es requerida.'
      esValido = false
    } else if (direccion.trim().length > 300) {
      localErrors.direccion = 'La dirección no puede superar los 300 caracteres.'
      esValido = false
    }

    setErrors(localErrors)
    return esValido
  }

  // 5. MANEJADOR DEL SUBMIT RESPONSIVO
  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccessMsg('')

    if (validarFormulario()) {
      // Estructuramos el objeto del nuevo usuario (Rol por defecto: client)
      const nuevoUsuario = {
        run: run.trim().toUpperCase(),
        name: nombre.trim(),
        lastname: apellidos.trim(),
        email: correo.trim().toLowerCase(),
        password: password,
        region: regionSeleccionada,
        comuna: comunaSeleccionada,
        direccion: direccion.trim(),
        role: 'client'
      }

      // Consumimos el servicio de nuestra base de datos simulada en JavaScript
      const resultado = registerUser(nuevoUsuario)

      if (resultado.success) {
        // 🌟 PIEZA REACTIVA 1: Persistimos el cliente en el almacenamiento local para el Dashboard
        const usuariosExistentes = JSON.parse(localStorage.getItem('huerto_usuarios_db')) || []
        
        // Evitamos empujar duplicados por RUN en el LocalStorage
        if (!usuariosExistentes.some(usr => usr.run === nuevoUsuario.run)) {
          usuariosExistentes.push({
            run: nuevoUsuario.run,
            nombre: `${nuevoUsuario.name} ${nuevoUsuario.lastname}`,
            correo: nuevoUsuario.email,
            comuna: nuevoUsuario.comuna
          })
          localStorage.setItem('huerto_usuarios_db', JSON.stringify(usuariosExistentes))
        }

        setSuccessMsg(resultado.message)
        // Limpiamos los campos
        setRun(''); setNombre(''); setApellidos(''); setCorreo(''); setPassword('')
        setRegionSeleccionada(''); setComunaSeleccionada(''); setDireccion('')
        setErrors({})
        
        // Redirección automática al Login tras 2 segundos de éxito visual
        setTimeout(() => navigate('/login'), 2500)
      } else {
        setErrors({ global: resultado.message })
      }
    }
  }

  return (
    <div className="container my-5" style={{ maxWidth: '650px', fontFamily: 'Montserrat, sans-serif' }}>
      <div className="card shadow-sm border-0 p-4 bg-white">
        <h3 className="fw-bold text-center mb-2" style={{ color: '#8B4513', fontFamily: 'Playfair Display, serif' }}>
          Registro de Usuario
        </h3>
        <p className="text-muted small text-center mb-4">Crea tu cuenta en HuertoHogar para comprar productos frescos</p>

        {successMsg && <div className="alert alert-success fw-bold small py-2">{successMsg}</div>}
        {errors.global && <div className="alert alert-danger fw-bold small py-2">{errors.global}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            {/* Campo RUN */}
            <div className="col-md-6">
              <label className="form-label small fw-bold">RUN (SIN PUNTOS NI GUION)*</label>
              <input type="text" className={`form-control ${errors.run ? 'is-invalid' : ''}`} value={run} onChange={(e) => setRun(e.target.value)} placeholder="Ej: 19011022K" />
              {errors.run && <div className="invalid-feedback fw-bold">{errors.run}</div>}
            </div>

            {/* Campo Contraseña */}
            <div className="col-md-6">
              <label className="form-label small fw-bold">CONTRASEÑA (4-10 CARACTERES)*</label>
              <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              {errors.password && <div className="invalid-feedback fw-bold">{errors.password}</div>}
            </div>

            {/* Campo Nombre */}
            <div className="col-md-6">
              <label className="form-label small fw-bold">NOMBRE COMPLETO*</label>
              <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Alonso" />
              {errors.name && <div className="invalid-feedback fw-bold">{errors.name}</div>}
            </div>

            {/* Campo Apellidos */}
            <div className="col-md-6">
              <label className="form-label small fw-bold">APELLIDOS*</label>
              <input type="text" className={`form-control ${errors.lastname ? 'is-invalid' : ''}`} value={apellidos} onChange={(e) => setApellidos(e.target.value)} placeholder="Ej: Pérez Pérez" />
              {errors.lastname && <div className="invalid-feedback fw-bold">{errors.lastname}</div>}
            </div>

            {/* Campo Correo */}
            <div className="col-12">
              <label className="form-label small fw-bold">CORREO ELECTRÓNICO*</label>
              <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="alonso@inacapmail.cl" />
              {errors.email && <div className="invalid-feedback fw-bold">{errors.email}</div>}
            </div>

            {/* Selector Región Dinámica */}
            <div className="col-md-6">
              <label className="form-label small fw-bold">SELECCIONE LA REGIÓN*</label>
              <select className={`form-select ${errors.region ? 'is-invalid' : ''}`} value={regionSeleccionada} onChange={(e) => setRegionSeleccionada(e.target.value)}>
                <option value="">-- Seleccione la región --</option>
                {Object.keys(regionesData).map(reg => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
              {errors.region && <div className="invalid-feedback fw-bold">{errors.region}</div>}
            </div>

            {/* Selector Comuna Dinámica */}
            <div className="col-md-6">
              <label className="form-label small fw-bold">SELECCIONE LA COMUNA*</label>
              <select className={`form-select ${errors.comuna ? 'is-invalid' : ''}`} value={comunaSeleccionada} onChange={(e) => setComunaSeleccionada(e.target.value)} disabled={!regionSeleccionada}>
                <option value="">-- Seleccione la comuna --</option>
                {comunasDisponibles.map(com => (
                  <option key={com} value={com}>{com}</option>
                ))}
              </select>
              {errors.comuna && <div className="invalid-feedback fw-bold">{errors.comuna}</div>}
            </div>

            {/* Campo Dirección */}
            <div className="col-12">
              <label className="form-label small fw-bold">DIRECCIÓN DE DESPACHO*</label>
              <input type="text" className={`form-control ${errors.direccion ? 'is-invalid' : ''}`} value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, número, departamento o bloque residencial" />
              {errors.direccion && <div className="invalid-feedback fw-bold">{errors.direccion}</div>}
            </div>
          </div>

          <button className="btn btn-success w-100 fw-bold py-2 shadow-sm mt-4" style={{ backgroundColor: '#2E8B57', border: 'none' }} type="submit">
            REGISTRAR CUENTA
          </button>

          <div className="text-center small mt-3">
            <span className="text-muted">¿Ya posees una cuenta activa? </span>
            <Link to="/login" className="text-success fw-bold text-decoration-none">Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistroUsuario