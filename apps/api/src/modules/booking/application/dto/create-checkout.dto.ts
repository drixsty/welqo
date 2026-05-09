import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsISO8601,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCheckoutDto {
  @ApiProperty({ example: "property_id_123" })
  @IsString()
  @IsNotEmpty()
  propertyId!: string;

  @ApiProperty({ example: "John" })
  @IsString()
  @IsNotEmpty()
  guestFirstName!: string;

  @ApiProperty({ example: "Doe" })
  @IsString()
  @IsNotEmpty()
  guestLastName!: string;

  @ApiProperty({ example: "john.doe@exemple.fr" })
  @IsEmail()
  guestEmail!: string;

  @ApiProperty({ example: "+33612345678" })
  @IsString()
  guestPhone?: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  guestCount!: number;

  @ApiProperty({ example: "2024-06-01" })
  @IsISO8601()
  checkIn!: string;

  @ApiProperty({ example: "2024-06-05" })
  @IsISO8601()
  checkOut!: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @Min(1)
  nightsCount!: number;
}
