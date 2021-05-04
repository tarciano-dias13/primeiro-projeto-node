import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

// SOLID
// L => LISKOV Substitution Principle: ex.. serviços não devem estar acoplados as ferramentas que
// conectam com a camada de dados, mas com as regras, sendo os repositórios
// uma ferramenta que implementa as regras

class UsersRepository implements IUsersRepository {
    // Declarando o repositorio do tipo User
    private ormRepository: Repository<User>;

    // instanciando o repositório assim que a classe é criada
    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });
        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        // Criando appointment
        const user = this.ormRepository.create(userData);
        // Salvando no banco
        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
