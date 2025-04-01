import { faker } from '@faker-js/faker';
import { GetUserByIdController } from './get-user-by-id.js';

describe('GetUserByIdController', () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            };
        }
    }

    const makeSut = () => {
        //Sut = suits under test
        const getUserByIdUseCase = new GetUserByIdUseCaseStub();
        const sut = new GetUserByIdController(getUserByIdUseCase);
        return { getUserByIdUseCase, sut };
    };

    it('should return 200 if user is found', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            params: { userId: faker.string.uuid() },
        });

        // assert
        expect(result.statusCode).toBe(200);
    });

    it('should return 400 if an invalid id is provided', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            params: { userId: 'invalid id' },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
});
