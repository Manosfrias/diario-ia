import { EntryRepository } from '../../application/ports/EntryRepository.js';

export class InMemoryEntryRepository extends EntryRepository {
  #entriesById;

  constructor(initialEntries = []) {
    super();
    this.#entriesById = new Map(initialEntries.map((entry) => [entry.id, entry]));
  }

  async findAll() {
    return [...this.#entriesById.values()];
  }

  async save(entry) {
    this.#entriesById.set(entry.id, entry);
  }
}
