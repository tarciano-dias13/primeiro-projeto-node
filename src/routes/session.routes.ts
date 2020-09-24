import { Router } from 'express';
import AuthUserService from '../services/AuthenticateUserService';
const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {

    try {
        const { email, password } = request.body;

        const authUserService = new AuthUserService();

        const { user, token } = await authUserService.execute({ email, password });

        delete user.password;

        return response.send({ user, token })
    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
})

export default sessionRouter;
