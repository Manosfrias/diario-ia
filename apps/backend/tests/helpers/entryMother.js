import { Entry } from '../../src/domain/entry/Entry.js';

export function buildEntry(overrides = {}) {
  return new Entry({
    id: 'entry-1',
    date: '2026-10-23',
    rawText: 'texto en bruto',
    narrative: 'Relato coherente.',
    createdAt: new Date('2026-10-23T20:00:00.000Z'),
    ...overrides,
  });
}
