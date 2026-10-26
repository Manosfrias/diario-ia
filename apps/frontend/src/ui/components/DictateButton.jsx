export function DictateButton({ isListening, onStart, onStop }) {
  return (
    <button
      type="button"
      className={`button button--secondary ${isListening ? 'is-listening' : ''}`}
      onClick={isListening ? onStop : onStart}
      aria-pressed={isListening}
    >
      {isListening ? 'Detener dictado' : 'Dictar'}
    </button>
  );
}
