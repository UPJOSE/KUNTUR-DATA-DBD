// =====================================================================
// PROYECTO: FlotIA - Gestión Inteligente de Flotas
// STARTUP: KunturData
// MODELO: No Relacional (MongoDB)
// =====================================================================

// Conectar a MongoDB y seleccionar base de datos
use flotia_nosql

// =====================================================================
// 1️⃣ CREACIÓN DE COLECCIONES CON VALIDACIÓN
// =====================================================================

// ---------------------------------------------------------------------
// Colección: empresas
// ---------------------------------------------------------------------
db.createCollection("empresas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["razon_social", "ruc", "sector"],
      properties: {
        razon_social: {
          bsonType: "string",
          description: "Razón social de la empresa - requerido"
        },
        ruc: {
          bsonType: "string",
          pattern: "^[0-9]{11}$",
          description: "RUC de 11 dígitos - requerido"
        },
        sector: {
          bsonType: "string",
          description: "Sector empresarial - requerido"
        },
        direccion: {
          bsonType: "string"
        },
        contacto: {
          bsonType: "object",
          properties: {
            telefono: { bsonType: "string" },
            email: { bsonType: "string" }
          }
        },
        fecha_registro: {
          bsonType: "date"
        },
        estado: {
          enum: ["Activo", "Inactivo"],
          description: "Estado debe ser Activo o Inactivo"
        }
      }
    }
  }
});

// ---------------------------------------------------------------------
// Colección: vehiculos (con Embedded Pattern para componentes)
// ---------------------------------------------------------------------
db.createCollection("vehiculos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["placa", "empresa_id", "marca", "modelo"],
      properties: {
        placa: {
          bsonType: "string",
          description: "Placa del vehículo - requerido"
        },
        empresa_id: {
          bsonType: "objectId",
          description: "ID de la empresa - requerido"
        },
        marca: {
          bsonType: "string",
          description: "Marca del vehículo - requerido"
        },
        modelo: {
          bsonType: "string",
          description: "Modelo del vehículo - requerido"
        },
        anio: {
          bsonType: "int",
          minimum: 1900,
          maximum: 2030
        },
        tipo: {
          enum: ["Camion", "Camioneta", "Auto", "Bus", "Moto"],
          description: "Tipo de vehículo"
        },
        kilometraje_actual: {
          bsonType: "int",
          minimum: 0
        },
        estado_operativo: {
          enum: ["Operativo", "En mantenimiento", "Fuera de servicio"],
          description: "Estado operativo del vehículo"
        },
        componentes: {
          bsonType: "array",
          description: "Embedded Pattern - Componentes del vehículo",
          items: {
            bsonType: "object",
            required: ["nombre", "tipo"],
            properties: {
              nombre: { bsonType: "string" },
              tipo: {
                enum: ["Motor", "Transmision", "Frenos", "Suspension", "Electrico", "Neumaticos", "Otro"]
              },
              fecha_instalacion: { bsonType: "date" },
              vida_util_km: { bsonType: "int" },
              estado: {
                enum: ["Excelente", "Bueno", "Regular", "Malo", "Critico"]
              }
            }
          }
        },
        resumen_mantenimientos: {
          bsonType: "object",
          description: "Subset Pattern - Resumen de mantenimientos recientes",
          properties: {
            total_mantenimientos: { bsonType: "int" },
            costo_total: { bsonType: "double" },
            ultimo_mantenimiento: { bsonType: "date" },
            proxima_revision: { bsonType: "date" }
          }
        },
        telemetria: {
          bsonType: "object",
          description: "Datos de telemetría IoT (escalabilidad futura)",
          properties: {
            gps: {
              bsonType: "object",
              properties: {
                latitud: { bsonType: "double" },
                longitud: { bsonType: "double" }
              }
            },
            temperatura_motor: { bsonType: "double" },
            nivel_combustible: { bsonType: "double" },
            presion_neumaticos: { bsonType: "array" },
            ultima_actualizacion: { bsonType: "date" }
          }
        },
        fecha_registro: {
          bsonType: "date"
        }
      }
    }
  }
});

