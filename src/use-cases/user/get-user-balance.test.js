import { faker } from '@faker-js/faker';
import { GetUserBalanceUseCase } from './get-user-balance.js';

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
});
