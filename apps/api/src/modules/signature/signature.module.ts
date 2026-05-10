import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageModule } from '../storage/storage.module';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { SignatureService } from './signature.service';
import { SignatureController } from './signature.controller';

@Global()
@Module({
  imports: [ConfigModule, StorageModule, PrismaModule],
  controllers: [SignatureController],
  providers: [SignatureService],
  exports: [SignatureService],
})
export class SignatureModule {}
