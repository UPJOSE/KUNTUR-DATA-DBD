-- =====================================================================
-- CONSULTAS DE VERIFICACIÓN - FlotIA
-- Ejecutar después de create_tables.sql e inserts.sql
-- =====================================================================

USE FlotIA_DB;
GO

PRINT '=====================================================================';
PRINT 'VERIFICACIÓN DE IMPLEMENTACIÓN - FLOTIA';
PRINT '=====================================================================';
PRINT '';

-- =====================================================================
-- 1️⃣ VERIFICACIÓN DE TABLAS
-- =====================================================================

PRINT '--- 1. VERIFICACIÓN DE TABLAS ---';
PRINT '';

SELECT 
    TABLE_NAME AS Tabla,
    (SELECT COUNT(*) 
     FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_NAME = t.TABLE_NAME) AS Columnas
FROM INFORMATION_SCHEMA.TABLES t
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;

PRINT '';

-- =====================================================================
-- 2️⃣ VERIFICACIÓN DE DATOS
-- =====================================================================

PRINT '--- 2. VERIFICACIÓN DE DATOS INSERTADOS ---';
PRINT '';

SELECT 'Empresas' AS Entidad, COUNT(*) AS Total FROM Empresa
UNION ALL
SELECT 'Vehiculos', COUNT(*) FROM Vehiculo
UNION ALL
SELECT 'Tecnicos', COUNT(*) FROM Tecnico
UNION ALL
SELECT 'Componentes', COUNT(*) FROM Componente
UNION ALL
SELECT 'Mantenimientos', COUNT(*) FROM Mantenimiento
UNION ALL
SELECT 'Planes Mantenimiento', COUNT(*) FROM PlanMantenimiento
UNION ALL
SELECT 'Usuarios', COUNT(*) FROM Usuario
UNION ALL
SELECT 'Reportes', COUNT(*) FROM Reporte;

PRINT '';

-- =====================================================================
-- 3️⃣ VERIFICACIÓN DE PROCEDIMIENTOS ALMACENADOS
-- =====================================================================

PRINT '--- 3. VERIFICACIÓN DE PROCEDIMIENTOS ALMACENADOS ---';
PRINT '';

SELECT 
    ROUTINE_NAME AS Procedimiento,
    CREATED AS FechaCreacion
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_TYPE = 'PROCEDURE'
ORDER BY ROUTINE_NAME;

PRINT '';

-- =====================================================================
-- 4️⃣ VERIFICACIÓN DE VISTAS
-- =====================================================================

PRINT '--- 4. VERIFICACIÓN DE VISTAS ---';
PRINT '';

SELECT 
    TABLE_NAME AS Vista
FROM INFORMATION_SCHEMA.VIEWS
ORDER BY TABLE_NAME;

PRINT '';

-- =====================================================================
-- 5️⃣ VERIFICACIÓN DE FUNCIONES
-- =====================================================================

PRINT '--- 5. VERIFICACIÓN DE FUNCIONES ---';
PRINT '';

SELECT 
    ROUTINE_NAME AS Funcion,
    DATA_TYPE AS TipoRetorno
FROM INFORMATION_SCHEMA.ROUTINES
WHERE ROUTINE_TYPE = 'FUNCTION'
ORDER BY ROUTINE_NAME;

PRINT '';

-- =====================================================================
-- 6️⃣ VERIFICACIÓN DE ÍNDICES
-- =====================================================================

PRINT '--- 6. VERIFICACIÓN DE ÍNDICES ---';
PRINT '';

SELECT 
    t.name AS Tabla,
    i.name AS Indice,
    i.type_desc AS TipoIndice,
    i.is_unique AS EsUnico
FROM sys.indexes i
INNER JOIN sys.tables t ON i.object_id = t.object_id
WHERE i.name IS NOT NULL
ORDER BY t.name, i.name;

PRINT '';

-- =====================================================================
-- 7️⃣ VERIFICACIÓN DE RELACIONES (FOREIGN KEYS)
-- =====================================================================

PRINT '--- 7. VERIFICACIÓN DE RELACIONES (FOREIGN KEYS) ---';
PRINT '';

SELECT 
    fk.name AS ForeignKey,
    OBJECT_NAME(fk.parent_object_id) AS TablaOrigen,
    OBJECT_NAME(fk.referenced_object_id) AS TablaDestino
FROM sys.foreign_keys fk
ORDER BY TablaOrigen;

PRINT '';

-- =====================================================================
-- 8️⃣ CONSULTAS ANALÍTICAS DE PRUEBA
-- =====================================================================

PRINT '--- 8. CONSULTAS ANALÍTICAS ---';
PRINT '';

PRINT 'Resumen de Flota por Empresa:';
SELECT * FROM vw_ResumenFlotaPorEmpresa;
PRINT '';

