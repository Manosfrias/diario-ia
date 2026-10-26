import { Entry } from '../../domain/entry/Entry.js';

export class ListEntries {
  #entryRepository;

  constructor({ entryRepository }) {
    this.#entryRepository = entryRepository;
  }

  async execute() {
    const entries = await this.#entryRepository.findAll();
    return [...entries].sort(Entry.compareByMostRecent);
  }
}
