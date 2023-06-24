const randomBetween = (from: number, to: number) => Math.round(Math.random() * (to - from) + from);

export const useRandom = () => ({
  between: randomBetween,
  inArray: <T>(arr: T[]): T => arr[randomBetween(0, arr.length - 1)],
});