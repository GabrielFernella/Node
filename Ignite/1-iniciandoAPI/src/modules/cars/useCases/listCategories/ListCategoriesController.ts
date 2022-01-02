import { Request, Response } from "express";

import { ListcategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListcategoriesUseCase) {}

    handle(request: Request, response: Response): Response {
        const all = this.listCategoriesUseCase.execute();
        return response.json(all);
    }
}

export { ListCategoriesController };
