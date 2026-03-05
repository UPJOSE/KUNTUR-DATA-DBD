# 📘 Guia de Implementacion - FlotIA

## 🎯 Objetivo

Esta guia proporciona instrucciones paso a paso para implementar el sistema FlotIA desde cero, cumpliendo con todos los requisitos del proyecto TF1.

---

## 📋 Pre-requisitos

### Software Requerido

1. **SQL Server 2019+**
   - Descargar: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
   - Version recomendada: Developer Edition (gratuita)

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
   - Version Community (gratuita) es suficiente

---

## 🚀 Paso 1: Configuracion Inicial

### 1.1 Clonar o Descargar el Proyecto

```bash
# Opcion A: Clonar desde GitHub (si ya esta en repositorio)
git clone https://github.com/tu-usuario/flotia.git
cd flotia

# Opcion B: Crear estructura desde cero
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

## 🗄️ Paso 2: Implementacion SQL Server

### 2.1 Iniciar SQL Server

```bash
# Verificar que SQL Server este corriendo
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

### 2.3 Ejecutar Script de Creacion

```sql
-- En SSMS, abrir archivo: sql/create_tables.sql
-- Presionar F5 o click en "Execute"

-- Verificar creacion exitosa
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

-- Verificar insercion
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
-- Probar registro de vehiculo
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

-- Vista de costos por vehiculo
SELECT TOP 5 * 
FROM vw_CostosMantenimientoPorVehiculo 
ORDER BY CostoTotal DESC;
```

---

## 📊 Paso 3: Implementacion MongoDB

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

// Verificar creacion
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
// Ver validacion de coleccion vehiculos
db.getCollectionInfos({name: "vehiculos"})[0].options.validator

// Probar validacion (debe fallar)
db.vehiculos.insertOne({
    placa: "TEST-999"
    // Falta empresa_id, marca, modelo (requeridos)
})

// Error esperado: Document failed validation
```

### 3.5 Verificar Indices

```javascript
// Ver indices de mantenimientos
db.mantenimientos.getIndexes()

// Debe mostrar indices en:
// - vehiculo_id
// - fecha
// - tipo
// - falla.categoria
```

### 3.6 Ejecutar Consultas Analiticas

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

### 3.7 Usar MongoDB Compass (Interfaz Grafica)

1. Abrir MongoDB Compass
2. Conectar a: `mongodb://localhost:27017`
3. Seleccionar base de datos: `flotia_nosql`
4. Explorar colecciones y documentos
5. Ejecutar consultas en la pestana "Aggregations"

---

## 🎨 Paso 4: Crear Diagramas

### 4.1 Diagrama ERD (ERD Editor)

**Opcion A: VS Code Extension**

1. Instalar extension "ERD Editor" en VS Code
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

**Opcion B: draw.io**

1. Ir a https://app.diagrams.net/
2. Crear nuevo diagrama → Entity Relation
3. Disenar ERD segun modelo
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
3. `sql_03_create_script.png` - Ejecucion de create_tables.sql
4. `sql_04_insert_script.png` - Ejecucion de inserts.sql
5. `sql_05_vista_resumen.png` - Resultado de vw_ResumenFlotaPorEmpresa
6. `sql_06_procedimiento.png` - Ejecucion de sp_RegistrarVehiculo
7. `sql_07_indices.png` - Lista de indices creados

### 5.2 Evidencias MongoDB

Crear carpeta: `docs/evidencias/mongodb/`

**Capturas requeridas:**

1. `mongo_01_compass.png` - MongoDB Compass con base flotia_nosql
2. `mongo_02_collections.png` - Lista de colecciones
3. `mongo_03_validation.png` - JSON Schema de validacion
4. `mongo_04_indices.png` - Indices creados
5. `mongo_05_query_fallas.png` - Resultado consulta fallas recurrentes
6. `mongo_06_query_costos.png` - Resultado consulta costos por vehiculo
7. `mongo_07_query_tecnicos.png` - Resultado consulta rendimiento tecnicos
8. `mongo_08_query_componentes.png` - Resultado consulta componentes criticos

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

### 6.1 Video de Exposicion (10-15 minutos)

**Estructura sugerida:**

1. **Introduccion (1 min)**
   - Presentacion del equipo
   - Problema a resolver
   - Solucion propuesta

2. **Arquitectura (2 min)**
   - Explicar enfoque hibrido
   - Mostrar diagrama ERD
   - Mostrar diagrama Hackolade

3. **Demostracion SQL Server (4 min)**
   - Mostrar base de datos en SSMS
   - Ejecutar create_tables.sql
   - Ejecutar inserts.sql
   - Mostrar procedimientos almacenados
   - Ejecutar consultas en vistas

4. **Demostracion MongoDB (4 min)**
   - Mostrar colecciones en Compass
   - Explicar validaciones JSON Schema
   - Ejecutar consultas analiticas
   - Mostrar resultados

5. **Patrones NoSQL (2 min)**
   - Embedded Pattern (componentes)
   - Reference Pattern (mantenimientos)
   - Subset Pattern (resumen)