PRINT 'Top 5 Vehículos con Mayor Costo de Mantenimiento:';
SELECT TOP 5 
    Placa,
    Marca,
    Modelo,
    TotalMantenimientos,
    CostoTotal,
    CostoPromedio
FROM vw_CostosMantenimientoPorVehiculo
ORDER BY CostoTotal DESC;
PRINT '';

PRINT 'Mantenimientos por Tipo:';
SELECT 
    Tipo,
    COUNT(*) AS Cantidad,
    SUM(Costo) AS CostoTotal,
    AVG(Costo) AS CostoPromedio
FROM Mantenimiento
GROUP BY Tipo
ORDER BY CostoTotal DESC;
PRINT '';

PRINT 'Vehículos por Estado Operativo:';
SELECT 
    EstadoOperativo,
    COUNT(*) AS Cantidad
FROM Vehiculo
GROUP BY EstadoOperativo
ORDER BY Cantidad DESC;
PRINT '';

PRINT 'Técnicos con Mayor Cantidad de Trabajos:';
SELECT 
    t.Nombre + ' ' + t.Apellido AS Tecnico,
    t.Especialidad,
    COUNT(m.MantenimientoID) AS TotalTrabajos,
    SUM(m.Costo) AS IngresosGenerados
FROM Tecnico t
LEFT JOIN Mantenimiento m ON t.TecnicoID = m.TecnicoID
GROUP BY t.TecnicoID, t.Nombre, t.Apellido, t.Especialidad
ORDER BY TotalTrabajos DESC;
PRINT '';

-- =====================================================================
-- 9️⃣ PRUEBA DE PROCEDIMIENTOS ALMACENADOS
-- =====================================================================

PRINT '--- 9. PRUEBA DE PROCEDIMIENTOS ALMACENADOS ---';
PRINT '';

PRINT 'Probando sp_ObtenerHistorialMantenimiento para Vehículo ID 1:';
EXEC sp_ObtenerHistorialMantenimiento @VehiculoID = 1;
PRINT '';

-- =====================================================================
-- 🔟 PRUEBA DE FUNCIONES
-- =====================================================================

PRINT '--- 10. PRUEBA DE FUNCIONES ---';
PRINT '';

PRINT 'Costo Total de Mantenimiento por Vehículo:';
SELECT 
    v.Placa,
    v.Marca,
    v.Modelo,
    dbo.fn_CostoTotalMantenimiento(v.VehiculoID) AS CostoTotal,
    dbo.fn_TieneMantenimientoPendiente(v.VehiculoID) AS TieneMantenimientoPendiente
FROM Vehiculo v
ORDER BY CostoTotal DESC;
PRINT '';

-- =====================================================================
-- RESUMEN FINAL
-- =====================================================================

PRINT '=====================================================================';
PRINT 'RESUMEN DE VERIFICACIÓN';
PRINT '=====================================================================';

DECLARE @TotalTablas INT, @TotalProcedimientos INT, @TotalVistas INT, @TotalFunciones INT;
DECLARE @TotalEmpresas INT, @TotalVehiculos INT, @TotalMantenimientos INT;

SELECT @TotalTablas = COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';
SELECT @TotalProcedimientos = COUNT(*) FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE';
SELECT @TotalVistas = COUNT(*) FROM INFORMATION_SCHEMA.VIEWS;
SELECT @TotalFunciones = COUNT(*) FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'FUNCTION';
SELECT @TotalEmpresas = COUNT(*) FROM Empresa;
SELECT @TotalVehiculos = COUNT(*) FROM Vehiculo;
SELECT @TotalMantenimientos = COUNT(*) FROM Mantenimiento;

PRINT 'Objetos de Base de Datos:';
PRINT '  - Tablas: ' + CAST(@TotalTablas AS VARCHAR(10));
PRINT '  - Procedimientos: ' + CAST(@TotalProcedimientos AS VARCHAR(10));
PRINT '  - Vistas: ' + CAST(@TotalVistas AS VARCHAR(10));
PRINT '  - Funciones: ' + CAST(@TotalFunciones AS VARCHAR(10));
PRINT '';
PRINT 'Datos:';
PRINT '  - Empresas: ' + CAST(@TotalEmpresas AS VARCHAR(10));
PRINT '  - Vehículos: ' + CAST(@TotalVehiculos AS VARCHAR(10));
PRINT '  - Mantenimientos: ' + CAST(@TotalMantenimientos AS VARCHAR(10));
PRINT '';

IF @TotalTablas >= 8 AND @TotalProcedimientos >= 4 AND @TotalVistas >= 2 AND @TotalFunciones >= 2
BEGIN
    PRINT '✅ VERIFICACIÓN EXITOSA - Todos los objetos creados correctamente';
END
ELSE
BEGIN
    PRINT '⚠️ ADVERTENCIA - Algunos objetos pueden estar faltando';
END

PRINT '=====================================================================';
GO
