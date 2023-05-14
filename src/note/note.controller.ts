import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NoteService } from './note.service';
import { Note } from './schemas/note.schema';

@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  async getAllNotes(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  //   @Post()
  //   async createNote(
  //     @Body()
  //     note: CreateNoteDto,
  //   ): Promise<Note> {
  //     return this.noteService.create(note);
  //   }
}
