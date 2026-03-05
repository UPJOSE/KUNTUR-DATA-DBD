// Script para insertar datos en FlotIA MongoDB
use flotia_nosql

// Obtener IDs de empresas existentes
const empresas = db.empresas.find().toArray();
const empresa1_id = empresas[0]._id;
const empresa2_id = empresas[1]._id;
const empresa3_id = empresas[2]._id;

// Insertar vehículos
const vehiculosResult = db.vehiculos.insertMany([
  {
    placa: "ABC-123",
    empresa_id: empresa1_id,
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
      }
    ],
    resumen_mantenimientos: {
      total_mantenimientos: 3,
      costo_total: 4250.00,
      ultimo_mantenimiento: new Date("2024-03-15"),
      proxima_revision: new Date("2024-04-15")
    },
    fecha_registro: new Date("2020-01-15")
  },
  {
    placa: "ABC-124",
    empresa_id: empresa1_id,
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
      }
    ],
    resumen_mantenimientos: {
      total_mantenimientos: 2,
      costo_total: 1680.00,
      ultimo_mantenimiento: new Date("2024-03-08"),
      proxima_revision: new Date("2024-04-20")
    },
    fecha_registro: new Date("2021-03-20")
  },
  {
    placa: "ABC-125",
    empresa_id: empresa1_id,
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
  },
  {
    placa: "DEF-456",
    empresa_id: empresa2_id,
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
  }
]);

print("Vehículos insertados:", vehiculosResult.insertedIds);

// Obtener IDs de vehículos
const vehiculos = db.vehiculos.find().toArray();
const vehiculo1_id = vehiculos[0]._id;
const vehiculo2_id = vehiculos[1]._id;
const vehiculo3_id = vehiculos[2]._id;
const vehiculo4_id = vehiculos[3]._id;

// Insertar mantenimientos
const mantResult = db.mantenimientos.insertMany([
  {
    vehiculo_id: vehiculo1_id,
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
    estado: "Completado",
    calificacion: 5
  },
  {
    vehiculo_id: vehiculo3_id,
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
    estado: "Completado",
    calificacion: 4
  },
  {
    vehiculo_id: vehiculo3_id,
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
    estado: "Completado",
    calificacion: 4
  },
  {
    vehiculo_id: vehiculo3_id,
    tecnico: {
      tecnico_id: 2,
      nombre: "Ana",
      apellido: "García",
      especialidad: "Electricidad Automotriz",
      certificacion: true
    },
    fecha: new Date("2024-03-15T10:00:00"),
    tipo: "Correctivo",
    costo: 2800.00,
    duracion_minutos: 240,
    kilometraje_registrado: 65700,
    falla: {
      descripcion: "Reparación sistema eléctrico completo",
      categoria: "Electrico",
      severidad: "Alta"
    },
    estado: "Completado",
    calificacion: 4
  },
  {
    vehiculo_id: vehiculo2_id,
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
    vehiculo_id: vehiculo4_id,
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

print("Mantenimientos insertados:", mantResult.insertedIds);

// Insertar alertas
const alertasResult = db.alertas_predictivas.insertMany([
  {
    vehiculo_id: vehiculo1_id,
    tipo_alerta: "Mantenimiento Programado",
    fecha_generacion: new Date(),
    prioridad: "Media",
    descripcion: "Vehículo ABC-123 próximo a cumplir 50000 km",
    componente_afectado: "General",
    accion_recomendada: "Programar mantenimiento preventivo",
    estado: "Pendiente"
  },
  {
    vehiculo_id: vehiculo3_id,
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
    vehiculo_id: vehiculo3_id,
    tipo_alerta: "Falla Predictiva",
    fecha_generacion: new Date(),
    prioridad: "Urgente",
    descripcion: "Motor requiere overhaul - desgaste excesivo detectado",
    componente_afectado: "Motor OM471",
    accion_recomendada: "Realizar overhaul de motor urgente",
    estado: "En revisión"
  }
]);

print("Alertas insertadas:", alertasResult.insertedIds);

// Resumen final
print("\n=== RESUMEN FINAL ===");
print("Empresas:", db.empresas.countDocuments());
print("Vehículos:", db.vehiculos.countDocuments());
print("Mantenimientos:", db.mantenimientos.countDocuments());
print("Usuarios:", db.usuarios.countDocuments());
print("Alertas:", db.alertas_predictivas.countDocuments());
print("\n✅ Base de datos FlotIA creada exitosamente");
