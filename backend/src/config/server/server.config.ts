import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
    globalPrefix: process.env.SERVER_API_PREFIX,
    port: parseInt(process.env.SERVER_PORT),
    enableSwagger: process.env.SERVER_ENABLE_SWAGGER === 'true',
    enableDevCORS: process.env.SERVER_ENABLE_DEV_CORS === 'true',
}));
