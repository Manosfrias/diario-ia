import { NarrativeGenerator } from '../../application/ports/NarrativeGenerator.js';

const FILLER_WORDS_PATTERN = /\b(eh+|em+|mm+|pues|o sea|en plan)\b,?\s*/gi;
const SENTENCE_SEPARATOR_PATTERN = /[.!?\n]+/;

const longDateFormatter = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/**
 * Adaptador sin IA real: limpia muletillas y da formato de relato de forma determinista.
 * Permite desarrollar y testear sin claves ni coste hasta conectar un proveedor real.
 */
export class FakeNarrativeGenerator extends NarrativeGenerator {
  async generate({ rawText, date }) {
    const intro = `El ${formatLongDate(date)}`;
    const sentences = toCleanSentences(rawText);

    if (sentences.length === 0) return `${intro} no ocurrió nada digno de mención.`;
    return `${intro}: ${sentences.join('. ')}.`;
  }
}

function toCleanSentences(rawText) {
  return rawText
    .replace(FILLER_WORDS_PATTERN, '')
    .split(SENTENCE_SEPARATOR_PATTERN)
    .map((sentence) => sentence.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map(capitalize);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatLongDate(isoDate) {
  return longDateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}