// ---------------------------------------------------------------------
// Colección: mantenimientos (con Reference Pattern)
// ---------------------------------------------------------------------
db.createCollection("mantenimientos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["vehiculo_id", "fecha", "tipo"],
      properties: {
        vehiculo_id: {
          bsonType: "objectId",
          description: "Reference Pattern - ID del vehículo - requerido"
        },
        tecnico: {
          bsonType: "object",
          required: ["nombre", "especialidad"],
          properties: {
            tecnico_id: { bsonType: "int" },
            nombre: { bsonType: "string" },
            apellido: { bsonType: "string" },
            especialidad: { bsonType: "string" },
            certificacion: { bsonType: "bool" }
          }
        },
        fecha: {
          bsonType: "date",
          description: "Fecha del mantenimiento - requerido"
        },
        tipo: {
          enum: ["Preventivo", "Correctivo", "Predictivo"],
          description: "Tipo de mantenimiento - requerido"
        },
        costo: {
          bsonType: "double",
          minimum: 0,
          description: "Costo del mantenimiento"
        },
        duracion_minutos: {
          bsonType: "int",
          minimum: 0
        },
        kilometraje_registrado: {
          bsonType: "int",
          minimum: 0
        },
        falla: {
          bsonType: "object",
          description: "Información de la falla (para análisis de fallas recurrentes)",
          properties: {
            descripcion: {
              bsonType: "string",
              description: "Descripción de la falla"
            },
            categoria: {
              enum: ["Motor", "Transmision", "Frenos", "Suspension", "Electrico", "Neumaticos", "Hidraulico", "Otro"],
              description: "Categoría de la falla"
            },
            severidad: {
              enum: ["Baja", "Media", "Alta", "Critica"],
              description: "Nivel de severidad"
            },
            causa_raiz: {
              bsonType: "string"
            }
          }
        },
        repuestos_utilizados: {
          bsonType: "array",
          description: "Lista de repuestos utilizados",
          items: {
            bsonType: "object",
            properties: {
              nombre: { bsonType: "string" },
              codigo: { bsonType: "string" },
              cantidad: { bsonType: "int" },
              costo_unitario: { bsonType: "double" }
            }
          }
        },
        observaciones: {
          bsonType: "string"
        },
        estado: {
          enum: ["Programado", "En proceso", "Completado", "Cancelado"],
          description: "Estado del mantenimiento"
        },
        calificacion: {
          bsonType: "int",
          minimum: 1,
          maximum: 5,
          description: "Calificación del servicio (1-5)"
        }
      }
    }
  }
});

// ---------------------------------------------------------------------
// Colección: usuarios
// ---------------------------------------------------------------------
db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre_usuario", "email", "rol"],
      properties: {
        nombre_usuario: {
          bsonType: "string",
          description: "Nombre de usuario - requerido"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email válido - requerido"
        },
        nombre_completo: {
          bsonType: "object",
          properties: {
            nombre: { bsonType: "string" },
            apellido: { bsonType: "string" }
          }
        },
        rol: {
          enum: ["Administrador", "Supervisor", "Tecnico", "Consulta"],
          description: "Rol del usuario - requerido"
        },
        empresa_id: {
          bsonType: "objectId"
        },
        permisos: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        fecha_creacion: {
          bsonType: "date"
        },
        ultimo_acceso: {
          bsonType: "date"
        },
        estado: {
          enum: ["Activo", "Inactivo"],
          description: "Estado del usuario"
        },
        preferencias: {
          bsonType: "object",
          properties: {
            idioma: { bsonType: "string" },
            notificaciones: { bsonType: "bool" },
            tema: { enum: ["Claro", "Oscuro"] }
          }
        }
      }
    }
  }
});

// ---------------------------------------------------------------------
// Colección: alertas_predictivas
// ---------------------------------------------------------------------
db.createCollection("alertas_predictivas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["vehiculo_id", "tipo_alerta", "fecha_generacion"],
      properties: {
        vehiculo_id: {
          bsonType: "objectId",
          description: "ID del vehículo - requerido"
        },
        tipo_alerta: {
          enum: ["Mantenimiento Programado", "Falla Predictiva", "Componente Crítico", "Kilometraje Alto"],
          description: "Tipo de alerta - requerido"
        },
        fecha_generacion: {
          bsonType: "date",
          description: "Fecha de generación - requerido"
        },
        prioridad: {
          enum: ["Baja", "Media", "Alta", "Urgente"],
          description: "Prioridad de la alerta"
        },
        descripcion: {
          bsonType: "string"
        },
        componente_afectado: {
          bsonType: "string"
        },
        accion_recomendada: {
          bsonType: "string"
        },
        estado: {
          enum: ["Pendiente", "En revisión", "Atendida", "Descartada"],
          description: "Estado de la alerta"
        },
        fecha_atencion: {
          bsonType: "date"
        }
      }
    }
  }
});

