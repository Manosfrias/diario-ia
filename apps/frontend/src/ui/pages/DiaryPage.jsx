import { EntryList } from '../components/EntryList.jsx';
import { NewEntryForm } from '../components/NewEntryForm.jsx';
import { useEntries } from '../hooks/useEntries.js';

export function DiaryPage() {
  const { entries, status, error, addEntry } = useEntries();

  return (
    <main className="diary">
      <header className="diary__header">
        <h1>Diario IA</h1>
        <p className="diary__subtitle">Dicta tu día y deja que la IA lo convierta en un relato.</p>
      </header>

      <section aria-labelledby="new-entry-title" className="diary__section">
        <h2 id="new-entry-title">Nueva entrada</h2>
        <NewEntryForm onSubmit={addEntry} />
      </section>

      <section aria-labelledby="entries-title" className="diary__section">
        <h2 id="entries-title">Entradas</h2>
        {status === 'loading' && <p className="hint">Cargando entradas...</p>}
        {status === 'error' && (
          <p role="alert" className="error">
            No se pudieron cargar las entradas: {error}
          </p>
        )}
        {status === 'ready' && <EntryList entries={entries} />}
      </section>
    </main>
  );
}
