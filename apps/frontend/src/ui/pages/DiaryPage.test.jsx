import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App.jsx';
import { createEntryUseCases } from '../../application/entryUseCases.js';

function createFakeDependencies(initialEntries = []) {
  const entries = [...initialEntries];
  const entryRepository = {
    findAll: vi.fn(async () => [...entries]),
    create: vi.fn(async (draft) => {
      const entry = { id: String(entries.length + 1), narrative: `Relato: ${draft.rawText}`, ...draft };
      entries.unshift(entry);
      return entry;
    }),
  };
  const speechRecognizer = { isSupported: () => false, start: vi.fn(), stop: vi.fn() };

  return { ...createEntryUseCases({ entryRepository }), speechRecognizer };
}

describe('DiaryPage', () => {
  it('muestra el título y las entradas existentes', async () => {
    render(
      <App
        dependencies={createFakeDependencies([
          { id: '1', date: '2026-10-22', rawText: 'x', narrative: 'Un día tranquilo.' },
        ])}
      />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Diario IA' })).toBeInTheDocument();
    expect(await screen.findByText('Un día tranquilo.')).toBeInTheDocument();
  });

  it('crea una entrada y la muestra en la lista', async () => {
    const user = userEvent.setup();
    render(<App dependencies={createFakeDependencies()} />);

    await user.type(screen.getByLabelText(/qué te ha pasado/i), 'hoy llovió');
    await user.click(screen.getByRole('button', { name: /convertir en relato/i }));

    expect(await screen.findByText('Relato: hoy llovió')).toBeInTheDocument();
    expect(screen.getByLabelText(/qué te ha pasado/i)).toHaveValue('');
  });
});
