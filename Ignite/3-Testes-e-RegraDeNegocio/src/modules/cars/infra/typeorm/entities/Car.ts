import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import Category from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @Column()
    category_id: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    // Atributo para usar na tabela de relacionamento
    @ManyToMany(() => Specification) // quando há uma tabela de relacionamentos, identificamos que é um manytomany
    @JoinTable({
        name: "specifications_cars", // Nome da tabela que está fazendo o join
        joinColumns: [{ name: "car_id" }], // Qual nome da coluna dessa respectiva tabela de relacionamento
        inverseJoinColumns: [{ name: "id" }], // Coluna que referencia a tabela que estamos colocando aqui em specifications
    })
    specifications: Specification[];

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
        }
    }
}

export { Car };
