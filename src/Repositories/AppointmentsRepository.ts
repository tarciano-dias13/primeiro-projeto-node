import Appointment from '../models/Appointments';
import { isEqual } from 'date-fns';

//Data Tranfer Object
interface CreateAppointmentDTO {
    provider: string,
    date: Date
};

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppontment = this.appointments
            .find(appointment => isEqual(date, appointment.date));

        return findAppontment || null;
    }

    //
    //Adiciona o acesso publico ao metodo create e informa o tipo de retorno do metodo
    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });
        this.appointments.push(appointment);

        return appointment;
    }

}

export default AppointmentsRepository;
