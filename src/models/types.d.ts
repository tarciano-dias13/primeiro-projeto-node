import { Request } from 'express';
import { UserReq } from './UserReq';

export interface IRequestUser extends Request {
    user? : any
};
