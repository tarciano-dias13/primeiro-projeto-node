import { Router } from 'express';
import { parseISO, parse } from 'date-fns';

import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

//Rota: Receber a requisiçao, chamar outro arquivo, devolver uma resposta
appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.all();
    return response.status(200).json(appointments);
})

appointmentsRouter.post('/', (request, response) => {

    try {
        const { provider, date } = request.body;
        //converte a data enviada para o formato do Date() do JS e modifica para horas exatas ex 1:00:00
        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(appointmentRepository);

        const appointment = createAppointment.execute({ date: parsedDate, provider })
        return response.json(appointment);

    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
})

export default appointmentsRouter;
