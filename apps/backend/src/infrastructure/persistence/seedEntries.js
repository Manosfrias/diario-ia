import { Entry } from '../../domain/entry/Entry.js';

const SEED_DATA = [
  {
    id: 'seed-1',
    date: '2026-10-20',
    rawText:
      'eh pues hoy me levanté tarde, o sea fatal, perdí el bus y llegué tarde a clase pero bueno el profe ni se enteró',
    narrative:
      'Hoy me levanté más tarde de lo previsto y el día empezó torcido: perdí el autobús y llegué tarde a clase. Por suerte, el profesor ni siquiera se dio cuenta.',
    createdAt: '2026-10-20T21:15:00.000Z',
  },
  {
    id: 'seed-2',
    date: '2026-10-21',
    rawText:
      'fui al parque con lucía, hacía sol, comimos un helado y hablamos un montón de lo del viaje',
    narrative:
      'Pasé la tarde en el parque con Lucía. Hacía sol, nos tomamos un helado y estuvimos hablando largo y tendido sobre el viaje que tenemos pendiente.',
    createdAt: '2026-10-21T20:40:00.000Z',
  },
  {
    id: 'seed-3',
    date: '2026-10-22',
    rawText:
      'mmm día tranquilo, terminé el libro ese de ciencia ficción y en plan me ha encantado el final',
    narrative:
      'Fue un día tranquilo. Por fin terminé la novela de ciencia ficción que tenía entre manos, y el final me encantó.',
    createdAt: '2026-10-22T22:05:00.000Z',
  },
];

export function createSeedEntries() {
  return SEED_DATA.map((data) => new Entry({ ...data, createdAt: new Date(data.createdAt) }));
}
