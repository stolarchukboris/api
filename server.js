import app from './app/index.js';
import { config } from 'dotenv';
import knex from 'knex';

config();

const port = 3000;
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

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

app.get('/api/events', async (req, res) => {
    const events = await Knex('communityEvents')
        .select('*');

    if (!events) return res.status(404).json({ error: 'Not found.' });

    return res.status(200).json(events);
});
