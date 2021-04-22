function doubleDigit(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function tripleDigit(n: number) {
  return n < 100 ? n < 10 ? `00${n}` : `0${n}` : `${n}`;
}

export function format(ms: number): string {
  switch (true) {
    case (ms < 1e3):
      return `${tripleDigit(ms)}ms`;
    case (ms < 1e3 * 60):
      {
        let s = Math.floor(ms / 1e3);
        return `${doubleDigit(s)}s ${tripleDigit(ms - s * 1e3)}ms`;
      }
    case (ms < 1e3 * 60 * 60):
      {
        let m = Math.floor(ms / 1e3 / 60);
        let s = Math.floor((ms - (m * 1e3 * 60)) / 1e3);
        return `${doubleDigit(m)}m ${doubleDigit(s)}s ${tripleDigit(ms - (s * 1e3) - (m * 1e3 * 60))}ms`;
      }
    case (ms < 1e3 * 60 * 60 * 24):
      {
        let m = Math.floor(ms / 1e3 / 60);
        let s = Math.floor((ms - (m * 1e3 * 60)) / 1e3);
        let h = Math.floor(ms / 1e3 / 60 / 60);
        return `${doubleDigit(h)}h ${doubleDigit(m)}m ${doubleDigit(s)}s ${tripleDigit(ms - (s * 1e3) - (m * 1e3 * 60))}ms`;
      }
    default:
      return `${ms}ms`;
  }
}