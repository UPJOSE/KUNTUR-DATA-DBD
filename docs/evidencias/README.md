# 📸 Evidencias del Proyecto FlotIA

Esta carpeta contiene todas las capturas de pantalla que demuestran la implementacion exitosa del proyecto.

## 📁 Estructura de Carpetas

```
evidencias/
├── sql/              # Evidencias SQL Server
├── mongodb/          # Evidencias MongoDB
├── diagramas/        # Evidencias de diagramas
└── git/              # Evidencias de control de versiones
```

## 📋 Checklist de Evidencias Requeridas

### SQL Server (Carpeta: `sql/`)

- [ ] `sql_01_database.png` - Base de datos FlotIA_DB en Object Explorer
- [ ] `sql_02_tables.png` - Lista completa de tablas creadas
- [ ] `sql_03_create_execution.png` - Ejecucion exitosa de create_tables.sql
- [ ] `sql_04_insert_execution.png` - Ejecucion exitosa de inserts.sql
- [ ] `sql_05_vista_resumen.png` - Resultado de vw_ResumenFlotaPorEmpresa
- [ ] `sql_06_vista_costos.png` - Resultado de vw_CostosMantenimientoPorVehiculo
- [ ] `sql_07_procedimiento.png` - Ejecucion de sp_RegistrarVehiculo
- [ ] `sql_08_indices.png` - Lista de indices creados
- [ ] `sql_09_datos_vehiculos.png` - Consulta SELECT de tabla Vehiculo
- [ ] `sql_10_datos_mantenimientos.png` - Consulta SELECT de tabla Mantenimiento

### MongoDB (Carpeta: `mongodb/`)

- [ ] `mongo_01_compass_database.png` - Base flotia_nosql en MongoDB Compass
- [ ] `mongo_02_collections.png` - Lista de colecciones creadas
- [ ] `mongo_03_validation_vehiculos.png` - JSON Schema de validacion en vehiculos
- [ ] `mongo_04_validation_mantenimientos.png` - JSON Schema de validacion en mantenimientos
- [ ] `mongo_05_indices.png` - Indices creados en colecciones
- [ ] `mongo_06_query_fallas.png` - Resultado consulta fallas recurrentes
- [ ] `mongo_07_query_costos.png` - Resultado consulta costo total por vehiculo
- [ ] `mongo_08_query_tecnicos.png` - Resultado consulta rendimiento tecnicos
- [ ] `mongo_09_query_componentes.png` - Resultado consulta componentes criticos
- [ ] `mongo_10_datos_vehiculos.png` - Documentos de coleccion vehiculos
- [ ] `mongo_11_datos_mantenimientos.png` - Documentos de coleccion mantenimientos
- [ ] `mongo_12_embedded_pattern.png` - Ejemplo de Embedded Pattern (componentes)

### Diagramas (Carpeta: `diagramas/`)

- [ ] `erd_01_completo.png` - Diagrama ERD fisico completo
- [ ] `erd_02_herramienta.png` - Captura de ERD Editor/draw.io
- [ ] `hackolade_01_completo.png` - Diagrama Hackolade completo
- [ ] `hackolade_02_validacion.png` - Detalle de validaciones en Hackolade
- [ ] `hackolade_03_patrones.png` - Patrones de diseno aplicados

### Git/GitHub (Carpeta: `git/`)

- [ ] `git_01_commits.png` - Lista de commits con Conventional Commits
- [ ] `git_02_estructura.png` - Estructura de carpetas en GitHub
- [ ] `git_03_readme.png` - README.md visualizado en GitHub
- [ ] `git_04_gitignore.png` - Archivo .gitignore
- [ ] `git_05_historial.png` - Historial completo de commits

## 📸 Guia para Capturar Evidencias

### SQL Server (SSMS)

#### 1. Base de Datos
```
1. Abrir SSMS
2. Expandir "Databases"
3. Mostrar FlotIA_DB
4. Capturar pantalla completa
```

#### 2. Tablas
```
1. Expandir FlotIA_DB → Tables
2. Mostrar todas las tablas
3. Capturar lista completa
```

#### 3. Ejecucion de Scripts
```
1. Abrir create_tables.sql
2. Ejecutar (F5)
3. Capturar ventana de mensajes mostrando "Command(s) completed successfully"
4. Repetir para inserts.sql
```

#### 4. Consultas de Vistas
```sql
-- Ejecutar y capturar resultado
SELECT * FROM vw_ResumenFlotaPorEmpresa;
SELECT * FROM vw_CostosMantenimientoPorVehiculo;
```

#### 5. Procedimientos Almacenados
```sql
-- Ejecutar y capturar resultado
EXEC sp_RegistrarVehiculo 
    @EmpresaID = 1,
    @Placa = 'EVD-001',
    @Marca = 'Toyota',
    @Modelo = 'Corolla',
    @Anio = 2024,
    @Tipo = 'Auto',
    @Kilometraje = 0;
```

