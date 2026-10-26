import { config } from './config/env.js';
import { createContainer } from './config/container.js';

const { app } = createContainer({ narrativeProvider: config.narrativeProvider });

app.listen(config.port, () => {
  console.log(`API de Diario IA escuchando en http://localhost:${config.port}`);
});
