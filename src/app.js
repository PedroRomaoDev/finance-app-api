import express from 'express';
import { usersRouter, transactionsRouter } from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

//ambiente ES Modules - path para determinar o __dirname
const __dirname = path.resolve(); //vai funcionar sem importar diretamente `import.meta.url`

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, './docs/swagger.json'), 'utf8'),
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
