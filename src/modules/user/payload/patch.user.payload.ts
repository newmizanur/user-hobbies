import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsAlphanumeric,
  Matches,
  Length,
} from "class-validator";

/**
 * Patch User Payload Class
 */
export class PatchUserPayload {

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  id: string;

  /**
   * Name field
   */
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
