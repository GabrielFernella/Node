import { ICreateUserDTO } from "../dtos/ICreateUser";
import User from "../entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
