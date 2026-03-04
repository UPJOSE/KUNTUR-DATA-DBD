# 📘 Guía de Implementación - FlotIA

## 🎯 Objetivo

Esta guía proporciona instrucciones paso a paso para implementar el sistema FlotIA desde cero, cumpliendo con todos los requisitos del proyecto TF1.

---

## 📋 Pre-requisitos

### Software Requerido

1. **SQL Server 2019+**
   - Descargar: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
   - Versión recomendada: Developer Edition (gratuita)

2. **SQL Server Management Studio (SSMS)**
   - Descargar: https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms

3. **MongoDB Community Edition 6.0+**
   - Descargar: https://www.mongodb.com/try/download/community

4. **MongoDB Compass**
   - Descargar: https://www.mongodb.com/try/download/compass

5. **Git**
   - Descargar: https://git-scm.com/downloads

6. **Visual Studio Code** (opcional pero recomendado)
   - Descargar: https://code.visualstudio.com/
   - Extensiones recomendadas:
     - ERD Editor (dineug.vuerd-vscode)
     - MongoDB for VS Code
     - SQL Server (mssql)

7. **Hackolade**
   - Descargar: https://hackolade.com/download.html
   - Versión Community (gratuita) es suficiente

---

## 🚀 Paso 1: Configuración Inicial

### 1.1 Clonar o Descargar el Proyecto

```bash
# Opción A: Clonar desde GitHub (si ya está en repositorio)
git clone https://github.com/tu-usuario/flotia.git
cd flotia

# Opción B: Crear estructura desde cero
mkdir FINALDBD
cd FINALDBD
```

### 1.2 Verificar Estructura de Carpetas

```
FINALDBD/
├── sql/
├── nosql/
├── diagramas/
├── docs/
│   └── evidencias/
├── .gitignore
└── README.md
```

---

## 🗄️ Paso 2: Implementación SQL Server

### 2.1 Iniciar SQL Server

```bash
# Verificar que SQL Server esté corriendo
# Windows: Abrir "Services" y buscar "SQL Server"
# Debe estar en estado "Running"
```

### 2.2 Conectarse con SSMS

1. Abrir SQL Server Management Studio
2. Conectarse al servidor:
   - Server type: Database Engine
   - Server name: `localhost` o `.\SQLEXPRESS` o `(localdb)\MSSQLLocalDB`
   - Authentication: Windows Authentication
3. Click en "Connect"

### 2.3 Ejecutar Script de Creación

```sql
-- En SSMS, abrir archivo: sql/create_tables.sql
-- Presionar F5 o click en "Execute"

-- Verificar creación exitosa
USE FlotIA_DB;
GO

-- Debe mostrar todas las tablas
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
```

**Resultado esperado:** 8 tablas creadas
- Empresa
- Vehiculo
- Tecnico
- Componente
- Mantenimiento
- PlanMantenimiento
- Usuario
- Reporte

### 2.4 Insertar Datos de Prueba

```sql
-- En SSMS, abrir archivo: sql/inserts.sql
-- Presionar F5 o click en "Execute"

-- Verificar inserción
SELECT 'Empresas' AS Tabla, COUNT(*) AS Total FROM Empresa
UNION ALL
SELECT 'Vehiculos', COUNT(*) FROM Vehiculo
UNION ALL
SELECT 'Tecnicos', COUNT(*) FROM Tecnico
UNION ALL
SELECT 'Mantenimientos', COUNT(*) FROM Mantenimiento;
```

**Resultado esperado:**
- Empresas: 4
- Vehiculos: 12
- Tecnicos: 6
- Mantenimientos: 16

### 2.5 Probar Procedimientos Almacenados

```sql
-- Probar registro de vehículo
EXEC sp_RegistrarVehiculo 
    @EmpresaID = 1,
    @Placa = 'TEST-001',
    @Marca = 'Toyota',
    @Modelo = 'Corolla',
    @Anio = 2024,
    @Tipo = 'Auto',
    @Kilometraje = 0;

-- Verificar
SELECT * FROM Vehiculo WHERE Placa = 'TEST-001';
```

### 2.6 Probar Vistas

```sql
-- Vista de resumen por empresa
SELECT * FROM vw_ResumenFlotaPorEmpresa;

-- Vista de costos por vehículo
SELECT TOP 5 * 
FROM vw_CostosMantenimientoPorVehiculo 
ORDER BY CostoTotal DESC;
```

---

## 📊 Paso 3: Implementación MongoDB

