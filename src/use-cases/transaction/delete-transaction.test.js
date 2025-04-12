import { faker } from '@faker-js/faker';
import { DeleteTransactionUseCase } from './delete-transaction.js';

describe('DeleteTransactionUseCase', () => {
    const transaction = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.commerce.productName(),
        date: faker.date.anytime().toISOString(),
        type: 'EXPENSE',
        amount: Number(faker.finance.amount()),
    };

    class DeleteTransactionRepositoryStub {
        async execute(transactionId) {
            return {
                ...transaction,
                id: transactionId,
            };
        }
    }

    const makeSut = () => {
        const deleteTransactionRepository =
            new DeleteTransactionRepositoryStub();
        const sut = new DeleteTransactionUseCase(deleteTransactionRepository);

        return {
            sut,
            deleteTransactionRepository,
        };
    };

    it('should delete transaction successfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(transaction.id);

        // assert
        expect(result).toEqual(transaction);
    });
});
