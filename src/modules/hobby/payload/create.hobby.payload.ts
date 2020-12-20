import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsAlphanumeric,
  Length
} from "class-validator";

/**
 * Create Hobby Payload Class
 */
export class CreateHobbyPayload {

  /**
   * Passion Level field
   */
  @ApiProperty({
    required: true,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  passionLevel: string;

  /**
   * Name field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  /**
   * Year field
   */
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Length(4)
  year: string;


  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @Length(24)
  userId: string;
}
