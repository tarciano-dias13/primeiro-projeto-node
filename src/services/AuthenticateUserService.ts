import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import Users from '../models/Users'

interface Request {
    email: string;
    password: string;
};

interface Response {
    user: Users,
    token: string,
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {

        //Instancia um repositorio e passa o Users para acessar os metodos do banco de dados
        const userRepository = getRepository(Users);
        //Procura o email informado na base de dados usando o TypeORM
        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            throw new Error('Incorrect user/password combination')
        }
        //Se encontrar o email compara a senha digitada com a senha(criptografada) do objeto user encontrado
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect user/password combination');
        }

        const { secret, expiresIn } = authConfig.jwt;

        // Senao usuario autenticado
        //Gerando token
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        })
        return { user, token }
    }
}

export default AuthenticateUserService;
