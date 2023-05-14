import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGptAiModule } from './chat-gpt-ai/chat-gpt-ai.module';
import { ConfigModule } from '@nestjs/config';
import { NoteModule } from './note/note.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ChatGptAiModule,
    ConfigModule.forRoot(),
    NoteModule,
    MongooseModule.forRoot(process.env.DB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
