import express from 'express';
import knex from 'knex';
import { config } from 'dotenv';

config();

const app = express();
const PORT = 3000;
const Knex = knex({
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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.get('/api/events', async (req, res) => {
    const settings = await Knex('communityEvents')
        .select('*');

    return res.json(settings);
});
