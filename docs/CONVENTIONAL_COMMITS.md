# 📝 Guia de Conventional Commits - FlotIA

## Que son los Conventional Commits?

Conventional Commits es una convencion para escribir mensajes de commit que facilita:
- Generacion automatica de CHANGELOGs
- Determinacion automatica de versiones semanticas
- Comunicacion clara de cambios al equipo
- Facilitar contribuciones de nuevos desarrolladores

## Formato Basico

```
<tipo>[ambito opcional]: <descripcion>

[cuerpo opcional]

[nota de pie opcional]
```

## Tipos de Commits

### feat (Feature)
Nuevo feature o funcionalidad para el usuario

```bash
git commit -m "feat: creacion de coleccion mantenimientos con validacion"
git commit -m "feat: agregado procedimiento sp_RegistrarVehiculo"
git commit -m "feat: implementacion de consultas analiticas MongoDB"
```

### fix (Bug Fix)
Correccion de un bug

```bash
git commit -m "fix: correccion validacion JSON en vehiculos"
git commit -m "fix: error en calculo de costo total"
git commit -m "fix: indice duplicado en tabla Mantenimiento"
```

### docs (Documentation)
Cambios solo en documentacion

```bash
git commit -m "docs: agregado diagrama ERD fisico"
git commit -m "docs: actualizacion de README con instrucciones"
git commit -m "docs: documentacion de procedimientos almacenados"
```

### refactor (Refactoring)
Cambio de codigo que no corrige bug ni agrega feature

```bash
git commit -m "refactor: optimizacion de indices en MongoDB"
git commit -m "refactor: mejora de consulta de fallas recurrentes"
git commit -m "refactor: reorganizacion de estructura de carpetas"
```

### test (Tests)
Agregar o corregir tests

```bash
git commit -m "test: agregadas consultas de verificacion SQL"
git commit -m "test: validacion de datos insertados"
git commit -m "test: pruebas de procedimientos almacenados"
```

### chore (Chores)
Cambios en proceso de build, herramientas auxiliares

```bash
git commit -m "chore: configuracion de gitignore"
git commit -m "chore: actualizacion de dependencias"
git commit -m "chore: configuracion de estructura de proyecto"
```

### style (Style)
Cambios de formato, espacios, punto y coma, etc.

```bash
git commit -m "style: formato de codigo SQL"
git commit -m "style: indentacion de scripts MongoDB"
```

### perf (Performance)
Mejoras de rendimiento

```bash
git commit -m "perf: optimizacion de consulta de costos"
git commit -m "perf: agregado indice compuesto en mantenimientos"
```

## Ejemplos para FlotIA

### Commits SQL Server

```bash
# Creacion inicial
git commit -m "feat: creacion de base de datos FlotIA_DB"
git commit -m "feat: creacion de tablas maestras (Empresa, Vehiculo, Tecnico)"
git commit -m "feat: creacion de tablas transaccionales (Mantenimiento, PlanMantenimiento)"

# Procedimientos
git commit -m "feat: agregado sp_RegistrarVehiculo"
git commit -m "feat: agregado sp_RegistrarMantenimiento con transaccion"
git commit -m "feat: agregado sp_ActualizarKilometraje"

# Vistas
git commit -m "feat: creacion de vw_ResumenFlotaPorEmpresa"
git commit -m "feat: creacion de vw_CostosMantenimientoPorVehiculo"

# Funciones
git commit -m "feat: agregada fn_CostoTotalMantenimiento"
git commit -m "feat: agregada fn_TieneMantenimientoPendiente"

# Datos
git commit -m "feat: datos de prueba para empresas y vehiculos"
git commit -m "feat: datos de prueba para mantenimientos"

# Indices
git commit -m "perf: agregados indices en tabla Vehiculo"
git commit -m "perf: agregados indices en tabla Mantenimiento"

# Correcciones
git commit -m "fix: correccion de constraint en tabla Componente"
git commit -m "fix: correccion de tipo de dato en campo Costo"
```

### Commits MongoDB

