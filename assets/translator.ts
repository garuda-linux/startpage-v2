import {
  type ChatSession,
  type GenerateContentCandidate,
  type GenerateContentResult,
  type GenerativeModel,
  GoogleGenerativeAI,
  type Part,
} from '@google/generative-ai';
import { readFileSync, writeFileSync } from 'node:fs';
import { extension } from 'mime-types';

// API tokens
const envFile: string = readFileSync('.env', 'utf8');
const match: RegExpMatchArray | null = envFile.match(/GEMINI_API_KEY=.*/);
if (!match) {
  console.error('GEMINI_API_KEY not found in .env');
  process.exit(1);
}
const apiKey: string = match[0].split('=')[1];

// Model settings, change depending on rate limits and model availability.
// Models: 'gemini-2.5-pro-exp-03-25', 'gemini-2.0-flash'
const genAI = new GoogleGenerativeAI(apiKey);
const model: GenerativeModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: 'text/plain',
};
const chatSession: ChatSession = model.startChat({
  generationConfig,
  history: [],
});

// Language settings. Commented out languages were reviewed and improved by
// actual humans, therefore we must not touch them with this script.
const mainLang = 'en';
const targetLangs: string[] = [
  'am',
  'ar',
  'de',
  'es',
  'eu',
  'fr',
  'gl',
  'hi',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'pl',
  'pt',
  'ru',
  'sl',
  'sv',
  'sw',
  'tr',
  'ua',
  'uz',
  'zh-CN',
];
const i18nPaths: string[] = ['public/assets/i18n'];

/**
 * Prompt the model and return the answer.
 * @param prompt The prompt to ask
 * @returns The answer of the prompt, unsanitized
 */
async function prompt(prompt: string): Promise<string> {
  const result: GenerateContentResult = await chatSession.sendMessage(prompt);
  const candidates: GenerateContentCandidate[] = result.response.candidates!;

  for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
      const part: Part = candidates[candidate_index].content.parts[part_index];
      if (part.inlineData) {
        try {
          const filename = `output_${candidate_index}_${part_index}.${extension(part.inlineData.mimeType)}`;
          writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
          console.log(`Output written to: ${filename}`);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  return result.response.text();
}

/**
 * Sanitizes the prompt reply from any Markdown noise.
 * @param output The prompt as received by the model
 * @returns Sanitized prompt reply without Markdown noise
 */
function sanitizeOutput(output: string): string {
  let result: string = output;
  if (output.startsWith('```json\n')) {
    result = result.replaceAll('```json\n', '');
  }
  if (output.endsWith('```')) {
    result = result.replaceAll('```', '');
  }

  return result;
}

async function main(): Promise<void> {
  const askFor = `
    You are the translator of an a general purpose startpage.
    As such, you will translate a JSON of key-value based english strings to other languages.
    You will leave technical terms as is, e.g. CUPS will not be translated as it is a technical term concerning printers on Linux.
    You will not remove any leading or ending whitespace characters.
    The translation should be informal, so for German "Du" would be used instead of "Sie".
    The translation should sound professional.
  `;
  console.log(`I'm prompting for:\n${askFor}\n`);
  await prompt(askFor);

  for (const i18nPath of i18nPaths) {
    console.log(`Processing path ${i18nPath}...`);
    console.log(`Reading origin file ${mainLang}...`);
    const origin: string = readFileSync(`${i18nPath}/${mainLang}.json`, 'utf8');

    for (const lang of targetLangs) {
      console.log(`Processing language ${lang}...`);
      const individualPrompt = `
        You will translate from English to ${lang}.
        Take the following JSON as source:
        ${origin}
      `;
      const result: string = await prompt(individualPrompt);

      writeFileSync(`${i18nPath}/${lang}.json`, sanitizeOutput(result));
      console.log(`Done processing language ${lang}.`);
    }

    console.log(`Done processing path ${i18nPath}.`);
  }

  console.log('Done!');
}

void main();
