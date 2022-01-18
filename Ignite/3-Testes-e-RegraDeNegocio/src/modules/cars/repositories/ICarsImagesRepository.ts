import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
    // findById(id: string): Promise<Car>;

    create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository };
