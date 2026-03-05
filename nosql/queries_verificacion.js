// Verificacion MongoDB - FlotIA
use flotia_nosql

print("=== VERIFICACION MONGODB ===");

print("\n1. Colecciones:");
show collections

print("\n2. Conteo de documentos:");
print("Empresas:", db.empresas.countDocuments());
print("Vehiculos:", db.vehiculos.countDocuments());
print("Mantenimientos:", db.mantenimientos.countDocuments());
print("Usuarios:", db.usuarios.countDocuments());
print("Alertas:", db.alertas_predictivas.countDocuments());

print("\n3. Indices en mantenimientos:");
db.mantenimientos.getIndexes().forEach(idx => print(idx.name));

print("\n✅ Verificacion completa");
