import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
} from '../repositories/postgres/index.js';
import { EmailAlreadyInUseError } from '../errors/user.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        //verificar se o email já está em uso(ainda nao consigo fazer)
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();

        const userWithProviderEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userWithProviderEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        //gerar ID do usuario com UUID
        const userId = uuidv4();

        //criptografar a senha com Bcrypt
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        //inserir usuario no banco de dados
        const user = {
            ...createUserParams, //firstName, lastName, email...estão inclusos aqui
            id: userId,
            password: hashedPassword,
        };
        // chamar o repositorio
        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}
