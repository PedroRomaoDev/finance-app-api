import 'dotenv/config.js';
import express from 'express';
import { usersRouter, transactionsRouter } from './src/routes/index.js';

export const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () =>
    // eslint-disable-next-line no-undef
    console.log(`listening on port ${process.env.PORT}`),
);
