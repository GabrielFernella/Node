import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"; // apenas importando já garante que essa lib funcione
import swaggerUi from "swagger-ui-express";
import "@shared/infra/typeorm"; // importando as configurações do banco de dados

import "@shared/container"; // buscando o index do tsyringe para realizar as instancias

import { AppError } from "@shared/errors/AppError";

import swaggerfile from "../../../swagger.json";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerfile));

app.use(router);

// Criano o middleware para error
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        // Verificar a instancia do erro,
        // para que os erros sejam de fato passados precisa de o auxilio de uma biblioteca yarn add express-async-errors
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server Error - ${err.message}`,
        });
    }
);

app.listen(3333, () => console.log("Server is running! http://localhost:3333"));
