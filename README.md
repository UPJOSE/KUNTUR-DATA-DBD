# 🚛 FlotIA - Sistema de Gestion Inteligente de Flotas

**Startup:** KunturData  
**Proyecto:** Sistema Hibrido de Base de Datos  
**Tecnologias:** SQL Server + MongoDB

---

## 📋 Tabla de Contenidos

- [Descripcion del Proyecto](#descripcion-del-proyecto)
- [Arquitectura Hibrida](#arquitectura-hibrida)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalacion y Configuracion](#instalacion-y-configuracion)
- [Modelo Relacional (SQL Server)](#modelo-relacional-sql-server)
- [Modelo No Relacional (MongoDB)](#modelo-no-relacional-mongodb)
- [Consultas Implementadas](#consultas-implementadas)
- [Evidencias y Capturas](#evidencias-y-capturas)
- [Equipo de Desarrollo](#equipo-de-desarrollo)

---

## 🎯 Descripcion del Proyecto

**FlotIA** es un sistema de gestion inteligente de flotas vehiculares que implementa una arquitectura hibrida combinando bases de datos relacionales (SQL Server) y no relacionales (MongoDB) para optimizar el almacenamiento, consulta y analisis de datos de mantenimiento vehicular.

### Objetivos

- ✅ Gestionar eficientemente flotas vehiculares de multiples empresas
- ✅ Registrar y analizar mantenimientos preventivos, correctivos y predictivos
- ✅ Identificar fallas recurrentes mediante analisis de datos historicos
- ✅ Generar alertas predictivas basadas en patrones de uso
- ✅ Optimizar costos de mantenimiento mediante analisis inteligente

---

## 🏗️ Arquitectura Hibrida

### Modelo Relacional (SQL Server)

**Uso:** Gestion estructurada de entidades maestras con integridad referencial

**Entidades:**
- `Empresa` - Datos de empresas clientes
- `Vehiculo` - Informacion de vehiculos de la flota
- `Tecnico` - Personal tecnico de mantenimiento
- `Componente` - Componentes de vehiculos
- `Mantenimiento` - Registros transaccionales de mantenimientos
- `PlanMantenimiento` - Programacion de mantenimientos
- `Usuario` - Usuarios del sistema
- `Reporte` - Reportes generados

### Modelo No Relacional (MongoDB)

**Uso:** Analisis masivo de datos, historial y escalabilidad IoT

**Colecciones:**
- `empresas` - Datos empresariales con validacion
- `vehiculos` - Vehiculos con componentes embebidos (Embedded Pattern)
- `mantenimientos` - Historial completo con referencias (Reference Pattern)
- `usuarios` - Gestion de usuarios y permisos
- `alertas_predictivas` - Sistema de alertas inteligentes

**Patrones NoSQL Aplicados:**
- **Embedded Pattern:** Componentes dentro de vehiculos
- **Reference Pattern:** Mantenimientos → vehiculo_id
- **Subset Pattern:** Resumen de mantenimientos en vehiculos

---

## 📁 Estructura del Proyecto

```
FINALDBD/
│
├── sql/
│   ├── create_tables.sql      # Creacion de tablas, indices, procedimientos
│   └── inserts.sql            # Datos de prueba
│
├── nosql/
│   ├── collections.js         # Creacion de colecciones con validacion
│   └── queries.js             # Consultas analiticas (8+ consultas)
│
├── diagramas/
│   ├── ERD_Fisico.png         # Diagrama ERD (ERD Editor)
│   └── Hackolade_FlotIA.pdf   # Diagrama documental MongoDB
│
├── docs/
│   ├── Capitulo_III.docx      # Documentacion tecnica
│   ├── Capitulo_IV.docx       # Analisis y resultados
│   └── evidencias/            # Capturas de pantalla
│
├── .gitignore
└── README.md
```

---

## 🚀 Instalacion y Configuracion

### Requisitos Previos

- **SQL Server 2019+** (Express, Developer o Enterprise)
- **MongoDB 6.0+** (Community o Enterprise)
- **SQL Server Management Studio (SSMS)**
- **MongoDB Compass** o **mongosh**
- **Git** para control de versiones

### Paso 1: Configurar SQL Server

```bash
# 1. Abrir SQL Server Management Studio (SSMS)
# 2. Conectarse al servidor local

# 3. Ejecutar script de creacion
# Abrir: sql/create_tables.sql
# Ejecutar (F5)

# 4. Ejecutar script de datos
# Abrir: sql/inserts.sql
# Ejecutar (F5)

# 5. Verificar creacion
USE FlotIA_DB;
GO
SELECT * FROM vw_ResumenFlotaPorEmpresa;
```

### Paso 2: Configurar MongoDB

```bash
# 1. Iniciar MongoDB
mongod

# 2. Conectarse con mongosh
mongosh

# 3. Ejecutar script de colecciones
load("C:/Users/amaro/Documents/FINALDBD/nosql/collections.js")

# 4. Ejecutar consultas analiticas
load("C:/Users/amaro/Documents/FINALDBD/nosql/queries.js")

# 5. Verificar en MongoDB Compass
# Conectar a: mongodb://localhost:27017
# Base de datos: flotia_nosql
```

---

## 🗄️ Modelo Relacional (SQL Server)

### Diagrama ERD

El diagrama ERD fisico se encuentra en: `diagramas/ERD_Fisico.png`

### Tablas Principales

| Tabla | Descripcion | Registros |
|-------|-------------|-----------|
| `Empresa` | Empresas clientes | 4 |
| `Vehiculo` | Vehiculos de flota | 12 |
| `Tecnico` | Personal tecnico | 6 |
| `Mantenimiento` | Historial de mantenimientos | 16 |
| `Componente` | Componentes vehiculares | 10 |

### Procedimientos Almacenados

- `sp_RegistrarVehiculo` - Registrar nuevo vehiculo
- `sp_RegistrarMantenimiento` - Registrar mantenimiento
- `sp_ActualizarKilometraje` - Actualizar kilometraje
- `sp_ObtenerHistorialMantenimiento` - Consultar historial

### Vistas Analiticas

- `vw_ResumenFlotaPorEmpresa` - Resumen de flota por empresa
- `vw_CostosMantenimientoPorVehiculo` - Costos por vehiculo

### Funciones

- `fn_CostoTotalMantenimiento` - Calcular costo total
- `fn_TieneMantenimientoPendiente` - Verificar mantenimientos pendientes

---

## 📊 Modelo No Relacional (MongoDB)

### Diagrama Documental

El diagrama Hackolade se encuentra en: `diagramas/Hackolade_FlotIA.pdf`

### Validaciones JSON Schema

Todas las colecciones implementan validacion estricta:

```javascript
// Ejemplo: Validacion de vehiculos
{
  bsonType: "object",
  required: ["placa", "empresa_id", "marca", "modelo"],
  properties: {
    placa: { bsonType: "string" },
    estado_operativo: {
      enum: ["Operativo", "En mantenimiento", "Fuera de servicio"]
    }
  }
}
```

### Indices Creados

```javascript
// Indices para optimizacion de consultas
db.vehiculos.createIndex({ "placa": 1 }, { unique: true });
db.mantenimientos.createIndex({ "vehiculo_id": 1, "fecha": -1 });
db.mantenimientos.createIndex({ "falla.categoria": 1 });
```

---

## 🔍 Consultas Implementadas

### Consultas Obligatorias (Minimo 2 por integrante)

#### Integrante 1

1. **Fallas Recurrentes** - Identificar fallas con 3+ ocurrencias
2. **Costo Total por Vehiculo** - Analisis de gastos por vehiculo

#### Integrante 2

3. **Vehiculos Problematicos** - Mayor frecuencia de mantenimiento correctivo
4. **Costos por Categoria de Falla** - Analisis por tipo de falla

#### Integrante 3

5. **Rendimiento de Tecnicos** - Evaluacion de desempeno tecnico
6. **Distribucion por Estado** - Vehiculos por empresa y estado operativo

#### Integrante 4

7. **Componentes Criticos** - Componentes en mal estado
8. **Tendencia Temporal** - Mantenimientos por mes

### Consultas Avanzadas

- **ROI Negativo** - Vehiculos con mayor costo vs antigüedad
- **Dashboard de Alertas** - Alertas pendientes por prioridad

---

## 📸 Evidencias y Capturas

### Checklist de Evidencias Requeridas

#### SQL Server

- [ ] Captura de SSMS mostrando base de datos `FlotIA_DB`
- [ ] Captura de tablas creadas (Object Explorer)
- [ ] Captura de ejecucion de `create_tables.sql`
- [ ] Captura de ejecucion de `inserts.sql`
- [ ] Captura de resultados de vista `vw_ResumenFlotaPorEmpresa`
- [ ] Captura de ejecucion de procedimiento `sp_RegistrarVehiculo`
- [ ] Captura de diagrama ERD en ERD Editor

#### MongoDB

- [ ] Captura de MongoDB Compass mostrando base `flotia_nosql`
- [ ] Captura de colecciones creadas
- [ ] Captura de validacion JSON Schema en una coleccion
- [ ] Captura de indices creados
- [ ] Captura de ejecucion de `collections.js`
- [ ] Captura de resultados de consulta "Fallas Recurrentes"
- [ ] Captura de resultados de consulta "Costo Total por Vehiculo"
- [ ] Captura de diagrama Hackolade

#### Git/GitHub

- [ ] Captura de repositorio GitHub con estructura de carpetas
- [ ] Captura de commits con Conventional Commits
- [ ] Captura de archivo `.gitignore`

### Ubicacion de Evidencias

Guardar todas las capturas en: `docs/evidencias/`

Nomenclatura sugerida:
- `sql_01_database.png`
- `sql_02_tables.png`
- `mongo_01_collections.png`
- `mongo_02_query_fallas.png`
- `git_01_commits.png`

---

## 🎥 Videos Requeridos

### Video 1: Exposicion del Proyecto (10-15 min)

**Contenido:**
1. Introduccion al problema y solucion
2. Demostracion de arquitectura hibrida
3. Ejecucion de scripts SQL Server
4. Ejecucion de scripts MongoDB
5. Demostracion de consultas analiticas
6. Conclusiones y aprendizajes

### Video 2: About-the-Team (3-5 min)

**Contenido:**
1. Presentacion de cada integrante
2. Roles y responsabilidades
3. Experiencia del trabajo en equipo
4. Reflexiones finales

---

## 👥 Equipo de Desarrollo

### Integrante 1
- **Nombre:** [Nombre Completo]
- **Codigo:** [Codigo Estudiante]
- **Responsabilidades:** 
  - Diseno del modelo relacional
  - Consultas de fallas recurrentes y costos

### Integrante 2
- **Nombre:** [Nombre Completo]
- **Codigo:** [Codigo Estudiante]
- **Responsabilidades:**
  - Implementacion de procedimientos almacenados
  - Analisis de vehiculos problematicos

### Integrante 3
- **Nombre:** [Nombre Completo]
- **Codigo:** [Codigo Estudiante]
- **Responsabilidades:**
  - Diseno del modelo no relacional
  - Analisis de rendimiento de tecnicos

### Integrante 4
- **Nombre:** [Nombre Completo]
- **Codigo:** [Codigo Estudiante]
- **Responsabilidades:**
  - Implementacion de validaciones MongoDB
  - Analisis de componentes criticos

---

## 📝 Control de Versiones

### Conventional Commits

Este proyecto utiliza el estandar de Conventional Commits:

```bash
# Ejemplos de commits
feat: creacion de coleccion mantenimientos con validacion
fix: correccion validacion JSON en vehiculos
docs: agregado diagrama ERD fisico
refactor: optimizacion de indices en MongoDB
test: agregadas consultas de verificacion
```

### Tipos de Commits

- `feat:` Nueva funcionalidad
- `fix:` Correccion de errores
- `docs:` Documentacion
- `refactor:` Refactorizacion de codigo
- `test:` Pruebas
- `chore:` Tareas de mantenimiento

---

## 🔧 Comandos Utiles

### SQL Server

```sql
-- Ver todas las tablas
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';

-- Ver procedimientos almacenados
SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE';

-- Ejecutar procedimiento
EXEC sp_RegistrarVehiculo @EmpresaID=1, @Placa='XYZ-999', @Marca='Toyota', @Modelo='Corolla', @Anio=2023, @Tipo='Auto', @Kilometraje=0;

-- Ver vistas
SELECT * FROM vw_ResumenFlotaPorEmpresa;
```

### MongoDB

```javascript
// Ver colecciones
show collections

// Contar documentos
db.vehiculos.countDocuments()

// Ver validacion de coleccion
db.getCollectionInfos({name: "vehiculos"})

// Ejecutar consulta
db.mantenimientos.aggregate([
  { $group: { _id: "$falla.descripcion", total: { $sum: 1 } } }
])
```

---

## 📚 Recursos y Referencias

### Documentacion Oficial

- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Conventional Commits](https://www.conventionalcommits.org/)

### Herramientas

- [ERD Editor (VS Code Extension)](https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode)
- [Hackolade](https://hackolade.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/)

---

## ✅ Checklist de Entregables TF1

### Diagramas
- [ ] ERD fisico creado en ERD Editor
- [ ] Diagrama documental creado en Hackolade
- [ ] Ambos diagramas exportados a PDF/PNG

### Scripts
- [ ] `create_tables.sql` completo y funcional
- [ ] `inserts.sql` con datos de prueba
- [ ] `collections.js` con validaciones JSON
- [ ] `queries.js` con minimo 8 consultas

### Documentacion
- [ ] Capitulo III completo
- [ ] Capitulo IV completo
- [ ] README.md actualizado
- [ ] Evidencias capturadas

### Videos
- [ ] Video de exposicion (10-15 min)
- [ ] Video About-the-Team (3-5 min)

### Repositorio
- [ ] GitHub con estructura organizada
- [ ] Commits con Conventional Commits
- [ ] `.gitignore` configurado
- [ ] README completo

---

## 📞 Contacto

**Startup:** KunturData  
**Email:** contacto@kunturdata.com  
**GitHub:** [github.com/kunturdata/flotia](https://github.com/kunturdata/flotia)

---

## 📄 Licencia

Este proyecto es parte de un trabajo academico para el curso de Fundamentos de Base de Datos.

---

**Ultima actualizacion:** Marzo 2024  
**Version:** 1.0.0
