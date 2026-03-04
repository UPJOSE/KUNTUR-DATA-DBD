// =====================================================================
// PROYECTO: FlotIA - Gestión Inteligente de Flotas
// CONSULTAS ANALÍTICAS - MongoDB
// Mínimo 2 consultas por integrante (8 consultas obligatorias)
// =====================================================================

use flotia_nosql

print("=====================================================================");
print("CONSULTAS ANALÍTICAS - FLOTIA");
print("=====================================================================");
print("");

// =====================================================================
// INTEGRANTE 1 - CONSULTAS
// =====================================================================

print("--- INTEGRANTE 1 ---");
print("");

// Consulta 1.1: Fallas recurrentes (>= 3 ocurrencias)
print("📊 Consulta 1.1: Análisis de Fallas Recurrentes");
print("Descripción: Identificar fallas que se repiten 3 o más veces");
print("");

db.mantenimientos.aggregate([
  {
    $match: {
      "falla.descripcion": { $exists: true, $ne: null }
    }
  },
  {
    $group: {
      _id: "$falla.descripcion",
      categoria: { $first: "$falla.categoria" },
      total_ocurrencias: { $sum: 1 },
      costo_total: { $sum: "$costo" },
      severidad_promedio: { $first: "$falla.severidad" }
    }
  },
  {
    $match: {
      total_ocurrencias: { $gte: 3 }
    }
  },
  {
    $sort: { total_ocurrencias: -1 }
  },
  {
    $project: {
      _id: 0,
      falla: "$_id",
      categoria: 1,
      total_ocurrencias: 1,
      costo_total: { $round: ["$costo_total", 2] },
      costo_promedio: { $round: [{ $divide: ["$costo_total", "$total_ocurrencias"] }, 2] }
    }
  }
]).forEach(printjson);

print("");

// Consulta 1.2: Costo total de mantenimiento por vehículo
print("📊 Consulta 1.2: Costo Total de Mantenimiento por Vehículo");
print("Descripción: Calcular el gasto total en mantenimiento de cada vehículo");
print("");

db.mantenimientos.aggregate([
  {
    $group: {
      _id: "$vehiculo_id",
      total_mantenimientos: { $sum: 1 },
      total_gastado: { $sum: "$costo" },
      costo_promedio: { $avg: "$costo" },
      ultimo_mantenimiento: { $max: "$fecha" }
    }
  },
  {
    $lookup: {
      from: "vehiculos",
      localField: "_id",
      foreignField: "_id",
      as: "vehiculo_info"
    }
  },
  {
    $unwind: "$vehiculo_info"
  },
  {
    $project: {
      _id: 0,
      placa: "$vehiculo_info.placa",
      marca: "$vehiculo_info.marca",
      modelo: "$vehiculo_info.modelo",
      total_mantenimientos: 1,
      total_gastado: { $round: ["$total_gastado", 2] },
      costo_promedio: { $round: ["$costo_promedio", 2] },
      ultimo_mantenimiento: 1
    }
  },
  {
    $sort: { total_gastado: -1 }
  }
]).forEach(printjson);

print("");

// =====================================================================
// INTEGRANTE 2 - CONSULTAS
// =====================================================================

print("--- INTEGRANTE 2 ---");
print("");

// Consulta 2.1: Vehículos con mayor frecuencia de mantenimiento correctivo
print("📊 Consulta 2.1: Vehículos con Mayor Frecuencia de Mantenimiento Correctivo");
print("Descripción: Identificar vehículos problemáticos con muchos mantenimientos correctivos");
print("");

