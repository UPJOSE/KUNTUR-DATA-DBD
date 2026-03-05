-- =====================================================================
-- PROYECTO: FlotIA - Gestion Inteligente de Flotas
-- DATOS DE PRUEBA
-- =====================================================================

USE FlotIA_DB;
GO

-- =====================================================================
-- 1️⃣ INSERCION DE EMPRESAS
-- =====================================================================

INSERT INTO Empresa (RazonSocial, RUC, Sector, Direccion, Telefono, Email) VALUES
('Transportes Rapidos SAC', '20123456789', 'Transporte de Carga', 'Av. Industrial 123, Lima', '01-2345678', 'contacto@rapidossac.com'),
('Logistica del Sur EIRL', '20987654321', 'Logistica', 'Jr. Comercio 456, Arequipa', '054-234567', 'info@logisticasur.com'),
('Distribuidora Norte SA', '20456789123', 'Distribucion', 'Av. Grau 789, Trujillo', '044-345678', 'ventas@distrinorte.com'),
('Servicios Express Peru', '20321654987', 'Mensajeria', 'Calle Lima 321, Cusco', '084-456789', 'servicios@expressperu.com');
GO

-- =====================================================================
-- 2️⃣ INSERCION DE VEHICULOS
-- =====================================================================

INSERT INTO Vehiculo (EmpresaID, Placa, Marca, Modelo, Anio, Tipo, KilometrajeActual, EstadoOperativo) VALUES
(1, 'ABC-123', 'Volvo', 'FH16', 2020, 'Camion', 45000, 'Operativo'),
(1, 'ABC-124', 'Scania', 'R450', 2021, 'Camion', 32000, 'Operativo'),
(1, 'ABC-125', 'Mercedes-Benz', 'Actros', 2019, 'Camion', 67000, 'En mantenimiento'),
(2, 'DEF-456', 'Toyota', 'Hilux', 2022, 'Camioneta', 15000, 'Operativo'),
(2, 'DEF-457', 'Nissan', 'Frontier', 2021, 'Camioneta', 28000, 'Operativo'),
(2, 'DEF-458', 'Ford', 'Ranger', 2020, 'Camioneta', 42000, 'Operativo'),
(3, 'GHI-789', 'Hyundai', 'HD78', 2022, 'Camion', 18000, 'Operativo'),
(3, 'GHI-790', 'Isuzu', 'NQR', 2021, 'Camion', 35000, 'Operativo'),
(4, 'JKL-012', 'Honda', 'CRV', 2023, 'Auto', 8000, 'Operativo'),
(4, 'JKL-013', 'Suzuki', 'Vitara', 2022, 'Auto', 12000, 'Operativo'),
(1, 'ABC-126', 'Volvo', 'FM', 2018, 'Camion', 95000, 'Fuera de servicio'),
(2, 'DEF-459', 'Mitsubishi', 'L200', 2019, 'Camioneta', 58000, 'En mantenimiento');
GO

-- =====================================================================
-- 3️⃣ INSERCION DE TECNICOS
-- =====================================================================

INSERT INTO Tecnico (Nombre, Apellido, DNI, Especialidad, Certificacion, Telefono, Email) VALUES
('Carlos', 'Mendoza', '12345678', 'Mecanica Diesel', 1, '987654321', 'cmendoza@tech.com'),
('Ana', 'Garcia', '23456789', 'Electricidad Automotriz', 1, '987654322', 'agarcia@tech.com'),
('Luis', 'Rodriguez', '34567890', 'Transmision y Frenos', 1, '987654323', 'lrodriguez@tech.com'),
('Maria', 'Torres', '45678901', 'Mecanica General', 0, '987654324', 'mtorres@tech.com'),
('Jorge', 'Ramirez', '56789012', 'Sistemas Hidraulicos', 1, '987654325', 'jramirez@tech.com'),
('Patricia', 'Flores', '67890123', 'Diagnostico Electronico', 1, '987654326', 'pflores@tech.com');
GO

-- =====================================================================
-- 4️⃣ INSERCION DE COMPONENTES
-- =====================================================================

