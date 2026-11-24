# Historial de cambios


## [Unreleased]

### Added
- Se integró React Router en el cliente React.
- Se agregó la ruta `/tasks/:id` para consultar el detalle individual de una tarea.
- Se implementó la consulta `GET /api/tasks/:id` reutilizando la autenticación Bearer.
- Se incorporó un enlace para acceder al detalle desde el listado y regresar a la vista principal.
- Se agregaron estados de carga, tarea encontrada, acceso no autorizado (401) y tarea inexistente (404).
- Se añadieron dos pruebas automatizadas para verificar la consulta individual, el envío del token Bearer y el manejo del error 404.

### Changed
- Se configuró `BrowserRouter` para gestionar la navegación del cliente.
- Se reutilizó el adaptador HTTP existente sin duplicar el arreglo de tareas.
- Se conservó la reescritura SPA de Render para admitir recargas directas de rutas internas.


## [1.0.0] - 2026-10-14
### Agregado
- Cliente React con registro, inicio y cierre de sesión.
- Operaciones de creación, consulta, edición, cambio de estado y eliminación por rol.
- Filtros, búsqueda, ordenamiento y paginación desde la interfaz.
- Configuración reproducible de despliegue mediante `render.yaml`.
- Prueba de humo para verificar una liberación sin revelar credenciales.
### Conservado
- TypeScript estricto, módulos ECMAScript y resolución NodeNext en el backend.
- Persistencia con Mongoose 8.24.4 y MongoDB Atlas.
- Contrato uniforme de respuestas y errores.
- JWT, roles, Helmet, CORS, limitación de solicitudes y OpenAPI.
### Seguridad
- Secretos únicamente mediante variables de entorno.
- Origen CORS específico en producción.
- Configuración explícita del proxy de confianza.