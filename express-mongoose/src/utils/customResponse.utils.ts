import { Response } from 'express';

interface IObjectInput {
    data: string;
    message: string;
}

export const isTokenEmpty = (arr: IObjectInput[]) => {
    let message = '';
    arr.forEach((e) => {
        if (!e.data) {
            message = e.message;
            return false;
        }
    });

    const responseHandler = (res: Response) => {
        return res.status(400).json({
            status: 'fail',
            message: message,
        });
    };

    return {
        result: !!message,
        responseHandler,
    };
};
