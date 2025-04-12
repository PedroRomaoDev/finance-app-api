import { faker } from '@faker-js/faker';
import { GetTransactionsByUserIdController } from './get-transactions-by-user-id.js';
import { UserNotFoundError } from '../../errors/user';
import { transaction } from '../../tests/index.js';

describe('GetTransactionsByUserIdController', () => {
    class GetTransactionsByUserIdUseCaseStub {
        async execute() {
            return transaction;
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

    it('should return 400 when userId param is invalid', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute({
            query: { userId: 'invalid_user_id' },
        });

        // assert
        expect(result.statusCode).toBe(400);
    });

    it('should return 404 when GetTransactionsByIdUseCase throws UserNotFoundError', async () => {
        // arrange
        const { sut, getTransactionsByUserIdUseCase } = makeSut();
        jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new UserNotFoundError());

        // act
        const result = await sut.execute({
            query: { userId: faker.string.uuid() },
        });

        // assert
        expect(result.statusCode).toBe(404);
    });

    it('should return 500 when GetTransactionsByIdUseCase throws a generic error', async () => {
        // arrange
        const { sut, getTransactionsByUserIdUseCase } = makeSut();
        jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new Error());

        // act
        const result = await sut.execute({
            query: { userId: faker.string.uuid() },
        });

        // assert
        expect(result.statusCode).toBe(500);
    });

    it('should call GetTransactionsByIdUseCase with correct params', async () => {
        // arrange
        const { sut, getTransactionsByUserIdUseCase } = makeSut();
        const executeSpy = jest.spyOn(
            getTransactionsByUserIdUseCase,
            'execute',
        );

        const userId = faker.string.uuid();

        // act
        await sut.execute({
            query: {
                userId: userId,
            },
        });

        // assert
        expect(executeSpy).toHaveBeenCalledWith(userId);
    });
});
