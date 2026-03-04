-- =====================================================================
-- PROYECTO: FlotIA - Gestión Inteligente de Flotas
-- STARTUP: KunturData
-- MODELO: Relacional (SQL Server)
-- =====================================================================

CREATE DATABASE FlotIA_DB;
GO

USE FlotIA_DB;
GO

-- =====================================================================
-- 1️⃣ TABLAS MAESTRAS
-- =====================================================================

-- ---------------------------------------------------------------------
-- Tabla: Empresa
-- ---------------------------------------------------------------------
CREATE TABLE Empresa (
    EmpresaID INT IDENTITY(1,1) PRIMARY KEY,
    RazonSocial VARCHAR(150) NOT NULL,
    RUC VARCHAR(11) UNIQUE NOT NULL,
    Sector VARCHAR(100),
    Direccion VARCHAR(200),
    Telefono VARCHAR(15),
    Email VARCHAR(100),
    FechaRegistro DATETIME DEFAULT GETDATE(),
    Estado VARCHAR(20) DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Inactivo'))
);
GO

-- ---------------------------------------------------------------------
-- Tabla: Vehiculo
-- ---------------------------------------------------------------------
CREATE TABLE Vehiculo (
    VehiculoID INT IDENTITY(1,1) PRIMARY KEY,
    EmpresaID INT NOT NULL,
    Placa VARCHAR(10) UNIQUE NOT NULL,
    Marca VARCHAR(50) NOT NULL,
    Modelo VARCHAR(50) NOT NULL,
    Anio INT CHECK (Anio >= 1900 AND Anio <= YEAR(GETDATE())),
    Tipo VARCHAR(50) CHECK (Tipo IN ('Camion', 'Camioneta', 'Auto', 'Bus', 'Moto')),
    KilometrajeActual INT DEFAULT 0 CHECK (KilometrajeActual >= 0),
    EstadoOperativo VARCHAR(50) DEFAULT 'Operativo' CHECK (EstadoOperativo IN ('Operativo', 'En mantenimiento', 'Fuera de servicio')),
    FechaRegistro DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (EmpresaID) REFERENCES Empresa(EmpresaID) ON DELETE CASCADE
);
GO

-- ---------------------------------------------------------------------
-- Tabla: Tecnico
-- ---------------------------------------------------------------------
CREATE TABLE Tecnico (
    TecnicoID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    DNI VARCHAR(8) UNIQUE NOT NULL,
    Especialidad VARCHAR(100) NOT NULL,
    Certificacion BIT DEFAULT 0,
    Telefono VARCHAR(15),
    Email VARCHAR(100),
    FechaContratacion DATE DEFAULT CAST(GETDATE() AS DATE),
    Estado VARCHAR(20) DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Inactivo'))
);
GO

-- ---------------------------------------------------------------------
-- Tabla: Componente
-- ---------------------------------------------------------------------
CREATE TABLE Componente (
    ComponenteID INT IDENTITY(1,1) PRIMARY KEY,
    VehiculoID INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Tipo VARCHAR(50) CHECK (Tipo IN ('Motor', 'Transmision', 'Frenos', 'Suspension', 'Electrico', 'Neumaticos', 'Otro')),
    FechaInstalacion DATE,
    VidaUtilKm INT,
    Estado VARCHAR(20) DEFAULT 'Bueno' CHECK (Estado IN ('Excelente', 'Bueno', 'Regular', 'Malo', 'Critico')),
    FOREIGN KEY (VehiculoID) REFERENCES Vehiculo(VehiculoID) ON DELETE CASCADE
);
GO

-- =====================================================================
-- 2️⃣ TABLAS TRANSACCIONALES
-- =====================================================================

-- ---------------------------------------------------------------------
-- Tabla: Mantenimiento
-- ---------------------------------------------------------------------
CREATE TABLE Mantenimiento (
    MantenimientoID INT IDENTITY(1,1) PRIMARY KEY,
    VehiculoID INT NOT NULL,
    TecnicoID INT NOT NULL,
    Fecha DATETIME DEFAULT GETDATE(),
    Tipo VARCHAR(50) CHECK (Tipo IN ('Preventivo', 'Correctivo', 'Predictivo')),
    Costo DECIMAL(10,2) CHECK (Costo >= 0),
    Descripcion TEXT,
    KilometrajeRegistrado INT,
    Duracion INT,
    Estado VARCHAR(20) DEFAULT 'Completado' CHECK (Estado IN ('Programado', 'En proceso', 'Completado', 'Cancelado')),
    FOREIGN KEY (VehiculoID) REFERENCES Vehiculo(VehiculoID),
    FOREIGN KEY (TecnicoID) REFERENCES Tecnico(TecnicoID)
);
GO

