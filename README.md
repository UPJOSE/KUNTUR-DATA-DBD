# 🚛 FlotIA - Sistema de Gestión Inteligente de Flotas

**Startup:** KunturData  
**Proyecto:** Sistema Híbrido de Base de Datos  
**Tecnologías:** SQL Server + MongoDB

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Arquitectura Híbrida](#arquitectura-híbrida)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Modelo Relacional (SQL Server)](#modelo-relacional-sql-server)
- [Modelo No Relacional (MongoDB)](#modelo-no-relacional-mongodb)
- [Consultas Implementadas](#consultas-implementadas)
- [Evidencias y Capturas](#evidencias-y-capturas)
- [Equipo de Desarrollo](#equipo-de-desarrollo)

---

## 🎯 Descripción del Proyecto

**FlotIA** es un sistema de gestión inteligente de flotas vehiculares que implementa una arquitectura híbrida combinando bases de datos relacionales (SQL Server) y no relacionales (MongoDB) para optimizar el almacenamiento, consulta y análisis de datos de mantenimiento vehicular.

### Objetivos

- ✅ Gestionar eficientemente flotas vehiculares de múltiples empresas
- ✅ Registrar y analizar mantenimientos preventivos, correctivos y predictivos
- ✅ Identificar fallas recurrentes mediante análisis de datos históricos
- ✅ Generar alertas predictivas basadas en patrones de uso
- ✅ Optimizar costos de mantenimiento mediante análisis inteligente

---

## 🏗️ Arquitectura Híbrida

### Modelo Relacional (SQL Server)

**Uso:** Gestión estructurada de entidades maestras con integridad referencial

**Entidades:**
- `Empresa` - Datos de empresas clientes
- `Vehiculo` - Información de vehículos de la flota
- `Tecnico` - Personal técnico de mantenimiento
- `Componente` - Componentes de vehículos
- `Mantenimiento` - Registros transaccionales de mantenimientos
- `PlanMantenimiento` - Programación de mantenimientos
- `Usuario` - Usuarios del sistema
- `Reporte` - Reportes generados

### Modelo No Relacional (MongoDB)

**Uso:** Análisis masivo de datos, historial y escalabilidad IoT

**Colecciones:**
- `empresas` - Datos empresariales con validación
- `vehiculos` - Vehículos con componentes embebidos (Embedded Pattern)
- `mantenimientos` - Historial completo con referencias (Reference Pattern)
- `usuarios` - Gestión de usuarios y permisos
- `alertas_predictivas` - Sistema de alertas inteligentes

**Patrones NoSQL Aplicados:**
- **Embedded Pattern:** Componentes dentro de vehículos
- **Reference Pattern:** Mantenimientos → vehiculo_id
- **Subset Pattern:** Resumen de mantenimientos en vehículos

---

## 📁 Estructura del Proyecto

```
FINALDBD/
│
├── sql/
│   ├── create_tables.sql      # Creación de tablas, índices, procedimientos
│   └── inserts.sql            # Datos de prueba
│
├── nosql/
│   ├── collections.js         # Creación de colecciones con validación
│   └── queries.js             # Consultas analíticas (8+ consultas)
│
├── diagramas/
│   ├── ERD_Fisico.png         # Diagrama ERD (ERD Editor)
│   └── Hackolade_FlotIA.pdf   # Diagrama documental MongoDB
│
├── docs/
│   ├── Capitulo_III.docx      # Documentación técnica
│   ├── Capitulo_IV.docx       # Análisis y resultados
│   └── evidencias/            # Capturas de pantalla
│
├── .gitignore
└── README.md
```

---

## 🚀 Instalación y Configuración

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

# 3. Ejecutar script de creación
# Abrir: sql/create_tables.sql
# Ejecutar (F5)

# 4. Ejecutar script de datos
# Abrir: sql/inserts.sql
# Ejecutar (F5)

# 5. Verificar creación
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

# 4. Ejecutar consultas analíticas
load("C:/Users/amaro/Documents/FINALDBD/nosql/queries.js")

# 5. Verificar en MongoDB Compass
# Conectar a: mongodb://localhost:27017
# Base de datos: flotia_nosql
```

---

## 🗄️ Modelo Relacional (SQL Server)

### Diagrama ERD

El diagrama ERD físico se encuentra en: `diagramas/ERD_Fisico.png`

### Tablas Principales

| Tabla | Descripción | Registros |
|-------|-------------|-----------|
| `Empresa` | Empresas clientes | 4 |
| `Vehiculo` | Vehículos de flota | 12 |
| `Tecnico` | Personal técnico | 6 |
| `Mantenimiento` | Historial de mantenimientos | 16 |
| `Componente` | Componentes vehiculares | 10 |

### Procedimientos Almacenados

- `sp_RegistrarVehiculo` - Registrar nuevo vehículo
- `sp_RegistrarMantenimiento` - Registrar mantenimiento
- `sp_ActualizarKilometraje` - Actualizar kilometraje
- `sp_ObtenerHistorialMantenimiento` - Consultar historial

### Vistas Analíticas

- `vw_ResumenFlotaPorEmpresa` - Resumen de flota por empresa
- `vw_CostosMantenimientoPorVehiculo` - Costos por vehículo

### Funciones

- `fn_CostoTotalMantenimiento` - Calcular costo total
- `fn_TieneMantenimientoPendiente` - Verificar mantenimientos pendientes

---

## 📊 Modelo No Relacional (MongoDB)

### Diagrama Documental

El diagrama Hackolade se encuentra en: `diagramas/Hackolade_FlotIA.pdf`

### Validaciones JSON Schema

Todas las colecciones implementan validación estricta:

```javascript
// Ejemplo: Validación de vehículos
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

### Índices Creados

```javascript
// Índices para optimización de consultas
db.vehiculos.createIndex({ "placa": 1 }, { unique: true });
db.mantenimientos.createIndex({ "vehiculo_id": 1, "fecha": -1 });
db.mantenimientos.createIndex({ "falla.categoria": 1 });
```

---

## 🔍 Consultas Implementadas

### Consultas Obligatorias (Mínimo 2 por integrante)

#### Integrante 1

1. **Fallas Recurrentes** - Identificar fallas con 3+ ocurrencias
2. **Costo Total por Vehículo** - Análisis de gastos por vehículo

#### Integrante 2

3. **Vehículos Problemáticos** - Mayor frecuencia de mantenimiento correctivo
4. **Costos por Categoría de Falla** - Análisis por tipo de falla

#### Integrante 3

5. **Rendimiento de Técnicos** - Evaluación de desempeño técnico
6. **Distribución por Estado** - Vehículos por empresa y estado operativo

#### Integrante 4

7. **Componentes Críticos** - Componentes en mal estado
8. **Tendencia Temporal** - Mantenimientos por mes

### Consultas Avanzadas

- **ROI Negativo** - Vehículos con mayor costo vs antigüedad
- **Dashboard de Alertas** - Alertas pendientes por prioridad

---

## 📸 Evidencias y Capturas

### Checklist de Evidencias Requeridas

#### SQL Server

- [ ] Captura de SSMS mostrando base de datos `FlotIA_DB`
- [ ] Captura de tablas creadas (Object Explorer)
- [ ] Captura de ejecución de `create_tables.sql`
- [ ] Captura de ejecución de `inserts.sql`
- [ ] Captura de resultados de vista `vw_ResumenFlotaPorEmpresa`
- [ ] Captura de ejecución de procedimiento `sp_RegistrarVehiculo`
- [ ] Captura de diagrama ERD en ERD Editor

#### MongoDB

- [ ] Captura de MongoDB Compass mostrando base `flotia_nosql`
- [ ] Captura de colecciones creadas
- [ ] Captura de validación JSON Schema en una colección
- [ ] Captura de índices creados
- [ ] Captura de ejecución de `collections.js`
- [ ] Captura de resultados de consulta "Fallas Recurrentes"
- [ ] Captura de resultados de consulta "Costo Total por Vehículo"
- [ ] Captura de diagrama Hackolade

#### Git/GitHub

- [ ] Captura de repositorio GitHub con estructura de carpetas
- [ ] Captura de commits con Conventional Commits
- [ ] Captura de archivo `.gitignore`

### Ubicación de Evidencias

Guardar todas las capturas en: `docs/evidencias/`

Nomenclatura sugerida:
- `sql_01_database.png`
- `sql_02_tables.png`
- `mongo_01_collections.png`
- `mongo_02_query_fallas.png`
- `git_01_commits.png`

---

## 🎥 Videos Requeridos

### Video 1: Exposición del Proyecto (10-15 min)

**Contenido:**
1. Introducción al problema y solución
2. Demostración de arquitectura híbrida
3. Ejecución de scripts SQL Server
4. Ejecución de scripts MongoDB
5. Demostración de consultas analíticas
6. Conclusiones y aprendizajes

### Video 2: About-the-Team (3-5 min)

**Contenido:**
1. Presentación de cada integrante
2. Roles y responsabilidades
3. Experiencia del trabajo en equipo
4. Reflexiones finales

---

## 👥 Equipo de Desarrollo

### Integrante 1
- **Nombre:** [Nombre Completo]
- **Código:** [Código Estudiante]
- **Responsabilidades:** 
  - Diseño del modelo relacional
  - Consultas de fallas recurrentes y costos

### Integrante 2
- **Nombre:** [Nombre Completo]
- **Código:** [Código Estudiante]
- **Responsabilidades:**
  - Implementación de procedimientos almacenados
  - Análisis de vehículos problemáticos

### Integrante 3
- **Nombre:** [Nombre Completo]
- **Código:** [Código Estudiante]
- **Responsabilidades:**
  - Diseño del modelo no relacional
  - Análisis de rendimiento de técnicos

### Integrante 4
- **Nombre:** [Nombre Completo]
- **Código:** [Código Estudiante]
- **Responsabilidades:**
  - Implementación de validaciones MongoDB
  - Análisis de componentes críticos

---

## 📝 Control de Versiones

### Conventional Commits

Este proyecto utiliza el estándar de Conventional Commits:

```bash
# Ejemplos de commits
feat: creación de colección mantenimientos con validación
fix: corrección validación JSON en vehiculos
docs: agregado diagrama ERD físico
refactor: optimización de índices en MongoDB
test: agregadas consultas de verificación
```

### Tipos de Commits

- `feat:` Nueva funcionalidad
- `fix:` Corrección de errores
- `docs:` Documentación
- `refactor:` Refactorización de código
- `test:` Pruebas
- `chore:` Tareas de mantenimiento

---

## 🔧 Comandos Útiles

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

// Ver validación de colección
db.getCollectionInfos({name: "vehiculos"})

// Ejecutar consulta
db.mantenimientos.aggregate([
  { $group: { _id: "$falla.descripcion", total: { $sum: 1 } } }
])
```

---

## 📚 Recursos y Referencias

### Documentación Oficial

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
- [ ] ERD físico creado en ERD Editor
- [ ] Diagrama documental creado en Hackolade
- [ ] Ambos diagramas exportados a PDF/PNG

### Scripts
- [ ] `create_tables.sql` completo y funcional
- [ ] `inserts.sql` con datos de prueba
- [ ] `collections.js` con validaciones JSON
- [ ] `queries.js` con mínimo 8 consultas

### Documentación
- [ ] Capítulo III completo
- [ ] Capítulo IV completo
- [ ] README.md actualizado
- [ ] Evidencias capturadas

### Videos
- [ ] Video de exposición (10-15 min)
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

Este proyecto es parte de un trabajo académico para el curso de Fundamentos de Base de Datos.

---

**Última actualización:** Marzo 2024  
**Versión:** 1.0.0