db.mantenimientos.aggregate([
  {
    $match: {
      tipo: "Correctivo"
    }
  },
  {
    $group: {
      _id: "$vehiculo_id",
      total_correctivos: { $sum: 1 },
      costo_total_correctivo: { $sum: "$costo" },
      fallas: { $push: "$falla.descripcion" }
    }
  },
  {
    $lookup: {
      from: "vehiculos",
      localField: "_id",
      foreignField: "_id",
      as: "vehiculo"
    }
  },
  {
    $unwind: "$vehiculo"
  },
  {
    $project: {
      _id: 0,
      placa: "$vehiculo.placa",
      marca: "$vehiculo.marca",
      modelo: "$vehiculo.modelo",
      anio: "$vehiculo.anio",
      total_correctivos: 1,
      costo_total_correctivo: { $round: ["$costo_total_correctivo", 2] },
      estado_operativo: "$vehiculo.estado_operativo"
    }
  },
  {
    $sort: { total_correctivos: -1 }
  },
  {
    $limit: 5
  }
]).forEach(printjson);

print("");

// Consulta 2.2: Análisis de costos por categoría de falla
print("📊 Consulta 2.2: Análisis de Costos por Categoría de Falla");
print("Descripción: Agrupar costos de mantenimiento por categoría de falla");
print("");

db.mantenimientos.aggregate([
  {
    $match: {
      "falla.categoria": { $exists: true }
    }
  },
  {
    $group: {
      _id: "$falla.categoria",
      total_casos: { $sum: 1 },
      costo_total: { $sum: "$costo" },
      costo_promedio: { $avg: "$costo" },
      costo_maximo: { $max: "$costo" },
      costo_minimo: { $min: "$costo" }
    }
  },
  {
    $project: {
      _id: 0,
      categoria: "$_id",
      total_casos: 1,
      costo_total: { $round: ["$costo_total", 2] },
      costo_promedio: { $round: ["$costo_promedio", 2] },
      costo_maximo: { $round: ["$costo_maximo", 2] },
      costo_minimo: { $round: ["$costo_minimo", 2] }
    }
  },
  {
    $sort: { costo_total: -1 }
  }
]).forEach(printjson);

print("");

// =====================================================================
// INTEGRANTE 3 - CONSULTAS
// =====================================================================

print("--- INTEGRANTE 3 ---");
print("");

// Consulta 3.1: Rendimiento de técnicos (cantidad y calidad)
print("📊 Consulta 3.1: Rendimiento de Técnicos");
print("Descripción: Evaluar desempeño de técnicos por cantidad de trabajos y calificación");
print("");

db.mantenimientos.aggregate([
  {
    $match: {
      estado: "Completado",
      calificacion: { $exists: true }
    }
  },
  {
    $group: {
      _id: "$tecnico.tecnico_id",
      nombre_tecnico: { $first: { $concat: ["$tecnico.nombre", " ", "$tecnico.apellido"] } },
      especialidad: { $first: "$tecnico.especialidad" },
      certificacion: { $first: "$tecnico.certificacion" },
      total_trabajos: { $sum: 1 },
      calificacion_promedio: { $avg: "$calificacion" },
      tiempo_promedio_minutos: { $avg: "$duracion_minutos" },
      ingresos_generados: { $sum: "$costo" }
    }
  },
  {
    $project: {
      _id: 0,
      tecnico_id: "$_id",
      nombre_tecnico: 1,
      especialidad: 1,
      certificacion: 1,
      total_trabajos: 1,
      calificacion_promedio: { $round: ["$calificacion_promedio", 2] },
      tiempo_promedio_horas: { $round: [{ $divide: ["$tiempo_promedio_minutos", 60] }, 2] },
      ingresos_generados: { $round: ["$ingresos_generados", 2] }
    }
  },
  {
    $sort: { calificacion_promedio: -1, total_trabajos: -1 }
  }
]).forEach(printjson);

print("");

// Consulta 3.2: Vehículos por estado operativo y empresa
print("📊 Consulta 3.2: Distribución de Vehículos por Estado Operativo y Empresa");
print("Descripción: Análisis de flota por empresa y estado operativo");
print("");

