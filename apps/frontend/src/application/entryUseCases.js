/**
 * @typedef {{ id: string, date: string, rawText: string, narrative: string, createdAt: string }} Entry
 * @typedef {{ findAll(): Promise<Entry[]>, create(draft: { date: string, rawText: string }): Promise<Entry> }} EntryRepository
 */

/** @param {{ entryRepository: EntryRepository }} deps */
export function createEntryUseCases({ entryRepository }) {
  return {
    listEntries: () => entryRepository.findAll(),

    createEntry: async ({ date, rawText }) => {
      const text = rawText.trim();
      if (!text) throw new Error('Cuenta algo antes de guardar la entrada');
      return entryRepository.create({ date, rawText: text });
    },
  };
}