// =====================================================================
// 2️⃣ CREACIÓN DE ÍNDICES PARA OPTIMIZACIÓN
// =====================================================================

// Índices para empresas
db.empresas.createIndex({ "ruc": 1 }, { unique: true });
db.empresas.createIndex({ "razon_social": 1 });

// Índices para vehiculos
db.vehiculos.createIndex({ "placa": 1 }, { unique: true });
db.vehiculos.createIndex({ "empresa_id": 1 });
db.vehiculos.createIndex({ "estado_operativo": 1 });
db.vehiculos.createIndex({ "marca": 1, "modelo": 1 });

// Índices para mantenimientos (críticos para consultas analíticas)
db.mantenimientos.createIndex({ "vehiculo_id": 1 });
db.mantenimientos.createIndex({ "fecha": -1 });
db.mantenimientos.createIndex({ "tipo": 1 });
db.mantenimientos.createIndex({ "falla.categoria": 1 });
db.mantenimientos.createIndex({ "falla.descripcion": 1 });
db.mantenimientos.createIndex({ "vehiculo_id": 1, "fecha": -1 });

// Índice compuesto para análisis de costos
db.mantenimientos.createIndex({ "vehiculo_id": 1, "costo": 1 });

// Índices para usuarios
db.usuarios.createIndex({ "nombre_usuario": 1 }, { unique: true });
db.usuarios.createIndex({ "email": 1 }, { unique: true });
db.usuarios.createIndex({ "empresa_id": 1 });

// Índices para alertas
db.alertas_predictivas.createIndex({ "vehiculo_id": 1 });
db.alertas_predictivas.createIndex({ "fecha_generacion": -1 });
db.alertas_predictivas.createIndex({ "estado": 1 });

// =====================================================================
// 3️⃣ INSERCIÓN DE DATOS DE PRUEBA
// =====================================================================

// Insertar empresas
const empresa1 = db.empresas.insertOne({
  razon_social: "Transportes Rápidos SAC",
  ruc: "20123456789",
  sector: "Transporte de Carga",
  direccion: "Av. Industrial 123, Lima",
  contacto: {
    telefono: "01-2345678",
    email: "contacto@rapidossac.com"
  },
  fecha_registro: new Date("2020-01-15"),
  estado: "Activo"
});

const empresa2 = db.empresas.insertOne({
  razon_social: "Logística del Sur EIRL",
  ruc: "20987654321",
  sector: "Logística",
  direccion: "Jr. Comercio 456, Arequipa",
  contacto: {
    telefono: "054-234567",
    email: "info@logisticasur.com"
  },
  fecha_registro: new Date("2019-06-20"),
  estado: "Activo"
});

const empresa3 = db.empresas.insertOne({
  razon_social: "Distribuidora Norte SA",
  ruc: "20456789123",
  sector: "Distribución",
  direccion: "Av. Grau 789, Trujillo",
  contacto: {
    telefono: "044-345678",
    email: "ventas@distrinorte.com"
  },
  fecha_registro: new Date("2021-03-10"),
  estado: "Activo"
});

// Insertar vehículos con componentes embebidos
const vehiculo1 = db.vehiculos.insertOne({
  placa: "ABC-123",
  empresa_id: empresa1.insertedId,
  marca: "Volvo",
  modelo: "FH16",
  anio: 2020,
  tipo: "Camion",
  kilometraje_actual: 45000,
  estado_operativo: "Operativo",
  componentes: [
    {
      nombre: "Motor Volvo D13",
      tipo: "Motor",
      fecha_instalacion: new Date("2020-01-15"),
      vida_util_km: 500000,
      estado: "Bueno"
    },
    {
      nombre: "Transmisión I-Shift",
      tipo: "Transmision",
      fecha_instalacion: new Date("2020-01-15"),
      vida_util_km: 400000,
      estado: "Bueno"
    },
    {
      nombre: "Sistema de Frenos ABS",
      tipo: "Frenos",
      fecha_instalacion: new Date("2020-01-15"),
      vida_util_km: 200000,
      estado: "Excelente"
    }
  ],
  resumen_mantenimientos: {
    total_mantenimientos: 3,
    costo_total: 4250.00,
    ultimo_mantenimiento: new Date("2024-03-15"),
    proxima_revision: new Date("2024-04-15")
  },
  telemetria: {
    gps: {
      latitud: -12.0464,
      longitud: -77.0428
    },
    temperatura_motor: 85.5,
    nivel_combustible: 75.0,
    presion_neumaticos: [32.0, 32.5, 31.8, 32.2],
    ultima_actualizacion: new Date()
  },
  fecha_registro: new Date("2020-01-15")
});

