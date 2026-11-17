
import 'dotenv/config';

const requireValue = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Falta la variable de entorno ${name}.`);
  return value;
};

const parsePort = (value: string | undefined): number => {
  const port = Number(value ?? '3000');

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT debe ser un número entero entre 1 y 65535.');
  }

  return port;
};

const parsePositiveInteger = (
  name: string,
  defaultValue: number
): number => {
  const value = process.env[name]?.trim();
  const parsed = Number(value || defaultValue);

  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    throw new Error(`${name} debe ser un número entero positivo.`);
  }

  return parsed;
};

const parseJwtSecret = (): string => {
  const secret = requireValue('JWT_SECRET');

  if (Buffer.byteLength(secret, 'utf8') < 32) {
    throw new Error('JWT_SECRET debe contener al menos 32 bytes.');
  }

  return secret;
};

const parseExpiration = (): string => {
  const value = process.env.JWT_EXPIRES_IN?.trim() || '1h';

  if (!/^\d+[smhd]$/.test(value)) {
    throw new Error('JWT_EXPIRES_IN debe usar un formato como 15m, 1h o 7d.');
  }

  return value;
};

const parseCorsOrigin = (): string => {
  const value = process.env.CORS_ORIGIN?.trim() || 'http://localhost:5173';

  try {
    const url = new URL(value);

    if (
      !['http:', 'https:'].includes(url.protocol) ||
      url.origin !== value.replace(/\/$/, '')
    ) {
      throw new Error();
    }

    return url.origin;
  } catch {
    throw new Error('CORS_ORIGIN debe ser una URL válida con protocolo HTTP o HTTPS.');
  }
};

export const env = Object.freeze({
  PORT: parsePort(process.env.PORT),
  MONGODB_URI: requireValue('MONGODB_URI'),
  MONGODB_DB_NAME: requireValue('MONGODB_DB_NAME'),
  JWT_SECRET: parseJwtSecret(),
  JWT_EXPIRES_IN: parseExpiration(),
  JWT_ISSUER: process.env.JWT_ISSUER?.trim() || 'task-api-express',
  JWT_AUDIENCE: process.env.JWT_AUDIENCE?.trim() || 'task-api-client',

  CORS_ORIGIN: parseCorsOrigin(),
  AUTH_RATE_LIMIT_WINDOW_MS: parsePositiveInteger(
    'AUTH_RATE_LIMIT_WINDOW_MS',
    15 * 60 * 1000
  ),
  AUTH_RATE_LIMIT_MAX: parsePositiveInteger(
    'AUTH_RATE_LIMIT_MAX',
    10
  )
});
