import { createContext, useContext } from 'react';

const DependenciesContext = createContext(null);

export function DependenciesProvider({ dependencies, children }) {
  return (
    <DependenciesContext.Provider value={dependencies}>{children}</DependenciesContext.Provider>
  );
}

export function useDependencies() {
  const dependencies = useContext(DependenciesContext);
  if (!dependencies) throw new Error('useDependencies debe usarse dentro de <DependenciesProvider>');
  return dependencies;
}
