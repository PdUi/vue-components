export function isNullOrWhiteSpace (str) {
  return str === null || str === undefined || /^\s*$/.test(str);
}
