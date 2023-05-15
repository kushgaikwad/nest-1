import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Note } from './schemas/note.schema';

@Injectable()
export class NoteService {
  private readonly logger: Logger = new Logger(NoteService.name);
  constructor(
    @InjectModel(Note.name)
    private noteModel: mongoose.Model<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    this.logger.log('Fetching all notes..');
    const notes = await this.noteModel.find();
    this.logger.log('Fetched all notes' + notes);
    return notes;
  }

  async create(note: Note): Promise<Note> {
    this.logger.log('Creating Note: ' + note);
    const res = await this.noteModel.create(note);
    this.logger.log('Created note: ' + res);
    return res;
  }
}
