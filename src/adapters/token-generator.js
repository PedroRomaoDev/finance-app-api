import jwt from 'jsonwebtoken';

export class TokenGeneratorAdapter {
    execute(userId) {
        return {
            accessToken: jwt.sign(
                { userId },
                // eslint-disable-next-line no-undef
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' },
            ),
            refreshToken: jwt.sign(
                { userId },
                // eslint-disable-next-line no-undef
                process.env.JWT_REFRESH_TOKEN_SECRET,
                { expiresIn: '30d' },
            ),
        };
    }
}
