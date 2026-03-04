# 📝 Guía de Conventional Commits - FlotIA

## ¿Qué son los Conventional Commits?

Conventional Commits es una convención para escribir mensajes de commit que facilita:
- Generación automática de CHANGELOGs
- Determinación automática de versiones semánticas
- Comunicación clara de cambios al equipo
- Facilitar contribuciones de nuevos desarrolladores

## Formato Básico

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[nota de pie opcional]
```

## Tipos de Commits

### feat (Feature)
Nuevo feature o funcionalidad para el usuario

```bash
git commit -m "feat: creación de colección mantenimientos con validación"
git commit -m "feat: agregado procedimiento sp_RegistrarVehiculo"
git commit -m "feat: implementación de consultas analíticas MongoDB"
```

### fix (Bug Fix)
Corrección de un bug

```bash
git commit -m "fix: corrección validación JSON en vehiculos"
git commit -m "fix: error en cálculo de costo total"
git commit -m "fix: índice duplicado en tabla Mantenimiento"
```

### docs (Documentation)
Cambios solo en documentación

```bash
git commit -m "docs: agregado diagrama ERD físico"
git commit -m "docs: actualización de README con instrucciones"
git commit -m "docs: documentación de procedimientos almacenados"
```

### refactor (Refactoring)
Cambio de código que no corrige bug ni agrega feature

```bash
git commit -m "refactor: optimización de índices en MongoDB"
git commit -m "refactor: mejora de consulta de fallas recurrentes"
git commit -m "refactor: reorganización de estructura de carpetas"
```

### test (Tests)
Agregar o corregir tests

```bash
git commit -m "test: agregadas consultas de verificación SQL"
git commit -m "test: validación de datos insertados"
git commit -m "test: pruebas de procedimientos almacenados"
```

### chore (Chores)
Cambios en proceso de build, herramientas auxiliares

```bash
git commit -m "chore: configuración de gitignore"
git commit -m "chore: actualización de dependencias"
git commit -m "chore: configuración de estructura de proyecto"
```

### style (Style)
Cambios de formato, espacios, punto y coma, etc.

```bash
git commit -m "style: formato de código SQL"
git commit -m "style: indentación de scripts MongoDB"
```

### perf (Performance)
Mejoras de rendimiento

```bash
git commit -m "perf: optimización de consulta de costos"
git commit -m "perf: agregado índice compuesto en mantenimientos"
```

## Ejemplos para FlotIA

### Commits SQL Server

```bash
# Creación inicial
git commit -m "feat: creación de base de datos FlotIA_DB"
git commit -m "feat: creación de tablas maestras (Empresa, Vehiculo, Tecnico)"
git commit -m "feat: creación de tablas transaccionales (Mantenimiento, PlanMantenimiento)"

# Procedimientos
git commit -m "feat: agregado sp_RegistrarVehiculo"
git commit -m "feat: agregado sp_RegistrarMantenimiento con transacción"
git commit -m "feat: agregado sp_ActualizarKilometraje"

# Vistas
git commit -m "feat: creación de vw_ResumenFlotaPorEmpresa"
git commit -m "feat: creación de vw_CostosMantenimientoPorVehiculo"

# Funciones
git commit -m "feat: agregada fn_CostoTotalMantenimiento"
git commit -m "feat: agregada fn_TieneMantenimientoPendiente"

# Datos
git commit -m "feat: datos de prueba para empresas y vehículos"
git commit -m "feat: datos de prueba para mantenimientos"

# Índices
git commit -m "perf: agregados índices en tabla Vehiculo"
git commit -m "perf: agregados índices en tabla Mantenimiento"

# Correcciones
git commit -m "fix: corrección de constraint en tabla Componente"
git commit -m "fix: corrección de tipo de dato en campo Costo"
```

### Commits MongoDB

```bash
# Colecciones
git commit -m "feat: creación de colección empresas con validación"
git commit -m "feat: creación de colección vehiculos con Embedded Pattern"
git commit -m "feat: creación de colección mantenimientos con Reference Pattern"
git commit -m "feat: creación de colección usuarios con validación"
git commit -m "feat: creación de colección alertas_predictivas"

# Validaciones
git commit -m "feat: validación JSON Schema para vehiculos"
git commit -m "feat: validación de enum para estado_operativo"
git commit -m "fix: corrección de validación en campo empresa_id"

