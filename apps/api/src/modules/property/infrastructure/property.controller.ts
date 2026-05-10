import { Controller, Get, Query, Param, NotFoundException } from "@nestjs/common";
import { PropertyService } from "../application/property.service";
import { PropertySearchFilters } from "@welqo/types";

@Controller("properties")
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async findAll(@Query() filters: PropertySearchFilters) {
    return this.propertyService.findAll(filters);
  }

  @Get(":slug")
  async findOne(@Param("slug") slug: string) {
    const property = await this.propertyService.findBySlug(slug);
    if (!property) {
      throw new NotFoundException(`Property with slug ${slug} not found`);
    }
    return property;
  }
}
