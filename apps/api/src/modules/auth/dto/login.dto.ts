import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "owner@welqo.fr" })
  @IsEmail({}, { message: "Email invalide" })
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: "password123" })
  @IsNotEmpty()
  @MinLength(8, { message: "Le mot de passe doit faire au moins 8 caractères" })
  password!: string;
}
