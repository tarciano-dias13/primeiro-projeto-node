import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
// DTOs servem para definir o formato dos dados
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}
