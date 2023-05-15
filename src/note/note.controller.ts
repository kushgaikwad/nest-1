import { Controller, Get } from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from './schemas/note.schema';

@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  async getAllNotes(): Promise<Note[]> {
    return this.noteService.findAll();
  }
}
