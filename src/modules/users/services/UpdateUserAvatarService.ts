import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import UploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}
@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        // pesquisa usuario no repositorio User
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only user authenticated can change avatar!',
                401,
            );
        }

        // Se o usuario tiver um avatar
        if (user.avatar) {
            // recuperando local do arquivo diretorio de avatares+nome do avatar
            console.log('diretoriotmp:', UploadConfig.directory);
            console.log('name avatar:', user.avatar);

            const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);

            console.log(userAvatarFilePath);
            // funcao que verifica se o arquivo existe
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            console.log('tentou apagar');
            // Apagando avatar anterior
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        // definindo novo avatar
        user.avatar = avatarFilename;
        // Salvando user no repositorio com as novas informaçoes
        this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
