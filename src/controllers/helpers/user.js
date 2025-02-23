import { badRequest } from './http.js';
import validator from 'validator';

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    });

export const emailIsAlreadyInUseResponse = () =>
    badRequest({
        message: 'Invalid email. Please provide a valid one',
    });

export const invalidIdResponse = () =>
    badRequest({
        message: 'Some provided field is not allowed.',
    });

export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfIdIsValid = (id) => validator.isUUID(id);
