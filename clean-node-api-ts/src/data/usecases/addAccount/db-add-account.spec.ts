import { AccountModel, AddAccountModel, Encrypter, AddAccountRepository } from './db-add-account-protocols';
import { DbAddAccount } from "./db-add-account"


describe('DB AddAccount useCase', () => {

  interface SutTypes {
    sut: DbAddAccount
    encrypterStub: Encrypter
    addAccountRepositoryStub: AddAccountRepository
  }

  const makeSut = (): SutTypes => {
    
    const encrypterStub = makeEncrypter()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

    return {
      sut,
      encrypterStub,
      addAccountRepositoryStub
    }
  }

  const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }

    return new EncrypterStub()
  }

  const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
      async add (accountData: AddAccountModel): Promise<AccountModel> {
        const fakeAccount = {
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email', 
          password: 'hashed_password',
        }
        return new Promise(resolve => resolve(fakeAccount))
      }
    }

    return new AddAccountRepositoryStub()
  }

  test('Should call encrypter with correct password', async () => {

    const {sut, encrypterStub} = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accountData)
    //Espera que o método chamado seja passada esse valor como parametro
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {

    const {sut, encrypterStub} = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error)))
    // mockando um retorno que estoura uma new Error

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const promise = sut.add(accountData)
    //Espera que o método chamado seja passada esse valor como parametro
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {

    const {sut, addAccountRepositoryStub} = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    // mockando um retorno que estoura uma new Error

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    await sut.add(accountData)
    //Espera que o método chamado seja passada esse valor como parametro
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('Should throw if Encrypter throws', async () => {

    const {sut, addAccountRepositoryStub} = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error)))
    // mockando um retorno que estoura uma new Error

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const promise = sut.add(accountData)
    //Espera que o método chamado seja passada esse valor como parametro
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {

    const {sut} = makeSut()

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }

    const account = await sut.add(accountData)
    //Espera que o método chamado seja passada esse valor como parametro
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

})