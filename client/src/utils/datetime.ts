export function convertDateToHtmlDateInput(date: Date) {
  return date.toISOString().substring(0, 10);
}

export function convertDateToHtmlTimeInput(date: Date) {
  return date.toISOString().substring(11, 16);
}
