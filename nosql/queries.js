// =====================================================================
// PROYECTO: FlotIA - Gestion Inteligente de Flotas
// CONSULTAS ANALITICAS - MongoDB
// EQUIPO: KunturData
// =====================================================================

use flotia_nosql

print("=====================================================================");
print("CONSULTAS ANALITICAS - FLOTIA");
print("EQUIPO: KunturData");
print("=====================================================================");
print("");

// =====================================================================
// INTEGRANTE: JOSE AMARO - 5 CONSULTAS
// =====================================================================

print("--- INTEGRANTE: JOSE AMARO ---");
print("");

// Consulta 1: Fallas recurrentes (>= 3 ocurrencias)
print("📊 Consulta 1 (Jose Amaro): Analisis de Fallas Recurrentes");
print("Descripcion: Identificar fallas que se repiten 3 o mas veces");
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

// Consulta 2: Costo total de mantenimiento por vehiculo
print("📊 Consulta 2 (Jose Amaro): Costo Total de Mantenimiento por Vehiculo");
print("Descripcion: Calcular el gasto total en mantenimiento de cada vehiculo");
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

// Consulta 3: Vehiculos con mayor frecuencia de mantenimiento correctivo
print("📊 Consulta 3 (Jose Amaro): Vehiculos con Mayor Frecuencia de Mantenimiento Correctivo");
print("Descripcion: Identificar vehiculos problematicos con muchos mantenimientos correctivos");
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

// Consulta 4: Analisis de costos por categoria de falla
print("📊 Consulta 4 (Jose Amaro): Analisis de Costos por Categoria de Falla");
print("Descripcion: Agrupar costos de mantenimiento por categoria de falla");
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

// Consulta 5: Rendimiento de tecnicos
print("📊 Consulta 5 (Jose Amaro): Rendimiento de Tecnicos");
print("Descripcion: Evaluar desempeno de tecnicos por cantidad de trabajos y calificacion");
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

// =====================================================================
// INTEGRANTE: EDUARDO YURIVILCA - 5 CONSULTAS
// =====================================================================

print("--- INTEGRANTE: EDUARDO YURIVILCA ---");
print("");

// Consulta 6: Vehiculos por estado operativo y empresa
print("📊 Consulta 6 (Eduardo Yurivilca): Distribucion de Vehiculos por Estado Operativo y Empresa");
print("Descripcion: Analisis de flota por empresa y estado operativo");
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

// Consulta 7: Componentes en estado critico o malo
print("📊 Consulta 7 (Eduardo Yurivilca): Componentes en Estado Critico o Malo");
print("Descripcion: Identificar componentes que requieren atencion urgente");
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

// Consulta 8: Analisis de mantenimientos por mes
print("📊 Consulta 8 (Eduardo Yurivilca): Analisis de Mantenimientos por Mes");
print("Descripcion: Tendencia de mantenimientos y costos por mes");
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

// Consulta 9: Vehiculos con mayor ROI negativo
print("📊 Consulta 9 (Eduardo Yurivilca): Vehiculos con Mayor Costo vs Antigüedad");
print("Descripcion: Identificar vehiculos que generan mas gastos en relacion a su antigüedad");
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

// Consulta 10: Alertas pendientes por prioridad
print("📊 Consulta 10 (Eduardo Yurivilca): Resumen de Alertas Pendientes por Prioridad");
print("Descripcion: Dashboard de alertas predictivas para accion inmediata");
print("");

db.alertas_predictivas.aggregate([
  {
    $match: {
      estado: { $in: ["Pendiente", "En revision"] }
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
// CONSULTAS ADICIONALES (SIN ASIGNACION DE INTEGRANTE)
// =====================================================================

print("--- CONSULTAS ADICIONALES ---");
print("");

// Consulta Adicional 1: Estadisticas generales del sistema
print("📊 Consulta Adicional 1: Estadisticas Generales del Sistema");
print("Descripcion: Resumen completo de documentos y costos del sistema");
print("");

print("📈 Total de documentos por coleccion:");
print("- Empresas:", db.empresas.countDocuments());
print("- Vehiculos:", db.vehiculos.countDocuments());
print("- Mantenimientos:", db.mantenimientos.countDocuments());
print("- Usuarios:", db.usuarios.countDocuments());
print("- Alertas:", db.alertas_predictivas.countDocuments());
print("");

print("💰 Estadisticas de costos:");
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
  print("- Costo maximo: S/", statsResult[0].costo_maximo.toFixed(2));
  print("- Costo minimo: S/", statsResult[0].costo_minimo.toFixed(2));
}

print("");

// Consulta Adicional 2: Empresas con mas vehiculos
print("📊 Consulta Adicional 2: Ranking de Empresas por Cantidad de Vehiculos");
print("Descripcion: Empresas ordenadas por tamano de flota");
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
      _id: "$empresa._id",
      razon_social: { $first: "$empresa.razon_social" },
      ruc: { $first: "$empresa.ruc" },
      sector: { $first: "$empresa.sector" },
      total_vehiculos: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      razon_social: 1,
      ruc: 1,
      sector: 1,
      total_vehiculos: 1
    }
  },
  {
    $sort: { total_vehiculos: -1 }
  }
]).forEach(printjson);

print("");
print("✅ Todas las consultas ejecutadas exitosamente");
print("=====================================================================");
