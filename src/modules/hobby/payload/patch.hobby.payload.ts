import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsAlphanumeric,
  Matches,
  Length,
} from "class-validator";

/**
 * Patch Hobby Payload Class
 */
export class PatchHobbyPayload {

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  // @Length(24)
  id: string;

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
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  /**
   * Year field
   */
  @ApiProperty()
  @IsNotEmpty()
  @Length(4)
  year: string;
}
