import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListcategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const listCategoryUseCase = new ListcategoriesUseCase(categoriesRepository);

const listCategoriesController = new ListCategoriesController(
    listCategoryUseCase
);

export { listCategoriesController };