```bash
# Colecciones
git commit -m "feat: creacion de coleccion empresas con validacion"
git commit -m "feat: creacion de coleccion vehiculos con Embedded Pattern"
git commit -m "feat: creacion de coleccion mantenimientos con Reference Pattern"
git commit -m "feat: creacion de coleccion usuarios con validacion"
git commit -m "feat: creacion de coleccion alertas_predictivas"

# Validaciones
git commit -m "feat: validacion JSON Schema para vehiculos"
git commit -m "feat: validacion de enum para estado_operativo"
git commit -m "fix: correccion de validacion en campo empresa_id"

# Indices
git commit -m "perf: indices creados en coleccion vehiculos"
git commit -m "perf: indice compuesto vehiculo_id + fecha en mantenimientos"
git commit -m "perf: indice de texto en falla.descripcion"

# Consultas
git commit -m "feat: consulta de fallas recurrentes implementada"
git commit -m "feat: consulta de costo total por vehiculo"
git commit -m "feat: consulta de rendimiento de tecnicos"
git commit -m "feat: consulta de componentes criticos"

# Datos
git commit -m "feat: datos de prueba para empresas y vehiculos MongoDB"
git commit -m "feat: datos de prueba para mantenimientos con fallas"

# Optimizaciones
git commit -m "refactor: optimizacion de consulta de fallas recurrentes"
git commit -m "perf: agregado pipeline de agregacion optimizado"
```

### Commits de Documentacion

```bash
git commit -m "docs: README inicial del proyecto"
git commit -m "docs: agregado diagrama ERD fisico"
git commit -m "docs: agregado diagrama Hackolade MongoDB"
git commit -m "docs: guia de implementacion completa"
git commit -m "docs: documentacion de Conventional Commits"
git commit -m "docs: evidencias de ejecucion SQL Server"
git commit -m "docs: evidencias de ejecucion MongoDB"
git commit -m "docs: Capitulo III - Marco Teorico"
git commit -m "docs: Capitulo IV - Desarrollo del Proyecto"
```

### Commits de Configuracion

```bash
git commit -m "chore: configuracion inicial de .gitignore"
git commit -m "chore: estructura de carpetas del proyecto"
git commit -m "chore: configuracion de repositorio GitHub"
```

## Ambito Opcional

Puedes agregar un ambito para especificar que parte del proyecto afecta:

```bash
git commit -m "feat(sql): creacion de tabla Vehiculo"
git commit -m "feat(mongo): coleccion vehiculos con validacion"
git commit -m "docs(diagramas): agregado ERD fisico"
git commit -m "fix(sql): correccion en sp_RegistrarMantenimiento"
git commit -m "perf(mongo): indice en falla.categoria"
```

## Commits con Cuerpo

Para cambios mas complejos, agrega un cuerpo explicativo:

```bash
git commit -m "feat: implementacion de sistema de alertas predictivas

- Creacion de coleccion alertas_predictivas
- Validacion JSON Schema implementada
- Indices para optimizacion de consultas
- Datos de prueba insertados

Relacionado con requerimiento de analisis predictivo"
```

## Breaking Changes

Si un cambio rompe compatibilidad hacia atras:

```bash
git commit -m "feat!: cambio de estructura en coleccion vehiculos

BREAKING CHANGE: El campo 'kilometraje' ahora se llama 'kilometraje_actual'
y es de tipo int en lugar de string"
```

## Workflow Recomendado para FlotIA

### 1. Trabajo en SQL Server

```bash
# Crear/modificar scripts
git add sql/create_tables.sql
git commit -m "feat: creacion de tablas maestras"

git add sql/inserts.sql
git commit -m "feat: datos de prueba para SQL Server"
```

### 2. Trabajo en MongoDB

```bash
# Crear/modificar scripts
git add nosql/collections.js
git commit -m "feat: colecciones MongoDB con validacion"

git add nosql/queries.js
git commit -m "feat: consultas analiticas implementadas"
```

### 3. Agregar Diagramas

```bash
git add diagramas/ERD_Fisico.png
git commit -m "docs: diagrama ERD fisico completo"

git add diagramas/Hackolade_FlotIA.pdf
git commit -m "docs: diagrama documental Hackolade"
```

### 4. Documentacion

```bash
git add README.md
git commit -m "docs: README con instrucciones completas"

git add docs/GUIA_IMPLEMENTACION.md
git commit -m "docs: guia paso a paso de implementacion"
```

### 5. Evidencias

```bash
git add docs/evidencias/
git commit -m "docs: evidencias de ejecucion SQL y MongoDB"
```

## Comandos Git Utiles

```bash
# Ver historial de commits
git log --oneline

# Ver commits con formato bonito
git log --pretty=format:"%h - %an, %ar : %s"

# Ver estadisticas
git log --stat

# Ver commits de un archivo especifico
git log -- sql/create_tables.sql

# Modificar ultimo commit (si no se ha pusheado)
git commit --amend -m "feat: mensaje corregido"

# Ver diferencias antes de commit
git diff
```

