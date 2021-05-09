import { getRepository, Repository } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
// SOLID
// L => LISKOV Substitution Principle: ex.. serviços não devem estar acoplados as ferramentas que
// conectam com a camada de dados, mas com as regras, sendo os repositórios
// uma ferramenta que implementa as regras

class AppointmentsRepository implements IAppointmentRepository {
    // Declarando o repositorio do tipo Appointment
    private ormRepository: Repository<Appointment>;

    // instanciando o repositório assim que a classe é criada
    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });
        return findAppointment;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        // Criando appointment
        const appointment = this.ormRepository.create({ provider_id, date });
        // Salvando no banco
        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
