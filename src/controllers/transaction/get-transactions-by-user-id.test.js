import { faker } from '@faker-js/faker';
import { GetTransactionsByUserIdController } from './get-transactions-by-user-id.js';

describe('GetTransactionsByUserIdController', () => {
    class GetTransactionsByUserIdUseCaseStub {
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
        const getTransactionsByUserIdUseCase =
            new GetTransactionsByUserIdUseCaseStub();
        const sut = new GetTransactionsByUserIdController(
            getTransactionsByUserIdUseCase,
        );

        return { sut, getTransactionsByUserIdUseCase };
    };

    it('should return 200 when finding transaction by user id succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            query: { userId: faker.string.uuid() },
        });

        // assert
        expect(result.statusCode).toBe(200);
    });

    it('should return 400 when missing user id param', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            query: { userId: undefined },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
});
