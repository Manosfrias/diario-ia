import { ValidationError } from '../errors/ValidationError.js';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export class Entry {
  constructor({ id, date, rawText, narrative, createdAt }) {
    Entry.assertValidDraft({ date, rawText });
    assertNotBlank(id, 'id');
    assertNotBlank(narrative, 'narrative');
    assertValidTimestamp(createdAt);

    this.id = id;
    this.date = date;
    this.rawText = rawText.trim();
    this.narrative = narrative.trim();
    this.createdAt = createdAt;
    Object.freeze(this);
  }

  static assertValidDraft({ date, rawText }) {
    assertValidIsoDate(date);
    assertNotBlank(rawText, 'rawText');
  }

  static compareByMostRecent(a, b) {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return b.createdAt - a.createdAt;
  }

  toPrimitives() {
    return {
      id: this.id,
      date: this.date,
      rawText: this.rawText,
      narrative: this.narrative,
      createdAt: this.createdAt.toISOString(),
    };
  }
}

function assertNotBlank(value, field) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new ValidationError(`El campo "${field}" es obligatorio`);
  }
}

function assertValidIsoDate(date) {
  if (!isRealIsoDate(date)) {
    throw new ValidationError(`La fecha "${date}" no es válida (formato esperado: YYYY-MM-DD)`);
  }
}

function isRealIsoDate(date) {
  if (typeof date !== 'string' || !ISO_DATE_PATTERN.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  // Date normaliza días fuera de rango (31 de febrero -> marzo), así que se compara el resultado
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(date);
}

function assertValidTimestamp(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    throw new ValidationError('El campo "createdAt" debe ser una fecha válida');
  }
}
