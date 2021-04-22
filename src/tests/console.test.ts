const exp = 3;
import { decimalAdjust } from '../lib/math/decimalAdjust';
import { updateProgress } from '../lib/console';

for (let i = 0; i < 1e3; i++) {
  updateProgress({
    average: i,
    best: i,
    first: i,
    iteration: i,
    last: i,
    max: 1e3,
    name: 'test',
    progress: Math.round(
      i * decimalAdjust('round', Math.pow(10, -(exp - 2)), -(exp - 2))
    ),
    worst: i,
  });
}