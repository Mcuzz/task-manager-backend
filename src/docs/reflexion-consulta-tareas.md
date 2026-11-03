Reflexión sobre las consultas de tareas
1. ¿Qué responsabilidad nueva cumple task.repository.ts?
task.repository.ts centraliza el acceso a MongoDB. Se encarga de consultar, contar, crear, actualizar y eliminar documentos, mientras que el servicio conserva las reglas de negocio y el controlador gestiona la solicitud y la respuesta HTTP.
2. ¿Por qué el middleware debe validar req.query antes del controlador?
Porque permite rechazar parámetros ausentes, inválidos o desconocidos antes de ejecutar la lógica de la aplicación o consultar la base de datos. Por ejemplo, page=0 debe producir un error 422 en lugar de llegar al repositorio.
3. ¿Cómo se calcula skip para una página determinada?
Se calcula con la fórmula skip = (page - 1) * limit. Por ejemplo, para page=3 y limit=10, skip=20: se omiten los primeros veinte documentos y se obtienen los siguientes diez.
4. ¿Por qué find y countDocuments deben usar el mismo filtro?
Porque ambas operaciones deben representar el mismo conjunto de resultados. find obtiene los documentos de la página y countDocuments calcula cuántos documentos cumplen los filtros. Si usan criterios distintos, data, meta.total y meta.totalPages pueden ser incoherentes.
5. ¿Qué problema evita escapeRegex?
Evita que caracteres especiales introducidos en la búsqueda se interpreten como operadores de una expresión regular. Por ejemplo, .* debe buscarse como texto literal y no convertirse en un patrón que coincida con cualquier contenido.
6. ¿Por qué sortBy utiliza una lista permitida?
Porque limita el ordenamiento a campos que la API admite, como title o createdAt. Esto evita ordenar por campos arbitrarios y permite mantener un contrato controlado y predecible.
7. ¿Qué diferencia existe entre data.length, meta.total y meta.totalPages?
data.length indica cuántos documentos contiene la página actual. meta.total indica cuántos documentos cumplen los filtros en total, antes de paginar. meta.totalPages indica cuántas páginas se necesitan para mostrar ese total con el límite solicitado. Por ejemplo, si hay 25 resultados y el límite es 10, una página puede contener 10 documentos, meta.total será 25 y meta.totalPages será 3.
8. ¿Cómo llega un error asíncrono del repositorio al errorHandler de Express 5?
En Express 5, si una ruta o middleware devuelve una promesa rechazada o lanza un error dentro de una función asíncrona, Express reenvía el error al flujo de manejo de errores. El errorHandler puede convertirlo en una respuesta HTTP coherente sin exponer detalles internos.
9. ¿Qué prueba demuestra que A8 no rompió el CRUD de A7?
La regresión completa: crear una tarea, consultarla por ID, actualizarla, completarla y eliminarla. Después se consulta el ID eliminado para verificar 404 TASK_NOT_FOUND. Si cada operación devuelve el resultado esperado, se comprueba que las rutas heredadas continúan funcionando tras la reorganización.