# ⚡ Verificación Rápida - FlotIA

## 🚀 Prueba Rápida en 5 Minutos

### SQL Server (2 minutos)

```sql
-- 1. Abrir SSMS y conectarse a localhost

-- 2. Copiar y pegar este bloque completo:
USE FlotIA_DB;
GO

PRINT '=== VERIFICACIÓN SQL SERVER ===';
PRINT '';

-- Verificar tablas
SELECT 'Tablas creadas:' AS Info, COUNT(*) AS Total 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE';

-- Verificar datos
SELECT 'Empresas' AS Tabla, COUNT(*) AS Registros FROM Empresa
UNION ALL SELECT 'Vehiculos', COUNT(*) FROM Vehiculo
UNION ALL SELECT 'Mantenimientos', COUNT(*) FROM Mantenimiento;

-- Probar vista
SELECT TOP 3 * FROM vw_ResumenFlotaPorEmpresa;

-- Probar función
SELECT dbo.fn_CostoTotalMantenimiento(1) AS CostoTotalVehiculo1;

PRINT '';
PRINT '✅ SQL Server funcionando correctamente';
```

**Resultado esperado:**
- 8 tablas creadas
- Datos en Empresa, Vehiculo, Mantenimiento
- Vista muestra resumen
- Función retorna un valor numérico

---

### MongoDB (3 minutos)

```javascript
// 1. Abrir mongosh o MongoDB Compass shell

// 2. Copiar y pegar este bloque completo:
use flotia_nosql

print("=== VERIFICACIÓN MONGODB ===\n");

// Verificar colecciones
print("Colecciones creadas:");
db.getCollectionNames().forEach(c => print("  ✅", c));

// Verificar datos
print("\nDocumentos insertados:");
print("  - Empresas:", db.empresas.countDocuments());
print("  - Vehículos:", db.vehiculos.countDocuments());
print("  - Usuarios:", db.usuarios.countDocuments());

// Probar consulta de agregación
print("\nVehículos por estado:");
db.vehiculos.aggregate([
  { $group: { _id: "$estado_operativo", cantidad: { $sum: 1 } } },
  { $sort: { cantidad: -1 } }
]).forEach(doc => print("  -", doc._id + ":", doc.cantidad));

// Verificar validación
print("\nValidación JSON Schema:");
try {
  db.vehiculos.insertOne({ placa: "INVALIDO" });
  print("  ❌ Validación NO funciona");
} catch(e) {
  print("  ✅ Validación funciona correctamente");
}

print("\n✅ MongoDB funcionando correctamente");
```

**Resultado esperado:**
- 5 colecciones listadas
- Datos en empresas, vehiculos, usuarios
- Consulta muestra agrupación por estado
- Validación rechaza documento inválido

---

## 🎯 Checklist Mínimo

### SQL Server
- [ ] Base de datos FlotIA_DB existe
- [ ] Al menos 8 tablas creadas
- [ ] Datos insertados en tablas principales
- [ ] Vista vw_ResumenFlotaPorEmpresa funciona
- [ ] Función fn_CostoTotalMantenimiento retorna valor

### MongoDB
- [ ] Base de datos flotia_nosql existe
- [ ] 5 colecciones creadas
- [ ] Datos en empresas, vehiculos, usuarios
- [ ] Consulta de agregación funciona
- [ ] Validación JSON Schema activa

---

## 📸 Capturas Mínimas Requeridas

1. **SQL Server:** Resultado de la verificación completa
2. **MongoDB:** Resultado de la verificación completa
3. **SQL Server:** Object Explorer mostrando FlotIA_DB
4. **MongoDB:** Compass mostrando flotia_nosql

---

## ✅ Si Todo Funciona

**¡Felicidades!** Tu sistema híbrido FlotIA está funcionando correctamente.

**Siguiente paso:** Revisar `GUIA_PRUEBAS.md` para pruebas más detalladas.

---

## ❌ Si Algo Falla

### SQL Server no responde
```sql
-- Verificar conexión
SELECT @@VERSION;
```

### MongoDB no responde
```javascript
// Verificar conexión
db.runCommand({ ping: 1 })
```

### Base de datos no existe
- **SQL Server:** Ejecutar `sql/create_tables.sql`
- **MongoDB:** Ejecutar `nosql/collections.js`

---

**Tiempo estimado:** 5 minutos  
**Dificultad:** Básica  
**Requisitos:** SSMS y mongosh instalados
