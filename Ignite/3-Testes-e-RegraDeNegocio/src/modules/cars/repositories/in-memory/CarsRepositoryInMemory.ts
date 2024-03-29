import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        name,
        description,
        license_plate,
        daily_rate,
        fine_amount,
        brand,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const cars = new Car();

        Object.assign(cars, {
            name,
            description,
            license_plate,
            daily_rate,
            fine_amount,
            brand,
            id,
        });

        this.cars.push(cars);
        return cars;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const all = this.cars.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
        });
        // .filter((car) => brand && car.brand === brand)
        // .filter((car) => category_id && car.category_id === category_id)
        // .filter((car) => name && car.name === name);
        return all;
    }
}

export { CarsRepositoryInMemory };
