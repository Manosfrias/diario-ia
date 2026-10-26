const longDateFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatEntryDate(isoDate) {
  return longDateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

export function todayIsoDate(now = new Date()) {
  const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return localTime.toISOString().slice(0, 10);
}
