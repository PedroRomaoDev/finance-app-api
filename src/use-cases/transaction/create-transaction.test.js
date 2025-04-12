import { faker } from '@faker-js/faker';
import { CreateTransactionUseCase } from './create-transaction.js';

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
});
