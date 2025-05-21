import { LoginUserUseCase } from './login-user';
import { user } from '../../tests/fixtures/user.js';
import { UserNotFoundError } from '../../errors/user';

describe('LoginUserUseCase', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const getUserByEmailRepositoryStub = new GetUserByEmailRepositoryStub();
        const sut = new LoginUserUseCase(getUserByEmailRepositoryStub);

        return {
            sut,
            getUserByEmailRepositoryStub,
        };
    };

    it('should throw UserNotFoundError if user is not found', async () => {
        //arrange
        const { sut, getUserByEmailRepositoryStub } = makeSut();
        jest.spyOn(
            getUserByEmailRepositoryStub,
            'execute',
        ).mockResolvedValueOnce(null);

        //act
        const promise = sut.execute('any_email', 'any_password');

        //assert
        expect(promise).rejects.toThrow(new UserNotFoundError());
    });
});
