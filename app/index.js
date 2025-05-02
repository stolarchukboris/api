import express from 'express';
import { config } from 'dotenv';
import knex from 'knex';
import eventRouter from './routes/communityEvents.js';

config();

const app = express();
const port = 3000;

app.knex = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
});

app.use(express.json());

app.use('/api/communityEvents', eventRouter);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

export default app;
