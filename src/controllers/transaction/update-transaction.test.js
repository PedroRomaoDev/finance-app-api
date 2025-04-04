import { faker } from '@faker-js/faker';
import { UpdateTransactionController } from './update-transaction.js';

describe('UpdateTransactionController', () => {
    class updateTransactionUseCaseStub {
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
        const updateTransactionUseCase = new updateTransactionUseCaseStub();
        const sut = new UpdateTransactionController(updateTransactionUseCase);

        return { sut, updateTransactionUseCase };
    };

    const baseHttpRequest = {
        params: {
            transactionId: faker.string.uuid(),
        },
        body: {
            name: faker.commerce.productName(),
            date: faker.date.anytime().toISOString(),
            type: 'EXPENSE',
            amount: Number(faker.finance.amount()),
        },
    };

    it('should return 200 when updating a transaction succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(baseHttpRequest);

        // assert
        expect(result.statusCode).toBe(200);
    });

    it('should return 400 when transaction id is invalid', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            params: {
                transactionId: 'invalid_id',
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 when unallowed field is provided', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            ...baseHttpRequest,
            body: {
                ...baseHttpRequest.body,
                unallowed_field: 'some_value',
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 when amount is invalid', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            ...baseHttpRequest,
            body: {
                ...baseHttpRequest.body,
                amount: 'invalid_amount',
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 400 when type is invalid', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            ...baseHttpRequest,
            body: {
                ...baseHttpRequest.body,
                type: 'invalid_type',
            },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });
});
