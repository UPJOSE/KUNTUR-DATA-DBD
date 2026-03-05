# 🧪 Guia de Pruebas - FlotIA

## Como Probar el Sistema Completo (SQL Server + MongoDB)

Esta guia te permitira probar ambas bases de datos del proyecto FlotIA paso a paso.

---

## 🗄️ PARTE 1: Probar SQL Server

### Paso 1: Abrir SQL Server Management Studio (SSMS)

1. Buscar **"SQL Server Management Studio"** en el menu de Windows
2. Abrir SSMS
3. En la ventana de conexion:
   - **Server name:** `localhost` o `.\SQLEXPRESS` o `(localdb)\MSSQLLocalDB`
   - **Authentication:** Windows Authentication
   - Click **Connect**

### Paso 2: Ejecutar Script de Creacion

1. En SSMS, click en **File → Open → File**
2. Navegar a: `C:\Users\amaro\Documents\FINALDBD\sql\create_tables.sql`
3. Click **Open**
4. Presionar **F5** o click en **Execute** (boton verde)
5. Esperar mensaje: "Command(s) completed successfully"

**Verificar:**
```sql
-- En nueva query, ejecutar:
SELECT name FROM sys.databases WHERE name = 'FlotIA_DB';
```
Debe retornar: `FlotIA_DB`

### Paso 3: Insertar Datos de Prueba

1. **File → Open → File**
2. Abrir: `C:\Users\amaro\Documents\FINALDBD\sql\inserts.sql`
3. Presionar **F5**
4. Esperar confirmacion de insercion

**Verificar:**
```sql
USE FlotIA_DB;
GO

SELECT 'Empresas' AS Tabla, COUNT(*) AS Total FROM Empresa
UNION ALL
SELECT 'Vehiculos', COUNT(*) FROM Vehiculo
UNION ALL
SELECT 'Mantenimientos', COUNT(*) FROM Mantenimiento;
```

**Resultado esperado:**
- Empresas: 4
- Vehiculos: 12
- Mantenimientos: 16

### Paso 4: Probar Procedimientos Almacenados

```sql
-- Registrar un nuevo vehiculo
EXEC sp_RegistrarVehiculo 
    @EmpresaID = 1,
    @Placa = 'TEST-999',
    @Marca = 'Toyota',
    @Modelo = 'Corolla',
    @Anio = 2024,
    @Tipo = 'Auto',
    @Kilometraje = 0;

-- Verificar que se creo
SELECT * FROM Vehiculo WHERE Placa = 'TEST-999';
```

### Paso 5: Probar Vistas

```sql
-- Vista de resumen por empresa
SELECT * FROM vw_ResumenFlotaPorEmpresa;

-- Vista de costos por vehiculo
SELECT TOP 5 * 
FROM vw_CostosMantenimientoPorVehiculo 
ORDER BY CostoTotal DESC;
```

### Paso 6: Probar Funciones

```sql
-- Calcular costo total de mantenimiento del vehiculo 1
SELECT dbo.fn_CostoTotalMantenimiento(1) AS CostoTotal;

-- Verificar si tiene mantenimiento pendiente
SELECT 
    v.Placa,
    dbo.fn_TieneMantenimientoPendiente(v.VehiculoID) AS TienePendiente
FROM Vehiculo v
WHERE v.VehiculoID = 1;
```

### Paso 7: Ejecutar Script de Verificacion Completo

1. **File → Open → File**
2. Abrir: `C:\Users\amaro\Documents\FINALDBD\sql\queries_verificacion.sql`
3. Presionar **F5**
4. Revisar todos los resultados

---

## 📊 PARTE 2: Probar MongoDB

### Paso 1: Abrir MongoDB Shell

**Opcion A: Desde PowerShell**
```powershell
# Abrir PowerShell
mongosh
```

**Opcion B: Desde MongoDB Compass**
1. Abrir **MongoDB Compass**
2. Conectar a: `mongodb://localhost:27017`
3. Click **Connect**
4. Click en el icono **>_MONGOSH** (abajo)

### Paso 2: Verificar Base de Datos

```javascript
// Cambiar a la base de datos
use flotia_nosql

// Ver colecciones
show collections

// Debe mostrar:
// - empresas
// - vehiculos
// - mantenimientos
// - usuarios
// - alertas_predictivas
```

