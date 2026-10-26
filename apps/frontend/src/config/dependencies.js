import { createEntryUseCases } from '../application/entryUseCases.js';
import { HttpEntryRepository } from '../infrastructure/api/HttpEntryRepository.js';
import { WebSpeechRecognizer } from '../infrastructure/speech/WebSpeechRecognizer.js';

export function createDependencies() {
  const entryRepository = new HttpEntryRepository({ baseUrl: '/api' });

  return {
    ...createEntryUseCases({ entryRepository }),
    speechRecognizer: new WebSpeechRecognizer({ lang: 'es-ES' }),
  };
}
