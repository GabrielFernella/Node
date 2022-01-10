import Category from "../../model/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.categories = [];
    }

    // Utilizamos esse método para compartilhar a instancia desse repositorio
    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
    }

    findAll(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        return this.categories.find((category) => category.name === name);
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category: Category = {
            name,
            description,
            created_at: new Date(Date.now()),
        };

        this.categories.push(category);
    }
}

export { CategoriesRepository };
