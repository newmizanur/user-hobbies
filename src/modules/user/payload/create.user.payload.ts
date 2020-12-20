import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsAlphanumeric,
  Matches,
  Length
} from "class-validator";
import { Mongoose } from "mongoose";
import { Schema, Document } from "mongoose";

/**
 * Create User Payload Class
 */
export class CreateUserPayload {

  /**
   * Name field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;
}
