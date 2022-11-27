import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from 'src/config/database/database.config';
import { Food, FoodSchema } from 'src/models/food/schema/food.schema';
import { Order, OrderSchema } from 'src/models/order/schema/order.schema';
import { Reservation, ReservationSchema } from 'src/models/reservation/schema/reservation.schema';
import { User, UserSchema } from 'src/models/user/schema/user.schema';
import { SeederService } from './seeder.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                'src/config/database/.env',
            ],
            load: [databaseConfig],
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
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Order.name, schema: OrderSchema },
            { name: Food.name, schema: FoodSchema },
            { name: Reservation.name, schema: ReservationSchema },
        ])
    ],
    providers: [SeederService]
})
export class SeederModule { }
