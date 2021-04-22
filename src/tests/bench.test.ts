import { bench } from '../lib/bench';

const MySuperFunctionNeedToTest = async () => {
  await new Promise((res) => {
    setTimeout(res, Math.round(Math.random() * 1e3));
  });
};

bench(MySuperFunctionNeedToTest);
