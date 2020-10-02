import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

//injetando o middleware em todas as rotas appointments
appointmentsRouter.use(ensureAuthenticated);

//Rota: Receber a requisiçao, chamar outro arquivo, devolver uma resposta
appointmentsRouter.get('/', async (request, response) => {

    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    //Mtodo que procura todos os registros na base de dados
    const appointments = await appointmentRepository.find();
    return response.status(200).json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;
    //converte a data enviada para o formato do Date() do JS e modifica para horas exatas ex 1:00:00
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ date: parsedDate, provider_id })
    return response.json(appointment);

})

export default appointmentsRouter;
