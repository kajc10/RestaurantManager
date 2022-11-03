import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import databaseConfig from './config/database/database.config';
import serverConfig from './config/server/server.config';
import path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: [
        'src/config/server/.env',
        'src/config/database/.env'
      ],
      load: [serverConfig, databaseConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
          dbConfig: ConfigType<typeof databaseConfig>,
      ) => ({
          uri: dbConfig.connection,
      }),
      inject: [databaseConfig.KEY],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
