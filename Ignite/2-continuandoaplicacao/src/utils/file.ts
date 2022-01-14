import fs from "fs";

export const deleteFile = async (filename: string) => {
    try {
        // Verifica se um arquivo existe ou não
        await fs.promises.stat(filename);
    } catch (error) {
        return;
    }

    await fs.promises.unlink(filename); // remove o arquivo
};
