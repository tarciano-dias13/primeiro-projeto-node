import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import UploadConfig from '../config/upload';
import User from '../models/Users';
import AppError from '../errors/AppError';

interface Request {
    user_id: string;
    avatarFilename: string;
};

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {

        const userRepository = getRepository(User);
        // pesquisa usuario no repositorio User
        const user = await userRepository.findOne(user_id);

        if (!user) {
            throw new AppError('Only user authenticated can change avatar!', 401)
        };

        //Se o usuario tiver um avatar
        if (user.avatar) {
            //recuperando local do arquivo diretorio de avatares+nome do avatar
            console.log("diretoriotmp:", UploadConfig.directory);
            console.log("name avatar:", user.avatar);

            const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);

            console.log(userAvatarFilePath);
            //funcao que verifica se o arquivo existe
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            console.log("tentou apagar");
            //Apagando avatar anterior
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        //definindo novo avatar
        user.avatar = avatarFilename;
        //Salvando user no repositorio com as novas informaçoes
        userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
