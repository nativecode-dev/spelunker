export const StringHash = (value: string): number => {
  let hash = 0

  if (value.length === 0) {
    return hash
  }

  for (let index = 0; index < value.length; index++) {
    const chr: number = value.charCodeAt(index);
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return hash;
}
