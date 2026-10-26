import { randomUUID } from 'node:crypto';
import { ListEntries } from '../application/use-cases/ListEntries.js';
import { CreateEntry } from '../application/use-cases/CreateEntry.js';
import { InMemoryEntryRepository } from '../infrastructure/persistence/InMemoryEntryRepository.js';
import { createSeedEntries } from '../infrastructure/persistence/seedEntries.js';
import { FakeNarrativeGenerator } from '../infrastructure/ai/FakeNarrativeGenerator.js';
import { EntryController } from '../infrastructure/http/controllers/EntryController.js';
import { createApp } from '../infrastructure/http/createApp.js';

// Para añadir un proveedor real: implementar NarrativeGenerator y registrarlo aquí
const narrativeGeneratorFactories = {
  fake: () => new FakeNarrativeGenerator(),
};

export function createContainer({
  narrativeProvider,
  initialEntries = createSeedEntries(),
  logger = console,
}) {
  const entryRepository = new InMemoryEntryRepository(initialEntries);
  const narrativeGenerator = createNarrativeGenerator(narrativeProvider);

  const listEntries = new ListEntries({ entryRepository });
  const createEntry = new CreateEntry({
    entryRepository,
    narrativeGenerator,
    generateId: randomUUID,
    now: () => new Date(),
  });

  const entryController = new EntryController({ listEntries, createEntry });
  const app = createApp({ entryController, logger });

  return { app };
}

function createNarrativeGenerator(provider) {
  const factory = narrativeGeneratorFactories[provider];
  if (!factory) {
    const available = Object.keys(narrativeGeneratorFactories).join(', ');
    throw new Error(`Proveedor de narrativa desconocido: "${provider}". Disponibles: ${available}`);
  }
  return factory();
}
