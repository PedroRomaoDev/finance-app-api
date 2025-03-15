import {
    CreateTransactionController,
    GetTransactionsByUserIdController,
} from '../../controllers/index.js';
import {
    PostgresGetUserByIdRepository,
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByUserIdRepository,
} from '../../repositories/postgres/index.js';
import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
} from '../../use-cases/index.js';

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository();

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );
    return createTransactionController;
};

export const makeGetTransactionsByUserIdController = () => {
    const getTransactionsByUserIdRepository =
        new PostgresGetTransactionByUserIdRepository();

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        getTransactionsByUserIdRepository,
        getUserByIdRepository,
    );

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);

    return getTransactionsByUserIdController;
};
