import validator from 'validator';
import { badRequest } from './http.js';
import { notFound } from './http.js';

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    });

export const emailIsAlreadyInUseResponse = () =>
    badRequest({
        message: 'Invalid e-mail. Please provide a valid one.',
    });

export const userNotFoundResponse = () =>
    notFound({
        message: 'User not found.',
    });

export const checkIfPasswordIsValid = (password) => password.length >= 6;

// export const checkIfEmailIsValid = (email) => validator.isEmail(email)
export const checkIfEmailIsValid = (email) => {
    console.log('📩 Verificando email:', email, '| Tipo:', typeof email);

    // Se o email for undefined ou null, define como string vazia
    return validator.isEmail(String(email || '').trim());
};
