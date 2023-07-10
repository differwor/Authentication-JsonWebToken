import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

export const validate =
    (schema: yup.Schema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (e: any) {
            return res.status(401).json({
                // 401: unauthorized
                status: 'error',
                message: e.errors,
            });
        }
    };
