import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import Users from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: Users;
    token: string;
}

class AuthenticateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        // Procura o email informado na base de dados usando o TypeORM
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect user/password combination');
        }
        // Se encontrar o email compara a senha digitada com a senha(criptografada) do objeto user encontrado
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect user/password combination');
        }

        const { secret, expiresIn } = authConfig.jwt;

        // Senao usuario autenticado
        // Gerando token
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });
        return { user, token };
    }
}

export default AuthenticateUserService;
