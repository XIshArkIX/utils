import { Callback } from '../../shared/interfaces/callback';
import { decimalAdjust } from '../math/decimalAdjust';
import { format, sleep } from '../date';
import { updateProgress } from '../console';

const exp = 7;
const max = Math.pow(10, exp);

export const bench = async (fn: Callback) => {
  console.clear();

  let
    first = 0,
    best = 0,
    average = 0,
    worst = 0,
    last = 0,
    total = new Date(),
    speed = 0,
    timeSpent = 0,
    prevIteration = 0,
    nextIteration = 0
    ;

  const internalInterval = setInterval(() => {
    timeSpent++;
    prevIteration = nextIteration;
    speed = nextIteration - prevIteration;
  }, 1e3);

  for (
    let i = 0, progress = 0, now = 0, start = new Date();
    i < max;
    i++,
      start = new Date(),
      progress = Math.round(
        i * decimalAdjust('round', Math.pow(10, -(exp - 2)), -(exp - 2))
      )
  ) {
    fn();
    nextIteration = i;

    switch (i) {
      case 0:
        first = Date.now() - +start;
        break;
      case max - 1:
        last = Date.now() - +start;
        break;
      default:
        now = Date.now() - +start;
        best = now < best && now >= 0 ? now : best;
        worst = now > worst ? now : worst;
        average = decimalAdjust('round', (average + now) / 2, -9);
        break;
    }

    // progress    = 100%
    // i           = 10^exp

    await sleep(10);

    updateProgress({
      iteration: i,
      name: fn.name,
      average,
      best,
      first,
      last,
      max,
      progress,
      worst,
      timeSpent
    });
  }

  clearInterval(internalInterval);

  return {
    best,
    worst,
    first,
    last,
    average,
    total: format(Date.now() - +total - max * 10),
  };
};
