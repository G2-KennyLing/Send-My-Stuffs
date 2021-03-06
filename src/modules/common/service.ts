import { Response } from 'express';
import { responseStatusCodes } from './model';

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(responseStatusCodes.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: message,
        DATA
    });
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(responseStatusCodes.badRequest).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA
    });
}

export function insufficientParameters(res: Response) {
    res.status(responseStatusCodes.badRequest).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(responseStatusCodes.internalServerError).json({
        STATUS: 'FAILURE',
        MESSAGE: 'MongoDB error',
        DATA: err
    });
}