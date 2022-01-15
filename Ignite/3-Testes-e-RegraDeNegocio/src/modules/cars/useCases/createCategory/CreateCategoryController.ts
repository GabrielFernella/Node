import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// import { CreateCategoryUseCase } from "./CreateCategoryUseCase"; não usa mais

class CreateCategoryController {
    // constructor(private createCategoryUseCase: CreateCategoryUseCase) {} Nãp usar mais

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        // o tsyringe tbm realiza a injeção de depencia através do container, assim dando acesso ao UseCase, não precisando ser instanciado pelo index
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
        await createCategoryUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateCategoryController };
