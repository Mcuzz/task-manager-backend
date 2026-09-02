# Reflexion - EC1 F1 A2

**Nombre: Natalia Yamileth Urias Velasquez**
**Grupo: 001**

## 1. ¿Cuál es la función de Node.js en este proyecto? 
Ayuda a ejecutar el codigo JS (previo de TS) en la consola
## 2. ¿Qué errores ayuda a detectar TypeScript antes de ejecutar la aplicación?
Errores de typado, lexicos, o sintacticos.
## 3. ¿Por qué se separaron models, data, services y utils?
Para mantener una estructura modular ordenada y separada por funciones sin llegar a mezclar codigo que tiene diversos usos haciendo de esto un codigo "apestoso".
Models solo pone la plantilla en la cual se van a estructurar las tareas, data contiene las tareas que se muestran en la interfaz con la estructura mostrada en models y services guarda las funciones que se ejecutan en la aplicacion. Utils solo es una seccion en la que se almacenan funciones especificas que se pueden emplear en los services. 
## 4. ¿Qué diferencia existe entre una función síncrona y una función async?
La función síncrona ejecuta tareas secuencialmente y bloquea el flujo del programa hasta terminar, y la función async permite iniciar una tarea pesada y continuar con otras operaciones sin congelar el sistema
## 5. ¿Por qué findTaskById devuelve Task | undefined?
Porque este ID puede o no existir, por ello debe de enviar el titulo de la task con ese id o anunciar que esta no existe en caso de estar en estatus de undefined.
## 6. ¿Qué ventaja aporta leer APP_NAME desde process.env?
Que evita errores en caso de que el APP_NAME no exista y utiliza un nombre predeterminado 
## 7. ¿Qué diferencia observó entre pnpm start y la secuencia pnpm build + pnpm serve? 
Que desde start se ejecuta desde > tsx src/index.ts y con build + serve se carga desde node/dist/index.js. O sea, ya se cambia el ts a js puro por medio de typescript. 
## 8. ¿Qué parte de este proyecto podrá reutilizarse cuando se construya la API con Express? 
Los modelos, datos reglas y puntos de entrada, las expondremos mediante rutas HTTP