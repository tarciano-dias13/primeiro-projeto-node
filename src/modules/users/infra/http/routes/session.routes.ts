import { Router } from 'express';

import AuthUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
    const usersRepository = new UsersRepository();

    const { email, password } = request.body;

    const authUserService = new AuthUserService(usersRepository);

    const { user, token } = await authUserService.execute({ email, password });

    delete user.password;

    return response.send({ user, token });
});

export default sessionRouter;
