import { Module } from "@nestjs/common";
import { SyncService } from "./sync.service";
import { PrismaModule } from "../../common/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SyncService],
})
export class SyncModule {}
