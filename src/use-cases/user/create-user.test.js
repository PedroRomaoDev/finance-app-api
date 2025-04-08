import { faker } from '@faker-js/faker';
import { CreateUserUseCase } from './create-user';

describe('CreateUserUseCase', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return null;
        }
    }

    class CreateUserRepositoryStub {
        async execute(user) {
            return user;
        }
    }

    class HasherAdapterStub {
        async execute() {
            return 'hashed_password';
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'generated_id';
        }
    }

    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
        const createUserRepository = new CreateUserRepositoryStub();
        const hasherAdapter = new HasherAdapterStub();
        const idGeneratorAdapter = new IdGeneratorAdapterStub();

        const sut = new CreateUserUseCase(
            getUserByEmailRepository,
            createUserRepository,
            hasherAdapter,
            idGeneratorAdapter,
        );

        return {
            sut,
            getUserByEmailRepository,
            createUserRepository,
            hasherAdapter,
            idGeneratorAdapter,
        };
    };

    it('should succesfully create a user', async () => {
        // arrange
        const { sut } = makeSut();

        // act
        const createdUser = await sut.execute({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        });

        // assert
        expect(createdUser).toBeTruthy();
    });
});
