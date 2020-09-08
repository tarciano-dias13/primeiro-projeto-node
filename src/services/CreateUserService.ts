import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/Users';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {

        const usersRepository = getRepository(User);

        //Pesquisa no banco se o email existe
        const checkUserExist = await usersRepository.findOne({
            where: { email },
        });

        //verifica a variavel e dispara novo erro
        if (checkUserExist) {
            throw new Error('Email adress already used.');
        };

        //criptografa a senha do usuario com a lib bcryptjs
        const hashedPassword = await hash(password , 8);

        //Cria uma instancia do usuario na memoria .create
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        //persiste no banco de dados .save
        await usersRepository.save(user);

        return user;
    }

}
export default CreateUserService;
