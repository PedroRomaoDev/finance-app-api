import { faker } from '@faker-js/faker';
import { GetTransactionsByUserIdUseCase } from './get-transactions-by-user-id.js';
import { UserNotFoundError } from '../../errors/user';

describe('GetTransactionsByUserIdUseCase', () => {
    // const transactions = {
    //     id: faker.string.uuid(),
    //     user_id: faker.string.uuid(),
    //     name: faker.commerce.productName(),
    //     date: faker.date.anytime().toISOString(),
    //     type: 'EXPENSE',
    //     amount: Number(faker.finance.amount()),
    // };
    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
    };
    class GetTransactionsByUserIdRepositoryStub {
        async execute() {
            return [];
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const getTransactionsByUserIdRepository =
            new GetTransactionsByUserIdRepositoryStub();
        const getUserByIdRepository = new GetUserByIdRepositoryStub();
        const sut = new GetTransactionsByUserIdUseCase(
            getTransactionsByUserIdRepository,
            getUserByIdRepository,
        );

        return {
            sut,
            getTransactionsByUserIdRepository,
            getUserByIdRepository,
        };
    };

    it('should get transactions by user id successfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(faker.string.uuid());

        // assert
        expect(result).toEqual([]);
    });

    it('should throw UserNotFoundError if user not exists', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValueOnce(
            null,
        );
        const id = faker.string.uuid();

        // act
        const promise = sut.execute(id);

        // assert
        await expect(promise).rejects.toThrow(new UserNotFoundError(id));
    });

    it('should call GetUserByIdRepository if correct params', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        const getUserByIdRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            'execute',
        );
        const id = faker.string.uuid();

        // act
        await sut.execute(id);

        // assert
        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(id);
    });

    it('should call GetTransactionsByUserIdRepository if correct params', async () => {
        // arrange
        const { sut, getTransactionsByUserIdRepository } = makeSut();
        const getTransactionsByUserIdRepositorySpy = jest.spyOn(
            getTransactionsByUserIdRepository,
            'execute',
        );
        const id = faker.string.uuid();

        // act
        await sut.execute(id);

        // assert
        expect(getTransactionsByUserIdRepositorySpy).toHaveBeenCalledWith(id);
    });
});
