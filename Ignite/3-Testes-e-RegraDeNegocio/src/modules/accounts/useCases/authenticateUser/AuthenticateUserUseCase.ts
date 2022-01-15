import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // verifica se o usuário existe

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("E-mail or password incorrect");
        }

        // verifica se a senha é válida
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("E-mail or password incorrect");
        }

        // Gerar o jsonwebtoken
        const token = sign({}, "958078df2cab766c85ee67ce5ccb2428", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenResponse: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenResponse;
    }
}

export { AuthenticateUserUseCase };
