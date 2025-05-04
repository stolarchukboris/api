import express, { Express } from 'express';
import { config } from 'dotenv';
import knex, { Knex } from 'knex';
import eventRouter from './routes/communityEvents.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class App {
    database: Knex;
    env = config().parsed || {};
    app: Express;
    port = 3000;
    swaggerDocs: object;

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

        this.swaggerDocs = swaggerJSDoc({
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'My API',
                    version: '1.0.0',
                    description: 'API documentation using Swagger',
                },
                servers: [
                    {
                        url: `http://localhost:${this.port}`,
                    },
                ]
            },
            apis: ['./routes/*.js'], // Path to your API docs
        });

        this.app.use(express.json());
        this.app.use('/api', eventRouter);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocs));

        this.app.listen(this.port, () => console.log(`Server running on http://localhost:${this.port}`));
    }
}

const app = new App();

export default app;
