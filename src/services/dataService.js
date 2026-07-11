const initialProducts = [
    { code: "FR001", category: "Frutas Frescas", name: "Manzanas Fuji", price: 1200, stock: 150, criticalStock: 10, description: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables." },
    { code: "FR002", category: "Frutas Frescas", name: "Naranjas Valencia", price: 1000, stock: 200, criticalStock: 10, description: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes." },
    { code: "FR003", category: "Frutas Frescas", name: "Plátanos Cavendish", price: 800, stock: 250, criticalStock: 10, description: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Ricos en potasio." },
    { code: "VR001", category: "Verduras Orgánicas", name: "Zanahorias Orgánicas", price: 900, stock: 100, criticalStock: 10, description: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A." },
    { code: "VR002", category: "Verduras Orgánicas", name: "Espinacas Frescas", price: 700, stock: 80, criticalStock: 10, description: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas." },
    { code: "VR003", category: "Verduras Orgánicas", name: "Pimientos Tricolores", price: 1500, stock: 120, criticalStock: 10, description: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes." },
    { code: "PO001", category: "Productos Orgánicos", name: "Miel Orgánica", price: 5000, stock: 50, criticalStock: 10, description: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable." },
    { code: "PO003", category: "Productos Orgánicos", name: "Quinua Orgánica", price: 2400, stock: 0, criticalStock: 10, description: "Quinua orgánica de alta calidad, ideal para acompañamientos saludables y ensaladas ricas en proteínas." },
    { code: "PL001", category: "Productos Lácteos", name: "Leche Entera", price: 1100, stock: 0, criticalStock: 10, description: "Leche entera fresca proveniente de granjas locales dedicadas a la producción responsable." }
];

const initializeDB = () => {
    if (!localStorage.getItem("huerto_products")) {
        localStorage.setItem("huerto_products", JSON.stringify(initialProducts));
    }
};

// READ: Obtener catálogo completo
export const getProducts = () => {
    initializeDB();
    return JSON.parse(localStorage.getItem("huerto_products"));
};

// READ SINGLE: Obtener un solo producto por su código para la vista de detalle
export const getProductByCode = (code) => {
    const todosLosProductos = getProducts() || [];
    return todosLosProductos.find(p => p.code === code) || null;
};

// CREATE: Agregar nuevo producto (Admin)
export const createProduct = (newProduct) => {
    const products = getProducts();
    if (products.some(p => p.code === newProduct.code)) {
        return { success: false, message: "El código de producto ya existe." };
    }
    products.push(newProduct);
    localStorage.setItem("huerto_products", JSON.stringify(products));
    return { success: true, message: "Producto creado con éxito." };
};

// UPDATE: Modificar producto (Admin o descuento por compras)
export const updateProduct = (code, updatedData) => {
    let products = getProducts();
    const index = products.findIndex(p => p.code === code);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        localStorage.setItem("huerto_products", JSON.stringify(products));
        return true;
    }
    return false;
};

// DELETE: Eliminar producto (Admin)
export const deleteProduct = (code) => {
    let products = getProducts();
    const filtered = products.filter(p => p.code !== code);
    if (products.length !== filtered.length) {
        localStorage.setItem("huerto_products", JSON.stringify(filtered));
        return true;
    }
    return false;
};

// ==========================================
//      SISTEMA DE USUARIOS Y AUTENTICACIÓN
// ==========================================

// Cuenta de administrador por defecto para las pruebas del profesor
const defaultUsers = [
    { email: "alonso@huertohogar.cl", password: "123", name: "Alonso Admin", role: "admin" },
    { email: "cliente@gmail.com", password: "456", name: "Juan Pérez", role: "client" }
];

const initializeUsersDB = () => {
    if (!localStorage.getItem("huerto_users")) {
        localStorage.setItem("huerto_users", JSON.stringify(defaultUsers));
    }
};

// Operación: Validar credenciales (Login)
export const loginAuthentication = (email, password) => {
    initializeUsersDB();
    const users = JSON.parse(localStorage.getItem("huerto_users"));
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
        return { success: true, user: { name: foundUser.name, role: foundUser.role } };
    }
    return { success: false, message: "Correo o contraseña incorrectos." };
};

// Operación: Registrar un nuevo usuario (Crear Cuenta)
export const registerUser = (newUser) => {
    initializeUsersDB();
    const users = JSON.parse(localStorage.getItem("huerto_users"));
    
    if (users.some(u => u.email === newUser.email)) {
        return { success: false, message: "Este correo ya está registrado." };
    }
    
    // Todo usuario nuevo por defecto ingresa como cliente común
    users.push({ ...newUser, role: "client" });
    localStorage.setItem("huerto_users", JSON.stringify(users));
    return { success: true, message: "Cuenta creada con éxito. Ya puedes iniciar sesión." };
};