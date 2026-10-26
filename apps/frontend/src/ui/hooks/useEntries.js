import { useCallback, useEffect, useState } from 'react';
import { useDependencies } from '../DependenciesContext.jsx';

export function useEntries() {
  const { listEntries, createEntry } = useDependencies();
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    listEntries()
      .then((loadedEntries) => {
        if (!isActive) return;
        setEntries(loadedEntries);
        setStatus('ready');
      })
      .catch((loadError) => {
        if (!isActive) return;
        setError(loadError.message);
        setStatus('error');
      });

    return () => {
      isActive = false;
    };
  }, [listEntries]);

  const addEntry = useCallback(
    async (draft) => {
      await createEntry(draft);
      // Se recarga para respetar el orden que define el backend
      setEntries(await listEntries());
    },
    [createEntry, listEntries],
  );

  return { entries, status, error, addEntry };
}
