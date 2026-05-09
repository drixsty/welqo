import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PrismaService } from "../../common/prisma/prisma.service";

@ApiTags("Owner")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("owner")
export class OwnerController {
  constructor(private prisma: PrismaService) {}

  @Get("properties")
  @ApiOperation({ summary: "Get all properties for the logged-in owner" })
  async getProperties(@Req() req: any) {
    return this.prisma.property.findMany({
      where: { ownerId: req.user.id },
      include: {
        photos: { select: { url: true, isCover: true }, orderBy: { position: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
