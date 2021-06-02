import {uuid} from 'uuidv4';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
// SOLID
// L => LISKOV Substitution Principle: ex.. serviços não devem estar acoplados as ferramentas que
// conectam com a camada de dados, mas com as regras, sendo os repositórios
// uma ferramenta que implementa as regras

class AppointmentsRepository implements IAppointmentRepository {

    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment => appointment.date === date);

        return findAppointment;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
       const appointment = new Appointment();

       Object.assign(appointment, {id: uuid(), date, provider_id})

       this.appointments.push(appointment);

       return appointment;
    }
}

export default AppointmentsRepository;
