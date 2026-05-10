import { Module } from "@nestjs/common";
import { PropertyController } from "./infrastructure/property.controller";
import { PropertyService } from "./application/property.service";

@Module({
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
