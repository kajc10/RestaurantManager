import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    connection: process.env.DATABASE_CONNECTION,
    targetVersion: parseInt(process.env.DATABASE_TARGET_VERSION),
}));
