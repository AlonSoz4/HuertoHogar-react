# 🛒 HuertoHogar - E-Commerce de Abarrotes Orgánicos

HuertoHogar es una aplicación web interactiva desarrollada con **React** y **Vite**, diseñada para la gestión y compra de productos agrícolas frescos y de origen orgánico. Este proyecto corresponde a la **Entrega 2**, enfocada en la creación de flujos interactivos, manejo avanzado del estado de la aplicación, persistencia de datos local y el desarrollo de un módulo administrativo (Dashboard).

---

## 🚀 Requerimientos Técnicos Implementados

### 📦 1. Módulo de Tienda Pública
*   **Página de Inicio (Home):** Banner de bienvenida estético y navegación responsiva hacia el catálogo general.
*   **Página de Categorías:** Bloques superiores interactivos que filtran en tiempo real abarrotes por su clasificación exacta (*Frutas Frescas, Verduras Orgánicas, Productos Orgánicos y Productos Lácteos*). Incluye imágenes de alta fidelidad optimizadas.
*   **Catálogo de Productos:** Despliegue en grilla responsiva utilizando tarjetas de Bootstrap con soporte de imágenes y accesibilidad mediante atributos alternativos descriptivos (`alt` / imagenplaceholder).
*   **Detalle de Productos:** Vista individualizada para consultar descripciones, precios y stock físico remanente en bodega.

### 🛒 2. Carrito de Compras y Checkout
*   **Gestión Dinámica de la Bolsa:** Funciones declarativas para añadir productos, eliminar ítems y modificar cantidades en tiempo real mediante botones (`+` / `-`).
*   **Validación de Stock Físico:** El sistema impide añadir o incrementar abarrotes si se excede el límite de stock disponible en la base de datos simulada.
*   **Sistema de Cupones:** Motor matemático de descuentos que valida el código oficial (`INACAP20`) para aplicar un beneficio inmediato del 20% sobre el subtotal de la compra, controlando errores de cálculo (`$NaN`).
*   **Formulario de Despacho (Checkout):** Campos controlados reactivamente que capturan datos del cliente y su dirección de envío con selectores geográficos obligatorios.

### 💳 3. Simulación de Pasarela Bancaria
*   **Sincronización de Rutas:** Enrutamiento nativo con React Router para procesar las llamadas de éxito y rechazo bancario de forma exacta.
*   **`/pago-correcto`:** Renderiza el comprobante final de compra recuperando la orden con sus totales, datos de despacho y lista de productos comprados. Además, descuenta de forma matemática y selectiva solo las unidades adquiridas del inventario y vacía el carro del cliente de manera automática.
*   **`/pago-error`:** Pantalla de contingencia que informa los motivos del rechazo, manteniendo el carro de compras intacto para permitir el reintento de pago.

### ⚙️ 4. Panel de Control Administrativo (Dashboard)
*   **Métricas en Tiempo Real:** Tarjetas de indicadores clave (KPI) que calculan dinámicamente el dinero total recaudado en caja, la cantidad de órdenes pagadas y el número de clientes registrados.
*   **Rendimiento de Inventario:** Gráfico de barras de progreso estéticas de Bootstrap que miden de forma reactiva la demanda de los abarrotes más vendidos del huerto.
*   **Últimos Registros:** Tabla dinámica que lista a los clientes recién incorporados a través del formulario de registro seguro.
*   **Mantenedores Operacionales:** Accesos directos a los flujos CRUD internos de productos y usuarios del sistema.

---

## 💾 Persistencia de Datos y Arquitectura

Para cumplir con el requerimiento de simulación de base de datos sin un backend activo, la aplicación utiliza una arquitectura basada en **persistencia en LocalStorage**:
*   `huerto_cart`: Almacena de forma temporal la bolsa de compras del cliente.
*   `huerto_products_db` / `huerto_products`: Mantiene el inventario maestro de abarrotes y actualiza el stock físico de forma selectiva tras cada pago exitoso.
*   `huerto_usuarios_db`: Acumula el registro de nuevos usuarios generados en el formulario bajo validaciones estrictas de RUN y dominios institucionales (`@inacap.cl`).
*   `huerto_ventas_db`: Almacena el historial contable de transacciones aprobadas para la alimentación del Dashboard administrativo.

## 📁 Estructura del Proyecto

A continuación se detalla la organización de los módulos, componentes y vistas del software implementados en el espacio de trabajo:

```text
huertohogar-react/
├── src/
│   ├── services/
│   │   └── dataService.js          # Base de datos simulada y servicios de persistencia
│   ├── views/
│   │   ├── admin/                  # ⚙️ Módulo Administrativo (Mantenedores privados)
│   │   │   ├── EditarProducto.jsx
│   │   │   ├── EditarUsuario.jsx
│   │   │   ├── HomeAdmin.jsx       # Dashboard interactivo con KPIs en tiempo real
│   │   │   ├── NuevoProducto.jsx
│   │   │   ├── NuevoUsuario.jsx
│   │   │   ├── ProductosAdmin.jsx
│   │   │   └── UsuariosAdmin.jsx
│   │   ├── Blogs.jsx               # 🛒 Módulo Público de la Tienda
│   │   ├── Carrito.jsx             # Bolsa de compras y lógica de cupones
│   │   ├── Categorias.jsx          # Bloques de categorías con filtros reactivos
│   │   ├── Checkout.jsx            # Formulario de despacho y pasarela bancaria
│   │   ├── Contacto.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DetalleBlog.jsx
│   │   ├── DetalleProductos.jsx    # Vista individual detallada por producto
│   │   ├── Home.jsx
│   │   ├── IniciarSesion.jsx
│   │   ├── Nosotros.jsx
│   │   ├── PagoExitoso.jsx         # /pago-correcto (Comprobante y descuento de stock)
│   │   ├── PagoFallido.jsx         # /pago-error (Contingencia ante rechazo)
│   │   ├── Productos.jsx           # Catálogo general de abarrotes
│   │   └── RegistroUsuario.jsx     # Formulario con validaciones y selectores geográficos
│   ├── App.css                     # Estilos globales complementarios
│   ├── App.jsx                     # Enrutador principal de la aplicación (React Router)
│   ├── index.css
│   └── main.jsx                    # Punto de entrada del árbol de React
├── .gitignore
├── eslint.config.js
├── index.html                      # Estructura base del DOM
├── package-lock.json
├── package.json                    # Dependencias y scripts del proyecto (Bootstrap, React Router)
├── README.md                       # Documentación técnica de la entrega
└── vite.config.js                  # Configuración del empaquetador Vite