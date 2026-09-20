# Reflexión sobre validación y manejo de errores

## 1. ¿Qué diferencia existe entre validar el formato HTTP y proteger una regla del negocio?

La validación del formato HTTP comprueba que la solicitud tenga una estructura y un formato adecuados para poder ser procesada. Por ejemplo, `requireJson` verifica que una solicitud que espera JSON utilice el encabezado `Content-Type: application/json`.

En cambio, una regla de negocio determina si los datos son válidos de acuerdo con el funcionamiento de la aplicación. Por ejemplo, `validateTaskTitle` comprueba que el título sea texto, que no esté vacío y que no supere los 120 caracteres.

Separar ambas responsabilidades permite que los middlewares se encarguen de validar la entrada y que los servicios se encarguen de las operaciones propias de la aplicación.

## 2. ¿Por qué conviene usar router.param para validar el id?

`router.param` permite centralizar la validación de los parámetros `id` utilizados por diferentes rutas. De esta manera, una misma validación puede aplicarse automáticamente a rutas como `GET`, `PATCH` y `DELETE`.

En esta API, `validateTaskId` permite comprobar que el identificador tenga un formato válido antes de que la solicitud llegue al controlador. Esto evita repetir la misma lógica en cada controlador.

## 3. ¿Qué ventaja ofrece guardar datos normalizados en res.locals?

Guardar datos normalizados en `res.locals` permite que los controladores reciban información que ya fue validada y preparada por los middlewares.

Por ejemplo, después de validar el identificador, el middleware puede guardar el valor en:

```text
res.locals.taskId
```

De esta forma, el controlador no necesita volver a interpretar o validar `req.params.id`. Esto reduce duplicación y mantiene responsabilidades separadas.

## 4. ¿Cuándo corresponde responder 400 y cuándo 422?

El estado `400 Bad Request` corresponde cuando la solicitud no puede interpretarse correctamente o presenta una estructura inválida. En esta API, un ejemplo es enviar JSON malformado, que produce `400 INVALID_JSON`.

El estado `422 Unprocessable Entity` se utiliza cuando la solicitud tiene una estructura que puede interpretarse, pero sus datos no cumplen las reglas de validación. Por ejemplo, enviar:

```json
{
  "title": 25
}
```

produce `422 VALIDATION_ERROR` porque el campo existe, pero su tipo no es válido.

## 5. ¿Por qué notFound delega el error en lugar de responder directamente?

Delegar el error al manejador centralizado permite que todos los errores de la aplicación tengan un tratamiento uniforme.

En lugar de construir una respuesta diferente en cada ruta, `notFound` puede crear o delegar un error y permitir que el middleware global determine el código HTTP, el código de error, el mensaje y el `requestId`.

Esto facilita el mantenimiento y evita duplicar lógica de respuesta.

## 6. ¿Qué información no debe enviarse al cliente en un error 500?

Un error `500 INTERNAL_ERROR` puede originarse por un problema inesperado del servidor. Por seguridad, la respuesta al cliente no debe incluir detalles internos como stack traces, rutas físicas de archivos, consultas SQL, variables internas, credenciales u otra información sensible.

El cliente debe recibir un mensaje general que indique que ocurrió un error interno. Los detalles técnicos deben permanecer en los registros internos de la aplicación.

## 7. ¿Cómo ayuda requestId durante la depuración?

`requestId` permite identificar individualmente una solicitud y relacionarla con sus registros internos.

Cuando ocurre un error, el cliente puede proporcionar el `requestId` al equipo de desarrollo. Esto permite localizar en los registros la operación correspondiente y facilita el diagnóstico del problema sin exponer información técnica innecesaria al usuario.

En las pruebas realizadas con Postman se verificó que el valor de `X-Request-Id` coincidiera con el `requestId` incluido en la respuesta.

## 8. ¿Qué prueba demuestra que la refactorización no rompió la API anterior?

Las pruebas de regresión de:

```text
PATCH /api/tasks/2/complete
```

y:

```text
DELETE /api/tasks/1
```

demuestran que las operaciones que ya funcionaban antes de la refactorización continúan funcionando correctamente.

Ambas solicitudes produjeron las respuestas esperadas, con `200` para la operación de completar la tarea y `204` para la eliminación. Esto permite comprobar que las mejoras de validación y manejo de errores no afectaron esas funcionalidades existentes.
