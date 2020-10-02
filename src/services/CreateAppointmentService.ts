import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointments';
import appointmentsRouter from '../routes/appointments.routes';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

//DTO
interface request {
    provider_id: string;
    date: Date
}

/*
*   Dependency Inversion (SOLID)
*/

class CreateAppointmentService {

    public async execute({ date, provider_id }: request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppontmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppontmentInSameDate) {
            throw new AppError('This appointment already booked');
        }

        const appointment = appointmentsRepository.create(
            {
                provider_id,
                date: appointmentDate
            }
        );
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
