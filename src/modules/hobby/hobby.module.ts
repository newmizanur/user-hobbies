import { Module } from "@nestjs/common";
import { HobbyService } from "./hobby.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Hobby } from "./hobby.model";
import { HobbyController } from "./hobby.controller";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Hobby", schema: Hobby }]), UserModule],
  providers: [HobbyService],
  exports: [HobbyService],
  controllers: [HobbyController],
})
export class HobbyModule {}
