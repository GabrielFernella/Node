import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";

import { compare } from "bcrypt";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

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
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("E-mail or password incorrect!");
        }

        const passwordMath = compare(password, user.password);

        if (!passwordMath) {
            throw new AppError("E-mail or password incorrect!");
        }

        const token = sign({}, "8900a3920243e76ec709505b40944f85", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
