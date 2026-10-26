import { describe, expect, it } from 'vitest';
import { ListEntries } from '../../../src/application/use-cases/ListEntries.js';
import { InMemoryEntryRepository } from '../../../src/infrastructure/persistence/InMemoryEntryRepository.js';
import { buildEntry } from '../../helpers/entryMother.js';

describe('ListEntries', () => {
  it('devuelve las entradas de la más reciente a la más antigua', async () => {
    const entryRepository = new InMemoryEntryRepository([
      buildEntry({ id: 'old', date: '2026-10-01' }),
      buildEntry({ id: 'new', date: '2026-10-22' }),
      buildEntry({ id: 'mid', date: '2026-10-10' }),
    ]);
    const listEntries = new ListEntries({ entryRepository });

    const entries = await listEntries.execute();

    expect(entries.map((entry) => entry.id)).toEqual(['new', 'mid', 'old']);
  });

  it('devuelve una lista vacía si no hay entradas', async () => {
    const listEntries = new ListEntries({ entryRepository: new InMemoryEntryRepository() });

    expect(await listEntries.execute()).toEqual([]);
  });
});
