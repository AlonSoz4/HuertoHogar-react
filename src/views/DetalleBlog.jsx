import React from 'react'
import { useParams, Link } from 'react-router-dom'

function DetalleBlog() {
  const { id } = useParams()

  // Base de datos simulada con información real y completa para la pauta
  const blogsDB = {
    "1": {
      title: "Cómo mantener tu huerto orgánico en departamentos",
      date: "10 de Julio, 2026",
      author: "Equipo HuertoHogar",
      image: "🏢🌿",
      content: "Tener un espacio reducido no es una excusa para no cultivar tus propios alimentos. En este artículo te enseñamos cómo aprovechar la luz de tus ventanas, el riego adecuado para macetas pequeñas y cuáles son las mejores hortalizas (como tomates cherry y albahaca) para comenzar tu aventura verde en plena ciudad de Santiago.",
      extraContent: "Para asegurar el éxito de tu huerto urbano, la clave principal es la exposición solar. La gran mayoría de las hortalizas requieren un mínimo de 5 a 6 horas de luz directa al día, por lo que los balcones con orientación norte o poniente son ideales en el hemisferio sur. En cuanto al sustrato, se recomienda evitar la tierra de hojas común de jardín —ya que suele compactarse en maceteros— y optar por una mezcla aireada de fibra de coco, perlita y humus de lombriz. Este ecosistema en miniatura retendrá la humedad necesaria sin ahogar las raíces, previniendo la aparición de hongos y garantizando un crecimiento fuerte y libre de químicos en pleno departamento."
    },
    "2": {
      title: "Los increíbles beneficios de consumir lácteos de campo",
      date: "05 de Julio, 2026",
      author: "Nutrición Consciente",
      image: "🥛🐄",
      content: "Los productos lácteos artesanales y de libre pastoreo conservan propiedades nutricionales únicas. Al no pasar por procesos industriales severos, mantienen un equilibrio perfecto de vitaminas D y A, calcio de alta biodisponibilidad y grasas saludables que benefician tu microbiota. Conoce por qué preferir productores locales.",
      extraContent: "El valor diferenciador de los lácteos de campo radica directamente en la alimentación de los animales. Las vacas que pastorean libremente en las praderas del sur de Chile producen leche con una concentración marcadamente superior de Ácido Linoleico Conjugado (CLA) y ácidos grasos Omega-3 en comparación con la ganadería intensiva de corral. Asimismo, al tratarse de un modelo de distribución directa y de baja escala a través de HuertoHogar, se fomenta una economía justa que apoya directamente a las familias agricultoras de nuestras regiones, disminuyendo la cadena de intermediarios y asegurando que el producto llegue fresco, con su sabor auténtico y manteniendo intactas sus enzimas naturales esenciales."
    }
  }

  const articulo = blogsDB[id]

  if (!articulo) {
    return (
      <div className="container my-5 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <div className="alert alert-warning border-0 shadow-sm">El artículo de prensa solicitado no existe en nuestros registros.</div>
        <Link to="/blogs" className="btn btn-success fw-bold">Volver a Blogs</Link>
      </div>
    )
  }

  return (
    <div className="container my-5" style={{ fontFamily: 'Montserrat, sans-serif', maxWidth: '800px' }}>
      
      {/* Miga de pan / Breadcrumb estético */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/blogs" className="text-success text-decoration-none">Blogs</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Artículo</li>
        </ol>
      </nav>

      {/* Encabezado del Artículo */}
      <div className="text-center my-4">
        <div className="display-1">{articulo.image}</div>
        <h1 className="fw-bold mt-3" style={{ fontFamily: 'Playfair Display, serif', color: '#8B4513' }}>
          {articulo.title}
        </h1>
        <p className="text-muted small">
          Por <strong>{articulo.author}</strong> | Publicado el {articulo.date}
        </p>
      </div>

      {/* Cuerpo del Mensaje */}
      <div className="bg-white p-4 p-md-5 rounded shadow-sm border mb-4 shadow-sm">
        <p className="lead fw-semibold mb-4" style={{ lineHeight: '1.8', color: '#2b2b2b', textAlign: 'justify' }}>
          {articulo.content}
        </p>
        <p style={{ lineHeight: '1.8', color: '#444444', textAlign: 'justify' }}>
          {articulo.extraContent}
        </p>
      </div>

      {/* Botón de Retorno */}
      <div className="text-center mt-4">
        <Link to="/blogs" className="btn btn-outline-secondary fw-bold px-4 py-2">
          ← Volver a todos los artículos
        </Link>
      </div>

    </div>
  )
}

export default DetalleBlog