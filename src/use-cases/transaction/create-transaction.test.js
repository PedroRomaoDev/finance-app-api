import { faker } from '@faker-js/faker';
import { CreateTransactionUseCase } from './create-transaction.js';
import { UserNotFoundError } from '../../errors/user';

describe('CreateTransactionUseCase', () => {
    class CreateTransactionRepositoryStub {
        async execute(transaction) {
            return transaction;
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'random_id';
        }
    }

    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({
            length: 7,
        }),
    };

    class GetUserByIdRepositoryStub {
        async execute(userId) {
            return { ...user, id: userId };
        }
    }

    const createTransactionParams = {
        user_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        date: faker.date.anytime().toISOString(),
        type: 'EXPENSE',
        amount: Number(faker.finance.amount()),
    };

    const makeSut = () => {
        const createTransactionRepository =
            new CreateTransactionRepositoryStub();
        const idGeneratorAdapter = new IdGeneratorAdapterStub();
        const getUserByIdRepository = new GetUserByIdRepositoryStub();
        const sut = new CreateTransactionUseCase(
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        );

        return {
            sut,
            createTransactionRepository,
            getUserByIdRepository,
            idGeneratorAdapter,
        };
    };

    it('should create transaction successfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(createTransactionParams);

        // assert
        expect(result).toEqual({ ...createTransactionParams, id: 'random_id' });
    });

    it('should calls GetUserByIdRepository with correct params', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        const getUserByIdRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            'execute',
        );

        // act
        await sut.execute(createTransactionParams);

        // assert
        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(
            createTransactionParams.user_id,
        );
    });
    it('should calls IdGeneratorAdapter', async () => {
        // arrange
        const { sut, idGeneratorAdapter } = makeSut();
        const idGeneratorAdapterSpy = jest.spyOn(idGeneratorAdapter, 'execute');

        // act
        await sut.execute(createTransactionParams);

        // assert
        expect(idGeneratorAdapterSpy).toHaveBeenCalled();
    });

    it('should calls CreateTransactionRepository with correct params', async () => {
        // arrange
        const { sut, createTransactionRepository } = makeSut();
        const createTransactionRepositorySpy = jest.spyOn(
            createTransactionRepository,
            'execute',
        );

        // act
        await sut.execute(createTransactionParams);

        // assert
        expect(createTransactionRepositorySpy).toHaveBeenCalledWith({
            ...createTransactionParams,
            id: 'random_id',
        });
    });

    it('should throw UserNotFoundError if user does not exist', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValue(null);

        // act
        const promise = sut.execute(createTransactionParams);

        // assert
        await expect(promise).rejects.toThrow(
            new UserNotFoundError(createTransactionParams.user_id),
        );
    });

    it('should throw if GetUserByIdRepository throws', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        jest.spyOn(getUserByIdRepository, 'execute').mockRejectedValue(
            new Error(),
        );

        // act
        const promise = sut.execute(createTransactionParams);

        // assert
        await expect(promise).rejects.toThrow();
    });
});
