import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Note } from './schemas/note.schema';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: mongoose.Model<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    const notes = await this.noteModel.find();
    return notes;
  }

  async create(note: Note): Promise<Note> {
    const res = await this.noteModel.create(note);
    return res;
  }
}
