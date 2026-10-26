import { DependenciesProvider } from './DependenciesContext.jsx';
import { DiaryPage } from './pages/DiaryPage.jsx';

export function App({ dependencies }) {
  return (
    <DependenciesProvider dependencies={dependencies}>
      <DiaryPage />
    </DependenciesProvider>
  );
}