#### 6. Indices
```sql
-- Ejecutar y capturar
SELECT 
    t.name AS TableName,
    i.name AS IndexName,
    i.type_desc AS IndexType
FROM sys.indexes i
INNER JOIN sys.tables t ON i.object_id = t.object_id
WHERE t.name IN ('Vehiculo', 'Mantenimiento', 'Componente')
ORDER BY t.name, i.name;
```

### MongoDB (Compass/mongosh)

#### 1. Base de Datos en Compass
```
1. Abrir MongoDB Compass
2. Conectar a localhost:27017
3. Mostrar base flotia_nosql
4. Capturar lista de colecciones
```

#### 2. Validaciones JSON Schema
```
1. Click en coleccion "vehiculos"
2. Tab "Validation"
3. Mostrar JSON Schema completo
4. Capturar pantalla
```

#### 3. Indices
```
1. Click en coleccion
2. Tab "Indexes"
3. Mostrar todos los indices
4. Capturar pantalla
```

#### 4. Consultas en mongosh
```javascript
// Ejecutar cada consulta y capturar resultado

// Fallas recurrentes
db.mantenimientos.aggregate([
  { $group: { _id: "$falla.descripcion", total: { $sum: 1 } } },
  { $match: { total: { $gte: 3 } } }
])

// Costo total por vehiculo
db.mantenimientos.aggregate([
  { $group: { _id: "$vehiculo_id", totalGastado: { $sum: "$costo" } } }
])
```

#### 5. Documentos
```
1. Click en coleccion "vehiculos"
2. Tab "Documents"
3. Expandir un documento para mostrar estructura
4. Capturar mostrando componentes embebidos
```

### Diagramas

#### ERD Editor/draw.io
```
1. Abrir diagrama completo
2. Zoom para que se vea todo
3. Capturar pantalla completa
4. Capturar tambien la herramienta con el diagrama
```

#### Hackolade
```
1. Abrir modelo MongoDB
2. Vista completa del diagrama
3. Capturar pantalla
4. Capturar detalle de validaciones de una coleccion
5. Capturar propiedades mostrando patrones aplicados
```

### Git/GitHub

#### Commits Locales
```bash
# En terminal
git log --oneline -20

# Capturar lista de commits
```

#### GitHub
```
1. Ir al repositorio en GitHub
2. Capturar estructura de carpetas (Code tab)
3. Capturar README renderizado
4. Capturar lista de commits (Commits tab)
5. Capturar archivo .gitignore
```

## 🎨 Estandares de Calidad

### Resolucion
- Minimo: 1280x720 (HD)
- Recomendado: 1920x1080 (Full HD)
- Formato: PNG (mejor calidad) o JPG

### Contenido
- Imagen clara y legible
- Texto visible sin zoom
- Fecha/hora visible cuando sea relevante
- Sin informacion sensible (contrasenas, IPs privadas)

### Nomenclatura
```
[categoria]_[numero]_[descripcion].png

Ejemplos:
sql_01_database.png
mongo_06_query_fallas.png
erd_01_completo.png
git_01_commits.png
```

## 📝 Descripcion de Evidencias

Crear archivo `DESCRIPCION_EVIDENCIAS.txt` con:

```
SQL_01_DATABASE.PNG
Descripcion: Base de datos FlotIA_DB creada en SQL Server
Muestra: Object Explorer con la base de datos expandida
Fecha: 2024-03-XX

SQL_02_TABLES.PNG
Descripcion: Todas las tablas del modelo relacional
Muestra: 8 tablas (Empresa, Vehiculo, Tecnico, Componente, Mantenimiento, PlanMantenimiento, Usuario, Reporte)
Fecha: 2024-03-XX

[... continuar para todas las evidencias ...]
```

## ✅ Verificacion Final

Antes de entregar, verificar:

- [ ] Todas las evidencias estan capturadas
- [ ] Imagenes son claras y legibles
- [ ] Nomenclatura es consistente
- [ ] Carpetas estan organizadas
- [ ] No hay informacion sensible
- [ ] Archivo de descripcion esta completo
- [ ] Evidencias coinciden con la documentacion

## 🎥 Evidencias en Video

Ademas de las capturas, los videos deben mostrar:

### Video de Exposicion
- Ejecucion en vivo de scripts SQL
- Ejecucion en vivo de scripts MongoDB
- Navegacion por diagramas
- Demostracion de consultas

### Video About-the-Team
- Presentacion del equipo
- Reflexiones sobre el proyecto

## 📞 Notas Importantes

1. **No editar evidencias** - Deben ser capturas reales sin modificacion
2. **Incluir contexto** - Mostrar barras de herramientas, fechas, etc.
3. **Calidad sobre cantidad** - Mejor pocas evidencias claras que muchas borrosas
4. **Organizacion** - Mantener estructura de carpetas consistente

---

**Ultima actualizacion:** Marzo 2024
