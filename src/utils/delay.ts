export const delay = (n: number) => {
  n = n || 2000;
  return new Promise((done: (...value: any[]) => void) => {
    setTimeout(() => {
      done();
    }, n);
  });
}