## Casos ejecutados

### Pruebas positivas

| Tipo         | Método y ruta                                  | Datos           | Esperado                                     | Obtenido                                     | requestId | Resultado |
| ------------ | ---------------------------------------------- | --------------- | -------------------------------------------- | -------------------------------------------- | --------- | --------- |
| Salud        | GET /health                                    | No aplica       | 200 con `status: ok`                         | 200 con `status: ok`                         |           | Correcto  |
| Salud        | GET /health/database                           | No aplica       | 200 con `database.status: connected`         | 200 con `database.status: connected`         |           | Correcto  |
| Persistencia | POST /api/tasks                                | `title` válido  | 201 y creación del documento en Atlas        | 201 y documento creado en Atlas              |           | Correcto  |
| Persistencia | GET /api/tasks                                 | No aplica       | 200 y contiene el documento creado           | 200 y contiene el documento creado           |           | Correcto  |
| Persistencia | GET /api/tasks/{{taskId}}                      | `taskId` válido | 200 con el mismo recurso                     | 200 con el mismo recurso                     |           | Correcto  |
| Persistencia | GET /api/tasks/{{taskId}} después de reiniciar | `taskId` válido | 200 y conserva la tarea después del reinicio | 200 y conserva la tarea después del reinicio |           | Correcto  |

### Pruebas negativas

| Tipo     | Método y ruta                          | Datos                             | Esperado                                                  | Obtenido                                                    | requestId | Resultado |
| -------- | -------------------------------------- | --------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- | --------- | --------- |
| Negativa | GET /api/tasks/1                       | No aplica                         | 400 `INVALID_ID`                                          | 400 `INVALID_ID`                                            |           | Correcto  |
| Negativa | GET /api/tasks/{{taskId}}              | ObjectId válido no almacenado     | 404 `TASK_NOT_FOUND`                                      | 404 `TASK_NOT_FOUND`                                        |           | Correcto  |
| Negativa | POST /api/tasks                        | `title` vacío                     | 422 `VALIDATION_ERROR`                                    | 422 `VALIDATION_ERROR`                                      |           | Correcto  |
| Negativa | POST /api/tasks                        | `title` con más de 120 caracteres | 422 `VALIDATION_ERROR`                                    | 422 `VALIDATION_ERROR`                                      |           | Correcto  |
| Negativa | POST /api/tasks                        | Sin `application/json`            | 415 `UNSUPPORTED_MEDIA_TYPE`                              | 415 `UNSUPPORTED_MEDIA_TYPE`                                |           | Correcto  |
| Negativa | Inicio de la API con conexión inválida | URI de MongoDB inválida           | Impedir el arranque sin imprimir URI, contraseña ni stack | La API impide el arranque sin exponer credenciales ni stack |           | Correcto  |

### Pruebas de regresión

| Tipo      | Método y ruta                        | Datos               | Esperado                             | Obtenido                             | requestId | Resultado |
| --------- | ------------------------------------ | ------------------- | ------------------------------------ | ------------------------------------ | --------- | --------- |
| Regresión | POST /api/tasks                      | `title` válido      | 201                                  | 201                                  |           | Correcto  |
| Regresión | GET /api/tasks/{{taskId}}            | `taskId` creado     | 200                                  | 200                                  |           | Correcto  |
| Regresión | PATCH /api/tasks/{{taskId}}/complete | `taskId` creado     | 200                                  | 200                                  |           | Correcto  |
| Regresión | GET /api/tasks/{{taskId}}            | `taskId` completado | 200 y estado `completed`             | 200 y estado `completed`             |           | Correcto  |
| Regresión | DELETE /api/tasks/{{taskId}}         | `taskId` creado     | 204                                  | 204                                  |           | Correcto  |
| Regresión | GET /api/tasks/{{taskId}}            | `taskId` eliminado  | 404 `TASK_NOT_FOUND`                 | 404 `TASK_NOT_FOUND`                 |           | Correcto  |
| Regresión | GET /health                          | No aplica           | 200 con `status: ok`                 | 200 con `status: ok`                 |           | Correcto  |
| Regresión | GET /health/database                 | No aplica           | 200 con `database.status: connected` | 200 con `database.status: connected` |           | Correcto  |
| Regresión | Solicitudes con error                | No aplica           | Los errores conservan `requestId`    | Los errores conservan `requestId`    |           | Correcto  |
