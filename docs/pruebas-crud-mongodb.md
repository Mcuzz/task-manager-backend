| Tipo      | Método | Ruta o condición                      | Datos                                  | Esperado                      | Resultado |
| --------- | ------ | ------------------------------------- | -------------------------------------- | ----------------------------- | --------- |
| Positiva  | POST   | `/api/tasks`                          | `{"title":"Tarea"}`                    | 201 Creado                    | Correcto  |
| Positiva  | GET    | `/api/tasks`                          | Sin cuerpo                             | 200 Lista                     | Correcto  |
| Positiva  | GET    | `/api/tasks/13`                       | Sin cuerpo                             | 200 Localizado                | Correcto  |
| Positiva  | PATCH  | `/api/tasks/13`                       | `{"title":"Nuevo"}`                    | 200 Título actualizado        | Correcto  |
| Positiva  | PATCH  | `/api/tasks/13`                       | `{"status":"completed"}`               | 200 Estado actualizado        | Correcto  |
| Positiva  | PATCH  | `/api/tasks/13`                       | `{"title":"Nuevo","status":"pending"}` | 200 Ambos campos actualizados | Correcto  |
| Regresión | PATCH  | `/api/tasks/13/complete`              | Sin cuerpo                             | 200 Completada                | Correcto  |
| Positiva  | DELETE | `/api/tasks/13`                       | Sin cuerpo                             | 204 Eliminada                 | Correcto  |
| Negativa  | GET    | `/api/tasks/1`                        | Sin cuerpo                             | 400 `INVALID_ID`              | Correcto  |
| Negativa  | GET    | `/api/tasks/507f1f77bcf86cd799439011` | ObjectId inexistente                   | 404 `TASK_NOT_FOUND`          | Correcto  |
| Negativa  | PATCH  | `/api/tasks/13`                       | `{}`                                   | 422 `VALIDATION_ERROR`        | Correcto  |
| Negativa  | PATCH  | `/api/tasks/13`                       | `{"status":"archived"}`                | 422 Estado rechazado          | Correcto  |
| Negativa  | PATCH  | `/api/tasks/13`                       | `{"owner":"Ana"}`                      | 422 Campo rechazado           | Correcto  |
| Negativa  | PATCH  | `/api/tasks/13`                       | JSON mal formado                       | 400 `INVALID_JSON`            | Correcto  |
| Negativa  | PATCH  | `/api/tasks/13`                       | Sin `application/json`                 | 415 `UNSUPPORTED_MEDIA_TYPE`  | Correcto  |
| Negativa  | DELETE | ObjectId inexistente                  | Sin cuerpo                             | 404 No encontrado             | Correcto  |
| Negativa  | GET    | `/api/tasks`                          | Atlas no disponible                    | 503 `DATABASE_UNAVAILABLE`    | Correcto  |