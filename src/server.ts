
import 'dotenv/config';
import { app } from './app.js';
import {
    connectDatabase,
    disconnectDatabase
} from './config/database.js';
import { loadEnvironment } from './config/env.js';

const startServer = async (): Promise<void> => {
    try {
        const env = loadEnvironment();

        await connectDatabase({
            uri: env.mongodbUri,
            dbName: env.mongodbDbName
        });

        const server = app.listen(env.port, () => {
            console.log(`API disponible en http://localhost:${env.port}`);
        });

        let shuttingDown = false;

        const shutdown = async (): Promise<void> => {
            if (shuttingDown) {
                return;
            }

            shuttingDown = true;

            server.close(async () => {
                await disconnectDatabase();
                process.exit(0);
            });
        };

        process.on('SIGINT', () => {
            void shutdown();
        });

        process.on('SIGTERM', () => {
            void shutdown();
        });
    } catch {
        console.error(
            'No fue posible iniciar la API. Revise MONGODB_URI, ' +
            'el usuario y la lista de acceso de red.'
        );
        process.exitCode = 1;
    }
};

void startServer();