### Paso 3: Verificar Datos Insertados

```javascript
// Contar documentos en cada coleccion
print("Empresas:", db.empresas.countDocuments());
print("Vehiculos:", db.vehiculos.countDocuments());
print("Mantenimientos:", db.mantenimientos.countDocuments());
print("Usuarios:", db.usuarios.countDocuments());
print("Alertas:", db.alertas_predictivas.countDocuments());
```

### Paso 4: Ver Documentos de Ejemplo

```javascript
// Ver una empresa
db.empresas.findOne()

// Ver un vehiculo con sus componentes embebidos
db.vehiculos.findOne()

// Ver un usuario
db.usuarios.findOne()
```

### Paso 5: Probar Consultas Analiticas

**Consulta 1: Vehiculos por Estado Operativo**
```javascript
db.vehiculos.aggregate([
  {
    $group: {
      _id: "$estado_operativo",
      cantidad: { $sum: 1 }
    }
  },
  {
    $sort: { cantidad: -1 }
  }
])
```

**Consulta 2: Vehiculos con Componentes en Mal Estado**
```javascript
db.vehiculos.aggregate([
  { $unwind: "$componentes" },
  { 
    $match: { 
      "componentes.estado": { $in: ["Critico", "Malo"] } 
    } 
  },
  {
    $project: {
      placa: 1,
      marca: 1,
      modelo: 1,
      componente: "$componentes.nombre",
      estado: "$componentes.estado"
    }
  }
])
```

**Consulta 3: Empresas con Cantidad de Vehiculos**
```javascript
db.vehiculos.aggregate([
  {
    $lookup: {
      from: "empresas",
      localField: "empresa_id",
      foreignField: "_id",
      as: "empresa"
    }
  },
  { $unwind: "$empresa" },
  {
    $group: {
      _id: "$empresa.razon_social",
      total_vehiculos: { $sum: 1 }
    }
  },
  { $sort: { total_vehiculos: -1 } }
])
```

### Paso 6: Verificar Validaciones JSON Schema

```javascript
// Intentar insertar un documento invalido (debe fallar)
db.vehiculos.insertOne({
  placa: "INVALIDO"
  // Falta empresa_id, marca, modelo (campos requeridos)
})

// Debe mostrar error: "Document failed validation"
```

### Paso 7: Verificar Indices

```javascript
// Ver indices de la coleccion vehiculos
db.vehiculos.getIndexes()

// Ver indices de mantenimientos
db.mantenimientos.getIndexes()
```

### Paso 8: Insertar Datos de Prueba Adicionales

```javascript
// Obtener ID de una empresa
const empresa = db.empresas.findOne();

// Insertar un nuevo vehiculo
db.vehiculos.insertOne({
  placa: "TEST-001",
  empresa_id: empresa._id,
  marca: "Toyota",
  modelo: "Corolla",
  anio: 2024,
  tipo: "Auto",
  kilometraje_actual: 0,
  estado_operativo: "Operativo",
  componentes: [
    {
      nombre: "Motor 1.8L",
      tipo: "Motor",
      estado: "Excelente"
    }
  ],
  fecha_registro: new Date()
});

// Verificar que se inserto
db.vehiculos.findOne({ placa: "TEST-001" })
```

---

## 🔍 PARTE 3: Pruebas de Integracion

### Comparar Datos entre SQL Server y MongoDB

**En SQL Server:**
```sql
SELECT COUNT(*) AS TotalEmpresas FROM Empresa;
```

**En MongoDB:**
```javascript
db.empresas.countDocuments()
```

Ambos deberian tener datos consistentes (aunque no necesariamente la misma cantidad, ya que son modelos diferentes).

---

## ✅ Checklist de Pruebas

### SQL Server
- [ ] Base de datos FlotIA_DB creada
- [ ] 8 tablas creadas correctamente
- [ ] Datos insertados (4 empresas, 12 vehiculos, 16 mantenimientos)
- [ ] Procedimiento sp_RegistrarVehiculo funciona
- [ ] Procedimiento sp_RegistrarMantenimiento funciona
- [ ] Vista vw_ResumenFlotaPorEmpresa muestra datos
- [ ] Vista vw_CostosMantenimientoPorVehiculo muestra datos
- [ ] Funcion fn_CostoTotalMantenimiento retorna valores
- [ ] Funcion fn_TieneMantenimientoPendiente funciona

