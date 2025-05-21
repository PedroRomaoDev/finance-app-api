import { UserNotFoundError } from '../../errors/user.js';

export class LoginUserUseCase {
    constructor(getUserByEmailRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
    }
    async execute(email) {
        // verificaremos se o e-mail é válido (se há usuário com esse e-mail)
        const user = await this.getUserByEmailRepository.execute(email);
        if (!user) {
            throw new UserNotFoundError();
        }

        // verificaremos se a senha recebida é válida (se a senha está correta)

        // depois, gerar os tokens
    }
}
