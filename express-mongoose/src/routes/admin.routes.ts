import express, { Router } from 'express';
import {
    getAllUsersHandler,
} from '../controllers/user.controller';

const router: Router = express.Router();

router.get('/all', getAllUsersHandler);
// router.put('/:id', ...);
// router.delete('/:id', ...);

export default router;
