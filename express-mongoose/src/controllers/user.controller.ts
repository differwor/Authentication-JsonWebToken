import { Request, Response } from 'express';
import { createUser, getAll, validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';
import { IResponse } from '../types/response.type';

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user = await createUser(req.body);

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'This name already existed!',
            } as IResponse);
        }

        // create a access token - params: (payload, header)
        const accessToken = signJwt(user.toJSON(), {
            expiresIn: '3m', // 3 minutes
            algorithm: 'RS256',
        });

        // create a refresh token - params: (payload, header)
        const refreshToken = signJwt(user.toJSON(), {
            expiresIn: '5m', // 5 minutes
            algorithm: 'RS256',
        });

        return res.status(200).send({
            status: 'success',
            data: {
                access_token: accessToken,
                refresh_token: refreshToken,
            },
            message: 'Account created successfully!',
        } as IResponse);
    } catch (e: any) {
        return res.status(409).send({
            // 401: unauthorized
            status: 'error',
            message: e.message,
        } as IResponse);
    }
};

export const signinHandler = async (req: Request, res: Response) => {
    try {
        const validationResult = await validatePassword(req.body);

        if (validationResult.status !== 'success') {
            return res.status(401).send(validationResult);
        }

        // create a access token (params: (payload, header))
        const accessToken = signJwt(
            { ...validationResult.data },
            {
                expiresIn: '3m', // 3 minutes
                algorithm: 'RS256',
            }
        );

        // create a refresh token (params: (payload, header))
        const refreshToken = signJwt(
            { ...validationResult.data },
            {
                expiresIn: '5m', // 5 minutes
                algorithm: 'RS256',
            }
        );

        return res.status(200).send({
            status: 'success',
            data: {
                access_token: accessToken,
                refresh_token: refreshToken,
            },
            message: 'Login successfully!',
        } as IResponse);
    } catch (e: any) {
        return res.status(409).send({
            status: 'error',
            message: e.message,
        } as IResponse);
    }
};

export const getAllUsersHandler = async (req: Request, res: Response) => {
    try {
        const allUsers = await getAll();
        return res.status(200).send({
            status: 'success',
            data: allUsers,
        });
    } catch (e: any) {
        return res.status(409).send({
            status: 'error',
            message: e.message,
        });
    }
};
