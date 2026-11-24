# Reflexión final — EC3 F3 A12

## 1. ¿Cuál es la diferencia entre build, deploy y release?

El **build** es el proceso de compilar y preparar el código para ejecutarse. En mi proyecto utilizo `pnpm build` para generar los archivos del backend.

El **deploy** consiste en publicar esos archivos en un entorno donde puedan ejecutarse, como Render.

El **release** es la liberación de una versión que ya fue revisada y validada para su uso. Por ejemplo, después de desplegar la API debo ejecutar las pruebas de humo para comprobar que funciona antes de considerar liberada la versión.

## 2. ¿Por qué PUBLIC_API_URL puede ser pública y JWT_SECRET no?

`PUBLIC_API_URL` contiene la dirección utilizada para acceder a mi API. Es información que el frontend y los consumidores del servicio necesitan conocer.

En cambio, `JWT_SECRET` es una clave utilizada para firmar y verificar tokens de autenticación. Si alguien obtiene ese secreto, podría intentar generar tokens falsificados y comprometer la seguridad del sistema. Por eso debe mantenerse en variables de entorno privadas y nunca publicarse en GitHub.

## 3. ¿Qué riesgo introduce configurar trust proxy como true sin conocer la topología?

El servidor podría confiar en encabezados enviados por clientes o intermediarios que no deberían considerarse confiables, como `X-Forwarded-For`.

Esto permitiría manipular la dirección IP que Express atribuye al cliente y podría afectar controles de seguridad como el límite de intentos de inicio de sesión.

En mi proyecto utilizo `TRUST_PROXY_HOPS` para configurar explícitamente cuántos saltos de proxy se consideran confiables. Este valor debe corresponder a la infraestructura real del despliegue.

## 4. ¿Por qué ocultar un botón en React no autoriza ni prohíbe una operación?

Porque React se ejecuta en el navegador del usuario y su interfaz puede modificarse o evitarse por completo.

Por ejemplo, aunque oculte el botón de eliminar tareas a los usuarios normales, alguien podría enviar directamente una petición `DELETE` desde Postman.

La autorización debe comprobarse en el backend. En mis pruebas, un usuario normal recibe `403 FORBIDDEN`, mientras que la eliminación está reservada para administradores.

## 5. ¿Por qué VITE_API_URL requiere un nuevo build cuando cambia?

Porque Vite incorpora las variables `VITE_` utilizadas por el código del cliente durante la construcción de la aplicación.

Por ejemplo, si compilo el frontend apuntando a `http://localhost:3000`, esa dirección puede quedar incorporada en los archivos generados.

Para utilizar después la URL de Render, debo configurar `VITE_API_URL` con la dirección correcta y generar una nueva compilación del frontend.

## 6. ¿Qué comprueba /health/database que no comprueba /health?

`/health` comprueba que la aplicación HTTP responde y proporciona información básica, como su versión y entorno.

`/health/database` verifica adicionalmente la disponibilidad de MongoDB. En mi implementación se utiliza un `ping` mediante Mongoose.

Esto permite distinguir entre un backend que está ejecutándose y otro que, además, puede comunicarse con su base de datos.

## 7. ¿Qué cubren las pruebas con servicios simulados y qué debe comprobarse con Atlas?

Las pruebas con servicios simulados permiten comprobar rutas, validaciones, códigos HTTP, autenticación y autorización sin depender de una base de datos real.

Sin embargo, no garantizan que MongoDB Atlas esté disponible ni que las operaciones se almacenen correctamente.

Por eso también debo realizar pruebas de integración contra Atlas, verificando la conexión y la persistencia real de tareas. Durante mi prueba de humo local confirmé que la API se comunicaba con MongoDB, que el inicio de sesión funcionaba y que podía consultar una lista protegida con cuatro elementos.

## 8. ¿Por qué una respuesta 204 necesita tratamiento especial en el cliente?

Porque el código HTTP `204 No Content` indica que la operación terminó correctamente, pero la respuesta no contiene un cuerpo.

En mi proyecto, cuando un administrador elimina una tarea, el backend debe responder con `204`.

Si el cliente intenta ejecutar `response.json()` sobre esa respuesta vacía, puede producirse un error. Por eso el adaptador HTTP debe reconocer el código `204` y finalizar sin intentar interpretar JSON.

## 9. ¿Cómo confirmarías que la etiqueta v1.0.0 corresponde al código desplegado?

Primero identificaría el commit asociado a la etiqueta `v1.0.0` en Git.

Después comprobaría en Render qué commit fue utilizado para construir el despliegue. Ambos identificadores deberían coincidir.

Finalmente, consultaría `/health` para verificar la versión informada por la aplicación y ejecutaría las pruebas de humo contra la URL publicada.

La versión mostrada por `/health` sirve como comprobación adicional, pero no sustituye la comparación de commits.

## 10. ¿Qué evidencia omitirías o redactarías antes de entregar y por qué?

Omitiría contraseñas, tokens JWT, cadenas de conexión de MongoDB Atlas y cualquier otra credencial.

También ocultaría los encabezados `Authorization` y los valores privados de las variables de entorno.

Conservaría únicamente la información necesaria para demostrar el funcionamiento: método HTTP, endpoint, código de respuesta, resultados de las pruebas y mensajes de aprobación.

Esto permite documentar el trabajo sin comprometer la seguridad de las cuentas ni de la infraestructura.