### 3.1 Iniciar MongoDB

```bash
# Windows (PowerShell como Administrador)
net start MongoDB

# O iniciar manualmente
mongod --dbpath "C:\data\db"
```

### 3.2 Conectarse con mongosh

```bash
# Abrir nueva terminal
mongosh

# Debe mostrar:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017
```

### 3.3 Ejecutar Script de Colecciones

```javascript
// En mongosh
load("C:/Users/amaro/Documents/FINALDBD/nosql/collections.js")

// Verificar creación
use flotia_nosql
show collections

// Debe mostrar:
// empresas
// vehiculos
// mantenimientos
// usuarios
// alertas_predictivas
```

### 3.4 Verificar Validaciones JSON Schema

```javascript
// Ver validación de colección vehiculos
db.getCollectionInfos({name: "vehiculos"})[0].options.validator

// Probar validación (debe fallar)
db.vehiculos.insertOne({
    placa: "TEST-999"
    // Falta empresa_id, marca, modelo (requeridos)
})

// Error esperado: Document failed validation
```

### 3.5 Verificar Índices

```javascript
// Ver índices de mantenimientos
db.mantenimientos.getIndexes()

// Debe mostrar índices en:
// - vehiculo_id
// - fecha
// - tipo
// - falla.categoria
```

### 3.6 Ejecutar Consultas Analíticas

```javascript
// Ejecutar todas las consultas
load("C:/Users/amaro/Documents/FINALDBD/nosql/queries.js")

// O ejecutar consultas individuales
// Consulta 1: Fallas recurrentes
db.mantenimientos.aggregate([
  { $group: { _id: "$falla.descripcion", total: { $sum: 1 } } },
  { $match: { total: { $gte: 3 } } }
])
```

### 3.7 Usar MongoDB Compass (Interfaz Gráfica)

1. Abrir MongoDB Compass
2. Conectar a: `mongodb://localhost:27017`
3. Seleccionar base de datos: `flotia_nosql`
4. Explorar colecciones y documentos
5. Ejecutar consultas en la pestaña "Aggregations"

---

## 🎨 Paso 4: Crear Diagramas

### 4.1 Diagrama ERD (ERD Editor)

**Opción A: VS Code Extension**

1. Instalar extensión "ERD Editor" en VS Code
2. Crear nuevo archivo: `diagramas/ERD_FlotIA.vuerd.json`
3. Abrir con ERD Editor
4. Crear entidades:
   - Empresa (EmpresaID PK, RazonSocial, RUC, ...)
   - Vehiculo (VehiculoID PK, EmpresaID FK, Placa, ...)
   - Mantenimiento (MantenimientoID PK, VehiculoID FK, TecnicoID FK, ...)
   - etc.
5. Crear relaciones:
   - Empresa 1:N Vehiculo
   - Vehiculo 1:N Mantenimiento
   - Tecnico 1:N Mantenimiento
6. Exportar como imagen: Click derecho → Export → PNG

**Opción B: draw.io**

1. Ir a https://app.diagrams.net/
2. Crear nuevo diagrama → Entity Relation
3. Diseñar ERD según modelo
4. Exportar como PNG/PDF

### 4.2 Diagrama Documental (Hackolade)

1. Abrir Hackolade
2. File → New Model → MongoDB
3. Crear base de datos: `flotia_nosql`
4. Crear colecciones:
   - **empresas**
     - razon_social (string, required)
     - ruc (string, required, pattern: ^[0-9]{11}$)
     - sector (string, required)
   - **vehiculos**
     - placa (string, required)
     - empresa_id (objectId, required)
     - componentes (array, embedded)
   - **mantenimientos**
     - vehiculo_id (objectId, required, reference)
     - falla (object)
5. Aplicar patrones:
   - Embedded: componentes en vehiculos
   - Reference: vehiculo_id en mantenimientos
6. Exportar: File → Export → PDF

---

## 📸 Paso 5: Capturar Evidencias

### 5.1 Evidencias SQL Server

Crear carpeta: `docs/evidencias/sql/`

**Capturas requeridas:**

1. `sql_01_database.png` - Base de datos en Object Explorer
2. `sql_02_tables.png` - Lista de tablas
3. `sql_03_create_script.png` - Ejecución de create_tables.sql
4. `sql_04_insert_script.png` - Ejecución de inserts.sql
5. `sql_05_vista_resumen.png` - Resultado de vw_ResumenFlotaPorEmpresa
6. `sql_06_procedimiento.png` - Ejecución de sp_RegistrarVehiculo
7. `sql_07_indices.png` - Lista de índices creados

