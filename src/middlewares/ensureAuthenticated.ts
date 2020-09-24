import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import { IRequestUser } from '../models/types';

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string,
};

export default function ensureAuthenticated(request: IRequestUser, response: Response, next: NextFunction): void {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("token jwt is Missing");
    };

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        console.log("Returno do token", decoded);
        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new Error('Invalid Token jwt!');
    }
}
