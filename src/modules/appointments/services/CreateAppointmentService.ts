import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

// DTO
interface IRequest {
    provider_id: string;
    date: Date;
}

/*
   Dependency Inversion (SOLID)
*/
@injectable()
class CreateAppointmentService {
    // Hack do ts que cria a variavel adicionando o acesso a frente do parametro;
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentRepository,
    ) {}

    public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);

        const findAppontmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppontmentInSameDate) {
            throw new AppError('This appointment already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });
        return appointment;
    }
}

export default CreateAppointmentService;
