import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  readonly selectedText: string;

  @IsString()
  @IsNotEmpty()
  readonly summary: string;

  readonly hashtags: string[];
}
