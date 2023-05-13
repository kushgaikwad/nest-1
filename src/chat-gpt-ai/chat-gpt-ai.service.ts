import { Injectable, Logger } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import { getPromptforSummary, getPromptforTags } from 'src/libs/openAI/utils';
import { GetAiModelAnswer } from './model/get-ai-model-answer';

//const DEFAULT_MODEL_ID = 'gpt-3.5-turbo-0301';
const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.3;
//text-davinci-003

@Injectable()
export class ChatGptAiService {
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
    const response = {
      summary: '',
      tags: [],
    };

    try {
      const paramsForSummary: CreateCompletionRequest = {
        prompt: getPromptforSummary(input.selectedText),
        model: DEFAULT_MODEL_ID,
        temperature: DEFAULT_TEMPERATURE,
        // max_tokens: 2048,
      };

      Logger.log('Params for Sumamary: ' + paramsForSummary.prompt);

      const summaryResponse = await this.openAiApi.createCompletion(
        paramsForSummary,
      );
      const { data: summaryData } = summaryResponse;

      if (summaryData.choices.length) {
        Logger.log('summary from openaI : ' + summaryData.choices[0].text);
        response.summary = summaryData.choices[0].text;
      }

      const paramsForTags: CreateCompletionRequest = {
        prompt: getPromptforTags(input.selectedText),
        model: DEFAULT_MODEL_ID,
        temperature: DEFAULT_TEMPERATURE,
        // max_tokens: 2048,
      };

      Logger.log('Params for Tags: ' + paramsForTags.prompt);

      const tagsResponse = await this.openAiApi.createCompletion(paramsForTags);
      const { data: tagsData } = tagsResponse;
      if (tagsData.choices.length) {
        Logger.log(tagsData.choices[0].text.substring(2).split(' '));
        response.tags = tagsData.choices[0].text.substring(2).split(' ');
      }

      return response;
    } catch (error) {
      this.logger.error('Error processing user request >> ', error);
    }
  }
}
