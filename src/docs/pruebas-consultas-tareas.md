| Tipo | Método y ruta | Esperado | Obtenido | requestId | Resultado |
|---|---|---:|---:|---|---|
| Positiva | `GET /api/tasks?page=1&limit=2` | 200 | 200 | Omitido | Aprobada |
| Positiva | `GET /api/tasks?status=completed` | 200 | 200 | Omitido | Aprobada |
| Positiva | `GET /api/tasks?search=api` | 200 | 200 | Omitido | Aprobada |
| Negativa | `GET /api/tasks?page=0` | 422 | 422 | Omitido | Aprobada |
| Negativa | `GET /api/tasks?sortBy=priority` | 422 | 422 | Omitido | Aprobada |
| Negativa | `GET /api/tasks?owner=ana` | 422 | 422 | Omitido | Aprobada |
| Regresión | `PATCH /api/tasks/:id/complete` | 200 | 200 | Omitido | Aprobada |