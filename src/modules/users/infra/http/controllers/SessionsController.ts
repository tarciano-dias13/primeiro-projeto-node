import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create( request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authUserService = container.resolve(AuthUserService);

        const { user, token } = await authUserService.execute({ email, password });

        delete user.password;

        return response.send({ user, token });
    }
}
