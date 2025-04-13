import { PostgresCreateUserRepository } from './create-user.js';
import { user } from '../../../tests/index.js';

describe('CreateUserRepository', () => {
    it('should create a user on db', async () => {
        // arrange
        const sut = new PostgresCreateUserRepository();

        // act
        const result = await sut.execute(user);

        // assert
        expect(result).not.toBeNull();
    });
});
