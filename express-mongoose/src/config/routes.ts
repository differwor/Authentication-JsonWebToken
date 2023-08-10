import express, { Express, Router } from 'express';
import adminRoutes from '../routes/admin.routes';
import { IResponse } from '../types/response.type';
import { validate } from '../middlewares/validateResource';
import { loginSchema } from '../schema/login.schema';
import { createUserHandler, signinHandler } from '../controllers/user.controller';
import { registerSchema } from '../schema/register.schema';
import verifyJwtRequest from '../middlewares/verifyJwtRequest';

// warning: order
export function routes(app: Express) {

    // define route when open application
    app.post('/signin', validate(loginSchema), signinHandler);
    app.post('/register', validate(registerSchema), createUserHandler);

    app.use((req, res, next) => {
        res.status(404).send({
            status: "fail",
            message: "Not found!"
        } as IResponse);
    });

    // a middleware function with no mount path. This code is executed for every request to the router (below)
    app.use(verifyJwtRequest);

    app.use('/admin', adminRoutes);
}