# Índices
git commit -m "perf: índices creados en colección vehiculos"
git commit -m "perf: índice compuesto vehiculo_id + fecha en mantenimientos"
git commit -m "perf: índice de texto en falla.descripcion"

# Consultas
git commit -m "feat: consulta de fallas recurrentes implementada"
git commit -m "feat: consulta de costo total por vehículo"
git commit -m "feat: consulta de rendimiento de técnicos"
git commit -m "feat: consulta de componentes críticos"

# Datos
git commit -m "feat: datos de prueba para empresas y vehículos MongoDB"
git commit -m "feat: datos de prueba para mantenimientos con fallas"

# Optimizaciones
git commit -m "refactor: optimización de consulta de fallas recurrentes"
git commit -m "perf: agregado pipeline de agregación optimizado"
```

### Commits de Documentación

```bash
git commit -m "docs: README inicial del proyecto"
git commit -m "docs: agregado diagrama ERD físico"
git commit -m "docs: agregado diagrama Hackolade MongoDB"
git commit -m "docs: guía de implementación completa"
git commit -m "docs: documentación de Conventional Commits"
git commit -m "docs: evidencias de ejecución SQL Server"
git commit -m "docs: evidencias de ejecución MongoDB"
git commit -m "docs: Capítulo III - Marco Teórico"
git commit -m "docs: Capítulo IV - Desarrollo del Proyecto"
```

### Commits de Configuración

```bash
git commit -m "chore: configuración inicial de .gitignore"
git commit -m "chore: estructura de carpetas del proyecto"
git commit -m "chore: configuración de repositorio GitHub"
```

## Ámbito Opcional

Puedes agregar un ámbito para especificar qué parte del proyecto afecta:

```bash
git commit -m "feat(sql): creación de tabla Vehiculo"
git commit -m "feat(mongo): colección vehiculos con validación"
git commit -m "docs(diagramas): agregado ERD físico"
git commit -m "fix(sql): corrección en sp_RegistrarMantenimiento"
git commit -m "perf(mongo): índice en falla.categoria"
```

## Commits con Cuerpo

Para cambios más complejos, agrega un cuerpo explicativo:

```bash
git commit -m "feat: implementación de sistema de alertas predictivas

- Creación de colección alertas_predictivas
- Validación JSON Schema implementada
- Índices para optimización de consultas
- Datos de prueba insertados

Relacionado con requerimiento de análisis predictivo"
```

## Breaking Changes

Si un cambio rompe compatibilidad hacia atrás:

```bash
git commit -m "feat!: cambio de estructura en colección vehiculos

BREAKING CHANGE: El campo 'kilometraje' ahora se llama 'kilometraje_actual'
y es de tipo int en lugar de string"
```

## Workflow Recomendado para FlotIA

### 1. Trabajo en SQL Server

```bash
# Crear/modificar scripts
git add sql/create_tables.sql
git commit -m "feat: creación de tablas maestras"

git add sql/inserts.sql
git commit -m "feat: datos de prueba para SQL Server"
```

### 2. Trabajo en MongoDB

```bash
# Crear/modificar scripts
git add nosql/collections.js
git commit -m "feat: colecciones MongoDB con validación"

git add nosql/queries.js
git commit -m "feat: consultas analíticas implementadas"
```

### 3. Agregar Diagramas

```bash
git add diagramas/ERD_Fisico.png
git commit -m "docs: diagrama ERD físico completo"

git add diagramas/Hackolade_FlotIA.pdf
git commit -m "docs: diagrama documental Hackolade"
```

### 4. Documentación

```bash
git add README.md
git commit -m "docs: README con instrucciones completas"

git add docs/GUIA_IMPLEMENTACION.md
git commit -m "docs: guía paso a paso de implementación"
```

### 5. Evidencias

```bash
git add docs/evidencias/
git commit -m "docs: evidencias de ejecución SQL y MongoDB"
```

## Comandos Git Útiles

```bash
# Ver historial de commits
git log --oneline

# Ver commits con formato bonito
git log --pretty=format:"%h - %an, %ar : %s"

# Ver estadísticas
git log --stat

# Ver commits de un archivo específico
git log -- sql/create_tables.sql

# Modificar último commit (si no se ha pusheado)
git commit --amend -m "feat: mensaje corregido"

