import { NextFunction, Request, Response } from 'express';
import _, { get } from 'lodash';
import { isTokenEmpty } from '../utils/customResponse.utils';
import { reIssueToken, verifyJwt } from '../utils/jwt.utils';

const verifyJwtRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken: string = get(
            req,
            'headers.authorization',
            ''
        ).replace(/^Bearer\s/, '');

        const refreshToken: string = get(req, 'headers.x-refresh-token', '')
            .toString()
            .replace(/^Bearer\s/, '');

        const { result, responseHandler } = isTokenEmpty([
            {
                data: accessToken,
                message: 'Access Token is required!',
            },
            {
                data: refreshToken,
                message: 'Refresh Token is required!',
            },
        ]);

        if (result) {
            return responseHandler(res);
        }

        // check access token
        const { decoded, message } = verifyJwt(accessToken);

        if (!decoded && message == 'jwt expired') {
            // check refresh token
            const verificationResult = verifyJwt(refreshToken);

            // verificationResult.decoded <=> payload
            if (!!verificationResult.decoded) {
                const payloadObj = _.omit(verificationResult.decoded, [
                    'exp',
                    'iat',
                ]) as Object;

                // if refresh token valid, re-issue both of token
                const { newAccessToken, newRefreshToken } =
                    reIssueToken(payloadObj);
                res.setHeader('authorization', newAccessToken);
                res.setHeader('x-refresh-token', newRefreshToken);
                return next();
            }

            return res.status(401).json({
                status: 'fail',
                message: verificationResult.message,
            });
        }

        if (!decoded)
            return res.status(401).json({
                status: 'fail',
                message: message,
            });
        return next();
    } catch (e: any) {
        return res.status(401).json({
            // 401: unauthorized
            status: 'error',
            message: e.message,
        });
    }
};

export default verifyJwtRequest;
