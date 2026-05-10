import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from "class-validator";

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsNumber()
  PORT!: number;

  @IsString()
  DATABASE_URL!: string;

  @IsString()
  REDIS_URL!: string;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  BEDS24_API_KEY!: string;

  @IsString()
  STRIPE_SECRET_KEY!: string;

  @IsOptional()
  @IsString()
  RESEND_API_KEY?: string;

  @IsOptional()
  @IsString()
  RESEND_FROM_EMAIL?: string;

  @IsString()
  MINIO_ENDPOINT!: string;

  @IsNumber()
  @IsOptional()
  MINIO_PORT?: number;

  @IsString()
  MINIO_ROOT_USER!: string;

  @IsString()
  MINIO_ROOT_PASSWORD!: string;

  @IsString()
  @IsOptional()
  MINIO_BUCKET_DOCS?: string;

  @IsString()
  @IsOptional()
  MINIO_BUCKET_PUBLIC?: string;

  @IsString()
  @IsOptional()
  YOUSIGN_API_KEY?: string;

  @IsString()
  @IsOptional()
  YOUSIGN_BASE_URL?: string;

  @IsString()
  @IsOptional()
  YOUSIGN_WEBHOOK_SECRET?: string;
}

export function validate(config: Record<string, any>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
