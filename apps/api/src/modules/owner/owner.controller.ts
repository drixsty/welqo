import { Controller, Get, Post, UseGuards, Req } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PrismaService } from "../../common/prisma/prisma.service";
import { OwnerService } from "./owner.service";

@ApiTags("Owner")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("owner")
export class OwnerController {
  constructor(
    private prisma: PrismaService,
    private ownerService: OwnerService,
  ) {}

  @Get("properties")
  @ApiOperation({ summary: "Get all properties for the logged-in owner" })
  async getProperties(@Req() req: any) {
    return this.prisma.property.findMany({
      where: { ownerId: req.user.id },
      include: {
        photos: {
          select: { url: true, isCover: true },
          orderBy: { position: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  @Get("mandates")
  @ApiOperation({ summary: "Get all mandates for the logged-in owner" })
  async getMandates(@Req() req: any) {
    return this.ownerService.getMandates(req.user.id);
  }

  @Post("mandates/initiate")
  @ApiOperation({ summary: "Initiate a new management mandate signature" })
  async initiateMandate(@Req() req: any) {
    return this.ownerService.initiateMandate(req.user.id);
  }
}
