import { describe, expect, it } from 'vitest';
import { FakeNarrativeGenerator } from '../../../src/infrastructure/ai/FakeNarrativeGenerator.js';

describe('FakeNarrativeGenerator', () => {
  const generator = new FakeNarrativeGenerator();

  it('elimina muletillas, capitaliza frases y añade la fecha', async () => {
    const narrative = await generator.generate({
      date: '2026-10-23',
      rawText: 'eh pues hoy fui al cine. o sea la peli genial',
    });

    expect(narrative).toBe('El 23 de octubre de 2026: Hoy fui al cine. La peli genial.');
  });

  it('devuelve un relato por defecto si solo había muletillas', async () => {
    const narrative = await generator.generate({ date: '2026-10-23', rawText: 'eh... mmm' });

    expect(narrative).toBe('El 23 de octubre de 2026 no ocurrió nada digno de mención.');
  });
});