### MongoDB
- [ ] Base de datos flotia_nosql creada
- [ ] 5 colecciones creadas
- [ ] Validaciones JSON Schema funcionan
- [ ] Indices creados correctamente
- [ ] Datos insertados en empresas
- [ ] Datos insertados en vehiculos
- [ ] Datos insertados en usuarios
- [ ] Consulta de agregacion por estado funciona
- [ ] Consulta de componentes criticos funciona
- [ ] Embedded Pattern visible en vehiculos (componentes)

---

## 🎯 Pruebas Avanzadas

### SQL Server: Transacciones

```sql
BEGIN TRANSACTION;

-- Registrar mantenimiento
EXEC sp_RegistrarMantenimiento 
    @VehiculoID = 1,
    @TecnicoID = 1,
    @Tipo = 'Preventivo',
    @Costo = 500.00,
    @Descripcion = 'Prueba de transaccion',
    @KilometrajeRegistrado = 50000;

-- Verificar
SELECT * FROM Mantenimiento WHERE Descripcion = 'Prueba de transaccion';

-- Deshacer si es solo prueba
ROLLBACK;
-- O confirmar
-- COMMIT;
```

### MongoDB: Pipeline de Agregacion Complejo

```javascript
// Analisis completo de flota
db.vehiculos.aggregate([
  {
    $lookup: {
      from: "empresas",
      localField: "empresa_id",
      foreignField: "_id",
      as: "empresa"
    }
  },
  { $unwind: "$empresa" },
  {
    $group: {
      _id: {
        empresa: "$empresa.razon_social",
        estado: "$estado_operativo"
      },
      cantidad: { $sum: 1 },
      km_promedio: { $avg: "$kilometraje_actual" }
    }
  },
  {
    $project: {
      _id: 0,
      empresa: "$_id.empresa",
      estado: "$_id.estado",
      cantidad: 1,
      km_promedio: { $round: ["$km_promedio", 0] }
    }
  },
  { $sort: { empresa: 1, estado: 1 } }
])
```

---

## 📸 Capturar Evidencias

Mientras pruebas, captura pantallas de:

1. **SQL Server:**
   - Object Explorer mostrando FlotIA_DB
   - Resultado de SELECT * FROM vw_ResumenFlotaPorEmpresa
   - Ejecucion exitosa de sp_RegistrarVehiculo
   - Lista de tablas creadas

2. **MongoDB:**
   - MongoDB Compass mostrando flotia_nosql
   - Resultado de show collections
   - Resultado de consulta de agregacion
   - Validacion JSON Schema

Guardar en: `docs/evidencias/`

---

## 🆘 Solucion de Problemas

### SQL Server

**Error: "Cannot open database"**
```sql
-- Verificar que estas en la base correcta
USE FlotIA_DB;
GO
```

**Error: "Invalid object name"**
- Asegurate de haber ejecutado create_tables.sql primero

### MongoDB

**Error: "Collection not found"**
```javascript
// Verificar que estas en la base correcta
use flotia_nosql
show collections
```

**Error: "Document failed validation"**
- Revisa que todos los campos requeridos esten presentes
- Verifica los tipos de datos (ObjectId, int, double, etc.)

---

## 🎓 Comandos Utiles de Referencia

### SQL Server
```sql
-- Ver todas las tablas
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';

-- Ver procedimientos
SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE';

-- Ver indices
SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('Vehiculo');
```

### MongoDB
```javascript
// Ver estructura de coleccion
db.vehiculos.findOne()

// Contar con filtro
db.vehiculos.countDocuments({ estado_operativo: "Operativo" })

// Buscar con condiciones
db.vehiculos.find({ kilometraje_actual: { $gt: 50000 } })

// Actualizar documento
db.vehiculos.updateOne(
  { placa: "ABC-123" },
  { $set: { kilometraje_actual: 46000 } }
)
```

---

**Listo para probar!** Sigue estos pasos en orden y podras verificar que todo el sistema FlotIA funciona correctamente. 🚀
