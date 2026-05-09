import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CancelBookingDto {
  @ApiProperty({ example: "clxxxxxxxxxxxxx" })
  @IsString()
  @IsNotEmpty()
  cancellationToken!: string;
}
