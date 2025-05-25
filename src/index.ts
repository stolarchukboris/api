import express, { Express } from 'express';
import { config } from 'dotenv';
import knex, { Knex } from 'knex';
import eventRoute from './routes/eventRoute.js';
import fileRoute from './routes/fileRoute.js';
import errorHandler from './middleware/errorHandler.js';

class App {
    database: Knex;
    env = config().parsed || {};
    app: Express;
    port = 3000;

    constructor() {
        console.log('Initializing the API...');

        this.app = express();

        console.log('Connecting to database...');

        this.database = knex({
            client: 'mysql2',
            connection: {
                host: this.env.DB_HOST,
                port: parseInt(this.env.DB_PORT, 10),
                user: this.env.DB_USER,
                password: this.env.DB_PASS,
                database: this.env.DB_NAME
            }
        });

        console.log('Starting the server...');

        this.app.use(express.json());
        this.app.use('/api/communityEvents', eventRoute);
        this.app.use('/cdn', fileRoute);
        this.app.use(errorHandler);
        
        this.app.listen(this.port, () => console.log(`Server running on http://localhost:${this.port}`));
    }
}

const app = new App();

export default app;
