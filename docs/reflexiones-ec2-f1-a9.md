# Reflexión EC3 F1 A9

### 1. ¿Por qué un hash de contraseña no debe poder descifrarse?

Porque su propósito es almacenar una representación de la contraseña sin conservar el valor original. En nuestro proyecto utilizamos bcrypt para generar un hash durante el registro. Cuando el usuario inicia sesión, se compara la contraseña proporcionada con el hash almacenado. No necesitamos recuperar la contraseña original, únicamente comprobar que coincide.

### 2. ¿Qué diferencia existe entre una sal aleatoria y la clave usada para firmar HS256?

La sal aleatoria se utiliza durante el proceso de hashing para que dos contraseñas iguales produzcan hashes diferentes. Por otro lado, la clave secreta de HS256 se utiliza para firmar y verificar los tokens JWT, garantizando que su contenido no haya sido alterado. Son elementos con propósitos diferentes y no deben confundirse ni reutilizarse.

### 3. ¿Por qué passwordHash tiene select false y aun así el login puede recuperarlo?

Porque `select: false` indica a Mongoose que excluya ese campo de las consultas de manera predeterminada. Esto reduce el riesgo de exponer accidentalmente información sensible. Sin embargo, durante el inicio de sesión necesitamos recuperar el hash para comparar la contraseña, por lo que podemos solicitarlo explícitamente mediante `select('+passwordHash')`.

### 4. ¿Por qué unique no sustituye la validación HTTP del correo?

Porque `unique` en Mongoose crea un índice único en MongoDB, pero no constituye una validación completa de la solicitud HTTP. La validación HTTP permite comprobar que el correo tenga un formato correcto y proporcionar errores controlados. Además, el índice único protege la integridad de los datos ante registros duplicados, incluso cuando dos solicitudes intentan registrar el mismo correo casi simultáneamente.

### 5. ¿Qué riesgo evita rechazar el campo role durante el registro?

Evita que un usuario pueda asignarse privilegios que no le corresponden. Si la API aceptara libremente el campo `role`, alguien podría enviar `"role": "admin"` durante el registro y obtener permisos administrativos. Por eso el servidor debe controlar la asignación del rol y rechazar campos que el cliente no tiene permitido establecer.

### 6. ¿Por qué correo inexistente y contraseña incorrecta devuelven el mismo mensaje?

Para evitar la enumeración de usuarios. Si la API respondiera de manera diferente cuando un correo no existe, una persona podría utilizar esas respuestas para descubrir qué cuentas están registradas. Al devolver el mismo código y mensaje para ambos escenarios, se reduce la cantidad de información que se revela sobre los usuarios.

### 7. ¿Qué información contiene el JWT de esta actividad y qué información se excluye?

El JWT contiene claims que permiten identificar y validar el contexto de autenticación. En esta actividad se inspeccionan principalmente `sub`, que identifica al usuario, y `role`, que representa su rol. También se incluyen datos de control como `iss`, `aud` y `exp`. Se excluyen contraseñas, hashes y otros datos sensibles. El JWT está firmado, pero su contenido no está cifrado, por lo que no debe utilizarse para almacenar información confidencial.

### 8. ¿Qué validan issuer, audience, algorithms y exp?

- `issuer`: comprueba quién emitió el token.
- `audience`: verifica que el token esté destinado a la aplicación o servicio que lo recibe.
- `algorithms`: restringe los algoritmos permitidos para verificar la firma, evitando aceptar algoritmos no autorizados.
- `exp`: establece la fecha y hora de expiración del token para impedir que siga siendo aceptado después de ese momento.

Estas comprobaciones ayudan a determinar si un JWT es válido y puede aceptarse para una operación protegida.

### 9. ¿Cómo llega un error de MongoDB desde el repositorio hasta errorHandler en Express 5?

Cuando una operación del repositorio ejecuta una consulta a MongoDB y esta falla, se produce un error que se propaga hacia las capas superiores. El servicio y el controlador no necesitan ocultarlo ni convertirlo en una respuesta improvisada. En Express 5, los errores de funciones asíncronas se propagan automáticamente al middleware de manejo de errores cuando la promesa rechazada no se captura. Finalmente, `errorHandler` recibe el error y genera una respuesta HTTP con el formato establecido por la API.

### 10. ¿Por qué las rutas de tareas permanecen públicas en A9 y qué cambiará en A10?

En A9 se conservó el acceso público a las rutas de tareas para mantener la compatibilidad con el CRUD desarrollado anteriormente y comprobar que la incorporación de autenticación no afectara las funcionalidades existentes. Para A10, de acuerdo con los requisitos de la siguiente etapa, se deberá incorporar la autenticación y, si corresponde, la autorización para controlar qué usuarios pueden consultar o modificar los recursos. Esto permitirá asociar las tareas con sus propietarios y restringir el acceso según la identidad del usuario autenticado.