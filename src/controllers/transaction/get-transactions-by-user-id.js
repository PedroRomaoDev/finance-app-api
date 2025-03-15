import { UserNotFoundError } from '../../errors/user.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
} from '../helpers/validation.js';
import { serverError, userNotFoundResponse, ok } from '../index.js';

export class GetTransactionsByUserId {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;
            //verificar se o userid foi passado como parametro
            if (!userId) {
                return requiredFieldIsMissingResponse('userId');
            }

            //veriricar se o userId é um ID válido
            const userIdIsValid = checkIfIdIsValid(userId);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            //chamar o useCase
            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                });

            //retornar resposta http
            return ok(transactions);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            console.error(error);
            return serverError();
        }
    }
}