### 5.2 Evidencias MongoDB

Crear carpeta: `docs/evidencias/mongodb/`

**Capturas requeridas:**

1. `mongo_01_compass.png` - MongoDB Compass con base flotia_nosql
2. `mongo_02_collections.png` - Lista de colecciones
3. `mongo_03_validation.png` - JSON Schema de validación
4. `mongo_04_indices.png` - Índices creados
5. `mongo_05_query_fallas.png` - Resultado consulta fallas recurrentes
6. `mongo_06_query_costos.png` - Resultado consulta costos por vehículo
7. `mongo_07_query_tecnicos.png` - Resultado consulta rendimiento técnicos
8. `mongo_08_query_componentes.png` - Resultado consulta componentes críticos

### 5.3 Evidencias Diagramas

Crear carpeta: `docs/evidencias/diagramas/`

1. `erd_fisico.png` - Diagrama ERD completo
2. `hackolade_modelo.png` - Diagrama Hackolade
3. `hackolade_validacion.png` - Detalle de validaciones

### 5.4 Evidencias Git

Crear carpeta: `docs/evidencias/git/`

1. `git_01_commits.png` - Lista de commits con Conventional Commits
2. `git_02_estructura.png` - Estructura de carpetas en GitHub
3. `git_03_readme.png` - README.md en GitHub

---

## 🎥 Paso 6: Grabar Videos

### 6.1 Video de Exposición (10-15 minutos)

**Estructura sugerida:**

1. **Introducción (1 min)**
   - Presentación del equipo
   - Problema a resolver
   - Solución propuesta

2. **Arquitectura (2 min)**
   - Explicar enfoque híbrido
   - Mostrar diagrama ERD
   - Mostrar diagrama Hackolade

3. **Demostración SQL Server (4 min)**
   - Mostrar base de datos en SSMS
   - Ejecutar create_tables.sql
   - Ejecutar inserts.sql
   - Mostrar procedimientos almacenados
   - Ejecutar consultas en vistas

4. **Demostración MongoDB (4 min)**
   - Mostrar colecciones en Compass
   - Explicar validaciones JSON Schema
   - Ejecutar consultas analíticas
   - Mostrar resultados

5. **Patrones NoSQL (2 min)**
   - Embedded Pattern (componentes)
   - Reference Pattern (mantenimientos)
   - Subset Pattern (resumen)

6. **Conclusiones (2 min)**
   - Aprendizajes clave
   - Ventajas del enfoque híbrido
   - Trabajo futuro

**Herramientas de grabación:**
- OBS Studio (gratuito)
- Zoom (grabar reunión)
- Loom
- Microsoft PowerPoint (grabar presentación)

### 6.2 Video About-the-Team (3-5 minutos)

**Contenido:**

1. Presentación individual de cada integrante (30 seg c/u)
   - Nombre, código, carrera
   - Rol en el proyecto
   - Aprendizaje principal

2. Dinámica de trabajo (1 min)
   - Cómo se organizaron
   - Herramientas de colaboración
   - Desafíos enfrentados

3. Reflexiones finales (1 min)
   - Experiencia del trabajo en equipo
   - Aplicación práctica de conocimientos
   - Mensaje final

---

## 📝 Paso 7: Documentación

### 7.1 Capítulo III - Marco Teórico

**Contenido sugerido:**

1. Bases de Datos Relacionales
   - Modelo relacional
   - Normalización
   - Integridad referencial
   - SQL Server

2. Bases de Datos No Relacionales
   - Modelo documental
   - MongoDB
   - JSON y BSON
   - Patrones de diseño NoSQL

3. Arquitectura Híbrida
   - Ventajas y desventajas
   - Casos de uso
   - Integración de modelos

### 7.2 Capítulo IV - Desarrollo del Proyecto

**Contenido sugerido:**

1. Análisis de Requerimientos
   - Requerimientos funcionales
   - Requerimientos no funcionales

2. Diseño de Base de Datos
   - Diagrama ERD
   - Diagrama documental
   - Justificación de decisiones

3. Implementación
   - Scripts SQL Server
   - Scripts MongoDB
   - Procedimientos y funciones

4. Pruebas y Validación
   - Casos de prueba
   - Resultados obtenidos
   - Evidencias

5. Conclusiones y Recomendaciones

---

## 🔄 Paso 8: Control de Versiones (Git)

### 8.1 Inicializar Repositorio

