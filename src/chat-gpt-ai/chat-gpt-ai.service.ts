import { Inject, Injectable, Logger } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateChatCompletionRequest } from 'openai';
import { NoteService } from '../note/note.service';
import { getPromptforSummary, getPromptforTags } from './libs/utils';
import { GetAiModelAnswer } from './model/get-ai-model-answer';

const DEFAULT_MODEL_ID = 'gpt-3.5-turbo';
const DEFAULT_TEMPERATURE = 0.3;

@Injectable()
export class ChatGptAiService {
  @Inject(NoteService)
  private readonly noteService: NoteService;

  private readonly openAiApi: OpenAIApi;
  private readonly logger: Logger = new Logger(ChatGptAiService.name);
  constructor() {
    const configuration = new Configuration({
      organization: process.env.OPENAI_ORG_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openAiApi = new OpenAIApi(configuration);
  }

  async getModelAnswer(input: GetAiModelAnswer) {
    const noteRequest = {
      selectedText: input.selectedText,
      summary: '',
      hashtags: [],
    };

    try {
      const paramsForSummary: CreateChatCompletionRequest = {
        model: DEFAULT_MODEL_ID,
        messages: [
          {
            role: 'user',
            content: getPromptforSummary(input.selectedText),
          },
        ],
        temperature: DEFAULT_TEMPERATURE,
      };

      this.logger.log(
        'Params for Sumamary: ' + paramsForSummary.messages[0].content,
      );
      const responseSummary = await this.openAiApi.createChatCompletion(
        paramsForSummary,
      );

      if (responseSummary.data?.choices?.length) {
        this.logger.log(
          'summary from openaI : ' +
            responseSummary.data.choices[0].message.content,
        );
        noteRequest.summary = responseSummary.data.choices[0].message.content;
      }

      const paramsForHashtags: CreateChatCompletionRequest = {
        model: DEFAULT_MODEL_ID,
        messages: [
          {
            role: 'user',
            content: getPromptforTags(input.selectedText),
          },
        ],
        temperature: DEFAULT_TEMPERATURE,
      };

      this.logger.log(
        'Params for Hashtags: ' + paramsForHashtags.messages[0].content,
      );
      const responseTags = await this.openAiApi.createChatCompletion(
        paramsForHashtags,
      );

      if (responseTags.data?.choices?.length) {
        this.logger.log(
          'hashtags from openaI : ' +
            responseTags.data.choices[0].message.content,
        );

        noteRequest.hashtags =
          responseTags.data.choices[0].message.content.split(' ');
      }

      this.logger.log('Sending to NoteService: ' + noteRequest);
      const noteSaved = await this.noteService.create(noteRequest);
      this.logger.log('Note persisted to Note Service: ' + noteSaved);

      return noteSaved;
    } catch (error) {
      this.logger.error('Error processing user request >> ', error);
    }
  }
}
