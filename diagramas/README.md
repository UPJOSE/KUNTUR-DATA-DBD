# 📐 Diagramas del Proyecto FlotIA

Esta carpeta contiene los diagramas del modelo de datos del sistema FlotIA.

## 📋 Contenido

### 1. ERD Fisico (SQL Server)

**Archivo:** `ERD_Fisico.png` o `ERD_Fisico.pdf`

**Herramienta:** ERD Editor (VS Code Extension) o draw.io

**Contenido:**
- Todas las tablas del modelo relacional
- Atributos con tipos de datos
- Claves primarias (PK)
- Claves foraneas (FK)
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
- Patrones de diseno aplicados
- Referencias entre colecciones

**Colecciones incluidas:**
- empresas
- vehiculos (con componentes embebidos)
- mantenimientos (con referencias)
- usuarios
- alertas_predictivas

## 🎨 Como Crear los Diagramas

### ERD Fisico con ERD Editor (VS Code)

1. Instalar extension "ERD Editor" en VS Code
2. Crear archivo `ERD_FlotIA.vuerd.json`
3. Abrir con ERD Editor
4. Agregar entidades y relaciones segun modelo
5. Exportar como PNG/PDF

### ERD Fisico con draw.io

1. Ir a https://app.diagrams.net/
2. Nuevo diagrama → Entity Relation
3. Disenar segun modelo SQL Server
4. Exportar como PNG/PDF

### Diagrama Documental con Hackolade

1. Abrir Hackolade
2. File → New Model → MongoDB
3. Crear base de datos `flotia_nosql`
4. Agregar colecciones con validaciones
5. Aplicar patrones de diseno
6. File → Export → PDF

## 📸 Evidencias Requeridas

Ademas de los diagramas principales, incluir capturas de:

- Diagrama completo en la herramienta
- Detalle de validaciones JSON Schema
- Vista de propiedades de entidades/colecciones
- Exportacion final

## ✅ Checklist

- [ ] ERD fisico creado
- [ ] ERD exportado a PNG/PDF de alta calidad
- [ ] Diagrama Hackolade creado
- [ ] Diagrama Hackolade exportado a PDF
- [ ] Todos los diagramas son legibles
- [ ] Nombres de tablas/colecciones correctos
- [ ] Tipos de datos especificados
- [ ] Relaciones claramente marcadas
- [ ] Validaciones documentadas (Hackolade)

## 📐 Estandares de Diseno

### ERD Fisico

- Usar notacion crow's foot para cardinalidad
- Marcar claramente PK y FK
- Incluir tipos de datos y constraints
- Usar colores para diferenciar tipos de tablas
- Organizar de forma logica (maestras arriba, transaccionales abajo)

### Diagrama Hackolade

- Documentar todos los campos requeridos
- Especificar enums y patrones de validacion
- Marcar referencias entre colecciones
- Incluir descripcion de patrones aplicados
- Usar colores para diferenciar tipos de datos

## 🔗 Referencias

- [ERD Editor](https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode)
- [draw.io](https://app.diagrams.net/)
- [Hackolade](https://hackolade.com/)
- [Notacion Crow's Foot](https://www.lucidchart.com/pages/ER-diagram-symbols-and-meaning)
