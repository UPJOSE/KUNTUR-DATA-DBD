# 🍃 Guia de Instalacion de MongoDB en Windows

## Opcion 1: Instalacion Completa (Recomendada)

### Paso 1: Descargar MongoDB Community Edition

1. Ir a: https://www.mongodb.com/try/download/community
2. Seleccionar:
   - **Version:** 7.0.x (Current)
   - **Platform:** Windows
   - **Package:** MSI
3. Click en **Download**

### Paso 2: Instalar MongoDB

1. Ejecutar el archivo `.msi` descargado
2. En el instalador:
   - Click **Next**
   - Aceptar licencia → **Next**
   - Seleccionar **Complete** installation
   - **Install MongoDB as a Service** ✅ (dejar marcado)
   - **Service Name:** MongoDB
   - **Data Directory:** `C:\Program Files\MongoDB\Server\7.0\data\`
   - **Log Directory:** `C:\Program Files\MongoDB\Server\7.0\log\`
   - Click **Next**
   - **Install MongoDB Compass** ✅ (dejar marcado - interfaz grafica)
   - Click **Next** → **Install**

3. Esperar a que termine la instalacion
4. Click **Finish**

### Paso 3: Verificar Instalacion

Abrir PowerShell o CMD y ejecutar:

```powershell
mongod --version
```

Deberia mostrar algo como:
```
db version v7.0.x
Build Info: ...
```

### Paso 4: Verificar que el Servicio esta Corriendo

```powershell
# Ver estado del servicio
Get-Service MongoDB

# Si no esta corriendo, iniciarlo
net start MongoDB
```

### Paso 5: Conectarse a MongoDB

```powershell
mongosh
```

Deberia conectarse y mostrar:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
```

---

## Opcion 2: Instalacion Rapida con Chocolatey

Si tienes Chocolatey instalado:

```powershell
# Ejecutar PowerShell como Administrador
choco install mongodb mongodb-shell mongodb-compass
```

---

## Opcion 3: Instalacion Portable (Sin Instalador)

### Paso 1: Descargar ZIP

1. Ir a: https://www.mongodb.com/try/download/community
2. Seleccionar **Package:** ZIP
3. Descargar y extraer en `C:\mongodb`

### Paso 2: Crear Carpetas de Datos

```powershell
mkdir C:\data\db
mkdir C:\data\log
```

### Paso 3: Iniciar MongoDB Manualmente

```powershell
cd C:\mongodb\bin
.\mongod.exe --dbpath C:\data\db
```

### Paso 4: En otra terminal, conectar

```powershell
cd C:\mongodb\bin
.\mongosh.exe
```

---

## 🚀 Ejecutar Scripts de FlotIA

Una vez MongoDB este instalado y corriendo:

### Metodo 1: Desde mongosh (Recomendado)

```javascript
// 1. Conectar a MongoDB
mongosh

// 2. Ejecutar script de colecciones
load("C:/Users/amaro/Documents/FINALDBD/nosql/collections.js")

// 3. Ejecutar script de consultas
load("C:/Users/amaro/Documents/FINALDBD/nosql/queries.js")

// 4. Verificar
use flotia_nosql
show collections
db.vehiculos.countDocuments()
```

### Metodo 2: Desde linea de comandos

```powershell
# Ejecutar script directamente
mongosh < "C:\Users\amaro\Documents\FINALDBD\nosql\collections.js"
mongosh < "C:\Users\amaro\Documents\FINALDBD\nosql\queries.js"
```

### Metodo 3: Usando MongoDB Compass (Interfaz Grafica)

1. Abrir **MongoDB Compass**
2. Conectar a: `mongodb://localhost:27017`
3. Click en **Connect**
4. Crear nueva base de datos: `flotia_nosql`
5. Copiar y pegar el contenido de `collections.js` en el shell de Compass
6. Ejecutar linea por linea o todo el script

---

## 🔧 Solucion de Problemas

### Error: "mongod no se reconoce como comando"

**Solucion:** Agregar MongoDB al PATH

1. Buscar "Variables de entorno" en Windows
2. Click en "Variables de entorno"
3. En "Variables del sistema", buscar `Path`
4. Click **Editar**
5. Click **Nuevo**
6. Agregar: `C:\Program Files\MongoDB\Server\7.0\bin`
7. Click **Aceptar** en todas las ventanas
8. **Cerrar y abrir nueva terminal**

### Error: "Failed to connect to localhost:27017"

**Solucion:** Iniciar el servicio MongoDB

```powershell
# Windows
net start MongoDB

# O manualmente
mongod --dbpath C:\data\db
```

### Error: "Access denied" o permisos

**Solucion:** Ejecutar PowerShell como Administrador

1. Click derecho en PowerShell
2. "Ejecutar como administrador"
3. Intentar nuevamente

### MongoDB Compass no abre

**Solucion:** Descargar e instalar separadamente

https://www.mongodb.com/try/download/compass

---

## ✅ Verificacion Final

Ejecutar estos comandos para verificar que todo funciona:

```powershell
# 1. Verificar version de mongod
mongod --version

# 2. Verificar version de mongosh
mongosh --version

# 3. Verificar servicio
Get-Service MongoDB

# 4. Conectar y probar
mongosh
> show dbs
> exit
```

Si todos los comandos funcionan, MongoDB esta correctamente instalado.

---

## 📚 Recursos Adicionales

- **Documentacion oficial:** https://docs.mongodb.com/manual/installation/
- **MongoDB University (cursos gratis):** https://university.mongodb.com/
- **MongoDB Compass:** https://www.mongodb.com/products/compass

---

## 🎯 Siguiente Paso

Una vez instalado MongoDB, ejecuta:

```powershell
cd C:\Users\amaro\Documents\FINALDBD
mongosh
```

Y luego dentro de mongosh:

```javascript
load("nosql/collections.js")
load("nosql/queries.js")
```

Listo! Tu base de datos MongoDB de FlotIA estara creada y lista para usar. 🚀
