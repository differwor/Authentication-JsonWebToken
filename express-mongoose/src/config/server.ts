import dotenv from 'dotenv';
import express, { Express } from 'express';
import connectDB from './database';
import { routes } from './routes';

dotenv.config();
const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;

// Connect to DB
connectDB();

app.use(express.json()); // fix body response data is none

// config middlewares n routes in here
routes(app);

// Launch server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