# Ver diferencias antes de commit
git diff
```

## Buenas Prácticas

### ✅ Hacer

- Usar verbos en infinitivo o presente
- Ser específico y conciso
- Un commit = un cambio lógico
- Commitear frecuentemente
- Escribir en español (para este proyecto)

### ❌ Evitar

- Mensajes genéricos: "cambios", "update", "fix"
- Commits muy grandes con muchos cambios
- Mezclar diferentes tipos de cambios
- Commits sin probar

## Ejemplos Completos para el Proyecto

```bash
# Día 1: Configuración inicial
git commit -m "chore: estructura inicial del proyecto FlotIA"
git commit -m "docs: README con descripción del proyecto"
git commit -m "chore: configuración de .gitignore"

# Día 2: SQL Server
git commit -m "feat: creación de base de datos FlotIA_DB"
git commit -m "feat: tablas maestras (Empresa, Vehiculo, Tecnico, Componente)"
git commit -m "feat: tablas transaccionales (Mantenimiento, PlanMantenimiento)"
git commit -m "feat: tabla de usuarios y reportes"
git commit -m "perf: índices en tablas principales"

# Día 3: Procedimientos y funciones SQL
git commit -m "feat: sp_RegistrarVehiculo implementado"
git commit -m "feat: sp_RegistrarMantenimiento con manejo de transacciones"
git commit -m "feat: sp_ActualizarKilometraje y sp_ObtenerHistorialMantenimiento"
git commit -m "feat: vistas vw_ResumenFlotaPorEmpresa y vw_CostosMantenimientoPorVehiculo"
git commit -m "feat: funciones fn_CostoTotalMantenimiento y fn_TieneMantenimientoPendiente"

# Día 4: Datos SQL
git commit -m "feat: datos de prueba para empresas y técnicos"
git commit -m "feat: datos de prueba para vehículos y componentes"
git commit -m "feat: datos de prueba para mantenimientos"
git commit -m "feat: datos de prueba para usuarios y reportes"

# Día 5: MongoDB
git commit -m "feat: colección empresas con validación JSON Schema"
git commit -m "feat: colección vehiculos con Embedded Pattern"
git commit -m "feat: colección mantenimientos con Reference Pattern"
git commit -m "feat: colección usuarios con validación de email"
git commit -m "feat: colección alertas_predictivas"

# Día 6: Índices y datos MongoDB
git commit -m "perf: índices en todas las colecciones MongoDB"
git commit -m "feat: datos de prueba para MongoDB"

# Día 7: Consultas MongoDB
git commit -m "feat: consulta de fallas recurrentes (Integrante 1)"
git commit -m "feat: consulta de costo total por vehículo (Integrante 1)"
git commit -m "feat: consulta de vehículos problemáticos (Integrante 2)"
git commit -m "feat: consulta de costos por categoría (Integrante 2)"
git commit -m "feat: consulta de rendimiento de técnicos (Integrante 3)"
git commit -m "feat: consulta de distribución por estado (Integrante 3)"
git commit -m "feat: consulta de componentes críticos (Integrante 4)"
git commit -m "feat: consulta de tendencia temporal (Integrante 4)"

# Día 8: Diagramas
git commit -m "docs: diagrama ERD físico en ERD Editor"
git commit -m "docs: diagrama documental en Hackolade"

# Día 9: Documentación
git commit -m "docs: guía de implementación completa"
git commit -m "docs: guía de Conventional Commits"
git commit -m "docs: Capítulo III - Marco Teórico"
git commit -m "docs: Capítulo IV - Desarrollo del Proyecto"

# Día 10: Evidencias
git commit -m "docs: evidencias de ejecución SQL Server"
git commit -m "docs: evidencias de ejecución MongoDB"
git commit -m "docs: evidencias de diagramas"
git commit -m "docs: evidencias de Git y GitHub"

# Final
git commit -m "docs: actualización final de README"
git commit -m "chore: preparación para entrega final"
```

## Verificar Commits

Antes de push, verifica que tus commits sigan el estándar:

```bash
# Ver últimos 10 commits
git log --oneline -10

# Deben verse así:
# a1b2c3d feat: consulta de fallas recurrentes
# e4f5g6h docs: diagrama ERD físico
# i7j8k9l fix: corrección validación JSON
# m0n1o2p perf: índices en mantenimientos
```

---

**Recuerda:** Buenos mensajes de commit = mejor colaboración y mantenimiento del proyecto 🚀
