import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "./database";
import "./shared/container"; // Chamando a injeção de dependencias para o projeto

import { router } from "./routes";
import { AppError } from "./shared/errors/AppError";
import swaggerfile from "./swagger.json";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerfile));

app.use(router);

console.log("teste2");

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }
        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });
    }
);

app.listen(3333, () => console.log("Server is running! http://localhost:3333"));
