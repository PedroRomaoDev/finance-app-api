import { UserNotFoundError } from '../../errors/user';
import { v4 as uuidv4 } from 'uuid';

export class CreateTransacitonUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(createTransactionParams) {
        // validar se o usuario existe
        const userId = createTransactionParams.execute(userId);

        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError(userId);
        }

        //criar ID da transaction
        const transactionId = uuidv4();

        // criar transação
        const transaction = await this.createTransactionRepository.execute({
            ...createTransactionParams,
            id: transactionId,
        });
        return transaction;
    }
}
