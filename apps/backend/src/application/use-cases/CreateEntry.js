import { Entry } from '../../domain/entry/Entry.js';

export class CreateEntry {
  #entryRepository;
  #narrativeGenerator;
  #generateId;
  #now;

  constructor({ entryRepository, narrativeGenerator, generateId, now }) {
    this.#entryRepository = entryRepository;
    this.#narrativeGenerator = narrativeGenerator;
    this.#generateId = generateId;
    this.#now = now;
  }

  async execute({ date, rawText }) {
    // Validar antes de llamar a la IA evita gastar peticiones con datos inválidos
    Entry.assertValidDraft({ date, rawText });

    const narrative = await this.#narrativeGenerator.generate({ date, rawText });
    const entry = new Entry({
      id: this.#generateId(),
      date,
      rawText,
      narrative,
      createdAt: this.#now(),
    });

    await this.#entryRepository.save(entry);
    return entry;
  }
}
