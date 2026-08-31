import { Task } from './models/task.js';
import {createTask, completeTask, listTasks, deleteTask, listPendingTasks } from './services/task.service.js';
import { delay } from './utils/delay.js';
import { getAppName } from './utils/env.js';

const showTasks = (tasksToShow: readonly Task[] = listTasks()): void => {
    const rows = tasksToShow.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        createdAt: task.createdAt.toLocaleString()
    }));

    console.table(rows);
    
};

const main = async (): Promise<void> => {
    console.log(`\n${getAppName()}`);
    console.log('Iniciando aplicacion...\n');
    await delay(300);
    console.log('Tareas iniciales:');
    showTasks();

    const newTask = createTask('Construir mi primer servicio');
    console.log(`\nTarea creada con id ${newTask.id}`);

    completeTask(newTask.id);
    console.log('\nTarea completada');

    console.log('\nEstado Final');
    showTasks();

    try {
        completeTask(999);
    } catch (error: unknown) {
        const message = error instanceof Error 
        ? error.message 
        : 'Error desconocido';
        console.error(`Error controlado: ${message}`);
    }


    console.log('\nTareas pendientes:');
    showTasks(listPendingTasks());


    deleteTask(1);
    console.log(`\nTarea con id ${1} eliminada`);

    console.log('\nTareas restantes:');
    showTasks();
};

main().catch((error: unknown) => {
    console.error('Error no controlado:', error)
    process.exitCode = 1;
});


