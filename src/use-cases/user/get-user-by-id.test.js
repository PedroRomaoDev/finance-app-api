import { faker } from '@faker-js/faker';
import { GetUserByIdUseCase } from './get-user-by-id.js';

describe('GetUserByIdUseCase', () => {
    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
    };

    class GetUserByIdReposityStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const getUserByIdRepository = new GetUserByIdReposityStub();
        const sut = new GetUserByIdUseCase(getUserByIdRepository);

        return { sut, getUserByIdRepository };
    };

    it('should get user by id succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(faker.string.uuid());

        // assert
        expect(result).toEqual(user);
    });

    it('should call GetUserByIdRepository with correct params', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        const getUserByIdRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            'execute',
        );
        const userId = faker.string.uuid();

        // act
        await sut.execute(userId);

        // assert
        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(userId);
    });
});