INSERT INTO Componente (VehiculoID, Nombre, Tipo, FechaInstalacion, VidaUtilKm, Estado) VALUES
(1, 'Motor Volvo D13', 'Motor', '2020-01-15', 500000, 'Bueno'),
(1, 'Transmision I-Shift', 'Transmision', '2020-01-15', 400000, 'Bueno'),
(1, 'Sistema de Frenos ABS', 'Frenos', '2020-01-15', 200000, 'Excelente'),
(2, 'Motor Scania DC13', 'Motor', '2021-03-20', 500000, 'Excelente'),
(2, 'Suspension Neumatica', 'Suspension', '2021-03-20', 300000, 'Bueno'),
(3, 'Motor OM471', 'Motor', '2019-05-10', 500000, 'Regular'),
(3, 'Sistema Electrico 24V', 'Electrico', '2019-05-10', 250000, 'Malo'),
(4, 'Motor 2.8L Turbo', 'Motor', '2022-02-15', 300000, 'Excelente'),
(5, 'Transmision Manual 6V', 'Transmision', '2021-06-20', 250000, 'Bueno'),
(6, 'Neumaticos Michelin', 'Neumaticos', '2023-01-10', 80000, 'Bueno');
GO

-- =====================================================================
-- 5️⃣ INSERCION DE MANTENIMIENTOS
-- =====================================================================

INSERT INTO Mantenimiento (VehiculoID, TecnicoID, Fecha, Tipo, Costo, Descripcion, KilometrajeRegistrado, Duracion, Estado) VALUES
(1, 1, '2024-01-15 08:00:00', 'Preventivo', 850.00, 'Cambio de aceite y filtros', 40000, 120, 'Completado'),
(1, 3, '2024-02-20 09:30:00', 'Preventivo', 1200.00, 'Revision de frenos y suspension', 42000, 180, 'Completado'),
(2, 1, '2024-01-10 10:00:00', 'Preventivo', 900.00, 'Mantenimiento programado 30000km', 30000, 150, 'Completado'),
(3, 2, '2024-03-01 08:30:00', 'Correctivo', 3500.00, 'Reparacion sistema electrico - falla en alternador', 65000, 480, 'Completado'),
(3, 2, '2024-03-10 14:00:00', 'Correctivo', 2800.00, 'Reemplazo de bateria y cableado', 65500, 240, 'Completado'),
(4, 4, '2024-02-05 11:00:00', 'Preventivo', 650.00, 'Cambio de aceite y rotacion de neumaticos', 14000, 90, 'Completado'),
(5, 3, '2024-01-25 13:00:00', 'Preventivo', 1100.00, 'Revision de transmision y embrague', 27000, 200, 'Completado'),
(6, 5, '2024-02-28 09:00:00', 'Correctivo', 1800.00, 'Reparacion de sistema hidraulico', 41000, 300, 'Completado'),
(7, 1, '2024-03-05 08:00:00', 'Preventivo', 950.00, 'Mantenimiento preventivo general', 17000, 140, 'Completado'),
(8, 6, '2024-02-15 10:30:00', 'Predictivo', 450.00, 'Diagnostico electronico preventivo', 34000, 60, 'Completado'),
(1, 2, '2024-03-15 15:00:00', 'Correctivo', 2200.00, 'Reparacion sensor de temperatura', 44000, 180, 'Completado'),
(2, 4, '2024-03-08 11:30:00', 'Preventivo', 780.00, 'Cambio de filtros de aire y combustible', 31500, 100, 'Completado'),
(3, 1, '2024-03-20 08:00:00', 'Correctivo', 4500.00, 'Overhaul de motor - reparacion mayor', 67000, 960, 'En proceso'),
(4, 3, '2024-03-12 14:30:00', 'Preventivo', 890.00, 'Alineacion y balanceo', 15000, 120, 'Completado'),
(11, 5, '2024-02-10 09:00:00', 'Correctivo', 8500.00, 'Reconstruccion de transmision', 92000, 1200, 'Completado'),
(12, 2, '2024-03-18 10:00:00', 'Correctivo', 1950.00, 'Reparacion de sistema de inyeccion', 57500, 360, 'En proceso');
GO

-- =====================================================================
-- 6️⃣ INSERCION DE PLANES DE MANTENIMIENTO
-- =====================================================================

