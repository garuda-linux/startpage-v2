import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {
  production: false,
  availableLanguages: ['de', 'en', 'es', 'fr', 'hi', 'id', 'it', 'ja', 'ko', 'pl', 'pt', 'ru', 'sl', 'zh-CN'],
  defaultLanguage: 'en',
  forumUrl: 'http://localhost:4200/proxy-forum',
};
