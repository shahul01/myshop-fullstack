

export function sleep(ms: number): Promise<void> {
  return new Promise(res => setTimeout(res, ms));
};

type IdLength = 4 | 6 | 8 | 12 | 17;
export function getRandom(idLength:IdLength):number {
  return Number(Math.random().toFixed(idLength).slice(2));
};
