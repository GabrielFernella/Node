import User from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUserDTO } from "../../dtos/ICreateUser";
import { IUsersRepository } from "../IUsersRepository";

// Quando criamos um repositório fake, fazemos com um array vazio e os mesmos métodos que possuímos em nosso repository

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, { name, email, password, driver_license });

        this.users.push(user);
    }
    async findById(id: string): Promise<User> {
        const user = this.users.find((user) => user.id === id);
        return user;
    }
    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user) => user.email === email);
        return user;
    }
}

export { UsersRepositoryInMemory };
