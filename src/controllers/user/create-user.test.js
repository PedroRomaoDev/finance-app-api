import { CreateUserController } from './create-user.js';

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user;
        }
    }

    it('should return 201 when creating a user succesfully', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                first_name: 'Pedro',
                last_name: 'Romao',
                email: 'pedroromao@gmail.com',
                password: '123456789',
            },
        };

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(201);
        expect(result.body).toEqual(httpRequest.body);
    });

    it('should return 400 if first_name is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );
        const httpRequest = {
            body: {
                last_name: 'Romao',
                email: 'pedroromao@gmail.com',
                password: '123456789',
            },
        };
        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if last_name is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );
        const httpRequest = {
            body: {
                first_name: 'Pedro',
                email: 'pedroromao@gmail.com',
                password: '123456789',
            },
        };
        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if email is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );
        const httpRequest = {
            body: {
                first_name: 'Pedro',
                last_name: 'Romao',
                password: '123456789',
            },
        };
        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if email is not valid', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );
        const httpRequest = {
            body: {
                first_name: 'Pedro',
                last_name: 'Romao',
                email: 'pe',
                password: '123456789',
            },
        };
        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if password is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );
        const httpRequest = {
            body: {
                first_name: 'Pedro',
                last_name: 'Romao',
                email: 'pedroromao@gmail.com',
            },
        };
        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 if password is less than 6 characters', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );
        const httpRequest = {
            body: {
                first_name: 'Pedro',
                last_name: 'Romao',
                email: 'pedroromao@gmail.com',
                password: '123',
            },
        };
        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should call CreateUserUseCase with correct params', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );
        const httpRequest = {
            body: {
                first_name: 'Pedro',
                last_name: 'Romao',
                email: 'pedroromao@gmail.com',
                password: '1234567',
            },
        };

        const executeSpy = jest.spyOn(createUserUseCase, 'execute'); // se o use case está sendo chamado com o que eu quero que seja chamado

        // act
        await createUserController.execute(httpRequest);

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });
});
