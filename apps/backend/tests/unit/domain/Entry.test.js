import { describe, expect, it } from 'vitest';
import { Entry } from '../../../src/domain/entry/Entry.js';
import { ValidationError } from '../../../src/domain/errors/ValidationError.js';
import { buildEntry } from '../../helpers/entryMother.js';

describe('Entry', () => {
  it('se crea con datos válidos y recorta espacios del texto', () => {
    const entry = buildEntry({ rawText: '  hola  ', narrative: '  Hola.  ' });

    expect(entry.rawText).toBe('hola');
    expect(entry.narrative).toBe('Hola.');
  });

  it('es inmutable', () => {
    const entry = buildEntry();

    expect(() => {
      entry.narrative = 'otro';
    }).toThrow(TypeError);
  });

  it.each(['2026-13-01', '2026-02-30', '23/10/2026', '', undefined])(
    'rechaza la fecha inválida %s',
    (date) => {
      expect(() => buildEntry({ date })).toThrow(ValidationError);
    },
  );

  it.each(['', '   ', undefined])('rechaza un texto en bruto vacío (%s)', (rawText) => {
    expect(() => buildEntry({ rawText })).toThrow(ValidationError);
  });

  it('ordena por fecha descendente y, en el mismo día, por hora de creación descendente', () => {
    const older = buildEntry({ id: 'a', date: '2026-10-20' });
    const morning = buildEntry({ id: 'b', createdAt: new Date('2026-10-23T08:00:00Z') });
    const night = buildEntry({ id: 'c', createdAt: new Date('2026-10-23T22:00:00Z') });

    const sorted = [older, morning, night].sort(Entry.compareByMostRecent);

    expect(sorted.map((entry) => entry.id)).toEqual(['c', 'b', 'a']);
  });

  it('se serializa a primitivos', () => {
    expect(buildEntry().toPrimitives()).toEqual({
      id: 'entry-1',
      date: '2026-10-23',
      rawText: 'texto en bruto',
      narrative: 'Relato coherente.',
      createdAt: '2026-10-23T20:00:00.000Z',
    });
  });
});
