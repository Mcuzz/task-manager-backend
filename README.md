# Task Manager Backend

Aplicación de consola modular desarrollada con **Node.js, TypeScript y PNPM** como parte de la actividad **EC1 F1 A2 — Aplicación de consola modular** de la asignatura **Programación Backend con Frameworks**.

El proyecto permite gestionar tareas en memoria y aplica conceptos fundamentales de desarrollo backend, como módulos ECMAScript, tipado estático, servicios, funciones asíncronas, variables de entorno y manejo de errores.

## Tecnologías utilizadas

* Node.js
* TypeScript
* PNPM
* TSX
* Git

## Funcionalidades

La aplicación permite:

* Listar tareas.
* Buscar una tarea por su ID.
* Crear nuevas tareas.
* Completar tareas.
* Eliminar tareas.
* Filtrar tareas pendientes.
* Manejar errores de operaciones inválidas.
* Utilizar variables de entorno mediante `APP_NAME`.
* Ejecutar operaciones asíncronas mediante `async/await`.
* Compilar TypeScript a JavaScript.

> Los datos se almacenan únicamente en memoria, por lo que se reinician al finalizar la ejecución.


## Instalación

Clonar el repositorio y acceder a la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd task-manager-backend
```

Instalar las dependencias:

```bash
pnpm install
```

## Ejecución

### Ejecutar en desarrollo

```bash
pnpm start
```

### Verificar tipos

```bash
pnpm check
```

### Compilar el proyecto

```bash
pnpm build
```

### Ejecutar la versión compilada

```bash
pnpm serve
```

## Variable de entorno

La aplicación permite modificar su nombre mediante la variable `APP_NAME`.

En PowerShell:

```powershell
$env:APP_NAME="Gestor de tareas UES"; pnpm start
```

Si la variable no está definida, se utiliza:

```text
Task Manager Backend
```

