import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error.js';

export const getMe = (
    _req: Request,
    res: Response,
    next: NextFunction
): void => {
    const auth = res.locals.auth;

    if (!auth) {
        next(
            new AppError(
                'Debes enviar un token de acceso.',
                401,
                'AUTHENTICATION_REQUIRED'
            )
        );
        return;
    }

    res.status(200).json({
        data: {
            identity: {
                userId: auth.userId,
                role: auth.role
            }
        }
    });
};