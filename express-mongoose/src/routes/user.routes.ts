import express, { Router } from 'express';
import {
    createUserHandler,
    getAllUsersHandler,
    signinHandler,
} from '../controllers/user.controller';
import { validate } from '../middlewares/validateResource';
import verifyJwtRequest from '../middlewares/verifyJwtRequest';
import { loginSchema } from '../schema/login.schema';
import { userSchema } from '../schema/user.schema';

const router: Router = express.Router();

// define route for user
router.post('/signin', validate(loginSchema), signinHandler);
router.post('/', validate(userSchema), createUserHandler);

// a middleware function with no mount path. This code is executed for every request to the router (below)
router.use(verifyJwtRequest);
router.get('/all', getAllUsersHandler);
// router.put('/:id', ...);
// router.delete('/:id', ...);

export default router;
