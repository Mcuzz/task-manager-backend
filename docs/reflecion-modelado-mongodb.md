# Reflexión sobre el modelado y persistencia en MongoDB

## 1. ¿Qué diferencia existe entre un documento, un esquema y un modelo?

Un **documento** es el dato almacenado; el **esquema** define sus reglas; y el **modelo** permite manipular los documentos desde el código.

## 2. ¿Por qué la API devuelve `id` en lugar de `_id`?

Para ocultar detalles internos de MongoDB y ofrecer al cliente un identificador público más simple.

## 3. ¿Qué problema evita migrar todas las operaciones a una sola fuente de datos?

Evita inconsistencias entre MongoDB y datos almacenados en memoria, además de prevenir la pérdida de información al reiniciar la API.

## 4. ¿Qué reglas aplica el middleware y cuáles repite el esquema?

El **middleware** valida las peticiones HTTP y el **esquema** protege los datos al guardarlos en MongoDB.

## 5. ¿Qué diferencia existe entre `INVALID_ID` y `TASK_NOT_FOUND`?

`INVALID_ID` indica un ID con formato incorrecto (**400**). `TASK_NOT_FOUND` indica un ID válido pero inexistente (**404**).

## 6. ¿Qué hacen `timestamps` y `versionKey: false`?

`timestamps` crea automáticamente `createdAt` y `updatedAt`. `versionKey: false` evita generar el campo `__v`.

## 7. ¿Por qué los controladores deben usar `async` y `await`?

Porque las operaciones con MongoDB son asíncronas y deben completarse antes de enviar la respuesta.

## 8. ¿Cómo llega un `AppError` asíncrono al `errorHandler` de Express 5?

Express 5 captura los errores de funciones `async` y los envía automáticamente al `errorHandler`.

## 9. ¿Qué prueba demuestra realmente que una tarea es persistente?

Crear una tarea, reiniciar la API y comprobar que sigue disponible demuestra que está almacenada en MongoDB.

## 10. ¿Qué información de Mongoose o Atlas nunca debe aparecer en la respuesta HTTP?

Nunca deben exponerse credenciales, URI de conexión, información privada del clúster ni errores internos.