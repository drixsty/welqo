import { Module } from "@nestjs/common";
import { StatsService } from "./application/stats.service";
import { StatsController } from "./infrastructure/controllers/stats.controller";
import { PrismaModule } from "../../common/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
