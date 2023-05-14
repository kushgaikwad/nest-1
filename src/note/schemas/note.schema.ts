import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Note {
  @Prop()
  selectedText: string;

  @Prop()
  summary: string;

  @Prop([String])
  hashtags: string[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
