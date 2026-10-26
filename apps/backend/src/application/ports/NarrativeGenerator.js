/**
 * Puerto de salida: transforma el texto dictado en bruto en un relato coherente.
 * Los proveedores de IA (OpenAI, Gemini, Ollama...) deben extender esta clase.
 */
export class NarrativeGenerator {
  /**
   * @param {{ rawText: string, date: string }} _draft
   * @returns {Promise<string>}
   */
  async generate(_draft) {
    throw new Error(`${this.constructor.name} debe implementar generate()`);
  }
}
