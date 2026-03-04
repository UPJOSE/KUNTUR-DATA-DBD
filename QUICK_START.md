# ⚡ Quick Start - FlotIA

Guía rápida para ejecutar el proyecto en 5 minutos.

## 🚀 SQL Server (2 minutos)

```sql
-- 1. Abrir SQL Server Management Studio (SSMS)
-- 2. Conectarse a localhost

-- 3. Ejecutar creación (F5)
-- Abrir: sql/create_tables.sql

-- 4. Ejecutar datos (F5)
-- Abrir: sql/inserts.sql

-- 5. Verificar
USE FlotIA_DB;
SELECT * FROM vw_ResumenFlotaPorEmpresa;
```

## 📊 MongoDB (3 minutos)

```bash
# 1. Iniciar MongoDB
mongod

# 2. Nueva terminal - Conectar
mongosh

# 3. Ejecutar scripts
load("C:/Users/amaro/Documents/FINALDBD/nosql/collections.js")
load("C:/Users/amaro/Documents/FINALDBD/nosql/queries.js")

# 4. Verificar
use flotia_nosql
db.vehiculos.countDocuments()
```

## ✅ Verificación Rápida

### SQL Server
```sql
-- Debe retornar 4 empresas, 12 vehículos
SELECT 
    (SELECT COUNT(*) FROM Empresa) AS Empresas,
    (SELECT COUNT(*) FROM Vehiculo) AS Vehiculos,
    (SELECT COUNT(*) FROM Mantenimiento) AS Mantenimientos;
```

### MongoDB
```javascript
// Debe retornar 4, 4, 7
db.empresas.countDocuments()
db.vehiculos.countDocuments()
db.mantenimientos.countDocuments()
```

## 📁 Estructura del Proyecto

```
FINALDBD/
├── sql/                    ← Scripts SQL Server
├── nosql/                  ← Scripts MongoDB
├── diagramas/              ← ERD y Hackolade (crear aquí)
├── docs/                   ← Documentación
│   ├── evidencias/         ← Capturas (crear aquí)
│   ├── GUIA_IMPLEMENTACION.md
│   └── CONVENTIONAL_COMMITS.md
├── README.md               ← Documentación principal
└── .gitignore
```

## 🎯 Próximos Pasos

1. ✅ Ejecutar scripts SQL y MongoDB
2. 📐 Crear diagramas (ERD Editor + Hackolade)
3. 📸 Capturar evidencias
4. 🎥 Grabar videos
5. 📝 Completar Capítulos III y IV
6. 🔄 Subir a GitHub

## 📚 Documentación Completa

Ver `README.md` y `docs/GUIA_IMPLEMENTACION.md` para instrucciones detalladas.

---

**¿Problemas?** Consulta la sección de Solución de Problemas en `docs/GUIA_IMPLEMENTACION.md`
