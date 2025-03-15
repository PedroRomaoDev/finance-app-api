import {
    serverError,
    badRequest,
    created,
    validateRequiredFields,
} from '../helpers/index.js';
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/index.js';
import validator from 'validator';

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            // verificar campos obrigatorios
            const requiredFields = [
                'user_id',
                'name',
                'date',
                'amount',
                'type',
            ];

            const { ok: requiredFieldsWereProvided, missingField } =
                validateRequiredFields(params, requiredFields);

            if (!requiredFieldsWereProvided) {
                return badRequest({
                    message: `The field ${missingField} is required.`,
                });
            }

            //verificar se o userId é válido
            const userIdIsValid = checkIfIdIsValid(params.user_id);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            // verificar se o amount é maior que 0 e se tem duas casas decimais
            if (params.amount <= 0) {
                return badRequest({
                    message: 'Amount must be greater than 0',
                });
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false, //nao permitir numeros negativos
                    decimal_separator: '.',
                },
            );

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency.',
                });
            }

            // verificar se o type é valido
            const type = params.type.trim().toUpperCase(); //tira os espaços e coloca tudo inserido em maiusculo

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            );

            if (!typeIsValid) {
                return badRequest({
                    message:
                        'Invalid type. Type must be EARNING, EXPENSE or INVESTMENT',
                });
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });

            return created(transaction);
        } catch (error) {
            console.error(error);
            return serverError(); //retorna um erro 500
        }
    }
}
