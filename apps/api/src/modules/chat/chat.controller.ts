import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('conversations')
  @ApiOperation({ summary: 'Get all conversations for the logged-in owner' })
  async getConversations(@Req() req: any) {
    return this.chatService.getConversations(req.user.id);
  }

  @Get('conversations/:id/messages')
  @ApiOperation({ summary: 'Get messages for a specific conversation' })
  async getMessages(@Param('id') id: string) {
    return this.chatService.getMessages(id);
  }
}
