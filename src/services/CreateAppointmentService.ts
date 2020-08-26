import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointments';
import appointmentsRouter from '../routes/appointments.routes';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';

//DTO
interface request {
    provider: string;
    date: Date
}

/*
*   Dependency Inversion (SOLID)
*/

class CreateAppointmentService {

    public async execute({ date, provider }: request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppontmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppontmentInSameDate) {
            throw Error('This appointment already booked');
        }

        const appointment = appointmentsRepository.create(
            {
                provider,
                date: appointmentDate
            }
        );
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
