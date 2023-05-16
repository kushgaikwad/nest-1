import { Module } from '@nestjs/common';
import { NoteModule } from '../note/note.module';
import { ChatGptAiController } from './chat-gpt-ai.controller';
import { ChatGptAiService } from './chat-gpt-ai.service';

@Module({
  imports: [NoteModule],
  controllers: [ChatGptAiController],
  providers: [ChatGptAiService],
})
export class ChatGptAiModule {}
