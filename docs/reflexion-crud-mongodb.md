## ¿Qué operación de Mongoose corresponde a cada letra de CRUD?**  
   Create: `create()`, Read: `find()` / `findById()`, Update: `findByIdAndUpdate()`, Delete: `findByIdAndDelete()`.

## ¿Por qué se usa PATCH y no un reemplazo completo del documento?**  
   Porque permite modificar únicamente los campos enviados sin reemplazar el documento completo.

## ¿Qué problema evita `$set`?**  
   Actualiza solo los campos especificados, evitando sobrescribir otros datos del documento.

## ¿Qué efecto tienen `new: true` y `runValidators: true`?**  
   `new: true` devuelve el documento actualizado y `runValidators: true` ejecuta las validaciones del esquema.

## ¿Por qué un cuerpo vacío debe rechazarse?**  
   Porque no contiene cambios que aplicar y evita solicitudes de actualización sin propósito.

## ¿Qué diferencia existe entre `INVALID_ID` y `TASK_NOT_FOUND`?**  
   `INVALID_ID` indica que el identificador tiene un formato inválido; `TASK_NOT_FOUND` indica que el ID es válido, pero la tarea no existe.

## ¿Qué responsabilidad cumple `validateTaskUpdate` y cuál cumple `TaskModel`?**  
   `validateTaskUpdate` valida los datos recibidos por HTTP; `TaskModel` define y valida las reglas de persistencia en MongoDB.

## ¿Cómo llega un error de `updateTask` al `errorHandler` de Express 5?**  
   Si la función asíncrona rechaza su promesa, Express 5 transfiere automáticamente el error al middleware de errores.

## ¿Por qué DELETE responde 204 sin cuerpo?**  
   Porque `204 No Content` indica que la operación se completó correctamente y no requiere contenido en la respuesta.

## ¿Qué prueba demuestra que el CRUD es persistente y no solo funcional en memoria?**  
    Crear o modificar una tarea, reiniciar el servidor y consultar nuevamente el documento para comprobar que los cambios se conservaron en MongoDB.