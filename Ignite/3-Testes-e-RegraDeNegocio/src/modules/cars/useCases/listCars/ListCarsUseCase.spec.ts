import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to List all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro automático",
            daily_rate: 140.0,
            license_plate: "DEF-1235",
            fine_amount: 100,
            brand: "Audi",
            category_id: "c95ae5c3-fb74-41db-a12f-c2e9ca50800b",
        });

        const cars = await listCarsUseCase.execute({});

        // expect(cars).toHaveLength(1);
        expect(cars).toEqual([car]); // Verifica se tem esse objeto dentro do array
    });

    it("should be able to List all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro automático",
            daily_rate: 140.0,
            license_plate: "DEF-1235",
            fine_amount: 100,
            brand: "Audi_brand",
            category_id: "c95ae5c3-fb74-41db-a12f-c2e9ca50800b",
        });

        const cars = await listCarsUseCase.execute({
            brand: "Audi_brand",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to List all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro automático",
            daily_rate: 140.0,
            license_plate: "DEF-1235",
            fine_amount: 100,
            brand: "Audi_brand",
            category_id: "c95ae5c3-fb74-41db-a12f-c2e9ca50800b",
        });

        const cars = await listCarsUseCase.execute({
            name: "Car1",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to List all available cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Carro automático",
            daily_rate: 140.0,
            license_plate: "DEF-1235",
            fine_amount: 100,
            brand: "Audi_brand",
            category_id: "teste_id",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "teste_id",
        });

        expect(cars).toEqual([car]);
    });
});
