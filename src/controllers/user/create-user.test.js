import { CreateUserController } from './create-user.js';
import { faker } from '@faker-js/faker';
import { EmailAlreadyInUseError } from '../../errors/user.js';
import { user } from '../../tests/index.js';

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        //Sut = suits under test
        const createUserUseCase = new CreateUserUseCaseStub();
        const sut = new CreateUserController(createUserUseCase);
        return { createUserUseCase, sut };
    };

    const httpRequest = {
        body: {
            ...user,
            id: undefined,
        },
    };

    it('should return 201 when creating a user succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(user);
    });

    it('should return 400 if first_name is not provided', async () => {
        // arrange
        const { sut } = makeSut();
        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                first_name: undefined,
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if last_name is not provided', async () => {
        // arrange
        const { sut } = makeSut();
        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                last_name: undefined,
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if email is not provided', async () => {
        // arrange
        const { sut } = makeSut();
        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: undefined,
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if email is not valid', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: 'invalid email',
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if password is not provided', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: undefined,
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if password is less than 6 characters', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: faker.internet.password({
                    length: 5,
                }),
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should call CreateUserUseCase with correct params', async () => {
        // arrange
        const { sut, createUserUseCase } = makeSut();

        const executeSpy = jest.spyOn(createUserUseCase, 'execute'); // se o use case está sendo chamado com o que eu quero que seja chamado

        // act
        await sut.execute(httpRequest);

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });

    it('should return 500 if CreateUserUseCase throws', async () => {
        // arrange
        const { sut, createUserUseCase } = makeSut();

        jest.spyOn(createUserUseCase, 'execute').mockRejectedValue(new Error());
        // act
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(500);
    });

    it('should return 500 if CreateUserUseCase throws EmailAlreadyInUseError', async () => {
        // arrange
        const { sut, createUserUseCase } = makeSut();

        jest.spyOn(createUserUseCase, 'execute').mockRejectedValueOnce(
            new EmailAlreadyInUseError(httpRequest.body.email),
        );

        // acta
        const result = await sut.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });
});