6. **Conclusiones (2 min)**
   - Aprendizajes clave
   - Ventajas del enfoque hibrido
   - Trabajo futuro

**Herramientas de grabacion:**
- OBS Studio (gratuito)
- Zoom (grabar reunion)
- Loom
- Microsoft PowerPoint (grabar presentacion)

### 6.2 Video About-the-Team (3-5 minutos)

**Contenido:**

1. Presentacion individual de cada integrante (30 seg c/u)
   - Nombre, codigo, carrera
   - Rol en el proyecto
   - Aprendizaje principal

2. Dinamica de trabajo (1 min)
   - Como se organizaron
   - Herramientas de colaboracion
   - Desafios enfrentados

3. Reflexiones finales (1 min)
   - Experiencia del trabajo en equipo
   - Aplicacion practica de conocimientos
   - Mensaje final

---

## 📝 Paso 7: Documentacion

### 7.1 Capitulo III - Marco Teorico

**Contenido sugerido:**

1. Bases de Datos Relacionales
   - Modelo relacional
   - Normalizacion
   - Integridad referencial
   - SQL Server

2. Bases de Datos No Relacionales
   - Modelo documental
   - MongoDB
   - JSON y BSON
   - Patrones de diseno NoSQL

3. Arquitectura Hibrida
   - Ventajas y desventajas
   - Casos de uso
   - Integracion de modelos

### 7.2 Capitulo IV - Desarrollo del Proyecto

**Contenido sugerido:**

1. Analisis de Requerimientos
   - Requerimientos funcionales
   - Requerimientos no funcionales

2. Diseno de Base de Datos
   - Diagrama ERD
   - Diagrama documental
   - Justificacion de decisiones

3. Implementacion
   - Scripts SQL Server
   - Scripts MongoDB
   - Procedimientos y funciones

4. Pruebas y Validacion
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
4. Descripcion: "Sistema de Gestion Inteligente de Flotas - Proyecto Hibrido"
5. Publico o Privado (segun preferencia)
6. NO inicializar con README (ya lo tenemos)
7. Click "Create repository"

### 8.3 Conectar y Subir

```bash
# Agregar remote
git remote add origin https://github.com/tu-usuario/flotia-db-proyecto.git

# Subir codigo
git branch -M main
git push -u origin main
```

### 8.4 Commits con Conventional Commits

```bash
# Ejemplos de commits correctos

git add sql/create_tables.sql
git commit -m "feat: creacion de tablas y procedimientos SQL Server"

git add nosql/collections.js
git commit -m "feat: creacion de colecciones MongoDB con validacion"

git add diagramas/ERD_Fisico.png
git commit -m "docs: agregado diagrama ERD fisico"

git add sql/inserts.sql
git commit -m "feat: datos de prueba para SQL Server"

git add nosql/queries.js
git commit -m "feat: consultas analiticas MongoDB"

git add README.md
git commit -m "docs: documentacion completa del proyecto"

git add .gitignore
git commit -m "chore: configuracion de gitignore"
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
  - [ ] Indices creados

- [ ] MongoDB
  - [ ] Base de datos flotia_nosql creada
  - [ ] 5 colecciones con validacion JSON Schema
  - [ ] Indices creados
  - [ ] Datos de prueba insertados
  - [ ] Minimo 8 consultas funcionando

- [ ] Diagramas
  - [ ] ERD fisico en ERD Editor
  - [ ] Diagrama documental en Hackolade
  - [ ] Exportados a PNG/PDF

- [ ] Evidencias
  - [ ] Minimo 7 capturas SQL Server
  - [ ] Minimo 8 capturas MongoDB
  - [ ] Capturas de diagramas
  - [ ] Capturas de Git/GitHub

- [ ] Videos
  - [ ] Video exposicion (10-15 min)
  - [ ] Video About-the-Team (3-5 min)
  - [ ] Subidos a YouTube/Drive

- [ ] Documentacion
  - [ ] Capitulo III completo
  - [ ] Capitulo IV completo
  - [ ] README.md actualizado

- [ ] Git/GitHub
  - [ ] Repositorio creado
  - [ ] Estructura de carpetas correcta
  - [ ] Commits con Conventional Commits
  - [ ] .gitignore configurado

---

## 🆘 Solucion de Problemas

### SQL Server

**Problema:** No puedo conectarme a SQL Server

**Solucion:**
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

**Solucion:**
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

**Solucion:**
```bash
# Crear carpeta de datos
mkdir C:\data\db

# Iniciar con ruta especifica
mongod --dbpath "C:\data\db"
```

**Problema:** Error de validacion al insertar

**Solucion:**
```javascript
// Verificar que todos los campos requeridos esten presentes
// Verificar tipos de datos (string, int, objectId, etc.)
// Ver validacion de la coleccion
db.getCollectionInfos({name: "nombre_coleccion"})
```

---

## 📞 Soporte

Si tienes problemas durante la implementacion:

1. Revisar esta guia paso a paso
2. Consultar documentacion oficial
3. Revisar mensajes de error especificos
4. Contactar al equipo de desarrollo

---

**Exito en tu implementacion!** 🚀
