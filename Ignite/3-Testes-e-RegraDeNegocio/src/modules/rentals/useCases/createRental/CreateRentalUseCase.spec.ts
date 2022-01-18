import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateRentalUseCse } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCse;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCse(rentalsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123456",
            car_id: "654321",
            expected_return_date: new Date(),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "849551",
                expected_return_date: new Date(),
            });

            const rental = await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "654321",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123123",
                car_id: "654321",
                expected_return_date: new Date(),
            });

            const rental = await createRentalUseCase.execute({
                user_id: "123456",
                car_id: "654321",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
