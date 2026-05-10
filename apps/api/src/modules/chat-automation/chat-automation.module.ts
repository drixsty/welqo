import { Module } from '@nestjs/common';
import { ChatAutomationService } from './chat-automation.service';
import { ChatAutomationController } from './chat-automation.controller';

@Module({
  providers: [ChatAutomationService],
  controllers: [ChatAutomationController],
  exports: [ChatAutomationService],
})
export class ChatAutomationModule {}
