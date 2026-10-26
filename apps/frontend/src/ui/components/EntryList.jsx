import { EntryCard } from './EntryCard.jsx';

export function EntryList({ entries }) {
  if (entries.length === 0) {
    return <p className="hint">Todavía no hay entradas. Cuenta qué te ha pasado hoy.</p>;
  }

  return (
    <ul className="entry-list">
      {entries.map((entry) => (
        <li key={entry.id}>
          <EntryCard entry={entry} />
        </li>
      ))}
    </ul>
  );
}
