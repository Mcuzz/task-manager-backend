# Pruebas de conexión con MongoDB Atlas

## Entorno verificado

* Rama: `feature/mongodb-atlas`
* Comando de tipos: `pnpm check`
* Comando de compilación: `pnpm build`
* Resultado de arranque: conexión establecida sin mostrar credenciales.

## Casos ejecutados

| Tipo            | Método y ruta                                    | Datos        | Esperado                   | Obtenido                   |         | Resultado |
| --------------- | ------------------------------------------------ | ------------ | -------------------------- | -------------------------- | ------------------ | --------- |
| Positiva        | GET /health                                      | No aplica    | 200                        | 200                        |  | Correcto  |
| Positiva        | GET /health/database                             | No aplica    | 200 connected              | 200 connected              |  | Correcto  |
| Regresión       | GET /api/tasks                                   | No aplica    | 200                        | 200                        |  | Correcto  |
| Regresión       | POST /api/tasks                                  | title válido | 201                        | 201                        |  | Correcto  |
| Negativa        | GET /api/tasks/abc                               | No aplica    | 400 INVALID_ID             | 400 INVALID_ID             |  | Correcto  |
| Negativa        | POST /api/tasks                                  | raw Text     | 415 UNSUPPORTED_MEDIA_TYPE | 415 UNSUPPORTED_MEDIA_TYPE |  | Correcto  |
| Infraestructura | Reinicio con contraseña temporalmente incorrecta | No aplica    | API no escucha             | API no escucha             | No aplica          | Correcto  |