const vehiculo2 = db.vehiculos.insertOne({
  placa: "ABC-124",
  empresa_id: empresa1.insertedId,
  marca: "Scania",
  modelo: "R450",
  anio: 2021,
  tipo: "Camion",
  kilometraje_actual: 32000,
  estado_operativo: "Operativo",
  componentes: [
    {
      nombre: "Motor Scania DC13",
      tipo: "Motor",
      fecha_instalacion: new Date("2021-03-20"),
      vida_util_km: 500000,
      estado: "Excelente"
    },
    {
      nombre: "Suspensión Neumática",
      tipo: "Suspension",
      fecha_instalacion: new Date("2021-03-20"),
      vida_util_km: 300000,
      estado: "Bueno"
    }
  ],
  resumen_mantenimientos: {
    total_mantenimientos: 2,
    costo_total: 1680.00,
    ultimo_mantenimiento: new Date("2024-03-08"),
    proxima_revision: new Date("2024-04-20")
  },
  fecha_registro: new Date("2021-03-20")
});

const vehiculo3 = db.vehiculos.insertOne({
  placa: "ABC-125",
  empresa_id: empresa1.insertedId,
  marca: "Mercedes-Benz",
  modelo: "Actros",
  anio: 2019,
  tipo: "Camion",
  kilometraje_actual: 67000,
  estado_operativo: "En mantenimiento",
  componentes: [
    {
      nombre: "Motor OM471",
      tipo: "Motor",
      fecha_instalacion: new Date("2019-05-10"),
      vida_util_km: 500000,
      estado: "Regular"
    },
    {
      nombre: "Sistema Eléctrico 24V",
      tipo: "Electrico",
      fecha_instalacion: new Date("2019-05-10"),
      vida_util_km: 250000,
      estado: "Malo"
    }
  ],
  resumen_mantenimientos: {
    total_mantenimientos: 4,
    costo_total: 10800.00,
    ultimo_mantenimiento: new Date("2024-03-20"),
    proxima_revision: new Date("2024-05-01")
  },
  fecha_registro: new Date("2019-05-10")
});

const vehiculo4 = db.vehiculos.insertOne({
  placa: "DEF-456",
  empresa_id: empresa2.insertedId,
  marca: "Toyota",
  modelo: "Hilux",
  anio: 2022,
  tipo: "Camioneta",
  kilometraje_actual: 15000,
  estado_operativo: "Operativo",
  componentes: [
    {
      nombre: "Motor 2.8L Turbo",
      tipo: "Motor",
      fecha_instalacion: new Date("2022-02-15"),
      vida_util_km: 300000,
      estado: "Excelente"
    }
  ],
  resumen_mantenimientos: {
    total_mantenimientos: 2,
    costo_total: 1540.00,
    ultimo_mantenimiento: new Date("2024-03-12"),
    proxima_revision: new Date("2024-04-10")
  },
  fecha_registro: new Date("2022-02-15")
});

