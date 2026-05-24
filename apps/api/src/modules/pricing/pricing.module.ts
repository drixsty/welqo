import { Global, Module, OnModuleInit } from "@nestjs/common";
import { PricingService } from "./pricing.service";

@Global()
@Module({
  providers: [PricingService],
  exports: [PricingService],
})
export class PricingModule implements OnModuleInit {
  constructor(private pricingService: PricingService) {}

  async onModuleInit() {
    await this.pricingService.seedDemoEvents();
  }
}
