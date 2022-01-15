// Arquivo onde vc pode sobreescrever o type das bibliotecas
// Deve ter uma pasta com o mesmo nome do pacote
// Extensão de tipagens

declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
        user: {
            id: string;
        };
    }
}
