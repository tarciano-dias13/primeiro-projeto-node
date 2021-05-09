import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

// Controllers abtraem a logica que estava antes disponivel nas rotas
export default class AppointmentController{

    public async create(request: Request, response: Response): Promise<Response>{
        const { provider_id, date } = request.body;
        // converte a data enviada para o formato do Date() do JS e modifica para horas exatas ex 1:00:00
        const parsedDate = parseISO(date);

        // Carregando o serviço através do container tsyringe para injeção de dependencia automatica
        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({ date: parsedDate, provider_id })
        return response.json(appointment);
    }
}
