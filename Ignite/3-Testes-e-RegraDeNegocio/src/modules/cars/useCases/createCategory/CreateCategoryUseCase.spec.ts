import { AppError } from "@shared/errors/AppError";

import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
    beforeEach(() => {
        // Antes de qualquer teste, é realizado essas instancias para que vc consiga usar o respository
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("should be able to create a new Category", async () => {
        // Criando um Objeto para utilziar os dados
        const category = {
            name: "Category Test",
            description: "Category description test",
        };

        // Chamando o serviço useCase para testar e passando os parâmetros
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        // valor que vamos pegar para conseguir testar
        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        // Esse expect espera que a variável possua um valor em category.id
        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new Category with name exists", async () => {
        // Nesse caso colocamos a função dentro do expect para que ela de fato de erro no nosso useCase e assim
        // pegamos o reject e identificamos que teve uma instancia do APPError
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category description test",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
