import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error.js';

export const validateTaskTitle = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { title, description } = req.body as {
        title?: unknown;
        description?: unknown;
    };

    if (typeof title !== 'string' || !title.trim()) {
        next(
            new AppError(
                'La solicitud contiene datos inválidos.',
                422,
                'VALIDATION_ERROR',
                [
                    {
                        field: 'title',
                        message: 'Debe ser texto no vacío.'
                    }
                ]
            )
        );
        return;
    }

    if (title.trim().length > 120) {
        next(
            new AppError(
                'La solicitud contiene datos inválidos.',
                422,
                'VALIDATION_ERROR',
                [
                    {
                        field: 'title',
                        message: 'No debe superar 120 caracteres.'
                    }
                ]
            )
        );
        return;
    }

    if (description !== undefined) {
        if (typeof description !== 'string') {
            next(
                new AppError(
                    'La solicitud contiene datos inválidos.',
                    422,
                    'VALIDATION_ERROR',
                    [
                        {
                            field: 'description',
                            message: 'Debe ser texto.'
                        }
                    ]
                )
            );
            return;
        }

        const cleanDescription = description.trim();

        if (cleanDescription.length > 300) {
            next(
                new AppError(
                    'La solicitud contiene datos inválidos.',
                    422,
                    'VALIDATION_ERROR',
                    [
                        {
                            field: 'description',
                            message: 'No debe superar 300 caracteres.'
                        }
                    ]
                )
            );
            return;
        }

        res.locals.taskDescription = cleanDescription;
    }

    res.locals.taskTitle = title.trim();
    next();
};