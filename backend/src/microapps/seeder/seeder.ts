import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./seeder.module";
import { SeederService } from "./seeder.service";

async function bootstrap() {
    const app = await NestFactory.create(SeederModule);

    const seederService = app.get<SeederService>(SeederService);
    await seederService.seed();

    await app.close();
    process.exit();
}
bootstrap();