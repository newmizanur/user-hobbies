import { DefaultValuePipe } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class BasePayload {
    /**
     * Page number
     */
    @ApiPropertyOptional({
      required: false,
      
    })
    page: string;
  
    /**
     * Page size
     */
    @ApiPropertyOptional({
      required: false,
    })
    pageSize: string;
  }