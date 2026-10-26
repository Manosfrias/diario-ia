import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateEntry } from '../../../src/application/use-cases/CreateEntry.js';
import { ValidationError } from '../../../src/domain/errors/ValidationError.js';
import { InMemoryEntryRepository } from '../../../src/infrastructure/persistence/InMemoryEntryRepository.js';

describe('CreateEntry', () => {
  const now = new Date('2026-10-23T21:00:00.000Z');
  let entryRepository;
  let narrativeGenerator;
  let createEntry;

  beforeEach(() => {
    entryRepository = new InMemoryEntryRepository();
    narrativeGenerator = { generate: vi.fn().mockResolvedValue('Un relato bonito.') };
    createEntry = new CreateEntry({
      entryRepository,
      narrativeGenerator,
      generateId: () => 'fixed-id',
      now: () => now,
    });
  });

  it('genera el relato a partir del texto en bruto y guarda la entrada', async () => {
    const entry = await createEntry.execute({ date: '2026-10-23', rawText: 'hoy pasó algo' });

    expect(narrativeGenerator.generate).toHaveBeenCalledWith({
      date: '2026-10-23',
      rawText: 'hoy pasó algo',
    });
    expect(entry.toPrimitives()).toEqual({
      id: 'fixed-id',
      date: '2026-10-23',
      rawText: 'hoy pasó algo',
      narrative: 'Un relato bonito.',
      createdAt: now.toISOString(),
    });
    expect(await entryRepository.findAll()).toEqual([entry]);
  });

  it('no llama a la IA si los datos son inválidos', async () => {
    await expect(createEntry.execute({ date: '2026-10-23', rawText: '   ' })).rejects.toThrow(
      ValidationError,
    );
    expect(narrativeGenerator.generate).not.toHaveBeenCalled();
  });
});
