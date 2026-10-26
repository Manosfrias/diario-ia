import { useCallback, useEffect, useState } from 'react';
import { useDependencies } from '../DependenciesContext.jsx';

export function useDictation({ onTranscript }) {
  const { speechRecognizer } = useDependencies();
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const start = useCallback(() => {
    setError(null);
    speechRecognizer.start({
      onTranscript,
      onEnd: () => setIsListening(false),
      onError: (dictationError) => setError(dictationError.message),
    });
    setIsListening(true);
  }, [speechRecognizer, onTranscript]);

  const stop = useCallback(() => speechRecognizer.stop(), [speechRecognizer]);

  useEffect(() => () => speechRecognizer.stop(), [speechRecognizer]);

  return { isSupported: speechRecognizer.isSupported(), isListening, error, start, stop };
}
