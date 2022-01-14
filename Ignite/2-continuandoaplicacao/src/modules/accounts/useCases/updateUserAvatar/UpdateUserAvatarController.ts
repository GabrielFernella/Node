import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const avatar_file = request.file.filename; // pegano o nome do arquico que será enviado pelo request

        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase
        );

        await updateUserAvatarUseCase.execute({
            user_id: id,
            avatar_file,
        });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };
