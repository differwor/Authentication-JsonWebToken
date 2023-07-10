import fs from 'fs';
import jwt from 'jsonwebtoken';

const privateKey = fs.readFileSync('private.key', 'utf-8');
const publicKey = fs.readFileSync('public.key', 'utf-8');

export const signJwt = (payload: Object, options: jwt.SignOptions) => {
    return jwt.sign(payload, privateKey, { ...options, algorithm: 'RS256' });
};

export const verifyJwt = (token: string) => {
    try {
        const payload: Object = jwt.verify(token, publicKey, {
            algorithms: ['RS256'],
        });
        return {
            decoded: payload,
        };
    } catch (e: any) {
        return {
            decoded: null,
            message: e.message,
        };
    }
};

export const reIssueToken = (payload: Object) => {
    // create a new refresh token - params: (payload, header)
    const newAccessToken = signJwt(payload, {
        expiresIn: '3m', // 15 minutes
        algorithm: 'RS256',
    });

    // create a new refresh token - params: (payload, header)
    const newRefreshToken = signJwt(payload, {
        expiresIn: '5m', // 20 minutes
        algorithm: 'RS256',
    });

    return { newAccessToken, newRefreshToken };
};
