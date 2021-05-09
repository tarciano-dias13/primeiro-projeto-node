import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}
@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        // Pesquisa no banco se o email existe
        const checkUserExist = await this.usersRepository.findByEmail(email);

        // verifica a variavel e dispara novo erro
        if (checkUserExist) {
            throw new AppError('Email adress already used.');
        }

        // criptografa a senha do usuario com a lib bcryptjs
        const hashedPassword = await hash(password, 8);

        // Cria uma instancia do usuario na memoria .create
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}
export default CreateUserService;
