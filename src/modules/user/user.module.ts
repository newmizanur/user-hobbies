import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { User } from "./user.model";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: User }])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
