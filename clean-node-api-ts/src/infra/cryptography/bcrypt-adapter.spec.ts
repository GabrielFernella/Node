import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

//pegando uma função e mockando um retorno para testar
jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash'
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe("Bcrypt Adapter", () => {
  test("Should call bcrypt with correct values", async () => {
    const sut = makeSut();

    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("any_value");

    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("Should return a hash on success", async () => {
    const sut = makeSut();
    const hash = await sut.encrypt("any_value");

    expect(hash).toBe("hash");
  });

  // test('Should throw if hash throws', async () => {
  //   const sut = makeSut()
  //   jest.spyOn(bcrypt, 'hash').mockImplementationOnce(new Error())
  //   const promise = sut.encrypt('any_value')
  //   await expect(promise).rejects.toThrow()
  // })
});
