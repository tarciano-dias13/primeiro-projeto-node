import Appointment from '../models/Appointments';
import appointmentsRouter from '../routes/appointments.routes';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

//DTO
interface request{
    provider: string;
    date: Date
}

/*
*   Dependency Inversion (SOLID)
*/

class CreateAppointmentService {

    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({date, provider }: request): Appointment {

        const appointmentDate = startOfHour(date);

        const findAppontmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppontmentInSameDate) {
            throw Error('This appointment already booked');
        }

        const appointment = this.appointmentsRepository.create(
            {
                provider,
                date: appointmentDate
            }
        );

        return appointment;
    }
}

export default CreateAppointmentService;
