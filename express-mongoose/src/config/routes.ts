import { Express } from 'express';
import userRoutes from '../routes/user.routes';

export function routes(app: Express) {
    app.use('/users', userRoutes);
}
