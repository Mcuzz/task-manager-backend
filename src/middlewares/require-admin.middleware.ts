import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error.js';

export const requireAdmin = (
    _req: Request,
    res: Response,
    next: NextFunction
): void => {
    const auth = res.locals.auth;

    if (!auth) {
        next(new AppError(
            'Debes autenticarte para realizar esta operación.',
            401,
            'AUTHENTICATION_REQUIRED'
        ));
        return;
    }

    if (auth.role !== 'admin') {
        next(new AppError(
            'No tienes permisos para realizar esta operación.',
            403,
            'FORBIDDEN'
        ));
        return;
    }

    next();
};