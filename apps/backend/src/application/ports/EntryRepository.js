/**
 * Puerto de salida: persistencia de entradas del diario.
 * Cualquier adaptador (memoria, fichero, base de datos...) debe extender esta clase.
 */
export class EntryRepository {
  /** @returns {Promise<import('../../domain/entry/Entry.js').Entry[]>} */
  async findAll() {
    throw new Error(`${this.constructor.name} debe implementar findAll()`);
  }

  /** @param {import('../../domain/entry/Entry.js').Entry} _entry */
  async save(_entry) {
    throw new Error(`${this.constructor.name} debe implementar save()`);
  }
}
