import { PostgresCreateUserRepository } from './create-user.js';
import { user } from '../../../tests/index.js';
import { prisma } from '../../../../prisma/prisma.js';

describe('PostgresCreateUserRepository', () => {
    it('should create a user on db', async () => {
        // arrange
        const sut = new PostgresCreateUserRepository();

        // act
        const result = await sut.execute(user);

        // assert
        expect(result.id).toBe(user.id);
        expect(result.first_name).toBe(user.first_name);
        expect(result.last_name).toBe(user.last_name);
        expect(result.email).toBe(user.email);
        expect(result.password).toBe(user.password);
    });

    it('should call Prisma with correct params', async () => {
        // arrange
        const prismaSpy = jest.spyOn(prisma.user, 'create');
        const sut = new PostgresCreateUserRepository();

        // act
        await sut.execute(user);

        // assert
        expect(prismaSpy).toHaveBeenCalledWith({
            data: user,
        });
    });
});
