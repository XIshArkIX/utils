interface Props {
  name: string
  progress: number
  worst: number
  best: number
  first: number
  last: number
  average: number
  iteration: number
  max: number
  speed?: number
  timeSpent?: number
};

type Point = { x: number, y: number };

export function writeTo(coord: Point, text: string) {
  process.stdout.cursorTo(coord.x, coord.y);
  process.stdout.write(text);
}

export const updateProgress = (props: Readonly<Props>) => {
  writeTo({ x: 0, y: 1 }, `Testing: ${props.name}`);
  writeTo({ x: 2, y: 2 }, 'Progress:');
  writeTo(
    { x: 4, y: 3 },
    '[ ' +
    new Array(props.progress).fill('=').join('') +
    (props.progress === 100 ? ' ] Done!' : ` ] ${props.progress}%`)
  );
  writeTo({ x: 4, y: 4 }, `[ ${props.iteration}/${props.max} ]`);
  writeTo({ x: 2, y: 5 }, 'Stats:');
  writeTo({ x: 4, y: 6 }, `Best: ${props.best}`);
  writeTo({ x: 4, y: 7 }, `Worst: ${props.worst}`);
  writeTo({ x: 4, y: 8 }, `Average: ${props.average}`);
  if (props.speed) {
    writeTo({ x: 4, y: 9 }, `Speed: ${props.speed} iteration/s`);
  }
  if (props.timeSpent) {
    writeTo({ x: 2, y: 10 }, `Total time: ${props.timeSpent}s`);
  }
};