// Insertar mantenimientos con información detallada de fallas
db.mantenimientos.insertMany([
  {
    vehiculo_id: vehiculo1.insertedId,
    tecnico: {
      tecnico_id: 1,
      nombre: "Carlos",
      apellido: "Mendoza",
      especialidad: "Mecánica Diesel",
      certificacion: true
    },
    fecha: new Date("2024-01-15T08:00:00"),
    tipo: "Preventivo",
    costo: 850.00,
    duracion_minutos: 120,
    kilometraje_registrado: 40000,
    falla: {
      descripcion: "Mantenimiento preventivo - cambio de aceite y filtros",
      categoria: "Motor",
      severidad: "Baja"
    },
    repuestos_utilizados: [
      { nombre: "Aceite 15W40", codigo: "AC-001", cantidad: 20, costo_unitario: 25.00 },
      { nombre: "Filtro de aceite", codigo: "FO-001", cantidad: 1, costo_unitario: 45.00 },
      { nombre: "Filtro de aire", codigo: "FA-001", cantidad: 1, costo_unitario: 35.00 }
    ],
    observaciones: "Vehículo en buen estado general",
    estado: "Completado",
    calificacion: 5
  },
  {
    vehiculo_id: vehiculo1.insertedId,
    tecnico: {
      tecnico_id: 3,
      nombre: "Luis",
      apellido: "Rodríguez",
      especialidad: "Transmisión y Frenos",
      certificacion: true
    },
    fecha: new Date("2024-02-20T09:30:00"),
    tipo: "Preventivo",
    costo: 1200.00,
    duracion_minutos: 180,
    kilometraje_registrado: 42000,
    falla: {
      descripcion: "Revisión de frenos y suspensión",
      categoria: "Frenos",
      severidad: "Media"
    },
    repuestos_utilizados: [
      { nombre: "Pastillas de freno", codigo: "PF-001", cantidad: 4, costo_unitario: 120.00 }
    ],
    observaciones: "Se reemplazaron pastillas delanteras",
    estado: "Completado",
    calificacion: 5
  },
  {
    vehiculo_id: vehiculo3.insertedId,
    tecnico: {
      tecnico_id: 2,
      nombre: "Ana",
      apellido: "García",
      especialidad: "Electricidad Automotriz",
      certificacion: true
    },
    fecha: new Date("2024-03-01T08:30:00"),
    tipo: "Correctivo",
    costo: 3500.00,
    duracion_minutos: 480,
    kilometraje_registrado: 65000,
    falla: {
      descripcion: "Falla en alternador - sistema eléctrico",
      categoria: "Electrico",
      severidad: "Alta",
      causa_raiz: "Desgaste de rodamientos del alternador"
    },
    repuestos_utilizados: [
      { nombre: "Alternador 24V", codigo: "AL-001", cantidad: 1, costo_unitario: 2800.00 },
      { nombre: "Correa de alternador", codigo: "CA-001", cantidad: 1, costo_unitario: 85.00 }
    ],
    observaciones: "Falla recurrente en sistema eléctrico",
    estado: "Completado",
    calificacion: 4
  },
  {
    vehiculo_id: vehiculo3.insertedId,
    tecnico: {
      tecnico_id: 2,
      nombre: "Ana",
      apellido: "García",
      especialidad: "Electricidad Automotriz",
      certificacion: true
    },
    fecha: new Date("2024-03-10T14:00:00"),
    tipo: "Correctivo",
    costo: 2800.00,
    duracion_minutos: 240,
    kilometraje_registrado: 65500,
    falla: {
      descripcion: "Reemplazo de batería y cableado",
      categoria: "Electrico",
      severidad: "Alta",
      causa_raiz: "Batería descargada por falla en alternador"
    },
    repuestos_utilizados: [
      { nombre: "Batería 24V 200Ah", codigo: "BA-001", cantidad: 2, costo_unitario: 950.00 },
      { nombre: "Cable eléctrico", codigo: "CE-001", cantidad: 10, costo_unitario: 15.00 }
    ],
    observaciones: "Falla relacionada con problema anterior del alternador",
    estado: "Completado",
    calificacion: 4
  },
  {
    vehiculo_id: vehiculo3.insertedId,
    tecnico: {
      tecnico_id: 1,
      nombre: "Carlos",
      apellido: "Mendoza",
      especialidad: "Mecánica Diesel",
      certificacion: true
    },
    fecha: new Date("2024-03-20T08:00:00"),
    tipo: "Correctivo",
    costo: 4500.00,
    duracion_minutos: 960,
    kilometraje_registrado: 67000,
    falla: {
      descripcion: "Overhaul de motor - reparación mayor",
      categoria: "Motor",
      severidad: "Critica",
      causa_raiz: "Desgaste excesivo por falta de mantenimiento preventivo"
    },
    repuestos_utilizados: [
      { nombre: "Kit de pistones", codigo: "KP-001", cantidad: 1, costo_unitario: 1800.00 },
      { nombre: "Juego de anillos", codigo: "JA-001", cantidad: 1, costo_unitario: 650.00 },
      { nombre: "Empaquetaduras", codigo: "EM-001", cantidad: 1, costo_unitario: 450.00 }
    ],
    observaciones: "Motor requiere overhaul completo",
    estado: "En proceso",
    calificacion: null
  },
  {
    vehiculo_id: vehiculo2.insertedId,
    tecnico: {
      tecnico_id: 1,
      nombre: "Carlos",
      apellido: "Mendoza",
      especialidad: "Mecánica Diesel",
      certificacion: true
    },
    fecha: new Date("2024-01-10T10:00:00"),
    tipo: "Preventivo",
    costo: 900.00,
    duracion_minutos: 150,
    kilometraje_registrado: 30000,
    falla: {
      descripcion: "Mantenimiento programado 30000km",
      categoria: "Motor",
      severidad: "Baja"
    },
    estado: "Completado",
    calificacion: 5
  },
  {
    vehiculo_id: vehiculo4.insertedId,
    tecnico: {
      tecnico_id: 4,
      nombre: "María",
      apellido: "Torres",
      especialidad: "Mecánica General",
      certificacion: false
    },
    fecha: new Date("2024-02-05T11:00:00"),
    tipo: "Preventivo",
    costo: 650.00,
    duracion_minutos: 90,
    kilometraje_registrado: 14000,
    falla: {
      descripcion: "Cambio de aceite y rotación de neumáticos",
      categoria: "Neumaticos",
      severidad: "Baja"
    },
    estado: "Completado",
    calificacion: 5
  }
]);

