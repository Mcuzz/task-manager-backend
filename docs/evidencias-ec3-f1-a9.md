# Evidencias EC3 F1 A9

## Datos generales

- **Nombre:** Natalia Yamileth Urias Velasquez
- **Grupo:** 001
- **Repositorio y rama:** `Mcuzz/Task-API` — `feature/consultas-paginadas`
- **Commit final:** [Agregar hash del commit final]

## Entorno verificado

- `node --version`: [Registrar versión instalada]
- `pnpm --version`: [Registrar versión instalada]
- `pnpm check`: **Aprobado**
- `pnpm build`: **Aprobado**
- `GET /health/database`: **HTTP 200 — Conexión con MongoDB verificada.** [Confirmar estado exacto de la respuesta]

## Registro

- **Solicitud utilizada:**
  - Método: `POST`
  - Ruta: `/api/auth/register`
  - Body:
    ```json
    {
      "name": "Ana Torres",
      "email": "natilladevainilla@example.com",
      "password": "<OCULTA>"
    }
    ```
- **Código HTTP:** `201 Created`.
- **Respuesta sin datos sensibles:** Registro exitoso; se devuelve la información del usuario sin incluir su contraseña ni su hash.
- **Comprobación de que no aparece `passwordHash`:** Aprobada. La respuesta no expone este campo.

## Inicio de sesión

- **Solicitud:**
  - Método: `POST`
  - Ruta: `/api/auth/login`
  - Body:
    ```json
    {
      "email": "natilladevainilla@example.com",
      "password": "<OCULTA>"
    }
    ```
- **Código HTTP:** `200 OK`.
- **Campos recibidos:** Token JWT (`<TOKEN_OCULTO>`), `tokenType`, `expiresIn` y datos del usuario.
- **Claims observados sin copiar el token:** Se inspeccionaron los claims `sub`, correspondiente al identificador del usuario, y `role`, correspondiente a su rol. La decodificación se utilizó únicamente para inspección educativa, sin confundirla con la verificación criptográfica del token.

## Pruebas negativas

| Caso | Código esperado | Código obtenido | `error.code` | Resultado |
|---|---:|---:|---|---|
| Correo repetido | 409 | 409 | `USER_EMAIL_EXISTS` | Aprobado |
| Contraseña corta | 422 | 422 | `AUTH_VALIDATION_ERROR` | Aprobado |
| Campo `role` | 422 | 422 | Error de validación | Aprobado |
| Credenciales incorrectas | 401 | 401 | `INVALID_CREDENTIALS` | Aprobado |
| Content-Type incorrecto | 415 | 415 | `UNSUPPORTED_MEDIA_TYPE` | Aprobado |
| JSON inválido | 400 | 400 | `INVALID_JSON` | Aprobado |

Las pruebas adicionales de contraseña superior a 72 bytes, correo inválido y campo adicional no permitido también fueron ejecutadas satisfactoriamente.

Se comprobó que el inicio de sesión con contraseña incorrecta y con correo inexistente devuelve el mismo código HTTP y error, evitando revelar si una cuenta está registrada.

## Regresión de tareas

- **Crear:** Aprobado. `POST /api/tasks` devuelve HTTP 201 y permite crear una tarea.
- **Listar con paginación y filtros:** Aprobado. `GET /api/tasks?page=1&limit=5` conserva el acceso público y devuelve los resultados solicitados.
- **Actualizar:** Aprobado. `PATCH /api/tasks/:id` permite modificar los datos de una tarea existente.
- **Completar:** Aprobado. `PATCH /api/tasks/:id/complete` cambia el estado de la tarea a `completed` sin requerir un cuerpo.
- **Consulta combinada:** Aprobado. Se verificaron los parámetros `status`, `search`, `sortBy` y `order` en una misma solicitud.
- **Eliminar:** Aprobado. `DELETE /api/tasks/:id` devuelve HTTP 204 y elimina la tarea sin contenido en la respuesta.
- **Salud de la API:** Se verificó que las rutas `/health` y `/health/database` continúan respondiendo correctamente.

Todas las pruebas de regresión se ejecutaron sin encabezado `Authorization`, comprobando que las rutas de tareas mantienen su comportamiento público.

## Seguridad observada

- **¿La colección guarda `password` o solo `passwordHash`?** MongoDB conserva el hash de la contraseña (`passwordHash`), mientras que la contraseña original se utiliza únicamente durante el registro o inicio de sesión y no debe almacenarse en texto plano.
- **¿Alguna respuesta expone `passwordHash`, URI, secreto o stack trace?** No se observaron datos sensibles en las respuestas revisadas.
- **¿El cliente puede asignarse `admin`?** No. El intento de registrar un usuario incluyendo `role: "admin"` fue rechazado con HTTP 422 y no se creó el usuario.

## Conclusión

La implementación de autenticación de A9 fue verificada mediante pruebas positivas, negativas y de regresión utilizando Postman. Se comprobó el registro de usuarios, el inicio de sesión mediante JWT, la protección de los datos sensibles y el rechazo de solicitudes con información inválida o campos no permitidos.

También se confirmó que las funcionalidades anteriores de la API continúan operando correctamente, incluyendo el CRUD de tareas, la paginación, los filtros, la ordenación y los endpoints de salud, sin requerir autenticación.

Para A10 quedará pendiente continuar con las funcionalidades establecidas en la siguiente etapa, manteniendo las validaciones, la seguridad de la información y la compatibilidad con los componentes implementados en A9.

## Desafío individual: confirmPassword

Se incorporó el campo `confirmPassword` exclusivamente al contrato HTTP
de registro. El middleware `validateRegister` comprueba que el campo
exista, sea texto y coincida con `password`.

Cuando las contraseñas coinciden, el middleware construye un objeto
`RegisterInput` únicamente con los campos `name`, `email` y `password`,
antes de enviarlo al controlador y al servicio de autenticación.

Cuando las contraseñas son diferentes, la API responde con HTTP 422
y el código `AUTH_VALIDATION_ERROR`, identificando el campo
`confirmPassword`.

Se verificó que el campo de confirmación no se almacena en MongoDB
ni se incluye en la respuesta del registro.

La confirmación de contraseña pertenece a la frontera HTTP porque
es una validación de los datos proporcionados por el cliente. No es
una propiedad permanente del usuario ni un dato necesario para
generar el hash, autenticarlo o almacenarlo. Por esta razón, no se
incorporó al modelo, repositorio ni servicio de autenticación.