import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../common/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateOwner(email: string, pass: string): Promise<any> {
    const owner = await this.prisma.owner.findUnique({
      where: { email },
    });

    if (owner && (await bcrypt.compare(pass, owner.passwordHash))) {
      const result = { ...owner };
      delete (result as any).passwordHash;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const owner = await this.validateOwner(loginDto.email, loginDto.password);
    if (!owner) {
      throw new UnauthorizedException("Identifiants incorrects");
    }

    const payload = { email: owner.email, sub: owner.id, role: owner.role };

    // In a real app, we would also manage refresh tokens here
    // For MVP, we'll return a simple access token
    return {
      accessToken: this.jwtService.sign(payload),
      owner: {
        id: owner.id,
        email: owner.email,
        firstName: owner.firstName,
        lastName: owner.lastName,
        role: owner.role,
      },
    };
  }

  async validateOwnerById(id: string) {
    return this.prisma.owner.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
  }
}
