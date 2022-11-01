import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import serverConfig from './config/server/server.config';
import { ConfigType } from '@nestjs/config';

export function createSwaggerConfig() {
    return new DocumentBuilder()
        .setTitle('RestaurantManager Api')
        .setDescription('RestaurantManager Api description...')
        .setVersion('0.0.1')
        .addTag('auth')
        .build();
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService>(ConfigService);
    const serverConfiguration: ConfigType<typeof serverConfig> = configService.get('server');
    app.setGlobalPrefix(serverConfiguration.globalPrefix);

    if (serverConfiguration.enableSwagger) {
        const swaggerConfig = createSwaggerConfig();
        const document = SwaggerModule.createDocument(app, swaggerConfig);
        SwaggerModule.setup('swagger', app, document);
   }

    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
    await app.listen(serverConfiguration.port);
}
bootstrap();
