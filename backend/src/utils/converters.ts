

export function convertSnakeToCameCase(text: string): string {
  const toCamel = (str: string) => str.toUpperCase().replace("_", "");
  return text.toLowerCase().replace(/([_]\w)/g, toCamel);
}
