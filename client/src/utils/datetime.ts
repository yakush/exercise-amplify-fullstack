/**
 * converts a date object to a string for HTML input element <input type='date'>
 * @param date
 * @returns 'YYY-MM-DD'
 */
export function convertDateToHtmlDateInput(date: Date) {
  // the canadian format 'en-CA' is YYYY-MM-DD.
  return date.toLocaleDateString('en-CA');
  //return date.toISOString().substring(0, 10); //WRONG TIMEZONE
}

/**
 * converts a date object to a string for HTML input element <input type='time'>
 * @param date
 * @returns 'HH:mm'
 */
export function convertDateToHtmlTimeInput(date: Date) {
  return date.toLocaleTimeString('en-US', {
    timeStyle: 'short',
    hour12: false,
  });
  //return date.toISOString().substring(11, 16); //WRONG TIMEZONE
}
