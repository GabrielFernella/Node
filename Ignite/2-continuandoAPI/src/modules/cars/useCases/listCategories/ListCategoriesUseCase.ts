import { injectable, inject } from "tsyringe";

import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();

        if (!categories) {
            throw new Error("Não achou");
        }

        return categories;
    }
}

export { ListCategoriesUseCase };
