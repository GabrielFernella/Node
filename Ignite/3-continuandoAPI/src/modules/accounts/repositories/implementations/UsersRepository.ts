import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }
    async findById(user_id: string): Promise<User> {
        const user = this.repository.findOne(user_id);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const findEmail = await this.repository.findOne({ email });
        return findEmail;
    }

    async create({
        name,
        email,
        password,
        driver_license,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
            avatar,
            id,
        });

        await this.repository.save(user);
    }
}

export { UsersRepository };
