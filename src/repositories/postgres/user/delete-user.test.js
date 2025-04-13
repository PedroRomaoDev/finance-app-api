import { PostgresDeleteUserRepository } from './delete-user.js';
import { user } from '../../../tests/index.js';
import { prisma } from '../../../../prisma/prisma.js';

describe('PostgresDeleteUserRepository', () => {
    it('should delete a user from db', async () => {
        // arrange
        await prisma.user.create({ data: user });
        const sut = new PostgresDeleteUserRepository();

        // act
        const result = await sut.execute(user.id);

        // assert
        expect(result).toStrictEqual(user);
    });
});