-- ---------------------------------------------------------------------
-- Tabla: PlanMantenimiento
-- ---------------------------------------------------------------------
CREATE TABLE PlanMantenimiento (
    PlanID INT IDENTITY(1,1) PRIMARY KEY,
    VehiculoID INT NOT NULL,
    FechaProgramada DATE NOT NULL,
    Tipo VARCHAR(20) CHECK (Tipo IN ('Preventivo', 'Predictivo')),
    KilometrajeObjetivo INT,
    Descripcion VARCHAR(500),
    Estado VARCHAR(20) DEFAULT 'Pendiente' CHECK (Estado IN ('Pendiente', 'Ejecutado', 'Cancelado')),
    FechaCreacion DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (VehiculoID) REFERENCES Vehiculo(VehiculoID)
);
GO

-- ---------------------------------------------------------------------
-- Tabla: Usuario
-- ---------------------------------------------------------------------
CREATE TABLE Usuario (
    UsuarioID INT IDENTITY(1,1) PRIMARY KEY,
    EmpresaID INT,
    NombreUsuario VARCHAR(50) UNIQUE NOT NULL,
    Contrasena VARCHAR(255) NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Rol VARCHAR(50) CHECK (Rol IN ('Administrador', 'Supervisor', 'Tecnico', 'Consulta')),
    FechaCreacion DATETIME DEFAULT GETDATE(),
    UltimoAcceso DATETIME,
    Estado VARCHAR(20) DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Inactivo')),
    FOREIGN KEY (EmpresaID) REFERENCES Empresa(EmpresaID)
);
GO

-- ---------------------------------------------------------------------
-- Tabla: Reporte
-- ---------------------------------------------------------------------
CREATE TABLE Reporte (
    ReporteID INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioID INT NOT NULL,
    TipoReporte VARCHAR(100) NOT NULL,
    FechaGeneracion DATETIME DEFAULT GETDATE(),
    Parametros TEXT,
    Resultado TEXT,
    FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
);
GO

-- =====================================================================
-- 3️⃣ ÍNDICES PARA OPTIMIZACIÓN
-- =====================================================================

CREATE INDEX idx_vehiculo_empresa ON Vehiculo(EmpresaID);
CREATE INDEX idx_vehiculo_placa ON Vehiculo(Placa);
CREATE INDEX idx_mantenimiento_vehiculo ON Mantenimiento(VehiculoID);
CREATE INDEX idx_mantenimiento_fecha ON Mantenimiento(Fecha);
CREATE INDEX idx_mantenimiento_tipo ON Mantenimiento(Tipo);
CREATE INDEX idx_componente_vehiculo ON Componente(VehiculoID);
CREATE INDEX idx_plan_vehiculo ON PlanMantenimiento(VehiculoID);
CREATE INDEX idx_plan_fecha ON PlanMantenimiento(FechaProgramada);
GO

-- =====================================================================
-- 4️⃣ PROCEDIMIENTOS ALMACENADOS
-- =====================================================================

-- ---------------------------------------------------------------------
-- Procedimiento: Registrar Vehículo
-- ---------------------------------------------------------------------
CREATE PROCEDURE sp_RegistrarVehiculo
    @EmpresaID INT,
    @Placa VARCHAR(10),
    @Marca VARCHAR(50),
    @Modelo VARCHAR(50),
    @Anio INT,
    @Tipo VARCHAR(50),
    @Kilometraje INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO Vehiculo(EmpresaID, Placa, Marca, Modelo, Anio, Tipo, KilometrajeActual)
        VALUES(@EmpresaID, @Placa, @Marca, @Modelo, @Anio, @Tipo, @Kilometraje);
        
        SELECT 'Vehículo registrado exitosamente' AS Mensaje, SCOPE_IDENTITY() AS VehiculoID;
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS Error;
    END CATCH
END;
GO

-- ---------------------------------------------------------------------
-- Procedimiento: Registrar Mantenimiento
-- ---------------------------------------------------------------------
CREATE PROCEDURE sp_RegistrarMantenimiento
    @VehiculoID INT,
    @TecnicoID INT,
    @Tipo VARCHAR(50),
    @Costo DECIMAL(10,2),
    @Descripcion TEXT,
    @KilometrajeRegistrado INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;
        
        INSERT INTO Mantenimiento(VehiculoID, TecnicoID, Tipo, Costo, Descripcion, KilometrajeRegistrado)
        VALUES(@VehiculoID, @TecnicoID, @Tipo, @Costo, @Descripcion, @KilometrajeRegistrado);
        
        IF @Tipo = 'Correctivo'
        BEGIN
            UPDATE Vehiculo 
            SET EstadoOperativo = 'En mantenimiento'
            WHERE VehiculoID = @VehiculoID;
        END
        
        COMMIT TRANSACTION;
        SELECT 'Mantenimiento registrado exitosamente' AS Mensaje, SCOPE_IDENTITY() AS MantenimientoID;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        SELECT ERROR_MESSAGE() AS Error;
    END CATCH