db.vehiculos.aggregate([
  {
    $lookup: {
      from: "empresas",
      localField: "empresa_id",
      foreignField: "_id",
      as: "empresa"
    }
  },
  {
    $unwind: "$empresa"
  },
  {
    $group: {
      _id: {
        empresa: "$empresa.razon_social",
        estado: "$estado_operativo"
      },
      cantidad: { $sum: 1 },
      vehiculos: { $push: { placa: "$placa", marca: "$marca", modelo: "$modelo" } }
    }
  },
  {
    $group: {
      _id: "$_id.empresa",
      estados: {
        $push: {
          estado: "$_id.estado",
          cantidad: "$cantidad"
        }
      },
      total_vehiculos: { $sum: "$cantidad" }
    }
  },
  {
    $project: {
      _id: 0,
      empresa: "$_id",
      total_vehiculos: 1,
      estados: 1
    }
  },
  {
    $sort: { total_vehiculos: -1 }
  }
]).forEach(printjson);

print("");

// =====================================================================
// INTEGRANTE 4 - CONSULTAS
// =====================================================================

print("--- INTEGRANTE 4 ---");
print("");

// Consulta 4.1: Componentes en estado crítico o malo
print("📊 Consulta 4.1: Componentes en Estado Crítico o Malo");
print("Descripción: Identificar componentes que requieren atención urgente");
print("");

db.vehiculos.aggregate([
  {
    $unwind: "$componentes"
  },
  {
    $match: {
      "componentes.estado": { $in: ["Critico", "Malo"] }
    }
  },
  {
    $project: {
      _id: 0,
      placa: 1,
      marca: 1,
      modelo: 1,
      componente_nombre: "$componentes.nombre",
      componente_tipo: "$componentes.tipo",
      estado: "$componentes.estado",
      fecha_instalacion: "$componentes.fecha_instalacion",
      vida_util_km: "$componentes.vida_util_km",
      kilometraje_actual: 1,
      porcentaje_vida_util: {
        $round: [
          {
            $multiply: [
              { $divide: ["$kilometraje_actual", "$componentes.vida_util_km"] },
              100
            ]
          },
          2
        ]
      }
    }
  },
  {
    $sort: { estado: 1, porcentaje_vida_util: -1 }
  }
]).forEach(printjson);

print("");

// Consulta 4.2: Análisis de mantenimientos por mes (tendencia temporal)
print("📊 Consulta 4.2: Análisis de Mantenimientos por Mes");
print("Descripción: Tendencia de mantenimientos y costos por mes");
print("");

db.mantenimientos.aggregate([
  {
    $group: {
      _id: {
        anio: { $year: "$fecha" },
        mes: { $month: "$fecha" }
      },
      total_mantenimientos: { $sum: 1 },
      costo_total: { $sum: "$costo" },
      preventivos: {
        $sum: { $cond: [{ $eq: ["$tipo", "Preventivo"] }, 1, 0] }
      },
      correctivos: {
        $sum: { $cond: [{ $eq: ["$tipo", "Correctivo"] }, 1, 0] }
      },
      predictivos: {
        $sum: { $cond: [{ $eq: ["$tipo", "Predictivo"] }, 1, 0] }
      }
    }
  },
  {
    $project: {
      _id: 0,
      anio: "$_id.anio",
      mes: "$_id.mes",
      total_mantenimientos: 1,
      costo_total: { $round: ["$costo_total", 2] },
      costo_promedio: { $round: [{ $divide: ["$costo_total", "$total_mantenimientos"] }, 2] },
      preventivos: 1,
      correctivos: 1,
      predictivos: 1,
      ratio_preventivo_correctivo: {
        $round: [
          {
            $cond: [
              { $eq: ["$correctivos", 0] },
              0,
              { $divide: ["$preventivos", "$correctivos"] }
            ]
          },
          2
        ]
      }
    }
  },
  {
    $sort: { anio: -1, mes: -1 }
  }
]).forEach(printjson);

print("");

// =====================================================================
// CONSULTAS ADICIONALES AVANZADAS
// =====================================================================

print("--- CONSULTAS AVANZADAS ---");
print("");

// Consulta Avanzada 1: Vehículos con mayor ROI negativo (costo vs valor)
print("📊 Consulta Avanzada 1: Vehículos con Mayor Costo de Mantenimiento vs Antigüedad");
print("Descripción: Identificar vehículos que generan más gastos en relación a su antigüedad");
print("");

