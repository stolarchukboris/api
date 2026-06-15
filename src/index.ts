import express, { type Express } from 'express';
import knex, { Knex } from 'knex';
import eventRoute from './routes/eventRoute.ts';
import fileRoute from './routes/fileRoute.ts';
import errorHandler from './middleware/errorHandler.ts';

class App {
    database: Knex;
    app: Express;
    port = 3000;

    constructor() {
        console.log('Initializing the API...');

        this.app = express();

        console.log('Connecting to database...');

        this.database = knex({
            client: 'mysql2',
            connection: {
                host: Bun.env.DB_HOST,
				port: parseInt(Bun.env.DB_PORT as string, 10),
				user: Bun.env.DB_USER,
				password: Bun.env.DB_PASS,
				database: Bun.env.DB_NAME
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
