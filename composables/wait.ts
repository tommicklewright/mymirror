export const useWait = () => ({
  milliseconds: (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)),
});