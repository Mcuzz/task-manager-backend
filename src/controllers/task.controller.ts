import type { NextFunction, Request, Response } from 'express';
import {
    completeTask,
    createTask,
    deleteTask,
    findTaskById,
    listTasks,
    updateTaskTitle, //agrego para que funcione el desafio individial
    updateTaskStatus//para el otro desafio individual
} from '../services/task.service.js';
import { AppError } from '../errors/app-error.js';
const parseId = (value: string | undefined): number => {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError('El id debe ser un entero positivo.', 400, 'INVALID_ID');
    }
    return id;
};
export const getTasks = (_req: Request, res: Response): void => {
    res.status(200).json({ data: listTasks() });
};
export const getTask = (
    _req: Request,
    res: Response
): void => {
    res.status(200).json({ data: findTaskById(res.locals.taskId) });
};
export const postTask = (
    _req: Request,
    res: Response
): void => {
    const task = createTask(res.locals.taskTitle);
    res.status(201).json({ data: task });
};
export const patchTaskComplete = (
    _req: Request,
    res: Response
): void => {
    const task = completeTask(res.locals.taskId);
    res.status(200).json({ data: task });
};

//controlador para el desafio individual:
export const patchTaskTitle = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const task = updateTaskTitle(
            parseId(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id),
            req.body.title
        );

        res.status(200).json({ data: task });
    } catch (error: unknown) {
        next(error);
    }
};

export const removeTask = (
    _req: Request,
    res: Response
): void => {
    deleteTask(res.locals.taskId);
    res.status(204).send();
};

//funcion del servicio para el desafio individual de la actividad 4
export const patchTaskStatus = (
    _req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const task = updateTaskStatus(
            res.locals.taskId,
            res.locals.completed
        );

        res.status(200).json({ data: task });
    } catch (error: unknown) {
        next(error);
    }
};