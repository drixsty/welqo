import { Module } from "@nestjs/common";
import { OwnerController } from "./owner.controller";
import { PrismaModule } from "../../common/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [OwnerController],
})
export class OwnerModule {}
