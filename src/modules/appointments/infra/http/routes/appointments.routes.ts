import "reflect-metadata";
import { Router } from 'express';

import AppointmentsController from '../constrollers/AppointmentsConstroller';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentController = new AppointmentsController();

// injetando o middleware em todas as rotas appointments
appointmentsRouter.use(ensureAuthenticated);

// Rota: Receber a requisiçao, chamar outro arquivo, devolver uma resposta
/* appointmentsRouter.get('/', async (request, response) => {

    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    //Mtodo que procura todos os registros na base de dados
    const appointments = await appointmentRepository.find();
    return response.status(200).json(appointments);
}) */

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
