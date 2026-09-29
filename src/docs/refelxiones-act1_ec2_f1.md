
## 1. ¿Qué diferencia existe entre tu cuenta de Atlas y el usuario de base de datos?

La cuenta de Atlas administra el proyecto y sus recursos. El usuario de base de datos es quien tiene permisos para conectarse y trabajar con MongoDB.

## 2. ¿Por qué MONGODB_URI se considera un secreto aunque el repositorio sea privado?

Porque contiene información de conexión y credenciales que podrían permitir el acceso a la base de datos.

## 3. ¿Qué riesgo introduce permitir 0.0.0.0/0 en la lista de acceso?

Permite conexiones desde cualquier dirección IP, aumentando considerablemente la superficie de ataque.

## 4. ¿Por qué la API espera connectDatabase antes de ejecutar app.listen?

Para asegurar que la base de datos esté disponible antes de aceptar solicitudes de los clientes.

## 5. ¿Qué comprueba readyState y qué añade el comando ping?

readyState indica el estado de conexión de Mongoose. El ping comprueba que realmente existe comunicación con MongoDB.

## 6. ¿Por qué una falla de MongoDB corresponde a infraestructura y no a validación HTTP?

Porque el problema ocurre en la comunicación con la base de datos y no en los datos enviados por el cliente.

## 7. ¿Cómo llega un AppError lanzado por getDatabaseHealth al manejador central en Express 5?

Express 5 captura automáticamente el error de la función asíncrona y lo envía al errorHandler central.

## 8. ¿Qué pruebas demuestran que la incorporación de Atlas no rompió la API anterior?

Las pruebas de regresión de GET /api/tasks, POST /api/tasks y las validaciones anteriores demuestran que las rutas continúan funcionando.

## 9. ¿Por qué el arreglo en memoria se conserva todavía en esta actividad?

Porque esta actividad se enfoca en configurar y comprobar la conexión con Atlas; la persistencia con MongoDB se implementará posteriormente.

## 10. ¿Qué información debe ocultarse al cliente cuando ocurre un error de conexión?

La URI, contraseña, host, stack trace y detalles internos de Mongoose.