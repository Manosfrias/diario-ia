import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({ path: fileURLToPath(new URL('../../../../.env', import.meta.url)) });

export const config = Object.freeze({
  port: Number(process.env.PORT ?? 3000),
  narrativeProvider: process.env.NARRATIVE_PROVIDER ?? 'fake',
});