## Buenas Practicas

### ✅ Hacer

- Usar verbos en infinitivo o presente
- Ser especifico y conciso
- Un commit = un cambio logico
- Commitear frecuentemente
- Escribir en espanol (para este proyecto)

### ❌ Evitar

- Mensajes genericos: "cambios", "update", "fix"
- Commits muy grandes con muchos cambios
- Mezclar diferentes tipos de cambios
- Commits sin probar

## Ejemplos Completos para el Proyecto

```bash
# Dia 1: Configuracion inicial
git commit -m "chore: estructura inicial del proyecto FlotIA"
git commit -m "docs: README con descripcion del proyecto"
git commit -m "chore: configuracion de .gitignore"

# Dia 2: SQL Server
git commit -m "feat: creacion de base de datos FlotIA_DB"
git commit -m "feat: tablas maestras (Empresa, Vehiculo, Tecnico, Componente)"
git commit -m "feat: tablas transaccionales (Mantenimiento, PlanMantenimiento)"
git commit -m "feat: tabla de usuarios y reportes"
git commit -m "perf: indices en tablas principales"

# Dia 3: Procedimientos y funciones SQL
git commit -m "feat: sp_RegistrarVehiculo implementado"
git commit -m "feat: sp_RegistrarMantenimiento con manejo de transacciones"
git commit -m "feat: sp_ActualizarKilometraje y sp_ObtenerHistorialMantenimiento"
git commit -m "feat: vistas vw_ResumenFlotaPorEmpresa y vw_CostosMantenimientoPorVehiculo"
git commit -m "feat: funciones fn_CostoTotalMantenimiento y fn_TieneMantenimientoPendiente"

# Dia 4: Datos SQL
git commit -m "feat: datos de prueba para empresas y tecnicos"
git commit -m "feat: datos de prueba para vehiculos y componentes"
git commit -m "feat: datos de prueba para mantenimientos"
git commit -m "feat: datos de prueba para usuarios y reportes"

# Dia 5: MongoDB
git commit -m "feat: coleccion empresas con validacion JSON Schema"
git commit -m "feat: coleccion vehiculos con Embedded Pattern"
git commit -m "feat: coleccion mantenimientos con Reference Pattern"
git commit -m "feat: coleccion usuarios con validacion de email"
git commit -m "feat: coleccion alertas_predictivas"

# Dia 6: Indices y datos MongoDB
git commit -m "perf: indices en todas las colecciones MongoDB"
git commit -m "feat: datos de prueba para MongoDB"

# Dia 7: Consultas MongoDB
git commit -m "feat: consulta de fallas recurrentes (Integrante 1)"
git commit -m "feat: consulta de costo total por vehiculo (Integrante 1)"
git commit -m "feat: consulta de vehiculos problematicos (Integrante 2)"
git commit -m "feat: consulta de costos por categoria (Integrante 2)"
git commit -m "feat: consulta de rendimiento de tecnicos (Integrante 3)"
git commit -m "feat: consulta de distribucion por estado (Integrante 3)"
git commit -m "feat: consulta de componentes criticos (Integrante 4)"
git commit -m "feat: consulta de tendencia temporal (Integrante 4)"

# Dia 8: Diagramas
git commit -m "docs: diagrama ERD fisico en ERD Editor"
git commit -m "docs: diagrama documental en Hackolade"

# Dia 9: Documentacion
git commit -m "docs: guia de implementacion completa"
git commit -m "docs: guia de Conventional Commits"
git commit -m "docs: Capitulo III - Marco Teorico"
git commit -m "docs: Capitulo IV - Desarrollo del Proyecto"

# Dia 10: Evidencias
git commit -m "docs: evidencias de ejecucion SQL Server"
git commit -m "docs: evidencias de ejecucion MongoDB"
git commit -m "docs: evidencias de diagramas"
git commit -m "docs: evidencias de Git y GitHub"

# Final
git commit -m "docs: actualizacion final de README"
git commit -m "chore: preparacion para entrega final"
```

## Verificar Commits

Antes de push, verifica que tus commits sigan el estandar:

```bash
# Ver ultimos 10 commits
git log --oneline -10

# Deben verse asi:
# a1b2c3d feat: consulta de fallas recurrentes
# e4f5g6h docs: diagrama ERD fisico
# i7j8k9l fix: correccion validacion JSON
# m0n1o2p perf: indices en mantenimientos
```

---

**Recuerda:** Buenos mensajes de commit = mejor colaboracion y mantenimiento del proyecto 🚀
