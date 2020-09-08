import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import Users from '../models/Users'

interface Request {
    email: string;
    password: string;
};

interface Response {
    user: Users
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
        // Senao usuario autenticado
        return { user }
    }
}

export default AuthenticateUserService;
