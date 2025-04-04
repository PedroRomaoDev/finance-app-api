import { faker } from '@faker-js/faker';
import { DeleteTransactionController } from './delete-transaction.js';

describe('DeleteTransactionController', () => {
    class DeleteTransactionUseCaseStub {
        async execute() {
            return {
                user_id: faker.string.uuid(),
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                date: faker.date.anytime().toISOString(),
                type: 'EXPENSE',
                amount: Number(faker.finance.amount()),
            };
        }
    }

    const makeSut = () => {
        const deleteTransactionUseCase = new DeleteTransactionUseCaseStub();
        const sut = new DeleteTransactionController(deleteTransactionUseCase);

        return { sut, deleteTransactionUseCase };
    };

    it('should return 200 when deleting a transaction succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            params: { transactionId: faker.string.uuid() },
        });

        // assert
        expect(result.statusCode).toBe(200);
    });

    it('should return 400 when id is invalid', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            params: { transactionId: 'invalid_id' },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 404 when transaction is not found', async () => {
        // arrange
        const { sut, deleteTransactionUseCase } = makeSut();
        jest.spyOn(deleteTransactionUseCase, 'execute').mockResolvedValueOnce(
            null,
        ); //resolvedValue porque nao queremos que ele lance uma exceção, pq cairia no catch e o status code seria 500

        // act
        const result = await sut.execute({
            params: { transactionId: faker.string.uuid() },
        });

        // assert
        expect(result.statusCode).toBe(404);
    });

    it('should return 500 when DeleteTransactionUseCase throws', async () => {
        // arrange
        const { sut, deleteTransactionUseCase } = makeSut();
        jest.spyOn(deleteTransactionUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        // act
        const result = await sut.execute({
            params: { transactionId: faker.string.uuid() },
        });

        // assert
        expect(result.statusCode).toBe(500);
    });

    it('should call DeleteTransactionUseCase with correct params', async () => {
        // arrange
        const { sut, deleteTransactionUseCase } = makeSut();
        const executeSpy = jest.spyOn(deleteTransactionUseCase, 'execute');

        const transactionId = faker.string.uuid();

        // act
        await sut.execute({
            params: {
                transactionId,
            },
        });

        // assert
        expect(executeSpy).toHaveBeenCalledWith(transactionId);
    });
});
