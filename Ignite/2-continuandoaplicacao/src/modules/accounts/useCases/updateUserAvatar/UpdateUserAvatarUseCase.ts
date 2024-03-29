import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

// Adicionar coluna avatar na tabela de users
// Configurar multer
// Refatorar usuário
// criar regra de negócio upload
// criar controller

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`); // chamando a função para apagar a imagem
        }

        user.avatar = avatar_file;

        await this.usersRepository.create(user); // já faz a atualização
    }
}

export { UpdateUserAvatarUseCase };
