export class HttpEntryRepository {
  #baseUrl;

  constructor({ baseUrl }) {
    this.#baseUrl = baseUrl;
  }

  findAll() {
    return this.#request('/entries');
  }

  create(draft) {
    return this.#request('/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    });
  }

  async #request(path, options) {
    const response = await fetch(`${this.#baseUrl}${path}`, options);
    const body = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(body?.error ?? `La API respondió con el código ${response.status}`);
    }
    return body;
  }
}
