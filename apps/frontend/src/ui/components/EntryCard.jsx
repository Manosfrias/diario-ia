import { formatEntryDate } from '../../domain/entry.js';

export function EntryCard({ entry }) {
  return (
    <article className="entry-card">
      <time className="entry-card__date" dateTime={entry.date}>
        {formatEntryDate(entry.date)}
      </time>
      <p className="entry-card__narrative">{entry.narrative}</p>
      <details className="entry-card__raw">
        <summary>Ver texto original</summary>
        <p>{entry.rawText}</p>
      </details>
    </article>
  );
}