```bash
cd C:\Users\amaro\Documents\FINALDBD

# Inicializar Git
git init

# Agregar archivos
git add .

# Primer commit
git commit -m "feat: estructura inicial del proyecto FlotIA"
```

### 8.2 Crear Repositorio en GitHub

1. Ir a https://github.com
2. Click en "New repository"
3. Nombre: `flotia-db-proyecto`
4. Descripción: "Sistema de Gestión Inteligente de Flotas - Proyecto Híbrido"
5. Público o Privado (según preferencia)
6. NO inicializar con README (ya lo tenemos)
7. Click "Create repository"

### 8.3 Conectar y Subir

```bash
# Agregar remote
git remote add origin https://github.com/tu-usuario/flotia-db-proyecto.git

# Subir código
git branch -M main
git push -u origin main
```

### 8.4 Commits con Conventional Commits

```bash
# Ejemplos de commits correctos

git add sql/create_tables.sql
git commit -m "feat: creación de tablas y procedimientos SQL Server"

git add nosql/collections.js
git commit -m "feat: creación de colecciones MongoDB con validación"

git add diagramas/ERD_Fisico.png
git commit -m "docs: agregado diagrama ERD físico"

git add sql/inserts.sql
git commit -m "feat: datos de prueba para SQL Server"

git add nosql/queries.js
git commit -m "feat: consultas analíticas MongoDB"

git add README.md
git commit -m "docs: documentación completa del proyecto"

git add .gitignore
git commit -m "chore: configuración de gitignore"
```

---

## ✅ Checklist Final

### Antes de Entregar

- [ ] SQL Server
  - [ ] Base de datos FlotIA_DB creada
  - [ ] 8 tablas creadas correctamente
  - [ ] Datos de prueba insertados
  - [ ] 4 procedimientos almacenados funcionando
  - [ ] 2 vistas creadas
  - [ ] 2 funciones creadas
  - [ ] Índices creados

- [ ] MongoDB
  - [ ] Base de datos flotia_nosql creada
  - [ ] 5 colecciones con validación JSON Schema
  - [ ] Índices creados
  - [ ] Datos de prueba insertados
  - [ ] Mínimo 8 consultas funcionando

- [ ] Diagramas
  - [ ] ERD físico en ERD Editor
  - [ ] Diagrama documental en Hackolade
  - [ ] Exportados a PNG/PDF

- [ ] Evidencias
  - [ ] Mínimo 7 capturas SQL Server
  - [ ] Mínimo 8 capturas MongoDB
  - [ ] Capturas de diagramas
  - [ ] Capturas de Git/GitHub

- [ ] Videos
  - [ ] Video exposición (10-15 min)
  - [ ] Video About-the-Team (3-5 min)
  - [ ] Subidos a YouTube/Drive

- [ ] Documentación
  - [ ] Capítulo III completo
  - [ ] Capítulo IV completo
  - [ ] README.md actualizado

- [ ] Git/GitHub
  - [ ] Repositorio creado
  - [ ] Estructura de carpetas correcta
  - [ ] Commits con Conventional Commits
  - [ ] .gitignore configurado

---

## 🆘 Solución de Problemas

### SQL Server

**Problema:** No puedo conectarme a SQL Server

**Solución:**
```bash
# Verificar servicio
services.msc → SQL Server → Iniciar

# Probar diferentes nombres de servidor:
localhost
.\SQLEXPRESS
(localdb)\MSSQLLocalDB
127.0.0.1
```

**Problema:** Error "Database already exists"

**Solución:**
```sql
-- Eliminar base de datos existente
USE master;
GO
DROP DATABASE FlotIA_DB;
GO
-- Volver a ejecutar create_tables.sql
```

### MongoDB

**Problema:** MongoDB no inicia

**Solución:**
```bash
# Crear carpeta de datos
mkdir C:\data\db

# Iniciar con ruta específica
mongod --dbpath "C:\data\db"
```

**Problema:** Error de validación al insertar

**Solución:**
```javascript
// Verificar que todos los campos requeridos estén presentes
// Verificar tipos de datos (string, int, objectId, etc.)
// Ver validación de la colección
db.getCollectionInfos({name: "nombre_coleccion"})
```

---

## 📞 Soporte

Si tienes problemas durante la implementación:

1. Revisar esta guía paso a paso
2. Consultar documentación oficial
3. Revisar mensajes de error específicos
4. Contactar al equipo de desarrollo

---

**¡Éxito en tu implementación!** 🚀
