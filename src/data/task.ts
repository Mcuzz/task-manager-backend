import type { Task } from '../models/task.js';

export const tasks: Task[] = [
    {
        id: 1,
        title: 'Configurar express',
        status: 'completed',
        createdAt: new Date()
    },
    {
        id: 2,
        title: 'Probar api con postman',
        status: 'pending',
        createdAt: new Date()
    }
];