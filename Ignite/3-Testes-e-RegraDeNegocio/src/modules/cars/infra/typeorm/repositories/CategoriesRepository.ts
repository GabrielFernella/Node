import { getRepository, Repository } from "typeorm";

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import Category from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>; // atribuindo as funções do repository a essa variável de forma privada

    constructor() {
        this.repository = getRepository(Category); // Faz com que o repository tenha as funções do typeorm
    }

    // Utilizamos esse método para compartilhar a instancia desse repositorio
    /* public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
    } */

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        // created_at e id é criado automaticamente pelo banco
        const category = this.repository.create({
            name,
            description,
        });

        await this.repository.save(category);
    }

    async findAll(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({
            where: {
                name,
            },
        });

        return category;
    }
}

export { CategoriesRepository };
