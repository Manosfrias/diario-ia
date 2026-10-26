import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createContainer } from '../../../src/config/container.js';
import { buildEntry } from '../../helpers/entryMother.js';

const silentLogger = { error: () => {} };

describe('API /api/entries', () => {
  let app;

  beforeEach(() => {
    ({ app } = createContainer({
      narrativeProvider: 'fake',
      initialEntries: [buildEntry()],
      logger: silentLogger,
    }));
  });

  it('GET /api/health responde ok', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('GET /api/entries lista las entradas', async () => {
    const response = await request(app).get('/api/entries');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({ id: 'entry-1', narrative: 'Relato coherente.' });
  });

  it('POST /api/entries crea una entrada con su relato', async () => {
    const response = await request(app)
      .post('/api/entries')
      .send({ date: '2026-10-24', rawText: 'pues hoy llovió' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      date: '2026-10-24',
      rawText: 'pues hoy llovió',
      narrative: 'El 24 de octubre de 2026: Hoy llovió.',
    });

    const list = await request(app).get('/api/entries');
    expect(list.body[0].id).toBe(response.body.id);
  });

  it('POST /api/entries responde 400 con datos inválidos', async () => {
    const response = await request(app).post('/api/entries').send({ date: 'ayer', rawText: 'x' });

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/fecha/);
  });

  it('responde 400 si el JSON está mal formado', async () => {
    const response = await request(app)
      .post('/api/entries')
      .set('Content-Type', 'application/json')
      .send('{ mal');

    expect(response.status).toBe(400);
  });

  it('responde 404 en rutas desconocidas', async () => {
    const response = await request(app).get('/api/nope');

    expect(response.status).toBe(404);
  });
});
