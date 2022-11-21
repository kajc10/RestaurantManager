import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import databaseConfig from './config/database/database.config';
import serverConfig from './config/server/server.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './models/user/user.module';
import { FoodModule } from './models/food/food.module';
import { OrderModule } from './models/order/order.module';
import { ReservationModule } from './models/reservation/reservation.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import authConfig from './config/auth/auth.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: [
        'src/config/server/.env',
        'src/config/database/.env',
        'src/config/auth/.env',
      ],
      load: [serverConfig, databaseConfig, authConfig],
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
    FoodModule,
    OrderModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})
export class AppModule {}
