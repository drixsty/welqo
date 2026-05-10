import { Module } from "@nestjs/common";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./common/prisma/prisma.module";
import { BookingModule } from "./modules/booking/booking.module";
import { EmailModule } from "./modules/email/email.module";
import { StatsModule } from "./modules/stats/stats.module";
import { OwnerModule } from "./modules/owner/owner.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { PropertyModule } from "./modules/property/property.module";
import { SyncModule } from "./modules/sync/sync.module";
import { AuthModule } from "./modules/auth/auth.module";
import { StorageModule } from "./modules/storage/storage.module";
import { SignatureModule } from "./modules/signature/signature.module";
import { validate } from "./config/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), ".env"),
        join(process.cwd(), "../../.env"),
      ],
      validate,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    BookingModule,
    EmailModule,
    StatsModule,
    OwnerModule,
    PaymentModule,
    PropertyModule,
    SyncModule,
    AuthModule,
    StorageModule,
    SignatureModule,
  ],
})
export class AppModule {}
