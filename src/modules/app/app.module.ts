import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { MongooseModule, MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { HobbyModule } from "../hobby/hobby.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          uri: configService.get("DB_URL"),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as MongooseModuleAsyncOptions),
    }),
    ConfigModule,
    HobbyModule,
    UserModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
