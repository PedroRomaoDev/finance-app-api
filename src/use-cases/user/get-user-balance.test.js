import { faker } from '@faker-js/faker';
import { GetUserBalanceUseCase } from './get-user-balance.js';
import { UserNotFoundError } from '../../errors/user';

describe('GetUserBalanceUseCase', () => {
    const userBalance = {
        earnings: faker.finance.amount(),
        expenses: faker.finance.amount(),
        invesments: faker.finance.amount(),
        balance: faker.finance.amount(),
    };

    class getUserBalanceRepositoryStub {
        async execute() {
            return userBalance;
        }
    }
    class getUserByIdRepositoryStub {
        async execute() {
            return {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            };
        }
    }

    const makeSut = () => {
        const getUserBalanceRepository = new getUserBalanceRepositoryStub();
        const getUserByIdRepository = new getUserByIdRepositoryStub();
        const sut = new GetUserBalanceUseCase(
            getUserBalanceRepository,
            getUserByIdRepository,
        );
        return { sut, getUserBalanceRepository, getUserByIdRepository };
    };

    it('should get user balance succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const result = await sut.execute(faker.string.uuid());

        // assert
        expect(result).toEqual(userBalance);
    });

    it('should throw UserNotFoundError if GetUserByIdRepository returns null', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        jest.spyOn(getUserByIdRepository, 'execute').mockResolvedValue(null);
        const userId = faker.string.uuid();

        // act
        const promise = sut.execute(userId);

        // assert
        await expect(promise).rejects.toThrow(new UserNotFoundError(userId));
    });

    it('should call GetUserByIdRepository with correct params', async () => {
        // arrange
        const { sut, getUserByIdRepository } = makeSut();
        const getUserBydRepositorySpy = jest.spyOn(
            getUserByIdRepository,
            'execute',
        );
        const userId = faker.string.uuid();

        // act
        await sut.execute(userId);

        // assert
        expect(getUserBydRepositorySpy).toHaveBeenCalledWith(userId);
    });

    it('should call GetUserBalanceRepository with correct params', async () => {
        // arrange
        const { sut, getUserBalanceRepository } = makeSut();
        const getUserBalanceRepositorySpy = jest.spyOn(
            getUserBalanceRepository,
            'execute',
        );
        const userId = faker.string.uuid();

        // act
        await sut.execute(userId);

        // assert
        expect(getUserBalanceRepositorySpy).toHaveBeenCalledWith(userId);
    });
});
