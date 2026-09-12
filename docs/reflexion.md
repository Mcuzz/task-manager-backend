# Preguntas de cierre

### 1. ¿Qué responsabilidad cumple Express y qué responsabilidad conserva el servicio?

express recibe y dirige las peticiones HTTP. El servicio contiene la lógica de las tareas, como crear, actualizar, completar o eliminar

### 2. ¿Por qué no conviene escribir toda la lógica dentro de `task.routes.ts`?

porque las rutas solo deben conectar las peticiones con los controladores, separar responsabilidades hace el código más ordenado y fácil de mantener

### 3. ¿Qué diferencia existe entre `req.params` y `req.body`?

`req.params` contiene datos de la URL, como el `id` en `/api/tasks/2`. `req.body` contiene los datos enviados en la petición, como `{ "title": "Nueva tarea" }`

### 4. ¿Por qué el título recibido desde un cliente se considera `unknown` antes de validarlo?

porque el cliente puede enviar cualquier tipo de dato. primero debemos comprobar que realmente sea un texto válido antes de utilizarlo

### 5. ¿Qué ventaja ofrece centralizar los errores en un middleware?

permite manejar los errores desde un solo lugar y mantener los controladores más simples y consistentes.

### 6. ¿Cuándo debe utilizarse 201 en lugar de 200?

se utiliza 201 cuando la petición crea un nuevo recurso, como al hacer `POST /api/tasks`

### 7. ¿Por qué DELETE responde 204 sin un objeto JSON?

porque la operación fue exitosa y no necesita devolver contenido `204` indica que no hay contenido en la respuesta

### 8. ¿Qué ocurrirá con las tareas cuando el servidor se reinicie y por qué?

Las tareas creadas se perderán porque actualmente están almacenadas en memoria y no en una base de datos

### 9. ¿Qué archivos podrán conservarse cuando se incorpore MongoDB Atlas?

Principalmente las rutas, controladores, middlewares y modelos, se modificará principalmente el servicio y la parte encargada de acceder a los datos.