db.vehiculos.aggregate([
  {
    $lookup: {
      from: "mantenimientos",
      localField: "_id",
      foreignField: "vehiculo_id",
      as: "mantenimientos"
    }
  },
  {
    $project: {
      _id: 0,
      placa: 1,
      marca: 1,
      modelo: 1,
      anio: 1,
      antiguedad: { $subtract: [2024, "$anio"] },
      kilometraje_actual: 1,
      total_mantenimientos: { $size: "$mantenimientos" },
      costo_total: { $sum: "$mantenimientos.costo" },
      estado_operativo: 1
    }
  },
  {
    $match: {
      antiguedad: { $gt: 0 }
    }
  },
  {
    $project: {
      placa: 1,
      marca: 1,
      modelo: 1,
      anio: 1,
      antiguedad: 1,
      kilometraje_actual: 1,
      total_mantenimientos: 1,
      costo_total: { $round: ["$costo_total", 2] },
      costo_por_anio: { $round: [{ $divide: ["$costo_total", "$antiguedad"] }, 2] },
      costo_por_km: {
        $round: [
          {
            $cond: [
              { $eq: ["$kilometraje_actual", 0] },
              0,
              { $divide: ["$costo_total", "$kilometraje_actual"] }
            ]
          },
          4
        ]
      },
      estado_operativo: 1
    }
  },
  {
    $sort: { costo_por_anio: -1 }
  },
  {
    $limit: 5
  }
]).forEach(printjson);

print("");

// Consulta Avanzada 2: Alertas pendientes por prioridad
print("📊 Consulta Avanzada 2: Resumen de Alertas Pendientes por Prioridad");
print("Descripción: Dashboard de alertas predictivas para acción inmediata");
print("");

db.alertas_predictivas.aggregate([
  {
    $match: {
      estado: { $in: ["Pendiente", "En revisión"] }
    }
  },
  {
    $lookup: {
      from: "vehiculos",
      localField: "vehiculo_id",
      foreignField: "_id",
      as: "vehiculo"
    }
  },
  {
    $unwind: "$vehiculo"
  },
  {
    $group: {
      _id: "$prioridad",
      total_alertas: { $sum: 1 },
      alertas: {
        $push: {
          placa: "$vehiculo.placa",
          tipo_alerta: "$tipo_alerta",
          descripcion: "$descripcion",
          componente: "$componente_afectado",
          accion: "$accion_recomendada",
          estado: "$estado"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      prioridad: "$_id",
      total_alertas: 1,
      alertas: 1
    }
  },
  {
    $sort: {
      prioridad: 1
    }
  }
]).forEach(printjson);

print("");

// =====================================================================
// ESTADÍSTICAS GENERALES
// =====================================================================

print("--- ESTADÍSTICAS GENERALES DEL SISTEMA ---");
print("");

print("📈 Total de documentos por colección:");
print("- Empresas:", db.empresas.countDocuments());
print("- Vehículos:", db.vehiculos.countDocuments());
print("- Mantenimientos:", db.mantenimientos.countDocuments());
print("- Usuarios:", db.usuarios.countDocuments());
print("- Alertas:", db.alertas_predictivas.countDocuments());
print("");

print("💰 Estadísticas de costos:");
const statsResult = db.mantenimientos.aggregate([
  {
    $group: {
      _id: null,
      costo_total_sistema: { $sum: "$costo" },
      costo_promedio: { $avg: "$costo" },
      costo_maximo: { $max: "$costo" },
      costo_minimo: { $min: "$costo" }
    }
  }
]).toArray();

if (statsResult.length > 0) {
  print("- Costo total del sistema: S/", statsResult[0].costo_total_sistema.toFixed(2));
  print("- Costo promedio por mantenimiento: S/", statsResult[0].costo_promedio.toFixed(2));
  print("- Costo máximo: S/", statsResult[0].costo_maximo.toFixed(2));
  print("- Costo mínimo: S/", statsResult[0].costo_minimo.toFixed(2));
}

print("");
print("✅ Todas las consultas ejecutadas exitosamente");
print("=====================================================================");
