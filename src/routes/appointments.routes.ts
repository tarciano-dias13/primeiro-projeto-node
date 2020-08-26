import { Router } from 'express';
import { parseISO, parse } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

//Rota: Receber a requisiçao, chamar outro arquivo, devolver uma resposta
appointmentsRouter.get('/', async (request, response) => {

    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    //Mtodo que procura todos os registros na base de dados
    const appointments = await appointmentRepository.find();
    return response.status(200).json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {

    try {
        const { provider, date } = request.body;
        //converte a data enviada para o formato do Date() do JS e modifica para horas exatas ex 1:00:00
        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({ date: parsedDate, provider })
        return response.json(appointment);

    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
})

export default appointmentsRouter;
