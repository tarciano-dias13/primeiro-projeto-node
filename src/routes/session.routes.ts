import { Router } from 'express';
import AuthUserService from '../services/AuthenticateUserService';
const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {

    const { email, password } = request.bodyyy;

    const authUserService = new AuthUserService();

    const { user, token } = await authUserService.execute({ email, password });

    delete user.password;

    return response.send({ user, token })

})

export default sessionRouter;
