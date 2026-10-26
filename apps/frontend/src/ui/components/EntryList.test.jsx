import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EntryList } from './EntryList.jsx';

describe('EntryList', () => {
  it('muestra un mensaje cuando no hay entradas', () => {
    render(<EntryList entries={[]} />);

    expect(screen.getByText(/todavía no hay entradas/i)).toBeInTheDocument();
  });

  it('muestra el relato de cada entrada', () => {
    const entries = [
      { id: '1', date: '2026-10-22', rawText: 'bruto 1', narrative: 'Relato uno.', createdAt: '' },
      { id: '2', date: '2026-10-21', rawText: 'bruto 2', narrative: 'Relato dos.', createdAt: '' },
    ];

    render(<EntryList entries={entries} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Relato uno.')).toBeInTheDocument();
    expect(screen.getByText('Relato dos.')).toBeInTheDocument();
  });
});
