# 📐 Diagramas del Proyecto FlotIA

Esta carpeta contiene los diagramas del modelo de datos del sistema FlotIA.

## 📋 Contenido

### 1. ERD Físico (SQL Server)

**Archivo:** `ERD_Fisico.png` o `ERD_Fisico.pdf`

**Herramienta:** ERD Editor (VS Code Extension) o draw.io

**Contenido:**
- Todas las tablas del modelo relacional
- Atributos con tipos de datos
- Claves primarias (PK)
- Claves foráneas (FK)
- Relaciones entre tablas
- Cardinalidad (1:1, 1:N, N:M)

**Entidades incluidas:**
- Empresa
- Vehiculo
- Tecnico
- Componente
- Mantenimiento
- PlanMantenimiento
- Usuario
- Reporte

### 2. Diagrama Documental (MongoDB)

**Archivo:** `Hackolade_FlotIA.pdf` o `Hackolade_FlotIA.png`

**Herramienta:** Hackolade

**Contenido:**
- Estructura de colecciones MongoDB
- Validaciones JSON Schema
- Tipos de datos BSON
- Patrones de diseño aplicados
- Referencias entre colecciones

**Colecciones incluidas:**
- empresas
- vehiculos (con componentes embebidos)
- mantenimientos (con referencias)
- usuarios
- alertas_predictivas

## 🎨 Cómo Crear los Diagramas

### ERD Físico con ERD Editor (VS Code)

1. Instalar extensión "ERD Editor" en VS Code
2. Crear archivo `ERD_FlotIA.vuerd.json`
3. Abrir con ERD Editor
4. Agregar entidades y relaciones según modelo
5. Exportar como PNG/PDF

### ERD Físico con draw.io

1. Ir a https://app.diagrams.net/
2. Nuevo diagrama → Entity Relation
3. Diseñar según modelo SQL Server
4. Exportar como PNG/PDF

### Diagrama Documental con Hackolade

1. Abrir Hackolade
2. File → New Model → MongoDB
3. Crear base de datos `flotia_nosql`
4. Agregar colecciones con validaciones
5. Aplicar patrones de diseño
6. File → Export → PDF

## 📸 Evidencias Requeridas

Además de los diagramas principales, incluir capturas de:

- Diagrama completo en la herramienta
- Detalle de validaciones JSON Schema
- Vista de propiedades de entidades/colecciones
- Exportación final

## ✅ Checklist

- [ ] ERD físico creado
- [ ] ERD exportado a PNG/PDF de alta calidad
- [ ] Diagrama Hackolade creado
- [ ] Diagrama Hackolade exportado a PDF
- [ ] Todos los diagramas son legibles
- [ ] Nombres de tablas/colecciones correctos
- [ ] Tipos de datos especificados
- [ ] Relaciones claramente marcadas
- [ ] Validaciones documentadas (Hackolade)

## 📐 Estándares de Diseño

### ERD Físico

- Usar notación crow's foot para cardinalidad
- Marcar claramente PK y FK
- Incluir tipos de datos y constraints
- Usar colores para diferenciar tipos de tablas
- Organizar de forma lógica (maestras arriba, transaccionales abajo)

### Diagrama Hackolade

- Documentar todos los campos requeridos
- Especificar enums y patrones de validación
- Marcar referencias entre colecciones
- Incluir descripción de patrones aplicados
- Usar colores para diferenciar tipos de datos

## 🔗 Referencias

- [ERD Editor](https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode)
- [draw.io](https://app.diagrams.net/)
- [Hackolade](https://hackolade.com/)
- [Notación Crow's Foot](https://www.lucidchart.com/pages/ER-diagram-symbols-and-meaning)
