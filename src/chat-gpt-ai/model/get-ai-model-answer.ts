//Request object for the API

import { IsNotEmpty, IsString } from 'class-validator';

export class GetAiModelAnswer {
  @IsString()
  @IsNotEmpty()
  selectedText: string;
}