END;
GO

-- ---------------------------------------------------------------------
-- Procedimiento: Actualizar Kilometraje
-- ---------------------------------------------------------------------
CREATE PROCEDURE sp_ActualizarKilometraje
    @VehiculoID INT,
    @NuevoKilometraje INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        UPDATE Vehiculo
        SET KilometrajeActual = @NuevoKilometraje
        WHERE VehiculoID = @VehiculoID;
        
        SELECT 'Kilometraje actualizado exitosamente' AS Mensaje;
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS Error;
    END CATCH
END;
GO

-- ---------------------------------------------------------------------
-- Procedimiento: Obtener Historial de Mantenimiento
-- ---------------------------------------------------------------------
CREATE PROCEDURE sp_ObtenerHistorialMantenimiento
    @VehiculoID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        m.MantenimientoID,
        m.Fecha,
        m.Tipo,
        m.Costo,
        m.Descripcion,
        m.KilometrajeRegistrado,
        t.Nombre + ' ' + t.Apellido AS Tecnico,
        t.Especialidad
    FROM Mantenimiento m
    INNER JOIN Tecnico t ON m.TecnicoID = t.TecnicoID
    WHERE m.VehiculoID = @VehiculoID
    ORDER BY m.Fecha DESC;
END;
GO

-- =====================================================================
-- 5️⃣ VISTAS ANALÍTICAS
-- =====================================================================

-- ---------------------------------------------------------------------
-- Vista: Resumen de Flota por Empresa
-- ---------------------------------------------------------------------
CREATE VIEW vw_ResumenFlotaPorEmpresa AS
SELECT 
    e.EmpresaID,
    e.RazonSocial,
    COUNT(v.VehiculoID) AS TotalVehiculos,
    SUM(CASE WHEN v.EstadoOperativo = 'Operativo' THEN 1 ELSE 0 END) AS VehiculosOperativos,
    SUM(CASE WHEN v.EstadoOperativo = 'En mantenimiento' THEN 1 ELSE 0 END) AS VehiculosEnMantenimiento,
    SUM(CASE WHEN v.EstadoOperativo = 'Fuera de servicio' THEN 1 ELSE 0 END) AS VehiculosFueraServicio
FROM Empresa e
LEFT JOIN Vehiculo v ON e.EmpresaID = v.EmpresaID
GROUP BY e.EmpresaID, e.RazonSocial;
GO

-- ---------------------------------------------------------------------
-- Vista: Costos de Mantenimiento por Vehículo
-- ---------------------------------------------------------------------
CREATE VIEW vw_CostosMantenimientoPorVehiculo AS
SELECT 
    v.VehiculoID,
    v.Placa,
    v.Marca,
    v.Modelo,
    COUNT(m.MantenimientoID) AS TotalMantenimientos,
    SUM(m.Costo) AS CostoTotal,
    AVG(m.Costo) AS CostoPromedio,
    MAX(m.Fecha) AS UltimoMantenimiento
FROM Vehiculo v
LEFT JOIN Mantenimiento m ON v.VehiculoID = m.VehiculoID
GROUP BY v.VehiculoID, v.Placa, v.Marca, v.Modelo;
GO

-- =====================================================================
-- 6️⃣ FUNCIONES ÚTILES
-- =====================================================================

-- ---------------------------------------------------------------------
-- Función: Calcular Costo Total de Mantenimiento
-- ---------------------------------------------------------------------
CREATE FUNCTION fn_CostoTotalMantenimiento(@VehiculoID INT)
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @Total DECIMAL(10,2);
    
    SELECT @Total = ISNULL(SUM(Costo), 0)
    FROM Mantenimiento
    WHERE VehiculoID = @VehiculoID;
    
    RETURN @Total;
END;
GO

-- ---------------------------------------------------------------------
-- Función: Verificar Mantenimiento Pendiente
-- ---------------------------------------------------------------------
CREATE FUNCTION fn_TieneMantenimientoPendiente(@VehiculoID INT)
RETURNS BIT
AS
BEGIN
    DECLARE @Pendiente BIT = 0;
    
    IF EXISTS (
        SELECT 1 
        FROM PlanMantenimiento 
        WHERE VehiculoID = @VehiculoID 
        AND Estado = 'Pendiente'
        AND FechaProgramada <= GETDATE()
    )
    BEGIN
        SET @Pendiente = 1;
    END
    
    RETURN @Pendiente;
END;
GO
