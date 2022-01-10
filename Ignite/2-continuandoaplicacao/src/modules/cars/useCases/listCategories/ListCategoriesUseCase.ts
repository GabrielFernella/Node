import Category from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListcategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute(): Category[] {
        const categories = this.categoriesRepository.findAll();

        return categories;
    }
}

export { ListcategoriesUseCase };