INSERT INTO PlanMantenimiento (VehiculoID, FechaProgramada, Tipo, KilometrajeObjetivo, Descripcion, Estado) VALUES
(1, '2024-04-15', 'Preventivo', 50000, 'Mantenimiento programado 50000km', 'Pendiente'),
(2, '2024-04-20', 'Preventivo', 40000, 'Revision general y cambio de aceite', 'Pendiente'),
(4, '2024-04-10', 'Preventivo', 20000, 'Mantenimiento 20000km', 'Pendiente'),
(5, '2024-04-25', 'Preventivo', 35000, 'Revision de transmision', 'Pendiente'),
(6, '2024-05-01', 'Preventivo', 50000, 'Mantenimiento mayor', 'Pendiente'),
(7, '2024-04-18', 'Preventivo', 25000, 'Servicio programado', 'Pendiente'),
(8, '2024-04-22', 'Predictivo', 40000, 'Analisis predictivo de componentes', 'Pendiente'),
(9, '2024-04-12', 'Preventivo', 15000, 'Primer servicio mayor', 'Pendiente'),
(10, '2024-04-28', 'Preventivo', 20000, 'Mantenimiento programado', 'Pendiente'),
(1, '2024-03-01', 'Preventivo', 45000, 'Revision trimestral', 'Ejecutado');
GO

-- =====================================================================
-- 7️⃣ INSERCION DE USUARIOS
-- =====================================================================

INSERT INTO Usuario (EmpresaID, NombreUsuario, Contrasena, Nombre, Apellido, Email, Rol) VALUES
(1, 'admin.rapidos', 'hash_password_123', 'Roberto', 'Sanchez', 'rsanchez@rapidossac.com', 'Administrador'),
(1, 'supervisor.rapidos', 'hash_password_456', 'Elena', 'Vargas', 'evargas@rapidossac.com', 'Supervisor'),
(2, 'admin.sur', 'hash_password_789', 'Miguel', 'Castro', 'mcastro@logisticasur.com', 'Administrador'),
(3, 'admin.norte', 'hash_password_012', 'Carmen', 'Diaz', 'cdiaz@distrinorte.com', 'Administrador'),
(4, 'admin.express', 'hash_password_345', 'Fernando', 'Quispe', 'fquispe@expressperu.com', 'Administrador'),
(NULL, 'tecnico.carlos', 'hash_password_678', 'Carlos', 'Mendoza', 'cmendoza@tech.com', 'Tecnico'),
(NULL, 'consulta.general', 'hash_password_901', 'Andrea', 'Lopez', 'alopez@flotia.com', 'Consulta');
GO

-- =====================================================================
-- 8️⃣ INSERCION DE REPORTES
-- =====================================================================

INSERT INTO Reporte (UsuarioID, TipoReporte, Parametros, Resultado) VALUES
(1, 'Costos Mensuales', 'Mes: Marzo 2024', 'Total gastado: S/ 15,450.00'),
(2, 'Estado de Flota', 'Fecha: 2024-03-20', 'Operativos: 3, En mantenimiento: 1'),
(3, 'Mantenimientos Pendientes', 'Empresa: 2', 'Total pendientes: 2'),
(4, 'Rendimiento de Tecnicos', 'Mes: Marzo 2024', 'Promedio satisfaccion: 4.5/5');
GO

-- =====================================================================
-- 9️⃣ CONSULTAS DE VERIFICACION
-- =====================================================================

PRINT '========================================';
PRINT 'VERIFICACION DE DATOS INSERTADOS';
PRINT '========================================';
PRINT '';

PRINT 'Total de Empresas: ';
SELECT COUNT(*) AS Total FROM Empresa;
PRINT '';

PRINT 'Total de Vehiculos: ';
SELECT COUNT(*) AS Total FROM Vehiculo;
PRINT '';

PRINT 'Total de Tecnicos: ';
SELECT COUNT(*) AS Total FROM Tecnico;
PRINT '';

PRINT 'Total de Mantenimientos: ';
SELECT COUNT(*) AS Total FROM Mantenimiento;
PRINT '';

PRINT 'Resumen por Empresa:';
SELECT * FROM vw_ResumenFlotaPorEmpresa;
PRINT '';

PRINT 'Costos de Mantenimiento por Vehiculo (Top 5):';
SELECT TOP 5 * FROM vw_CostosMantenimientoPorVehiculo ORDER BY CostoTotal DESC;
GO
