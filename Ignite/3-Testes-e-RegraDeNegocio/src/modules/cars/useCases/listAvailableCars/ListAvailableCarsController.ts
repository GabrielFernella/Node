import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, name, category_id } = request.query;

        const listAvailableCarsUseCase = container.resolve(
            ListAvailableCarsUseCase
        );

        // Aqui podemos forçar a indicação de que as variáveis do query serão o tipo correto
        const cars = await listAvailableCarsUseCase.execute({
            brand: brand as string,
            name: name as string,
            category_id: category_id as string,
        });

        return response.status(200).json(cars);
    }
}

export { ListAvailableCarsController };
