import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerfile from "./swagger.json";

import "./database"; // importando as configurações do banco de dados

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerfile));

app.use(router);

app.listen(3333, () => console.log("Server is running! http://localhost:3333"));
