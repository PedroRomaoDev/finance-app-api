import {
    PostgresGetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserBalanceRepository,
} from '../../repositories/postgres/index.js';
import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserBalanceUseCase,
    LoginUserUseCase,
    RefreshTokenUseCase,
} from '../../use-cases/index.js';
import {
    GetUserByIdController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
    GetUserBalanceController,
    LoginUserController,
    RefreshTokenController,
} from '../../controllers/index.js';
import {
    IdGeneratorAdapter,
    PasswordComparatorAdapter,
    PasswordHasherAdapter,
    TokenGeneratorAdapter,
    TokenVerifierAdapter,
} from '../../adapters/index.js';

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    return getUserByIdController;
};

export const makeCreateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const createUserRepository = new PostgresCreateUserRepository();

    const passwordHasherAdapter = new PasswordHasherAdapter();

    const idGeneratorAdapter = new IdGeneratorAdapter();

    const tokensGeneratorAdapter = new TokenGeneratorAdapter();

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
        passwordHasherAdapter,
        idGeneratorAdapter,
        tokensGeneratorAdapter,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeUpdateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const updateUserRepository = new PostgresUpdateUserRepository();

    const passwordHasherAdapter = new PasswordHasherAdapter();

    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        updateUserRepository,
        passwordHasherAdapter,
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);

    return updateUserController;
};

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository();

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    return deleteUserController;
};

export const makeGetUserBalanceController = () => {
    const getUserBalanceRepository = new PostgresGetUserBalanceRepository();
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserBalanceRepository,
        getUserByIdRepository,
    );
    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    );

    return getUserBalanceController;
};

export const makeLoginUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const passwordComparatorAdapter = new PasswordComparatorAdapter();
    const tokenGeneratorAdapter = new TokenGeneratorAdapter();

    const loginUserUseCase = new LoginUserUseCase(
        getUserByEmailRepository,
        passwordComparatorAdapter,
        tokenGeneratorAdapter,
    );

    const loginUserController = new LoginUserController(loginUserUseCase);

    return loginUserController;
};

export const makeRefreshTokenController = () => {
    const tokenGeneratorAdapter = new TokenGeneratorAdapter();
    const tokenVerifierAdapter = new TokenVerifierAdapter();
    const refreshTokenUseCase = new RefreshTokenUseCase(
        tokenGeneratorAdapter,
        tokenVerifierAdapter,
    );

    const refreshTokenController = new RefreshTokenController(
        refreshTokenUseCase,
    );
    return refreshTokenController;
};
