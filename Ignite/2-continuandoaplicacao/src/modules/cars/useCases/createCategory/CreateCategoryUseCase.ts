import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

// para que essa classe possa  utilizar injeção de dependencia, basta vc adicionar esse notation
@injectable()
class CreateCategoryUseCase {
    // Instanciando a propriedade da repository com o tsyringe
    // Assim essa ferramenta vai ficar gerenciando a instancia do meu repository
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const category = await this.categoriesRepository.findByName(name);

        if (category) {
            throw new Error("Category has already been exists");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
