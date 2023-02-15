import { InvalidParamError } from "../errors/invalid-param-error"
import { MissingParamError } from "../errors/missing-param-error"
import { EmailValidator } from "../protocols/email-validator"
import { SignUpController } from "./signup"

interface SutTypes {
  sut: SignUpController,
  emailValidatorStub: EmailValidator
}

const makeSut = ():SutTypes => {
  class EmailValidatorStub implements EmailValidator { //duble de teste
    isValid(email: string):boolean{
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut, emailValidatorStub
  }
}

describe('SingUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        email: "any_email@gmail.com",
        password: "any_password",
        passwordConfirmation: "any_passwor"
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("name"))
  })

  test('Should return 400 if no email is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_passwor"
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("email"))
  })

  test('Should return 400 if no password is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@gmail.com",
        passwordConfirmation: "any_passwor"
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("password"))
  })

  test('Should return 400 if no password is provided', () => {
    const {sut} = makeSut()
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@gmail.com",
        password: "any_passwor"
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError("passwordConfirmation"))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const {sut, emailValidatorStub} = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false) 
    //Usando o jest para alterar o valor da função, funcionando como um mock do retorno da function, passa apenas o método e o valor

    const httpRequest = {
      body: {
        name: "any_name",
        email: "invalid_email@gmail.com",
        password: "any_passwor",
        passwordConfirmation: "any_passwor"
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError("email"))
  })
})