import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
     values('${id}', 'admin', 'admin@gmail.com','${password}',true,'now()', 'XXXX')
    `
    );

    await connection.close;
}
create().then(() => console.log("User admin created!"));

// O seed utilizamos para criar usuários administradores, assim podemos realizar funções com acesso admin
