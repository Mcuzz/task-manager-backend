# Pruebas de validación y errores

Se realizaron las pruebas de validación, manejo centralizado de errores y regresión mediante Postman sobre la colección **Task API EC1 F3 A4**. Los resultados obtenidos coincidieron con los códigos de estado y códigos de error esperados en todos los casos.

| Caso                       | Método y ruta                 | Datos enviados                            | Esperado                     | Obtenido                     | requestId       | Resultado |
| -------------------------- | ----------------------------- | ----------------------------------------- | ---------------------------- | ---------------------------- | --------------- | --------- |
| 1. Listar tareas           | `GET /api/tasks`              | No aplica                                 | `200`                        | `200`                        | `ddfd250e-945b-4d7b-9d0f-64b5f12d7c95` | PASS      |
| 2. ID no numérico          | `GET /api/tasks/abc`          | No aplica                                 | `400 INVALID_ID`             | `400 INVALID_ID`             | `5e384037-bdbd-40ee-9895-6dc105dddd59` | PASS      |
| 3. Tarea inexistente       | `GET /api/tasks/999`          | No aplica                                 | `404 TASK_NOT_FOUND`         | `404 TASK_NOT_FOUND`         | `246210ef-b1df-4e91-a587-58b5647c428c` | PASS      |
| 4. Crear tarea válida      | `POST /api/tasks`             | `{"title":"Tarea de prueba"}`             | `201`                        | `201`                        | `ebab9f54-0884-46a2-b417-c04a0ed3ea03` | PASS      |
| 5. Content-Type incorrecto | `POST /api/tasks`             | JSON sin `Content-Type: application/json` | `415 UNSUPPORTED_MEDIA_TYPE` | `415 UNSUPPORTED_MEDIA_TYPE` | `cd2d6804-ce3e-4527-b85b-14330d7c3f21` | PASS      |
| 6. Título vacío            | `POST /api/tasks`             | `{"title":""}`                            | `422 VALIDATION_ERROR`       | `422 VALIDATION_ERROR`       | `4972e483-c96d-487e-a4f0-ffa29506096a` | PASS      |
| 7. Título numérico         | `POST /api/tasks`             | `{"title":25}`                            | `422 VALIDATION_ERROR`       | `422 VALIDATION_ERROR`       | `fadaf99c-0854-4942-90fe-c47ace919f45` | PASS      |
| 8. JSON inválido           | `POST /api/tasks`             | JSON malformado                           | `400 INVALID_JSON`           | `400 INVALID_JSON`           | `455e59c4-9c60-48bc-ad32-ce8b6e8ac95e` | PASS      |
| 9. Ruta inexistente        | `GET /ruta-inexistente`       | No aplica                                 | `404 ROUTE_NOT_FOUND`        | `404 ROUTE_NOT_FOUND`        | `f58b900d-c186-4bc3-b120-141e27ec23a3` | PASS      |
| 10. Completar tarea        | `PATCH /api/tasks/2/complete` | ID válido: `2`                            | `200`                        | `200`                        | `649affce-2926-41cd-81de-f846ad5fff56` | PASS      |
| 11. Eliminar tarea         | `DELETE /api/tasks/1`         | ID válido: `1`                            | `204`                        | `204`                        | `c78f831b-cf88-4c8f-91c6-867e6c7e67ac` | PASS      |
| 12. Error controlado       | `GET /debug/error`            | No aplica                                 | `500 INTERNAL_ERROR`         | `500 INTERNAL_ERROR`         | `79cabf6c-7fc2-4dd4-863e-606d143c051a` | PASS      |

# actualizacion de pruebas de validacion del desafio individual
| 13. Completar tarea mediante status | `PATCH /api/tasks/2/status` | `{"completed":true}` | `200` | `200` | `a3d3bfb8-de0c-4517-823e-1e8f33d4f743` | PASS |
| 14. Completion inválido | `PATCH /api/tasks/2/status` | `{"completed":"true"}` | `422 VALIDATION_ERROR` | `422 VALIDATION_ERROR` | `c7a64f2b-48a3-4243-afff-981786d8f2c9` | PASS |
| 15. Completion ausente | `PATCH /api/tasks/2/status` | `{}` | `422 VALIDATION_ERROR` | `422 VALIDATION_ERROR` | `dbc8c1ad-5519-4a1c-baf8-6811f24dea89` | PASS |

## Verificación del requestId

En cada solicitud se comprobó que el valor del encabezado `X-Request-Id` coincidiera con el campo `requestId` incluido en el cuerpo de las respuestas de error.

Los valores específicos de `requestId` deben conservarse de las respuestas obtenidas en Postman.


## Conclusión

Las pruebas realizadas confirmaron el funcionamiento de las validaciones implementadas y del manejo centralizado de errores. Los casos de datos inválidos produjeron los códigos de estado y códigos de error establecidos, mientras que las operaciones previamente funcionales de completar y eliminar tareas continuaron operando correctamente.

La prueba controlada permitió comprobar el tratamiento de errores inesperados mediante una respuesta `500 INTERNAL_ERROR`.