// Insertar usuarios
db.usuarios.insertMany([
  {
    nombre_usuario: "admin.rapidos",
    email: "rsanchez@rapidossac.com",
    nombre_completo: {
      nombre: "Roberto",
      apellido: "Sánchez"
    },
    rol: "Administrador",
    empresa_id: empresa1.insertedId,
    permisos: ["crear", "editar", "eliminar", "consultar", "reportes"],
    fecha_creacion: new Date("2020-01-15"),
    ultimo_acceso: new Date(),
    estado: "Activo",
    preferencias: {
      idioma: "es",
      notificaciones: true,
      tema: "Claro"
    }
  },
  {
    nombre_usuario: "supervisor.rapidos",
    email: "evargas@rapidossac.com",
    nombre_completo: {
      nombre: "Elena",
      apellido: "Vargas"
    },
    rol: "Supervisor",
    empresa_id: empresa1.insertedId,
    permisos: ["editar", "consultar", "reportes"],
    fecha_creacion: new Date("2020-02-01"),
    ultimo_acceso: new Date(),
    estado: "Activo",
    preferencias: {
      idioma: "es",
      notificaciones: true,
      tema: "Oscuro"
    }
  },
  {
    nombre_usuario: "tecnico.carlos",
    email: "cmendoza@tech.com",
    nombre_completo: {
      nombre: "Carlos",
      apellido: "Mendoza"
    },
    rol: "Tecnico",
    permisos: ["consultar", "registrar_mantenimiento"],
    fecha_creacion: new Date("2020-01-20"),
    ultimo_acceso: new Date(),
    estado: "Activo",
    preferencias: {
      idioma: "es",
      notificaciones: true,
      tema: "Claro"
    }
  }
]);

// Insertar alertas predictivas
db.alertas_predictivas.insertMany([
  {
    vehiculo_id: vehiculo1.insertedId,
    tipo_alerta: "Mantenimiento Programado",
    fecha_generacion: new Date(),
    prioridad: "Media",
    descripcion: "Vehículo ABC-123 próximo a cumplir 50000 km",
    componente_afectado: "General",
    accion_recomendada: "Programar mantenimiento preventivo",
    estado: "Pendiente"
  },
  {
    vehiculo_id: vehiculo3.insertedId,
    tipo_alerta: "Componente Crítico",
    fecha_generacion: new Date(),
    prioridad: "Alta",
    descripcion: "Sistema eléctrico en estado crítico",
    componente_afectado: "Sistema Eléctrico 24V",
    accion_recomendada: "Revisión inmediata del sistema eléctrico",
    estado: "En revisión",
    fecha_atencion: new Date("2024-03-20")
  },
  {
    vehiculo_id: vehiculo3.insertedId,
    tipo_alerta: "Falla Predictiva",
    fecha_generacion: new Date(),
    prioridad: "Urgente",
    descripcion: "Motor requiere overhaul - desgaste excesivo detectado",
    componente_afectado: "Motor OM471",
    accion_recomendada: "Realizar overhaul de motor urgente",
    estado: "En revisión"
  }
]);

print("✅ Base de datos flotia_nosql creada exitosamente");
print("✅ Colecciones creadas con validación JSON Schema");
print("✅ Índices creados para optimización");
print("✅ Datos de prueba insertados");
print("");
print("📊 Resumen:");
print("- Empresas:", db.empresas.countDocuments());
print("- Vehículos:", db.vehiculos.countDocuments());
print("- Mantenimientos:", db.mantenimientos.countDocuments());
print("- Usuarios:", db.usuarios.countDocuments());
print("- Alertas:", db.alertas_predictivas.countDocuments());
