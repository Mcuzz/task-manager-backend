import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { env } from '../config/env.js';
import { isUserRole } from '../models/user.js';
import { setUserRoleByEmail } from '../repositories/user.repository.js';

const main = async (): Promise<void> => {
    const [, , rawEmail, rawRole] = process.argv;

    if (!rawEmail || !rawRole || !isUserRole(rawRole)) {
        throw new Error(
            'Uso: pnpm role:set <correo> <user|admin>'
        );
    }

    const email = rawEmail.trim().toLowerCase();

    await connectDatabase({
        uri: env.MONGODB_URI,
        dbName: env.MONGODB_DB_NAME
    });

    const user = await setUserRoleByEmail(email, rawRole);

    if (!user) {
        throw new Error(`No existe un usuario con el correo ${email}.`);
    }

    console.log('Rol actualizado correctamente.');
    console.log(`Correo: ${user.email}`);
    console.log(`Rol: ${user.role}`);
};

try {
    await main();
} catch (error: unknown) {
    console.error(
        error instanceof Error ? error.message : 'Error al actualizar el rol.'
    );
    process.exitCode = 1;
} finally {
    await disconnectDatabase();
}
