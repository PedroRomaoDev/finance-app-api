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
        const id = faker.string.uuid();

        // act
        const result = await sut.execute(id);

        // assert
        expect(result).toEqual({
            ...transaction,
            id: id,
        });
    });

    it('should call DeleteTransactionRepository with correct params', async () => {
        // arrange
        const { sut, deleteTransactionRepository } = makeSut();
        const deleteTransactionRepositorySpy = jest.spyOn(
            deleteTransactionRepository,
            'execute',
        );
        const id = faker.string.uuid();

        // act
        await sut.execute(id);

        // assert
        expect(deleteTransactionRepositorySpy).toHaveBeenCalledWith(id);
    });

    it('should throw if DeleteTransactionRepository throws', async () => {
        // arrange
        const { sut, deleteTransactionRepository } = makeSut();
        jest.spyOn(
            deleteTransactionRepository,
            'execute',
        ).mockRejectedValueOnce(new Error());
        const id = faker.string.uuid();

        // act
        const promise = sut.execute(id);

        // assert
        await expect(promise).rejects.toThrow();
    });
});
