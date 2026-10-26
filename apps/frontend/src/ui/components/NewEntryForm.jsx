import { useCallback, useState } from 'react';
import { todayIsoDate } from '../../domain/entry.js';
import { useDictation } from '../hooks/useDictation.js';
import { DictateButton } from './DictateButton.jsx';

export function NewEntryForm({ onSubmit }) {
  const [date, setDate] = useState(todayIsoDate);
  const [rawText, setRawText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const appendTranscript = useCallback(
    (transcript) => setRawText((current) => (current ? `${current} ${transcript}` : transcript)),
    [],
  );
  const dictation = useDictation({ onTranscript: appendTranscript });

  async function handleSubmit(event) {
    event.preventDefault();
    dictation.stop();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({ date, rawText });
      setRawText('');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const canSubmit = !isSubmitting && rawText.trim() !== '';

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <label className="entry-form__field">
        Fecha
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
      </label>

      <label className="entry-form__field">
        ¿Qué te ha pasado?
        <textarea
          rows={5}
          value={rawText}
          onChange={(event) => setRawText(event.target.value)}
          placeholder="Escribe o dicta tu día tal cual te salga..."
        />
      </label>

      <div className="entry-form__actions">
        {dictation.isSupported ? (
          <DictateButton
            isListening={dictation.isListening}
            onStart={dictation.start}
            onStop={dictation.stop}
          />
        ) : (
          <span className="hint">El dictado por voz requiere Chrome o Edge.</span>
        )}
        <button type="submit" className="button" disabled={!canSubmit}>
          {isSubmitting ? 'Generando relato...' : 'Convertir en relato'}
        </button>
      </div>

      {(error || dictation.error) && (
        <p role="alert" className="error">
          {error ?? dictation.error}
        </p>
      )}
    </form>
  );
}
